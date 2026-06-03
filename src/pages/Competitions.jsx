import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const COMPETITIONS = [
  {
    id: 'c1', code: 'RC-01',
    name: 'ROBOWAR SIGMA', difficulty: 'EXTREME', slots: 64,
    prize: '₹3,00,000',
    desc: 'Build battle-ready autonomous weapons. Steel vs steel. Algorithm vs algorithm. Only one survives.',
    domains: ['ROBOTICS', 'EMBEDDED', 'AI'],
    deadline: 'DEC 10',
  },
  {
    id: 'c2', code: 'CC-02',
    name: 'CODE BREACH', difficulty: 'HARD', slots: 256,
    prize: '₹1,50,000',
    desc: 'Capture-the-flag style competitive programming. Break their code. Protect yours.',
    domains: ['ALGORITHMS', 'SECURITY', 'PYTHON', 'C++'],
    deadline: 'DEC 12',
  },
  {
    id: 'c3', code: 'AI-03',
    name: 'NEURAL WARS', difficulty: 'EXTREME', slots: 128,
    prize: '₹2,50,000',
    desc: 'Train and deploy AI models that compete in real-time adversarial environments.',
    domains: ['DEEP LEARNING', 'RL', 'PYTORCH'],
    deadline: 'DEC 08',
  },
  {
    id: 'c4', code: 'AE-04',
    name: 'AEROBOT PRIME', difficulty: 'HARD', slots: 48,
    prize: '₹1,20,000',
    desc: 'Autonomous aerial drone racing with obstacle avoidance and precision landing.',
    domains: ['DRONES', 'CONTROL', 'COMPUTER VISION'],
    deadline: 'DEC 15',
  },
  {
    id: 'c5', code: 'DS-05',
    name: 'DATAVAULT HEIST', difficulty: 'MEDIUM', slots: 500,
    prize: '₹80,000',
    desc: 'Extract insights from massive datasets. The fastest and most accurate analysis wins.',
    domains: ['DATA SCIENCE', 'STATISTICS', 'ML'],
    deadline: 'DEC 14',
  },
  {
    id: 'c6', code: 'ST-06',
    name: 'SPACE ODYSSEY', difficulty: 'HARD', slots: 80,
    prize: '₹2,00,000',
    desc: 'Design a complete mission to Mars. Propulsion, payload, landing. Present to ISRO scientists.',
    domains: ['AEROSPACE', 'PHYSICS', 'CAD'],
    deadline: 'DEC 06',
  },
];

const DIFF_COLORS = { EXTREME: 'var(--plasma)', HARD: '#ff8c00', MEDIUM: 'var(--sky)' };
const DIFF_GLOWS = { EXTREME: 'rgba(255,45,85,0.2)', HARD: 'rgba(255,140,0,0.2)', MEDIUM: 'rgba(56,189,248,0.2)' };

export default function Competitions() {
  const [selected, setSelected] = useState(null);
  const [registered, setRegistered] = useState({});

  const handleRegister = (id) => {
    if (registered[id]) return;
    soundEffects.playSuccess?.();
    setRegistered(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 03 // WAR ROOM</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          EVOLUTION <span className="glow-sky" style={{ color: 'var(--sky)' }}>COMPETITIONS</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'rgba(189, 200, 209, 0.5)',
          maxWidth: '540px',
          marginTop: '12px',
          lineHeight: 1.7
        }}>
          Select your arena. Prove your dominance. Every competition is a battle for supremacy, testing the limits of your algorithms, hardware, and design.
        </p>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="glass-panel"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          margin: '32px 0',
          padding: '20px 24px',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.05)'
        }}
      >
        {[
          { v: '₹16L+', l: 'TOTAL PRIZES' },
          { v: '10,000+', l: 'REGISTRATIONS' },
          { v: '6',     l: 'CORE ARENAS' },
          { v: '50+',   l: 'NATIONS REPRESENTED' },
        ].map(s => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 800,
              color: 'var(--sky)',
              textShadow: 'var(--glow-sky-sm)'
            }}>{s.v}</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: 'rgba(189,200,209,0.4)',
              marginTop: '4px'
            }}>{s.l}</div>
          </div>
        ))}
      </motion.div>

      {/* Competitions grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {COMPETITIONS.map((comp, i) => {
          const isSelected = selected === comp.id;
          const isReg = registered[comp.id];

          return (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.3 }}
              onClick={() => {
                soundEffects.playClick?.();
                setSelected(isSelected ? null : comp.id);
              }}
              className="glass-panel"
              style={{
                padding: '24px',
                border: isSelected ? `1px solid ${DIFF_COLORS[comp.difficulty]}` : '1px solid rgba(56, 189, 248, 0.15)',
                boxShadow: isSelected ? `0 0 25px ${DIFF_GLOWS[comp.difficulty]}` : 'none',
                transition: 'all 0.3s',
                cursor: 'none',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '280px'
              }}
            >
              <div className="bracket-tl" style={{ borderColor: isSelected ? DIFF_COLORS[comp.difficulty] : 'var(--sky)' }} />
              <div className="bracket-br" style={{ borderColor: isSelected ? DIFF_COLORS[comp.difficulty] : 'var(--sky)' }} />

              {/* Code */}
              <div style={{
                position: 'absolute', top: 12, left: 12,
                fontFamily: 'var(--font-mono)', fontSize: '8px',
                letterSpacing: '0.2em', color: 'rgba(56,189,248,0.35)',
              }}>[{comp.code}]</div>

              {/* Difficulty badge */}
              <div style={{
                position: 'absolute', top: 12, right: 12,
                fontFamily: 'var(--font-mono)', fontSize: '8px',
                letterSpacing: '0.2em', color: DIFF_COLORS[comp.difficulty],
                border: `1px solid ${DIFF_COLORS[comp.difficulty]}40`,
                padding: '2px 8px',
                background: DIFF_COLORS[comp.difficulty] + '15',
              }}>{comp.difficulty}</div>

              <div style={{ paddingTop: '24px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '8px',
                  lineHeight: 1.1
                }}>
                  {comp.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(189,200,209,0.5)',
                  lineHeight: 1.6,
                  marginBottom: '16px'
                }}>
                  {comp.desc}
                </p>

                {/* Domains */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {comp.domains.map(d => (
                    <span key={d} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: 'var(--sky-dim)',
                      letterSpacing: '0.1em',
                      padding: '2px 6px',
                      border: '1px solid rgba(56,189,248,0.2)',
                      background: 'rgba(56,189,248,0.05)'
                    }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  marginBottom: '16px'
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 800,
                      color: 'var(--sky)',
                      textShadow: 'var(--glow-sky-sm)'
                    }}>{comp.prize}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.3)', marginTop: '2px' }}>DEADLINE: {comp.deadline}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: '#fff' }}>{comp.slots}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.3)' }}>SLOTS AVAILABLE</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn-ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEffects.playClick?.();
                      setSelected(isSelected ? null : comp.id);
                    }}
                    style={{ flex: 1, padding: '10px 0', fontSize: '9px' }}
                  >
                    {isSelected ? 'CLOSE SPECS' : 'VIEW SPECS'}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegister(comp.id);
                    }}
                    style={{
                      flex: 1.2,
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
                    {isReg ? '✓ ENROLLED' : 'ENTER ARENA'}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
