import { useState } from 'react';
import { motion } from 'framer-motion';

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
    setTimeout(() => { setLoading(false); setSent(true); }, 2000);
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="section-tag" style={{ marginBottom: '12px' }}>MODULE 09 // COMM RELAY</div>
        <h1 className="section-title">ESTABLISH</h1>
        <h1 className="section-title" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(0,242,255,0.4)' }}>CONTACT</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(224,247,255,0.45)', maxWidth: '480px', marginTop: '12px', lineHeight: 1.7 }}>
          Open a comm channel. We respond within 24 hours.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '32px', marginTop: '40px' }}>

        {/* Left: channels */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="section-tag" style={{ marginBottom: '20px' }}>DIRECT CHANNELS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CONTACT_CHANNELS.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.type === 'email' ? `mailto:${ch.value}` : `tel:${ch.value}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.5 }}
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '16px 18px',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(0,242,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s',
                  cursor: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,242,255,0.4)'; e.currentTarget.style.background = 'rgba(0,242,255,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,242,255,0.1)'; e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; }}
              >
                <span style={{ fontSize: '18px', lineHeight: 1 }}>{ch.icon}</span>
                <div>
                  <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(0,242,255,0.6)', marginBottom: '3px' }}>
                    {ch.label}
                  </div>
                  <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '10px', color: 'rgba(224,247,255,0.75)', letterSpacing: '0.05em' }}>
                    {ch.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Location */}
          <div style={{ marginTop: '28px', padding: '20px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,242,255,0.08)' }}>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '8px', letterSpacing: '0.3em', color: '#00f2ff', marginBottom: '10px' }}>
              COORDINATES
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(224,247,255,0.6)', lineHeight: 1.8 }}>
              IIT Bombay, Powai<br />
              Mumbai — 400076<br />
              Maharashtra, India<br />
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '9px', color: 'rgba(0,242,255,0.5)' }}>
                19.1334° N, 72.9133° E
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="section-tag" style={{ marginBottom: '20px' }}>SEND MESSAGE</div>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: '48px', textAlign: 'center',
                background: 'rgba(0,242,255,0.05)',
                border: '1px solid rgba(0,242,255,0.3)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: 700, color: '#00f2ff', marginBottom: '8px' }}>
                MESSAGE TRANSMITTED
              </div>
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '10px', color: 'rgba(224,247,255,0.45)', letterSpacing: '0.15em' }}>
                RESPONSE EXPECTED WITHIN 24 HOURS
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(0,242,255,0.6)', display: 'block', marginBottom: '6px' }}>
                    CALLSIGN [NAME]
                  </label>
                  <input
                    className="cyber-input"
                    type="text" required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(0,242,255,0.6)', display: 'block', marginBottom: '6px' }}>
                    COMM ADDRESS [EMAIL]
                  </label>
                  <input
                    className="cyber-input"
                    type="email" required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(0,242,255,0.6)', display: 'block', marginBottom: '6px' }}>
                  SUBJECT HEADER
                </label>
                <input
                  className="cyber-input"
                  type="text" required
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(0,242,255,0.6)', display: 'block', marginBottom: '6px' }}>
                  MESSAGE PAYLOAD
                </label>
                <textarea
                  className="cyber-input"
                  required rows={6}
                  placeholder="Type your message..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ resize: 'none', lineHeight: 1.6 }}
                />
              </div>

              <button
                type="submit"
                className="cyber-btn primary-fill"
                disabled={loading}
                style={{ width: '100%', padding: '14px', fontSize: '10px', letterSpacing: '0.3em' }}
              >
                {loading ? 'TRANSMITTING...' : '⟐ TRANSMIT MESSAGE ⟐'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
