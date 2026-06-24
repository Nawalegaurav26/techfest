/* Techfest 2026 — Telemetry Log 20 // TECHFEST TRIVIA */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const QUESTIONS = [
  {
    q: 'What is the prize pool of Techfest 2026?',
    opts: ['₹50 Lakhs', '₹1 Crore+', '₹25 Lakhs', '₹75 Lakhs'],
    ans: 1,
  },
  {
    q: 'Which weight class has the highest prize in Robowars?',
    opts: ['60kg Heavyweight', '15kg Featherweight', '120kg Titan Class', 'Open Weight'],
    ans: 2,
  },
  {
    q: 'Who is the keynote speaker at Techfest 2026?',
    opts: ['Elon Musk', 'Sam Altman', 'Sundar Pichai', 'Jensen Huang'],
    ans: 1,
  },
  {
    q: 'How many hours does the Techfest Hackathon run?',
    opts: ['24 hours', '48 hours', '36 hours', '12 hours'],
    ans: 2,
  },
  {
    q: 'Which organization collaborates with Techfest for the Space Pavilion?',
    opts: ['NASA', 'SpaceX', 'ISRO', 'ESA'],
    ans: 2,
  },
  {
    q: 'IIT Bombay is located in which city?',
    opts: ['Delhi', 'Bangalore', 'Chennai', 'Mumbai'],
    ans: 3,
  },
  {
    q: 'What does GPU stand for?',
    opts: ['General Processing Unit', 'Graphics Processing Unit', 'Global Processing Utility', 'Graphical Program Unit'],
    ans: 1,
  },
  {
    q: 'What year was Techfest founded?',
    opts: ['1995', '1998', '2001', '2003'],
    ans: 1,
  },
  {
    q: 'Which company makes the H100 AI chip?',
    opts: ['Intel', 'AMD', 'NVIDIA', 'Qualcomm'],
    ans: 2,
  },
  {
    q: 'What programming language is React.js built with?',
    opts: ['Python', 'Java', 'JavaScript', 'TypeScript'],
    ans: 2,
  },
];

const GRADES = [
  { min: 9, label: 'LEGENDARY', color: '#FFD700', glow: 'rgba(255,215,0,0.4)', icon: '🏆' },
  { min: 7, label: 'EXPERT',    color: 'var(--sky)', glow: 'rgba(56,189,248,0.4)', icon: '⭐' },
  { min: 5, label: 'SKILLED',   color: 'var(--green)', glow: 'rgba(0,245,196,0.35)', icon: '⚡' },
  { min: 0, label: 'ROOKIE',    color: 'var(--plasma)', glow: 'rgba(255,45,85,0.35)', icon: '🌱' },
];

