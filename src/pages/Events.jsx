/* Techfest 2026 - Telemetry Log 5 */
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
  {
    id: 'e7', category: 'TECHNICAL', tier: 'PRIME',
    name: 'DRONE LIGHT SHOW', date: 'DEC 22', time: '19:00 IST',
    prize: '₹1,20,000', participants: 180,
    desc: 'Choreograph a 50-drone autonomous light show with precision swarm algorithms over the main field.',
    tags: ['DRONES', 'SWARM AI', 'CONTROL'],
  },
  {
    id: 'e8', category: 'TECHNICAL', tier: 'STANDARD',
    name: 'AI STARTUP PITCH', date: 'DEC 24', time: '14:00 IST',
    prize: '₹2,50,000', participants: 120,
    desc: 'Pitch your AI startup to a panel of top VCs and win seed funding plus industry mentorship.',
    tags: ['AI', 'STARTUP', 'PITCH'],
  },
  {
    id: 'e9', category: 'ONLINE', tier: 'ELITE',
    name: 'CYBERSECURITY CTF', date: 'DEC 21', time: '06:00 IST',
    prize: '₹1,50,000', participants: 2000,
    desc: '48-hour global Capture-the-Flag competition across 20 cybersecurity challenge domains.',
    tags: ['SECURITY', 'HACKING', 'CTFOPEN'],
  },
  {
    id: 'e10', category: 'TECHNICAL', tier: 'PRIME',
    name: 'BIO-ROBOTICS DESIGN', date: 'DEC 23', time: '09:00 IST',
    prize: '₹80,000', participants: 240,
    desc: 'Design biomimetic robots inspired by natural organisms. Speed, agility, and adaptability scored.',
    tags: ['ROBOTICS', 'BIO', 'DESIGN'],
  },
];

const TIER_COLORS = { ELITE: 'var(--plasma)', PRIME: 'var(--sky)', STANDARD: 'var(--green)' };
const TIER_GLOWS = { ELITE: 'rgba(255,45,85,0.25)', PRIME: 'rgba(56,189,248,0.2)', STANDARD: 'rgba(0, 245, 196, 0.15)' };

export default function Events() {
  const [active, setActive] = useState('ALL');
  const [hovered, setHovered] = useState(null);
  const [registered, setRegistered] = useState(() => {
    try {
      const stored = localStorage.getItem('tf_registered_events');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [filterTier, setFilterTier] = useState('ALL');

  const parsePrize = (prizeStr) => {
    const clean = prizeStr.replace(/[^0-9]/g, '');
    return parseInt(clean, 10) || 0;
  };

  const processedEvents = EVENTS
    .filter(e => {
      const matchCat = active === 'ALL' || e.category === active;
      const matchTier = filterTier === 'ALL' || e.tier === filterTier;
      const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchTier && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'prize') {
        return parsePrize(b.prize) - parsePrize(a.prize);
      }
      if (sortBy === 'participants') {
        return b.participants - a.participants;
      }
      return 0;
    });

  const handleRegister = (id) => {
    if (registered[id]) return;
    soundEffects.playSuccess?.();
    setRegistered(prev => {
      const next = { ...prev, [id]: true };
      localStorage.setItem('tf_registered_events', JSON.stringify(next));
      return next;
    });
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
          fontSize: '15.5px',
          color: '#cbd5e1',
          maxWidth: '480px',
          marginTop: '12px',
          lineHeight: 1.7
        }}>
          250+ events. Zero limits. Select your battleground, deploy your skills, and earn your place in the evolution archives.
        </p>
      </motion.div>

      {/* Filter pills — horizontally scrollable on mobile */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          margin: '24px 0 20px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
        className="pills-row"
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
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '10px 18px',
                minHeight: '44px',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                color: isActive ? '#fff' : '#cbd5e1',
                background: isActive ? 'rgba(56,189,248,0.1)' : 'transparent',
                border: isActive ? '1px solid var(--sky)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isActive ? '0 0 15px rgba(56,189,248,0.2)' : 'none',
                transition: 'all 0.25s ease',
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
                   e.currentTarget.style.color = 'rgba(226,232,240,0.9)';
                   e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Advanced Filters Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        padding: '12px 16px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'rgba(255, 255, 255, 0.02)',
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 250px' }}>
          <input
            type="text"
            placeholder="SEARCH EVENTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 36px',
              background: 'rgba(5, 5, 8, 0.9)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              borderRadius: '0px',
              outline: 'none',
              transition: 'all 0.25s',
            }}
          />
          <span className="material-symbols-outlined" style={{
            position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
            fontSize: '16px', color: 'rgba(189,200,209,0.4)'
          }}>search</span>
        </div>

        {/* Tier filter dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.5)', letterSpacing: '0.1em' }}>TIER:</span>
          <select
            value={filterTier}
            onChange={(e) => { soundEffects.playClick?.(); setFilterTier(e.target.value); }}
            style={{
              padding: '8px 12px',
              background: 'rgba(5, 5, 8, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              borderRadius: '0px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">ALL TIERS</option>
            <option value="ELITE">ELITE (PLASMA)</option>
            <option value="PRIME">PRIME (SKY)</option>
            <option value="STANDARD">STANDARD (GREEN)</option>
          </select>
        </div>

        {/* Sort dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.5)', letterSpacing: '0.1em' }}>SORT:</span>
          <select
            value={sortBy}
            onChange={(e) => { soundEffects.playClick?.(); setSortBy(e.target.value); }}
            style={{
              padding: '8px 12px',
              background: 'rgba(5, 5, 8, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              borderRadius: '0px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="default">DEFAULT ORDER</option>
            <option value="prize">PRIZE POOL (HIGH-LOW)</option>
            <option value="participants">PARTICIPANTS</option>
          </select>
        </div>
      </div>

      {/* Event cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
        {processedEvents.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            padding: '48px 16px',
            textAlign: 'center',
            border: '1px dashed rgba(255,255,255,0.08)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'rgba(189,200,209,0.4)'
          }}>
            NO EVENTS MATCH YOUR FILTER PARAMETERS.
          </div>
        ) : processedEvents.map((ev, i) => {
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
                padding: 'clamp(16px, 3vw, 24px)',
                border: `1px solid ${isHovered ? TIER_COLORS[ev.tier] : 'rgba(56, 189, 248, 0.15)'}`,
                boxShadow: isHovered ? `0 0 25px ${TIER_GLOWS[ev.tier]}` : 'none',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      color: '#7bd0ff',
                      fontWeight: 600
                    }}>{m}</span>
                  ))}
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: '#cbd5e1',
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
                       fontSize: '11px',
                       letterSpacing: '0.12em',
                       color: '#ffffff',
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
                     fontSize: '11px',
                     color: '#cbd5e1',
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
                    padding: '12px 0',
                    minHeight: '48px',
                    background: isReg ? 'rgba(0, 245, 196, 0.08)' : 'rgba(255,45,85,0.05)',
                    border: `1px solid ${isReg ? 'rgba(0, 245, 196, 0.4)' : 'rgba(255,45,85,0.4)'}`,
                    color: isReg ? 'var(--green)' : 'var(--plasma)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    transition: 'all 0.25s ease',
                    boxShadow: isReg ? '0 0 15px rgba(0, 245, 196, 0.1)' : 'none'
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
