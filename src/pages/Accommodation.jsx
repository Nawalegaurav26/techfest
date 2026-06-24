/* Techfest 2026 - Telemetry Log 1 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const ACCOMMODATION_TYPES = [
  {
    id: 'a0', type: 'SHARED CAPSULE',
    capacity: '8 per room', price: '₹400/night',
    amenities: ['Fans', 'WiFi', 'Locker', 'Common Bath'],
    available: 240, status: 'AVAILABLE',
    color: 'var(--green)',
    glow: 'rgba(0,245,196,0.15)'
  },
  {
    id: 'a1', type: 'DORMITORY ALPHA',
    capacity: '4 per room', price: '₹800/night',
    amenities: ['AC', 'WiFi', 'Study Desk', 'Locker'],
    available: 120, status: 'AVAILABLE',
    color: 'var(--sky)',
    glow: 'rgba(56,189,248,0.2)'
  },
  {
    id: 'a2', type: 'PRIVATE QUARTERS',
    capacity: '1-2 per room', price: '₹2,200/night',
    amenities: ['AC', 'WiFi', 'Private Bath', 'Mini Fridge', 'Balcony'],
    available: 18, status: 'LIMITED',
    color: '#ff8c00',
    glow: 'rgba(255,140,0,0.2)'
  },
  {
    id: 'a3', type: 'TECH SUITE',
    capacity: '1 per room', price: '₹4,500/night',
    amenities: ['AC', 'WiFi 1Gbps', 'Smart TV', 'Private Bath', 'Workstation', 'Priority Access'],
    available: 4, status: 'CRITICAL',
    color: 'var(--plasma)',
    glow: 'rgba(255,45,85,0.25)'
  },
];

const STATUS_COLOR = { AVAILABLE: 'var(--green)', LIMITED: '#ff8c00', CRITICAL: 'var(--plasma)' };

const FAQS = [
  { q: 'When can I check in and check out?', a: 'Check-in from December 21, 2:00 PM. Check-out by December 25, 11:00 AM.' },
  { q: 'Is food included in accommodation?', a: 'Breakfast is included for all room types. Lunch and dinner are available at the Techfest Food Court.' },
  { q: 'What documents do I need?', a: 'Valid college/institution ID and printed registration confirmation.' },
  { q: 'Can I modify my booking?', a: 'Modifications accepted up to 5 days before check-in. Contact accommodations@techfest.org.' },
  { q: 'Is accommodation available for international participants?', a: 'Yes! International participants are welcome. Please book via the online portal and carry your passport.' },
  { q: 'Are female-only sections available?', a: 'Yes. Separate secure wings for female participants are designated in Dormitory Alpha and Private Quarters.' },
  { q: 'Is there 24/7 security?', a: 'Yes. All accommodation blocks have CCTV surveillance, biometric access, and 24/7 security personnel.' },
  { q: 'Can I arrive a day early?', a: 'Early check-in from December 20 is available for an additional charge of ₹300/night. Contact us to arrange.' },
];

export default function Accommodation() {
  const [openFaq, setOpenFaq] = useState(null);
  const [booked, setBooked] = useState({});

  const handleBook = (id) => {
    if (booked[id]) return;
    soundEffects.playSuccess?.();
    const ticketNum = `TF26-${id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setBooked(prev => ({ ...prev, [id]: ticketNum }));
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 09 // HABITAT MATRIX</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          ACCOMMODATION <span className="glow-sky" style={{ color: 'var(--sky)' }}>PORTAL</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: '#cbd5e1',
          maxWidth: '500px',
          marginTop: '12px',
          lineHeight: 1.7
        }}>
          Stay on campus. Secure IIT Bombay dormitories and premium tech suites situated directly within the festival grounds.
        </p>
      </motion.div>

      {/* Info strip */}
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
          { icon: '◈', text: 'DEC 21–25, 2026' },
          { icon: '⬡', text: 'IIT BOMBAY CAMPUS' },
          { icon: '⊕', text: 'POWAI, MUMBAI' },
          { icon: '⟐', text: 'SECURE 24/7 PATROL' },
        ].map(item => (
          <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--sky)' }}>{item.icon}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#cbd5e1',
              fontWeight: 600
            }}>{item.text}</span>
          </div>
        ))}
      </motion.div>

      {/* Room type cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '48px' }}>
        {ACCOMMODATION_TYPES.map((acc, i) => {
          const isBooked = booked[acc.id];
          return (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 + 0.4 }}
              className="glass-panel"
              style={{
                padding: '28px',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                backdropFilter: 'var(--glass-blur)',
                position: 'relative',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '280px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = acc.color;
                e.currentTarget.style.boxShadow = `0 0 20px ${acc.glow}`;
                soundEffects.playHover?.();
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="bracket-tl" style={{ borderColor: acc.color }} />
              <div className="bracket-br" style={{ borderColor: acc.color }} />

              {/* Status */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '8px',
                    letterSpacing: '0.2em', color: STATUS_COLOR[acc.status],
                    border: `1px solid ${STATUS_COLOR[acc.status]}40`,
                    padding: '3px 10px',
                    background: STATUS_COLOR[acc.status] + '15',
                    fontWeight: 700
                  }}>
                    ● {acc.status}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#cbd5e1',
                    fontWeight: 600
                  }}>
                    {acc.available} UNITS LEFT
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '8px'
                }}>
                  {acc.type}
                </h3>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#94a3b8',
                  letterSpacing: '0.15em',
                  marginBottom: '16px',
                  fontWeight: 600
                }}>
                  {acc.capacity}
                </div>

                {/* Amenities */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {acc.amenities.map(a => (
                    <span key={a} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: acc.color,
                      letterSpacing: '0.1em',
                      padding: '3px 8px',
                      border: `1px solid ${acc.color}25`,
                      background: `${acc.color}10`,
                      fontWeight: 600
                    }}>{a}</span>
                  ))}
                </div>
              </div>

              {/* Price + CTA */}
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
                      color: acc.color,
                      textShadow: `0 0 10px ${acc.glow}`
                    }}>
                      {acc.price}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#cbd5e1',
                      marginTop: '2px',
                      fontWeight: 600
                    }}>
                      PER PERSON RATE
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playClick?.();
                      handleBook(acc.id);
                    }}
                    style={{
                      padding: '8px 20px',
                      background: isBooked ? 'rgba(0, 245, 196, 0.08)' : 'rgba(255,45,85,0.05)',
                      border: `1px solid ${isBooked ? 'rgba(0, 245, 196, 0.4)' : 'rgba(255,45,85,0.4)'}`,
                      color: isBooked ? 'var(--green)' : 'var(--plasma)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      transition: 'all 0.3s ease',
                      boxShadow: isBooked ? '0 0 15px rgba(0, 245, 196, 0.1)' : 'none'
                    }}
                    onMouseEnter={e => {
                      if (!isBooked) {
                        e.currentTarget.style.background = 'rgba(255,45,85,0.15)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(255,45,85,0.25)';
                        soundEffects.playHover?.();
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isBooked) {
                        e.currentTarget.style.background = 'rgba(255,45,85,0.05)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {isBooked ? '✓ ALLOCATED' : 'SECURE SUITE'}
                  </button>
                </div>

                <AnimatePresence>
                  {isBooked && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        borderTop: '1px dashed rgba(0, 245, 196, 0.3)',
                        paddingTop: '12px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '8.5px',
                        color: 'var(--green)',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: '4px', letterSpacing: '0.05em' }}>ALLOCATION PASS GENERATED //</div>
                      <div>PASS_ID: {isBooked}</div>
                      <div>GATEWAY: SECURE // PATROL ACTIVE</div>
                      <div style={{ letterSpacing: '2px', marginTop: '6px', fontSize: '10px', opacity: 0.75 }}>
                        ||||| | |||| || ||| | |||
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="section-overline" style={{ marginBottom: '20px' }}>FREQUENTLY ASKED HABITAT QUESTIONS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '680px' }}>
        {FAQS.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.8 }}
              className="glass-panel"
              style={{
                border: '1px solid rgba(56, 189, 248, 0.15)',
                background: 'rgba(5,5,8,0.5)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <button
                onClick={() => {
                  soundEffects.playClick?.();
                  setOpenFaq(isOpen ? null : i);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  color: isOpen ? 'var(--sky)' : '#ffffff',
                  fontWeight: 700,
                  transition: 'color 0.3s',
                }}
              >
                {faq.q}
                <span style={{
                  color: 'var(--sky)',
                  fontSize: '16px',
                  lineHeight: 1,
                  fontWeight: 300,
                  transition: 'transform 0.3s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0)'
                }}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      padding: '0 20px 16px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14.5px',
                      color: '#cbd5e1',
                      lineHeight: 1.7,
                      overflow: 'hidden'
                    }}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
