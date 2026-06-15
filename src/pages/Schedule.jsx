/* Techfest 2026 — Telemetry Log 21 // EVENT SCHEDULE TIMELINE */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const DAYS = [
  { id: 'D1', label: 'DAY 01', date: 'DEC 26, 2025' },
  { id: 'D2', label: 'DAY 02', date: 'DEC 27, 2025' },
  { id: 'D3', label: 'DAY 03', date: 'DEC 28, 2025' },
  { id: 'D4', label: 'DAY 04', date: 'DEC 29, 2025' },
];

const EVENTS = [
  // Day 1
  { id: 'e1',  day: 'D1', time: '09:00', duration: '60',  title: 'INAUGURAL CEREMONY',         venue: 'Convocation Hall',      type: 'CEREMONY',     color: '#fbbf24', desc: 'Grand opening with the Director of IIT Bombay, light-up drone show, and the symbolic ignition of the Techfest flame.' },
  { id: 'e2',  day: 'D1', time: '11:00', duration: '90',  title: 'KEYNOTE: AI & THE FUTURE',   venue: 'Lecture Hall Complex',  type: 'LECTURE',      color: '#a855f7', desc: 'A futurist keynote address on the convergence of artificial general intelligence and autonomous systems by a leading AI researcher.' },
  { id: 'e3',  day: 'D1', time: '13:30', duration: '120', title: 'ROBOWARS QF — TITAN CLASS',  venue: 'Sports Complex Bay-A',  type: 'COMPETITION',  color: '#ff2d55', desc: 'First round of quarter-finals for the 120kg Titan Class. 8 matches across the main arena with full audience access.' },
  { id: 'e4',  day: 'D1', time: '16:00', duration: '180', title: 'HACKATHON — PHASE 1 STARTS', venue: 'Student Activity Center', type: 'HACKATHON',  color: '#00f2ff', desc: 'The 36-hour hackathon kicks off! Problem statements unlocked live on the main display. Teams have until Day 2 night.' },
  { id: 'e5',  day: 'D1', time: '20:00', duration: '90',  title: 'CULTURAL NIGHT — OPENING',  venue: 'Open Ground Stage',     type: 'CULTURAL',     color: '#00f5c4', desc: 'Musical performances, fusion dance battles, and a laser light show to cap off the first day of Techfest.' },

  // Day 2
  { id: 'e6',  day: 'D2', time: '09:30', duration: '60',  title: 'WORKSHOP: PCB MASTERY',     venue: 'LHC Room 101',          type: 'WORKSHOP',     color: '#6ee7b7', desc: 'Hands-on PCB design and fabrication from schematic to physical board. Limited to 40 participants.' },
  { id: 'e7',  day: 'D2', time: '11:00', duration: '60',  title: 'LECTURE: DARK MATTER',       venue: 'Convocation Hall',      type: 'LECTURE',      color: '#a855f7', desc: 'A groundbreaking talk by a CERN physicist on the latest discoveries in dark matter detection experiments.' },
  { id: 'e8',  day: 'D2', time: '12:30', duration: '120', title: 'ROBOWARS SF — TITAN CLASS',  venue: 'Sports Complex Bay-A',  type: 'COMPETITION',  color: '#ff2d55', desc: 'Two brutal semi-final clashes for the Titan class. The winner advances to the Grand Final tomorrow night.' },
  { id: 'e9',  day: 'D2', time: '14:30', duration: '90',  title: 'SCIENCE EXHIBITION OPEN',   venue: 'Exhibition Zone',       type: 'EXHIBITION',   color: '#ff8c00', desc: 'Full public access to the student project exposition. 150+ projects across robotics, biotech, and space tech.' },
  { id: 'e10', day: 'D2', time: '17:00', duration: '60',  title: 'WORKSHOP: ML FOR ROBOTICS', venue: 'LHC Room 203',          type: 'WORKSHOP',     color: '#6ee7b7', desc: 'An intensive applied machine learning workshop for embedded systems and autonomous robot navigation.' },
  { id: 'e11', day: 'D2', time: '22:00', duration: '60',  title: 'HACKATHON FINAL PUSH',      venue: 'Student Activity Center', type: 'HACKATHON', color: '#00f2ff', desc: 'The final sprint of the hackathon. Mentors make their final rounds. Project submission window opens at midnight.' },

  // Day 3
  { id: 'e12', day: 'D3', time: '09:00', duration: '90',  title: 'HACKATHON — PRESENTATIONS', venue: 'Lecture Hall Complex',  type: 'HACKATHON',    color: '#00f2ff', desc: 'Top 20 hackathon teams present their prototypes to a panel of industry judges from Google, ISRO, and Tata Motors.' },
  { id: 'e13', day: 'D3', time: '12:00', duration: '60',  title: 'PANEL: SPACE EXPLORATION',  venue: 'Convocation Hall',      type: 'LECTURE',      color: '#a855f7', desc: 'A panel discussion featuring ex-ISRO scientists and NASA engineers on commercial space and the Mars mission.' },
  { id: 'e14', day: 'D3', time: '14:00', duration: '120', title: 'ROBOWARS QF — HEAVY/FEATHER', venue: 'Sports Complex',    type: 'COMPETITION',  color: '#ff2d55', desc: 'Quarter-final matchups for the 60kg Heavyweight and 15kg Featherweight classes in parallel arenas.' },
  { id: 'e15', day: 'D3', time: '17:00', duration: '60',  title: 'DRONE RACING FINAL HEATS',  venue: 'Sports Complex Bay-B',  type: 'COMPETITION',  color: '#00f5c4', desc: 'The top 8 drone pilots compete in an electrifying FPV race through the custom obstacle course.' },
  { id: 'e16', day: 'D3', time: '20:00', duration: '90',  title: 'HACKATHON AWARDS',          venue: 'Convocation Hall',      type: 'CEREMONY',     color: '#fbbf24', desc: 'Live hackathon winner announcement with ₹10L in prizes. Watch the top team\'s prototype get demonstrated live on stage.' },

  // Day 4
  { id: 'e17', day: 'D4', time: '10:00', duration: '120', title: 'ROBOWARS GRAND FINALS',     venue: 'Sports Complex Bay-A',  type: 'COMPETITION',  color: '#ff2d55', desc: 'The ultimate showdown. Titan, Heavyweight, and Featherweight champions are crowned in back-to-back finals.' },
  { id: 'e18', day: 'D4', time: '13:00', duration: '60',  title: 'WORKSHOP: QUANTUM COMPUTING', venue: 'LHC Room 305',       type: 'WORKSHOP',     color: '#6ee7b7', desc: 'An introduction to quantum algorithms and qubits by a researcher from IBM Quantum Network.' },
  { id: 'e19', day: 'D4', time: '15:00', duration: '60',  title: 'CLOSING KEYNOTE',           venue: 'Convocation Hall',      type: 'LECTURE',      color: '#a855f7', desc: 'An inspiring closing talk from a renowned innovator, reflecting on the future of human-machine collaboration.' },
  { id: 'e20', day: 'D4', time: '17:30', duration: '90',  title: 'GRAND VALEDICTION',         venue: 'Open Ground Stage',     type: 'CEREMONY',     color: '#fbbf24', desc: 'The ceremonial closing of Techfest 2026. All prizes awarded, winners honoured, and a spectacular drone light display finale.' },
];

