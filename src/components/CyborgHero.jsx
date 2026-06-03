import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CyborgHero() {
  const eyeGlowRef = useRef(null);
  const heroRef = useRef(null);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [scanning, setScanning] = useState(false);

  // Eye tracking — track cursor position relative to viewport center
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rx = (e.clientX - cx) / cx;
      const ry = (e.clientY - cy) / cy;
      setEyePos({ x: rx * 6, y: ry * 4 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Periodic blink
  useEffect(() => {
    const doBlink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 180);
    };
    const t = setInterval(doBlink, 3200 + Math.random() * 3000);
    return () => clearInterval(t);
  }, []);

  // Periodic scan
  useEffect(() => {
    const doScan = () => {
      setScanning(true);
      setTimeout(() => setScanning(false), 1200);
    };
    const t = setInterval(doScan, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        userSelect: 'none',
      }}
    >
      {/* Main cyborg face image */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          filter: [
            'brightness(1) drop-shadow(0 0 40px rgba(0,242,255,0.35))',
            'brightness(1.06) drop-shadow(0 0 60px rgba(0,242,255,0.55))',
            'brightness(1) drop-shadow(0 0 40px rgba(0,242,255,0.35))',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative' }}
      >
        <img
          src="/cyborg-hero.png"
          alt="Cybernetic AI Entity"
          style={{
            width: '100%',
            objectFit: 'contain',
            display: 'block',
            filter: blinking ? 'brightness(0.92)' : undefined,
            transition: 'filter 0.08s ease',
          }}
        />

        {/* Eye glow overlay — moves with cursor */}
        <div
          ref={eyeGlowRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Left eye glow */}
          <div style={{
            position: 'absolute',
            top: '35%',
            left: '38%',
            width: '60px',
            height: '20px',
            transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,242,255,0.9) 0%, rgba(0,242,255,0.3) 40%, transparent 70%)',
            filter: 'blur(3px)',
            transition: 'transform 0.12s ease',
            boxShadow: scanning ? '0 0 30px rgba(0,242,255,0.8)' : '0 0 15px rgba(0,242,255,0.5)',
          }} />
          {/* Right eye glow */}
          <div style={{
            position: 'absolute',
            top: '35%',
            left: '57%',
            width: '60px',
            height: '20px',
            transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,242,255,0.9) 0%, rgba(0,242,255,0.3) 40%, transparent 70%)',
            filter: 'blur(3px)',
            transition: 'transform 0.12s ease',
            boxShadow: scanning ? '0 0 30px rgba(0,242,255,0.8)' : '0 0 15px rgba(0,242,255,0.5)',
          }} />

          {/* Scanning beam */}
          {scanning && (
            <motion.div
              initial={{ top: '20%', opacity: 0 }}
              animate={{ top: '80%', opacity: [0, 0.6, 0.6, 0] }}
              transition={{ duration: 1.2, ease: 'linear' }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(0,242,255,0.8), transparent)',
                boxShadow: '0 0 12px rgba(0,242,255,0.5)',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        {/* Circuit pulse lines — bottom left */}
        <svg
          style={{ position: 'absolute', bottom: '10%', left: '5%', opacity: 0.5, width: '120px' }}
          viewBox="0 0 120 40" fill="none"
        >
          <motion.path
            d="M0 20 H30 L40 10 H80 L90 20 H120"
            stroke="#00f2ff" strokeWidth="0.8"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M0 28 H20 L28 36 H60"
            stroke="#00f2ff" strokeWidth="0.5"
            strokeDasharray="4 6"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle cx="80" cy="20" r="2"
            fill="#00f2ff"
            animate={{ opacity: [1, 0.3, 1], r: [2, 3, 2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>

        {/* Circuit pulse lines — bottom right */}
        <svg
          style={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.5, width: '120px', transform: 'scaleX(-1)' }}
          viewBox="0 0 120 40" fill="none"
        >
          <motion.path
            d="M0 20 H30 L40 10 H80 L90 20 H120"
            stroke="#00f2ff" strokeWidth="0.8"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
          />
        </svg>
      </motion.div>

      {/* Atmospheric glow behind figure */}
      <div style={{
        position: 'absolute',
        inset: '-20%',
        background: 'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(0,100,180,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: -1,
      }} />
    </div>
  );
}
