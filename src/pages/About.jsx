import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const TEAM = [
  { name: 'ARJUN MEHTA', role: 'FESTIVAL DIRECTOR', dept: 'Aerospace Eng.' },
  { name: 'PRIYA NAIR', role: 'TECH LEAD', dept: 'Computer Science' },
  { name: 'RAHUL SHARMA', role: 'EVENTS HEAD', dept: 'Electrical Eng.' },
  { name: 'SNEHA PATEL', role: 'DESIGN LEAD', dept: 'Design' },
  { name: 'VIKRAM RAO', role: 'SPONSORSHIP', dept: 'MBA' },
  { name: 'ANANYA SINGH', role: 'OUTREACH', dept: 'Chemical Eng.' },
];

const MILESTONES = [
  { year: '1998', event: 'Techfest Founded', note: 'IIT Bombay students launch Asia\'s biggest tech festival' },
  { year: '2010', event: 'Guinness Record', note: 'Largest gathering of engineers under one roof' },
  { year: '2018', event: 'Global Expansion', note: 'Participation from 50+ countries, 15,000+ attendees' },
  { year: '2024', event: 'AI Revolution', note: 'Full AI-integrated competitions and workshops' },
  { year: '2026', event: 'THE EVOLUTION', note: 'Cyborg era begins. Man and machine, unified.' },
];

export default function About() {
  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 07 // GENESIS RECORD</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          ABOUT <span className="glow-sky" style={{ color: 'var(--sky)' }}>TECHFEST</span>
        </h1>
      </motion.div>

      {/* Hero description */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="glass-panel"
        style={{
          margin: '32px 0 48px',
          padding: '32px',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          maxWidth: '800px',
          position: 'relative'
        }}
      >
        <div className="bracket-tl" />
        <div className="bracket-br" />

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'rgba(189, 200, 209, 0.65)',
          lineHeight: 1.8,
          marginBottom: '16px'
        }}>
          Techfest IIT Bombay is Asia&apos;s largest science and technology festival, held annually at the Indian Institute of Technology Bombay. Since 1998, Techfest has been a platform where innovation meets ambition, where the brightest minds from across the globe converge to compete, collaborate, and create.
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'rgba(189, 200, 209, 0.65)',
          lineHeight: 1.8
        }}>
          2026 marks our most ambitious edition yet — <em style={{ color: 'var(--sky)', fontStyle: 'normal', fontWeight: 600 }}>The Cybernetic Evolution</em>. A three-day exploration of what happens when human ingenuity and artificial intelligence finally become one.
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ marginBottom: '60px' }}>
        <div className="section-overline" style={{ marginBottom: '24px' }}>EVOLUTION TIMELINE</div>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, var(--sky), rgba(56,189,248,0.1))',
            marginLeft: 15
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingLeft: '48px' }}>
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.7 }}
                style={{ position: 'relative' }}
              >
                <div style={{
                  position: 'absolute',
                  left: -48,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: m.year === '2026' ? 'var(--sky)' : 'rgba(56,189,248,0.3)',
                  boxShadow: m.year === '2026' ? '0 0 12px var(--sky)' : 'none',
                  border: '1px solid rgba(56,189,248,0.5)',
                }} />
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--sky)',
                  letterSpacing: '0.2em',
                  fontWeight: 700,
                  marginBottom: '4px'
                }}>{m.year}</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#fff',
                  marginBottom: '4px'
                }}>{m.event}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12.5px',
                  color: 'rgba(189,200,209,0.45)'
                }}>{m.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Core Team */}
      <div>
        <div className="section-overline" style={{ marginBottom: '24px' }}>CORE TEAM</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 1 }}
              className="glass-panel"
              style={{
                padding: '24px',
                border: '1px solid rgba(56,189,248,0.15)',
                backdropFilter: 'var(--glass-blur)',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--sky)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(56,189,248,0.1)';
                soundEffects.playHover?.();
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(56,189,248,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="bracket-tl" />
              <div className="bracket-br" />

              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(5,5,8,0.5) 100%)',
                border: '1px solid rgba(56,189,248,0.3)',
                marginBottom: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--sky)',
              }}>
                {member.name[0]}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                color: '#fff',
                marginBottom: '4px',
                letterSpacing: '0.01em'
              }}>
                {member.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--plasma)',
                letterSpacing: '0.15em',
                fontWeight: 700,
                marginBottom: '4px'
              }}>
                {member.role}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '8px',
                color: 'rgba(189,200,209,0.35)',
                letterSpacing: '0.1em',
                fontWeight: 600
              }}>
                {member.dept}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
