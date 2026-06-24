/* Techfest 2026 - Telemetry Log 18 */
import { motion } from 'framer-motion';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { soundEffects } from '../utils/soundEffects';

const EVENT_NAMES = {
  // Competitions.jsx
  c1: 'ROBOWAR SIGMA',
  c2: 'CODE BREACH',
  c3: 'NEURAL WARS',
  c4: 'AEROBOT PRIME',
  c5: 'DATAVAULT HEIST',
  c6: 'SPACE ODYSSEY',
  c7: 'QUANTUM CIRCUIT DESIGN',

  // Register.jsx
  ev1: 'ROBOWAR SIGMA',
  ev2: 'CODE BREACH',
  ev3: 'DRONE WARS',
  ev4: 'AI DESIGN JAM',
  ev5: 'CIRCUIT WIZARDS',
  ev6: 'BRIDGE BUILDER',
  ev7: 'STOCK MARKET SIM',
  ev8: 'QUANTUM LOCK',

  // Schedule.jsx
  e1: 'INAUGURAL CEREMONY',
  e2: 'KEYNOTE: AI & THE FUTURE',
  e3: 'ROBOWARS QF — TITAN CLASS',
  e4: 'HACKATHON — PHASE 1 STARTS',
  e5: 'CULTURAL NIGHT — OPENING',
  e6: 'WORKSHOP: PCB MASTERY',
  e7: 'LECTURE: DARK MATTER',
  e8: 'ROBOWARS SF — TITAN CLASS',
  e9: 'SCIENCE EXHIBITION OPEN',
  e10: 'WORKSHOP: ML FOR ROBOTICS',
  e11: 'HACKATHON FINAL PUSH',
  e12: 'HACKATHON — PRESENTATIONS',
  e13: 'PANEL: SPACE EXPLORATION',
  e14: 'ROBOWARS QF — HEAVY/FEATHER',
  e15: 'DRONE RACING FINAL HEATS',
  e16: 'HACKATHON AWARDS',
  e17: 'ROBOWARS GRAND FINALS',
  e18: 'WORKSHOP: QUANTUM COMPUTING',
  e19: 'CLOSING KEYNOTE',
  e20: 'GRAND VALEDICTION',
};

const WORKSHOP_NAMES = {
  w1: 'NEURAL ARCHITECTURE DEEP DIVE',
  w2: 'QUANTUM COMPUTING WORKSHOP',
  w3: 'AUTONOMOUS SYSTEMS',
  w4: 'BLOCKCHAIN & WEB3',
  w5: 'BIOINFORMATICS & AI DRUG DISCOVERY',
  w6: 'COMPUTER VISION COMBAT',
  w7: 'ROCKET SIMULATION ENGINEERING',
  w8: 'AR/VR DEVELOPMENT BOOTCAMP',
};

