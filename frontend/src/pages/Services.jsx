import { Server, Network, HardDrive, ShieldCheck, Activity, Check } from "lucide-react";
import CTASection from "@/components/CTASection";
import { Reveal, Eyebrow, MaskLine } from "@/components/Reveal";
import { SERVICES } from "@/lib/content";

const ICONS = { Server, Network, HardDrive, ShieldCheck, Activity };

const Services = () => (
  <div data-testid="services-page">
    <section className="relative bg-blueprint border-b border-white/10 overflow-hidden">
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent animate-scan-line pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
        <Eyebrow>Services</Eyebrow>
        <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.06] text-4xl sm:text-5xl lg:text-6xl text-slate-50 max-w-3xl">
          <MaskLine delay={0.15}>Five practice areas.</MaskLine>
          <MaskLine delay={0.28} className="text-signal">One engineering standard.</MaskLine>
        </h1>
        <Reveal delay={0.45}>
          <p className="mt-7 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            We work across the full infrastructure stack — compute, network, physical layer, security, and ongoing management.
            Each engagement is scoped in writing before it is priced.
          </p>
        </Reveal>
      </div>
    </section>

    {SERVICES.map((s, i) => {
      const Icon = ICONS[s.icon];
      return (
        <section key={s.slug} id={s.slug} className="border-b border-white/10 scroll-mt-24" data-testid={`service-section-${s.slug}`}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-12 gap-10">
            <Reveal className="lg:col-span-5">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 border border-signal/40 flex items-center justify-center text-signal">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <span className="font-mono text-sm text-slate-600">{s.num} /</span>
              </div>
              <h2 className="mt-6 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50 leading-[1.12]">{s.title}</h2>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-signal/70">[ {s.tag} ]</div>
              <p className="mt-6 text-slate-400 leading-relaxed">{s.blurb}</p>
            </Reveal>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
              <Reveal delay={0.1}>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-5">What we deliver</div>
                <ul className="space-y-3.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                      <Check size={15} className="text-signal shrink-0 mt-0.5" /> {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-5">Typical engagements</div>
                <div className="space-y-2.5">
                  {s.engagements.map((e) => (
                    <div key={e} className="border border-white/10 bg-panel/50 px-4 py-3.5 font-mono text-xs text-slate-300 hover:border-signal/40 hover:text-signal transition-colors">
                      {e}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      );
    })}

    <CTASection title="Not sure which practice area fits?" sub="Most real projects span several. Describe your environment and objectives — we will map the scope to the right disciplines during qualification." />
  </div>
);

export default Services;
