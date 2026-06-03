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
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  // Sync nav icon with actual audio state on mount (BootLoader may have set it)
  useEffect(() => {
    // This runs after PageLayout passes down the correct initial soundEnabled,
    // but also double-checks the global window flag to stay in sync.
    const globalEnabled = window.__soundEnabled === true;
    // No setState here since soundEnabled comes from parent via props
    // Parent (PageLayout) already reads window.__soundEnabled on init.
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    // Update global FIRST so soundEffects.checkEnabled() sees it immediately
    window.__soundEnabled = next;
    // Then update React state so UI re-renders
    setSoundEnabled(next);
    if (next) {
      // Resume/start background music
      soundEffects.startBackgroundMusic?.();
      // Play success tone slightly after so AudioContext is unlocked
      setTimeout(() => soundEffects.playSuccess?.(), 60);
    } else {
      // Stop background music
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
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          minWidth: '44px',
          minHeight: '44px',
        }}
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
      </div>

      {/* ── CENTER: NAV LINKS (desktop) ──────────── */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(16px, 2.5vw, 32px)',
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
            style={{ padding: '8px 4px', minHeight: '44px', display: 'flex', alignItems: 'center' }}
          >
            {link.label}
          </NavLink>
        ))}
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
          {soundEnabled
            ? <Volume2 size={16} />
            : <VolumeX size={16} />}
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
                onClick={handleSignOut}
                className="btn-ghost"
                style={{ padding: '8px 16px', fontSize: '10px', width: 'auto' }}
              >
                SIGN OUT
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
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

        {/* Mobile hamburger — only on < 1024px (handled by CSS) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-menu-btn"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          style={{
            width: '44px', height: '44px',
            border: '1px solid rgba(56,189,248,0.2)',
            color: 'var(--sky)',
            background: mobileOpen ? 'rgba(56,189,248,0.08)' : 'transparent',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
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
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(5,5,8,0.98)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(56,189,248,0.15)',
              overflow: 'hidden',
              zIndex: 99,
            }}
          >
            <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => {
                    soundEffects.playClick?.();
                    setMobileOpen(false);
                  }}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 24px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--sky)' : 'var(--on-muted)',
                    borderLeft: isActive ? '3px solid var(--sky)' : '3px solid transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: isActive ? 'rgba(56,189,248,0.05)' : 'transparent',
                    minHeight: '56px',
                    transition: 'all 0.2s',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
              {/* Sign In inside mobile drawer */}
              <div style={{ padding: '12px 24px' }}>
                {user ? (
                  <button
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                    className="btn-ghost"
                    style={{ width: '100%' }}
                  >
                    SIGN OUT
                  </button>
                ) : (
                  <button
                    onClick={() => { handleSignIn(); setMobileOpen(false); }}
                    disabled={authLoading}
                    className="btn-primary"
                  >
                    <span className="btn-tl" />
                    <span className="btn-br" />
                    {authLoading ? 'CONNECTING...' : 'SIGN IN WITH GOOGLE'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
