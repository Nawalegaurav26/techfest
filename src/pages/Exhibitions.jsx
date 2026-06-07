import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const EXHIBITS = [
  {
    id: 'e1',
    code: 'EX-A101',
    name: 'BOST-DYN ATLAS GEN-2',
    institution: 'BOSTON DYNAMICS (USA)',
    tech: 'HYDRAULICALLY POWERED AUTONOMOUS HUMANOID',
    desc: 'The next generation of high-mobility humanoid robots demonstrating advanced balance, obstacle navigation, and collaborative package-carrying capabilities in real-time complex mockups.',
    category: 'ROBOTICS',
    country: 'UNITED STATES',
    demotimes: '10:30, 13:30, 16:30',
    location: 'MAIN EXHIBITION HALL A',
    tokenRate: '88% ALLOCATED'
  },
  {
    id: 'e2',
    code: 'EX-B204',
    name: 'CERN ANTIMATTER TRAP',
    institution: 'CERN (SWITZERLAND)',
    tech: 'ALPHA-G BASE PENNING-MALMBERG MAGNET',
    desc: 'A physical scaled replication and telemetry display of CERN\'s antimatter container, displaying the containment of antiprotons at 0.5 Kelvin and demonstrating gravity effects on antimatter.',
    category: 'DEEP TECH',
    country: 'SWITZERLAND',
    demotimes: '11:00, 14:00, 17:00',
    location: 'ENERGY SYNC LABS',
    tokenRate: '94% ALLOCATED'
  },
  {
    id: 'e3',
    code: 'EX-C302',
    name: 'ISRO GAGANYAAN CORE',
    institution: 'ISRO (INDIA)',
    tech: 'HUMAN-RATED ORBITAL MODULE SIMULATOR',
    desc: 'Step inside the actual layout of India\'s manned space flight cabin. Interact with the life-support telemetry gauges, atmospheric scrubbers, and guidance control terminals.',
    category: 'AEROSPACE',
    country: 'INDIA',
    demotimes: 'ONGOING DEMONSTRATIONS',
    location: 'SPACE PAVILION',
    tokenRate: 'FULL'
  },
  {
    id: 'e4',
    code: 'EX-D412',
    name: 'MIT SYNTH-SYNAPSE',
    institution: 'MIT MEDIA LAB (USA)',
    tech: 'NEURAL-LINKED BIONIC EXOSKELETON',
    desc: 'An interactive biomechatronic suit that reads muscular EMG signals and spinal impulses to augment the wearer\'s lifting capacity by 800% with sub-5ms control delay.',
    category: 'BIO-TECH',
    country: 'UNITED STATES',
    demotimes: '12:00, 15:30',
    location: 'MAIN EXHIBITION HALL B',
    tokenRate: '75% ALLOCATED'
  },
  {
    id: 'e5',
    code: 'EX-E509',
    name: 'TOKAMAK H-1 FUSION',
    institution: 'IPP GARCHING (GERMANY)',
    tech: 'MAGNETIC DEUTERIUM-TRITIUM CONFINEMENT',
    desc: 'A real-time telemetry bridge connected to the experimental fusion reactor, showcasing how plasma is heated to 100 Million Celsius and suspended inside toroidal fields.',
    category: 'GREEN ENERGY',
    country: 'GERMANY',
    demotimes: '11:30, 15:00',
    location: 'ENERGY SYNC LABS',
    tokenRate: '61% ALLOCATED'
  },
  {
    id: 'e6',
    code: 'EX-F603',
    name: 'ETH HOLOGRAPHIC EYE',
    institution: 'ETH ZURICH (SWITZERLAND)',
    tech: 'SPATIAL LIGHT-FIELD HOLOGRAPHIC SYSTEM',
    desc: 'Volumetric glass panels projecting full-colour, high-resolution 3D engineering blueprints directly into mid-air without requiring external VR lenses or headsets.',
    category: 'DEEP TECH',
    country: 'SWITZERLAND',
    demotimes: 'ONGOING DEMONSTRATIONS',
    location: 'MAIN EXHIBITION HALL A',
    tokenRate: '80% ALLOCATED'
  }
];

const CATEGORIES = ['ALL', 'ROBOTICS', 'DEEP TECH', 'AEROSPACE', 'BIO-TECH', 'GREEN ENERGY'];

