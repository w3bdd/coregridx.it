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
- Light/dark theme toggle (sun/moon in header): entire palette runs on CSS variables
  (--c-* tokens incl. slate scale + white), `.light` class on <html> flips them; choice persists
  via localStorage with a pre-render script in index.html (no flash); topology canvas is theme-aware
- Curated infrastructure photography (verified loading + visually checked): FramedImage component
  with clipped cyan corner marks + mono caption bars; placements: Home field-spotlight section,
  all 5 Services practice areas (per-service matched shots), About hero band, Work With Us
  careers + partnerships. Registry in src/lib/content.js (IMAGES)
- Second imagery pass: Home Solutions-by-Scale cards now carry per-tier photos (patch panel /
  fiber / rack switch); wide editorial image bands added to Solutions (server chassis),
  Industries (rack switch), Technology (Linux terminal), Approach (engineering blueprints).
  All candidate photos content-verified via image analysis before placement

## Verification Done
- curl: /api/health, all 3 lead endpoints (200), honeypot silent-accept + not stored, 422 validation, PDF 200 (valid %PDF)
- DB check: 3 leads stored, spam excluded
- Browser: homepage hero + mid sections, full 3-step quote form submit → success panel + toast
- Email pipeline: 202 Accepted from integration proxy

## Deployment support (2026-09-22)
- Dual-mode lead submit (src/lib/api.js submitLead): full-stack mode posts to FastAPI;
  static mode activates when REACT_APP_LEAD_ENDPOINT (+ optional REACT_APP_LEAD_KEY) are set
  at build time — Web3Forms/Formspree/FormSubmit compatible, honeypot honored in both modes
- GitHub Pages: public/404.html SPA redirect + decode script in index.html, package.json
  homepage ".", REACT_APP_BASENAME support, workflow .github/workflows/deploy-gh-pages.yml
  (auto-sets basename from repo name, reads form endpoint from repo secrets)
- Capability PDF now a static asset (frontend/public/capability-statement.pdf) so the
  download works on static hosting; backend /api/capability-statement.pdf kept for regen
- Cleanup: removed dead src/App.css and src/constants/, added manifest.json + robots.txt,
  .env.example for both tiers, full README with GH Pages + VPS (systemd/nginx) guides
- Verified: yarn build passes, backend-mode form submit still works, static PDF serves

## Real details added (2026-09-24)
- Contact: +63 965 093 3555 / contact.coregridx@gmail.com — site-wide (CONTACT in api.js),
  JSON-LD schema, capability PDF footer (regenerated static asset)
- ADMIN_EMAIL = contact.coregridx@gmail.com → lead notifications verified delivering (202)
- Founder story section on About: Ansel Liam Galvan, Founder & Principal Engineer,
  AG monogram card (no photo supplied), 3-paragraph restrained narrative + pull quote
- WhatsApp click-to-chat (wa.me/639650933555 with pre-filled intro message): floating
  button site-wide (bottom-right), footer link, and a 4th contact card on /contact

## Backlog
- P0: Owner provides real ADMIN_EMAIL (and real phone/email for site-wide placeholders)
- P1: Founder/leadership section on About (deferred — user skipped; needs real names/credentials)
- P1: Analytics/conversion tracking (PostHog partial; add form-funnel events)
- P2: CMS-like editable content layer (content currently in src/lib/content.js)
- P2: Service/location SEO landing pages
- P2: reCAPTCHA/Turnstile if spam bypasses honeypot+rate-limit
