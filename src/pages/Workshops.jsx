import { useState } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const WORKSHOPS = [
  {
    id: 'w1', code: 'LAB-01',
    name: 'NEURAL ARCHITECTURE DEEP DIVE',
    instructor: 'Dr. Priya Sharma · Google DeepMind',
    duration: '6 HRS', seats: 40, price: 'FREE',
    level: 'ADVANCED',
    desc: 'Design and train transformer architectures from scratch. Build your own GPT-mini.',
    tools: ['PyTorch', 'CUDA', 'Hugging Face'],
    date: 'DEC 22',
  },
  {
    id: 'w2', code: 'LAB-02',
    name: 'QUANTUM COMPUTING WORKSHOP',
    instructor: 'Dr. Arun Verma · IBM Research',
    duration: '4 HRS', seats: 30, price: '₹500',
    level: 'INTERMEDIATE',
    desc: 'Hands-on with IBM Qiskit. Program real quantum circuits and run them on IBM Q.',
    tools: ['Qiskit', 'Python', 'IBM Q'],
    date: 'DEC 23',
  },
  {
    id: 'w3', code: 'LAB-03',
    name: 'AUTONOMOUS SYSTEMS',
    instructor: 'Prof. Kartik Rao · IIT Bombay',
    duration: '8 HRS', seats: 24, price: '₹800',
    level: 'ADVANCED',
    desc: 'Program full-stack robotic systems. From sensors to actuators to real-time decision making.',
    tools: ['ROS2', 'Python', 'OpenCV'],
    date: 'DEC 22',
  },
  {
    id: 'w4', code: 'LAB-04',
    name: 'BLOCKCHAIN & WEB3',
    instructor: 'Ankit Mehta · Polygon Labs',
    duration: '5 HRS', seats: 60, price: '₹300',
    level: 'BEGINNER',
    desc: 'Build and deploy smart contracts. Create your first DeFi protocol on testnet.',
    tools: ['Solidity', 'Hardhat', 'React'],
    date: 'DEC 24',
  },
  {
    id: 'w5', code: 'LAB-05',
    name: 'BIOINFORMATICS & AI DRUG DISCOVERY',
    instructor: 'Dr. Meera Patel · TIFR',
    duration: '4 HRS', seats: 35, price: 'FREE',
    level: 'INTERMEDIATE',
    desc: 'Use AlphaFold and ML to predict protein structures and identify drug targets.',
    tools: ['AlphaFold', 'BioPython', 'Colab'],
    date: 'DEC 23',
  },
  {
    id: 'w6', code: 'LAB-06',
    name: 'COMPUTER VISION COMBAT',
    instructor: 'Rahul Gupta · Microsoft Research',
    duration: '5 HRS', seats: 45, price: '₹400',
    level: 'INTERMEDIATE',
    desc: 'Real-time object detection, pose estimation, and 3D scene reconstruction.',
    tools: ['OpenCV', 'YOLO', 'MediaPipe'],
    date: 'DEC 24',
  },
];

const LEVEL_COLORS = { ADVANCED: 'var(--plasma)', INTERMEDIATE: 'var(--sky)', BEGINNER: '#22c55e' };
const LEVEL_GLOWS = { ADVANCED: 'rgba(255,45,85,0.25)', INTERMEDIATE: 'rgba(56,189,248,0.2)', BEGINNER: 'rgba(34,197,94,0.15)' };

export default function Workshops() {
  const [registered, setRegistered] = useState({});

  const handleRegister = (id) => {
    if (registered[id]) return;
    soundEffects.playSuccess?.();
    setRegistered(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 04 // RESEARCH LABORATORY</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          KNOWLEDGE <span className="glow-sky" style={{ color: 'var(--sky)' }}>SYNTHESIS WORKSHOPS</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'rgba(189, 200, 209, 0.5)',
          maxWidth: '540px',
          marginTop: '12px',
          lineHeight: 1.7
        }}>
          Hands-on technical workshops with world-class engineers and researchers. Synthesize new skillsets in deep learning, quantum algorithms, bionics, and blockchain architectures.
        </p>
      </motion.div>

      {/* Info bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="glass-panel"
        style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          margin: '32px 0 24px',
          padding: '16px 24px',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.05)'
        }}
      >
        {[
          { icon: '⬡', text: '20+ LAB LABS' },
          { icon: '⊕', text: 'INDUSTRY RESEARCHERS' },
          { icon: '◈', text: 'CERTIFICATES ISSUED' },
          { icon: '⟐', text: 'HANDS-ON TELEMETRY' },
        ].map(item => (
          <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--sky)', fontSize: '14px' }}>{item.icon}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.2em',
              color: 'rgba(189,200,209,0.5)',
              fontWeight: 600
            }}>{item.text}</span>
          </div>
        ))}
      </motion.div>

      {/* Workshop cards — lab layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
        {WORKSHOPS.map((ws, i) => {
          const isReg = registered[ws.id];
          return (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.3 }}
              className="glass-panel"
              style={{
                padding: 'clamp(16px, 3vw, 24px)',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                backdropFilter: 'var(--glass-blur)',
                position: 'relative',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(56, 189, 248, 0.1)';
                soundEffects.playHover?.();
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="bracket-tl" />
              <div className="bracket-br" />

              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  letterSpacing: '0.2em',
                  color: 'rgba(56,189,248,0.4)',
                  fontWeight: 600
                }}>
                  [{ws.code}] // {ws.date}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  letterSpacing: '0.15em',
                  color: LEVEL_COLORS[ws.level],
                  border: `1px solid ${LEVEL_COLORS[ws.level]}40`,
                  padding: '2px 8px',
                  background: LEVEL_COLORS[ws.level] + '15',
                }}>{ws.level}</span>
              </div>

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '6px',
                  lineHeight: 1.2
                }}>
                  {ws.name}
                </h3>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'var(--plasma-dim)',
                  marginBottom: '12px',
                  fontWeight: 700
                }}>
                  {ws.instructor}
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(189,200,209,0.5)',
                  lineHeight: 1.6,
                  marginBottom: '16px'
                }}>
                  {ws.desc}
                </p>

                {/* Tools */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {ws.tools.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: 'var(--sky-dim)',
                      padding: '2px 8px',
                      border: '1px solid rgba(56,189,248,0.2)',
                      background: 'rgba(56,189,248,0.05)'
                    }}>
                      {t}
                    </span>
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
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 800,
                      color: 'var(--sky)',
                      textShadow: 'var(--glow-sky-sm)'
                    }}>
                      {ws.price}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: 'rgba(189,200,209,0.3)',
                      marginTop: '2px',
                      fontWeight: 600
                    }}>
                      {ws.duration} // {ws.seats} SEATS MAX
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundEffects.playClick?.();
                      handleRegister(ws.id);
                    }}
                    style={{
                      padding: '8px 20px',
                      background: isReg ? 'rgba(34,197,94,0.08)' : 'rgba(255,45,85,0.05)',
                      border: `1px solid ${isReg ? 'rgba(34,197,94,0.4)' : 'rgba(255,45,85,0.4)'}`,
                      color: isReg ? 'var(--green)' : 'var(--plasma)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      transition: 'all 0.3s ease',
                      boxShadow: isReg ? '0 0 15px rgba(34,197,94,0.1)' : 'none'
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
                    {isReg ? '✓ ENROLLED' : 'ENROLL NOW'}
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
