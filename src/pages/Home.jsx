import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

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

/* ── HIGHLIGHTS ─────────────────────────────────────── */
const HIGHLIGHTS = [
  {
    tag: 'KEYNOTE',
    color: 'var(--plasma)',
    title: 'SAM ALTMAN',
    sub: 'CEO, OpenAI',
    detail: 'Dec 22 · Convocation Hall',
    to: '/lectures',
  },
  {
    tag: 'FLAGSHIP EVENT',
    color: 'var(--sky)',
    title: 'ROBOWAR SIGMA',
    sub: '₹3,00,000 Prize Pool',
    detail: 'Dec 10 Deadline · 64 Slots',
    to: '/competitions',
  },
  {
    tag: 'EXHIBITION',
    color: '#22c55e',
    title: 'ISRO GAGANYAAN',
    sub: 'Live Orbital Module Demo',
    detail: 'Space Pavilion · Ongoing',
    to: '/exhibitions',
  },
];

/* ── CATEGORIES ────────────────────────────────────── */
const CATEGORIES = [
  { icon: '⚔',  title: 'COMPETITIONS',  desc: 'Evolution trials. Survival of the most advanced.',   to: '/competitions' },
  { icon: '⬣',  title: 'WORKSHOPS',     desc: 'Knowledge uploads. Direct neural data transfer.',     to: '/workshops'    },
  { icon: '◈',  title: 'LECTURES',      desc: 'Mind sync. Industry pioneers. Future thinkers.',      to: '/lectures'     },
  { icon: '◉',  title: 'EXHIBITIONS',   desc: 'Tech lab. 500+ projects from across the globe.',      to: '/exhibitions'  },
  { icon: '⊗',  title: 'ROBOWARS',      desc: 'Cybernetic combat. Steel meets AI. 0 survivors.',     to: '/robowars'     },
  { icon: '⬡',  title: 'STORE',         desc: 'Exclusive Techfest 2026 merchandise & collectibles.',  to: '/store'        },
];

