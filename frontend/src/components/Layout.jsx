import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Grid2x2, Menu, X, ArrowUpRight, Phone, Mail, FileDown, Sun, Moon } from "lucide-react";
import { CONTACT, CAPABILITY_PDF_URL } from "@/lib/api";

export const WhatsAppIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const WhatsAppFloat = () => (
  <a
    href={CONTACT.whatsappHref}
    target="_blank"
    rel="noopener noreferrer"
    data-testid="whatsapp-float-button"
    aria-label="Chat with CoreGridX on WhatsApp"
    title="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:bg-[#1fbe5b] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
  >
    <span className="absolute inset-0 border border-[#25D366] animate-ping opacity-20 pointer-events-none" />
    <WhatsAppIcon size={22} />
  </a>
);

const ThemeToggle = () => {
  const [light, setLight] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("light")
  );
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("cgx-theme", next ? "light" : "dark");
    } catch (e) {}
  };
  return (
    <button
      onClick={toggle}
      data-testid="theme-toggle-button"
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="w-9 h-9 border border-white/10 flex items-center justify-center text-slate-300 hover:text-signal hover:border-signal/50 transition-colors"
    >
      {light ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
};

const NAV = [
  { to: "/services", label: "Services", id: "nav-services-link" },
  { to: "/solutions", label: "Solutions", id: "nav-solutions-link" },
  { to: "/industries", label: "Industries", id: "nav-industries-link" },
  { to: "/approach", label: "Approach", id: "nav-approach-link" },
  { to: "/technology", label: "Technology", id: "nav-technology-link" },
  { to: "/about", label: "About", id: "nav-about-link" },
  { to: "/work-with-us", label: "Work With Us", id: "nav-careers-link" },
];

const Logo = () => (
  <Link to="/" data-testid="nav-home-link" className="flex items-center gap-3 group">
    <span className="w-9 h-9 border border-signal/40 flex items-center justify-center text-signal group-hover:bg-signal group-hover:text-void transition-colors">
      <Grid2x2 size={18} strokeWidth={1.8} />
    </span>
    <span className="leading-none">
      <span className="block font-display font-bold tracking-wide text-slate-50 text-base">COREGRIDX</span>
      <span className="block font-mono text-[9px] tracking-[0.35em] text-slate-500 mt-1">TECHNOLOGIES</span>
    </span>
  </Link>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-void/75 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={n.id}
              className={({ isActive }) =>
                `text-[13px] font-medium tracking-wide transition-colors ${isActive ? "text-signal" : "text-slate-400 hover:text-slate-100"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            data-testid="cta-request-quote-button"
            onClick={() => navigate("/contact?tab=quote")}
            className="hidden sm:inline-flex items-center gap-2 bg-signal text-void font-display font-semibold text-[13px] px-5 py-2.5 hover:bg-white transition-colors"
          >
            Request a Quote <ArrowUpRight size={15} />
          </button>
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className="lg:hidden text-slate-200 p-2 border border-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-void/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {[{ to: "/", label: "Home", id: "nav-mobile-home-link" }, ...NAV, { to: "/contact", label: "Contact", id: "nav-contact-link" }].map((n, i) => (
                <motion.div key={n.to + n.label} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <NavLink
                    to={n.to}
                    data-testid={n.id}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 border-b border-white/5 font-display text-lg ${isActive ? "text-signal" : "text-slate-200"}`
                    }
                  >
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
              <button
                data-testid="cta-mobile-quote-button"
                onClick={() => { setOpen(false); navigate("/contact?tab=quote"); }}
                className="mt-5 inline-flex items-center justify-center gap-2 bg-signal text-void font-display font-semibold text-sm px-5 py-3.5"
              >
                Request a Quote <ArrowUpRight size={15} />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="border-t border-white/10 bg-panel/30">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
      <div className="col-span-2 md:col-span-1">
        <Logo />
        <p className="mt-5 text-sm text-slate-500 leading-relaxed max-w-xs">
          Infrastructure engineering for enterprise and multi-site organizations. Scoped precisely. Delivered with discipline. Documented completely.
        </p>
        <div className="mt-6 font-mono text-[10px] tracking-[0.25em] text-slate-600 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-pulse inline-block animate-pulse-dot" /> SYSTEM: OPERATIONAL
        </div>
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-5">Sitemap</div>
        <ul className="space-y-3 text-sm">
          {[{ to: "/", label: "Home", id: "footer-home-link" }, ...NAV, { to: "/contact", label: "Contact", id: "footer-contact-link" }].map((l) => (
            <li key={l.to + l.label}>
              <Link to={l.to} data-testid={l.id} className="text-slate-400 hover:text-signal transition-colors">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-5">Practice Areas</div>
        <ul className="space-y-3 text-sm">
          {[
            ["server-computing", "Server & Computing"],
            ["network-connectivity", "Network & Connectivity"],
            ["data-center", "Data Center & Physical"],
            ["security-resilience", "Security & Resilience"],
            ["managed-infrastructure", "Managed Infrastructure"],
          ].map(([slug, label]) => (
            <li key={slug}>
              <Link to={`/services#${slug}`} data-testid={`footer-service-${slug}`} className="text-slate-400 hover:text-signal transition-colors">{label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-5">Direct</div>
        <a data-testid="footer-phone-link" href={CONTACT.phoneHref} className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-signal transition-colors">
          <Phone size={14} className="text-signal" /> {CONTACT.phone}
        </a>
        <a data-testid="footer-email-link" href={CONTACT.emailHref} className="mt-3 flex items-center gap-2.5 text-sm text-slate-300 hover:text-signal transition-colors">
          <Mail size={14} className="text-signal" /> {CONTACT.email}
        </a>
        <a data-testid="footer-whatsapp-link" href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2.5 text-sm text-slate-300 hover:text-[#25D366] transition-colors">
          <WhatsAppIcon size={14} className="text-[#25D366]" /> WhatsApp — {CONTACT.whatsapp}
        </a>
        <a
          data-testid="cta-download-capability-pdf"
          href={CAPABILITY_PDF_URL}
          className="mt-6 inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-xs font-mono uppercase tracking-[0.15em] text-slate-300 hover:border-signal/50 hover:text-signal transition-colors"
        >
          <FileDown size={14} /> Capability Statement
        </a>
        <p className="mt-5 text-xs text-slate-600 leading-relaxed">Response standard: every qualified inquiry is reviewed and answered within one business day.</p>
      </div>
    </div>
    <div className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[10px] tracking-[0.2em] text-slate-600 uppercase">
        <span>© {new Date().getFullYear()} CoreGridX Technologies</span>
        <span>Infrastructure / Engineered</span>
      </div>
    </div>
  </footer>
);

const Layout = ({ children }) => (
  <div className="min-h-screen bg-void text-slate-200">
    <Header />
    <main className="pt-16">{children}</main>
    <Footer />
    <WhatsAppFloat />
  </div>
);

export default Layout;
