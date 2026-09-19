import { Target, Eye, Compass, Check } from "lucide-react";
import CTASection from "@/components/CTASection";
import { Reveal, Eyebrow, MaskLine } from "@/components/Reveal";

const VALUES = [
  { icon: Target, title: "Precision over volume", body: "We take fewer engagements and scope them properly. A well-defined project beats a busy pipeline." },
  { icon: Eye, title: "Transparency over polish", body: "We state what we know, what we don't, and what something will cost — before work begins." },
  { icon: Compass, title: "Longevity over novelty", body: "We design for the team that inherits the system in five years, not for the demo next week." },
];

const NO_CLAIMS = [
  "No 24/7 support claims until the coverage genuinely exists",
  "No certification or partner badges we have not earned",
  "No absolute security guarantees — security is process, not a promise",
  "No inflated team size or nationwide coverage implications",
  "No fake case studies, logos, or borrowed metrics",
];

const About = () => (
  <div data-testid="about-page">
    <section className="bg-blueprint border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
        <Eyebrow>About CoreGridX</Eyebrow>
        <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.06] text-4xl sm:text-5xl lg:text-6xl text-slate-50 max-w-3xl">
          <MaskLine delay={0.15}>An engineering firm</MaskLine>
          <MaskLine delay={0.28} className="text-signal">that happens to do IT.</MaskLine>
        </h1>
        <Reveal delay={0.45}>
          <p className="mt-7 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            CoreGridX Technologies was founded on a simple observation: most infrastructure problems are not
            technology problems — they are discipline problems. We built a company around fixing that.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 grid lg:grid-cols-2 gap-px bg-white/10 lg:border lg:border-white/10">
        <Reveal className="bg-void p-8 sm:p-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">[ Mission ]</div>
          <p className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-slate-100 leading-snug">
            To make enterprise-grade infrastructure discipline accessible to any organization serious enough to want it.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="bg-void p-8 sm:p-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">[ Vision ]</div>
          <p className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-slate-100 leading-snug">
            A market where infrastructure is bought on engineering merit — documented, scoped, and accountable — not on salesmanship.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="border-b border-white/10 bg-panel/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <Reveal>
          <Eyebrow>Values</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">What we optimize for.</h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <div className="bg-void p-8 h-full hover:bg-panel transition-colors" data-testid={`value-card-${i}`}>
                <span className="w-11 h-11 border border-white/15 flex items-center justify-center text-signal">
                  <v.icon size={20} strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-slate-100">{v.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Trust, Without Inflation</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50 leading-[1.12]">
            What we deliberately don't claim.
          </h2>
          <p className="mt-5 text-slate-400 leading-relaxed">
            We are a focused engineering practice, not a global MSP. We believe the fastest way to earn
            enterprise trust is to be precise about what we are — and what we are not.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="border border-white/10 bg-panel/40 p-8 sm:p-10">
            <ul className="space-y-4">
              {NO_CLAIMS.map((c) => (
                <li key={c} className="flex gap-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                  <Check size={16} className="text-signal shrink-0 mt-1" /> {c}
                </li>
              ))}
            </ul>
            <p className="mt-8 pt-6 border-t border-white/10 text-sm text-slate-500 leading-relaxed">
              What we offer instead: clear scope, visible process, complete documentation, and references
              shared directly during discovery.
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    <CTASection title="Work with a team that says no." sub="If we are not the right fit for your project, we will tell you in the first conversation — and point you toward someone who is." />
  </div>
);

export default About;
