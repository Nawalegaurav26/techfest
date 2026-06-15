/* Techfest 2026 - Telemetry Log 10 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const CLASSES = [
  {
    id: 'c1',
    name: 'TITAN CLASS (120KG)',
    weight: '120 kg (Max)',
    prize: '₹6,00,000',
    desc: 'The ultimate battleground. Giant metal beasts with high-speed pneumatic flippers, vertical spinners, and heavy armor battling for ultimate glory.',
    hazards: 'Pneumatic Spikes, Spinning Floor Blades, Pit of Despair',
    teams: '16 Elite Teams Selected'
  },
  {
    id: 'c2',
    name: 'HEAVYWEIGHT (60KG)',
    weight: '60 kg (Max)',
    prize: '₹3,50,000',
    desc: 'Perfect balance of speed, defense, and destruction. Features aggressive drum spinners and horizontal blades rotating at 8,000 RPM.',
    hazards: 'Flame-Thrower Grid, Corner Hammer Piston',
    teams: '24 Teams Active'
  },
  {
    id: 'c3',
    name: 'FEATHERWEIGHT (15KG)',
    weight: '15 kg (Max)',
    prize: '₹1,50,000',
    desc: 'High-octane, extremely fast-paced matchups. Compact bots utilizing overhead axes, flippers, and vertical discs in relentless combat.',
    hazards: 'Spinning Side Blades, Floor Lift Rails',
    teams: '32 Teams Qualified'
  }
];

const BOTS = [
  {
    id: 'b1',
    name: 'MEGATRON V4',
    team: 'TEAM BLITZ (INDIA)',
    weightClass: 'TITAN CLASS (120KG)',
    weapon: '180mm Pneumatic Vertical Disc Spinner',
    record: '18 WIN // 2 LOSS',
    desc: 'Featuring a solid Grade 5 Titanium body shell, Megatron utilizes a 35kg vertical steel disc spinning at 9,500 RPM, delivering 45 Kilojoules of energy on impact.',
    image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 'b2',
    name: 'CYBER-STRIKER',
    team: 'MUNICH METALS (GERMANY)',
    weightClass: 'HEAVYWEIGHT (60KG)',
    weapon: 'High-Pressure Hydraulic Piercing Spike',
    record: '14 WIN // 3 LOSS',
    desc: 'Engineered for surgical structural penetrations. Features a dual-stage hydraulic piston generating 12 Tons of force at its carbide-tipped peak.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 'b3',
    name: 'DOOM-SPIN',
    team: 'TEAM VORTEX (BRAZIL)',
    weightClass: 'TITAN CLASS (120KG)',
    weapon: 'Full-Body Toroidal Ring Spinner',
    record: '22 WIN // 4 LOSS',
    desc: 'The outer shell of the robot acts as a rotating horizontal impact ring. Extremely difficult to damage; transfers total inertia to opponents.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 'b4',
    name: 'FLIP-ZONE V2',
    team: 'UK BIONICS (UNITED KINGDOM)',
    weightClass: 'HEAVYWEIGHT (60KG)',
    weapon: 'CO2-Charged High-Velocity Pneumatic Flipper',
    record: '11 WIN // 4 LOSS',
    desc: 'Designed to launch opponents 4 meters high. Features custom carbon-fiber armor panels and a sub-200ms weapon reload mechanism.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 'b5',
    name: 'IRON NOVA',
    team: 'IIT BOMBAY ROBOTICS (INDIA)',
    weightClass: 'TITAN CLASS (120KG)',
    weapon: 'Dual Counter-Rotating Steel Disc Hammers',
    record: '16 WIN // 3 LOSS',
    desc: 'Home-built champion from IIT Bombay. Custom brushless motor drives, hardox steel frame, and twin 40kg counter-rotating hammer discs at 7,200 RPM.',
    image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 'b6',
    name: 'CRYO-BLADE',
    team: 'ARCTIC STEEL (CANADA)',
    weightClass: 'FEATHERWEIGHT (15KG)',
    weapon: 'Liquid-Nitrogen-Cooled Undercutter Disc',
    record: '19 WIN // 1 LOSS',
    desc: 'The most wins in featherweight history. Ultra-low ground clearance chassis combined with a cryo-hardened titanium undercutter disc.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 'b7',
    name: 'PULSE-X',
    team: 'TOKYO MECHS (JAPAN)',
    weightClass: 'HEAVYWEIGHT (60KG)',
    weapon: 'Electromagnetic Pulse (EMP) Generator Array',
    record: '8 WIN // 6 LOSS',
    desc: 'Unconventional electrical warfare robot. Discharges a targeted 50kV EMP pulse to disable opponent electronics without physical contact.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

export default function Robowars() {
  const [activeClass, setActiveClass] = useState('c1');
  const [selectedBot, setSelectedBot] = useState(null);
  const [ticketBooked, setTicketBooked] = useState(false);

  const selectedClassInfo = CLASSES.find(c => c.id === activeClass);
  const classBots = BOTS.filter(b => b.weightClass === selectedClassInfo.name);

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
            MODULE 06 // CYBER COMBAT
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            CYBERNETIC <span className="glow-plasma" style={{ color: 'var(--plasma)' }}>ROBOWARS</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'rgba(189, 200, 209, 0.5)',
            maxWidth: '540px',
            marginTop: '12px',
            lineHeight: 1.7
          }}>
            Metal grinding. Sparks flying. Steel panels ripped apart. Experience the most brutal robotics combat in Asia, featuring a 10x10m reinforced bulletproof enclosure.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            soundEffects.playSuccess?.();
            setTicketBooked(true);
          }}
          disabled={ticketBooked}
          style={{
            padding: '14px 28px',
            background: ticketBooked ? 'rgba(0, 245, 196, 0.1)' : 'var(--plasma)',
            borderColor: ticketBooked ? 'var(--green)' : 'transparent',
            color: ticketBooked ? 'var(--green)' : '#fff',
            boxShadow: ticketBooked ? 'none' : '0 0 20px rgba(255, 45, 85, 0.4)'
          }}
        >
          <span className="btn-tl" />
          <span className="btn-br" />
          {ticketBooked ? '✓ PASS SECURED (MAIN HUB)' : 'SECURE ARENA PASS'}
        </button>
      </motion.div>

      {/* Class Switcher Panels */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        margin: '40px 0 24px'
      }}>
        {CLASSES.map(cls => {
          const isActive = cls.id === activeClass;
          return (
            <button
              key={cls.id}
              onClick={() => {
                soundEffects.playClick?.();
                setActiveClass(cls.id);
              }}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                textAlign: 'left',
                border: isActive ? '1px solid var(--plasma)' : '1px solid rgba(255,255,255,0.06)',
                background: isActive ? 'rgba(255, 45, 85, 0.05)' : 'rgba(255,255,255,0.02)',
                boxShadow: isActive ? '0 0 15px rgba(255,45,85,0.15)' : 'none',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,45,85,0.4)';
                  soundEffects.playHover?.();
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }
              }}
            >
              <div className="bracket-tl" style={{ borderColor: isActive ? 'var(--plasma)' : 'rgba(56,189,248,0.2)' }} />
              <div className="bracket-br" style={{ borderColor: isActive ? 'var(--plasma)' : 'rgba(56,189,248,0.2)' }} />

              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '8px',
                color: isActive ? 'var(--plasma-dim)' : 'rgba(189,200,209,0.3)',
                letterSpacing: '0.15em',
                fontWeight: 700
              }}>
                WEIGHT CLASS // {cls.weight}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 700,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                marginTop: '4px',
                transition: 'color 0.3s'
              }}>
                {cls.name}
              </h3>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--sky)',
                fontWeight: 700,
                marginTop: '2px'
              }}>
                PRIZE // {cls.prize}
              </p>
            </button>
          );
        })}
      </div>

      {/* Class Specifications Dashboard */}
      <motion.div
        key={activeClass}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel"
        style={{
          padding: '24px 32px',
          border: '1px dashed rgba(56,189,248,0.2)',
          background: 'rgba(5,5,8,0.4)',
          marginBottom: '40px',
          position: 'relative'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '24px',
          alignItems: 'center'
        }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.1em' }}>
              ARENA PROTOCOL & CATEGORY DETAILS //
            </h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(189,200,209,0.7)', lineHeight: 1.6, marginTop: '8px' }}>
              {selectedClassInfo.desc}
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.1em' }}>
              ARENA HAZARDS //
            </h4>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--plasma-dim)', fontWeight: 700, marginTop: '8px' }}>
              {selectedClassInfo.hazards}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.1em' }}>
              STATUS //
            </h4>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--sky)', fontWeight: 700, marginTop: '8px' }}>
              {selectedClassInfo.teams}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Arena Bots list */}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '22px',
        fontWeight: 800,
        color: '#fff',
        marginBottom: '20px',
        letterSpacing: '-0.01em'
      }}>
        Featured Combatants
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
        gap: '20px'
      }}>
        {classBots.map((bot, i) => {
          const isSelected = selectedBot === bot.id;
          return (
            <motion.div
              key={bot.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-panel"
              style={{
                padding: 'clamp(16px, 3vw, 24px)',
                border: isSelected ? '1px solid var(--plasma)' : '1px solid rgba(56,189,248,0.15)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '20px',
                position: 'relative'
              }}
            >
              <div className="bracket-tl" style={{ borderColor: isSelected ? 'var(--plasma)' : 'var(--sky)' }} />
              <div className="bracket-br" style={{ borderColor: isSelected ? 'var(--plasma)' : 'var(--sky)' }} />

              <img
                src={bot.image}
                alt={bot.name}
                style={{
                  width: '90px',
                  height: '90px',
                  objectFit: 'cover',
                  border: `1px solid ${isSelected ? 'var(--plasma)' : 'rgba(56,189,248,0.2)'}`,
                  filter: isSelected ? 'grayscale(0)' : 'grayscale(100%)',
                  transition: 'all 0.3s ease'
                }}
              />

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.4)', letterSpacing: '0.1em' }}>
                        {bot.team}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                        {bot.name}
                      </h3>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: 'var(--plasma)',
                      fontWeight: 700,
                      border: '1px solid rgba(255,45,85,0.3)',
                      background: 'rgba(255,45,85,0.05)',
                      padding: '2px 8px'
                    }}>
                      {bot.record}
                    </span>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    color: 'var(--sky)',
                    marginTop: '6px',
                    fontWeight: 600
                  }}>
                    WEAPON // {bot.weapon}
                  </p>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color: 'rgba(189,200,209,0.5)',
                          lineHeight: 1.5,
                          marginTop: '8px',
                          overflow: 'hidden'
                        }}
                      >
                        {bot.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button
                    className="btn-ghost"
                    onClick={() => {
                      soundEffects.playClick?.();
                      setSelectedBot(isSelected ? null : bot.id);
                    }}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      fontSize: '8.5px',
                      borderColor: isSelected ? 'var(--plasma)' : 'rgba(56,189,248,0.3)',
                      color: isSelected ? 'var(--plasma-dim)' : 'var(--sky)'
                    }}
                  >
                    {isSelected ? 'HIDE SPECS' : 'SHOW SPECS'}
                  </button>
                  <a
                    href="https://youtube.com/@techfestiitbombay_youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEffects.playClick?.()}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255,45,85,0.05)',
                      border: '1px solid rgba(255,45,85,0.3)',
                      color: 'var(--plasma-dim)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8.5px',
                      fontWeight: 700,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,45,85,0.15)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(255,45,85,0.25)';
                      soundEffects.playHover?.();
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,45,85,0.05)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    WATCH PREVIOUS FIGHTS &nbsp;►
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bot detail slide-out panel */}
      <AnimatePresence>
        {selectedBot && (() => {
          const bot = BOTS.find(b => b.id === selectedBot);
          if (!bot) return null;
          return (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBot(null)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(5,5,8,0.75)',
                  backdropFilter: 'blur(6px)',
                  zIndex: 290,
                }}
              />

              {/* Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  position: 'fixed',
                  top: 0, right: 0, bottom: 0,
                  width: 'min(400px, 90vw)',
                  background: 'rgba(10, 10, 14, 0.99)',
                  borderLeft: '1px solid var(--plasma)',
                  boxShadow: '-10px 0 40px rgba(255, 45, 85, 0.2)',
                  padding: '32px 24px',
                  zIndex: 295,
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'auto',
                }}
              >
                {/* L-bracket decoration */}
                <div className="bracket-tl" style={{ borderColor: 'var(--plasma)', width: '20px', height: '20px' }} />
                <div className="bracket-bl" style={{ borderColor: 'var(--plasma)', width: '20px', height: '20px' }} />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedBot(null)}
                  style={{
                    alignSelf: 'flex-end',
                    background: 'transparent',
                    border: '1px solid rgba(255,45,85,0.3)',
                    color: 'var(--plasma)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    letterSpacing: '0.15em',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,45,85,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  CLOSE PANEL [X]
                </button>

                {/* Image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  border: '1px solid rgba(255,45,85,0.2)',
                  background: `radial-gradient(circle at center, rgba(255,45,85,0.15) 0%, rgba(5,5,8,0.8) 100%)`,
                  margin: '24px 0',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src={bot.image} alt={bot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Info readout */}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.4)', letterSpacing: '0.25em' }}>
                  {bot.team}
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 900,
                  color: '#fff',
                  marginTop: '4px',
                  letterSpacing: '-0.01em',
                  textShadow: 'var(--glow-plasma)'
                }}>
                  {bot.name}
                </h2>
                
                <div style={{
                  margin: '20px 0',
                  padding: '16px 0',
                  borderTop: '1px dashed rgba(255,255,255,0.08)',
                  borderBottom: '1px dashed rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div className="readout-row">
                    <span className="readout-label">WEIGHT CLASS</span>
                    <span className="readout-val" style={{ color: 'var(--plasma)' }}>{bot.weightClass}</span>
                  </div>
                  <div className="readout-row">
                    <span className="readout-label">WEAPONRY</span>
                    <span className="readout-val">{bot.weapon}</span>
                  </div>
                  <div className="readout-row">
                    <span className="readout-label">RECORD</span>
                    <span className="readout-val" style={{ color: 'var(--green)' }}>{bot.record}</span>
                  </div>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(189,200,209,0.7)',
                  lineHeight: 1.7,
                  marginBottom: '24px'
                }}>
                  {bot.desc}
                </p>

                {/* Subsystems stats */}
                <div style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--plasma)', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '12px' }}>
                    SUBSYSTEMS INTEGRITY //
                  </div>
                  {[
                    { name: 'ARMOR THICKNESS (Grade 5 Ti)', val: '92%' },
                    { name: 'PNEUMATIC ACTUATION SPEED', val: '0.18s' },
                    { name: 'MOTOR TORQUE DENSITY', val: '98%' },
                    { name: 'TELEMETRY CONNECTION', val: '100%' }
                  ].map(s => (
                    <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '9px', marginBottom: '8px' }}>
                      <span style={{ color: 'rgba(189,200,209,0.5)' }}>{s.name}</span>
                      <span style={{ color: '#fff', fontWeight: 700 }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

