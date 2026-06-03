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
  const [soundChoice, setSoundChoice] = useState(null);

  // Print diagnostic lines one by one
  useEffect(() => {
    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx < DIAGNOSTICS.length) {
        setLines(prev => [...prev, DIAGNOSTICS[lineIdx]]);
        lineIdx++;
        try { soundEffects.playTypewriter?.(); } catch {}
      } else {
        clearInterval(interval);
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  // Run progress bar up to 100%
  useEffect(() => {
    if (lines.length === 0) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBootPhase('ready');
          try { soundEffects.playSuccess?.(); } catch {}
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [lines]);

  const handleStartBoot = (enableSound) => {
    // Save sound choice to window state
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
        backgroundImage: 'linear-gradient(to right, rgba(56, 189, 248, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.03) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        pointerEvents: 'none'
      }} />

      {/* Cybernetic HUD Frame */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '750px',
        minHeight: '480px',
        background: 'rgba(14, 14, 18, 0.85)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        boxShadow: '0 0 50px rgba(56, 189, 248, 0.08)',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* L-Accents */}
        <div className="bracket-tl" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px' }} />
        <div className="bracket-tr" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px', position: 'absolute', top: -1, right: -1, borderTop: '2px solid var(--sky)', borderRight: '2px solid var(--sky)' }} />
        <div className="bracket-bl" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px', position: 'absolute', bottom: -1, left: -1, borderBottom: '2px solid var(--sky)', borderLeft: '2px solid var(--sky)' }} />
        <div className="bracket-br" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px' }} />

        {/* Top Header info */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
          paddingBottom: '16px',
          fontSize: '10px',
          color: 'var(--sky-dim)',
          fontWeight: 700,
          letterSpacing: '0.15em'
        }}>
          <div>IIT BOMBAY // SYSTEM DIAGNOSTICS</div>
          <div style={{ color: 'var(--plasma-dim)' }}>SECURE SECTOR // ACTIVE</div>
        </div>

        {/* Terminal Logs area */}
        <div style={{
          flex: 1,
          margin: '24px 0',
          padding: '16px 20px',
          background: 'rgba(5, 5, 8, 0.6)',
          border: '1px dashed rgba(56, 189, 248, 0.1)',
          overflowY: 'auto',
          fontSize: '11px',
          lineHeight: '1.8',
          color: 'rgba(189, 200, 209, 0.85)',
          textAlign: 'left'
        }}>
          {lines.map((line, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: line.includes('OK') || line.includes('SECURE') ? 'var(--green)' : 'var(--sky)' }}>&gt;&gt;</span>
              <span>{line}</span>
            </div>
          ))}
          {lines.length < DIAGNOSTICS.length && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--sky)' }}>&gt;&gt;</span>
              <span style={{
                width: '6px',
                height: '11px',
                background: 'var(--sky)',
                display: 'inline-block',
                animation: 'blink 0.8s steps(2, start) infinite'
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
            border: '1px solid rgba(56, 189, 248, 0.3)',
            padding: '2px',
            background: 'rgba(5, 5, 8, 0.5)',
            marginBottom: '10px',
            overflow: 'hidden'
          }}>
            {/* Inner fill */}
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(to right, var(--sky), var(--plasma))',
                width: `${progress}%`,
                boxShadow: '0 0 15px rgba(56, 189, 248, 0.5)'
              }}
              layout
            />
            {/* Glowing scanline inside bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '120px',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)',
              animation: 'sweep 1.5s linear infinite'
            }} />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '10px',
            color: 'rgba(189, 200, 209, 0.5)',
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
                borderTop: '1px solid rgba(56, 189, 248, 0.15)',
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
                color: '#fff',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textShadow: '0 0 15px rgba(255,255,255,0.2)'
              }}>
                NEURAL INTEGRATION PROTOCOL DETECTED
              </h3>
              <p style={{
                fontSize: '11px',
                color: 'rgba(189,200,209,0.5)',
                maxWidth: '480px',
                lineHeight: '1.5',
                textAlign: 'center',
                marginBottom: '10px'
              }}>
                Choose connection audio configuration to establish neural telemetry. Backgound environment audio is recommended.
              </p>

              <div style={{ display: 'flex', gap: '16px', width: '100%', maxWidth: '420px' }}>
                <button
                  onClick={() => handleStartBoot(true)}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    padding: '14px 0',
                    fontSize: '10px',
                    boxShadow: '0 0 20px rgba(255, 45, 85, 0.5)'
                  }}
                >
                  <span className="btn-tl" />
                  <span className="btn-br" />
                  SYNC WITH AUDIO
                </button>
                <button
                  onClick={() => handleStartBoot(false)}
                  className="btn-ghost"
                  style={{
                    flex: 1,
                    padding: '14px 0',
                    fontSize: '10px',
                    borderColor: 'rgba(56,189,248,0.5)'
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
                color: 'var(--plasma)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textShadow: '0 0 10px rgba(255,45,85,0.4)',
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
