import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HolographicNav from './HolographicNav';
import BackgroundLayers from './BackgroundLayers';
import { SocialIcons } from '../utils/socialIcons';

// Left sidebar nav items (desktop only)
const LEFT_NAV = [
  { icon: 'home',            label: 'HOME',     to: '/' },
  { icon: 'event',           label: 'EVENTS',   to: '/events' },
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
  { icon: 'sports_esports',   label: 'COMPETITIONS',  to: '/competitions' },
  { icon: 'school',           label: 'WORKSHOPS',     to: '/workshops'    },
  { icon: 'mic',              label: 'LECTURES',      to: '/lectures'     },
  { icon: 'precision_manufacturing', label: 'EXHIBITIONS', to: '/exhibitions' },
  { icon: 'smart_toy',        label: 'ROBOWARS',      to: '/robowars'     },
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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
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

  const handleMobileNavItem = (item) => {
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

      {/* ── TOP NAVBAR ────────────────────────────── */}
      <HolographicNav
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
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
                  borderRight: active ? '2px solid var(--sky)' : '2px solid transparent',
                  transition: 'all 0.25s',
                  border: 'none',
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
          <span>LATENCY: <span id="footer-latency" style={{ color: 'var(--green)', textShadow: '0 0 6px rgba(34,197,94,0.4)' }}>36MS</span></span>
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

      {/* ── MOBILE BOTTOM NAV (< 1024px) ──────────── */}
      <nav
        className="mobile-bottom-nav"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label="Mobile navigation"
      >
        {MOBILE_NAV.map((item) => {
          const active = item.to ? isActive(item.to) : drawerOpen;
          return (
            <button
              key={item.label}
              onClick={() => handleMobileNavItem(item)}
              className={`mobile-bottom-nav-item${active ? ' active' : ''}`}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <span className="material-symbols-outlined nav-icon"
                style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="nav-label">{item.label}</span>
            </button>
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
            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(320px, 85vw)',
                background: 'rgba(10, 10, 14, 0.98)',
                backdropFilter: 'blur(32px)',
                borderLeft: '1px solid rgba(56, 189, 248, 0.15)',
                zIndex: 195,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Drawer header */}
              <div style={{
                padding: '20px 20px 12px',
                borderBottom: '1px solid rgba(56,189,248,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#fff' }}>
                    TECHFEST <span style={{ color: 'var(--sky)' }}>2026</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.5)', letterSpacing: '0.2em', marginTop: '3px' }}>
                    IIT BOMBAY // NAVIGATE
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(56,189,248,0.2)',
                    color: 'var(--sky)',
                    background: 'transparent',
                    fontSize: '20px',
                  }}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Drawer nav links */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {DRAWER_NAV.map((item) => {
                  const active = isActive(item.to);
                  return (
                    <button
                      key={item.to}
                      onClick={() => navigate(item.to)}
                      className={`mobile-drawer-link${active ? ' active' : ''}`}
                      style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent' }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: '20px',
                          color: active ? 'var(--sky)' : 'rgba(189,200,209,0.5)',
                          fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Social icons at bottom */}
              <div style={{
                padding: '16px 20px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
              }}>
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
                      width: '44px',
                      height: '44px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.2s',
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
            </motion.div>
          </>
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
