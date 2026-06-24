/* Techfest 2026 - Telemetry Log 0 */
import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const TEAM = [
  { name: 'ARJUN MEHTA',   role: 'FESTIVAL DIRECTOR', dept: 'Aerospace Eng.',  initials: 'AM' },
  { name: 'PRIYA NAIR',    role: 'TECH LEAD',          dept: 'Computer Science', initials: 'PN' },
  { name: 'RAHUL SHARMA',  role: 'EVENTS HEAD',        dept: 'Electrical Eng.',  initials: 'RS' },
  { name: 'SNEHA PATEL',   role: 'DESIGN LEAD',        dept: 'Design',           initials: 'SP' },
  { name: 'VIKRAM RAO',    role: 'SPONSORSHIP',        dept: 'MBA',              initials: 'VR' },
  { name: 'ANANYA SINGH',  role: 'OUTREACH',           dept: 'Chemical Eng.',    initials: 'AS' },
  { name: 'KARAN IYER',    role: 'OPERATIONS',         dept: 'Mechanical Eng.',  initials: 'KI' },
  { name: 'MEERA KRISHNA', role: 'MEDIA & PR',         dept: 'Communication',    initials: 'MK' },
  { name: 'DEV BHATIA',    role: 'ROBOTICS LEAD',      dept: 'Electronics Eng.', initials: 'DB' },
  { name: 'TANYA GUPTA',   role: 'WORKSHOPS HEAD',     dept: 'Computer Science', initials: 'TG' },
  { name: 'SIDDHARTH K.',  role: 'FINANCE',            dept: 'MBA',              initials: 'SK' },
  { name: 'RISHIKA JAIN',  role: 'VOLUNTEERS HEAD',    dept: 'Civil Eng.',       initials: 'RJ' },
];

const MILESTONES = [
  { year: '1998', event: 'Techfest Founded', note: 'IIT Bombay students launch Asia\'s biggest tech festival' },
  { year: '2010', event: 'Guinness Record', note: 'Largest gathering of engineers under one roof' },
  { year: '2018', event: 'Global Expansion', note: 'Participation from 50+ countries, 15,000+ attendees' },
  { year: '2024', event: 'AI Revolution', note: 'Full AI-integrated competitions and workshops' },
  { year: '2026', event: 'THE EVOLUTION', note: 'Cyborg era begins. Man and machine, unified.' },
];

const STATS = [
  { value: '150K+', label: 'FOOTFALL TELEMETRY', desc: 'Direct on-campus and virtual attendees' },
  { value: '45+',   label: 'GLOBAL NATIONS',     desc: 'International teams & key delegations' },
  { value: '150+',  label: 'TECH SPEAKERS',      desc: 'Industry titans & leading scientists' },
  { value: '₹30L+', label: 'PRIZE MATRIX',       desc: 'Total prize pool allocations' },
];

