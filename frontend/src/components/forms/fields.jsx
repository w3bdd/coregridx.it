export const inputCls =
  "w-full bg-panel border border-white/10 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-signal/60 transition-colors rounded-none";

export const Field = ({ label, error, children, testid }) => (
  <div data-testid={testid}>
    <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">{label}</label>
    {children}
    {error && <p className="mt-1.5 text-xs text-red-400" data-testid={`${testid}-error`}>{error}</p>}
  </div>
);

export const Honeypot = ({ value, onChange }) => (
  <div aria-hidden="true" className="absolute opacity-0 pointer-events-none" style={{ position: "absolute", left: "-9999px" }}>
    <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
  </div>
);

export const Select = ({ value, onChange, options, placeholder, testid }) => (
  <select
    value={value}
    onChange={onChange}
    data-testid={testid}
    className={`${inputCls} appearance-none cursor-pointer ${value ? "text-slate-200" : "text-slate-600"}`}
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300F0FF' stroke-width='2'%3e%3cpath d='M6 9l6 6 6-6'/%3e%3c/svg%3e\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 0.9rem center",
      backgroundSize: "0.9rem",
    }}
  >
    <option value="">{placeholder}</option>
    {options.map((o) => (
      <option key={o} value={o} className="bg-panel text-slate-200">{o}</option>
    ))}
  </select>
);
