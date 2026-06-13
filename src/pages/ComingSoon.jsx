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
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
        {/* Crosshair ring */}
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 40px' }}>
          <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(56,189,248,0.3)', borderRadius: '50%', animation: 'spin 8s linear infinite' }} />
          <div style={{ position: 'absolute', inset: '20px', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '50%', animation: 'spin 5s linear infinite reverse' }} />
          <div style={{ position: 'absolute', inset: '45px', background: 'rgba(56,189,248,0.2)', borderRadius: '50%', boxShadow: '0 0 20px rgba(56,189,248,0.4)' }} />
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

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(189,200,209,0.5)', marginBottom: '40px' }}>This module is currently being assembled in our robotic bays. Stand by.</p>
        <button className="btn-ghost" onClick={() => navigate('/')}>← RETURN TO BASE</button>
      </motion.div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
