import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HolographicNav from './HolographicNav';
import BackgroundLayers from './BackgroundLayers';
import FloatingDrone from './FloatingDrone';
import { SocialIcons } from '../utils/socialIcons';
import { soundEffects } from '../utils/soundEffects';
import {
  loginWithGoogle,
  loginWithGithub,
  loginWithEmailPassword,
  loginWithMagicLink,
  logoutUser,
  subscribeToAuthChanges
} from '../utils/supabaseAuth';

// Left sidebar nav items (desktop only)
const LEFT_NAV = [
  { icon: 'home',            label: 'HOME',     to: '/' },
  { icon: 'event',           label: 'EVENTS',   to: '/events' },
  { icon: 'terminal',        label: 'TERMINAL', to: '/terminal' },
  { icon: 'psychology',      label: 'ROBOLAB',  to: '/robolab' },
  { icon: 'contact_support', label: 'CONTACT',  to: '/contact' },
  { icon: 'info',            label: 'ABOUT',    to: '/about' },
  { icon: 'handshake',       label: 'SPONSORS', to: '/sponsors' },
  { icon: 'shopping_bag',    label: 'STORE',    to: '/store' },
];

// Mobile bottom navigation (5 key items — most visited)
const MOBILE_NAV = [
  { icon: 'home',        label: 'HOME',         to: '/'            },
  { icon: 'event',       label: 'EVENTS',       to: '/events'      },
  { icon: 'sports_esports', label: 'COMPETE',   to: '/competitions'},
  { icon: 'school',      label: 'LEARN',        to: '/workshops'   },
  { icon: 'menu',        label: 'MORE',         to: null           }, // triggers full drawer
];

// Right sidebar social links
const SOCIALS = [
  { Icon: SocialIcons.Instagram, href: 'https://www.instagram.com/techfest_iitbombay/', label: 'Instagram' },
  { Icon: SocialIcons.Linkedin,  href: 'https://www.linkedin.com/company/techfest-iit-bombay/', label: 'LinkedIn' },
  { Icon: SocialIcons.Youtube,   href: 'https://youtube.com/@techfestiitbombay_youtube', label: 'YouTube' },
  { Icon: SocialIcons.Twitter,   href: 'https://x.com/Techfest_IITB', label: 'X / Twitter' },
  { Icon: SocialIcons.Facebook,  href: 'https://www.facebook.com/iitbombaytechfest/', label: 'Facebook' },
  { Icon: SocialIcons.Discord,   href: 'https://discord.gg/E2q9rbtp', label: 'Discord' },
  { Icon: SocialIcons.Whatsapp,  href: `https://wa.me/919860543634?text=${encodeURIComponent("Hello Techfest IIT Bombay Team, I am interested in participating in Techfest 2026. Initiating contact telemetry to request access credentials for competitions, workshops, and exhibitions. System online.")}`, label: 'WhatsApp' },
];

// All drawer links for "MORE" panel
const DRAWER_NAV = [
  { icon: 'home',             label: 'HOME',          to: '/'             },
  { icon: 'event',            label: 'ALL EVENTS',    to: '/events'       },
  { icon: 'terminal',         label: 'TERMINAL',      to: '/terminal'     },
  { icon: 'sports_esports',   label: 'COMPETITIONS',  to: '/competitions' },
  { icon: 'school',           label: 'WORKSHOPS',     to: '/workshops'    },
  { icon: 'mic',              label: 'LECTURES',      to: '/lectures'     },
  { icon: 'precision_manufacturing', label: 'EXHIBITIONS', to: '/exhibitions' },
  { icon: 'smart_toy',        label: 'ROBOWARS',      to: '/robowars'     },
  { icon: 'psychology',       label: 'ROBOLAB (3D)',  to: '/robolab'      },
  { icon: 'hotel',            label: 'ACCOMMODATION', to: '/accommodation'},
  { icon: 'handshake',        label: 'SPONSORS',      to: '/sponsors'     },
  { icon: 'shopping_bag',     label: 'STORE',         to: '/store'        },
  { icon: 'info',             label: 'ABOUT',         to: '/about'        },
  { icon: 'contact_support',  label: 'CONTACT',       to: '/contact'      },
];


const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -8, filter: 'blur(3px)' },
};

