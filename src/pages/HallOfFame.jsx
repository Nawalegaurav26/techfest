/* Techfest 2026 — Telemetry Log 25 // ALL-TIME RECORDS */
import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const RECORDS = [
  {
    record: 'Largest Prize Pool',
    value: '₹1 CR+',
    year: '2026',
    holder: 'Techfest 2026 Edition',
    icon: '🏆',
  },
  {
    record: 'Most Participants',
    value: '1,00,000',
    year: '2020',
    holder: 'Virtual Edition',
    icon: '👥',
  },
  {
    record: 'Most Countries',
    value: '54',
    year: '2023',
    holder: 'Techfest 2023',
    icon: '🌍',
  },
  {
    record: 'Largest Bot (Combat)',
    value: '127 KG',
    year: '2024',
    holder: 'MEGATRON V4 — Team Blitz',
    icon: '🤖',
  },
  {
    record: 'Fastest Drone',
    value: '92 km/h',
    year: '2023',
    holder: 'SkyFox Racing — Germany',
    icon: '🚁',
  },
  {
    record: 'Hackathon Hours Record',
    value: '38.5 Hrs',
    year: '2022',
    holder: 'ByteForce IIT Bombay',
    icon: '⌛',
  },
];

const ALUMNI = [
  {
    name: 'Nandan Nilekani',
    company: 'Infosys / UIDAI',
    batch: '1978',
    achievement: 'Co-founded Infosys, architected Aadhaar — the world\'s largest biometric ID system.',
    initials: 'NN',
  },
  {
    name: 'Manohar Parrikar',
    company: 'Former Defence Minister',
    batch: '1981',
    achievement: 'IIT Bombay alumnus, former Chief Minister of Goa & Defence Minister of India.',
    initials: 'MP',
  },
  {
    name: 'Anil Kakodkar',
    company: 'BARC / DAE',
    batch: '1963',
    achievement: 'Led India\'s nuclear programme, former Director of BARC and Chairman of AEC.',
    initials: 'AK',
  },
  {
    name: 'Prachi Patel',
    company: 'MIT Technology Review',
    batch: '2010',
    achievement: 'Acclaimed science journalist covering AI & robotics for MIT Technology Review globally.',
    initials: 'PP',
  },
];

const GOLD = '#fbbf24';
const GOLD_GLOW = '0 0 20px rgba(251,191,36,0.5), 0 0 40px rgba(251,191,36,0.2)';
const GOLD_DIM = 'rgba(251,191,36,0.12)';

const shimmerKeyframes = `
@keyframes goldShimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
`;