/* ── COUNTDOWN CARD ────────────────────────────────── */
function CountdownCard({ value, label }) {
  return (
    <div
      className="glass-panel stat-card"
      style={{
        position: 'relative',
        padding: 'clamp(12px, 3vw, 20px) clamp(14px, 4vw, 28px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        minWidth: '64px',
        flex: '1 1 auto',
      }}
    >
      <div className="bracket-tl" />
      <div className="bracket-br" />
      <span
        className="glitch-pulse"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(22px, 5vw, 48px)',
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
        fontSize: 'clamp(7px, 1.5vw, 9px)',
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
      className="stat-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={() => {
        soundEffects.playClick?.();
        navigate(to);
      }}
      onMouseEnter={() => {
        setHovered(true);
        soundEffects.playHover?.();
      }}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
      style={{
        position: 'relative',
        padding: 'clamp(20px, 3vw, 28px) clamp(16px, 2.5vw, 24px)',
        textAlign: 'left',
        background: hovered ? 'rgba(56,189,248,0.06)' : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        border: hovered ? '1px solid rgba(56,189,248,0.35)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: hovered ? '0 0 25px rgba(56,189,248,0.1)' : 'none',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        width: '100%',
        display: 'block',
        color: '#fff',
      }}
    >
      <div className="bracket-tl" style={{ borderColor: hovered ? 'var(--sky)' : 'rgba(56,189,248,0.3)' }} />
      <div className="bracket-br" style={{ borderColor: hovered ? 'var(--sky)' : 'rgba(56,189,248,0.3)' }} />

      {/* Top tag */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '12px',
        fontFamily: 'var(--font-mono)',
        fontSize: '8px',
        color: hovered ? 'rgba(56,189,248,0.6)' : 'rgba(56,189,248,0.25)',
        letterSpacing: '0.15em',
        transition: 'color 0.3s',
      }}>
        TX-2026
      </div>

      <div style={{ fontSize: 'clamp(20px, 3vw, 24px)', marginBottom: '12px' }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(10px, 1.5vw, 11px)',
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
        fontSize: 'clamp(11px, 1.5vw, 12px)',
        color: 'rgba(189,200,209,0.5)',
        lineHeight: 1.6,
      }}>
        {desc}
      </div>
      <div style={{
        marginTop: '14px',
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
          HERO SECTION — mobile-first
      ═══════════════════════════════════════════ */}
      <section className="hero-section" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Left accent line — hide on narrow mobile */}
        <div style={{
          position: 'absolute',
          left: '8px',
          top: '15%',
          bottom: '15%',
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, var(--sky), var(--plasma), transparent)',
          opacity: 0.4,
        }} />

        <div className="hero-grid" style={{ width: '100%', zIndex: 5 }}>

          {/* ── LEFT COLUMN: Text Content ───────── */}
          {/* ── LEFT COLUMN: Text Content ───────── */}
          <motion.div 
            className="hero-text-col"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
            }}
            initial="hidden"
            animate="show"
          >
            {/* Overline label */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <span style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: 'var(--plasma)',
                boxShadow: '0 0 8px rgba(255,45,85,0.8)',
                animation: 'pulseDot 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(8px, 2vw, 10px)',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'rgba(189,200,209,0.6)',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
                IIT BOMBAY // ASIA'S LARGEST S&T FESTIVAL
              </span>
            </motion.div>

            {/* MAIN HEADING */}
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(42px, 10vw, 100px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                  margin: 0,
                  color: '#fff',
                  textShadow: '0 0 40px rgba(255,255,255,0.1)',
                }}
              >
                TECHFEST{' '}
                <span className="glow-sky" style={{ color: 'var(--sky)' }}>
                  2026
                </span>
              </h1>
            </motion.div>

            {/* Plasma subtitle */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }}
              style={{ margin: '16px 0 28px', overflow: 'hidden', maxWidth: '100%' }}
            >
              <div
                className="typing-text glow-plasma"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(10px, 2.5vw, 16px)',
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
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              style={{ width: '100%' }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '8px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: 'rgba(189,200,209,0.4)',
                marginBottom: '12px',
              }}>
                ── COUNTDOWN TO EVOLUTION: DEC 22, 2026 ──
              </div>
              <div className="countdown-row">
                <CountdownCard value={countdown.days}    label="DAYS" />
                <CountdownCard value={countdown.hours}   label="HOURS" />
                <CountdownCard value={countdown.minutes} label="MINS" />
                <CountdownCard value={countdown.seconds} label="SECS" />
              </div>
            </motion.div>

            {/* CTA BUTTONS */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              className="cta-row"
            >
              <button
                className="btn-primary"
                onClick={() => {
                  soundEffects.playClick?.();
                  navigate('/events');
                }}
                onMouseEnter={() => soundEffects.playHover?.()}
              >
                <span className="btn-tl" />
                <span className="btn-br" />
                REGISTER NOW
              </button>
              <button
                className="btn-ghost"
                onClick={() => {
                  soundEffects.playClick?.();
                  navigate('/events');
                }}
                onMouseEnter={() => soundEffects.playHover?.()}
              >
                EXPLORE EVENTS &nbsp;→
              </button>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: Giant Logo ─────────── */}
          <div className="hero-logo-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
          }}>
            {/* Glowing backdrop */}
            <div style={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />

            {/* Rotating HUD ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: 'clamp(200px, 40vw, 320px)',
                height: 'clamp(200px, 40vw, 320px)',
                opacity: 0.15,
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="60" stroke="#38BDF8" strokeWidth="1" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="#38BDF8" strokeWidth="0.5" />
                <line x1="100" y1="0" x2="100" y2="200" stroke="#38BDF8" strokeWidth="0.5" />
              </svg>
            </motion.div>

            {/* Techfest Official Central Logo (Glowing & Floating) */}
            <motion.img
              src="/central_logo_home-screen_big_logo_transparent.png"
              alt="Techfest 2026 Logo"
              animate={{
                y: [0, -12, 0],
                filter: [
                  'drop-shadow(0 0 35px rgba(0,242,255,0.25))',
                  'drop-shadow(0 0 55px rgba(0,242,255,0.45))',
                  'drop-shadow(0 0 35px rgba(0,242,255,0.25))',
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%',
                maxWidth: '450px',
                objectFit: 'contain',
                display: 'block',
                zIndex: 2,
                position: 'relative',
              }}
            />
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS ROW — 2-col mobile, 4-col desktop
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(16px, 4vw, 80px) clamp(40px, 6vw, 80px)' }}>
        <div className="stats-grid">
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
                padding: 'clamp(16px, 3vw, 28px) clamp(14px, 2.5vw, 24px)',
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
                top: '10px',
                right: '12px',
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
                  fontSize: 'clamp(22px, 4vw, 44px)',
                  fontWeight: 800,
                  color: 'var(--sky)',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {s.value}
              </div>

              {/* Label */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(8px, 1.5vw, 10px)',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'rgba(189,200,209,0.5)',
              }}>
                {s.label}
              </div>

              {/* Bottom divider */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
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
      <section style={{ padding: '0 clamp(16px, 4vw, 80px) clamp(60px, 8vw, 120px)' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(24px, 4vw, 48px)' }}
        >
          <div className="section-overline" style={{ marginBottom: '14px' }}>
            NAVIGATE THE ECOSYSTEM
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            All Access Modules
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 1.8vw, 15px)',
            color: 'rgba(189,200,209,0.5)',
            marginTop: '12px',
            maxWidth: '480px',
            lineHeight: 1.7,
          }}>
            From cutting-edge robotics battles to world-class workshops —
            every module designed to push the boundaries of human potential.
          </p>
        </motion.div>

        {/* Category grid — responsive */}
        <div className="category-grid">
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

      {/* ═══════════════════════════════════════════
          FEATURED HIGHLIGHTS STRIP
      ═══════════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(16px, 4vw, 80px) clamp(60px, 8vw, 120px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 'clamp(20px, 3vw, 36px)' }}
        >
          <div className="section-overline" style={{ marginBottom: '14px' }}>
            FEATURED THIS YEAR
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3.5vw, 40px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            Don&apos;t Miss These
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
          gap: 'clamp(12px, 2vw, 20px)',
        }}>
          {HIGHLIGHTS.map((h, i) => (
            <motion.button
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => { soundEffects.playClick?.(); navigate(h.to); }}
              onMouseEnter={() => soundEffects.playHover?.()}
              whileTap={{ scale: 0.97 }}
              style={{
                position: 'relative',
                padding: 'clamp(18px, 2.5vw, 24px)',
                textAlign: 'left',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(16px)',
                border: `1px solid rgba(255,255,255,0.08)`,
                color: '#fff',
                width: '100%',
                display: 'block',
                transition: 'all 0.3s ease',
              }}
            >
              <div className="bracket-tl" style={{ borderColor: h.color }} />
              <div className="bracket-br" style={{ borderColor: h.color }} />
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: h.color,
                marginBottom: '10px',
              }}>
                {h.tag}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(14px, 2vw, 18px)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.2,
                marginBottom: '4px',
              }}>
                {h.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(10px, 1.3vw, 11px)',
                color: 'rgba(189,200,209,0.6)',
                marginBottom: '10px',
              }}>
                {h.sub}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'rgba(189,200,209,0.35)',
                letterSpacing: '0.1em',
              }}>
                {h.detail}
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════ */}
      <section className="page-section" style={{ position: 'relative', padding: '60px clamp(20px, 5vw, 60px)', maxWidth: '1000px', margin: '0 auto', paddingBottom: '100px' }}>
        <div className="section-overline" style={{ marginBottom: '24px', textAlign: 'center' }}>TRANSMISSION LOGS // FAQ</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {[
            { q: 'Who can participate in Techfest?', a: 'Techfest is open to all students, professionals, and tech enthusiasts worldwide. Some specific competitions may require valid student IDs.' },
            { q: 'How do I access accommodation?', a: 'Navigate to the ACCOMMODATION module from the sidebar. You can book dormitories, capsules, or private quarters using your secure portal access.' },
            { q: 'Is there a registration fee?', a: 'Basic festival entry is free. However, specialized workshops, pro-shows, and premium hackathons may have individual entry fees.' },
            { q: 'Are international delegations allowed?', a: 'Yes. Techfest hosts participants from over 45 countries. International attendees can request special visa invitation letters via the CONTACT module.' },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                position: 'relative',
                padding: '24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(56,189,248,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="bracket-tl" style={{ borderColor: 'rgba(56,189,248,0.3)' }} />
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--sky)',
                marginBottom: '12px',
                lineHeight: 1.4,
              }}>
                Q: {faq.q}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'rgba(189,200,209,0.6)',
                lineHeight: 1.6,
              }}>
                A: {faq.a}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
