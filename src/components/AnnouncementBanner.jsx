/* Techfest 2026 — AnnouncementBanner Component */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { soundEffects } from '../utils/soundEffects';

const ANNOUNCEMENTS = [
  { id: 'a1', text: '🚀 REGISTRATION OPEN — Robowar Sigma deadline: Dec 10. Limited slots!', cta: 'REGISTER', to: '/register', color: '#ff2d55' },
  { id: 'a2', text: '⚡ HACKATHON STARTS DEC 26 — Form your team of 2-4 and enlist now', cta: 'JOIN HACKATHON', to: '/hackathon', color: '#00f2ff' },
  { id: 'a3', text: '🎙️ SAM ALTMAN keynote confirmed — Day 1, Convocation Hall, 11:00 IST', cta: 'VIEW SCHEDULE', to: '/schedule', color: '#a855f7' },
];

export default function AnnouncementBanner({ dismissed, setDismissed }) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const ann = ANNOUNCEMENTS[current];

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={ann.id}
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -48, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 200,
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          background: `linear-gradient(90deg, rgba(5,5,8,0.97) 0%, ${ann.color}18 50%, rgba(5,5,8,0.97) 100%)`,
          borderBottom: `1px solid ${ann.color}44`,
          padding: '0 48px',
        }}
      >
        {/* Dot indicator */}
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {ANNOUNCEMENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: i === current ? ann.color : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'background 0.2s',
              }}
            />
          ))}
        </div>

        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: 'rgba(229,231,235,0.85)', letterSpacing: '0.05em',
          flex: 1, textAlign: 'center',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {ann.text}
        </span>

        <button
          onClick={() => { soundEffects.playClick?.(); navigate(ann.to); }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: 700,
            letterSpacing: '0.15em', padding: '3px 10px',
            border: `1px solid ${ann.color}88`,
            background: `${ann.color}18`,
            color: ann.color, cursor: 'pointer',
            flexShrink: 0, whiteSpace: 'nowrap',
          }}
        >
          {ann.cta} →
        </button>

        <button
          onClick={() => setDismissed(true)}
          style={{
            position: 'absolute', right: '12px',
            background: 'transparent', border: 'none',
            color: 'rgba(189,200,209,0.4)', cursor: 'pointer', padding: '4px',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
