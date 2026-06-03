import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function TF26Title() {
  const titleRef = useRef(null);
  const [glitching, setGlitching] = useState(false);

  // Periodic glitch effect every 15 seconds
  useEffect(() => {
    const doGlitch = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 800);
    };
    const t = setInterval(doGlitch, 15000);
    // Initial glitch on mount
    setTimeout(doGlitch, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div ref={titleRef} style={{ position: 'relative', userSelect: 'none', textAlign: 'center' }}>
      {/* Main TF26 chrome text image */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <motion.img
          src="/tf26-text.png"
          alt="TF26"
          animate={{
            filter: glitching
              ? [
                  'brightness(1.5) hue-rotate(0deg) drop-shadow(0 0 30px rgba(0,242,255,0.8))',
                  'brightness(2) hue-rotate(90deg) drop-shadow(4px 0 20px rgba(255,0,255,1))',
                  'brightness(1.2) hue-rotate(-30deg) drop-shadow(-4px 0 20px rgba(0,242,255,1))',
                  'brightness(1.5) hue-rotate(0deg) drop-shadow(0 0 30px rgba(0,242,255,0.8))',
                ]
              : 'brightness(1.15) drop-shadow(0 0 25px rgba(0,242,255,0.5))',
          }}
          transition={{ duration: glitching ? 0.1 : 0.5, repeat: glitching ? 3 : 0 }}
          style={{
            width: '100%',
            maxWidth: '700px',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
          }}
        />

        {/* Glitch horizontal slices */}
        {glitching && (
          <>
            <div style={{
              position: 'absolute', inset: 0, overflow: 'hidden',
              animation: 'glitch1 0.3s steps(1) 3',
              pointerEvents: 'none',
            }}>
              <img src="/tf26-text.png" alt="" style={{
                width: '100%', maxWidth: '700px', margin: '0 auto',
                filter: 'hue-rotate(90deg) brightness(2)',
                transform: 'translateX(4px)',
              }} />
            </div>
            <div style={{
              position: 'absolute', inset: 0, overflow: 'hidden',
              animation: 'glitch2 0.3s steps(1) 3',
              pointerEvents: 'none',
            }}>
              <img src="/tf26-text.png" alt="" style={{
                width: '100%', maxWidth: '700px', margin: '0 auto',
                filter: 'hue-rotate(-90deg) brightness(1.5)',
                transform: 'translateX(-4px)',
              }} />
            </div>
          </>
        )}

        {/* Energy underline */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00f2ff, #ff00ff, #00f2ff, transparent)',
            backgroundSize: '200% 100%',
            boxShadow: '0 0 12px rgba(0,242,255,0.6)',
            marginTop: '-8px',
          }}
        />
      </div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, letterSpacing: '0.8em' }}
        animate={{ opacity: 1, letterSpacing: '0.5em' }}
        transition={{ duration: 2, delay: 0.8 }}
        style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: 'clamp(10px, 2vw, 14px)',
          letterSpacing: '0.5em',
          color: 'rgba(224,247,255,0.6)',
          textTransform: 'uppercase',
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        <span>THE CYBERNETIC</span>
        <span>EVOLUTION</span>
      </motion.div>

      {/* IIT Bombay tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: 'clamp(8px, 1.5vw, 11px)',
          letterSpacing: '0.4em',
          color: 'rgba(0,242,255,0.5)',
          marginTop: '6px',
        }}
      >
        I I T &nbsp; B O M B A Y
      </motion.div>
    </div>
  );
}
