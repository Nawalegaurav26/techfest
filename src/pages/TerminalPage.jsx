import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_SEQUENCE = [
  '> INITIALIZING TECHFEST AI CORE v2.6.0...',
  '> NEURAL NETWORK: ONLINE',
  '> QUANTUM PROCESSOR: ACTIVE',
  '> KNOWLEDGE BASE: LOADED [TECHFEST 2026]',
  '> CONNECTING TO CYBORG INTELLIGENCE...',
  '> CONNECTION ESTABLISHED. WELCOME.',
  '',
  'Type a command or ask me anything about Techfest 2026.',
  'Type "help" for available commands.',
];

const COMMAND_RESPONSES = {
  help: `AVAILABLE COMMANDS:
  ┌─────────────────────────────────────────┐
  │  events       → List all events         │
  │  competitions → View competitions       │
  │  workshops    → Browse workshops        │
  │  schedule     → View event schedule     │
  │  venue        → Campus & directions     │
  │  prizes       → Prize pool details      │
  │  register     → Registration info       │
  │  contact      → Contact details         │
  │  telemetry    → System health check     │
  │  evolution    → Cybernetic protocol     │
  │  clear        → Clear terminal          │
  │  matrix       → ???                     │
  └─────────────────────────────────────────┘`,

  events: `TECHFEST 2026 EVENTS [250+]:
  ◆ ROBOTICS OLYMPIAD     → DEC 22 // ₹2,00,000
  ◆ QUANTUM HACKATHON     → DEC 22 // ₹1,50,000
  ◆ NEON GENESIS SHOWCASE → DEC 23 // ₹80,000
  ◆ NEURAL NETWORK WARS   → DEC 21 // ₹50,000
  ◆ CYBERZONE ESPORTS     → DEC 24 // ₹3,00,000
  ◆ SPACE TECH CHALLENGE  → DEC 23 // ₹1,00,000
  [Navigate to /events for full listing]`,

  competitions: `WAR ROOM — ACTIVE COMPETITIONS:
  ⚔ ROBOWAR SIGMA       → EXTREME // ₹3,00,000 // 64 SLOTS
  ⚔ CODE BREACH         → HARD    // ₹1,50,000 // 256 SLOTS
  ⚔ NEURAL WARS         → EXTREME // ₹2,50,000 // 128 SLOTS
  ⚔ AEROBOT PRIME       → HARD    // ₹1,20,000 // 48 SLOTS
  ⚔ DATAVAULT HEIST     → MEDIUM  // ₹80,000   // 500 SLOTS
  ⚔ SPACE ODYSSEY       → HARD    // ₹2,00,000 // 80 SLOTS
  TOTAL PRIZE POOL: ₹16,00,000+`,

  workshops: `RESEARCH LABORATORY — WORKSHOPS:
  ⬣ NEURAL ARCHITECTURE  → DEC 22 // FREE  // 40 SEATS
  ⬣ QUANTUM COMPUTING    → DEC 23 // ₹500  // 30 SEATS
  ⬣ AUTONOMOUS SYSTEMS   → DEC 22 // ₹800  // 24 SEATS
  ⬣ BLOCKCHAIN & WEB3    → DEC 24 // ₹300  // 60 SEATS
  ⬣ BIOINFORMATICS + AI  → DEC 23 // FREE  // 35 SEATS
  ⬣ COMPUTER VISION      → DEC 24 // ₹400  // 45 SEATS`,

  schedule: `TECHFEST 2026 SCHEDULE:
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DEC 21 [ARRIVAL DAY]
  	14:00 → Check-in opens
  	18:00 → Opening ceremony
  	20:00 → Welcome keynote
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DEC 22 [DAY 1]
  	09:00 → Competitions begin
  	10:00 → Workshops — Batch A
  	18:00 → Tech talks
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DEC 23 [DAY 2]
  	09:00 → Day 2 competitions
  	18:00 → Cultural showcase
  	22:00 → Hackathon night
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DEC 24 [DAY 3 — FINALE]
  	12:00 → Finals + prize distribution
  	18:00 → Closing ceremony`,

  venue: `LOCATION DATA:
  INSTITUTE  : IIT Bombay
  ADDRESS    : Powai, Mumbai, Maharashtra 400076
  COORDINATES: 19.1334° N, 72.9133° E
  ─────────────────────────────────────────
  NEAREST AIRPORT: CSIA (Chhatrapati Shivaji)
  				 ~12 km · 25 min by taxi
  NEAREST METRO  : Powai (Line 6) · 3 min walk
  NEAREST TRAIN  : LTT / Kurla Terminus · 8 km`,

  prizes: `PRIZE POOL BREAKDOWN:
  ╔════════════════════════════════════════╗
  ║  TOTAL PRIZE POOL   →  ₹1,00,00,000+  ║
  ╠════════════════════════════════════════╣
  ║  ROBOWAR SIGMA      →  ₹3,00,000      ║
  ║  NEURAL WARS        →  ₹2,50,000      ║
  ║  ROBOTICS OLYMPIAD  →  ₹2,00,000      ║
  ║  SPACE ODYSSEY      →  ₹2,00,000      ║
  ║  CODE BREACH        →  ₹1,50,000      ║
  ║  + 245 MORE EVENTS  →  ₹90,00,000+    ║
  ╚════════════════════════════════════════╝`,

  register: `REGISTRATION PROTOCOL:
  STATUS: OPEN
  ──────────────────────────────────────────
  STEP 1 → Create account at techfest.org
  STEP 2 → Select your events/competitions
  STEP 3 → Complete payment (if applicable)
  STEP 4 → Receive confirmation + QR code
  STEP 5 → Report to venue on DEC 21 14:00
  ──────────────────────────────────────────
  REGISTRATION FEE: ₹200 (covers all 3 days)
  EARLY BIRD (before DEC 01): FREE`,

  contact: `COMM CHANNELS:
  📡 techfest@iitb.ac.in      [GENERAL]
  ⚔  competitions@techfest.org [COMPETITIONS]
  ◈  sponsors@techfest.org     [SPONSORS]
  ⬡  accommodation@techfest.org [HOTEL]
  ☎  +91 98765 43210            [HELPLINE]`,

  evolution: `[EVOLUTION PROTOCOL PROTO-01]
  "The boundary between carbon and silicon is dissolving.
  Welcome to Techfest 2026. The neural network is fully synced."
  Type "matrix" to witness the digital rain stream.`,

  telemetry: `SYSTEM TELEMETRY REPORT:
  =============================
  CORE TEMPERATURE    →  34.5°C
  QUANTUM SYNC RATIO  →  98.74%
  ACTIVE NODES        │  4,096
  RESPONSE LATENCY    │  2.14ms
  DATABASE STATUS     │  OK [SUPABASE CONNECTED]
  FIREWALL SECURITY   │  ACTIVE [MAX SHIELD]
  =============================`,

  matrix: `
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀
  ⠀⠀⠀⠀⣿⣿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⣿⣿⣿⠀⠀⠀
  ⠀⠀⠀⠀⣿⣿⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣿⣿⣿⠀⠀⠀
  THE MATRIX IS JUST THE BEGINNING.
  TECHFEST 2026 — THE REAL SIMULATION.`,
};

