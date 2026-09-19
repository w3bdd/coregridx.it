import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { inputCls, Field, Honeypot, Select } from "./fields";

const init = { name: "", email: "", company: "", role: "", phone: "", focus_area: "", timeframe: "", message: "", website: "" };

const ConsultationForm = () => {
  const [data, setData] = useState(init);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (data.name.trim().length < 2) er.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) er.email = "Valid email required";
    if (data.company.trim().length < 2) er.company = "Required";
    if (!data.focus_area) er.focus_area = "Required";
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      await api.post("/leads/consultation", data);
      setDone(true);
      toast.success("Consultation request received. We confirm fit by email before scheduling.");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Submission failed. Please try again or email us directly.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="border border-pulse/30 bg-pulse/5 p-10 text-center" data-testid="consultation-form-success">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-pulse">[ Request Logged ]</div>
        <h3 className="mt-4 font-display text-2xl font-bold text-slate-50">Under review.</h3>
        <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Consultations are scheduled after a short qualification review. If the fit is right, we will confirm a time by email — usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative space-y-6" data-testid="consultation-form">
      <Honeypot value={data.website} onChange={set("website")} />
      <div className="border border-warn/30 bg-warn/5 px-5 py-4 text-xs text-slate-400 leading-relaxed">
        <span className="font-mono text-warn uppercase tracking-[0.15em]">Note: </span>
        We do not offer open calendar booking. Requests are qualified first, then scheduled — so your time is spent with the right engineer, on the right problem.
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Full name" error={errors.name} testid="consult-name">
          <input className={inputCls} data-testid="consult-name-input" value={data.name} onChange={set("name")} placeholder="Your name" />
        </Field>
        <Field label="Work email" error={errors.email} testid="consult-email">
          <input className={inputCls} data-testid="consult-email-input" type="email" value={data.email} onChange={set("email")} placeholder="you@company.com" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Company" error={errors.company} testid="consult-company">
          <input className={inputCls} data-testid="consult-company-input" value={data.company} onChange={set("company")} placeholder="Organization name" />
        </Field>
        <Field label="Your role" testid="consult-role">
          <input className={inputCls} data-testid="consult-role-input" value={data.role} onChange={set("role")} placeholder="e.g. IT Director" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Focus area" error={errors.focus_area} testid="consult-focus">
          <Select testid="consult-focus-select" value={data.focus_area} onChange={set("focus_area")} placeholder="Select focus area"
            options={["Infrastructure assessment", "Multi-site networking", "Server & virtualization strategy", "Security posture review", "Data center planning", "Managed infrastructure", "Other"]} />
        </Field>
        <Field label="Preferred timeframe" testid="consult-timeframe">
          <Select testid="consult-timeframe-select" value={data.timeframe} onChange={set("timeframe")} placeholder="Select"
            options={["This week", "Within 2 weeks", "Within a month", "Flexible"]} />
        </Field>
      </div>
      <Field label="What should we prepare for?" testid="consult-message">
        <textarea rows={4} className={`${inputCls} resize-none`} data-testid="consult-message-input"
          value={data.message} onChange={set("message")} placeholder="Context, constraints, and what a good outcome looks like." />
      </Field>
      <div className="flex justify-end">
        <button type="submit" disabled={busy} data-testid="consultation-form-submit-button"
          className="inline-flex items-center gap-2 bg-signal text-void font-display font-semibold text-sm px-7 py-3 hover:bg-white transition-colors disabled:opacity-50">
          {busy ? "Submitting..." : "Request Consultation"} <CalendarClock size={15} />
        </button>
      </div>
    </form>
  );
};

export default ConsultationForm;
