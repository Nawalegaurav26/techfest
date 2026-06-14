import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { soundEffects } from '../utils/soundEffects';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 15vw, 150px)',
          fontWeight: 800,
          color: 'var(--plasma)',
          textShadow: 'var(--glow-plasma)',
          lineHeight: 1,
          marginBottom: '16px'
        }}>
          404
        </div>
        <div className="section-overline" style={{ marginBottom: '24px', letterSpacing: '0.4em' }}>
          FATAL ERROR // NEURAL LINK SEVERED
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          color: 'rgba(189,200,209,0.8)',
          maxWidth: '450px',
          margin: '0 auto 32px',
          lineHeight: 1.6
        }}>
          > The telemetry node you are attempting to sync with has been purged from the mainframe or is restricted. <br/>
          > Rebooting quantum state... <br/>
          > Please return to the central hub.
        </p>

        <button
          className="btn-primary"
          onClick={() => {
            soundEffects.playClick?.();
            navigate('/');
          }}
          style={{ margin: '0 auto' }}
        >
          <span className="btn-tl" />
          <span className="btn-br" />
          RETURN TO HOME
        </button>
      </motion.div>
    </div>
  );
}