const AI_RESPONSES = {
  default: (q) => `Analyzing: "${q}"
  
  I'm the Techfest 2026 AI core. For best results, use specific commands.
  Type "help" to see all available commands.
  Or ask me: "What are the top events?" / "How do I register?"`,
};

function processCommand(input) {
  const cmd = input.toLowerCase().trim();
  if (cmd === 'clear') return null;
  if (COMMAND_RESPONSES[cmd]) return COMMAND_RESPONSES[cmd];

  // Natural language hints
  if (cmd.includes('evolution')) return COMMAND_RESPONSES.evolution;
  if (cmd.includes('telemetry') || cmd.includes('status') || cmd.includes('health')) return COMMAND_RESPONSES.telemetry;

  // Natural language hints
  if (cmd.includes('event')) return COMMAND_RESPONSES.events;
  if (cmd.includes('competition') || cmd.includes('contest')) return COMMAND_RESPONSES.competitions;
  if (cmd.includes('workshop') || cmd.includes('lab')) return COMMAND_RESPONSES.workshops;
  if (cmd.includes('prize') || cmd.includes('money')) return COMMAND_RESPONSES.prizes;
  if (cmd.includes('where') || cmd.includes('location') || cmd.includes('venue')) return COMMAND_RESPONSES.venue;
  if (cmd.includes('register') || cmd.includes('signup') || cmd.includes('how')) return COMMAND_RESPONSES.register;
  if (cmd.includes('schedule') || cmd.includes('time') || cmd.includes('when')) return COMMAND_RESPONSES.schedule;
  if (cmd.includes('contact') || cmd.includes('email') || cmd.includes('phone')) return COMMAND_RESPONSES.contact;

  return AI_RESPONSES.default(input);
}

