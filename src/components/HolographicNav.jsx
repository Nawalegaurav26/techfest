import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { loginWithGoogle, logoutUser } from '../utils/firebaseAuth';
import { soundEffects } from '../utils/soundEffects';

const NAV_LINKS = [
  { label: 'COMPETITIONS', to: '/competitions' },
  { label: 'WORKSHOPS',    to: '/workshops' },
  { label: 'LECTURES',     to: '/lectures' },
  { label: 'EXHIBITIONS',  to: '/exhibitions' },
  { label: 'ROBOWARS',     to: '/robowars' },
  { label: 'ABOUT',        to: '/about' },
];

export default function HolographicNav({ soundEnabled, setSoundEnabled }) {
  const [user, setUser]             = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    window.__soundEnabled = next;
    if (next) {
      soundEffects.startBackgroundMusic?.();
      setTimeout(() => soundEffects.playSuccess?.(), 50);
    } else {
      soundEffects.stopBackgroundMusic?.();
    }
  };

  const handleSignIn = async () => {
    soundEffects.playClick?.();
    setAuthLoading(true);
    try {
      const u = await loginWithGoogle();
      setUser(u);
      soundEffects.playSuccess?.();
    } catch {
      soundEffects.playError?.();
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    soundEffects.playClick?.();
    await logoutUser().catch(() => {});
    setUser(null);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-h)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        background: scrolled
          ? 'rgba(5, 5, 8, 0.95)'
          : 'rgba(5, 5, 8, 0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.6)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* ── LEFT: LOGO ─────────────────────────────── */}
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'none',
          flexShrink: 0,
        }}
      >
        {/* Real Techfest Logo — white inverted on dark bg */}
        <img
          src="/techfest-logo-white.png"
          alt="Techfest IIT Bombay"
          style={{
            height: '42px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.35))',
            transition: 'filter 0.3s',
          }}
          onError={e => {
            // fallback: show text logo if image fails
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback text logo (hidden by default) */}
        <div style={{ display: 'none', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1 }}>TECHFEST</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.6)', letterSpacing: '0.25em', marginTop: '2px' }}>IIT BOMBAY</div>
        </div>
      </div>

      {/* ── CENTER: NAV LINKS ──────────────────────── */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      }} className="hidden-mobile-nav">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => soundEffects.playClick?.()}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* ── RIGHT: CONTROLS ────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

        {/* Audio toggle */}
        <button
          onClick={toggleSound}
          style={{
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${soundEnabled ? 'rgba(56,189,248,0.5)' : 'rgba(255,255,255,0.12)'}`,
            color: soundEnabled ? 'var(--sky)' : 'rgba(189,200,209,0.4)',
            background: soundEnabled ? 'rgba(56,189,248,0.08)' : 'transparent',
            transition: 'all 0.3s',
            cursor: 'none',
          }}
          title="Toggle Audio"
        >
          {soundEnabled
            ? <Volume2 size={14} />
            : <VolumeX size={14} />}
        </button>

        {/* Auth */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={user.photoURL}
              alt="avatar"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: '1px solid rgba(56,189,248,0.5)',
              }}
            />
            <button
              onClick={handleSignOut}
              className="btn-ghost"
              style={{ padding: '6px 16px', fontSize: '10px' }}
            >
              SIGN OUT
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            disabled={authLoading}
            style={{
              padding: '8px 20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--plasma-dim)',
              border: '1px solid rgba(255, 45, 85, 0.5)',
              background: 'rgba(255, 45, 85, 0.05)',
              boxShadow: '0 0 12px rgba(255,45,85,0.15)',
              transition: 'all 0.3s',
              cursor: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,45,85,0.15)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(255,45,85,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,45,85,0.05)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(255,45,85,0.15)';
            }}
          >
            {authLoading ? 'CONNECTING...' : 'SIGN IN'}
          </button>
        )}

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            color: 'var(--sky)',
            cursor: 'none',
            padding: '4px',
          }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── MOBILE DROPDOWN ────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(5,5,8,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(56,189,248,0.15)',
              overflow: 'hidden',
              zIndex: 99,
            }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => { soundEffects.playClick?.(); setMobileOpen(false); }}
                  style={{ padding: '12px 8px', display: 'block', fontSize: '12px' }}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