const MISSION_PILLARS = [
  { icon: '◈', title: 'INNOVATE', desc: 'Push the boundaries of technology through open collaboration and radical problem-solving.' },
  { icon: '⬣', title: 'CONNECT', desc: 'Bridge students, industry leaders, and global research institutions in a single ecosystem.' },
  { icon: '⚡', title: 'EMPOWER', desc: 'Provide every participant with the tools, mentorship, and platform to shape the future.' },
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
          fontSize: '17px',
          color: '#e2e8f0',
          lineHeight: 1.8,
          marginBottom: '16px'
        }}>
          Techfest IIT Bombay is Asia&apos;s largest science and technology festival, held annually at the Indian Institute of Technology Bombay. Since 1998, Techfest has been a platform where innovation meets ambition, where the brightest minds from across the globe converge to compete, collaborate, and create.
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '17px',
          color: '#e2e8f0',
          lineHeight: 1.8
        }}>
          2026 marks our most ambitious edition yet — <em style={{ color: 'var(--sky)', fontStyle: 'normal', fontWeight: 600 }}>The Cybernetic Evolution</em>. A three-day exploration of what happens when human ingenuity and artificial intelligence finally become one.
        </p>
      </motion.div>

      {/* Stats Matrix Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '48px'
        }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="glass-panel"
            style={{
              padding: '24px',
              border: '1px solid rgba(56, 189, 248, 0.15)',
              position: 'relative',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.08)';
              soundEffects.playHover?.();
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.15)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="bracket-tl" />
            <div className="bracket-br" />
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 800,
              color: 'var(--sky)',
              textShadow: 'var(--glow-sky-sm)'
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: '#fff',
              letterSpacing: '0.15em',
              fontWeight: 700,
              marginTop: '6px',
              marginBottom: '4px'
            }}>
              {stat.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#cbd5e1',
              lineHeight: '1.4'
            }}>
              {stat.desc}
            </div>
          </div>
        ))}
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
                  fontSize: '13.5px',
                  color: '#cbd5e1'
                }}>{m.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mission Pillars */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginBottom: '48px' }}
      >
        <div className="section-overline" style={{ marginBottom: '20px' }}>OUR MISSION</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
          gap: '14px',
        }}>
          {MISSION_PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="glass-panel"
              style={{
                padding: '24px',
                border: '1px solid rgba(56,189,248,0.15)',
                position: 'relative',
              }}
            >
              <div className="bracket-tl" />
              <div className="bracket-br" />
              <div style={{ fontSize: '20px', marginBottom: '12px' }}>{p.icon}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'var(--plasma)',
                marginBottom: '8px',
              }}>{p.title}</div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13.5px',
                color: '#cbd5e1',
                lineHeight: 1.65,
              }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Founding Team (1998 Pioneers) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginBottom: '48px' }}
      >
        <div className="section-overline" style={{ marginBottom: '20px' }}>1998 FOUNDING PIONEERS</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
          gap: '14px',
        }}>
          {[
            { name: 'AMIT KHANDELWAL', role: 'FOUNDING CONVENER', year: 'Class of 1999', dept: 'Chemical Engineering', initials: 'AK' },
            { name: 'RITESH SHARMA', role: 'CO-FOUNDER (EVENTS)', year: 'Class of 2000', dept: 'Mechanical Engineering', initials: 'RS' },
            { name: 'VARUN GROVER', role: 'CO-FOUNDER (OUTREACH)', year: 'Class of 1999', dept: 'Electrical Engineering', initials: 'VG' }
          ].map((founder, i) => (
            <div
              key={founder.name}
              className="glass-panel"
              style={{
                padding: '24px',
                border: '1px solid rgba(251, 191, 36, 0.25)',
                background: 'rgba(251, 191, 36, 0.02)',
                position: 'relative',
              }}
            >
              <div className="bracket-tl" style={{ borderColor: '#fbbf24' }} />
              <div className="bracket-br" style={{ borderColor: '#fbbf24' }} />
              
              <div style={{
                width: 44, height: 44,
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(5,5,8,0.5) 100%)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                marginBottom: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', color: '#fbbf24',
              }}>
                {founder.initials}
              </div>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                color: '#fff',
                marginBottom: '4px',
                letterSpacing: '0.01em'
              }}>
                {founder.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: '#fbbf24',
                letterSpacing: '0.15em',
                fontWeight: 700,
                marginBottom: '4px'
              }}>
                {founder.role}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '8px',
                color: 'rgba(189,200,209,0.45)',
                letterSpacing: '0.1em',
                fontWeight: 600
              }}>
                {founder.year} · {founder.dept}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Core Team */}
      <div>
        <div className="section-overline" style={{ marginBottom: '24px' }}>CORE TEAM</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 160px), 1fr))', gap: '14px' }}>
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 + 1 }}
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
                width: 44, height: 44, borderRadius: '0px',
                background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(5,5,8,0.5) 100%)',
                border: '1px solid rgba(56,189,248,0.3)',
                marginBottom: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', color: 'var(--sky)',
              }}>
                {member.initials}
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

