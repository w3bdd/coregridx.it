import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { inputCls, Field, Honeypot, Select } from "./fields";

const init = { name: "", email: "", company: "", phone: "", topic: "", message: "", website: "" };

const ContactForm = () => {
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
    if (data.message.trim().length < 10) er.message = "Tell us a little more (10+ characters)";
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      await api.post("/leads/contact", data);
      setDone(true);
      toast.success("Message received. We respond within one business day.");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Submission failed. Please try again or email us directly.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="border border-pulse/30 bg-pulse/5 p-10 text-center" data-testid="contact-form-success">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-pulse">[ Message Logged ]</div>
        <h3 className="mt-4 font-display text-2xl font-bold text-slate-50">Received.</h3>
        <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">Expect a reply from a real engineer within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative space-y-6" data-testid="contact-form">
      <Honeypot value={data.website} onChange={set("website")} />
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Full name" error={errors.name} testid="contact-name">
          <input className={inputCls} data-testid="contact-name-input" value={data.name} onChange={set("name")} placeholder="Your name" />
        </Field>
        <Field label="Email" error={errors.email} testid="contact-email">
          <input className={inputCls} data-testid="contact-email-input" type="email" value={data.email} onChange={set("email")} placeholder="you@company.com" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Company" error={errors.company} testid="contact-company">
          <input className={inputCls} data-testid="contact-company-input" value={data.company} onChange={set("company")} placeholder="Organization name" />
        </Field>
        <Field label="Topic" testid="contact-topic">
          <Select testid="contact-topic-select" value={data.topic} onChange={set("topic")} placeholder="Select a topic"
            options={["General inquiry", "Project discussion", "Partnership", "Careers", "Other"]} />
        </Field>
      </div>
      <Field label="Message" error={errors.message} testid="contact-message">
        <textarea rows={5} className={`${inputCls} resize-none`} data-testid="contact-message-input"
          value={data.message} onChange={set("message")} placeholder="What are you trying to solve?" />
      </Field>
      <div className="flex justify-end">
        <button type="submit" disabled={busy} data-testid="contact-form-submit-button"
          className="inline-flex items-center gap-2 bg-signal text-void font-display font-semibold text-sm px-7 py-3 hover:bg-white transition-colors disabled:opacity-50">
          {busy ? "Sending..." : "Send Message"} <Send size={15} />
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
