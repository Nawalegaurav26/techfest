/* Techfest 2026 — Telemetry Log 18 // HALL OF CHAMPIONS */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const WINNERS_DATA = {
  2024: [
    { event: 'Robowars Titan', team: 'Team Blitz', prize: '₹6,00,000', country: '🇮🇳', rank: 1 },
    { event: 'Code Breach', team: 'Quantum Coders', prize: '₹5,00,000', country: '🇮🇳', rank: 1 },
    { event: 'Drone Wars', team: 'SkyFox', prize: '₹80,000', country: '🇩🇪', rank: 1 },
    { event: 'AI Design Jam', team: 'NeuralArts', prize: '₹40,000', country: '🇺🇸', rank: 1 },
    { event: 'Space Hackathon', team: 'OrbitForce', prize: '₹1,00,000', country: '🇮🇳', rank: 2 },
    { event: 'Quant Challenge', team: 'AlphaEdge', prize: '₹60,000', country: '🇬🇧', rank: 2 },
  ],
  2023: [
    { event: 'Robowars', team: 'Iron Titan', prize: '₹5,00,000', country: '🇮🇳', rank: 1 },
    { event: 'Hackathon', team: 'ByteForce', prize: '₹4,00,000', country: '🇮🇳', rank: 1 },
    { event: 'Quiz Bowl', team: 'MIT Trivia', prize: '₹50,000', country: '🇺🇸', rank: 1 },
    { event: 'Drone Odyssey', team: 'AeroNauts', prize: '₹75,000', country: '🇯🇵', rank: 1 },
    { event: 'CodeSprint', team: 'BinaryBlaze', prize: '₹30,000', country: '🇮🇳', rank: 2 },
  ],
  2022: [
    { event: 'Robowars', team: 'Steel Storm', prize: '₹4,00,000', country: '🇮🇳', rank: 1 },
    { event: 'MindSpark', team: 'ThinkTank X', prize: '₹3,50,000', country: '🇮🇳', rank: 1 },
    { event: 'Design Build Fly', team: 'AeroAviation', prize: '₹1,50,000', country: '🇺🇸', rank: 1 },
    { event: 'Science Quiz', team: "Bohr's Atom", prize: '₹40,000', country: '🇮🇳', rank: 1 },
    { event: 'App of the Year', team: 'PixelPioneers', prize: '₹60,000', country: '🇨🇦', rank: 2 },
  ],
  2021: [
    { event: 'Virtual Robowars', team: 'SimBot Zero', prize: '₹2,00,000', country: '🇮🇳', rank: 1 },
    { event: 'Code Fest Online', team: 'Debuggers', prize: '₹1,50,000', country: '🇮🇳', rank: 1 },
    { event: 'Ideathon', team: 'FutureMinds', prize: '₹75,000', country: '🇦🇺', rank: 1 },
    { event: 'Online Quiz', team: 'Genius Grid', prize: '₹25,000', country: '🇮🇳', rank: 1 },
  ],
};

const YEARS = [2024, 2023, 2022, 2021];

const STATS = [
  { val: '₹2.5 Cr+', label: 'Total Prize Distributed' },
  { val: '28', label: 'Years Running' },
  { val: '56+', label: 'Countries Represented' },
  { val: '15,000+', label: 'Alumni Network' },
];