const TYPE_COLOR = {
  CEREMONY:    '#fbbf24',
  LECTURE:     '#a855f7',
  COMPETITION: '#ff2d55',
  HACKATHON:   '#00f2ff',
  WORKSHOP:    '#6ee7b7',
  EXHIBITION:  '#ff8c00',
  CULTURAL:    '#00f5c4',
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('D1');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [typeFilter, setTypeFilter]       = useState('ALL');

  const dayEvents = EVENTS.filter(e => e.day === activeDay);
  const filtered  = typeFilter === 'ALL' ? dayEvents : dayEvents.filter(e => e.type === typeFilter);
  const types     = ['ALL', ...new Set(EVENTS.map(e => e.type))];

  const timeToMin = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const dayStart  = 9 * 60;
  const dayEnd    = 24 * 60;
  const daySpan   = dayEnd - dayStart;

  return (
    <div className="page-section" style={{ paddingBottom: '80px', minHeight: '90vh' }}>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 13 // TEMPORAL GRID</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
        }}>
          EVENT <span style={{ color: 'var(--green)', textShadow: '0 0 20px rgba(0,245,196,0.4)' }}>SCHEDULE</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(189,200,209,0.55)', maxWidth: '520px', lineHeight: 1.7 }}>
          Complete 4-day Techfest timeline. Filter by event type, switch days, and tap any block for full details.
        </p>
      </motion.div>

      {/* DAY SELECTOR */}
      <div style={{ display: 'flex', gap: '0px', marginTop: '28px', marginBottom: '20px' }}>
        {DAYS.map(d => (
          <button
            key={d.id}
            onClick={() => { soundEffects.playClick?.(); setActiveDay(d.id); setSelectedEvent(null); }}
            style={{
              flex: 1, padding: '14px 8px', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em',
              borderBottom: `2px solid ${activeDay === d.id ? 'var(--green)' : 'rgba(255,255,255,0.1)'}`,
              background: activeDay === d.id ? 'rgba(0,245,196,0.06)' : 'rgba(255,255,255,0.02)',
              color: activeDay === d.id ? 'var(--green)' : 'rgba(189,200,209,0.5)',
              transition: 'all 0.25s',
            }}
          >
            <div>{d.label}</div>
            <div style={{ fontSize: '7px', marginTop: '3px', opacity: 0.7 }}>{d.date}</div>
          </button>
        ))}
      </div>

      {/* TYPE FILTER */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {types.map(t => (
          <button
            key={t}
            onClick={() => { soundEffects.playClick?.(); setTypeFilter(t); }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em',
              padding: '4px 10px', cursor: 'pointer', borderRadius: '0px',
              border: `1px solid ${typeFilter === t ? (TYPE_COLOR[t] || 'var(--sky)') : 'rgba(255,255,255,0.08)'}`,
              background: typeFilter === t ? `${TYPE_COLOR[t] || 'var(--sky)'}18` : 'transparent',
              color: typeFilter === t ? (TYPE_COLOR[t] || 'var(--sky)') : 'rgba(189,200,209,0.45)',
              transition: 'all 0.2s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TIMELINE GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedEvent ? '1fr 320px' : '1fr', gap: '20px', alignItems: 'start' }}>

        {/* Timeline column */}
        <div>
          {/* Time ruler */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: '8px' }}>
            {['09:00', '11:00', '13:00', '16:00', '19:00', '22:00'].map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.1em' }}>{t}</span>
            ))}
          </div>

          {/* Event blocks */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay + typeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'relative', minHeight: '420px', borderLeft: '1px solid rgba(56,189,248,0.15)' }}
            >
              {filtered.map((evt, idx) => {
                const startMin  = timeToMin(evt.time);
                const leftPct   = ((startMin - dayStart) / daySpan) * 100;
                const widthPct  = (parseInt(evt.duration) / daySpan) * 100;
                const isSelected = selectedEvent?.id === evt.id;

                return (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => { soundEffects.playClick?.(); setSelectedEvent(isSelected ? null : evt); }}
                    style={{
                      position: 'absolute',
                      left: `${Math.min(leftPct, 95)}%`,
                      width: `${Math.max(widthPct, 4)}%`,
                      top: `${(idx % 5) * 72 + 8}px`,
                      height: '60px',
                      border: `1px solid ${isSelected ? evt.color : evt.color + '55'}`,
                      background: isSelected ? `${evt.color}22` : `${evt.color}0d`,
                      cursor: 'pointer',
                      padding: '8px 10px',
                      boxShadow: isSelected ? `0 0 16px ${evt.color}44` : 'none',
                      transition: 'all 0.25s',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: evt.color, letterSpacing: '0.15em', marginBottom: '3px' }}>
                      {evt.time} • {evt.type}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, color: '#fff', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {evt.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(189,200,209,0.5)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {evt.venue}
                    </div>
                  </motion.div>
                );
              })}

              {filtered.length === 0 && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'rgba(189,200,209,0.15)' }}>calendar_today</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.2em' }}>
                    NO EVENTS MATCH FILTER
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Event detail panel */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              key={selectedEvent.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{
                border: `1px solid ${selectedEvent.color}44`,
                background: 'rgba(14,14,18,0.97)',
                padding: '24px',
                position: 'relative',
                boxShadow: `0 0 24px ${selectedEvent.color}18`,
              }}
            >
              <div className="bracket-tl" style={{ borderColor: selectedEvent.color }} />
              <div className="bracket-tr" style={{ borderColor: selectedEvent.color }} />
              <div className="bracket-bl" style={{ borderColor: selectedEvent.color }} />
              <div className="bracket-br" style={{ borderColor: selectedEvent.color }} />

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '3px 10px', marginBottom: '16px',
                border: `1px solid ${selectedEvent.color}55`,
                background: `${selectedEvent.color}11`,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: selectedEvent.color, letterSpacing: '0.2em' }}>
                  {selectedEvent.type}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800,
                color: '#fff', lineHeight: 1.2, marginBottom: '16px',
              }}>
                {selectedEvent.title}
              </h3>

              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '14px', marginBottom: '14px' }}>
                <div className="readout-row" style={{ marginBottom: '8px' }}>
                  <span className="readout-label">TIME</span>
                  <span className="readout-val">{selectedEvent.time} ({selectedEvent.duration} min)</span>
                </div>
                <div className="readout-row" style={{ marginBottom: '8px' }}>
                  <span className="readout-label">VENUE</span>
                  <span className="readout-val">{selectedEvent.venue}</span>
                </div>
                <div className="readout-row">
                  <span className="readout-label">DAY</span>
                  <span className="readout-val">{DAYS.find(d => d.id === selectedEvent.day)?.date}</span>
                </div>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '12px',
                color: 'rgba(189,200,209,0.7)', lineHeight: 1.7,
                marginBottom: '20px',
              }}>
                {selectedEvent.desc}
              </p>

              <button
                className="hud-btn active"
                style={{ width: '100%', borderColor: selectedEvent.color, color: selectedEvent.color }}
              >
                <span>ADD TO CALENDAR</span>
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_add_on</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
