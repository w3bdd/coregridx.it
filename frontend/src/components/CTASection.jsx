import { useNavigate } from "react-router-dom";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/Reveal";

const CTASection = ({ title = "Scope your infrastructure project.", sub = "Tell us about your environment and objectives. Every request is reviewed by an engineer — qualified projects get a structured discovery call, not a sales pitch." }) => {
  const navigate = useNavigate();
  return (
    <section className="border-t border-white/10 bg-blueprint-fine">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <Reveal>
          <Eyebrow>Next Step</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50 max-w-2xl leading-[1.1]">{title}</h2>
          <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">{sub}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <button
              data-testid="cta-section-quote-button"
              onClick={() => navigate("/contact?tab=quote")}
              className="inline-flex items-center gap-2 bg-signal text-void font-display font-semibold text-sm px-7 py-3.5 hover:bg-white transition-colors"
            >
              Request a Quote <ArrowUpRight size={16} />
            </button>
            <button
              data-testid="cta-request-consultation-button"
              onClick={() => navigate("/contact?tab=consultation")}
              className="inline-flex items-center gap-2 border border-white/15 text-slate-200 font-display font-medium text-sm px-7 py-3.5 hover:border-signal/60 hover:text-signal transition-colors"
            >
              Request a Consultation <CalendarClock size={16} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTASection;
