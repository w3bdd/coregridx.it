import CTASection from "@/components/CTASection";
import FramedImage from "@/components/FramedImage";
import { Reveal, Eyebrow, MaskLine } from "@/components/Reveal";
import { INDUSTRIES, IMAGES } from "@/lib/content";

const Industries = () => (
  <div data-testid="industries-page">
    <section className="bg-blueprint border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
        <Eyebrow>Industries Served</Eyebrow>
        <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.06] text-4xl sm:text-5xl lg:text-6xl text-slate-50 max-w-3xl">
          <MaskLine delay={0.15}>The same discipline,</MaskLine>
          <MaskLine delay={0.28} className="text-signal">different constraints.</MaskLine>
        </h1>
        <Reveal delay={0.45}>
          <p className="mt-7 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Infrastructure requirements shift by sector — compliance scope, uptime tolerance, physical environment.
            We design for the context, not just the spec sheet.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <Reveal>
          <FramedImage
            src={IMAGES.rackSwitch}
            alt="Rack-mounted network switch with active Ethernet and fiber connections"
            caption="[ Every Sector Runs on This Layer ]"
            ratio="aspect-[21/9]"
            testid="industries-band-image"
          />
        </Reveal>
      </div>
    </section>

    <section>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.04}>
              <div className="bg-void p-8 h-full hover:bg-panel transition-colors group" data-testid={`industry-card-${i}`}>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-signal/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1 mx-4 bg-white/10 group-hover:bg-signal/30 transition-colors" />
                </div>
                <h2 className="mt-4 font-display text-xl font-semibold text-slate-100 group-hover:text-signal transition-colors">{ind.name}</h2>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{ind.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600 max-w-2xl leading-relaxed">
            [ Sector descriptions reflect infrastructure experience. References and project specifics are shared during discovery, under NDA where required. ]
          </p>
        </Reveal>
      </div>
    </section>

    <CTASection title="Your sector, your constraints." sub="Tell us about your regulatory scope, uptime requirements, and site profile — we will tell you honestly whether we are the right fit." />
  </div>
);

export default Industries;
