import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight, Server, Network, HardDrive, ShieldCheck, Activity, FileDown, Check, X } from "lucide-react";
import TopologyCanvas from "@/components/TopologyCanvas";
import Marquee from "@/components/Marquee";
import UptimeCalculator from "@/components/UptimeCalculator";
import CTASection from "@/components/CTASection";
import { Reveal, MaskLine, Eyebrow } from "@/components/Reveal";
import { SERVICES, SOLUTIONS, INDUSTRIES } from "@/lib/content";

const ICONS = { Server, Network, HardDrive, ShieldCheck, Activity };

const MANIFESTO = [
  { num: "01", title: "Engineering before sales", body: "Every engagement starts with an assessment of what actually exists. Recommendations come from measurements, not margin targets." },
  { num: "02", title: "Scope before scale", body: "We define boundaries, deliverables, and exclusions before we price. You approve a scope of work — not a vague promise." },
  { num: "03", title: "Documentation is a deliverable", body: "As-builts, runbooks, and asset registers ship with every project. If it isn't documented, it isn't delivered." },
  { num: "04", title: "Resilience by design", body: "Redundancy, segmentation, and recovery paths are designed in — not bolted on after the first outage." },
];

const FIT_IN = [
  "Multi-site deployments and network upgrades",
  "Server and virtualization environments",
  "Firewall, VPN, and segmentation projects",
  "Managed infrastructure for growing organizations",
  "Data center build-outs and refreshes",
];

