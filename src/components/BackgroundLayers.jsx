import { useRef, useEffect } from 'react';
import ShaderBackground from './ShaderBackground';

// Layer 1: Neural network animated canvas
function NeuralNetCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let raf;

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Create nodes
    const nodeCount = 80;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Update
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,242,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulseAlpha = 0.3 + Math.sin(n.pulse) * 0.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,242,255,${pulseAlpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        pointerEvents: 'none', opacity: 0.6,
      }}
    />
  );
}

// Layer 2: Digital rain with engineering symbols
function DigitalRainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let raf;

    const symbols = 'ΣΨΩΔΛΘΦΠαβγδεζηθ∂∇∫∮∑∏√∞≈≠≤≥01∈∉⊂⊃∪∩→←↑↓◇○□△▽◁▷⊕⊗⊘⊙';
    const cols = Math.floor(w / 18);
    const drops = Array(cols).fill(0).map(() => Math.floor(Math.random() * -50));

    const draw = () => {
      ctx.fillStyle = 'rgba(2,4,8,0.04)';
      ctx.fillRect(0, 0, w, h);

      ctx.font = '11px Share Tech Mono, monospace';

      for (let i = 0; i < drops.length; i++) {
        const sym = symbols[Math.floor(Math.random() * symbols.length)];
        const y = drops[i] * 18;

        // Head glow
        ctx.fillStyle = `rgba(180,255,255,0.85)`;
        ctx.fillText(sym, i * 18, y);

        // Trail
        for (let t = 1; t <= 6; t++) {
          const trailAlpha = (1 - t / 6) * 0.2;
          ctx.fillStyle = `rgba(0,242,255,${trailAlpha})`;
          ctx.fillText(symbols[Math.floor(Math.random() * symbols.length)], i * 18, y - t * 18);
        }

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 1,
        pointerEvents: 'none', opacity: 0.18,
      }}
    />
  );
}

// Layer 3: Background gradient + vignette
function GradientBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: -1,
      background: `
        radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,30,50,0.8) 0%, transparent 70%),
        radial-gradient(ellipse 60% 40% at 20% 80%, rgba(0,10,40,0.5) 0%, transparent 60%),
        radial-gradient(ellipse 40% 30% at 80% 20%, rgba(20,0,40,0.4) 0%, transparent 60%),
        #020408
      `,
    }} />
  );
}

// Layer 4: Vignette
function Vignette() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none',
      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,4,8,0.6) 100%)',
    }} />
  );
}

export default function BackgroundLayers() {
  return (
    <>
      <ShaderBackground />
      <GradientBackground />
      <NeuralNetCanvas />
      <DigitalRainCanvas />
      <Vignette />
      <div className="grid-lines" />
      <div className="scanlines" />
    </>
  );
}
