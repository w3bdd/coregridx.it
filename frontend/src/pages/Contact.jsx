import { useSearchParams } from "react-router-dom";
import { Phone, Mail, Timer } from "lucide-react";
import QuoteForm from "@/components/forms/QuoteForm";
import ContactForm from "@/components/forms/ContactForm";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { Reveal, Eyebrow, MaskLine } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/Layout";
import { CONTACT } from "@/lib/api";

const TABS = [
  { key: "quote", label: "Request a Quote", desc: "Scoped projects — infrastructure builds, upgrades, managed environments.", testid: "tab-quote-button" },
  { key: "consultation", label: "Request a Consultation", desc: "A focused conversation after a short qualification review.", testid: "tab-consultation-button" },
  { key: "contact", label: "General Contact", desc: "Everything else — partnerships, careers, questions.", testid: "tab-contact-button" },
];

const DIRECT = [
  { icon: Phone, label: "Call directly", value: CONTACT.phone, href: CONTACT.phoneHref, testid: "contact-phone-link" },
  { icon: Mail, label: "Email", value: CONTACT.email, href: CONTACT.emailHref, testid: "contact-email-link" },
  { icon: WhatsAppIcon, label: "WhatsApp", value: CONTACT.whatsapp, href: CONTACT.whatsappHref, external: true, testid: "contact-whatsapp-link" },
  { icon: Timer, label: "Response standard", value: "Within one business day", testid: "contact-response-standard" },
];

const Contact = () => {
  const [params, setParams] = useSearchParams();
  const tab = ["quote", "consultation", "contact"].includes(params.get("tab")) ? params.get("tab") : "quote";

  return (
    <div data-testid="contact-page">
      <section className="bg-blueprint border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.06] text-4xl sm:text-5xl lg:text-6xl text-slate-50 max-w-3xl">
            <MaskLine delay={0.15}>Start the conversation</MaskLine>
            <MaskLine delay={0.28} className="text-signal">on solid ground.</MaskLine>
          </h1>
          <Reveal delay={0.45}>
            <p className="mt-7 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Every inquiry is reviewed by an engineer before we respond. Qualified projects get a structured
              discovery call — not a sales pitch.
            </p>
          </Reveal>
          <Reveal delay={0.55}>
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 max-w-4xl">
              {DIRECT.map((d) => {
                const inner = (
                  <>
                    <d.icon size={16} className={d.external ? "text-[#25D366]" : "text-signal"} />
                    <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{d.label}</div>
                    <div className="mt-1 text-sm font-medium text-slate-200">{d.value}</div>
                  </>
                );
                return d.href ? (
                  <a key={d.label} href={d.href} {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-testid={d.testid} className="bg-void p-6 hover:bg-panel transition-colors block">{inner}</a>
                ) : (
                  <div key={d.label} data-testid={d.testid} className="bg-void p-6">{inner}</div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20">
          <div className="grid sm:grid-cols-3 gap-px bg-white/10 border border-white/10" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                data-testid={t.testid}
                onClick={() => setParams({ tab: t.key })}
                className={`p-5 text-left transition-colors ${tab === t.key ? "bg-signal/10 border-b-2 border-signal" : "bg-void hover:bg-panel border-b-2 border-transparent"}`}
              >
                <div className={`font-display font-semibold text-sm ${tab === t.key ? "text-signal" : "text-slate-200"}`}>{t.label}</div>
                <div className="mt-2 text-xs text-slate-500 leading-relaxed">{t.desc}</div>
              </button>
            ))}
          </div>
          <Reveal key={tab} className="mt-10 border border-white/10 bg-panel/20 p-7 sm:p-10">
            {tab === "quote" && <QuoteForm />}
            {tab === "consultation" && <ConsultationForm />}
            {tab === "contact" && <ContactForm />}
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
