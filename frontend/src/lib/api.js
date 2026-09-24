import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
});

export const CONTACT = {
  phone: "+63 965 093 3555",
  phoneHref: "tel:+639650933555",
  email: "contact.coregridx@gmail.com",
  emailHref: "mailto:contact.coregridx@gmail.com",
};

export const CAPABILITY_PDF_URL = `${process.env.PUBLIC_URL}/capability-statement.pdf`;

// Lead submission works in two modes:
// 1. Full-stack (default): POSTs to the FastAPI backend (MongoDB + email notification).
// 2. Static hosting (GitHub Pages): when REACT_APP_LEAD_ENDPOINT is set, POSTs JSON to an
//    external form endpoint instead (Web3Forms, Formspree, FormSubmit, ...).
//    Web3Forms: REACT_APP_LEAD_ENDPOINT=https://api.web3forms.com/submit + REACT_APP_LEAD_KEY=<access_key>
export const submitLead = async (type, payload) => {
  const endpoint = process.env.REACT_APP_LEAD_ENDPOINT;
  if (endpoint) {
    if (payload.website) return { status: "ok" }; // honeypot tripped — silent accept
    const { website, ...fields } = payload;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: process.env.REACT_APP_LEAD_KEY || undefined,
        subject: `CoreGridX ${type} — ${fields.company || fields.name || "website lead"}`,
        form_type: type,
        ...fields,
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) throw new Error(json.message || "Submission failed");
    return json;
  }
  const res = await api.post(`/leads/${type}`, payload);
  return res.data;
};
