/* Techfest 2026 - Telemetry Log 2 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ComingSoon({ title = 'MODULE', subtitle = 'Under Construction' }) {
  const navigate = useNavigate();
  const [percent, setPercent] = useState(64.28);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        const delta = Math.random() * 0.04;
        const next = prev + delta;
        return next > 99.99 ? 64.28 : parseFloat(next.toFixed(2));
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        {/* Square cybernetic HUD box */}
        <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(56,189,248,0.1)' }}>
          <div className="bracket-tl" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px' }} />
          <div className="bracket-tr" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px' }} />
          <div className="bracket-bl" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px' }} />
          <div className="bracket-br" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px' }} />
          
          <div style={{ position: 'absolute', inset: '15px', border: '1px dashed rgba(56,189,248,0.2)', animation: 'spin 15s linear infinite' }} />
          <div style={{ width: '40px', height: '40px', background: 'rgba(56,189,248,0.15)', boxShadow: '0 0 30px rgba(56,189,248,0.5)', animation: 'pulseDot 2s ease-in-out infinite' }} />
        </div>

        <div className="section-overline" style={{ justifyContent: 'center', marginBottom: '16px' }}>{title}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '16px' }}>{subtitle}</h1>
        
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '16px',
          color: 'var(--sky)',
          textShadow: 'var(--glow-sky-sm)',
          marginBottom: '20px',
          letterSpacing: '0.15em',
          fontWeight: 700
        }}>
          ASSEMBLY_PROGRESS // {percent}%
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#cbd5e1', marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px auto' }}>
          This module is currently being constructed in our robotic engineering bays. Stand by for deployment.
        </p>
        <button className="btn-ghost" onClick={() => navigate('/')}>← RETURN TO BASE</button>
      </motion.div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
