/* Techfest 2026 - Telemetry Log 18 */
import { motion } from 'framer-motion';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { soundEffects } from '../utils/soundEffects';

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
          fontSize: '14px',
          color: 'rgba(189, 200, 209, 0.5)',
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
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.5)', letterSpacing: '0.4em' }}>
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
              <div className="readout-row">
                <span className="readout-label">EVENTS REGISTERED</span>
                <span className="readout-val">0</span>
              </div>
              <div className="readout-row">
                <span className="readout-label">WORKSHOPS</span>
                <span className="readout-val">0</span>
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