export default function HallOfFame() {
  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>
      <style>{shimmerKeyframes}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '12px' }}
      >
        <div className="section-overline" style={{ marginBottom: '12px' }}>
          MODULE 25 // ALL-TIME RECORDS
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 6vw, 62px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            margin: 0,
            background: `linear-gradient(90deg, ${GOLD}, #fff8dc, ${GOLD})`,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'goldShimmer 4s linear infinite',
          }}
        >
          HALL OF FAME
        </h1>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: GOLD + '88',
            marginTop: '8px',
            letterSpacing: '0.3em',
          }}
        >
          LEGENDS NEVER FADE
        </div>
      </motion.div>

      {/* Records Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '48px', marginBottom: '64px' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: GOLD + '80',
            letterSpacing: '0.3em',
            marginBottom: '20px',
            borderBottom: `1px solid ${GOLD}22`,
            paddingBottom: '12px',
          }}
        >
          ◈ ALL-TIME RECORDS // TECHFEST HALL OF FAME
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '16px',
          }}
        >
          {RECORDS.map((rec, i) => (
            <motion.div
              key={rec.record}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.4, duration: 0.5 }}
              style={{
                background: `linear-gradient(135deg, ${GOLD_DIM} 0%, rgba(14,14,18,0.9) 100%)`,
                border: `1px solid ${GOLD}44`,
                padding: '28px 24px',
                position: 'relative',
                cursor: 'default',
                overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = GOLD + 'aa';
                e.currentTarget.style.boxShadow = GOLD_GLOW;
                soundEffects.playHover?.();
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = GOLD + '44';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="bracket-tl" />
              <div className="bracket-br" />

              {/* Shimmer overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(105deg, transparent 40%, ${GOLD}08 50%, transparent 60%)`,
                  backgroundSize: '200% 100%',
                  animation: 'goldShimmer 3s linear infinite',
                  pointerEvents: 'none',
                }}
              />

              {/* Trophy icon */}
              <div
                style={{
                  fontSize: '24px',
                  marginBottom: '12px',
                  filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.5))',
                }}
              >
                {rec.icon}
              </div>

              {/* Record name */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: GOLD + '88',
                  letterSpacing: '0.2em',
                  fontWeight: 700,
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}
              >
                {rec.record}
              </div>

              {/* Value */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 900,
                  color: GOLD,
                  textShadow: GOLD_GLOW,
                  lineHeight: 1,
                  marginBottom: '12px',
                  letterSpacing: '-0.01em',
                }}
              >
                {rec.value}
              </div>

              {/* Year + holder */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.1em',
                  }}
                >
                  <span style={{ color: GOLD + 'cc' }}>YEAR</span> // {rec.year}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11.5px',
                    color: 'rgba(189,200,209,0.55)',
                    lineHeight: 1.4,
                  }}
                >
                  {rec.holder}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Legendary Alumni Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: GOLD + '80',
            letterSpacing: '0.3em',
            marginBottom: '20px',
            borderBottom: `1px solid ${GOLD}22`,
            paddingBottom: '12px',
          }}
        >
          ◈ LEGENDARY ALUMNI // IIT BOMBAY
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: '16px',
          }}
        >
          {ALUMNI.map((alumni, i) => (
            <motion.div
              key={alumni.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                background: 'rgba(14,14,18,0.8)',
                border: `1px solid ${GOLD}22`,
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = GOLD + '66';
                e.currentTarget.style.boxShadow = `0 0 32px ${GOLD}18`;
                soundEffects.playHover?.();
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = GOLD + '22';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="bracket-tl" />
              <div className="bracket-br" />

              {/* Shimmer overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(105deg, transparent 40%, ${GOLD}06 50%, transparent 60%)`,
                  backgroundSize: '200% 100%',
                  animation: `goldShimmer ${4 + i * 0.5}s linear infinite`,
                  pointerEvents: 'none',
                }}
              />

              {/* Avatar */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: `radial-gradient(circle, ${GOLD}22 0%, rgba(5,5,8,0.6) 100%)`,
                  border: `1px solid ${GOLD}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: GOLD,
                  marginBottom: '16px',
                }}
              >
                {alumni.initials}
              </div>

              {/* Name */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '4px',
                  letterSpacing: '0.02em',
                }}
              >
                {alumni.name}
              </div>

              {/* Company */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: GOLD + 'cc',
                  letterSpacing: '0.15em',
                  marginBottom: '4px',
                }}
              >
                {alumni.company}
              </div>

              {/* Batch */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.15em',
                  marginBottom: '14px',
                }}
              >
                BATCH OF {alumni.batch}
              </div>

              {/* Achievement */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(189,200,209,0.55)',
                  lineHeight: 1.65,
                  borderTop: `1px solid ${GOLD}15`,
                  paddingTop: '12px',
                }}
              >
                {alumni.achievement}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer inscription */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '56px',
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: GOLD + '55',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          lineHeight: 2,
          borderTop: `1px solid ${GOLD}15`,
          paddingTop: '32px',
        }}
      >
        "Those who dare to push the frontier do not merely leave a mark —
        <br />they become the frontier itself."
        <br />
        <span style={{ color: GOLD + '33' }}>— Techfest IIT Bombay, Est. 1998</span>
      </motion.div>
    </div>
  );
}
