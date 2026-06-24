/* Techfest 2026 - Telemetry Log 3 */
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
    specs: [
      'WEIGHT CLASS: 30 lbs / 60 lbs combat limits.',
      'WEAPONS: Active spinners, lifters, or flippers allowed. No combustion/projectiles.',
      'CONTROLS: 2.4GHz failsafe R/C. Autonomous targeting scripts permitted.',
      'ARENA: 30x30ft steel enclosure with floor spikes and active side flippers.'
    ]
  },
  {
    id: 'c2', code: 'CC-02',
    name: 'CODE BREACH', difficulty: 'HARD', slots: 256,
    prize: '₹1,50,000',
    desc: 'Capture-the-flag style competitive programming. Break their code. Protect yours.',
    domains: ['ALGORITHMS', 'SECURITY', 'PYTHON', 'C++'],
    deadline: 'DEC 12',
    specs: [
      'FORMAT: 24-hour jeopardy-style Cyber-CTF.',
      'CATEGORIES: Reverse engineering, cryptography, pwn, web exploitation, forensics.',
      'TEAMS: 1 to 4 cyber-operators per terminal.',
      'RESTRICTIONS: Zero external network usage. DDoS against infra triggers ban.'
    ]
  },
  {
    id: 'c3', code: 'AI-03',
    name: 'NEURAL WARS', difficulty: 'EXTREME', slots: 128,
    prize: '₹2,50,000',
    desc: 'Train and deploy AI models that compete in real-time adversarial environments.',
    domains: ['DEEP LEARNING', 'RL', 'PYTORCH'],
    deadline: 'DEC 08',
    specs: [
      'MODELS: Reinforcement Learning agent scripts written in Python/PyTorch.',
      'ARENA: Virtual 2D/3D grids with resource gathering and path blocking.',
      'COMPUTING: Maximum 0.5 CPU core and 2GB RAM execution footprint.',
      'LATENCY: Max 15ms inference latency per frame before timeout.'
    ]
  },
  {
    id: 'c4', code: 'AE-04',
    name: 'AEROBOT PRIME', difficulty: 'HARD', slots: 48,
    prize: '₹1,20,000',
    desc: 'Autonomous aerial drone racing with obstacle avoidance and precision landing.',
    domains: ['DRONES', 'CONTROL', 'COMPUTER VISION'],
    deadline: 'DEC 15',
    specs: [
      'VEHICLE: Quadcopter design, maximum frame size 330mm, max weight 1.5kg.',
      'NAVIGATION: Onboard Computer Vision only. No GPS telemetry permitted.',
      'TRACK: 8 glowing LED rings. Visual recognition required for pathing.',
      'AUTO-LAND: Must detect QR-encoded target pad and perform stable landing.'
    ]
  },
  {
    id: 'c5', code: 'DS-05',
    name: 'DATAVAULT HEIST', difficulty: 'MEDIUM', slots: 500,
    prize: '₹80,000',
    desc: 'Extract insights from massive datasets. The fastest and most accurate analysis wins.',
    domains: ['DATA SCIENCE', 'STATISTICS', 'ML'],
    deadline: 'DEC 14',
    specs: [
      'DATASETS: 45GB compressed CSV/Parquet telemetry streams.',
      'CHALLENGE: Predict quantum system decoherence events in high-dimensional noise.',
      'TIME LIMIT: 10 minutes total inference execution window.',
      'METRICS: F1-score optimization + model complexity penalties.'
    ]
  },
  {
    id: 'c6', code: 'ST-06',
    name: 'SPACE ODYSSEY', difficulty: 'HARD', slots: 80,
    prize: '₹2,00,000',
    desc: 'Design a complete mission to Mars. Propulsion, payload, landing. Present to ISRO scientists.',
    domains: ['AEROSPACE', 'PHYSICS', 'CAD'],
    deadline: 'DEC 06',
    specs: [
      'PAYLOAD: Detailed rover design with CAD/SolidWorks structural profiles.',
      'MISSION: Orbital trajectory planning using GMAT or MATLAB orbital toolkits.',
      'PRESENTATION: Live pitch defense before ISRO space engineers.',
      'REQUIREMENT: Thermal shield calculations for Martian atmosphere insertion.'
    ]
  },
  {
    id: 'c7', code: 'QC-07',
    name: 'QUANTUM CIRCUIT DESIGN', difficulty: 'EXTREME', slots: 96,
    prize: '₹1,80,000',
    desc: 'Design optimal quantum circuits to solve classical NP-hard problems using IBM Qiskit.',
    domains: ['QUANTUM COMPUTING', 'QISKIT', 'ALGORITHMS'],
    deadline: 'DEC 11',
    specs: [
      'PLATFORM: IBM Quantum Experience cloud quantum backends (127-qubit Eagle processors).',
      'TASKS: Circuit optimization for MaxCut, QAOA, and VQE molecular simulations.',
      'CONSTRAINTS: Circuit depth < 200 gates, maximum 20 qubits per submission.',
      'SCORING: Gate count efficiency, circuit fidelity, and solution accuracy.'
    ]
  },
  {
    id: 'c8', code: 'BH-08',
    name: 'BIO-HACK CHALLENGE', difficulty: 'MEDIUM', slots: 150,
    prize: '₹90,000',
    desc: 'Build bioinformatics pipelines to diagnose genetic diseases from sequencing data.',
    domains: ['BIOINFORMATICS', 'PYTHON', 'GENOMICS'],
    deadline: 'DEC 13',
    specs: [
      'DATA: 1000-Genomes raw WGS FASTQ reads from 12 anonymized patient samples.',
      'TASK: Identify pathogenic SNPs and structural variants using your pipeline.',
      'TOOLS: BWA-MEM2, GATK, VarScan, PyVCF — open-source stack only.',
      'SCORING: Sensitivity/specificity against a gold-standard clinical annotation set.'
    ]
  },
];

