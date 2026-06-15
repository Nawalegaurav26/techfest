/* Techfest 2026 — Telemetry Log 19 // TACTICAL CAMPUS MAP */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const VENUES = [
  {
    id: 'v1',
    name: 'CONVOCATION HALL',
    code: 'CVH.01',
    x: 38,
    y: 22,
    type: 'MAIN_STAGE',
    color: '#00f2ff',
    capacity: '5000',
    events: ['Flagship Lectures', 'Keynote Addresses', 'Awards Ceremony'],
    status: 'ACTIVE',
    coordinates: '19.1327° N, 72.9143° E',
    access: 'OPEN TO ALL',
  },
  {
    id: 'v2',
    name: 'LECTURE HALL COMPLEX',
    code: 'LHC.02',
    x: 62,
    y: 18,
    type: 'WORKSHOP',
    color: '#a855f7',
    capacity: '1200',
    events: ['Workshops', 'Tech Talks', 'Panel Discussions'],
    status: 'ACTIVE',
    coordinates: '19.1334° N, 72.9155° E',
    access: 'REGISTERED ONLY',
  },
  {
    id: 'v3',
    name: 'SPORTS COMPLEX',
    code: 'SPC.03',
    x: 22,
    y: 55,
    type: 'COMPETITION',
    color: '#ff2d55',
    capacity: '8000',
    events: ['Robowars Arena', 'RC Racing', 'Drone Battles'],
    status: 'ACTIVE',
    coordinates: '19.1308° N, 72.9131° E',
    access: 'OPEN TO ALL',
  },
  {
    id: 'v4',
    name: 'GROUND — EXHIBITION ZONE',
    code: 'EXH.04',
    x: 72,
    y: 58,
    type: 'EXHIBITION',
    color: '#ff8c00',
    capacity: '3000',
    events: ['Science Exhibition', 'Project Showcase', 'Industry Stalls'],
    status: 'ACTIVE',
    coordinates: '19.1315° N, 72.9162° E',
    access: 'OPEN TO ALL',
  },
  {
    id: 'v5',
    name: 'STUDENT ACTIVITY CENTER',
    code: 'SAC.05',
    x: 48,
    y: 72,
    type: 'GENERAL',
    color: '#00f5c4',
    capacity: '2000',
    events: ['Cultural Events', 'Food Courts', 'Merchandise Store'],
    status: 'ACTIVE',
    coordinates: '19.1302° N, 72.9149° E',
    access: 'OPEN TO ALL',
  },
  {
    id: 'v6',
    name: 'HOSTEL ZONE H12',
    code: 'HST.06',
    x: 82,
    y: 38,
    type: 'ACCOMMODATION',
    color: '#6ee7b7',
    capacity: '800',
    events: ['Accommodation', 'Registration Desk'],
    status: 'STANDBY',
    coordinates: '19.1342° N, 72.9172° E',
    access: 'REGISTERED ONLY',
  },
  {
    id: 'v7',
    name: 'MAIN GATE ENTRY',
    code: 'GATE.07',
    x: 50,
    y: 92,
    type: 'ENTRY',
    color: '#fbbf24',
    capacity: '—',
    events: ['Registration & ID Verification', 'Security Checkpoint'],
    status: 'ACTIVE',
    coordinates: '19.1289° N, 72.9149° E',
    access: 'OPEN TO ALL',
  },
];

const TYPE_ICONS = {
  MAIN_STAGE:    'stadium',
  WORKSHOP:      'school',
  COMPETITION:   'sports_esports',
  EXHIBITION:    'precision_manufacturing',
  GENERAL:       'store',
  ACCOMMODATION: 'hotel',
  ENTRY:         'login',
};

const STATUS_COLOR = {
  ACTIVE:  '#00f5c4',
  STANDBY: '#fbbf24',
  OFFLINE: '#ff2d55',
};