export default function Exhibitions() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [tokensRequested, setTokensRequested] = useState({});
  const [showMap, setShowMap] = useState(false);

  const filteredExhibits = activeCategory === 'ALL'
    ? EXHIBITS
    : EXHIBITS.filter(e => e.category === activeCategory);

  const handleRequestToken = (id) => {
    if (tokensRequested[id]) return;
    soundEffects.playSuccess?.();
    setTokensRequested(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}
      >
        <div>
          <div className="section-overline" style={{ marginBottom: '12px' }}>
            MODULE 05 // SENSORY FEED
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            TECH LAB <span className="glow-sky" style={{ color: 'var(--sky)' }}>EXHIBITIONS</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'rgba(189, 200, 209, 0.5)',
            maxWidth: '540px',
            marginTop: '12px',
            lineHeight: 1.7
          }}>
            Interact with the physical future. Ground-breaking research, fusion setups, next-gen androids, and aerospace prototypes brought from CERN, ISRO, MIT, and more.
          </p>
        </div>

        <button
          className="btn-ghost"
          onClick={() => {
            soundEffects.playClick?.();
            setShowMap(true);
          }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            borderColor: 'var(--plasma)',
            color: 'var(--plasma-dim)',
            padding: '12px 24px',
            background: 'rgba(255, 45, 85, 0.05)',
            boxShadow: '0 0 15px rgba(255, 45, 85, 0.15)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,45,85,0.15)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(255,45,85,0.3)';
            soundEffects.playHover?.();
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,45,85,0.05)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 45, 85, 0.15)';
          }}
        >
          VIEW FLOOR MAP TELEMETRY &nbsp;⌕
        </button>
      </motion.div>

      {/* Category Filters */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        margin: '32px 0 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '16px'
      }}>
        {CATEGORIES.map(category => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => {
                soundEffects.playClick?.();
                setActiveCategory(category);
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
                transition: 'all 0.3s ease'
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
              {category}
            </button>
          );
        })}
      </div>

      {/* Exhibits Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
        gap: '20px'
      }}>
        {filteredExhibits.map((exhibit, i) => {
          const isSelected = selectedExhibit === exhibit.id;
          const hasToken = tokensRequested[exhibit.id];

          return (
            <motion.div
              key={exhibit.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="glass-panel"
              style={{
                position: 'relative',
                padding: '24px',
                border: isSelected ? '1px solid rgba(255, 45, 85, 0.4)' : '1px solid rgba(56,189,248,0.15)',
                boxShadow: isSelected ? '0 0 30px rgba(255,45,85,0.15)' : 'none',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px'
              }}
            >
              {/* Decorative brackets */}
              <div className="bracket-tl" style={{ borderColor: isSelected ? 'var(--plasma)' : 'var(--sky)' }} />
              <div className="bracket-br" style={{ borderColor: isSelected ? 'var(--plasma)' : 'var(--sky)' }} />

              {/* Code */}
              <div style={{
                position: 'absolute', top: 12, left: 12,
                fontFamily: 'var(--font-mono)', fontSize: '8px',
                letterSpacing: '0.2em', color: 'rgba(56,189,248,0.35)',
              }}>[{exhibit.code}]</div>

              {/* Origin Country badge */}
              <div style={{
                position: 'absolute', top: 12, right: 12,
                fontFamily: 'var(--font-mono)', fontSize: '8px',
                letterSpacing: '0.15em', color: 'var(--sky-dim)',
                border: '1px solid rgba(56,189,248,0.2)',
                padding: '2px 8px',
                background: 'rgba(56,189,248,0.05)',
              }}>{exhibit.country}</div>

              <div style={{ paddingTop: '24px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  color: 'var(--plasma-dim)',
                  letterSpacing: '0.15em',
                  fontWeight: 700
                }}>
                  {exhibit.category} // {exhibit.institution}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#fff',
                  marginTop: '4px',
                  marginBottom: '8px',
                  lineHeight: 1.1
                }}>
                  {exhibit.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--sky)',
                  lineHeight: 1.4,
                  marginBottom: '10px',
                  letterSpacing: '0.05em'
                }}>
                  SPEC: {exhibit.tech}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(189,200,209,0.5)',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}>
                  {exhibit.desc}
                </p>
              </div>

              {/* Bottom metadata */}
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '8px',
                  padding: '12px 0',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px'
                }}>
                  <div>
                    <span style={{ color: 'rgba(189,200,209,0.3)' }}>LIVESTREAM / DEMO</span>
                    <div style={{ color: '#fff', fontWeight: 600, marginTop: '2px' }}>{exhibit.demotimes}</div>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(189,200,209,0.3)' }}>VENUE</span>
                    <div style={{ color: '#fff', fontWeight: 600, marginTop: '2px' }}>{exhibit.location}</div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn-ghost"
                    onClick={() => {
                      soundEffects.playClick?.();
                      setSelectedExhibit(isSelected ? null : exhibit.id);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      fontSize: '9px',
                      borderColor: isSelected ? 'rgba(255, 45, 85, 0.4)' : 'rgba(56,189,248,0.3)',
                      color: isSelected ? 'var(--plasma)' : 'var(--sky)'
                    }}
                  >
                    {isSelected ? 'CLOSE SPECS' : 'VIEW SPECS'}
                  </button>

                  <button
                    onClick={() => handleRequestToken(exhibit.id)}
                    disabled={exhibit.tokenRate === 'FULL'}
                    style={{
                      flex: 1.2,
                      padding: '10px 0',
                      background: hasToken ? 'rgba(34,197,94,0.08)' : (exhibit.tokenRate === 'FULL' ? 'transparent' : 'rgba(255,45,85,0.05)'),
                      border: `1px solid ${hasToken ? 'rgba(34,197,94,0.4)' : (exhibit.tokenRate === 'FULL' ? 'rgba(255,255,255,0.08)' : 'rgba(255,45,85,0.4)')}`,
                      color: hasToken ? 'var(--green)' : (exhibit.tokenRate === 'FULL' ? 'rgba(189,200,209,0.3)' : 'var(--plasma)'),
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      cursor: exhibit.tokenRate === 'FULL' ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: hasToken ? '0 0 15px rgba(34,197,94,0.1)' : 'none'
                    }}
                    onMouseEnter={e => {
                      if (!hasToken && exhibit.tokenRate !== 'FULL') {
                        e.currentTarget.style.background = 'rgba(255,45,85,0.15)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(255,45,85,0.25)';
                        soundEffects.playHover?.();
                      }
                    }}
                    onMouseLeave={e => {
                      if (!hasToken && exhibit.tokenRate !== 'FULL') {
                        e.currentTarget.style.background = 'rgba(255,45,85,0.05)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {hasToken ? '✓ TOKEN ISSUED' : (exhibit.tokenRate === 'FULL' ? 'TOKEN RUNOUT' : `GET TOKEN (${exhibit.tokenRate})`)}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded details overlay */}
      <AnimatePresence>
        {selectedExhibit && (() => {
          const exhibit = EXHIBITS.find(e => e.id === selectedExhibit);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExhibit(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5,5,8,0.85)',
                backdropFilter: 'blur(12px)',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={e => e.stopPropagation()}
                className="glass-panel"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '550px',
                  padding: 'clamp(16px, 5vw, 40px)',
                  border: '1px solid rgba(56,189,248,0.3)',
                  boxShadow: '0 0 50px rgba(56,189,248,0.15)'
                }}
              >
                <div className="bracket-tl" />
                <div className="bracket-tr" />
                <div className="bracket-bl" />
                <div className="bracket-br" />

                <button
                  onClick={() => {
                    soundEffects.playClick?.();
                    setSelectedExhibit(null);
                  }}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'rgba(189,200,209,0.5)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  aria-label="Close exhibit details"
                >
                  [ ESCAPE ]
                </button>

                <div style={{ marginBottom: '24px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'var(--plasma)',
                    fontWeight: 700,
                    letterSpacing: '0.15em'
                  }}>
                    {exhibit.category} // {exhibit.institution}
                  </span>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '26px',
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1.1,
                    marginTop: '4px'
                  }}>
                    {exhibit.name}
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'rgba(189,200,209,0.4)',
                    marginTop: '4px'
                  }}>
                    ORIGIN // {exhibit.country}
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  background: 'rgba(56,189,248,0.03)',
                  borderLeft: '2px solid var(--sky)',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--sky)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    marginBottom: '4px'
                  }}>
                    TECHNICAL ARCHITECTURE
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.4
                  }}>
                    {exhibit.tech}
                  </div>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(189,200,209,0.7)',
                  lineHeight: 1.7,
                  marginBottom: '24px'
                }}>
                  {exhibit.desc} Visitors will be guided by tech representatives from the institution who will perform deep architectural briefings, explain data containment mechanisms, and offer limited physical trials (where certified).
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  padding: '16px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <span style={{ color: 'rgba(189,200,209,0.3)' }}>DEMO SCHEDULE</span>
                    <div style={{ color: '#fff', fontWeight: 700, marginTop: '4px' }}>{exhibit.demotimes}</div>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(189,200,209,0.3)' }}>LOCATION</span>
                    <div style={{ color: '#fff', fontWeight: 700, marginTop: '4px' }}>{exhibit.location}</div>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(189,200,209,0.3)' }}>TOKEN RATE</span>
                    <div style={{ color: 'var(--plasma)', fontWeight: 700, marginTop: '4px' }}>{exhibit.tokenRate}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    className="btn-primary"
                    disabled={exhibit.tokenRate === 'FULL'}
                    onClick={() => {
                      handleRequestToken(exhibit.id);
                      setSelectedExhibit(null);
                    }}
                    style={{ flex: 1, padding: '12px 0' }}
                  >
                    <span className="btn-tl" />
                    <span className="btn-br" />
                    {tokensRequested[exhibit.id] ? '✓ TOKEN ISSUED' : (exhibit.tokenRate === 'FULL' ? 'TOKENS RUNOUT' : 'REQUEST ENTRY TOKEN')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Floor Map Telemetry Overlay */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMap(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5,5,8,0.92)',
              backdropFilter: 'blur(20px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, rotateX: 20 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.9, rotateX: 20 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '700px',
                padding: 'clamp(16px, 5vw, 40px)',
                border: '1px solid var(--sky)',
                boxShadow: '0 0 50px rgba(56,189,248,0.2)',
                perspective: '1000px'
              }}
            >
              <div className="bracket-tl" />
              <div className="bracket-tr" />
              <div className="bracket-bl" />
              <div className="bracket-br" />

              <button
                onClick={() => {
                  soundEffects.playClick?.();
                  setShowMap(false);
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(189,200,209,0.5)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Close Floor Map telemetry"
              >
                [ CLOSE TELEMETRY ]
              </button>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '8px',
                letterSpacing: '-0.01em'
              }}>
                IIT BOMBAY GYMKHANA // EXHIBITION GROUND GRID
              </h2>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--sky)',
                marginBottom: '24px'
              }}>
                GRID STATUS: SECURE // LIVE POWER LEVEL: 4.8 MW
              </p>

              {/* Map drawing mockup */}
              <div style={{
                position: 'relative',
                height: '300px',
                border: '1px dashed rgba(56,189,248,0.25)',
                background: 'rgba(5,5,8,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: '24px'
              }}>
                {/* HUD Gridlines */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  opacity: 0.5
                }} />

                {/* Simulated blueprint components */}
                <svg width="100%" height="100%" viewBox="0 0 500 250" style={{ pointerEvents: 'none' }}>
                  {/* Hall A */}
                  <rect x="50" y="40" width="140" height="70" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="120" y="80" fill="var(--sky)" fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle" fontWeight="bold">HALL A: ROBOTICS</text>
                  <text x="120" y="95" fill="rgba(189,200,209,0.4)" fontFamily="var(--font-mono)" fontSize="7" textAnchor="middle">ATLAS GEN-2, HOLOGRAPHIC EYE</text>

                  {/* Hall B */}
                  <rect x="220" y="40" width="140" height="70" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="290" y="80" fill="var(--sky)" fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle" fontWeight="bold">HALL B: BIO-TECH</text>
                  <text x="290" y="95" fill="rgba(189,200,209,0.4)" fontFamily="var(--font-mono)" fontSize="7" textAnchor="middle">MIT SYNAPSE, GENETIC PROBES</text>

                  {/* Space Pavilion */}
                  <rect x="50" y="140" width="140" height="70" fill="none" stroke="rgba(255, 45, 85, 0.4)" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="120" y="180" fill="var(--plasma)" fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle" fontWeight="bold">SPACE PAVILION</text>
                  <text x="120" y="195" fill="rgba(189,200,209,0.4)" fontFamily="var(--font-mono)" fontSize="7" textAnchor="middle">ISRO GAGANYAAN CABIN</text>

                  {/* Energy Sync Labs */}
                  <rect x="220" y="140" width="140" height="70" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="290" y="180" fill="var(--sky)" fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle" fontWeight="bold">ENERGY SYNC LABS</text>
                  <text x="290" y="195" fill="rgba(189,200,209,0.4)" fontFamily="var(--font-mono)" fontSize="7" textAnchor="middle">TOKAMAK FUSION, CERN TRAP</text>

                  {/* Connection paths */}
                  <path d="M 190 75 L 220 75" stroke="rgba(56,189,248,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 120 110 L 120 140" stroke="rgba(56,189,248,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 290 110 L 290 140" stroke="rgba(56,189,248,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 190 175 L 220 175" stroke="rgba(56,189,248,0.2)" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Central Node */}
                  <circle cx="410" cy="110" r="15" fill="none" stroke="var(--plasma)" strokeWidth="2" />
                  <circle cx="410" cy="110" r="4" fill="var(--plasma)" />
                  <text x="410" y="140" fill="var(--plasma-dim)" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle" fontWeight="bold">MAIN HUB</text>
                </svg>

                {/* Radar scanner sweep effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '100%',
                  background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.05), transparent)',
                  transform: 'translateX(-100%)',
                  animation: 'sweep 3.5s linear infinite'
                }} />
              </div>

              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(189,200,209,0.6)',
                lineHeight: 1.6,
                textAlign: 'center'
              }}>
                Present your **Access Tokens** at the check-in points located at the entrance of each respective hall to authorize entry. Enjoy the cybernetic exploration!
              </div>

              <style>{`
                @keyframes sweep {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
                }
              `}</style>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
