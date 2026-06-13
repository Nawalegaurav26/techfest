import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const DIAGNOSTICS = [
  'INITIALIZING SYSTEM BOOT v5.02...',
  'MOUNTING NEURAL CONSCIOUSNESS CORE... OK',
  'ESTABLISHING ENCRYPTED LINK TO IIT BOMBAY GATEWAYS... SECURE',
  'SYNCING CYBORG MANIFEST DATA PACKS... OK',
  'CALIBRATING HYSTERESIS FILTERS... OK',
  'DOWNLOADING LATEST COMPETITIONS SCHEMATICS... OK',
  'PREPARING HIGH-LEVEL INTELLECTUAL SYNC CHANNELS... OK',
  'VERIFYING USER COGNITIVE LAYER... SECURE',
  'SYSTEM ONLINE. READY FOR DIRECT SYNC.'
];

export default function BootLoader({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [bootPhase, setBootPhase] = useState('diagnostics'); // 'diagnostics', 'ready', 'booting'
  
  // Real-time telemetry readouts
  const [telemetry, setTelemetry] = useState({
    clock: '00:00:00.000',
    rate: '0.00 GB/s',
    integrity: '100.00%',
    temp: '28.4°C'
  });

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  // Update clock & live fluctuating data metrics
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      
      const randomRate = (25.4 + Math.random() * 8.6).toFixed(2) + ' GB/s';
      const randomIntegrity = (99.85 + Math.random() * 0.15).toFixed(2) + '%';
      const randomTemp = (32.1 + Math.random() * 1.8).toFixed(1) + '°C';

      setTelemetry({
        clock: timeStr,
        rate: randomRate,
        integrity: randomIntegrity,
        temp: randomTemp
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // HTML5 Canvas Interactive Fluid Swarm Particle Mesh
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 65;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.3 ? 'rgba(0, 242, 255, 0.4)' : 'rgba(255, 45, 85, 0.4)'
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Update & Draw particles
      particles.forEach((p) => {
        // Mouse attraction using smooth acceleration (force-field physics)
        if (mouseRef.current.x !== null) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            p.vx += (dx / dist) * force * 0.18;
            p.vy += (dy / dist) * force * 0.18;
          }
        }

        // Apply friction/drag to make motion feel liquid and controlled
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Apply a gentle random walk/drift so particles remain lively
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;

        p.x += p.vx;
        p.y += p.vy;

        // Soft bounce boundaries
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > h) { p.y = h; p.vy *= -1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 110) * 0.18;
            ctx.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      if (mouseRef.current.x !== null) {
        particles.forEach((p) => {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(p.x, p.y);
            const alpha = (1 - dist / 130) * 0.25;
            ctx.strokeStyle = `rgba(255, 45, 85, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Print diagnostic lines sequentially
  useEffect(() => {
    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx < DIAGNOSTICS.length) {
        const currentLine = DIAGNOSTICS[lineIdx];
        setLines(prev => [...prev, currentLine]);
        lineIdx++;
        try { soundEffects.playTypewriter?.(); } catch {}
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // Sync progress bar and state to diagnostic lines
  useEffect(() => {
    if (lines.length === 0) return;
    const targetProgress = Math.min(Math.floor((lines.length / DIAGNOSTICS.length) * 100), 100);
    setProgress(targetProgress);

    if (lines.length === DIAGNOSTICS.length) {
      const timeout = setTimeout(() => {
        setBootPhase('ready');
        try { soundEffects.playSuccess?.(); } catch {}
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [lines]);

  const handleStartBoot = (enableSound) => {
    window.__soundEnabled = enableSound;
    try {
      if (enableSound) {
        soundEffects.startBackgroundMusic?.();
      }
      soundEffects.playTransition?.();
    } catch {}

    setBootPhase('booting');
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#040407',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)'
    }}>
      {/* HTML5 Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Cybernetic HUD Frame */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '850px',
        background: 'rgba(8, 8, 12, 0.88)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 242, 255, 0.2)',
        boxShadow: '0 0 40px rgba(0, 242, 255, 0.08), inset 0 0 20px rgba(0, 242, 255, 0.03)',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        {/* CRT Scanline Beam sweep */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 242, 255, 0.04) 10%, transparent 20%)',
          animation: 'crtSweep 6s linear infinite',
          pointerEvents: 'none',
          zIndex: 10
        }} />

        {/* L-bracket border accents */}
        <div className="bracket-tl" style={{ borderColor: 'var(--sky)', width: '24px', height: '24px' }} />
        <div className="bracket-tr" style={{ borderColor: 'var(--sky)', width: '24px', height: '24px', position: 'absolute', top: -1, right: -1, borderTop: '2px solid var(--sky)', borderRight: '2px solid var(--sky)' }} />
        <div className="bracket-bl" style={{ borderColor: 'var(--sky)', width: '24px', height: '24px', position: 'absolute', bottom: -1, left: -1, borderBottom: '2px solid var(--sky)', borderLeft: '2px solid var(--sky)' }} />
        <div className="bracket-br" style={{ borderColor: 'var(--sky)', width: '24px', height: '24px', position: 'absolute', bottom: -1, right: -1, borderBottom: '2px solid var(--sky)', borderRight: '2px solid var(--sky)' }} />

        {/* Top Header stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 242, 255, 0.15)',
          paddingBottom: '16px',
          fontSize: '11px',
          color: 'rgba(0, 242, 255, 0.65)',
          fontWeight: 700,
          letterSpacing: '0.15em'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--plasma)', borderRadius: '50%', boxShadow: '0 0 8px var(--plasma)', display: 'inline-block' }} />
            IIT BOMBAY // SYSTEM BOOT TELEMETRY
          </div>
          <div style={{ color: 'var(--sky)', textShadow: '0 0 10px rgba(0, 242, 255, 0.4)' }}>CORE STATE: {bootPhase.toUpperCase()}</div>
        </div>

        {/* Layout Split: Left (HUD visualizer) / Right (Typewriter terminal & stats) */}
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          gap: '24px',
          margin: '24px 0',
          minHeight: '260px'
        }}>
          {/* Left panel: Circular SVG Telemetry Gauge */}
          <div style={{
            flex: '0 0 200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 5, 8, 0.5)',
            border: '1px solid rgba(0, 242, 255, 0.1)',
            padding: '20px',
            borderRadius: '4px',
            position: 'relative'
          }}>
            <svg width="140" height="140" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2ff" />
                  <stop offset="100%" stopColor="#ff2d55" />
                </linearGradient>
              </defs>
              {/* Background ring */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,242,255,0.06)" strokeWidth="4" />
              {/* Dashboard dynamic ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#cyanGradient)"
                strokeWidth="4.5"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * progress) / 100}
                strokeLinecap="round"
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50px 50px',
                  transition: 'stroke-dashoffset 0.3s ease'
                }}
              />
              {/* Concentric rotating SVG dash ring */}
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke="rgba(0, 242, 255, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="20 10 5 10"
                style={{
                  animation: 'spinClockwise 12s linear infinite',
                  transformOrigin: '50px 50px'
                }}
              />
              {/* Outer diagnostic rotating dashes */}
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(255, 45, 85, 0.25)"
                strokeWidth="1"
                strokeDasharray="4 8"
                style={{
                  animation: 'spinCounterClockwise 8s linear infinite',
                  transformOrigin: '50px 50px'
                }}
              />
              {/* Sweeping pointer arm (radar sweep) */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="10"
                stroke="rgba(0, 242, 255, 0.55)"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{
                  animation: 'spinClockwise 4s linear infinite',
                  transformOrigin: '50px 50px'
                }}
              />
              {/* Center percentage text */}
              <text
                x="50"
                y="54"
                textAnchor="middle"
                fill="#fff"
                fontSize="14"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                style={{ textShadow: '0 0 10px rgba(0, 242, 255, 0.6)' }}
              >
                {progress}%
              </text>
            </svg>
            <div style={{
              marginTop: '15px',
              fontSize: '9px',
              color: 'rgba(189, 200, 209, 0.5)',
              letterSpacing: '0.1em',
              textAlign: 'center',
              lineHeight: '1.4'
            }}>
              SYSTEM LOAD GAUGE<br />
              <span style={{ color: 'var(--sky)' }}>SECTOR // SYNC</span>
            </div>
          </div>

          {/* Right panel: Terminal logs area */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'rgba(4, 4, 6, 0.95)',
            border: '1px solid rgba(0, 242, 255, 0.1)',
            padding: '16px 20px',
            borderRadius: '4px',
            position: 'relative'
          }}>
            {/* Real-time stats ticker bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              borderBottom: '1px dashed rgba(0, 242, 255, 0.12)',
              paddingBottom: '10px',
              marginBottom: '12px',
              fontSize: '9px',
              color: 'rgba(189, 200, 209, 0.5)'
            }}>
              <div>CLOCK: <span style={{ color: '#fff' }}>{telemetry.clock}</span></div>
              <div>RATE: <span style={{ color: 'var(--sky)' }}>{telemetry.rate}</span></div>
              <div>TEMP: <span style={{ color: 'var(--plasma)' }}>{telemetry.temp}</span></div>
              <div>CORE: <span style={{ color: 'var(--sky)' }}>{telemetry.integrity}</span></div>
            </div>

            {/* Terminal logs list */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              fontSize: '11px',
              lineHeight: '1.8',
              color: 'rgba(189, 200, 209, 0.82)',
              textAlign: 'left'
            }}>
              {lines.map((line, idx) => {
                if (!line) return null;
                // Add stylized prefixes to key logs
                let prefix = '[SYS]';
                let color = 'var(--sky)';
                if (line.includes('NEURAL')) { prefix = '[CORE]'; color = 'var(--plasma)'; }
                else if (line.includes('IIT BOMBAY')) { prefix = '[LINK]'; color = 'var(--sky)'; }
                else if (line.includes('COMPETITIONS')) { prefix = '[SYNC]'; color = 'var(--sky)'; }
                
                return (
                  <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '3px' }}>
                    <span style={{ color, opacity: 0.8 }}>{prefix}</span>
                    <span>{line}</span>
                  </div>
                );
              })}
              {lines.length < DIAGNOSTICS.length && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--sky)' }}>[SYS]</span>
                  <span style={{
                    width: '6px',
                    height: '11px',
                    background: 'var(--sky)',
                    display: 'inline-block',
                    animation: 'blink 0.8s steps(2, start) infinite',
                    boxShadow: '0 0 6px var(--sky)'
                  }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading Progress section */}
        <div style={{ width: '100%' }}>
          {/* Progress bar container */}
          <div style={{
            position: 'relative',
            height: '20px',
            border: '1px solid rgba(0, 242, 255, 0.25)',
            padding: '2px',
            background: 'rgba(5, 5, 8, 0.7)',
            marginBottom: '8px',
            overflow: 'hidden',
            borderRadius: '2px'
          }}>
            {/* Inner fill */}
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(to right, #00d2ff, #ff2d55)',
                width: `${progress}%`,
                boxShadow: '0 0 15px rgba(0, 242, 255, 0.5)'
              }}
              layout
            />
            {/* Glowing scanline inside bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '120px',
              background: 'linear-gradient(to right, transparent, rgba(0, 242, 255, 0.3), transparent)',
              animation: 'sweep 2.0s linear infinite'
            }} />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '10px',
            color: 'rgba(0, 242, 255, 0.5)',
            fontWeight: 700,
            letterSpacing: '0.12em'
          }}>
            <div>NEURAL SYNC SPEED: {progress === 100 ? 'STABLE' : 'CALIBRATING DRIVERS...'}</div>
            <div>STATUS: {progress === 100 ? 'LINK READY' : 'DOWNLOADING SEGMENTS...'}</div>
          </div>
        </div>

        {/* User Interactive entry selection */}
        <AnimatePresence mode="wait">
          {bootPhase === 'ready' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              style={{
                marginTop: '24px',
                borderTop: '1px solid rgba(0, 242, 255, 0.15)',
                paddingTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '15px',
                color: 'var(--sky)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textShadow: '0 0 12px rgba(0, 242, 255, 0.35)'
              }}>
                NEURAL INTEGRATION PROTOCOL STABILIZED
              </h3>
              <p style={{
                fontSize: '11px',
                color: 'rgba(189, 200, 209, 0.65)',
                maxWidth: '520px',
                lineHeight: '1.5',
                textAlign: 'center',
                marginBottom: '6px'
              }}>
                Select terminal telemetry link configuration to authorize neural handshakes. Environmental system feedback is recommended.
              </p>

              <div style={{ display: 'flex', gap: '16px', width: '100%', maxWidth: '440px' }}>
                <button
                  onClick={() => handleStartBoot(true)}
                  style={{
                    flex: 1,
                    padding: '12px 0',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: 'var(--plasma)',
                    color: '#fff',
                    border: 'none',
                    position: 'relative',
                    boxShadow: '0 0 20px rgba(255, 45, 85, 0.35)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    borderRadius: '2px'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 45, 85, 0.6)';
                    e.currentTarget.style.transform = 'translateY(-1.5px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 45, 85, 0.35)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <span style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '6px', borderTop: '2px solid #fff', borderLeft: '2px solid #fff' }} />
                  <span style={{ position: 'absolute', bottom: 0, right: 0, width: '6px', height: '6px', borderBottom: '2px solid #fff', borderRight: '2px solid #fff' }} />
                  SYNC COGNITIVE LINK
                </button>
                <button
                  onClick={() => handleStartBoot(false)}
                  style={{
                    flex: 1,
                    padding: '12px 0',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: 'rgba(0, 242, 255, 0.04)',
                    color: 'var(--sky)',
                    border: '1px solid rgba(0, 242, 255, 0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderRadius: '2px'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0, 242, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'var(--sky)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 242, 255, 0.3)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0, 242, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(0, 242, 255, 0.25)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.color = 'var(--sky)';
                  }}
                >
                  SILENT SYNC
                </button>
              </div>
            </motion.div>
          )}

          {bootPhase === 'booting' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: '24px',
                textAlign: 'center',
                color: 'var(--plasma)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textShadow: '0 0 12px rgba(255, 45, 85, 0.5)',
                animation: 'glitchPulse 0.5s infinite'
              }}
            >
              ESTABLISHING CYBORG SYNC... STAND BY
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Animation Keyframes Styles */}
      <style>{`
        @keyframes spinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinCounterClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes sweep {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(850px); }
        }
        @keyframes glitchPulse {
          0%, 100% { transform: translate(0); }
          50% { transform: translate(-1px, 0.5px); opacity: 0.95; }
        }
        @keyframes crtSweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