const FIT_OUT = [
  "One-off consumer or home IT repairs",
  "Retail break-fix and same-day walk-in support",
  "Unmanaged device sales without a project scope",
];

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-blueprint">
        <TopologyCanvas className="absolute inset-0 w-full h-full" />
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent animate-scan-line pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/60 pointer-events-none" />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full py-24">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}>
              <Eyebrow>[ Infrastructure Engineering — Multi-Site Ready ]</Eyebrow>
            </motion.div>
            <h1 className="mt-7 font-display font-extrabold tracking-tight leading-[1.04] text-4xl sm:text-6xl lg:text-7xl text-slate-50 max-w-4xl">
              <MaskLine delay={0.25}>Infrastructure,</MaskLine>
              <MaskLine delay={0.38}>engineered for</MaskLine>
              <MaskLine delay={0.51} className="text-signal text-glow">the long run.</MaskLine>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="mt-7 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              CoreGridX designs, deploys, secures, and manages the server, network, and data center
              environments organizations depend on — with defined scope, disciplined delivery, and
              documentation that survives handover.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                data-testid="hero-quote-button"
                onClick={() => navigate("/contact?tab=quote")}
                className="inline-flex items-center gap-2 bg-signal text-void font-display font-semibold text-sm px-8 py-4 hover:bg-white transition-colors"
              >
                Request a Quote <ArrowUpRight size={16} />
              </button>
              <button
                data-testid="hero-services-button"
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-2 border border-white/20 text-slate-200 font-display font-medium text-sm px-8 py-4 hover:border-signal/60 hover:text-signal transition-colors"
              >
                Explore Services <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="relative border-t border-white/10 bg-void/60 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex flex-wrap gap-x-10 gap-y-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-500">
            <span data-testid="telemetry-lifecycle"><span className="text-signal">[</span> LIFECYCLE — ASSESS → OPTIMIZE <span className="text-signal">]</span></span>
            <span data-testid="telemetry-scope"><span className="text-signal">[</span> SCOPE — DEFINED, THEN PRICED <span className="text-signal">]</span></span>
            <span data-testid="telemetry-handover"><span className="text-signal">[</span> HANDOVER — FULLY DOCUMENTED <span className="text-signal">]</span></span>
          </div>
        </motion.div>
      </section>

      <Marquee />

      {/* QUALIFICATION */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Fit, Stated Plainly</Eyebrow>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50 leading-[1.12]">
              Built for serious infrastructure work.
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed">
              We are deliberate about the engagements we take. Clear fit means better delivery — for you and for us.
            </p>
          </Reveal>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            <Reveal className="bg-void p-7" delay={0.05}>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-pulse mb-5">[ Ideal Engagements ]</div>
              <ul className="space-y-3.5">
                {FIT_IN.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                    <Check size={15} className="text-pulse shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="bg-void p-7" delay={0.12}>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600 mb-5">[ Not The Right Fit ]</div>
              <ul className="space-y-3.5">
                {FIT_OUT.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-slate-500 leading-relaxed">
                    <X size={15} className="text-slate-600 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
          <Reveal>
            <Eyebrow>Operating Principles</Eyebrow>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">How we work, in four chapters.</h2>
          </Reveal>
          <div className="mt-14">
            {MANIFESTO.map((m, i) => (
              <Reveal key={m.num} delay={i * 0.06}>
                <div className="group grid grid-cols-12 gap-4 items-baseline border-t border-white/10 py-8 hover:bg-panel/40 transition-colors px-2 -mx-2" data-testid={`manifesto-chapter-${m.num}`}>
                  <div className="col-span-3 sm:col-span-2 font-mono text-signal/80 text-sm tracking-[0.2em]">{m.num} /</div>
                  <h3 className="col-span-9 sm:col-span-4 font-display text-xl sm:text-2xl font-semibold text-slate-100 group-hover:text-signal transition-colors">{m.title}</h3>
                  <p className="col-span-12 sm:col-span-6 text-sm sm:text-base text-slate-400 leading-relaxed">{m.body}</p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* SERVICE MATRIX */}
      <section className="border-b border-white/10 bg-blueprint-fine">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Practice Areas</Eyebrow>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">Five disciplines. One standard.</h2>
            </div>
            <button onClick={() => navigate("/services")} data-testid="home-all-services-button"
              className="inline-flex items-center gap-2 text-sm text-signal font-medium hover:gap-3 transition-all">
              All services <ArrowRight size={15} />
            </button>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <Reveal key={s.slug} delay={i * 0.05} className={i === 0 ? "lg:col-span-2" : ""}>
                  <button
                    onClick={() => navigate(`/services#${s.slug}`)}
                    data-testid={`home-service-card-${s.slug}`}
                    className="card-glow group w-full h-full text-left bg-void p-8 transition-colors hover:bg-panel flex flex-col"
                  >
                    <div className="flex items-start justify-between">
                      <span className="w-11 h-11 border border-white/15 flex items-center justify-center text-signal group-hover:bg-signal group-hover:text-void transition-colors">
                        <Icon size={20} strokeWidth={1.6} />
                      </span>
                      <span className="font-mono text-xs text-slate-600">{s.num}</span>
                    </div>
                    <h3 className="mt-7 font-display text-xl font-semibold text-slate-100 group-hover:text-signal transition-colors">{s.title}</h3>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed flex-1">{s.blurb}</p>
                    <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600 group-hover:text-signal/80 transition-colors flex items-center gap-2">
                      {s.tag} <ArrowUpRight size={12} />
                    </div>
                  </button>
                </Reveal>
              );
            })}
            <Reveal delay={0.25}>
              <button
                onClick={() => navigate("/contact?tab=quote")}
                data-testid="home-service-cta-card"
                className="group w-full h-full text-left bg-signal p-8 flex flex-col justify-between min-h-[220px] hover:bg-white transition-colors"
              >
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-void/70">Have a project in scope?</span>
                <span className="mt-6 font-display text-2xl font-bold text-void leading-tight">
                  Request a qualified quote <ArrowUpRight className="inline ml-1" size={22} />
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SOLUTIONS BY SCALE */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
          <Reveal>
            <Eyebrow>Solutions by Scale</Eyebrow>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">Sized to your operation.</h2>
          </Reveal>
          <div className="mt-14 grid lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.code} delay={i * 0.07}>
                <div className="bg-void p-8 h-full flex flex-col hover:bg-panel transition-colors" data-testid={`home-solution-${s.code.toLowerCase()}`}>
                  <div className="font-mono text-4xl font-bold text-signal/25">{s.code}</div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-slate-100">{s.title}</h3>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-signal/70">{s.range}</div>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed flex-1">{s.blurb}</p>
                  <ul className="mt-5 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-xs text-slate-400">
                        <span className="text-signal mt-0.5">▸</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <UptimeCalculator />

      {/* INDUSTRIES PREVIEW */}
      <section className="border-t border-b border-white/10 bg-panel/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Industries Served</Eyebrow>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">Infrastructure, in context.</h2>
            </div>
            <button onClick={() => navigate("/industries")} data-testid="home-industries-button"
              className="inline-flex items-center gap-2 text-sm text-signal font-medium hover:gap-3 transition-all">
              All industries <ArrowRight size={15} />
            </button>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.04}>
                <div className="bg-void p-6 h-full hover:bg-panel transition-colors group">
                  <div className="font-mono text-[10px] text-signal/50 tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-3 font-display font-semibold text-sm sm:text-base text-slate-200 group-hover:text-signal transition-colors">{ind.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITY STATEMENT */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <Reveal>
            <div className="border border-signal/25 bg-gradient-to-r from-signal/5 to-transparent p-8 sm:p-12 flex flex-col md:flex-row md:items-center gap-8 justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">[ Procurement-Ready ]</div>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-slate-50">Company profile & capability statement</h3>
                <p className="mt-3 text-sm text-slate-400 max-w-lg leading-relaxed">
                  A one-document overview of our practice areas, delivery lifecycle, and engagement profile — formatted for vendor evaluation and internal approval processes.
                </p>
              </div>
              <a
                data-testid="home-capability-pdf-button"
                href={`${process.env.REACT_APP_BACKEND_URL}/api/capability-statement.pdf`}
                className="shrink-0 inline-flex items-center gap-2.5 bg-signal text-void font-display font-semibold text-sm px-7 py-4 hover:bg-white transition-colors"
              >
                <FileDown size={16} /> Download PDF
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Home;