function WinnerCard({ winner, index }) {
  const rankColors = {
    1: { border: 'rgba(255,215,0,0.5)', bg: 'rgba(255,215,0,0.04)', prize: '#FFD700', shadow: 'rgba(255,215,0,0.2)' },
    2: { border: 'rgba(192,192,192,0.4)', bg: 'rgba(192,192,192,0.03)', prize: '#C0C0C0', shadow: 'rgba(192,192,192,0.15)' },
  };
  const colors = rankColors[winner.rank] || { border: 'rgba(56,189,248,0.3)', bg: 'rgba(56,189,248,0.03)', prize: 'var(--sky)', shadow: 'rgba(56,189,248,0.15)' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className="glass-panel"
      style={{
        padding: '20px 18px',
        border: `1px solid ${colors.border}`,
        background: colors.bg,
        boxShadow: `0 0 16px ${colors.shadow}`,
        position: 'relative',
      }}
    >
      <div className="bracket-tl" style={{ borderColor: colors.prize }} />
      <div className="bracket-br" style={{ borderColor: colors.prize }} />

      {/* Trophy */}
      <div style={{
        position: 'absolute', top: '12px', right: '14px',
        fontSize: '20px', lineHeight: 1,
        opacity: 0.8,
      }}>
        🏆
      </div>

      {/* Event */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '8px',
        fontWeight: 700,
        letterSpacing: '0.18em',
        color: 'rgba(189,200,209,0.4)',
        marginBottom: '6px',
        textTransform: 'uppercase',
      }}>
        EVENT
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '16px',
        fontWeight: 800,
        color: '#fff',
        marginBottom: '12px',
        lineHeight: 1.2,
        paddingRight: '32px',
      }}>{winner.event}</h3>

      {/* Team & Country */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '18px' }}>{winner.country}</span>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            color: 'rgba(189,200,209,0.35)',
            letterSpacing: '0.12em',
          }}>TEAM</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            fontWeight: 700,
            color: 'rgba(189,200,209,0.85)',
          }}>{winner.team}</div>
        </div>
      </div>

      {/* Prize */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '22px',
        fontWeight: 800,
        color: colors.prize,
        textShadow: `0 0 12px ${colors.shadow}`,
        letterSpacing: '-0.02em',
      }}>{winner.prize}</div>
    </motion.div>
  );
}

export default function Winners() {
  const [activeYear, setActiveYear] = useState(2024);

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '40px' }}
      >
        <div className="section-overline" style={{ marginBottom: '14px' }}>
          MODULE 18 // HALL OF CHAMPIONS
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#FFD700',
          textShadow: '0 0 30px rgba(255,215,0,0.45), 0 0 80px rgba(255,215,0,0.15)',
          marginBottom: '12px',
        }}>
          WINNERS HALL<br />
          <span style={{ color: '#fff', textShadow: 'none' }}>OF FAME</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'rgba(189,200,209,0.5)',
          maxWidth: '500px',
          lineHeight: 1.7,
        }}>
          Celebrating the champions who defined the legacy of Asia's biggest technology festival.
          Every name here earned their place.
        </p>
      </motion.div>

      {/* ── STATS ROW ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="glass-panel"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0',
          marginBottom: '40px',
          border: '1px solid rgba(255,215,0,0.15)',
          overflow: 'hidden',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: '20px 24px',
              textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px,3vw,28px)',
              fontWeight: 800,
              color: '#FFD700',
              textShadow: '0 0 10px rgba(255,215,0,0.4)',
              marginBottom: '4px',
            }}>{stat.val}</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'rgba(189,200,209,0.35)',
              letterSpacing: '0.15em',
            }}>{stat.label.toUpperCase()}</div>
          </div>
        ))}
      </motion.div>

      {/* ── YEAR SELECTOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}
      >
        {YEARS.map(year => {
          const isActive = activeYear === year;
          return (
            <button
              key={year}
              onClick={() => {
                soundEffects.playClick?.();
                setActiveYear(year);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '10px 24px',
                background: isActive ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.02)',
                border: isActive ? '1px solid rgba(255,215,0,0.6)' : '1px solid rgba(255,255,255,0.08)',
                color: isActive ? '#FFD700' : 'rgba(189,200,209,0.45)',
                boxShadow: isActive ? '0 0 16px rgba(255,215,0,0.2)' : 'none',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)';
                  e.currentTarget.style.color = 'rgba(255,215,0,0.6)';
                  soundEffects.playHover?.();
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(189,200,209,0.45)';
                }
              }}
            >
              {year}
            </button>
          );
        })}
      </motion.div>

      {/* ── WINNER CARDS GRID ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {/* Year label */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: 'rgba(255,215,0,0.35)',
            marginBottom: '20px',
          }}>TECHFEST {activeYear} // {WINNERS_DATA[activeYear].length} CHAMPIONS</div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,280px), 1fr))',
            gap: '16px',
          }}>
            <AnimatePresence>
              {WINNERS_DATA[activeYear].map((winner, i) => (
                <WinnerCard key={`${activeYear}-${winner.event}`} winner={winner} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
