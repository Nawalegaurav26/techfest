/* Techfest 2026 — Telemetry Log 21 // ORGANIZING COMMITTEE */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const DEPT_FILTERS = ['ALL', 'TECHNICAL', 'DESIGN', 'OUTREACH', 'FINANCE', 'OPERATIONS', 'MEDIA'];

const TEAM = [
  { name: 'Aryan Sharma',  role: 'President',          dept: 'TECHNICAL',   year: '4th Year', branch: 'CS',  img_abbr: 'AS', color: '#fbbf24' },
  { name: 'Priya Mehta',   role: 'Vice President',     dept: 'TECHNICAL',   year: '4th Year', branch: 'EE',  img_abbr: 'PM', color: '#38bdf8' },
  { name: 'Rohan Gupta',   role: 'Head of Design',     dept: 'DESIGN',      year: '3rd Year', branch: 'DD',  img_abbr: 'RG', color: '#a855f7' },
  { name: 'Sneha Rao',     role: 'Finance Lead',       dept: 'FINANCE',     year: '4th Year', branch: 'MA',  img_abbr: 'SR', color: '#00f5c4' },
  { name: 'Karan Patel',   role: 'Technical Lead',     dept: 'TECHNICAL',   year: '3rd Year', branch: 'ME',  img_abbr: 'KP', color: '#ff2d55' },
  { name: 'Ananya Singh',  role: 'Outreach Head',      dept: 'OUTREACH',    year: '3rd Year', branch: 'CS',  img_abbr: 'AS', color: '#ff8c00' },
  { name: 'Dev Mishra',    role: 'Media Lead',         dept: 'MEDIA',       year: '2nd Year', branch: 'CS',  img_abbr: 'DM', color: '#6ee7b7' },
  { name: 'Riya Joshi',    role: 'Operations Manager', dept: 'OPERATIONS',  year: '4th Year', branch: 'CE',  img_abbr: 'RJ', color: '#f472b6' },
  { name: 'Amit Kumar',    role: 'Web Lead',           dept: 'TECHNICAL',   year: '3rd Year', branch: 'CS',  img_abbr: 'AK', color: '#38bdf8' },
  { name: 'Neha Kapoor',   role: 'Sponsorship Lead',   dept: 'OUTREACH',    year: '4th Year', branch: 'MA',  img_abbr: 'NK', color: '#fbbf24' },
  { name: 'Saurabh Nair',  role: 'Event Coordinator',  dept: 'OPERATIONS',  year: '3rd Year', branch: 'ME',  img_abbr: 'SN', color: '#00f5c4' },
  { name: 'Tanvi Desai',   role: 'Graphic Designer',   dept: 'DESIGN',      year: '2nd Year', branch: 'DD',  img_abbr: 'TD', color: '#a855f7' },
];

const DEPT_COLORS = {
  TECHNICAL:  { text: '#38bdf8', bg: 'rgba(56,189,248,0.08)',  border: 'rgba(56,189,248,0.3)'  },
  DESIGN:     { text: '#a855f7', bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.3)'  },
  OUTREACH:   { text: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.3)'  },
  FINANCE:    { text: '#00f5c4', bg: 'rgba(0,245,196,0.08)',   border: 'rgba(0,245,196,0.3)'   },
  OPERATIONS: { text: '#f472b6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.3)' },
  MEDIA:      { text: '#6ee7b7', bg: 'rgba(110,231,183,0.08)', border: 'rgba(110,231,183,0.3)' },
};