function getGrade(score) {
  return GRADES.find(g => score >= g.min);
}

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);       // index of selected option
  const [revealed, setRevealed] = useState(false);      // show correct/wrong highlight
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const [shareMsg, setShareMsg] = useState(false);

  const question = QUESTIONS[currentQ];
  const progress = ((currentQ + (revealed ? 1 : 0)) / QUESTIONS.length) * 100;

  function handleSelect(idx) {
    if (revealed) return;
    soundEffects.playClick?.();
    setSelected(idx);
    setRevealed(true);
    if (idx === question.ans) {
      soundEffects.playSuccess?.();
      setScore(s => s + 1);
    } else {
      soundEffects.playError?.();
    }
  }

  function handleNext() {
    soundEffects.playClick?.();
    if (currentQ + 1 >= QUESTIONS.length) {
      setComplete(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function handleRestart() {
    soundEffects.playClick?.();
    setCurrentQ(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setComplete(false);
    setShareMsg(false);
  }

  function handleShare() {
    soundEffects.playSuccess?.();
    const grade = getGrade(score);
    const text = `I scored ${score}/10 (${grade.label}) on the Techfest 2026 Trivia Challenge! 🚀 #Techfest2026 #IITBombay`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => setShareMsg(true));
    } else {
      setShareMsg(true);
    }
    setTimeout(() => setShareMsg(false), 3000);
  }

  function getOptionStyle(idx) {
    const base = {
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      color: '#fff',
      padding: '16px 20px',
      border: '1px solid rgba(56,189,248,0.3)',
      background: 'rgba(255,255,255,0.05)',
      textAlign: 'left',
      width: '100%',
      cursor: revealed ? 'default' : 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      lineHeight: 1.4,
    };
    if (!revealed) return base;

    if (idx === question.ans) {
      return {
        ...base,
        background: 'rgba(0,245,196,0.1)',
        border: '1px solid rgba(0,245,196,0.5)',
        color: 'var(--green)',
        boxShadow: '0 0 16px rgba(0,245,196,0.2)',
      };
    }
    if (idx === selected && selected !== question.ans) {
      return {
        ...base,
        background: 'rgba(255,45,85,0.08)',
        border: '1px solid rgba(255,45,85,0.4)',
        color: 'var(--plasma)',
      };
    }
    return { ...base, opacity: 0.35 };
  }

  const grade = getGrade(score);

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
          MODULE 20 // TECHFEST TRIVIA
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#fff',
          marginBottom: '10px',
        }}>
          TECHFEST TRIVIA{' '}
          <span className="glow-green" style={{ color: 'var(--green)' }}>CHALLENGE</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'rgba(241, 245, 249, 0.9)',
          lineHeight: 1.7,
          maxWidth: '640px',
        }}>
          10 questions. Science, tech, and all things Techfest. Prove your knowledge and claim
          your grade in the neural leaderboard.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!complete ? (
          /* ── QUIZ IN PROGRESS ── */
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            style={{ maxWidth: '680px' }}
          >
            {/* Progress bar */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--green)',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                }}>
                  QUESTION {currentQ + 1} / {QUESTIONS.length}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'rgba(226, 232, 240, 0.7)',
                  letterSpacing: '0.1em',
                }}>
                  SCORE: {score}
                </span>
              </div>
              <div style={{
                height: '3px',
                background: 'rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    height: '100%',
                    background: 'var(--green)',
                    boxShadow: '0 0 8px rgba(0,245,196,0.6)',
                  }}
                />
              </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="glass-panel"
                style={{
                  padding: '28px 24px',
                  border: '1px solid rgba(0,245,196,0.15)',
                  marginBottom: '20px',
                  position: 'relative',
                }}
              >
                <div className="bracket-tl" style={{ borderColor: 'var(--green)' }} />
                <div className="bracket-br" style={{ borderColor: 'var(--green)' }} />

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(0,245,196,0.85)',
                  letterSpacing: '0.2em',
                  marginBottom: '14px',
                  fontWeight: 700,
                }}>
                  Q{String(currentQ + 1).padStart(2, '0')} //
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 3.5vw, 26px)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.35,
                }}>
                  {question.q}
                </h2>
              </motion.div>
            </AnimatePresence>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {question.opts.map((opt, idx) => (
                <motion.button
                  key={`${currentQ}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.3 }}
                  onClick={() => handleSelect(idx)}
                  style={getOptionStyle(idx)}
                  onMouseEnter={e => {
                    if (!revealed) {
                      e.currentTarget.style.borderColor = 'rgba(0,245,196,0.4)';
                      e.currentTarget.style.background = 'rgba(0,245,196,0.04)';
                      soundEffects.playHover?.();
                    }
                  }}
                  onMouseLeave={e => {
                    if (!revealed && selected !== idx) {
                      e.currentTarget.style.borderColor = 'rgba(56,189,248,0.15)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    }
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: revealed
                      ? (idx === question.ans ? 'var(--green)' : idx === selected ? 'var(--plasma)' : '#cbd5e1')
                      : '#38bdf8',
                    flexShrink: 0,
                    width: '20px',
                    textAlign: 'center',
                  }}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  {opt}
                  {revealed && idx === question.ans && (
                    <span style={{ marginLeft: 'auto', fontSize: '14px', flexShrink: 0 }}>✓</span>
                  )}
                  {revealed && idx === selected && selected !== question.ans && (
                    <span style={{ marginLeft: 'auto', fontSize: '14px', flexShrink: 0 }}>✗</span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Feedback and Next button */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}
                >
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: selected === question.ans ? 'var(--green)' : 'var(--plasma)',
                    letterSpacing: '0.1em',
                  }}>
                    {selected === question.ans ? '✓ CORRECT!' : '✗ WRONG — SEE CORRECT ABOVE'}
                  </div>
                  <button
                    onClick={handleNext}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      padding: '10px 24px',
                      background: 'rgba(0,245,196,0.06)',
                      border: '1px solid rgba(0,245,196,0.4)',
                      color: 'var(--green)',
                      boxShadow: '0 0 12px rgba(0,245,196,0.15)',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(0,245,196,0.12)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,196,0.25)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(0,245,196,0.06)';
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(0,245,196,0.15)';
                    }}
                  >
                    {currentQ + 1 >= QUESTIONS.length ? 'SEE RESULTS →' : 'NEXT QUESTION →'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ── RESULTS SCREEN ── */
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: '540px' }}
          >
            <div
              className="glass-panel"
              style={{
                padding: '48px 36px',
                border: `1px solid ${grade.color}55`,
                background: grade.glow.replace('0.4)', '0.04)'),
                boxShadow: `0 0 40px ${grade.glow.replace('0.4)', '0.15)')}`,
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div className="bracket-tl" style={{ borderColor: grade.color, width: '20px', height: '20px' }} />
              <div className="bracket-tr" style={{ borderColor: grade.color, width: '20px', height: '20px' }} />
              <div className="bracket-bl" style={{ borderColor: grade.color, width: '20px', height: '20px' }} />
              <div className="bracket-br" style={{ borderColor: grade.color, width: '20px', height: '20px' }} />

              {/* Grade icon */}
              <div style={{ fontSize: '64px', lineHeight: 1, marginBottom: '20px' }}>{grade.icon}</div>

              {/* Grade label */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.3em',
                color: grade.color,
                textShadow: `0 0 12px ${grade.glow}`,
                marginBottom: '8px',
              }}>
                RANK // {grade.label}
              </div>

              {/* Score */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 10vw, 80px)',
                fontWeight: 800,
                color: grade.color,
                textShadow: `0 0 24px ${grade.glow}`,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                {score}<span style={{ fontSize: '0.4em', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>/10</span>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'rgba(241, 245, 249, 0.9)',
                lineHeight: 1.6,
                marginBottom: '36px',
              }}>
                {score === 10 && 'Perfect score! You are a true Techfest legend. No question stood in your way.'}
                {score >= 7 && score < 10 && 'Outstanding performance. Your knowledge of tech and Techfest is exceptional.'}
                {score >= 5 && score < 7 && 'Good effort! You have solid foundations. Study up and try again.'}
                {score < 5 && 'Keep learning! The world of tech is vast. Come back stronger next time.'}
              </p>

              {/* Quick stat row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1px',
                background: 'rgba(255,255,255,0.05)',
                marginBottom: '32px',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                {[
                  { val: `${score}`, label: 'Correct' },
                  { val: `${10 - score}`, label: 'Wrong' },
                  { val: `${Math.round(score * 10)}%`, label: 'Accuracy' },
                ].map(s => (
                  <div key={s.label} style={{ padding: '14px 8px', background: 'rgba(5,5,8,0.5)' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '24px',
                      fontWeight: 800,
                      color: '#fff',
                      marginBottom: '2px',
                    }}>{s.val}</div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'rgba(226, 232, 240, 0.6)',
                      letterSpacing: '0.12em',
                    }}>{s.label.toUpperCase()}</div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleShare}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    padding: '12px 24px',
                    background: shareMsg ? 'rgba(0,245,196,0.08)' : 'rgba(255,255,255,0.03)',
                    border: shareMsg ? '1px solid rgba(0,245,196,0.5)' : '1px solid rgba(255,255,255,0.12)',
                    color: shareMsg ? 'var(--green)' : 'rgba(189,200,209,0.6)',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                  }}
                >
                  {shareMsg ? '✓ COPIED TO CLIPBOARD' : '⬡ SHARE SCORE'}
                </button>
                <button
                  onClick={handleRestart}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    padding: '12px 24px',
                    background: `${grade.color}12`,
                    border: `1px solid ${grade.color}55`,
                    color: grade.color,
                    boxShadow: `0 0 12px ${grade.glow.replace('0.4)', '0.2)')}`,
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 0 24px ${grade.glow.replace('0.4)', '0.35)')}`;
                    soundEffects.playHover?.();
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = `0 0 12px ${grade.glow.replace('0.4)', '0.2)')}`;
                  }}
                >
                  ↺ PLAY AGAIN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