export default function Dashboard() {
  const { user, handleSignOut } = useOutletContext() || {};
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    navigate('/');
    return null;
  }

  const triggerSignOut = async () => {
    soundEffects.playClick?.();
    if (handleSignOut) await handleSignOut();
    navigate('/');
  };

  const tfId = `TF26-${user.uid?.substring(0, 5).toUpperCase() || 'GUEST'}-${Math.floor(Math.random() * 9000) + 1000}`;

  const registeredEvents = (() => {
    try {
      const stored = localStorage.getItem('tf_registered_events');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Object.keys(parsed).filter(id => parsed[id]).map(id => EVENT_NAMES[id] || id);
    } catch { return []; }
  })();

  const registeredWorkshops = (() => {
    try {
      const stored = localStorage.getItem('tf_registered_workshops');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Object.keys(parsed).filter(id => parsed[id]).map(id => WORKSHOP_NAMES[id] || id);
    } catch { return []; }
  })();

  return (
    <div className="page-section" style={{ paddingBottom: '80px', minHeight: '85vh' }}>
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 10 // IDENTITY MATRIX</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          ATTENDEE <span className="glow-sky" style={{ color: 'var(--sky)' }}>DASHBOARD</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15.5px',
          color: '#cbd5e1',
          maxWidth: '500px',
          marginTop: '12px',
          lineHeight: 1.7
        }}>
          Secure local access granted. View your cybernetic ID, event registrations, and telemetry metrics.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginTop: '40px'
      }}>
        
        {/* ID CARD PANEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel"
          style={{
            position: 'relative',
            padding: '30px',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            boxShadow: '0 0 30px rgba(56, 189, 248, 0.1)',
            overflow: 'hidden'
          }}
        >
          <div className="bracket-tl" style={{ borderColor: 'var(--sky)' }} />
          <div className="bracket-tr" style={{ borderColor: 'var(--sky)' }} />
          <div className="bracket-bl" style={{ borderColor: 'var(--sky)' }} />
          <div className="bracket-br" style={{ borderColor: 'var(--sky)' }} />

          {/* Animated Scan Line */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '2px',
            background: 'var(--sky)',
            boxShadow: '0 0 10px var(--sky)',
            opacity: 0.5,
            animation: 'scanLine 3s linear infinite'
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--sky)', letterSpacing: '0.2em' }}>
                SECURITY CLEARANCE
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#fff' }}>
                LEVEL 01 // ATTENDEE
              </div>
            </div>
            <img 
              src={user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`}
              alt="Avatar"
              style={{
                width: '64px', height: '64px',
                border: '1px solid var(--sky)',
                borderRadius: '0px',
                padding: '4px',
                background: 'rgba(56,189,248,0.1)'
              }}
            />
          </div>

          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', borderBottom: '1px dashed rgba(255,255,255,0.1)', padding: '16px 0', marginBottom: '24px' }}>
            <div className="readout-row" style={{ marginBottom: '8px' }}>
              <span className="readout-label">DESIGNATION</span>
              <span className="readout-val" style={{ color: '#fff' }}>{user.displayName || 'GUEST ENTITY'}</span>
            </div>
            <div className="readout-row" style={{ marginBottom: '8px' }}>
              <span className="readout-label">CONTACT NODE</span>
              <span className="readout-val" style={{ textTransform: 'none' }}>{user.email || 'UNVERIFIED'}</span>
            </div>
            <div className="readout-row">
              <span className="readout-label">UNIQUE IDENTIFIER</span>
              <span className="readout-val" style={{ color: 'var(--plasma)' }}>{tfId}</span>
            </div>
          </div>

          {/* FAKE BARCODE */}
          <div style={{
            width: '100%', height: '40px',
            background: 'repeating-linear-gradient(90deg, #fff, #fff 2px, transparent 2px, transparent 4px, #fff 4px, #fff 8px, transparent 8px, transparent 10px, #fff 10px, #fff 12px, transparent 12px, transparent 18px)',
            opacity: 0.8,
            marginBottom: '8px'
          }} />
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#cbd5e1', letterSpacing: '0.4em' }}>
            {tfId.split('').join(' ')}
          </div>
        </motion.div>

        {/* STATS & ACTIONS PANEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {/* Telemetry Stats */}
          <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
            <div className="bracket-tl" /> <div className="bracket-tr" /> <div className="bracket-bl" /> <div className="bracket-br" />
            <div className="hud-header">
              <span>REGISTRATION TELEMETRY</span>
              <span>DATA.LOG</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div className="readout-row">
                  <span className="readout-label">EVENTS REGISTERED</span>
                  <span className="readout-val">{registeredEvents.length}</span>
                </div>
                {registeredEvents.length > 0 && (
                  <div style={{ padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(255,255,255,0.02)', borderLeft: '1px solid var(--sky)', marginTop: '4px' }}>
                    {registeredEvents.map(name => (
                      <div key={name} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ffffff', letterSpacing: '0.05em' }}>
                        ▶ {name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <div className="readout-row">
                  <span className="readout-label">WORKSHOPS REGISTERED</span>
                  <span className="readout-val">{registeredWorkshops.length}</span>
                </div>
                {registeredWorkshops.length > 0 && (
                  <div style={{ padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(255,255,255,0.02)', borderLeft: '1px solid var(--green)', marginTop: '4px' }}>
                    {registeredWorkshops.map(name => (
                      <div key={name} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ffffff', letterSpacing: '0.05em' }}>
                        ▶ {name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="readout-row">
                <span className="readout-label">HACKATHON TEAM</span>
                <span className="readout-val" style={{ color: 'var(--plasma)' }}>UNASSIGNED</span>
              </div>
              <div className="readout-row">
                <span className="readout-label">ACCOMMODATION</span>
                <span className="readout-val">PENDING</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
            <div className="bracket-tl" /> <div className="bracket-tr" /> <div className="bracket-bl" /> <div className="bracket-br" />
            <div className="hud-header">
              <span>SYSTEM ACTIONS</span>
              <span>CTRL.SYS</span>
            </div>
            
            <button
              className="hud-btn active"
              onClick={() => navigate('/events')}
              style={{ width: '100%', marginBottom: '12px' }}
            >
              <span>BROWSE EVENTS</span>
              <span>→</span>
            </button>
            
            <button
              className="hud-btn"
              onClick={triggerSignOut}
              style={{ 
                width: '100%', 
                borderColor: 'rgba(255, 45, 85, 0.4)', 
                background: 'rgba(255, 45, 85, 0.05)', 
                color: 'var(--plasma)' 
              }}
            >
              <span>TERMINATE SESSION</span>
              <span>[SIGN OUT]</span>
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
