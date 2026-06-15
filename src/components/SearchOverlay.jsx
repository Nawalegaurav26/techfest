/* Techfest 2026 — Telemetry Log 24 // GLOBAL SEARCH OVERLAY */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { soundEffects } from '../utils/soundEffects';

const SEARCH_INDEX = [
  // Pages
  { type: 'PAGE',   title: 'Home',           desc: 'Main landing page',            to: '/',             icon: 'home' },
  { type: 'PAGE',   title: 'Events',          desc: 'All events listing',           to: '/events',       icon: 'event' },
  { type: 'PAGE',   title: 'Competitions',    desc: 'Competition hub',              to: '/competitions', icon: 'emoji_events' },
  { type: 'PAGE',   title: 'Workshops',       desc: 'Hands-on workshops',           to: '/workshops',    icon: 'school' },
  { type: 'PAGE',   title: 'Lectures',        desc: 'Keynote speakers',             to: '/lectures',     icon: 'mic' },
  { type: 'PAGE',   title: 'Exhibitions',     desc: 'Project showcases',            to: '/exhibitions',  icon: 'precision_manufacturing' },
  { type: 'PAGE',   title: 'Robowars',        desc: 'Combat robotics arena',        to: '/robowars',     icon: 'smart_toy' },
  { type: 'PAGE',   title: 'RoboLab 3D',      desc: '3D robot configurator',        to: '/robolab',      icon: 'psychology' },
  { type: 'PAGE',   title: 'Campus Map',      desc: 'Tactical venue map',           to: '/map',          icon: 'map' },
  { type: 'PAGE',   title: 'Schedule',        desc: '4-day event timeline',         to: '/schedule',     icon: 'calendar_month' },
  { type: 'PAGE',   title: 'Leaderboard',     desc: 'Robowars standings',           to: '/leaderboard',  icon: 'leaderboard' },
  { type: 'PAGE',   title: 'Register',        desc: 'Event registration',           to: '/register',     icon: 'app_registration' },
  { type: 'PAGE',   title: 'Ask ARIA (FAQ)',  desc: 'AI support terminal',          to: '/faq',          icon: 'quiz' },
  { type: 'PAGE',   title: 'Dashboard',       desc: 'Attendee profile',             to: '/dashboard',    icon: 'space_dashboard' },
  { type: 'PAGE',   title: 'Store',           desc: 'Merchandise & collectibles',   to: '/store',        icon: 'shopping_bag' },
  { type: 'PAGE',   title: 'Accommodation',   desc: 'Hostel booking',               to: '/accommodation',icon: 'hotel' },
  { type: 'PAGE',   title: 'Sponsors',        desc: 'Our partners & tiers',         to: '/sponsors',     icon: 'handshake' },
  { type: 'PAGE',   title: 'About',           desc: 'About Techfest',               to: '/about',        icon: 'info' },
  { type: 'PAGE',   title: 'Contact',         desc: 'Get in touch',                 to: '/contact',      icon: 'contact_support' },
  { type: 'PAGE',   title: 'Terminal',        desc: 'System terminal',              to: '/terminal',     icon: 'terminal' },
  // Events
  { type: 'EVENT',  title: 'Robowar Sigma',   desc: 'Competition · ₹3,00,000',      to: '/competitions', icon: 'smart_toy' },
  { type: 'EVENT',  title: 'Code Breach',     desc: 'Hackathon · ₹1,00,000',        to: '/events',       icon: 'code' },
  { type: 'EVENT',  title: 'Drone Wars',      desc: 'Competition · ₹80,000',        to: '/events',       icon: 'flight' },
  { type: 'EVENT',  title: 'AI Design Jam',   desc: 'Workshop · ₹40,000',           to: '/workshops',    icon: 'design_services' },
  { type: 'EVENT',  title: 'Quantum Lock',    desc: 'Competition · ₹45,000',        to: '/competitions', icon: 'lock' },
  { type: 'EVENT',  title: 'Circuit Wizards', desc: 'Competition · ₹60,000',        to: '/competitions', icon: 'electric_bolt' },
  // Speakers
  { type: 'SPEAKER',title: 'Sam Altman',      desc: 'CEO OpenAI · Day 1 Keynote',   to: '/lectures',     icon: 'mic' },
  { type: 'SPEAKER',title: 'CERN Physicist',  desc: 'Dark Matter · Day 2',          to: '/lectures',     icon: 'science' },
  { type: 'SPEAKER',title: 'ISRO/NASA Panel', desc: 'Space Exploration · Day 3',    to: '/lectures',     icon: 'rocket_launch' },
  // Venues
  { type: 'VENUE',  title: 'Convocation Hall',desc: 'Main stage · 5000 cap',        to: '/map',          icon: 'stadium' },
  { type: 'VENUE',  title: 'Sports Complex',  desc: 'Arena · 8000 cap',             to: '/map',          icon: 'sports' },
  { type: 'VENUE',  title: 'Exhibition Zone', desc: 'Showcase ground',              to: '/map',          icon: 'store' },
];

