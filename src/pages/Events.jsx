import { useState } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const CATEGORIES = ['ALL', 'TECHNICAL', 'CULTURAL', 'ONLINE', 'GAMING'];

const EVENTS = [
  {
    id: 'e1', category: 'TECHNICAL', tier: 'ELITE',
    name: 'ROBOTICS OLYMPIAD', date: 'DEC 22', time: '09:00 IST',
    prize: '₹2,00,000', participants: 450,
    desc: 'Battle-ready robots face off in a high-stakes engineering arena. Design, build, destroy.',
    tags: ['ROBOTICS', 'AI', 'HARDWARE'],
  },
  {
    id: 'e2', category: 'TECHNICAL', tier: 'PRIME',
    name: 'QUANTUM HACKATHON', date: 'DEC 22', time: '10:00 IST',
    prize: '₹1,50,000', participants: 800,
    desc: '48-hour marathon to build quantum computing solutions for real-world problems.',
    tags: ['QUANTUM', 'CODING', 'AI'],
  },
  {
    id: 'e3', category: 'CULTURAL', tier: 'PRIME',
    name: 'NEON GENESIS SHOWCASE', date: 'DEC 23', time: '18:00 IST',
    prize: '₹80,000', participants: 200,
    desc: 'Sci-fi art meets live performance in an immersive cybernetic cultural spectacle.',
    tags: ['ART', 'PERFORMANCE', 'CULTURE'],
  },
  {
    id: 'e4', category: 'ONLINE', tier: 'STANDARD',
    name: 'NEURAL NETWORK WARS', date: 'DEC 21', time: '00:00 IST',
    prize: '₹50,000', participants: 1200,
    desc: 'Train your ML models and pit them against the best minds globally.',
    tags: ['ML', 'PYTHON', 'DATA'],
  },
  {
    id: 'e5', category: 'GAMING', tier: 'ELITE',
    name: 'CYBERZONE ESPORTS', date: 'DEC 24', time: '12:00 IST',
    prize: '₹3,00,000', participants: 600,
    desc: 'The biggest esports tournament in Asia, featuring top-tier cyber-athletes.',
    tags: ['ESPORTS', 'GAMING', 'STRATEGY'],
  },
  {
    id: 'e6', category: 'TECHNICAL', tier: 'STANDARD',
    name: 'SPACE TECH CHALLENGE', date: 'DEC 23', time: '10:00 IST',
    prize: '₹1,00,000', participants: 350,
    desc: 'Design the next generation of space exploration technology and systems.',
    tags: ['SPACE', 'ENGINEERING', 'ISRO'],
  },
];

const TIER_COLORS = { ELITE: 'var(--plasma)', PRIME: 'var(--sky)', STANDARD: '#22c55e' };
const TIER_GLOWS = { ELITE: 'rgba(255,45,85,0.25)', PRIME: 'rgba(56,189,248,0.2)', STANDARD: 'rgba(34,197,94,0.15)' };

