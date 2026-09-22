import CTASection from "@/components/CTASection";
import FramedImage from "@/components/FramedImage";
import { Reveal, Eyebrow, MaskLine } from "@/components/Reveal";
import { SOLUTIONS, IMAGES } from "@/lib/content";
import { Check } from "lucide-react";

const Solutions = () => (
  <div data-testid="solutions-page">
    <section className="bg-blueprint border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
        <Eyebrow>Solutions by Scale</Eyebrow>
        <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.06] text-4xl sm:text-5xl lg:text-6xl text-slate-50 max-w-3xl">
          <MaskLine delay={0.15}>Architecture matched</MaskLine>
          <MaskLine delay={0.28} className="text-signal">to operational reality.</MaskLine>
        </h1>
        <Reveal delay={0.45}>
          <p className="mt-7 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            A ten-person firm and a ten-site enterprise do not need the same answer. We design for the organization you are —
            and the one you are becoming.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <Reveal>
          <FramedImage
            src={IMAGES.chassisRear}
            alt="Rear of an enterprise server chassis with redundant fans and power supplies"
            caption="[ Redundancy Is a Design Decision ]"
            ratio="aspect-[21/9]"
            testid="solutions-band-image"
          />
        </Reveal>
      </div>
    </section>

    <section>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 space-y-px">
        {SOLUTIONS.map((s, i) => (
          <Reveal key={s.code} delay={i * 0.05}>
            <div className="grid lg:grid-cols-12 gap-8 border border-white/10 bg-panel/30 p-8 sm:p-12 hover:border-signal/25 transition-colors" data-testid={`solution-block-${s.code.toLowerCase()}`}>
              <div className="lg:col-span-4">
                <div className="font-mono text-5xl font-bold text-signal/20">{s.code}</div>
                <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-slate-50">{s.title}</h2>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-signal/70">[ {s.range} ]</div>
              </div>
              <div className="lg:col-span-8">
                <p className="text-slate-400 leading-relaxed text-base sm:text-lg">{s.blurb}</p>
                <ul className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                      <Check size={15} className="text-pulse shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="border-t border-white/10 bg-panel/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>A Note on Fit</Eyebrow>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-display">
              If you are looking for the cheapest possible break-fix support, we are not the right partner.
              If you want infrastructure that is scoped, documented, and maintained like it matters — that is exactly what we do.
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    <CTASection />
  </div>
);

export default Solutions;
