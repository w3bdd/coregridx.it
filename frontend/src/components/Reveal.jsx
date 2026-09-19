import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 28 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
  >
    {children}
  </motion.div>
);

export const MaskLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden pb-1 ${className}`}>
    <motion.span
      className="block will-change-transform"
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export const Eyebrow = ({ children, className = "" }) => (
  <div className={`font-mono text-xs uppercase tracking-[0.25em] text-signal flex items-center gap-3 ${className}`}>
    <span className="h-px w-8 bg-signal/60 inline-block" />
    <span>{children}</span>
  </div>
);
