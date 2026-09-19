import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Grid2x2, Menu, X, ArrowUpRight, Phone, Mail, FileDown } from "lucide-react";
import { CONTACT } from "@/lib/api";

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
        <a
          data-testid="cta-download-capability-pdf"
          href={`${process.env.REACT_APP_BACKEND_URL}/api/capability-statement.pdf`}
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
  </div>
);

export default Layout;
