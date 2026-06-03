import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HolographicNav from './HolographicNav';
import BackgroundLayers from './BackgroundLayers';
import { SocialIcons } from '../utils/socialIcons';

// Left sidebar nav items
const LEFT_NAV = [
  { icon: 'home',            label: 'HOME',     to: '/' },
  { icon: 'event',           label: 'EVENTS',   to: '/events' },
  { icon: 'contact_support', label: 'CONTACT',  to: '/contact' },
  { icon: 'info',            label: 'ABOUT',    to: '/about' },
  { icon: 'handshake',       label: 'SPONSORS', to: '/sponsors' },
  { icon: 'shopping_bag',    label: 'STORE',    to: '/store' },
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

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -8, filter: 'blur(3px)' },
};

export default function PageLayout() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

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

      {/* ── LEFT SIDEBAR ──────────────────────────── */}
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
            const isActive = to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(to);
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
                  width: '100%',
                  color: isActive ? 'var(--sky)' : 'rgba(189,200,209,0.7)',
                  background: isActive ? 'rgba(56,189,248,0.06)' : 'transparent',
                  borderRight: isActive ? '2px solid var(--sky)' : '2px solid transparent',
                  transition: 'all 0.25s',
                  cursor: 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--sky)';
                    e.currentTarget.style.background = 'rgba(56,189,248,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(189,200,209,0.7)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '20px',
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                    filter: isActive ? '0 0 6px rgba(56,189,248,0.5)' : 'none',
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

                {/* Active indicator dot */}
                {isActive && (
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

      {/* ── RIGHT SIDEBAR (SOCIALS) ────────────────── */}
      <aside
        className="right-sidebar"
        style={{
          position: 'fixed',
          right: 0,
          top: 'var(--nav-h)',
          bottom: 'var(--footer-h)',
          width: 'var(--sidebar-w)',
          zIndex: 50,
          display: 'flex',
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
              padding: '6px',
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

      {/* ── BOTTOM STATUS BAR ─────────────────────── */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--footer-h)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        background: 'rgba(5, 5, 8, 0.9)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(56, 189, 248, 0.12)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
      }}>
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.12em',
          color: 'rgba(189,200,209,0.65)',
        }}>
          <span>LATENCY: <span id="footer-latency">42MS</span></span>
          <span style={{ color: 'rgba(189,200,209,0.15)' }}>|</span>
          <span>UPTIME: 99.9%</span>
          <span style={{ color: 'rgba(189,200,209,0.15)' }}>|</span>
          <span>ENC: ACTIVE</span>
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

      {/* Latency telemetry script */}
      <LatencyUpdater />
    </div>
  );
}

function LatencyUpdater() {
  if (typeof window !== 'undefined') {
    setInterval(() => {
      const el = document.getElementById('footer-latency');
      if (el) {
        const val = Math.floor(Math.random() * (48 - 36 + 1)) + 36;
        el.textContent = `${val}MS`;
      }
    }, 2500);
  }
  return null;
}