const DIFF_COLORS = { EXTREME: 'var(--plasma)', HARD: '#ff8c00', MEDIUM: 'var(--sky)' };
const DIFF_GLOWS = { EXTREME: 'rgba(255,45,85,0.2)', HARD: 'rgba(255,140,0,0.2)', MEDIUM: 'rgba(56,189,248,0.2)' };

export default function Competitions() {
  const [selected, setSelected] = useState(null);
  const [registered, setRegistered] = useState(() => {
    try {
      const stored = localStorage.getItem('tf_registered_events');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const handleRegister = (id) => {
    if (registered[id]) return;
    soundEffects.playSuccess?.();
    setRegistered(prev => {
      const next = { ...prev, [id]: true };
      try {
        localStorage.setItem('tf_registered_events', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
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
          fontSize: '15.5px',
          color: '#cbd5e1',
          maxWidth: '540px',
          marginTop: '12px',
          lineHeight: 1.7
        }}>
          Select your arena. Prove your dominance. Every competition is a battle for supremacy, testing the limits of your algorithms, hardware, and design.
        </p>
      </motion.div>

      {/* Stats strip — 2-col on mobile, 4-col on desktop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="glass-panel"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          margin: '24px 0',
          padding: 'clamp(16px, 3vw, 20px) clamp(16px, 3vw, 24px)',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.05)'
        }}
      >
        {[
          { v: '₹20L+', l: 'TOTAL PRIZES' },
          { v: '10,000+', l: 'REGISTRATIONS' },
          { v: '8',     l: 'CORE ARENAS' },
          { v: '50+',   l: 'NATIONS' },
        ].map(s => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 4vw, 22px)',
              fontWeight: 800,
              color: 'var(--sky)',
              textShadow: 'var(--glow-sky-sm)'
            }}>{s.v}</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#cbd5e1',
              marginTop: '4px'
            }}>{s.l}</div>
          </div>
        ))}
      </motion.div>

      {/* Competitions grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '16px' }}>
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
                padding: 'clamp(16px, 3vw, 24px)',
                border: isSelected ? `1px solid ${DIFF_COLORS[comp.difficulty]}` : '1px solid rgba(56, 189, 248, 0.15)',
                boxShadow: isSelected ? `0 0 25px ${DIFF_GLOWS[comp.difficulty]}` : 'none',
                transition: 'all 0.3s',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="bracket-tl" style={{ borderColor: isSelected ? DIFF_COLORS[comp.difficulty] : 'var(--sky)' }} />
              <div className="bracket-br" style={{ borderColor: isSelected ? DIFF_COLORS[comp.difficulty] : 'var(--sky)' }} />

              {/* Code */}
              <div style={{
                position: 'absolute', top: 12, left: 12,
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                letterSpacing: '0.2em', color: '#7bd0ff',
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
                  fontSize: '14px',
                  color: '#cbd5e1',
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
                {/* Expanding spec sheets (Framer Motion details drawer) */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={{
                        marginTop: '16px',
                        paddingTop: '16px',
                        borderTop: '1px dashed rgba(56, 189, 248, 0.2)',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: DIFF_COLORS[comp.difficulty],
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        marginBottom: '8px'
                      }}>
                        SEC_ARENA_SPECS // FEED_LINK_OK
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {comp.specs.map((spec, sIdx) => (
                          <div key={sIdx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--sky)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>▶</span>
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '12px',
                              color: '#ffffff',
                              lineHeight: '1.4'
                            }}>
                              {spec}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#cbd5e1', marginTop: '2px' }}>DEADLINE: {comp.deadline}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: '#fff' }}>{comp.slots}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#cbd5e1' }}>SLOTS AVAILABLE</div>
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
                    style={{ flex: 1, padding: '12px 0', fontSize: '10px', minHeight: '48px' }}
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
                      padding: '12px 0',
                      minHeight: '48px',
                      background: isReg ? 'rgba(0, 245, 196, 0.08)' : 'rgba(255,45,85,0.05)',
                      border: `1px solid ${isReg ? 'rgba(0, 245, 196, 0.4)' : 'rgba(255,45,85,0.4)'}`,
                      color: isReg ? 'var(--green)' : 'var(--plasma)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
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
