/* Techfest 2026 — ScrollToTop Component */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    soundEffects.playClick?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={scrollUp}
          title="Back to top"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 500,
            width: '40px',
            height: '40px',
            border: '1px solid rgba(56,189,248,0.35)',
            background: 'rgba(14,14,18,0.9)',
            backdropFilter: 'blur(12px)',
            color: 'var(--sky)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(56,189,248,0.15)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--sky)';
            e.currentTarget.style.boxShadow = '0 0 24px rgba(56,189,248,0.35)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(56,189,248,0.35)';
            e.currentTarget.style.boxShadow = '0 0 16px rgba(56,189,248,0.15)';
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