export default function TerminalPage() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [booting, setBooting] = useState(true);
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, { type: 'system', text: BOOT_SEQUENCE[i] }]);
        i++;
        setTimeout(tick, 120);
      } else {
        setBooting(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };
    setTimeout(tick, 400);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    setHistory(prev => [cmd, ...prev]);
    setHistIdx(-1);

    setLines(prev => [...prev, { type: 'input', text: `> ${cmd}` }]);

    if (cmd.toLowerCase() === 'clear') {
      setTimeout(() => setLines([{ type: 'system', text: '> TERMINAL CLEARED. SYSTEM READY.' }]), 100);
    } else {
      const response = processCommand(cmd);
      setTimeout(() => {
        setLines(prev => [...prev, { type: 'output', text: response }]);
      }, 200);
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(newIdx);
      setInput(history[newIdx] || '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx] || '');
    }
  };

  return (
    <div
      className="page-section"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: '80px' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: '20px' }}>
        <div className="section-tag" style={{ marginBottom: '12px' }}>MODULE 07 // NEURAL INTERFACE</div>
        <h1 className="section-title">AI TERMINAL</h1>
      </motion.div>

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          flex: 1,
          minHeight: '65vh',
          display: 'flex', flexDirection: 'column',
          background: 'rgba(0, 4, 8, 0.85)',
          border: '1px solid rgba(0,242,255,0.2)',
          backdropFilter: 'blur(16px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Window title bar */}
        <div style={{
          padding: '10px 16px',
          borderBottom: '1px solid rgba(0,242,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(0,242,255,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['#ff4444', '#ffaa00', '#00ff41'].map(c => (
              <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
            ))}
          </div>
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(0,242,255,0.5)' }}>
            TECHFEST AI CORE // v2.6.0
          </span>
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '8px', color: 'rgba(0,255,65,0.5)' }}>
            ● CONNECTED
          </span>
        </div>

        {/* Output area */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: 'clamp(10px, 4vw, 20px)',
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: 'clamp(9px, 3.2vw, 13px)',
          lineHeight: 1.6,
        }}>
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  color: line.type === 'input'
                    ? '#ffffff'
                    : line.type === 'system'
                    ? 'rgba(0,242,255,0.7)'
                    : 'rgba(0,255,65,0.85)',
                  marginBottom: line.text === '' ? '8px' : '2px',
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        {!booting && (
          <form
            onSubmit={handleSubmit}
            style={{
              borderTop: '1px solid rgba(0,242,255,0.1)',
              padding: '12px clamp(10px, 4vw, 20px)',
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(0,242,255,0.03)',
            }}
          >
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 'clamp(10px, 3.2vw, 13px)', color: '#00f2ff', whiteSpace: 'nowrap' }}>
              TF26@AI:~$
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal command input"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: 'Share Tech Mono, monospace', fontSize: 'clamp(10px, 3.2vw, 13px)',
                color: '#fff', letterSpacing: '0.05em',
              }}
            />
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ width: 8, height: 16, background: '#00f2ff' }}
            />
          </form>
        )}
      </motion.div>
    </div>
  );
}
