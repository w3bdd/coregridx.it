import ipaddress
import logging
import os
import re
import time
import uuid
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import Response
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "CoreGridX Technologies")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL")

logger = logging.getLogger(__name__)

# ---------------- Email guardrail gate (G2/G3) ----------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    if not EMAIL_KEY or not to:
        logger.warning("Email skipped: EMERGENT_EMAIL_KEY or recipient not configured")
        return None
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except Exception as e:
        logger.error(f"Email send error: {e}")
        return None


# ---------------- Lead models ----------------
class LeadBase(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: str = Field(min_length=2, max_length=160)
    phone: Optional[str] = Field(default=None, max_length=40)
    message: Optional[str] = Field(default=None, max_length=4000)
    website: Optional[str] = None  # honeypot — must stay empty


class ContactLead(LeadBase):
    topic: Optional[str] = Field(default=None, max_length=120)


class QuoteLead(LeadBase):
    org_type: str = Field(max_length=80)
    sites: str = Field(max_length=40)
    users_devices: str = Field(max_length=40)
    environment: str = Field(max_length=60)
    project_type: str = Field(max_length=120)
    timeline: str = Field(max_length=60)
    budget: str = Field(max_length=60)


class ConsultationLead(LeadBase):
    role: Optional[str] = Field(default=None, max_length=120)
    focus_area: str = Field(max_length=120)
    timeframe: Optional[str] = Field(default=None, max_length=60)


# ---------------- Rate limiting ----------------
_rate: dict = {}


def check_rate(ip: str, limit: int = 6, window: int = 600):
    now = time.time()
    hits = [t for t in _rate.get(ip, []) if now - t < window]
    if len(hits) >= limit:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")
    hits.append(now)
    _rate[ip] = hits


async def store_lead(kind: str, data: dict) -> dict:
    doc = {"id": str(uuid.uuid4()), "type": kind,
           "created_at": datetime.now(timezone.utc).isoformat(), **data}
    doc.pop("website", None)
    await db.leads.insert_one(doc)
    doc.pop("_id", None)
    return doc


def lead_email_html(title: str, fields: dict) -> str:
    rows = "".join(
        f'<tr><td style="padding:8px 14px;color:#64748B;font-size:11px;text-transform:uppercase;'
        f'letter-spacing:1px;white-space:nowrap;vertical-align:top">{escape(str(k))}</td>'
        f'<td style="padding:8px 14px;color:#0F131C;font-size:14px">{escape(str(v)).replace(chr(10), "<br>")}</td></tr>'
        for k, v in fields.items() if v
    )
    return (
        f'<table role="presentation" width="100%" style="background:#F8FAFC;padding:24px 0"><tr><td align="center">'
        f'<table role="presentation" width="560" style="background:#FFFFFF;border:1px solid #E2E8F0">'
        f'<tr><td style="padding:20px 24px;border-bottom:3px solid #00B8C4;font-family:Arial,sans-serif">'
        f'<span style="font-size:16px;font-weight:bold;color:#0F131C">{escape(EMAIL_FROM_NAME)}</span><br>'
        f'<span style="font-size:12px;color:#64748B">{escape(title)}</span></td></tr>'
        f'<tr><td style="padding:12px 10px;font-family:Arial,sans-serif"><table role="presentation" width="100%">{rows}</table></td></tr>'
        f'<tr><td style="padding:16px 24px;font-family:Arial,sans-serif;font-size:11px;color:#94A3B8">'
        f'Submitted via the {escape(EMAIL_FROM_NAME)} website. Review and qualify before follow-up.</td></tr>'
        f'</table></td></tr></table>'
    )


async def handle_lead(request: Request, kind: str, lead: LeadBase, subject: str, fields: dict):
    check_rate(request.client.host if request.client else "unknown")
    if lead.website:
        return {"status": "ok"}  # honeypot tripped — silent accept
    data = lead.model_dump()
    await store_lead(kind, data)
    if ADMIN_EMAIL:
        await send_email(to=ADMIN_EMAIL, subject=subject,
                         html=lead_email_html(subject, fields),
                         reply_to=lead.email)
    else:
        logger.info(f"ADMIN_EMAIL not set — lead stored only ({kind}: {lead.email})")
    return {"status": "ok"}


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"service": "CoreGridX Technologies API", "status": "operational"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/leads/contact")
async def create_contact_lead(lead: ContactLead, request: Request):
    return await handle_lead(
        request, "contact", lead,
        f"New contact inquiry — {lead.company}",
        {"Name": lead.name, "Email": lead.email, "Company": lead.company,
         "Phone": lead.phone, "Topic": lead.topic, "Message": lead.message},
    )


@api_router.post("/leads/quote")
async def create_quote_lead(lead: QuoteLead, request: Request):
    return await handle_lead(
        request, "quote", lead,
        f"Quote request — {lead.company} ({lead.project_type})",
        {"Name": lead.name, "Email": lead.email, "Company": lead.company, "Phone": lead.phone,
         "Organization type": lead.org_type, "Sites": lead.sites, "Users / devices": lead.users_devices,
         "Current environment": lead.environment, "Project type": lead.project_type,
         "Timeline": lead.timeline, "Budget range": lead.budget, "Notes": lead.message},
    )


@api_router.post("/leads/consultation")
async def create_consultation_lead(lead: ConsultationLead, request: Request):
    return await handle_lead(
        request, "consultation", lead,
        f"Consultation request — {lead.company} ({lead.focus_area})",
        {"Name": lead.name, "Email": lead.email, "Company": lead.company, "Role": lead.role,
         "Phone": lead.phone, "Focus area": lead.focus_area, "Timeframe": lead.timeframe,
         "Message": lead.message},
    )


@api_router.get("/capability-statement.pdf")
async def capability_statement():
    from fpdf import FPDF

    pdf = FPDF(format="A4")
    pdf.set_auto_page_break(True, 20)
    pdf.set_margins(16, 16, 16)

    def dark_page():
        pdf.add_page()
        pdf.set_fill_color(7, 9, 14)
        pdf.rect(0, 0, 210, 297, "F")

    def eyebrow(text, y):
        pdf.set_xy(16, y)
        pdf.set_text_color(0, 200, 220)
        pdf.set_font("helvetica", "B", 9)
        pdf.cell(0, 6, text.upper())

    def heading(text, y, size=22):
        pdf.set_xy(16, y)
        pdf.set_text_color(248, 250, 252)
        pdf.set_font("helvetica", "B", size)

    def body(text, y, h=5.2):
        pdf.set_xy(16, y)
        pdf.set_text_color(170, 180, 195)
        pdf.set_font("helvetica", "", 10)
        pdf.multi_cell(178, h, text)
        return pdf.get_y()

    def rule(y):
        pdf.set_draw_color(0, 240, 255)
        pdf.set_line_width(0.4)
        pdf.line(16, y, 60, y)

    dark_page()
    eyebrow("Capability Statement", 24)
    heading("CoreGridX", 34, 34)
    heading("Technologies", 48, 34)
    rule(64)
    y = body("Infrastructure engineering for enterprise and multi-site organizations. "
             "We design, deploy, secure, and manage the server, network, and data center "
             "environments that operations depend on - with defined scope, disciplined "
             "delivery, and documentation that survives handover.", 72, 6)

    sections = [
        ("Core Capabilities",
         "Server & Computing - virtualization, compute refresh, storage, backup and recovery.\n"
         "Network & Connectivity - switching, routing, structured upgrades, WAN and multi-site links.\n"
         "Data Center & Physical Infrastructure - racking, power, cooling coordination, cabling.\n"
         "Security & Resilience - firewalls, VPN, segmentation, hardening, recovery planning.\n"
         "Managed Infrastructure - monitoring, patching, documentation and lifecycle management."),
        ("Delivery Lifecycle",
         "Assess - Design - Deploy - Secure - Document - Manage - Optimize.\n"
         "Every engagement is scoped before it is priced, and documented before it is closed."),
        ("Ideal Engagements",
         "Multi-site deployments and network upgrades. Server and virtualization environments. "
         "Firewall, VPN and segmentation projects. Managed infrastructure for growing or "
         "established organizations."),
        ("What We Do Not Claim",
         "No unsupported certifications. No 24/7 coverage promises. No absolute security guarantees. "
         "Trust is built through structure, clarity, and delivery discipline."),
    ]
    y = max(y + 8, 100)
    for title, text in sections:
        if y > 250:
            dark_page()
            y = 24
        eyebrow(title, y)
        y = body(text, y + 8) + 10

    pdf.set_xy(16, 282)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("helvetica", "", 9)
    pdf.cell(0, 5, "CoreGridX Technologies - Infrastructure Engineering  |  contact.coregridx@gmail.com  |  +63 965 093 3555")

    return Response(
        content=bytes(pdf.output()),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="CoreGridX-Capability-Statement.pdf"'},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
