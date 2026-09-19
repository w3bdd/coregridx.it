# CoreGridX Technologies — PRD

## Original Problem Statement
Marketing website for CoreGridX Technologies, an IT infrastructure engineering company targeting
enterprise and multi-site buyers. Goals: qualified lead generation (Request a Quote primary,
Contact secondary, Consultation tertiary), engineering-led positioning, trust through structure
and clarity rather than inflated claims. React + FastAPI + MongoDB. Dark enterprise UI,
grid-based technical visual language, award-level craft (kinetic hero, masked line reveals,
marquee, framer-motion, lenis smooth scroll, parallax).

## User Personas
- Primary: Enterprise / multi-site IT decision-makers (CIO, IT Director) scoping infrastructure projects
- Secondary: SMEs with serious infrastructure needs
- Tertiary: Engineering candidates and strategic/channel partners

## Architecture
- Frontend: React 19 + react-router-dom 7, Tailwind, framer-motion, lenis, sonner, lucide-react
- Backend: FastAPI (server.py), /api prefix, Motor (async MongoDB), fpdf2 (capability PDF), httpx
- Email: Emergent-managed Resend proxy (X-Email-Key), server-side templates, guardrail gate, G1–G5 compliant
- DB: MongoDB `leads` collection (contact / quote / consultation documents)

## Implemented (2026-09-19)
- 9 pages: Home (kinetic masked-reveal hero + topology canvas + parallax, editorial marquee,
  qualification strip, numbered manifesto, service matrix bento, solutions by scale, downtime
  exposure calculator, industries preview, capability statement band), About (mission/vision/values/
  "what we don't claim"), Services (5 anchored practice areas), Solutions (SB/SME/ENT), Industries (8),
  Approach (interactive 7-stage lifecycle inspector), Technology (6 ecosystem areas with honest-claim
  boundary), Work With Us (careers + partnerships combined), Contact (tabbed 3-form flow)
- Multi-step Quote form with all qualification fields (org type, sites, users/devices, environment,
  project type, timeline, budget) + progress steps
- Contact + Consultation forms (consultation = request-first, no open calendar, per plan)
- Backend lead APIs with validation, honeypot spam filter, per-IP rate limiting, MongoDB storage
- Admin email notifications via managed Resend (verified 202 Accepted with test address)
- Downloadable capability statement PDF generated server-side
- SEO basics: title, meta description, Organization JSON-LD
- Full data-testid coverage on interactive elements

## Verification Done
- curl: /api/health, all 3 lead endpoints (200), honeypot silent-accept + not stored, 422 validation, PDF 200 (valid %PDF)
- DB check: 3 leads stored, spam excluded
- Browser: homepage hero + mid sections, full 3-step quote form submit → success panel + toast
- Email pipeline: 202 Accepted from integration proxy

## Backlog
- P0: Owner provides real ADMIN_EMAIL (and real phone/email for site-wide placeholders)
- P1: Founder/leadership section on About (deferred — user skipped; needs real names/credentials)
- P1: Analytics/conversion tracking (PostHog partial; add form-funnel events)
- P2: CMS-like editable content layer (content currently in src/lib/content.js)
- P2: Service/location SEO landing pages
- P2: reCAPTCHA/Turnstile if spam bypasses honeypot+rate-limit
