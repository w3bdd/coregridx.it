import CTASection from "@/components/CTASection";
import FramedImage from "@/components/FramedImage";
import { Reveal, Eyebrow, MaskLine } from "@/components/Reveal";
import { TECH_AREAS, IMAGES } from "@/lib/content";

const Technology = () => (
  <div data-testid="technology-page">
    <section className="bg-blueprint border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
        <Eyebrow>Technology Areas</Eyebrow>
        <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.06] text-4xl sm:text-5xl lg:text-6xl text-slate-50 max-w-3xl">
          <MaskLine delay={0.15}>Ecosystem fluency,</MaskLine>
          <MaskLine delay={0.28} className="text-signal">honestly stated.</MaskLine>
        </h1>
        <Reveal delay={0.45}>
          <p className="mt-7 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            The platforms and ecosystems we work in day to day. Familiarity here reflects hands-on project
            experience — vendor names indicate ecosystem experience, not partnership or certification claims.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <Reveal>
          <FramedImage
            src={IMAGES.terminalSudo}
            alt="Linux terminal on an engineering workstation"
            caption="[ Working-Level Fluency, Honestly Stated ]"
            ratio="aspect-[21/9]"
            testid="technology-band-image"
          />
        </Reveal>
      </div>
    </section>

    <section>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {TECH_AREAS.map((area, i) => (
            <Reveal key={area.category} delay={i * 0.05}>
              <div className="bg-void p-8 h-full hover:bg-panel transition-colors" data-testid={`tech-area-${i}`}>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal/70">
                  [ {String(i + 1).padStart(2, "0")} ]
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-slate-100">{area.category}</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.items.map((item) => (
                    <span key={item} className="border border-white/10 bg-panel/60 px-3 py-1.5 font-mono text-[11px] text-slate-400 hover:border-signal/40 hover:text-signal transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 border border-white/10 bg-panel/30 p-7 max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-warn mb-3">[ Claim Boundary ]</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Where formal vendor partnerships or certifications apply to your project, we will state them explicitly
              in the proposal — with evidence. If a project demands credentials we do not hold, we say so and
              recommend a path that works.
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    <CTASection title="Have a specific stack in mind?" sub="Tell us what you run today. We will tell you plainly where our experience is deep, where it is working-level, and where we would bring in a specialist." />
  </div>
);

export default Technology;
