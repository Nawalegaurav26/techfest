import { useState } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const CONTACT_CHANNELS = [
  { icon: '📡', label: 'GENERAL ENQUIRIES', value: 'techfest@iitb.ac.in', type: 'email' },
  { icon: '⚔', label: 'COMPETITIONS', value: 'competitions@techfest.org', type: 'email' },
  { icon: '◈', label: 'SPONSORSHIP', value: 'sponsors@techfest.org', type: 'email' },
  { icon: '⬡', label: 'ACCOMMODATION', value: 'accommodation@techfest.org', type: 'email' },
  { icon: '⟐', label: 'EMERGENCY HELPLINE', value: '+91 98765 43210', type: 'tel' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    soundEffects.playClick?.();
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      soundEffects.playSuccess?.();
    }, 2000);
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 09 // COMM RELAY</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          ESTABLISH <span className="glow-sky" style={{ color: 'var(--sky)' }}>CONTACT MATRIX</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'rgba(189, 200, 209, 0.5)',
          maxWidth: '480px',
          marginTop: '12px',
          lineHeight: 1.7
        }}>
          Open a communications link. Establish a secure data hook. Our response terminal will process and respond within 24 hours.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '32px', marginTop: '40px' }} className="hero-grid">

        {/* Left: channels */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="section-overline" style={{ marginBottom: '20px' }}>DIRECT CHANNELS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CONTACT_CHANNELS.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.type === 'email' ? `mailto:${ch.value}` : `tel:${ch.value}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.5 }}
                whileHover={{ x: 4 }}
                className="glass-panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  minHeight: '56px',
                  border: '1px solid rgba(56,189,248,0.15)',
                  backdropFilter: 'var(--glass-blur)',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
                onClick={() => soundEffects.playClick?.()}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--sky)';
                  e.currentTarget.style.background = 'rgba(56,189,248,0.06)';
                  soundEffects.playHover?.();
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.15)';
                  e.currentTarget.style.background = 'var(--glass-bg)';
                }}
              >
                <div className="bracket-tl" style={{ width: '8px', height: '8px', borderColor: 'var(--sky)' }} />
                <div className="bracket-br" style={{ width: '8px', height: '8px', borderColor: 'var(--sky)' }} />

                <span style={{ fontSize: '18px', lineHeight: 1 }}>{ch.icon}</span>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    letterSpacing: '0.25em',
                    color: 'rgba(56,189,248,0.6)',
                    marginBottom: '3px',
                    fontWeight: 700
                  }}>
                    {ch.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: '#fff',
                    letterSpacing: '0.05em',
                    fontWeight: 600
                  }}>
                    {ch.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Coordinates */}
          <div
            className="glass-panel"
            style={{
              marginTop: '28px',
              padding: '20px',
              border: '1px solid rgba(56,189,248,0.15)',
              background: 'rgba(255,255,255,0.02)',
              position: 'relative'
            }}
          >
            <div className="bracket-tl" style={{ width: '8px', height: '8px' }} />
            <div className="bracket-br" style={{ width: '8px', height: '8px' }} />

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              letterSpacing: '0.3em',
              color: 'var(--sky)',
              marginBottom: '10px',
              fontWeight: 700
            }}>
              GRID COORDINATES
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(189,200,209,0.6)',
              lineHeight: 1.8
            }}>
              IIT Bombay, Powai<br />
              Mumbai — 400076<br />
              Maharashtra, India<br />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--plasma)',
                fontWeight: 700,
                marginTop: '4px',
                display: 'block'
              }}>
                19.1334° N, 72.9133° E
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="section-overline" style={{ marginBottom: '20px' }}>TRANSMIT METRICS</div>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel"
              style={{
                padding: '48px',
                textAlign: 'center',
                background: 'rgba(34,197,94,0.05)',
                border: '1px solid rgba(34,197,94,0.4)',
                backdropFilter: 'var(--glass-blur)',
                position: 'relative'
              }}
            >
              <div className="bracket-tl" style={{ borderColor: 'var(--green)' }} />
              <div className="bracket-br" style={{ borderColor: 'var(--green)' }} />

              <div style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--green)' }}>✓</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '8px'
              }}>
                TELEMETRY ENVELOPE SENT
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'rgba(189,200,209,0.45)',
                letterSpacing: '0.15em',
                fontWeight: 600
              }}>
                CONNECTION SECURE. UPLOAD LOGGED.
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    letterSpacing: '0.25em',
                    color: 'rgba(56,189,248,0.7)',
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: 700
                  }}>
                    CALLSIGN [NAME]
                  </label>
                  <input
                    className="cyber-input"
                    type="text" required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(56,189,248,0.2)',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--sky)';
                      e.target.style.background = 'rgba(56,189,248,0.04)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(56,189,248,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    letterSpacing: '0.25em',
                    color: 'rgba(56,189,248,0.7)',
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: 700
                  }}>
                    COMM ADDRESS [EMAIL]
                  </label>
                  <input
                    className="cyber-input"
                    type="email" required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(56,189,248,0.2)',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--sky)';
                      e.target.style.background = 'rgba(56,189,248,0.04)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(56,189,248,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  letterSpacing: '0.25em',
                  color: 'rgba(56,189,248,0.7)',
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: 700
                }}>
                  SUBJECT HEADER
                </label>
                <input
                  className="cyber-input"
                  type="text" required
                  placeholder="Query classification"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(56,189,248,0.2)',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--sky)';
                    e.target.style.background = 'rgba(56,189,248,0.04)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(56,189,248,0.2)';
                    e.target.style.background = 'rgba(255,255,255,0.03)';
                  }}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  letterSpacing: '0.25em',
                  color: 'rgba(56,189,248,0.7)',
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: 700
                }}>
                  MESSAGE LOG [PAYLOAD]
                </label>
                <textarea
                  className="cyber-input"
                  required rows={6}
                  placeholder="Type your message log here..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(56,189,248,0.2)',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'none',
                    lineHeight: 1.6,
                    transition: 'all 0.3s'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--sky)';
                    e.target.style.background = 'rgba(56,189,248,0.04)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(56,189,248,0.2)';
                    e.target.style.background = 'rgba(255,255,255,0.03)';
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ width: '100%', padding: '14px', fontSize: '10px', letterSpacing: '0.3em' }}
                onMouseEnter={() => soundEffects.playHover?.()}
              >
                <span className="btn-tl" />
                <span className="btn-br" />
                {loading ? 'TRANSMITTING DATA...' : 'TRANSMIT COMM ENVELOPE'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
