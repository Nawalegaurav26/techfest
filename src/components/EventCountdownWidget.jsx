/* Techfest 2026 — EventCountdownWidget Component */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function EventCountdownWidget({ targetDate = '2026-12-26T09:00:00', eventName = 'NEURAL HACKATHON STARTS', themeColor = 'var(--sky)' }) {
  const calcTime = () => {
    const diff = Math.max(0, new Date(targetDate) - new Date());
    return {
      days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins:  Math.floor((diff / (1000 * 60)) % 60),
      secs:  Math.floor((diff / 1000) % 60),
      isExpired: diff === 0,
    };
  };

  const [time, setTime] = useState(calcTime);

  useEffect(() => {
    const t = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  // Simple progress calculation (assume 30-day window for visual effect)
  const totalDuration = 30 * 24 * 60 * 60 * 1000;
  const remaining = Math.max(0, new Date(targetDate) - new Date());
  const percentLeft = Math.min(100, (remaining / totalDuration) * 100);

  return (
    <div style={{
      border: `1px solid rgba(255, 255, 255, 0.08)`,
      background: 'rgba(14, 14, 18, 0.8)',
      padding: '16px',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: '380px',
      width: '100%',
      boxShadow: `0 0 15px ${themeColor}10`,
    }}>
      {/* Laser corner decorations (0px sharp design) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '4px', background: themeColor }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '4px', background: themeColor }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '4px', height: '4px', background: themeColor }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '4px', height: '4px', background: themeColor }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Header Telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            color: themeColor,
            letterSpacing: '0.2em',
            fontWeight: 700,
          }}>
            T-MINUS COUNTDOWN // {eventName}
          </span>
          <span className="pulse-dot" style={{ background: themeColor, boxShadow: `0 0 8px ${themeColor}` }} />
        </div>

        {/* Big Digit display */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {[
            { val: time.days, lbl: 'DD' },
            { val: time.hours, lbl: 'HH' },
            { val: time.mins, lbl: 'MM' },
            { val: time.secs, lbl: 'SS' }
          ].map((item, idx) => (
            <div key={item.lbl} style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#fff',
                  textShadow: `0 0 10px ${themeColor}aa`,
                  letterSpacing: '0.05em',
                  lineHeight: 1.1,
                }}>
                  {pad(item.val)}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '7px',
                  color: 'rgba(189, 200, 209, 0.4)',
                  letterSpacing: '0.15em',
                  marginTop: '4px',
                }}>
                  {item.lbl}
                </span>
              </div>
              {idx < 3 && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: themeColor,
                  opacity: 0.65,
                  paddingBottom: '14px',
                  marginLeft: '12px',
                  animation: 'blink 1s step-start infinite',
                }}>
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Telemetry Progress Bar */}
        <div style={{ position: 'relative', height: '2px', background: 'rgba(255,255,255,0.05)', marginTop: '4px' }}>
          <div style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: `${percentLeft}%`,
            background: themeColor,
            boxShadow: `0 0 8px ${themeColor}`,
            transition: 'width 1s linear',
          }} />
        </div>

        {/* Footer info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'rgba(189,200,209,0.5)', letterSpacing: '0.1em' }}>
          <span>STATUS: QUANTUM LOCK</span>
          <span>VAL: {pad(time.days)}:{pad(time.hours)}:{pad(time.mins)}:{pad(time.secs)}</span>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
