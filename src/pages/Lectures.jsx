/* Techfest 2026 - Telemetry Log 8 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const SPEAKERS = [
  {
    id: 's1',
    name: 'SAM ALTMAN',
    title: 'CEO, OPENAI',
    topic: 'THE PATH TO DEEP AGI & COGNITIVE HYBRIDS',
    desc: 'Exploring the transition from LLMs to autonomous reasoning models, and the upcoming cybernetic interfaces allowing direct cognitive sync.',
    domain: 'ARTIFICIAL INTELLIGENCE',
    time: 'DEC 22, 11:00 IST',
    venue: 'CONVOCATION HALL',
    status: '92% CAPACITY',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 's2',
    name: 'DR. SHIRLEY ANN JACKSON',
    title: 'COSMOLOGIST & FORMER PRESIDENT OF RPI',
    topic: 'QUANTUM GRAVITY & SPACE-TIME ENGINEERING',
    desc: 'Analyzing the physics of quantum warp bridges and the materials required to maintain stable wormhole nodes.',
    domain: 'QUANTUM PHYSICS',
    time: 'DEC 22, 14:30 IST',
    venue: 'PC SAXENA AUDITORIUM',
    status: '78% CAPACITY',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 's3',
    name: 'VITALIK BUTERIN',
    title: 'FOUNDER, ETHEREUM',
    topic: 'DECENTRALIZED QUANTUM ENCRYPTION PROTOCOLS',
    desc: 'Preventing the security apocalypse in post-quantum computing environments using distributed ledger cryptography.',
    domain: 'CRYPTOGRAPHY',
    time: 'DEC 23, 10:00 IST',
    venue: 'CONVOCATION HALL',
    status: '96% CAPACITY',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 's4',
    name: 'DR. HIROSHI ISHIGURO',
    title: 'DIRECTOR, INTELLIGENT ROBOTICS LAB',
    topic: 'THE GHOST IN THE BIOMIMETIC SHELL',
    desc: 'A look into life-like androids, human-robot interaction, and the psychological blur between biological and synthetic life.',
    domain: 'ROBOTICS & ANDROIDS',
    time: 'DEC 23, 15:00 IST',
    venue: 'GYMKHANA GROUND ARENA',
    status: '84% CAPACITY',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 's5',
    name: 'DEMIS HASSABIS',
    title: 'CO-FOUNDER, GOOGLE DEEPMIND',
    topic: 'BIOMIMETIC DRUG SYNTHESIS VIA DEEP LEARNING',
    desc: 'How machine learning is solving cellular biology structures and automating the engineering of targeted genetic remedies.',
    domain: 'BIO-TECHNOLOGY',
    time: 'DEC 24, 11:30 IST',
    venue: 'PC SAXENA AUDITORIUM',
    status: '67% CAPACITY',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 's6',
    name: 'DR. MARGARET HAMILTON',
    title: 'FOUNDER, HAMILTON TECHNOLOGIES',
    topic: 'HYPER-RELIABLE SOFTWARE IN MANNED SPACEWAYS',
    desc: 'Lessons from Apollo guidance systems adapted for the autonomous navigation architectures of Mars colony transport.',
    domain: 'AEROSPACE SYSTEMS',
    time: 'DEC 24, 14:00 IST',
    venue: 'CONVOCATION HALL',
    status: 'FULL (RESERVE LIST)',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 's7',
    name: 'SUNDAR PICHAI',
    title: 'CEO, GOOGLE & ALPHABET',
    topic: 'MULTIMODAL AI: FROM LANGUAGE TO EMBODIED INTELLIGENCE',
    desc: 'How Gemini Ultra is evolving beyond text — vision, audio, robotics, and real-time reasoning in a single integrated cognitive system.',
    domain: 'ARTIFICIAL INTELLIGENCE',
    time: 'DEC 22, 09:30 IST',
    venue: 'CONVOCATION HALL',
    status: '98% CAPACITY',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 's8',
    name: 'DR. PRIYA NATARAJAN',
    title: 'COSMOLOGIST, YALE UNIVERSITY',
    topic: 'DARK MATTER MAPPING WITH GRAVITATIONAL LENSING AI',
    desc: 'Using deep learning to resolve sub-arc-second gravitational lensing patterns from James Webb Space Telescope data to build the first high-resolution dark matter maps.',
    domain: 'QUANTUM PHYSICS',
    time: 'DEC 23, 11:30 IST',
    venue: 'PC SAXENA AUDITORIUM',
    status: '55% CAPACITY',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

const DOMAINS = ['ALL', 'ARTIFICIAL INTELLIGENCE', 'QUANTUM PHYSICS', 'CRYPTOGRAPHY', 'ROBOTICS & ANDROIDS', 'BIO-TECHNOLOGY', 'AEROSPACE SYSTEMS'];

export default function Lectures() {
  const [activeDomain, setActiveDomain] = useState('ALL');
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [syncStatus, setSyncStatus] = useState({});

  const filteredSpeakers = activeDomain === 'ALL'
    ? SPEAKERS
    : SPEAKERS.filter(s => s.domain === activeDomain);

  const handleSyncSeat = (id) => {
    if (syncStatus[id]) return;
    soundEffects.playSuccess?.();
    setSyncStatus(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
      >
        <div className="section-overline" style={{ marginBottom: '12px' }}>
          MODULE 04 // BRAIN TRACE
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          MIND SYNC <span className="glow-sky" style={{ color: 'var(--sky)' }}>LECTURES</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'rgba(189, 200, 209, 0.5)',
          maxWidth: '540px',
          marginTop: '12px',
          lineHeight: 1.7
        }}>
          Direct knowledge download. Synchronize your neural pathways with global pioneers, tech titans, and scientific visionaries reshaping the limits of humanity.
        </p>
      </motion.div>

      {/* Domain Filters — scrollable on mobile */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        gap: '8px',
        margin: '24px 0 20px',
        paddingBottom: '12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        {DOMAINS.map(domain => {
          const isActive = domain === activeDomain;
          return (
            <button
              key={domain}
              onClick={() => {
                soundEffects.playClick?.();
                setActiveDomain(domain);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '10px 16px',
                minHeight: '44px',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                color: isActive ? '#fff' : 'rgba(189,200,209,0.55)',
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
                  e.currentTarget.style.color = 'rgba(189,200,209,0.55)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }
              }}
            >
              {domain}
            </button>
          );
        })}
      </div>

      {/* Speakers Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
        gap: '16px'
      }}>
        {filteredSpeakers.map((speaker, i) => {
          const isSelected = selectedSpeaker === speaker.id;
          const isSynced = syncStatus[speaker.id];

          return (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="glass-panel"
              style={{
                position: 'relative',
                padding: 'clamp(16px, 3vw, 24px)',
                border: isSelected ? '1px solid rgba(255, 45, 85, 0.4)' : '1px solid rgba(56,189,248,0.15)',
                boxShadow: isSelected ? '0 0 30px rgba(255,45,85,0.15)' : 'none',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Decorative brackets */}
              <div className="bracket-tl" style={{ borderColor: isSelected ? 'var(--plasma)' : 'var(--sky)' }} />
              <div className="bracket-br" style={{ borderColor: isSelected ? 'var(--plasma)' : 'var(--sky)' }} />

              <div>
                {/* Speaker top header */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      border: `1px solid ${isSelected ? 'var(--plasma)' : 'var(--sky)'}`,
                      filter: isSelected ? 'grayscale(0)' : 'grayscale(100%) blur(0.3px)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: 'var(--plasma-dim)',
                      letterSpacing: '0.15em',
                      fontWeight: 700
                    }}>
                      {speaker.domain}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#fff',
                      marginTop: '2px',
                      lineHeight: 1.1
                    }}>
                      {speaker.name}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'rgba(189,200,209,0.5)',
                      marginTop: '2px'
                    }}>
                      {speaker.title}
                    </p>
                  </div>
                </div>

                {/* Speaker Topic */}
                <h4 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: isSelected ? 'var(--plasma)' : 'var(--sky)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.4,
                  marginBottom: '8px'
                }}>
                  {speaker.topic}
                </h4>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(189,200,209,0.6)',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}>
                  {speaker.desc}
                </p>
              </div>

              {/* Speaker Footer metadata */}
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  padding: '12px 0',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px'
                }}>
                  <div>
                    <span style={{ color: 'rgba(189,200,209,0.3)' }}>SCHEDULE //</span>
                    <div style={{ color: 'var(--on-surface)', fontWeight: 600, marginTop: '2px' }}>{speaker.time}</div>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(189,200,209,0.3)' }}>VENUE //</span>
                    <div style={{ color: 'var(--on-surface)', fontWeight: 600, marginTop: '2px' }}>{speaker.venue}</div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    className="btn-ghost"
                    onClick={() => {
                      soundEffects.playClick?.();
                      setSelectedSpeaker(isSelected ? null : speaker.id);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      fontSize: '9px',
                      borderColor: isSelected ? 'rgba(255, 45, 85, 0.4)' : 'rgba(56,189,248,0.3)',
                      color: isSelected ? 'var(--plasma)' : 'var(--sky)'
                    }}
                  >
                    {isSelected ? 'CLOSE SPECS' : 'VIEW DETAILS'}
                  </button>

                  <button
                    onClick={() => handleSyncSeat(speaker.id)}
                    style={{
                      flex: 1.2,
                      padding: '10px 0',
                      background: isSynced ? 'rgba(0, 245, 196, 0.08)' : 'rgba(255,45,85,0.05)',
                      border: `1px solid ${isSynced ? 'rgba(0, 245, 196, 0.4)' : 'rgba(255,45,85,0.4)'}`,
                      color: isSynced ? 'var(--green)' : 'var(--plasma)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      transition: 'all 0.3s ease',
                      boxShadow: isSynced ? '0 0 15px rgba(0, 245, 196, 0.1)' : 'none'
                    }}
                    onMouseEnter={e => {
                      if (!isSynced) {
                        e.currentTarget.style.background = 'rgba(255,45,85,0.15)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(255,45,85,0.25)';
                        soundEffects.playHover?.();
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSynced) {
                        e.currentTarget.style.background = 'rgba(255,45,85,0.05)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {isSynced ? '✓ NEURAL SYNCED' : `SYNC SEAT (${speaker.status})`}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded details overlay */}
      <AnimatePresence>
        {selectedSpeaker && (() => {
          const speaker = SPEAKERS.find(s => s.id === selectedSpeaker);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpeaker(null)}
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
                    setSelectedSpeaker(null);
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
                  aria-label="Close speaker details"
                >
                  [ ESCAPE ]
                </button>

                <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      border: '1px solid var(--sky)'
                    }}
                  />
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--plasma)',
                      fontWeight: 700,
                      letterSpacing: '0.15em'
                    }}>
                      {speaker.domain}
                    </span>
                    <h2 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '26px',
                      fontWeight: 800,
                      color: '#fff',
                      lineHeight: 1.1,
                      marginTop: '4px'
                    }}>
                      {speaker.name}
                    </h2>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'rgba(189,200,209,0.4)',
                      marginTop: '4px'
                    }}>
                      {speaker.title}
                    </p>
                  </div>
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
                    TOPIC SYNOPSIS
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.4
                  }}>
                    "{speaker.topic}"
                  </div>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(189,200,209,0.7)',
                  lineHeight: 1.7,
                  marginBottom: '24px'
                }}>
                  {speaker.desc} The speaker will touch upon current development speeds, the ethical frameworks required to safely govern this transition, and the long-term impact on employment, society, and the definitions of human creativity.
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
                    <span style={{ color: 'rgba(189,200,209,0.3)' }}>DATE & TIME</span>
                    <div style={{ color: '#fff', fontWeight: 700, marginTop: '4px' }}>{speaker.time}</div>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(189,200,209,0.3)' }}>LOCATION</span>
                    <div style={{ color: '#fff', fontWeight: 700, marginTop: '4px' }}>{speaker.venue}</div>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(189,200,209,0.3)' }}>SYNC AVAIL.</span>
                    <div style={{ color: 'var(--plasma)', fontWeight: 700, marginTop: '4px' }}>{speaker.status}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      handleSyncSeat(speaker.id);
                      setSelectedSpeaker(null);
                    }}
                    style={{ flex: 1, padding: '12px 0' }}
                  >
                    <span className="btn-tl" />
                    <span className="btn-br" />
                    {syncStatus[speaker.id] ? '✓ NEURAL SYNCED' : 'SYNCHRONIZE NOW'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