export default function PageLayout() {
  // Read initial audio state from BootLoader's choice (window.__soundEnabled)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.__soundEnabled === true;
    }
    return false;
  });
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [user, setUser]                 = useState(null);
  const [authLoading, setAuthLoading]   = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state if window.__soundEnabled changes outside React (e.g. BootLoader)
  useEffect(() => {
    const synced = window.__soundEnabled === true;
    if (synced !== soundEnabled) {
      setSoundEnabled(synced);
    }
  }, []); // run once on mount

  // Listen to Supabase auth state transitions
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close drawer and scroll to top on route change
  useEffect(() => {
    setDrawerOpen(false);

    // Disable browser's native automatic scroll restoration
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Direct instant scroll helper
    const scrollInstantToTop = () => {
      const docEl = document.documentElement;
      const originalSmooth = docEl.style.scrollBehavior;
      docEl.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      docEl.style.scrollBehavior = originalSmooth;
    };

    // Scroll immediately
    scrollInstantToTop();

    // Re-trigger at key frames during Framer Motion outlet transition
    const t1 = setTimeout(scrollInstantToTop, 50);
    const t2 = setTimeout(scrollInstantToTop, 150);
    const t3 = setTimeout(scrollInstantToTop, 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleSignIn = () => {
    soundEffects.playClick?.();
    setAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    soundEffects.playClick?.();
    await logoutUser().catch(() => {});
    setUser(null);
  };

  const handleMobileNavItem = (item) => {
    soundEffects.playClick?.();
    if (item.to === null) {
      setDrawerOpen(true);
    } else {
      navigate(item.to);
    }
  };

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--base)', position: 'relative' }}>

      {/* ── BACKGROUND ────────────────────────────── */}
      <div className="bg-grid" />
      <div className="vignette" />
      <BackgroundLayers />
      <FloatingDrone />

      {/* ── TOP NAVBAR ────────────────────────────── */}
      <HolographicNav
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        user={user}
        authLoading={authLoading}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onMenuClick={() => setDrawerOpen(!drawerOpen)}
        drawerOpen={drawerOpen}
      />

      {/* ── LEFT SIDEBAR (desktop 1024px+) ─────────── */}
      <aside
        className="left-sidebar"
        style={{
          position: 'fixed',
          left: 0,
          top: 'var(--nav-h)',
          bottom: 'var(--footer-h)',
          width: 'var(--sidebar-w)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '24px',
          paddingBottom: '24px',
          background: 'rgba(14, 14, 18, 0.4)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 0 20px rgba(56,189,248,0.05)',
        }}
      >
        {/* Top line */}
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, transparent, rgba(56,189,248,0.3))',
          marginBottom: '20px',
        }} />

        {/* Icons */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {LEFT_NAV.map(({ icon, label, to }) => {
            const active = isActive(to);
            return (
              <button
                key={to}
                onClick={() => navigate(to)}
                title={label}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '10px 6px',
                  minHeight: '52px',
                  width: '100%',
                  color: active ? 'var(--sky)' : 'rgba(189,200,209,0.7)',
                  background: active ? 'rgba(56,189,248,0.06)' : 'transparent',
                  borderStyle: 'solid',
                  borderWidth: '0px 2px 0px 0px',
                  borderColor: active ? 'var(--sky)' : 'transparent',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--sky)';
                    e.currentTarget.style.background = 'rgba(56,189,248,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'rgba(189,200,209,0.7)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '20px',
                    fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {icon}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '7px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                }}>
                  {label}
                </span>

                {/* Active indicator */}
                {active && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '20px',
                    background: 'var(--sky)',
                    boxShadow: '0 0 8px rgba(56,189,248,0.6)',
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom line */}
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, rgba(56,189,248,0.3), transparent)',
          marginTop: '20px',
        }} />
      </aside>

      {/* ── RIGHT SIDEBAR (SOCIALS — desktop 1024px+) ── */}
      <aside
        className="right-sidebar"
        style={{
          position: 'fixed',
          right: 0,
          top: 'var(--nav-h)',
          bottom: 'var(--footer-h)',
          width: 'var(--sidebar-w)',
          zIndex: 50,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
          background: 'linear-gradient(to left, rgba(14,14,18,0.3), transparent)',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Top decorative line */}
        <div style={{
          position: 'absolute',
          top: '0',
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, transparent, rgba(56,189,248,0.3))',
        }} />

        {SOCIALS.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            style={{
              color: 'rgba(189,200,209,0.35)',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              minWidth: '36px',
              minHeight: '36px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--sky)';
              e.currentTarget.style.transform = 'scale(1.2)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(56,189,248,0.5))';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(189,200,209,0.35)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'none';
            }}
          >
            <Icon />
          </a>
        ))}

        {/* Bottom decorative line */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, rgba(56,189,248,0.3), transparent)',
        }} />
      </aside>

      {/* ── MAIN CONTENT ──────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="main-content"
          style={{
            position: 'relative',
            zIndex: 10,
            paddingTop: 'var(--nav-h)',
            paddingLeft: 'var(--sidebar-w)',
            paddingRight: 'var(--sidebar-w)',
            paddingBottom: 'var(--footer-h)',
            minHeight: '100vh',
          }}
        >
          <Outlet />

          {/* ── SITE FOOTER ─────────────────────────── */}
          <footer style={{
            marginTop: '80px',
            paddingTop: '40px',
            paddingBottom: '40px',
            borderTop: '1px solid rgba(56,189,248,0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              TECHFEST <span style={{ color: 'var(--sky)' }}>IIT BOMBAY</span>
            </div>
            <div style={{
              display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em',
            }}>
              <a href="#" style={{ color: 'rgba(189,200,209,0.6)', textDecoration: 'none' }}>PRIVACY POLICY</a>
              <a href="#" style={{ color: 'rgba(189,200,209,0.6)', textDecoration: 'none' }}>TERMS OF SERVICE</a>
              <a href="#" style={{ color: 'rgba(189,200,209,0.6)', textDecoration: 'none' }}>CODE OF CONDUCT</a>
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(189,200,209,0.4)', marginTop: '8px'
            }}>
              © 2025-2026 Techfest IIT Bombay. All rights reserved.
            </div>
          </footer>
        </motion.main>
      </AnimatePresence>

      {/* ── BOTTOM STATUS BAR (desktop 1024px+) ───── */}
      <footer
        className="status-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'var(--footer-h)',
          zIndex: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          background: 'rgba(5, 5, 8, 0.9)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(56, 189, 248, 0.12)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Left */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          color: 'rgba(123, 208, 255, 0.7)',
        }}>
          TECHFEST 2026 // IIT BOMBAY
        </span>

        {/* Center telemetry */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.12em',
            color: 'rgba(189,200,209,0.65)',
          }}
          className="hidden-mobile-telemetry"
        >
          <span>LATENCY: <span id="footer-latency" style={{ color: 'var(--green)', textShadow: '0 0 6px rgba(0, 245, 196, 0.35)' }}>36MS</span></span>
          <span style={{ color: 'rgba(189,200,209,0.15)' }}>|</span>
          <span>UPTIME: 99.9%</span>
          <span style={{ color: 'rgba(189,200,209,0.15)' }}>|</span>
          <span>ENC: ACTIVE</span>
          <span style={{ color: 'rgba(189,200,209,0.15)' }}>|</span>
          <span>LAST UPDATED: 2026-06-03 21:26:17</span>
        </div>

        {/* Right: status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="pulse-dot" />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--green)',
          }}>
            SYSTEM ONLINE
          </span>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV (< 1024px) ────────────── */}
      <nav
        className="mobile-bottom-nav"
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-laser-line" />
        <div className="mobile-nav-tech-bg" />

        {MOBILE_NAV.map((item, idx) => {
          const active = item.to ? isActive(item.to) : drawerOpen;
          return (
            <motion.button
              key={item.label}
              onClick={() => handleMobileNavItem(item)}
              className={`mobile-bottom-nav-item${active ? ' active' : ''}`}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {/* Sliding active backplate capsule */}
              {active && (
                <motion.div
                  layoutId="activeMobileGlow"
                  className="mobile-nav-active-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Glow-bubble icon wrapper */}
              <div className="nav-icon-wrap" style={{ position: 'relative', zIndex: 2 }}>
                <span
                  className="material-symbols-outlined nav-icon"
                  style={{
                    fontVariationSettings: active ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400",
                  }}
                >
                  {item.icon}
                </span>
              </div>
              <span className="nav-label" style={{ position: 'relative', zIndex: 2 }}>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* ── FULL DRAWER (mobile "MORE" menu) ─────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5,5,8,0.7)',
                backdropFilter: 'blur(4px)',
                zIndex: 190,
              }}
            />
            {/* Drawer panel — spring bounce slide-in */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.9 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(320px, 85vw)',
                background: 'rgba(8, 8, 12, 0.99)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                borderLeft: '1px solid rgba(56, 189, 248, 0.12)',
                boxShadow: '-8px 0 48px rgba(0,0,0,0.6), -1px 0 0 rgba(56,189,248,0.08)',
                zIndex: 195,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Drawer header */}
              <div style={{
                padding: '20px 20px 14px',
                borderBottom: '1px solid rgba(56,189,248,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                background: 'rgba(56,189,248,0.03)',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                    TECHFEST <span style={{ color: 'var(--sky)', textShadow: '0 0 12px rgba(56,189,248,0.4)' }}>2026</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(56,189,248,0.5)', letterSpacing: '0.25em', marginTop: '3px', fontWeight: 700 }}>
                    IIT BOMBAY // ASIA'S LARGEST S&T FESTIVAL
                  </div>
                </div>
                <motion.button
                  onClick={() => setDrawerOpen(false)}
                  whileTap={{ scale: 0.88, rotate: 90 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(56,189,248,0.2)',
                    color: 'rgba(189,200,209,0.7)',
                    background: 'transparent',
                    fontSize: '18px',
                    borderRadius: '0px',
                  }}
                  aria-label="Close menu"
                >
                  ✕
                </motion.button>
              </div>

              {/* Drawer nav links — staggered entry */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {DRAWER_NAV.map((item, i) => {
                  const active = isActive(item.to);
                  return (
                    <motion.button
                      key={item.to}
                      onClick={() => {
                        soundEffects.playClick?.();
                        navigate(item.to);
                        setDrawerOpen(false);
                      }}
                      className={`mobile-drawer-link${active ? ' active' : ''}`}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        border: 'none',
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.22, ease: 'easeOut' }}
                      whileTap={{ backgroundColor: 'rgba(56,189,248,0.07)' }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: '20px',
                          color: active ? 'var(--sky)' : 'rgba(189,200,209,0.5)',
                          fontVariationSettings: active ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      <span style={{ marginLeft: '14px' }}>{item.label}</span>
                      {active && (
                        <span style={{
                          marginLeft: 'auto',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '8px',
                          color: 'var(--sky)',
                          letterSpacing: '0.1em',
                          textShadow: '0 0 6px rgba(56,189,248,0.5)',
                          border: '1px solid rgba(56,189,248,0.3)',
                          padding: '2px 6px',
                          background: 'rgba(56,189,248,0.08)',
                          borderRadius: '0px',
                          lineHeight: '1',
                        }}>
                          ACTIVE
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Audio toggle row + Social icons + Auth */}
              <div style={{
                padding: '16px 20px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                background: 'rgba(5, 5, 8, 0.4)',
              }}>
                {/* Sound Toggle Row */}
                <button
                  onClick={() => {
                    soundEffects.playClick?.();
                    const next = !soundEnabled;
                    window.__soundEnabled = next;
                    setSoundEnabled(next);
                    if (next) {
                      soundEffects.startBackgroundMusic?.();
                      setTimeout(() => soundEffects.playSuccess?.(), 60);
                    } else {
                      soundEffects.stopBackgroundMusic?.();
                    }
                  }}
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: soundEnabled ? 'var(--sky)' : 'rgba(189,200,209,0.5)',
                    border: soundEnabled ? '1px solid rgba(56,189,248,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    background: soundEnabled ? 'rgba(56,189,248,0.06)' : 'transparent',
                    transition: 'all 0.25s',
                  }}
                  aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>{soundEnabled ? '🔊' : '🔇'}</span>
                    <span>{soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
                  </span>
                  <span style={{
                    width: '36px',
                    height: '20px',
                    borderRadius: '0px',
                    background: soundEnabled ? 'var(--sky)' : 'rgba(255,255,255,0.1)',
                    position: 'relative',
                    transition: 'background 0.25s',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      position: 'absolute',
                      top: '3px',
                      left: soundEnabled ? '18px' : '3px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '0px',
                      background: '#fff',
                      transition: 'left 0.25s',
                      boxShadow: soundEnabled ? '0 0 6px rgba(56,189,248,0.6)' : 'none',
                    }} />
                  </span>
                </button>

                {/* Mobile Auth Panel */}
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  paddingTop: '12px',
                  marginTop: '4px',
                }}>
                  {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                          src={user.photoURL}
                          alt="avatar"
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '0px',
                            border: '1px solid rgba(56,189,248,0.5)',
                          }}
                        />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(189,200,209,0.8)', fontWeight: 600 }}>
                          {user.displayName?.split(' ')[0] || 'GUEST'}
                        </span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="btn-ghost"
                        style={{ padding: '6px 12px', fontSize: '9px', minHeight: '32px', width: 'auto' }}
                      >
                        SIGN OUT
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleSignIn}
                      disabled={authLoading}
                      style={{
                        width: '100%',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: '#fff',
                        border: '1px solid rgba(255, 45, 85, 0.5)',
                        background: 'rgba(255, 45, 85, 0.15)',
                        boxShadow: '0 0 12px rgba(255,45,85,0.2)',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,45,85,0.25)';
                        e.currentTarget.style.boxShadow = '0 0 25px rgba(255,45,85,0.5)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,45,85,0.15)';
                        e.currentTarget.style.boxShadow = '0 0 12px rgba(255,45,85,0.2)';
                      }}
                    >
                      {authLoading ? 'CONNECTING...' : 'SIGN IN WITH GOOGLE'}
                    </button>
                  )}
                </div>

                {/* Social Icons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
                  {SOCIALS.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={label}
                      style={{
                        color: 'rgba(189,200,209,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'all 0.2s',
                        borderRadius: '0px',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--sky)';
                        e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(189,200,209,0.4)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      }}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── AUTHENTICATION MODAL ────────────────── */}
      <AnimatePresence>
        {authModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!authLoading) setAuthModalOpen(false);
            }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 5, 8, 0.93)',
              backdropFilter: 'blur(16px)',
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                padding: 'clamp(20px, 6vw, 36px)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                boxShadow: '0 0 40px rgba(56, 189, 248, 0.15)',
                background: 'rgba(10, 10, 15, 0.95)'
              }}
            >
              {/* Brackets */}
              <div className="bracket-tl" style={{ borderColor: 'var(--sky)' }} />
              <div className="bracket-tr" style={{ borderColor: 'var(--sky)' }} />
              <div className="bracket-bl" style={{ borderColor: 'var(--sky)' }} />
              <div className="bracket-br" style={{ borderColor: 'var(--sky)' }} />

              {/* Close Button */}
              <button
                onClick={() => {
                  soundEffects.playClick?.();
                  setAuthModalOpen(false);
                }}
                disabled={authLoading}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'rgba(189,200,209,0.5)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                [ ESCAPE ]
              </button>

              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'var(--plasma)',
                  letterSpacing: '0.15em',
                  fontWeight: 700
                }}>
                  AUTHORIZE IDENTITY // LEVEL_01_SEC
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.1,
                  marginTop: '4px'
                }}>
                  ACCESS PORTAL
                </h2>
              </div>

              {/* Auth choice form */}
              <AuthForm 
                authLoading={authLoading}
                setAuthLoading={setAuthLoading}
                setUser={setUser}
                onClose={() => setAuthModalOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top bionic button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => {
              soundEffects.playClick?.();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              position: 'fixed',
              bottom: 'clamp(60px, 10vh, 100px)',
              right: '30px',
              width: '40px',
              height: '40px',
              background: 'rgba(5, 5, 8, 0.85)',
              border: '1px solid var(--sky)',
              color: 'var(--sky)',
              cursor: 'pointer',
              zIndex: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(56,189,248,0.25)',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              fontWeight: 700
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(56,189,248,0.1)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(56,189,248,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(5, 5, 8, 0.85)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(56,189,248,0.25)';
            }}
          >
            ▲
          </motion.button>
        )}
      </AnimatePresence>

      {/* Latency telemetry script */}
      <LatencyUpdater />
    </div>
  );
}

