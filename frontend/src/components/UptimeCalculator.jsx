import { useState } from "react";
import { Reveal, Eyebrow } from "@/components/Reveal";

const TIERS = [
  { key: "basic", label: "Single Points of Failure", reduction: 0.25 },
  { key: "redundant", label: "Redundant Core", reduction: 0.62 },
  { key: "ha", label: "High-Availability Design", reduction: 0.88 },
];

const fmt = (n) => "$" + Math.round(n).toLocaleString();

const UptimeCalculator = () => {
  const [hourly, setHourly] = useState(12000);
  const [tier, setTier] = useState(TIERS[1]);
  const annualHours = 40; // assumed unplanned downtime hours / year for unmaintained environments
  const exposure = hourly * annualHours;
  const avoided = exposure * tier.reduction;

  return (
    <section className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Downtime Exposure</Eyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50 leading-[1.12]">
            What does an hour of downtime cost you?
          </h2>
          <p className="mt-5 text-slate-400 leading-relaxed">
            Resilience is a design decision, not a hope. Model your exposure and see what a structured resilience tier changes.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
            Illustrative model — not a quote or a guarantee
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="border border-white/10 bg-panel/60 p-7 sm:p-9">
            <div className="flex justify-between items-baseline font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
              <span>Cost per hour of downtime</span>
              <span className="text-signal text-base" data-testid="uptime-cost-output">{fmt(hourly)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={hourly}
              onChange={(e) => setHourly(Number(e.target.value))}
              data-testid="uptime-calculator-slider"
              className="w-full mt-4 accent-signal"
            />
            <div className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">Resilience tier</div>
            <div className="grid sm:grid-cols-3 gap-2">
              {TIERS.map((t) => (
                <button
                  key={t.key}
                  data-testid={`uptime-tier-${t.key}`}
                  onClick={() => setTier(t)}
                  className={`border px-4 py-3.5 text-left text-xs font-medium transition-colors ${
                    tier.key === t.key ? "border-signal/60 text-signal bg-signal/5" : "border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
              <div className="bg-void p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Annual exposure (unmanaged)</div>
                <div className="mt-2 font-display text-2xl sm:text-3xl font-bold text-warn" data-testid="uptime-exposure-output">{fmt(exposure)}</div>
              </div>
              <div className="bg-void p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Exposure avoided with {tier.label.toLowerCase()}</div>
                <div className="mt-2 font-display text-2xl sm:text-3xl font-bold text-pulse" data-testid="uptime-avoided-output">{fmt(avoided)}</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default UptimeCalculator;