export default function CampusMap() {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [radarAngle, setRadarAngle] = useState(0);
  const [pulseTick, setPulseTick] = useState(0);
  const rafRef = useRef();
  const startRef = useRef(performance.now());

  useEffect(() => {
    const animate = (ts) => {
      const elapsed = ts - startRef.current;
      setRadarAngle((elapsed * 0.06) % 360);
      setPulseTick(Math.floor(elapsed / 800) % 2);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const FILTERS = ['ALL', 'MAIN_STAGE', 'WORKSHOP', 'COMPETITION', 'EXHIBITION', 'ACCOMMODATION'];

  const filteredVenues = filter === 'ALL' ? VENUES : VENUES.filter(v => v.type === filter);

  const handleSelectVenue = (venue) => {
    soundEffects.playClick?.();
    setSelectedVenue(prev => prev?.id === venue.id ? null : venue);
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px', minHeight: '90vh' }}>

      {/* ── HEADER ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '32px' }}
      >
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 11 // TACTICAL GRID</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          marginBottom: '12px',
        }}>
          CAMPUS <span style={{ color: 'var(--sky)', textShadow: '0 0 20px rgba(56,189,248,0.4)' }}>TACTICAL MAP</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'rgba(189,200,209,0.55)',
          maxWidth: '520px',
          lineHeight: 1.7,
        }}>
          Holographic overhead scan of the IIT Bombay Campus. Select a venue node to access telemetry data, event listings, and access protocols.
        </p>
      </motion.div>

      {/* ── FILTER BAR ──────────────────────────────── */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => { soundEffects.playClick?.(); setFilter(f); }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              padding: '6px 12px',
              border: `1px solid ${filter === f ? 'var(--sky)' : 'rgba(255,255,255,0.12)'}`,
              background: filter === f ? 'rgba(56,189,248,0.1)' : 'transparent',
              color: filter === f ? 'var(--sky)' : 'rgba(189,200,209,0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRadius: '0px',
            }}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* ── MAP + DETAIL GRID ───────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedVenue ? '1fr 340px' : '1fr',
        gap: '20px',
        alignItems: 'start',
        transition: 'grid-template-columns 0.4s ease',
      }}>

        {/* MAP CANVAS */}
        <motion.div
          layout
          style={{
            position: 'relative',
            border: '1px solid rgba(56,189,248,0.2)',
            background: 'linear-gradient(135deg, rgba(14,14,18,0.98) 0%, rgba(8,12,20,0.99) 100%)',
            overflow: 'hidden',
            aspectRatio: '16/9',
            minHeight: '340px',
          }}
        >
          {/* L-bracket corners */}
          <div className="bracket-tl" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px' }} />
          <div className="bracket-tr" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px' }} />
          <div className="bracket-bl" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px' }} />
          <div className="bracket-br" style={{ borderColor: 'var(--sky)', width: '20px', height: '20px' }} />

          {/* HUD header bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 16px',
            borderBottom: '1px solid rgba(56,189,248,0.12)',
            background: 'rgba(56,189,248,0.04)',
            zIndex: 10,
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--sky)', letterSpacing: '0.2em' }}>
              IITB TACTICAL OVERLAY // GRID REF: 19.13°N 72.91°E
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: pulseTick === 0 ? '#00f5c4' : 'rgba(0,245,196,0.3)',
                display: 'inline-block',
                boxShadow: pulseTick === 0 ? '0 0 8px #00f5c4' : 'none',
                transition: 'all 0.4s',
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.5)' }}>
                LIVE FEED
              </span>
            </div>
          </div>

          {/* SVG map */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          >
            {/* Grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i}>
                <line
                  x1={i * 10} y1="0" x2={i * 10} y2="100"
                  stroke="rgba(56,189,248,0.05)" strokeWidth="0.3"
                />
                <line
                  x1="0" y1={i * 10} x2="100" y2={i * 10}
                  stroke="rgba(56,189,248,0.05)" strokeWidth="0.3"
                />
              </g>
            ))}

            {/* Radar sweep */}
            <defs>
              <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(56,189,248,0.18)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0)" />
              </radialGradient>
              <clipPath id="circClip">
                <circle cx="50" cy="50" r="50" />
              </clipPath>
            </defs>

            <g clipPath="url(#circClip)">
              <line
                x1="50" y1="50"
                x2={50 + 70 * Math.cos((radarAngle - 90) * Math.PI / 180)}
                y2={50 + 70 * Math.sin((radarAngle - 90) * Math.PI / 180)}
                stroke="rgba(56,189,248,0.5)"
                strokeWidth="0.5"
              />
              <path
                d={`M 50 50 L ${50 + 70 * Math.cos((radarAngle - 90) * Math.PI / 180)} ${50 + 70 * Math.sin((radarAngle - 90) * Math.PI / 180)} A 70 70 0 0 0 ${50 + 70 * Math.cos((radarAngle - 90 - 40) * Math.PI / 180)} ${50 + 70 * Math.sin((radarAngle - 90 - 40) * Math.PI / 180)} Z`}
                fill="url(#radarGrad)"
              />
            </g>

            {/* Road paths */}
            <path d="M 50 92 L 50 72" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
            <path d="M 50 72 L 38 55 L 22 55" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
            <path d="M 50 72 L 72 58" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
            <path d="M 50 72 L 48 45 L 38 22" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
            <path d="M 48 45 L 62 18" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
            <path d="M 62 18 L 82 38" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />

            {/* Campus boundary */}
            <rect
              x="8" y="10" width="84" height="82"
              fill="none"
              stroke="rgba(56,189,248,0.12)"
              strokeWidth="0.6"
              strokeDasharray="3,3"
            />

            {/* Venue markers */}
            {filteredVenues.map((venue) => {
              const isSelected = selectedVenue?.id === venue.id;
              return (
                <g
                  key={venue.id}
                  onClick={() => handleSelectVenue(venue)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Ping ring */}
                  <circle
                    cx={venue.x}
                    cy={venue.y}
                    r={isSelected ? 5 : 3.5}
                    fill="none"
                    stroke={venue.color}
                    strokeWidth="0.5"
                    opacity="0.5"
                    style={{
                      animation: isSelected ? 'none' : `mapPing 2s ease-out infinite`,
                    }}
                  />
                  {/* Core dot */}
                  <circle
                    cx={venue.x}
                    cy={venue.y}
                    r={isSelected ? 2.5 : 1.8}
                    fill={venue.color}
                    opacity={isSelected ? 1 : 0.85}
                    style={{ filter: `drop-shadow(0 0 3px ${venue.color})` }}
                  />
                  {/* Label */}
                  <text
                    x={venue.x + 3.5}
                    y={venue.y - 2.5}
                    fill={venue.color}
                    fontSize="2.8"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="700"
                    opacity={isSelected ? 1 : 0.8}
                  >
                    {venue.code}
                  </text>
                </g>
              );
            })}

            {/* Compass */}
            <text x="91" y="14" fill="rgba(56,189,248,0.4)" fontSize="3" fontFamily="JetBrains Mono, monospace">N</text>
            <line x1="93" y1="16" x2="93" y2="10" stroke="rgba(56,189,248,0.3)" strokeWidth="0.5" />
          </svg>

          {/* Bottom HUD bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '6px 16px',
            borderTop: '1px solid rgba(56,189,248,0.1)',
            background: 'rgba(5,5,8,0.8)',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.4)' }}>
              VENUES: {filteredVenues.length} / ACTIVE: {filteredVenues.filter(v => v.status === 'ACTIVE').length}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(56,189,248,0.5)' }}>
              ZOOM 1:1 // OVERLAY MODE
            </span>
          </div>
        </motion.div>

        {/* VENUE DETAIL PANEL */}
        <AnimatePresence>
          {selectedVenue && (
            <motion.div
              key={selectedVenue.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                border: `1px solid ${selectedVenue.color}44`,
                background: 'rgba(14,14,18,0.95)',
                padding: '24px',
                position: 'relative',
                boxShadow: `0 0 30px ${selectedVenue.color}1a`,
              }}
            >
              <div className="bracket-tl" style={{ borderColor: selectedVenue.color }} />
              <div className="bracket-tr" style={{ borderColor: selectedVenue.color }} />
              <div className="bracket-bl" style={{ borderColor: selectedVenue.color }} />
              <div className="bracket-br" style={{ borderColor: selectedVenue.color }} />

              {/* Venue type badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '3px 10px',
                border: `1px solid ${selectedVenue.color}55`,
                background: `${selectedVenue.color}11`,
                marginBottom: '16px',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '12px', color: selectedVenue.color }}>
                  {TYPE_ICONS[selectedVenue.type] || 'place'}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: selectedVenue.color, letterSpacing: '0.2em' }}>
                  {selectedVenue.type.replace('_', ' ')}
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '4px',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}>
                {selectedVenue.name}
              </h2>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: selectedVenue.color, letterSpacing: '0.2em', marginBottom: '20px' }}>
                {selectedVenue.code}
              </div>

              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '16px', marginBottom: '16px' }}>
                <div className="readout-row" style={{ marginBottom: '10px' }}>
                  <span className="readout-label">STATUS</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
                    color: STATUS_COLOR[selectedVenue.status],
                  }}>
                    ● {selectedVenue.status}
                  </span>
                </div>
                <div className="readout-row" style={{ marginBottom: '10px' }}>
                  <span className="readout-label">CAPACITY</span>
                  <span className="readout-val">{selectedVenue.capacity}</span>
                </div>
                <div className="readout-row" style={{ marginBottom: '10px' }}>
                  <span className="readout-label">ACCESS</span>
                  <span className="readout-val" style={{ color: selectedVenue.access === 'OPEN TO ALL' ? '#00f5c4' : '#fbbf24' }}>
                    {selectedVenue.access}
                  </span>
                </div>
                <div className="readout-row">
                  <span className="readout-label">COORD</span>
                  <span className="readout-val" style={{ textTransform: 'none', fontSize: '9px' }}>{selectedVenue.coordinates}</span>
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.5)', letterSpacing: '0.1em', marginBottom: '10px' }}>
                HOSTED EVENTS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedVenue.events.map((evt, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '6px 10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'rgba(189,200,209,0.85)',
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', background: selectedVenue.color, display: 'inline-block', flexShrink: 0 }} />
                    {evt}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedVenue(null)}
                style={{
                  width: '100%',
                  marginTop: '20px',
                  padding: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent',
                  color: 'rgba(189,200,209,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(189,200,209,0.5)';
                }}
              >
                DESELECT NODE [ESC]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── LEGEND ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          display: 'flex', flexWrap: 'wrap', gap: '12px',
          marginTop: '24px',
          padding: '16px',
          border: '1px solid rgba(56,189,248,0.1)',
          background: 'rgba(14,14,18,0.6)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.4)', letterSpacing: '0.2em', marginRight: '8px', display: 'flex', alignItems: 'center' }}>
          LEGEND
        </div>
        {VENUES.map(v => (
          <button
            key={v.id}
            onClick={() => handleSelectVenue(v)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em',
              color: selectedVenue?.id === v.id ? '#fff' : 'rgba(189,200,209,0.6)',
              background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 0',
            }}
          >
            <span style={{ width: '6px', height: '6px', background: v.color, display: 'inline-block', boxShadow: `0 0 4px ${v.color}` }} />
            {v.code}
          </button>
        ))}
      </motion.div>

    </div>
  );
}