function MemberCard({ member, index }) {
  const dc = DEPT_COLORS[member.dept] || DEPT_COLORS['TECHNICAL'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass-panel"
      style={{
        padding: '22px 18px',
        border: '1px solid rgba(56,189,248,0.1)',
        background: 'rgba(255,255,255,0.015)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '12px',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${member.color}50`;
        e.currentTarget.style.boxShadow = `0 0 20px ${member.color}18`;
        soundEffects.playHover?.();
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(56,189,248,0.1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="bracket-tl" style={{ borderColor: member.color + '80' }} />
      <div className="bracket-br" style={{ borderColor: member.color + '80' }} />

      {/* Avatar circle */}
      <div style={{
        width: '64px',
        height: '64px',
        background: `${member.color}18`,
        border: `2px solid ${member.color}55`,
        borderRadius: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: '18px',
        fontWeight: 800,
        color: member.color,
        textShadow: `0 0 10px ${member.color}60`,
        letterSpacing: '0.05em',
        flexShrink: 0,
      }}>
        {member.img_abbr}
      </div>

      {/* Name */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '16px',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '4px',
          lineHeight: 1.2,
        }}>{member.name}</h3>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: member.color,
          fontWeight: 700,
          letterSpacing: '0.08em',
          opacity: 0.85,
        }}>{member.role}</div>
      </div>

      {/* Department badge */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '8px',
        fontWeight: 700,
        letterSpacing: '0.15em',
        padding: '4px 12px',
        background: dc.bg,
        border: `1px solid ${dc.border}`,
        color: dc.text,
      }}>{member.dept}</span>

      {/* Year / branch readout */}
      <div style={{
        display: 'flex',
        gap: '12px',
        width: '100%',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '10px',
        justifyContent: 'center',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.15em', marginBottom: '2px' }}>YEAR</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(189,200,209,0.65)', fontWeight: 600 }}>{member.year}</div>
        </div>
        <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)' }} />
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.15em', marginBottom: '2px' }}>DEPT</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(189,200,209,0.65)', fontWeight: 600 }}>{member.branch}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL'
    ? TEAM
    : TEAM.filter(m => m.dept === activeFilter);

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
          MODULE 21 // ORGANIZING COMMITTEE
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#fff',
          marginBottom: '12px',
        }}>
          THE <span className="glow-sky" style={{ color: 'var(--sky)' }}>TEAM</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'rgba(189,200,209,0.5)',
          maxWidth: '500px',
          lineHeight: 1.7,
        }}>
          Meet the dedicated students of IIT Bombay who power one of Asia's largest and most
          prestigious science and technology festivals.
        </p>
      </motion.div>

      {/* ── DEPT FILTER TABS ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}
      >
        {DEPT_FILTERS.map(dept => {
          const isActive = activeFilter === dept;
          const dc = dept !== 'ALL' ? DEPT_COLORS[dept] : null;
          return (
            <button
              key={dept}
              onClick={() => {
                soundEffects.playClick?.();
                setActiveFilter(dept);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                padding: '8px 16px',
                background: isActive
                  ? (dc ? dc.bg : 'rgba(56,189,248,0.08)')
                  : 'rgba(255,255,255,0.02)',
                border: isActive
                  ? `1px solid ${dc ? dc.border : 'rgba(56,189,248,0.4)'}`
                  : '1px solid rgba(255,255,255,0.07)',
                color: isActive ? (dc ? dc.text : 'var(--sky)') : 'rgba(189,200,209,0.38)',
                boxShadow: isActive && dc ? `0 0 10px ${dc.border}` : 'none',
                transition: 'all 0.22s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)';
                  e.currentTarget.style.color = 'rgba(189,200,209,0.65)';
                  soundEffects.playHover?.();
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = 'rgba(189,200,209,0.38)';
                }
              }}
            >
              {dept}
            </button>
          );
        })}
        <div style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          color: 'rgba(189,200,209,0.25)',
          letterSpacing: '0.15em',
          alignSelf: 'center',
        }}>
          {filtered.length} MEMBER{filtered.length !== 1 ? 'S' : ''}
        </div>
      </motion.div>

      {/* ── MEMBER CARDS GRID ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
            gap: '14px',
            marginBottom: '60px',
          }}
        >
          <AnimatePresence>
            {filtered.map((member, i) => (
              <MemberCard
                key={member.name + member.role}
                member={member}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'rgba(189,200,209,0.25)',
            letterSpacing: '0.1em',
          }}
        >
          NO MEMBERS IN THIS DEPARTMENT //
        </motion.div>
      )}

      {/* ── JOIN THE TEAM CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-panel"
        style={{
          padding: '40px 32px',
          border: '1px solid rgba(56,189,248,0.18)',
          background: 'rgba(56,189,248,0.025)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
        }}
      >
        <div className="bracket-tl" />
        <div className="bracket-tr" />
        <div className="bracket-bl" />
        <div className="bracket-br" />

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.25em',
          color: 'rgba(189,200,209,0.3)',
        }}>TECHFEST 2026 // APPLICATIONS OPEN</div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(20px, 4vw, 32px)',
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.2,
        }}>
          Want to be part of<br />
          <span className="glow-sky" style={{ color: 'var(--sky)' }}>this team?</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'rgba(189,200,209,0.5)',
          lineHeight: 1.7,
          maxWidth: '440px',
        }}>
          We're looking for passionate, driven students across all departments — Technical, Design,
          Outreach, Finance, Operations, and Media. Join Asia's biggest tech festival.
        </p>

        <a
          href="/contact"
          onClick={() => soundEffects.playClick?.()}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            padding: '13px 36px',
            background: 'rgba(56,189,248,0.06)',
            border: '1px solid rgba(56,189,248,0.4)',
            color: 'var(--sky)',
            textDecoration: 'none',
            boxShadow: '0 0 16px rgba(56,189,248,0.15)',
            transition: 'all 0.3s ease',
            display: 'inline-block',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(56,189,248,0.12)';
            e.currentTarget.style.boxShadow = '0 0 28px rgba(56,189,248,0.3)';
            soundEffects.playHover?.();
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(56,189,248,0.06)';
            e.currentTarget.style.boxShadow = '0 0 16px rgba(56,189,248,0.15)';
          }}
        >
          JOIN THE TEAM →
        </a>
      </motion.div>
    </div>
  );
}
