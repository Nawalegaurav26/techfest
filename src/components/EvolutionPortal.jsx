import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

export default function EvolutionPortal() {
  const [awakening, setAwakening] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    soundEffects.playClick();
    soundEffects.playSuccess();
    setAwakening(true);
    await new Promise(r => setTimeout(r, 2200));
    setAwakening(false);
    navigate('/events');
  };

  return (
    <>
      <div style={{ position: 'relative', display: 'inline-block', marginTop: '8px' }}>
        <button
          id="evolution-portal-btn"
          className="cyber-btn evolution"
          onClick={handleClick}
        >
          ⟐ INITIATE EVOLUTION ⟐
        </button>

        {/* Pulse rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid rgba(0,242,255,0.4)',
              borderRadius: 0,
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>

      {/* Awakening full-screen flash */}
      <AnimatePresence>
        {awakening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.4, 1, 0.6, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, times: [0, 0.1, 0.2, 0.5, 0.7, 0.9, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(0,242,255,0.4) 0%, rgba(0,50,100,0.3) 40%, rgba(2,4,8,1) 100%)',
              zIndex: 9000,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2 }}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 'clamp(24px, 6vw, 72px)',
                fontWeight: 900,
                letterSpacing: '0.3em',
                color: '#00f2ff',
                textShadow: '0 0 40px rgba(0,242,255,0.9), 0 0 100px rgba(0,242,255,0.5)',
                textAlign: 'center',
              }}
            >
              INITIALIZING...
              <br />
              <span style={{ fontSize: '0.4em', letterSpacing: '0.6em', color: 'rgba(0,242,255,0.6)' }}>
                NEURAL SYNC ESTABLISHED
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
