const FramedImage = ({ src, alt, caption, ratio = "aspect-[4/3]", className = "", testid }) => (
  <figure className={`relative border border-white/10 bg-panel group ${className}`} data-testid={testid}>
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-signal/70 z-10 pointer-events-none" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-signal/70 z-10 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-signal/70 z-10 pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-signal/70 z-10 pointer-events-none" />
    <div className="overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full ${ratio} object-cover saturate-[0.75] contrast-[1.05] group-hover:saturate-100 group-hover:scale-[1.03] transition-all duration-700`}
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent pointer-events-none" />
    {caption && (
      <figcaption className="absolute bottom-0 inset-x-0 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300 bg-void/70 backdrop-blur-sm border-t border-white/10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-signal inline-block animate-pulse-dot" />
        {caption}
      </figcaption>
    )}
  </figure>
);

export default FramedImage;
