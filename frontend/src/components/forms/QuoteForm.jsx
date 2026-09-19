import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { inputCls, Field, Honeypot, Select } from "./fields";

const STEPS = ["Organization", "Project", "Contact"];

const init = {
  org_type: "", sites: "", users_devices: "", environment: "",
  project_type: "", timeline: "", budget: "",
  name: "", email: "", company: "", phone: "", message: "", website: "",
};

const QuoteForm = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(init);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const validate = (s) => {
    const er = {};
    if (s === 0) {
      if (!data.org_type) er.org_type = "Required";
      if (!data.sites) er.sites = "Required";
      if (!data.users_devices) er.users_devices = "Required";
      if (!data.environment) er.environment = "Required";
    }
    if (s === 1) {
      if (!data.project_type) er.project_type = "Required";
      if (!data.timeline) er.timeline = "Required";
      if (!data.budget) er.budget = "Required";
    }
    if (s === 2) {
      if (data.name.trim().length < 2) er.name = "Required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) er.email = "Valid work email required";
      if (data.company.trim().length < 2) er.company = "Required";
    }
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const next = () => validate(step) && setStep(step + 1);
  const back = () => setStep(step - 1);

  const submit = async (e) => {
    e.preventDefault();
    if (!validate(2)) return;
    setBusy(true);
    try {
      await api.post("/leads/quote", data);
      setDone(true);
      toast.success("Quote request received. An engineer will review your scope and respond within one business day.");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Submission failed. Please try again or email us directly.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="border border-pulse/30 bg-pulse/5 p-10 text-center" data-testid="quote-form-success">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-pulse">[ Request Logged ]</div>
        <h3 className="mt-4 font-display text-2xl font-bold text-slate-50">Scope received.</h3>
        <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Your request enters manual qualification review. If the fit is right, an engineer will reach out within one business day to schedule a structured discovery call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative" data-testid="quote-form">
      <Honeypot value={data.website} onChange={set("website")} />
      <div className="flex items-center gap-0 mb-8 border border-white/10">
        {STEPS.map((s, i) => (
          <div
            key={s}
            data-testid={`quote-form-step-${i + 1}`}
            className={`flex-1 px-3 py-3 text-center font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] transition-colors ${
              i === step ? "bg-signal/10 text-signal border-b-2 border-signal" : i < step ? "text-pulse" : "text-slate-600"
            }`}
          >
            {String(i + 1).padStart(2, "0")} / {s}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {step === 0 && (
            <>
              <Field label="Organization type" error={errors.org_type} testid="quote-org-type">
                <Select testid="quote-org-type-select" value={data.org_type} onChange={set("org_type")} placeholder="Select organization type"
                  options={["Enterprise (1000+ users)", "Multi-site organization", "SME (50–250 users)", "Small business (<50 users)", "Public sector / education", "Other"]} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Number of sites" error={errors.sites} testid="quote-sites">
                  <Select testid="quote-sites-select" value={data.sites} onChange={set("sites")} placeholder="Select"
                    options={["1 site", "2–5 sites", "6–20 sites", "20+ sites"]} />
                </Field>
                <Field label="Approx. users / devices" error={errors.users_devices} testid="quote-users">
                  <Select testid="quote-users-select" value={data.users_devices} onChange={set("users_devices")} placeholder="Select"
                    options={["Under 50", "50–250", "250–1,000", "1,000+"]} />
                </Field>
              </div>
              <Field label="Current infrastructure environment" error={errors.environment} testid="quote-environment">
                <Select testid="quote-environment-select" value={data.environment} onChange={set("environment")} placeholder="Select"
                  options={["On-premises", "Cloud-hosted", "Hybrid (on-prem + cloud)", "Mixed / inherited environment", "Not sure — need an assessment"]} />
              </Field>
            </>
          )}
          {step === 1 && (
            <>
              <Field label="Project type" error={errors.project_type} testid="quote-project-type">
                <Select testid="quote-project-type-select" value={data.project_type} onChange={set("project_type")} placeholder="Select project type"
                  options={["Multi-site deployment", "Server & virtualization environment", "Network upgrade / refresh", "Firewall, VPN & segmentation", "Data center build or refresh", "Managed infrastructure (ongoing)", "Other infrastructure project"]} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Timeline" error={errors.timeline} testid="quote-timeline">
                  <Select testid="quote-timeline-select" value={data.timeline} onChange={set("timeline")} placeholder="Select"
                    options={["Immediate (this quarter)", "1–3 months", "3–6 months", "6+ months", "Planning / budgeting stage"]} />
                </Field>
                <Field label="Budget range" error={errors.budget} testid="quote-budget">
                  <Select testid="quote-budget-select" value={data.budget} onChange={set("budget")} placeholder="Select"
                    options={["Under $10k", "$10k – $50k", "$50k – $150k", "$150k+", "To be scoped with you"]} />
                </Field>
              </div>
              <Field label="Project notes (optional)" testid="quote-notes">
                <textarea rows={4} value={data.message} onChange={set("message")} data-testid="quote-notes-input"
                  placeholder="Current pain points, constraints, incumbent vendors, anything that shapes scope."
                  className={`${inputCls} resize-none`} />
              </Field>
            </>
          )}
          {step === 2 && (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Full name" error={errors.name} testid="quote-name">
                  <input className={inputCls} data-testid="quote-name-input" value={data.name} onChange={set("name")} placeholder="Your name" />
                </Field>
                <Field label="Work email" error={errors.email} testid="quote-email">
                  <input className={inputCls} data-testid="quote-email-input" type="email" value={data.email} onChange={set("email")} placeholder="you@company.com" />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Company" error={errors.company} testid="quote-company">
                  <input className={inputCls} data-testid="quote-company-input" value={data.company} onChange={set("company")} placeholder="Organization name" />
                </Field>
                <Field label="Phone (optional)" testid="quote-phone">
                  <input className={inputCls} data-testid="quote-phone-input" value={data.phone} onChange={set("phone")} placeholder="+1 ..." />
                </Field>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed border-l-2 border-signal/30 pl-4">
                Requests are reviewed by an engineer before any call is scheduled. We respond to qualified projects within one business day.
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-9 flex justify-between items-center">
        {step > 0 ? (
          <button type="button" onClick={back} data-testid="quote-form-back-button"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors font-medium">
            <ArrowLeft size={15} /> Back
          </button>
        ) : <span />}
        {step < 2 ? (
          <button type="button" onClick={next} data-testid="quote-form-next-button"
            className="inline-flex items-center gap-2 border border-signal/50 text-signal font-display font-semibold text-sm px-7 py-3 hover:bg-signal hover:text-void transition-colors">
            Continue <ArrowRight size={15} />
          </button>
        ) : (
          <button type="submit" disabled={busy} data-testid="quote-form-submit-button"
            className="inline-flex items-center gap-2 bg-signal text-void font-display font-semibold text-sm px-7 py-3 hover:bg-white transition-colors disabled:opacity-50">
            {busy ? "Submitting..." : "Submit Quote Request"} <Send size={15} />
          </button>
        )}
      </div>
    </form>
  );
};

export default QuoteForm;
