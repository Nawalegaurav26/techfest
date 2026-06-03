import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const DIAGNOSTICS = [
  'INITIALIZING SYSTEM BOOT v4.26...',
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

  // Print diagnostic lines one by one (slowed down to 450ms per line)
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

  // Sync progress bar exactly to the printed lines
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
      background: '#050508',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      overflow: 'hidden',
      fontFamily: 'var(--font-mono)'
    }}>
      {/* Background Matrix/Grid Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(to right, rgba(34, 197, 94, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 197, 94, 0.03) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        pointerEvents: 'none'
      }} />

      {/* Cybernetic HUD Frame */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '750px',
        minHeight: '480px',
        background: 'rgba(8, 14, 10, 0.9)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        boxShadow: '0 0 50px rgba(34, 197, 94, 0.12)',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* L-Accents */}
        <div className="bracket-tl" style={{ borderColor: 'var(--green)', width: '20px', height: '20px' }} />
        <div className="bracket-tr" style={{ borderColor: 'var(--green)', width: '20px', height: '20px', position: 'absolute', top: -1, right: -1, borderTop: '2px solid var(--green)', borderRight: '2px solid var(--green)' }} />
        <div className="bracket-bl" style={{ borderColor: 'var(--green)', width: '20px', height: '20px', position: 'absolute', bottom: -1, left: -1, borderBottom: '2px solid var(--green)', borderLeft: '2px solid var(--green)' }} />
        <div className="bracket-br" style={{ borderColor: 'var(--green)', width: '20px', height: '20px' }} />

        {/* Top Header info */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
          paddingBottom: '16px',
          fontSize: '10px',
          color: 'rgba(34, 197, 94, 0.65)',
          fontWeight: 700,
          letterSpacing: '0.15em'
        }}>
          <div>IIT BOMBAY // SYSTEM DIAGNOSTICS</div>
          <div style={{ color: 'var(--green)', textShadow: '0 0 8px rgba(34, 197, 94, 0.4)' }}>SECURE SECTOR // ACTIVE</div>
        </div>

        {/* Terminal Logs area */}
        <div style={{
          flex: 1,
          margin: '24px 0',
          padding: '16px 20px',
          background: 'rgba(4, 7, 5, 0.75)',
          border: '1px dashed rgba(34, 197, 94, 0.25)',
          overflowY: 'auto',
          fontSize: '11px',
          lineHeight: '1.8',
          color: 'rgba(34, 197, 94, 0.85)',
          textAlign: 'left'
        }}>
          {lines.map((line, idx) => {
            if (!line) return null;
            return (
              <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--green)', textShadow: '0 0 5px rgba(34, 197, 94, 0.4)' }}>&gt;&gt;</span>
                <span>{line}</span>
              </div>
            );
          })}
          {lines.length < DIAGNOSTICS.length && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--green)' }}>&gt;&gt;</span>
              <span style={{
                width: '6px',
                height: '11px',
                background: 'var(--green)',
                display: 'inline-block',
                animation: 'blink 0.8s steps(2, start) infinite',
                boxShadow: '0 0 6px var(--green)'
              }} />
            </div>
          )}
        </div>

        {/* Loading Progress section */}
        <div>
          {/* Progress bar container */}
          <div style={{
            position: 'relative',
            height: '24px',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            padding: '2px',
            background: 'rgba(4, 7, 5, 0.5)',
            marginBottom: '10px',
            overflow: 'hidden'
          }}>
            {/* Inner fill */}
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(to right, rgba(16, 185, 129, 0.8), var(--green))',
                width: `${progress}%`,
                boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)'
              }}
              layout
            />
            {/* Glowing scanline inside bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '120px',
              background: 'linear-gradient(to right, transparent, rgba(34, 197, 94, 0.35), transparent)',
              animation: 'sweep 1.5s linear infinite'
            }} />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '10px',
            color: 'rgba(34, 197, 94, 0.55)',
            fontWeight: 700,
            letterSpacing: '0.1em'
          }}>
            <div>NEURAL UPLOAD: {progress}%</div>
            <div>{progress === 100 ? 'SEQUENCE COMPLETED' : 'CALIBRATING IMPULSE DRIVERS...'}</div>
          </div>
        </div>

        {/* User Interactive entry selection */}
        <AnimatePresence mode="wait">
          {bootPhase === 'ready' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{
                marginTop: '32px',
                borderTop: '1px solid rgba(34, 197, 94, 0.2)',
                paddingTop: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                color: 'var(--green)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textShadow: '0 0 15px rgba(34, 197, 94, 0.4)'
              }}>
                NEURAL INTEGRATION PROTOCOL DETECTED
              </h3>
              <p style={{
                fontSize: '11px',
                color: 'rgba(34, 197, 94, 0.6)',
                maxWidth: '480px',
                lineHeight: '1.5',
                textAlign: 'center',
                marginBottom: '10px'
              }}>
                Choose connection audio configuration to establish neural telemetry. Background environment audio is recommended.
              </p>

              <div style={{ display: 'flex', gap: '16px', width: '100%', maxWidth: '420px' }}>
                <button
                  onClick={() => handleStartBoot(true)}
                  style={{
                    flex: 1,
                    padding: '14px 0',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: 'var(--green)',
                    color: '#050508',
                    border: 'none',
                    position: 'relative',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
                    cursor: 'none'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(34, 197, 94, 0.8)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.4)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <span style={{ position: 'absolute', top: 0, left: 0, width: '8px', height: '8px', borderTop: '2px solid #050508', borderLeft: '2px solid #050508' }} />
                  <span style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderBottom: '2px solid #050508', borderRight: '2px solid #050508' }} />
                  SYNC WITH AUDIO
                </button>
                <button
                  onClick={() => handleStartBoot(false)}
                  style={{
                    flex: 1,
                    padding: '14px 0',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: 'rgba(34, 197, 94, 0.05)',
                    color: 'var(--green)',
                    border: '1px solid rgba(34, 197, 94, 0.5)',
                    transition: 'all 0.3s ease',
                    cursor: 'none'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
                    e.currentTarget.style.borderColor = 'var(--green)';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(34, 197, 94, 0.35)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.color = 'var(--green)';
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
                marginTop: '32px',
                textAlign: 'center',
                color: 'var(--green)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textShadow: '0 0 10px rgba(34,197,94,0.6)',
                animation: 'glitchPulse 0.5s infinite'
              }}
            >
              ESTABLISHING CYBORG SYNC... STAND BY
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes sweep {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(750px); }
        }
        @keyframes glitchPulse {
          0%, 100% { transform: translate(0); }
          50% { transform: translate(-1.5px, 0.5px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
