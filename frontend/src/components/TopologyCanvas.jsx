import { useEffect, useRef } from "react";

const TopologyCanvas = ({ className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w = 0;
    let h = 0;
    let nodes = [];
    let links = [];
    let pulses = [];
    const mouse = { x: 0.5, y: 0.5 };
    const parent = canvas.parentElement;

    const build = () => {
      nodes = [];
      links = [];
      pulses = [];
      const cols = Math.max(6, Math.floor(w / 170));
      const rows = Math.max(4, Math.floor(h / 150));
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() < 0.72) {
            nodes.push({
              x: ((i + 0.5) / cols) * w + (Math.random() - 0.5) * (w / cols) * 0.7,
              y: ((j + 0.5) / rows) * h + (Math.random() - 0.5) * (h / rows) * 0.7,
              r: 1.4 + Math.random() * 2.2,
              phase: Math.random() * Math.PI * 2,
              hot: Math.random() < 0.14,
            });
          }
        }
      }
      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (j > i) {
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < (w / cols) * 1.7 && Math.random() < 0.55) links.push([i, j]);
          }
        });
      });
      pulses = links
        .map((l, i) => ({ l, t: Math.random(), speed: 0.0018 + Math.random() * 0.003 }))
        .filter(() => Math.random() < 0.45);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
    };

    const tick = (time) => {
      ctx.clearRect(0, 0, w, h);
      const px = (mouse.x - 0.5) * 26;
      const py = (mouse.y - 0.5) * 18;
      ctx.save();
      ctx.translate(px, py);

      ctx.lineWidth = 1;
      links.forEach(([i, j]) => {
        const a = nodes[i];
        const b = nodes[j];
        ctx.strokeStyle = "rgba(148, 163, 184, 0.10)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      pulses.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const a = nodes[p.l[0]];
        const b = nodes[p.l[1]];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "rgba(0, 240, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(0, 240, 255, 0.12)";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      nodes.forEach((n) => {
        const tw = 0.45 + 0.55 * Math.abs(Math.sin(time * 0.0008 + n.phase));
        if (n.hot) {
          ctx.fillStyle = `rgba(0, 240, 255, ${0.5 * tw})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = n.hot ? `rgba(0, 240, 255, ${tw})` : `rgba(148, 163, 184, ${0.35 * tw + 0.15})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    parent.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} data-testid="topology-canvas" aria-hidden="true" />;
};

export default TopologyCanvas;