const TYPE_COLOR = {
  PAGE:    'var(--sky)',
  EVENT:   'var(--plasma)',
  SPEAKER: '#a855f7',
  VENUE:   '#fbbf24',
};

export function SearchOverlay({ open, onClose }) {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(0);
  const inputRef  = useRef();
  const navigate  = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery('');
      setResults([]);
      setSelected(0);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const hits = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    ).slice(0, 8);
    setResults(hits);
    setSelected(0);
  }, [query]);

  const go = (item) => {
    soundEffects.playClick?.();
    navigate(item.to);
    onClose();
  };

  const handleKey = (e) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && results[selected]) go(results[selected]);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 9000,
              background: 'rgba(5,5,8,0.85)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '12vh', left: '50%', transform: 'translateX(-50%)',
              width: 'min(640px, 94vw)',
              zIndex: 9001,
              border: '1px solid rgba(56,189,248,0.3)',
              background: 'rgba(10,10,14,0.98)',
              boxShadow: '0 0 60px rgba(56,189,248,0.12), 0 40px 80px rgba(0,0,0,0.6)',
              overflow: 'hidden',
            }}
          >
            {/* Input row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 18px',
              borderBottom: '1px solid rgba(56,189,248,0.12)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--sky)', flexShrink: 0 }}>search</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Search pages, events, venues, speakers..."
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: 'var(--font-body)', fontSize: '15px', color: '#fff',
                  caretColor: 'var(--sky)',
                }}
              />
              {query && (
                <button onClick={() => setQuery('')}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(189,200,209,0.4)', cursor: 'pointer', padding: '4px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
                </button>
              )}
              <div style={{
                padding: '2px 8px', border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.4)',
                flexShrink: 0,
              }}>ESC</div>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                {results.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => go(r)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '12px 18px',
                      background: i === selected ? 'rgba(56,189,248,0.08)' : 'transparent',
                      borderLeft: i === selected ? '2px solid var(--sky)' : '2px solid transparent',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={() => setSelected(i)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: TYPE_COLOR[r.type], flexShrink: 0 }}>
                      {r.icon}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#fff', fontWeight: 500 }}>{r.title}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.45)', marginTop: '2px' }}>{r.desc}</div>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.15em',
                      color: TYPE_COLOR[r.type], padding: '2px 6px',
                      border: `1px solid ${TYPE_COLOR[r.type]}44`,
                      background: `${TYPE_COLOR[r.type]}11`,
                      flexShrink: 0,
                    }}>{r.type}</span>
                    {i === selected && (
                      <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'rgba(56,189,248,0.5)', flexShrink: 0 }}>arrow_forward</span>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {query && results.length === 0 && (
              <div style={{ padding: '32px', textAlign: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'rgba(189,200,209,0.15)', display: 'block', marginBottom: '10px' }}>search_off</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.2em' }}>
                  NO RESULTS FOR "{query.toUpperCase()}"
                </div>
              </div>
            )}

            {/* Default empty state */}
            {!query && (
              <div style={{ padding: '20px 18px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.35)', letterSpacing: '0.2em', marginBottom: '12px' }}>
                  QUICK ACCESS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Register', 'Robowars', 'Campus Map', 'Schedule', 'Ask ARIA'].map(t => (
                    <button
                      key={t}
                      onClick={() => setQuery(t)}
                      style={{
                        padding: '5px 12px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'transparent', color: 'rgba(189,200,209,0.6)',
                        fontFamily: 'var(--font-body)', fontSize: '12px',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sky)'; e.currentTarget.style.color = 'var(--sky)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(189,200,209,0.6)'; }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div style={{
              display: 'flex', gap: '16px', padding: '8px 18px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.3)',
            }}>
              {[['↑↓', 'Navigate'], ['↵', 'Open'], ['Esc', 'Close']].map(([key, label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(56,189,248,0.6)',
                    padding: '1px 5px', border: '1px solid rgba(56,189,248,0.2)',
                  }}>{key}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.35)' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
