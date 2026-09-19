const ITEMS = [
  "Server & Computing",
  "Network & Connectivity",
  "Data Center Infrastructure",
  "Security & Resilience",
  "Managed Infrastructure",
  "Multi-Site Deployments",
  "Firewall / VPN / Segmentation",
  "Virtualization Environments",
];

const Marquee = () => (
  <div className="overflow-hidden border-y border-white/10 bg-panel/40 py-5" data-testid="editorial-marquee">
    <div className="flex w-max whitespace-nowrap animate-marquee">
      {[...ITEMS, ...ITEMS].map((t, i) => (
        <span key={i} className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-slate-500 px-6 flex items-center gap-12">
          {t}
          <span className="text-signal/70">{"//"}</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
