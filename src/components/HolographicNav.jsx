import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { loginWithGoogle, logoutUser } from '../utils/supabaseAuth';
import { soundEffects } from '../utils/soundEffects';

const NAV_LINKS = [
  { label: 'COMPETITIONS', to: '/competitions' },
  { label: 'WORKSHOPS',    to: '/workshops' },
  { label: 'LECTURES',     to: '/lectures' },
  { label: 'EXHIBITIONS',  to: '/exhibitions' },
  { label: 'ROBOWARS',     to: '/robowars' },
  { label: 'MAP',          to: '/map' },
  { label: 'SCHEDULE',     to: '/schedule' },
  { label: 'FAQ',          to: '/faq' },
  { label: 'TERMINAL',     to: '/terminal' },
];

export default function HolographicNav({
  soundEnabled,
  setSoundEnabled,
  user,
  authLoading,
  onSignIn,
  onSignOut,
  onMenuClick,
  drawerOpen,
}) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    window.__soundEnabled = next;
    setSoundEnabled(next);
    if (next) {
      soundEffects.startBackgroundMusic?.();
      setTimeout(() => soundEffects.playSuccess?.(), 60);
    } else {
      soundEffects.stopBackgroundMusic?.();
    }
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
        padding: '0 clamp(16px, 4vw, 40px)',
        background: scrolled
          ? 'rgba(5, 5, 8, 0.97)'
          : 'rgba(5, 5, 8, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.6)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* ── LEFT: LOGO ─────────────────────────────── */}
      <button
        onClick={() => {
          soundEffects.playClick?.();
          navigate('/');
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          minWidth: '44px',
          minHeight: '44px',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
        aria-label="Techfest Home"
      >
        <img
          src="/techfest-logo-white.png"
          alt="Techfest IIT Bombay"
          style={{
            height: 'clamp(32px, 5vw, 42px)',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.35))',
            transition: 'filter 0.3s',
          }}
          onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback text logo */}
        <div style={{ display: 'none', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1 }}>TECHFEST</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.6)', letterSpacing: '0.25em', marginTop: '2px' }}>IIT BOMBAY</div>
        </div>
      </button>

      {/* ── CENTER: NAV LINKS (desktop) ──────────── */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(16px, 2.5vw, 32px)',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        className="hidden-mobile-nav"
        aria-label="Main navigation"
        role="navigation"
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => soundEffects.playClick?.()}
            style={{ padding: '8px 4px', minHeight: '44px', display: 'flex', alignItems: 'center' }}
            aria-label={`Navigate to ${link.label}`}
          >
            {link.label}
          </NavLink>
        ))}
        {user && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => soundEffects.playClick?.()}
            style={{ padding: '8px 4px', minHeight: '44px', display: 'flex', alignItems: 'center', color: 'var(--sky)' }}
            aria-label="Navigate to DASHBOARD"
          >
            DASHBOARD
          </NavLink>
        )}
      </nav>

      {/* ── RIGHT: CONTROLS ────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

        {/* Audio toggle — 44x44px touch target */}
        <button
          onClick={toggleSound}
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${soundEnabled ? 'rgba(56,189,248,0.5)' : 'rgba(255,255,255,0.12)'}`,
            color: soundEnabled ? 'var(--sky)' : 'rgba(189,200,209,0.4)',
            background: soundEnabled ? 'rgba(56,189,248,0.08)' : 'transparent',
            transition: 'all 0.3s',
            flexShrink: 0,
          }}
          title="Toggle Audio"
          aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
        >
          {soundEnabled ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Volume2 size={16} />
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5px', height: '10px' }}>
                <span className="sound-bar bar1" />
                <span className="sound-bar bar2" />
                <span className="sound-bar bar3" />
              </div>
            </div>
          ) : (
            <VolumeX size={16} />
          )}
        </button>

        {/* Auth — only show on desktop when space permits */}
        <div className="hidden-mobile-nav">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={user.photoURL}
                alt="avatar"
                style={{
                  width: '32px', height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(56,189,248,0.5)',
                }}
              />
              <button
                onClick={onSignOut}
                className="btn-ghost"
                style={{ padding: '8px 16px', fontSize: '10px', width: 'auto' }}
              >
                SIGN OUT
              </button>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              disabled={authLoading}
              style={{
                padding: '10px 20px',
                minHeight: '44px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--plasma-dim)',
                border: '1px solid rgba(255, 45, 85, 0.5)',
                background: 'rgba(255, 45, 85, 0.05)',
                boxShadow: '0 0 12px rgba(255,45,85,0.15)',
                transition: 'all 0.3s',
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
        </div>

        {/* Mobile hamburger — only on < 1024px (opens unified sidebar drawer) */}
        <button
          onClick={() => {
            soundEffects.playClick?.();
            onMenuClick?.();
          }}
          className="mobile-menu-btn"
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
          style={{
            width: '44px', height: '44px',
            border: '1px solid rgba(56,189,248,0.2)',
            color: 'var(--sky)',
            background: drawerOpen ? 'rgba(56,189,248,0.08)' : 'transparent',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
        >
          {drawerOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
