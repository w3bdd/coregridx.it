import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import FramedImage from "@/components/FramedImage";
import { Reveal, Eyebrow, MaskLine } from "@/components/Reveal";
import { STAGES, IMAGES } from "@/lib/content";

const Approach = () => {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <div data-testid="approach-page">
      <section className="bg-blueprint border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
          <Eyebrow>The CoreGridX Lifecycle</Eyebrow>
          <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.06] text-4xl sm:text-5xl lg:text-6xl text-slate-50 max-w-3xl">
            <MaskLine delay={0.15}>Seven stages.</MaskLine>
            <MaskLine delay={0.28} className="text-signal">Zero improvisation.</MaskLine>
          </h1>
          <Reveal delay={0.45}>
            <p className="mt-7 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Every engagement — from a single firewall replacement to a multi-site deployment program —
              moves through the same disciplined lifecycle. That structure is the product.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <Reveal>
            <FramedImage
              src={IMAGES.blueprintDesk}
              alt="Engineering blueprints and precision tools on a design workbench"
              caption="[ Designed on Paper Before It Is Built in Metal ]"
              ratio="aspect-[21/9]"
              testid="approach-band-image"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <div className="space-y-px border border-white/10 bg-white/10">
              {STAGES.map((s, i) => (
                <button
                  key={s.num}
                  data-testid={`approach-stage-${s.num}`}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-6 py-5 flex items-center gap-5 transition-colors bg-void ${
                    i === active ? "border-l-2 border-signal" : "border-l-2 border-transparent hover:bg-panel"
                  }`}
                >
                  <span className={`font-mono text-sm ${i === active ? "text-signal" : "text-slate-600"}`}>{s.num}</span>
                  <span className={`font-display font-semibold text-lg ${i === active ? "text-slate-50" : "text-slate-400"}`}>{s.name}</span>
                  {i === active && <ArrowRight size={16} className="ml-auto text-signal" />}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="border border-white/10 bg-panel/40 p-8 sm:p-12 h-full"
                data-testid="approach-stage-panel"
              >
                <div className="font-mono text-6xl font-bold text-signal/15">{stage.num}</div>
                <h2 className="mt-4 font-display text-3xl font-bold text-slate-50">{stage.name}</h2>
                <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">{stage.desc}</p>
                <div className="mt-9 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-5">Stage deliverables</div>
                <ul className="space-y-3.5">
                  {stage.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                      <Check size={15} className="text-pulse shrink-0 mt-0.5" /> {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-panel/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Why It Matters</Eyebrow>
              <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-display">
                Most infrastructure failures are process failures — undocumented changes, skipped assessments,
                unscoped work. A visible, repeatable lifecycle is how we keep projects boring. Boring is the goal.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title="Start at stage one." sub="Every engagement begins with an assessment of your current environment. Request a consultation and we will scope it properly." />
    </div>
  );
};

export default Approach;
