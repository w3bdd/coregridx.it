import { Mail, Briefcase, Handshake, ArrowUpRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import { Reveal, Eyebrow, MaskLine } from "@/components/Reveal";
import { OPEN_ROLES } from "@/lib/content";
import { CONTACT } from "@/lib/api";

const PARTNER_TYPES = [
  { title: "Technology Vendors", body: "Hardware, software, and distribution partners whose platforms we deploy. We bring disciplined delivery and documented handovers." },
  { title: "Referral Partners", body: "Consultancies, MSPs, and agencies that encounter infrastructure scope outside their lane. We handle it properly and credit the source." },
  { title: "Complementary MSPs", body: "Managed service providers needing project-grade engineering capacity for deployments beyond their bench." },
];

const WorkWithUs = () => (
  <div data-testid="work-with-us-page">
    <section className="bg-blueprint border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
        <Eyebrow>Work With Us</Eyebrow>
        <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.06] text-4xl sm:text-5xl lg:text-6xl text-slate-50 max-w-3xl">
          <MaskLine delay={0.15}>Engineers and partners,</MaskLine>
          <MaskLine delay={0.28} className="text-signal">same standard.</MaskLine>
        </h1>
        <Reveal delay={0.45}>
          <p className="mt-7 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Whether you want to build infrastructure with us or build alongside us — the expectation is identical:
            disciplined work, honestly represented.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <Reveal className="flex items-center gap-4">
          <span className="w-11 h-11 border border-white/15 flex items-center justify-center text-signal"><Briefcase size={20} strokeWidth={1.6} /></span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">Careers</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 text-slate-400 max-w-2xl leading-relaxed">
            We hire for documentation habits and troubleshooting discipline over certification bingo.
            If you take pride in handovers another engineer can pick up cold, you will fit here.
          </p>
        </Reveal>
        <div className="mt-12 space-y-px border border-white/10 bg-white/10">
          {OPEN_ROLES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="bg-void p-7 sm:p-8 grid sm:grid-cols-12 gap-4 items-center hover:bg-panel transition-colors" data-testid={`role-card-${i}`}>
                <div className="sm:col-span-5">
                  <h3 className="font-display text-xl font-semibold text-slate-100">{r.title}</h3>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-signal/70">{r.type}</div>
                </div>
                <p className="sm:col-span-5 text-sm text-slate-400 leading-relaxed">{r.note}</p>
                <div className="sm:col-span-2 sm:text-right">
                  <a
                    href={`${CONTACT.emailHref}?subject=Application: ${encodeURIComponent(r.title)}`}
                    data-testid={`role-apply-${i}`}
                    className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-xs font-mono uppercase tracking-[0.15em] text-slate-300 hover:border-signal/50 hover:text-signal transition-colors"
                  >
                    Apply <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-6 text-xs text-slate-600 font-mono tracking-wide">
            [ No perfect listing? Speculative applications from infrastructure engineers are always read. ]
          </p>
        </Reveal>
      </div>
    </section>

    <section className="border-b border-white/10 bg-panel/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <Reveal className="flex items-center gap-4">
          <span className="w-11 h-11 border border-white/15 flex items-center justify-center text-signal"><Handshake size={20} strokeWidth={1.6} /></span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">Partnerships</h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {PARTNER_TYPES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="bg-void p-8 h-full hover:bg-panel transition-colors" data-testid={`partner-card-${i}`}>
                <div className="font-mono text-[10px] text-signal/60 tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-100">{p.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <a
            href={`${CONTACT.emailHref}?subject=Partnership Inquiry`}
            data-testid="partnership-email-button"
            className="mt-10 inline-flex items-center gap-2 border border-signal/50 text-signal font-display font-semibold text-sm px-7 py-3.5 hover:bg-signal hover:text-void transition-colors"
          >
            <Mail size={15} /> Start a partnership conversation
          </a>
        </Reveal>
      </div>
    </section>

    <CTASection title="Prefer to scope a project instead?" sub="If you landed here with an infrastructure problem rather than a career or partnership in mind — the quote form is the fastest path." />
  </div>
);

export default WorkWithUs;