export default function Events() {
  const [active, setActive] = useState('ALL');
  const [hovered, setHovered] = useState(null);
  const [registered, setRegistered] = useState({});

  const filtered = active === 'ALL' ? EVENTS : EVENTS.filter(e => e.category === active);

  const handleRegister = (id) => {
    if (registered[id]) return;
    soundEffects.playSuccess?.();
    setRegistered(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 02 // EVENTS MATRIX</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          EVENT <span className="glow-sky" style={{ color: 'var(--sky)' }}>COMMAND CENTER</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'rgba(189, 200, 209, 0.5)',
          maxWidth: '480px',
          marginTop: '12px',
          lineHeight: 1.7
        }}>
          250+ events. Zero limits. Select your battleground, deploy your skills, and earn your place in the evolution archives.
        </p>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          margin: '32px 0 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          paddingBottom: '16px'
        }}
      >
        {CATEGORIES.map(cat => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playClick?.();
                setActive(cat);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                padding: '8px 16px',
                color: isActive ? '#fff' : 'rgba(189,200,209,0.4)',
                background: isActive ? 'rgba(56,189,248,0.1)' : 'transparent',
                border: isActive ? '1px solid var(--sky)' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: isActive ? '0 0 15px rgba(56,189,248,0.2)' : 'none',
                transition: 'all 0.3s ease',
                cursor: 'none'
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)';
                  soundEffects.playHover?.();
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(189,200,209,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Event cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filtered.map((ev, i) => {
          const isHovered = hovered === ev.id;
          const isReg = registered[ev.id];

          return (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.3 }}
              onMouseEnter={() => {
                setHovered(ev.id);
                soundEffects.playHover?.();
              }}
              onMouseLeave={() => setHovered(null)}
              className="glass-panel"
              style={{
                position: 'relative',
                padding: '24px',
                border: `1px solid ${isHovered ? TIER_COLORS[ev.tier] : 'rgba(56, 189, 248, 0.15)'}`,
                boxShadow: isHovered ? `0 0 25px ${TIER_GLOWS[ev.tier]}` : 'none',
                transition: 'all 0.3s',
                cursor: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px'
              }}
            >
              {/* Corner brackets */}
              <div className="bracket-tl" style={{ borderColor: isHovered ? TIER_COLORS[ev.tier] : 'var(--sky)' }} />
              <div className="bracket-br" style={{ borderColor: isHovered ? TIER_COLORS[ev.tier] : 'var(--sky)' }} />

              {/* Tier badge */}
              <div style={{
                position: 'absolute', top: 12, right: 12,
                fontFamily: 'var(--font-mono)', fontSize: '8px',
                letterSpacing: '0.25em', padding: '3px 8px',
                color: TIER_COLORS[ev.tier], border: `1px solid ${TIER_COLORS[ev.tier]}50`,
                background: TIER_COLORS[ev.tier] + '15',
              }}>{ev.tier}</div>

              <div style={{ paddingTop: '20px' }}>
                {/* Event name */}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#fff',
                  marginBottom: '8px',
                  letterSpacing: '0.01em',
                  paddingRight: '60px',
                  lineHeight: 1.1
                }}>{ev.name}</h3>

                {/* Meta row */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  {[ev.date, ev.time].map(m => (
                    <span key={m} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      letterSpacing: '0.15em',
                      color: 'rgba(56,189,248,0.6)',
                      fontWeight: 600
                    }}>{m}</span>
                  ))}
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(189,200,209,0.5)',
                  lineHeight: 1.6,
                  marginBottom: '16px'
                }}>
                  {ev.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {ev.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      letterSpacing: '0.12em',
                      color: 'rgba(189,200,209,0.4)',
                      padding: '2px 6px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(255,255,255,0.02)'
                    }}>#{t}</span>
                  ))}
                </div>
              </div>

              <div>
                {/* Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  marginBottom: '16px'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: 'var(--sky)',
                    textShadow: 'var(--glow-sky-sm)'
                  }}>
                    {ev.prize}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'rgba(189,200,209,0.4)',
                    fontWeight: 600
                  }}>
                    {ev.participants.toLocaleString()} REGISTERED
                  </span>
                </div>

                <button
                  onClick={() => {
                    soundEffects.playClick?.();
                    handleRegister(ev.id);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 0',
                    background: isReg ? 'rgba(34,197,94,0.08)' : 'rgba(255,45,85,0.05)',
                    border: `1px solid ${isReg ? 'rgba(34,197,94,0.4)' : 'rgba(255,45,85,0.4)'}`,
                    color: isReg ? 'var(--green)' : 'var(--plasma)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: isReg ? '0 0 15px rgba(34,197,94,0.1)' : 'none'
                  }}
                  onMouseEnter={e => {
                    if (!isReg) {
                      e.currentTarget.style.background = 'rgba(255,45,85,0.15)';
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(255,45,85,0.25)';
                      soundEffects.playHover?.();
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isReg) {
                      e.currentTarget.style.background = 'rgba(255,45,85,0.05)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {isReg ? '✓ SECURED ENTRY' : 'REGISTER FOR EVENT →'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
