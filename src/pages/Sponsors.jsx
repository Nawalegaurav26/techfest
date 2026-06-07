import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const TIERS = [
  {
    name: 'TITLE SPONSOR',
    color: 'var(--plasma)',
    glow: 'rgba(255,45,85,0.25)',
    sponsors: [
      { name: 'NEXCORE SYSTEMS', role: 'AI Infrastructure Partner', logo: '⬡' },
    ],
  },
  {
    name: 'PLATINUM',
    color: '#e8e8ff',
    glow: 'rgba(232,232,255,0.2)',
    sponsors: [
      { name: 'GOOGLE', role: 'Cloud & AI', logo: 'G' },
      { name: 'MICROSOFT', role: 'Azure Partner', logo: 'M' },
    ],
  },
  {
    name: 'GOLD',
    color: '#ffd700',
    glow: 'rgba(255,215,0,0.2)',
    sponsors: [
      { name: 'ISRO', role: 'Space Partner', logo: '🚀' },
      { name: 'INTEL', role: 'Hardware Partner', logo: 'I' },
      { name: 'QUALCOMM', role: 'Chipset Partner', logo: 'Q' },
    ],
  },
  {
    name: 'SILVER',
    color: 'var(--sky)',
    glow: 'rgba(56,189,248,0.15)',
    sponsors: [
      { name: 'AWS', role: 'Cloud', logo: 'A' },
      { name: 'NVIDIA', role: 'GPU', logo: 'N' },
      { name: 'SAMSUNG', role: 'Mobile', logo: 'S' },
      { name: 'D.E. SHAW', role: 'Finance', logo: 'D' },
    ],
  },
];

export default function Sponsors() {
  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 08 // ALLIANCE NETWORK</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          ALLIANCE <span className="glow-sky" style={{ color: 'var(--sky)' }}>SPONSORS & PARTNERS</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'rgba(189, 200, 209, 0.5)',
          maxWidth: '480px',
          marginTop: '12px',
          lineHeight: 1.7
        }}>
          Backed by the world&apos;s leading technology corporations, space agencies, and research hubs. Together we build the future.
        </p>
      </motion.div>

      {/* Become a sponsor CTA */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="glass-panel"
        style={{
          margin: '32px 0 40px',
          padding: '20px 28px',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          position: 'relative'
        }}
      >
        <div className="bracket-tl" />
        <div className="bracket-br" />

        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '6px'
          }}>
            BECOME A PARTNER
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'rgba(189,200,209,0.5)',
            letterSpacing: '0.15em',
            fontWeight: 600
          }}>
            REACH 150,000+ TECH LEADERS AND CREATIVE MINDS GLOBALLY
          </div>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            soundEffects.playSuccess?.();
            window.location.href = 'mailto:partnerships@techfest.org';
          }}
          style={{ padding: '12px 28px' }}
        >
          <span className="btn-tl" />
          <span className="btn-br" />
          PARTNER WITH US →
        </button>
      </motion.div>

      {/* Tier groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {TIERS.map((tier, ti) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ti * 0.15 + 0.5 }}
          >
            {/* Tier label */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
            }}>
              <div style={{
                width: 40, height: 1,
                background: tier.color,
                boxShadow: `0 0 8px ${tier.color}`,
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.3em',
                color: tier.color,
                fontWeight: 700
              }}>{tier.name} ACCESS</span>
              <div style={{
                flex: 1, height: 1,
                background: `linear-gradient(90deg, ${tier.color}, transparent)`,
              }} />
            </div>

            {/* Sponsor cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${tier.name === 'TITLE SPONSOR' ? '400px' : '200px'}), 1fr))`,
              gap: '20px',
            }}>
              {tier.sponsors.map((sp, si) => (
                <motion.div
                  key={sp.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: ti * 0.15 + si * 0.08 + 0.6 }}
                  className="glass-panel"
                  style={{
                    padding: tier.name === 'TITLE SPONSOR' ? '40px' : '28px',
                    border: `1px solid ${tier.color}25`,
                    backdropFilter: 'var(--glass-blur)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.3s',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = tier.color;
                    e.currentTarget.style.boxShadow = `0 0 30px ${tier.glow}`;
                    soundEffects.playHover?.();
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${tier.color}25`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="bracket-tl" style={{ borderColor: tier.color }} />
                  <div className="bracket-br" style={{ borderColor: tier.color }} />

                  {/* Logo placeholder */}
                  <div style={{
                    width: tier.name === 'TITLE SPONSOR' ? 80 : 52,
                    height: tier.name === 'TITLE SPONSOR' ? 80 : 52,
                    borderRadius: '50%',
                    border: `2px solid ${tier.color}40`,
                    background: `radial-gradient(circle, ${tier.glow} 0%, transparent 70%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: tier.name === 'TITLE SPONSOR' ? '32px' : '20px',
                    color: tier.color,
                    boxShadow: `0 0 20px ${tier.glow}`,
                  }}>
                    {sp.logo}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: tier.name === 'TITLE SPONSOR' ? '18px' : '14px',
                    color: '#fff',
                    letterSpacing: '0.05em'
                  }}>
                    {sp.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.15em',
                    color: tier.color,
                    fontWeight: 600,
                    opacity: 0.8
                  }}>
                    {sp.role}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
