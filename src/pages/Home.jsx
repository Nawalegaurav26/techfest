import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ── COUNTDOWN ─────────────────────────────────────── */
const TARGET = new Date('2026-12-22T09:00:00').getTime();

function useCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const dist = TARGET - Date.now();
      if (dist > 0) {
        setTime({
          days:    Math.floor(dist / 86400000),
          hours:   Math.floor((dist % 86400000) / 3600000),
          minutes: Math.floor((dist % 3600000)  / 60000),
          seconds: Math.floor((dist % 60000)    / 1000),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ── STATS ─────────────────────────────────────────── */
const STATS = [
  { value: '15,000+', label: 'PARTICIPANTS',    tag: 'SYS.01' },
  { value: '250+',    label: 'EVENTS',          tag: 'SYS.02' },
  { value: '₹1 CR+',  label: 'PRIZE POOL',      tag: 'SYS.03' },
  { value: '72 Hrs',  label: 'NON-STOP ACTION', tag: 'SYS.04' },
];

/* ── CATEGORIES ────────────────────────────────────── */
const CATEGORIES = [
  { icon: '⚔',  title: 'COMPETITIONS',  desc: 'Evolution trials. Survival of the most advanced.',   to: '/competitions' },
  { icon: '⬣',  title: 'WORKSHOPS',     desc: 'Knowledge uploads. Direct neural data transfer.',     to: '/workshops'    },
  { icon: '◈',  title: 'LECTURES',      desc: 'Mind sync. Industry pioneers. Future thinkers.',      to: '/lectures'     },
  { icon: '◉',  title: 'EXHIBITIONS',   desc: 'Tech lab. 500+ projects from across the globe.',      to: '/events'       },
  { icon: '⊗',  title: 'ROBOWARS',      desc: 'Cybernetic combat. Steel meets AI. 0 survivors.',     to: '/events'       },
  { icon: '⬡',  title: 'STORE',         desc: 'Exclusive Techfest 2026 merchandise & collectibles.',  to: '/store'        },
];

/* ── COUNTDOWN CARD ────────────────────────────────── */
function CountdownCard({ value, label }) {
  return (
    <div
      className="glass-panel stat-card"
      style={{
        position: 'relative',
        padding: '20px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        minWidth: '90px',
      }}
    >
      <div className="bracket-tl" />
      <div className="bracket-br" />
      <span
        className="glitch-pulse"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700,
          color: 'var(--on-surface)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: 'rgba(189,200,209,0.5)',
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── CATEGORY CARD ─────────────────────────────────── */
function CategoryCard({ icon, title, desc, to, index, navigate }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={() => navigate(to)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '28px 24px',
        textAlign: 'left',
        background: hovered ? 'rgba(56,189,248,0.04)' : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        border: hovered ? '1px solid rgba(56,189,248,0.35)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: hovered ? '0 0 25px rgba(56,189,248,0.1)' : 'none',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'none',
      }}
    >
      <div className="bracket-tl" style={{ borderColor: hovered ? 'var(--sky)' : 'rgba(56,189,248,0.3)' }} />
      <div className="bracket-br" style={{ borderColor: hovered ? 'var(--sky)' : 'rgba(56,189,248,0.3)' }} />

      {/* Top tag */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '14px',
        fontFamily: 'var(--font-mono)',
        fontSize: '8px',
        color: hovered ? 'rgba(56,189,248,0.6)' : 'rgba(56,189,248,0.25)',
        letterSpacing: '0.15em',
        transition: 'color 0.3s',
      }}>
        TX-2026
      </div>

      <div style={{ fontSize: '24px', marginBottom: '14px' }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.18em',
        color: hovered ? '#fff' : 'var(--on-surface)',
        marginBottom: '8px',
        transition: 'color 0.3s',
      }}>
        {title}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        color: 'rgba(189,200,209,0.5)',
        lineHeight: 1.6,
      }}>
        {desc}
      </div>
      <div style={{
        marginTop: '16px',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: hovered ? 'var(--sky)' : 'rgba(56,189,248,0.3)',
        letterSpacing: '0.1em',
        transition: 'color 0.3s',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        ENTER MODULE
        <span style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s' }}>→</span>
      </div>
    </motion.button>
  );
}

/* ── HOME PAGE ─────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate();
  const countdown = useCountdown();

  return (
    <div>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section style={{
        minHeight: 'calc(100vh - var(--footer-h))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px 60px',
        position: 'relative',
      }}>
        {/* Left accent line */}
        <div style={{
          position: 'absolute',
          left: '40px',
          top: '15%',
          bottom: '15%',
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, var(--sky), var(--plasma), transparent)',
          opacity: 0.4,
        }} />

        <div style={{ maxWidth: '900px' }}>

          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '28px',
            }}
          >
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--plasma)',
              boxShadow: '0 0 8px rgba(255,45,85,0.8)',
              animation: 'pulseDot 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              color: 'rgba(189,200,209,0.6)',
              textTransform: 'uppercase',
            }}>
              IIT BOMBAY // ASIA'S LARGEST S&T FESTIVAL
            </span>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(to right, rgba(189,200,209,0.2), transparent)',
              maxWidth: '120px',
            }} />
          </motion.div>

          {/* MAIN HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(60px, 9vw, 120px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                margin: 0,
                color: '#fff',
                textShadow: '0 0 40px rgba(255,255,255,0.1)',
              }}
            >
              TECHFEST{' '}
              <span
                className="glow-sky"
                style={{ color: 'var(--sky)' }}
              >
                2026
              </span>
            </h1>
          </motion.div>

          {/* Plasma subtitle with typing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ margin: '20px 0 40px', overflow: 'hidden' }}
          >
            <div
              className="typing-text glow-plasma"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(12px, 2vw, 18px)',
                fontWeight: 700,
                letterSpacing: '0.3em',
                color: 'var(--plasma)',
                textTransform: 'uppercase',
              }}
            >
              THE CYBERNETIC EVOLUTION
            </div>
          </motion.div>

          {/* COUNTDOWN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: 'rgba(189,200,209,0.4)',
              marginBottom: '16px',
            }}>
              ── COUNTDOWN TO EVOLUTION: DEC 22, 2026 ──
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <CountdownCard value={countdown.days}    label="DAYS" />
              <CountdownCard value={countdown.hours}   label="HOURS" />
              <CountdownCard value={countdown.minutes} label="MINUTES" />
              <CountdownCard value={countdown.seconds} label="SECONDS" />
            </div>
          </motion.div>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap' }}
          >
            <button
              className="btn-primary"
              onClick={() => navigate('/events')}
            >
              <span className="btn-tl" />
              <span className="btn-br" />
              REGISTER NOW
            </button>
            <button
              className="btn-ghost"
              onClick={() => navigate('/events')}
            >
              EXPLORE EVENTS &nbsp;→
            </button>
          </motion.div>

        </div>

        {/* Decorative crosshair element */}
        <div style={{
          position: 'absolute',
          right: '120px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '200px',
          height: '200px',
          opacity: 0.06,
          pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="60" stroke="#38BDF8" strokeWidth="1" />
            <circle cx="100" cy="100" r="10" stroke="#38BDF8" strokeWidth="2" />
            <line x1="0" y1="100" x2="80" y2="100" stroke="#38BDF8" strokeWidth="1" />
            <line x1="120" y1="100" x2="200" y2="100" stroke="#38BDF8" strokeWidth="1" />
            <line x1="100" y1="0" x2="100" y2="80" stroke="#38BDF8" strokeWidth="1" />
            <line x1="100" y1="120" x2="100" y2="200" stroke="#38BDF8" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS ROW
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '0 80px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel stat-card"
              style={{
                position: 'relative',
                padding: '28px 24px',
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              <div className="bracket-tl" />
              <div className="bracket-tr" />
              <div className="bracket-bl" />
              <div className="bracket-br" />

              {/* Tag */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '8px',
                color: 'rgba(56,189,248,0.35)',
                letterSpacing: '0.15em',
              }}>
                {s.tag}
              </div>

              {/* Value */}
              <div
                className="glow-sky"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 800,
                  color: 'var(--sky)',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                {s.value}
              </div>

              {/* Label */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'rgba(189,200,209,0.5)',
              }}>
                {s.label}
              </div>

              {/* Bottom divider */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'rgba(255,255,255,0.04)',
              }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CATEGORY QUICK ACCESS
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '0 80px 100px' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '48px' }}
        >
          <div className="section-overline" style={{ marginBottom: '16px' }}>
            NAVIGATE THE ECOSYSTEM
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            All Access Modules
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'rgba(189,200,209,0.5)',
            marginTop: '12px',
            maxWidth: '480px',
            lineHeight: 1.7,
          }}>
            From cutting-edge robotics battles to world-class workshops — 
            every module designed to push the boundaries of human potential.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              {...cat}
              index={i}
              navigate={navigate}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