function LatencyUpdater() {
  useEffect(() => {
    const interval = setInterval(() => {
      const el = document.getElementById('footer-latency');
      if (el) {
        const val = Math.floor(Math.random() * (45 - 32 + 1)) + 32;
        el.textContent = `${val}MS`;
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);
  return null;
}

function AuthForm({ authLoading, setAuthLoading, setUser, onClose }) {
  const [activeTab, setActiveTab] = useState('password'); // 'password' or 'magic'
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const resetMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleOAuth = async (provider) => {
    resetMessages();
    setAuthLoading(true);
    soundEffects.playClick?.();
    try {
      let u;
      if (provider === 'google') {
        u = await loginWithGoogle();
      } else if (provider === 'github') {
        u = await loginWithGithub();
      }
      if (u) {
        setUser(u);
        soundEffects.playSuccess?.();
        onClose();
      }
    } catch (err) {
      setErrorMessage(err.message || "OAuth Authentication failed.");
      soundEffects.playError?.();
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();
    if (!email) {
      setErrorMessage("Email field required.");
      soundEffects.playError?.();
      return;
    }

    setAuthLoading(true);
    soundEffects.playClick?.();

    try {
      if (activeTab === 'magic') {
        const res = await loginWithMagicLink(email);
        setSuccessMessage(res.message || "Magic Link dispatched!");
        soundEffects.playSuccess?.();
      } else {
        if (!password) {
          setErrorMessage("Password field required.");
          soundEffects.playError?.();
          setAuthLoading(false);
          return;
        }
        const u = await loginWithEmailPassword(email, password, isSignUp);
        if (u) {
          setUser(u);
          soundEffects.playSuccess?.();
          onClose();
        }
      }
    } catch (err) {
      setErrorMessage(err.message || "Authentication failed.");
      soundEffects.playError?.();
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
        <button
          type="button"
          onClick={() => { soundEffects.playClick?.(); setActiveTab('password'); resetMessages(); }}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
            color: activeTab === 'password' ? 'var(--sky)' : 'rgba(189,200,209,0.4)',
            letterSpacing: '0.1em'
          }}
        >
          CREDENTIALS
        </button>
        <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
        <button
          type="button"
          onClick={() => { soundEffects.playClick?.(); setActiveTab('magic'); resetMessages(); }}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
            color: activeTab === 'magic' ? 'var(--sky)' : 'rgba(189,200,209,0.4)',
            letterSpacing: '0.1em'
          }}
        >
          MAGIC LINK
        </button>
      </div>

      {errorMessage && (
        <div style={{
          padding: '10px 14px', marginBottom: '16px', background: 'rgba(255, 45, 85, 0.1)',
          borderLeft: '2px solid var(--plasma)', fontFamily: 'var(--font-mono)', fontSize: '9.5px',
          color: 'var(--plasma)', lineHeight: '1.4'
        }}>
          ERROR // {errorMessage}
        </div>
      )}

      {successMessage && (
        <div style={{
          padding: '10px 14px', marginBottom: '16px', background: 'rgba(0, 245, 196, 0.08)',
          borderLeft: '2px solid var(--green)', fontFamily: 'var(--font-mono)', fontSize: '9.5px',
          color: 'var(--green)', lineHeight: '1.4'
        }}>
          SUCCESS // {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: 'rgba(189,200,209,0.4)', marginBottom: '4px', letterSpacing: '0.1em' }}>
            EMAIL_ADDRESS //
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={authLoading}
            placeholder="operator@techfest.in"
            style={{
              width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(56, 189, 248, 0.15)', color: '#fff',
              fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--sky)'}
            onBlur={e => e.target.style.borderColor = 'rgba(56, 189, 248, 0.15)'}
          />
        </div>

        {activeTab === 'password' && (
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: 'rgba(189,200,209,0.4)', marginBottom: '4px', letterSpacing: '0.1em' }}>
              ACCESS_KEY_HASH //
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={authLoading}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(56, 189, 248, 0.15)', color: '#fff',
                fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--sky)'}
              onBlur={e => e.target.style.borderColor = 'rgba(56, 189, 248, 0.15)'}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={authLoading}
          className="btn-primary"
          style={{ width: '100%', padding: '12px 0', marginTop: '8px' }}
        >
          <span className="btn-tl" />
          <span className="btn-br" />
          {authLoading ? 'AUTHORIZING...' : (activeTab === 'magic' ? 'REQUEST MAGIC TELEPORT' : (isSignUp ? 'REGISTER CREDENTIALS' : 'ESTABLISH SESSION'))}
        </button>

        {activeTab === 'password' && (
          <button
            type="button"
            disabled={authLoading}
            onClick={() => { soundEffects.playClick?.(); setIsSignUp(!isSignUp); resetMessages(); }}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.4)',
              textAlign: 'center', marginTop: '4px', textDecoration: 'underline'
            }}
          >
            {isSignUp ? 'Already authenticated? Establish session' : 'No credentials? Register new identity'}
          </button>
        )}
      </form>

      <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.15em' }}>OR CONNECT VIA</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => handleOAuth('google')}
          disabled={authLoading}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '10px 0', border: '1px solid rgba(255, 45, 85, 0.3)',
            background: 'rgba(255, 45, 85, 0.05)', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.3s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 45, 85, 0.15)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 45, 85, 0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 45, 85, 0.05)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          GOOGLE SYNC
        </button>

        <button
          onClick={() => handleOAuth('github')}
          disabled={authLoading}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '10px 0', border: '1px solid rgba(56, 189, 248, 0.3)',
            background: 'rgba(56, 189, 248, 0.05)', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.3s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.05)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          GITHUB SYNC
        </button>
      </div>
    </div>
  );
}
