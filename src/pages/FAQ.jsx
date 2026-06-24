/* Techfest 2026 — Telemetry Log 23 // FAQ AI ASSISTANT */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const KB = [
  { q: ['dates', 'when', 'schedule', 'december', 'days'], a: 'TECHFEST 2026 runs from December 26–29, 2025 at IIT Bombay, Mumbai. Day 1 kicks off with the Grand Inaugural Ceremony at Convocation Hall at 09:00 IST.' },
  { q: ['prize', 'money', 'reward', 'cash', 'winning'], a: 'Total prize pool exceeds ₹1 CRORE across all events. Robowars Titan Class: ₹6L. Hackathon: ₹10L. Drone Wars: ₹80K. Over 250+ competitions with individual prizes.' },
  { q: ['register', 'registration', 'sign up', 'enroll', 'join'], a: 'Navigate to /register to enlist your team. Registration is open now. You will need: team name, member details (email + role), institution, and a contact number. Deadline varies per event — check individual event cards.' },
  { q: ['accommodation', 'stay', 'hostel', 'housing', 'room'], a: 'Accommodation is available at IIT Bombay Hostel Zone H12. Register on the Accommodation page (/accommodation). Limited slots — first-come-first-served basis. Includes meals and 24/7 security.' },
  { q: ['robowars', 'robot', 'bot', 'combat', 'arena', 'fight'], a: 'Robowars has 3 weight classes: TITAN (120kg, ₹6L prize), HEAVYWEIGHT (60kg, ₹3.5L), FEATHERWEIGHT (15kg, ₹1.5L). Arena is at the Sports Complex Bay-A. Grand Finals on Day 4.' },
  { q: ['hackathon', 'hacking', 'code', 'coding', 'develop', 'build'], a: 'The 36-hour Hackathon kicks off Day 1 at 16:00 IST. Teams of 2–4. Problem statements unlocked live. Prize pool: ₹10L. Top 20 teams present on Day 3. Winners announced at 20:00 Day 3.' },
  { q: ['workshop', 'learn', 'training', 'hands-on', 'tutorial'], a: 'Workshops include: PCB Mastery, ML for Robotics, Quantum Computing Intro, AI Design Jam, and more. Most require pre-registration. Capacity limited to 40 participants. Check /workshops for full list.' },
  { q: ['lecture', 'speaker', 'keynote', 'talk', 'sam altman', 'guest'], a: 'Keynote speakers include: Sam Altman (OpenAI CEO) on Day 1 at Convocation Hall, CERN physicist on Dark Matter Day 2, NASA/ISRO space panel Day 3. All lectures are open to registered attendees.' },
  { q: ['ticket', 'pass', 'entry', 'fee', 'cost', 'free'], a: 'General entry to exhibitions and cultural events is FREE with Techfest ID. Competition registrations have event-specific fees (₹200–₹2000 per team). Workshops are free with registration. Day passes available at the gate.' },
  { q: ['location', 'venue', 'where', 'iit bombay', 'campus', 'map'], a: 'Techfest 2026 is at IIT Bombay, Powai, Mumbai — 19.1327°N 72.9143°E. Key venues: Convocation Hall (main stage), Sports Complex (robowars), LHC (workshops/lectures), Exhibition Zone. View the full map at /map.' },
  { q: ['team', 'members', 'size', 'solo', 'group', 'partner'], a: 'Team sizes vary by event. Robowars: up to 5. Hackathon: 2–4. Drone Wars: 2. Solo events available for Stock Market Sim and Quiz. The Registration page (/register) shows max team size per event.' },
  { q: ['contact', 'email', 'phone', 'help', 'support', 'query'], a: 'Contact the Techfest 2026 team: techfest@iitb.ac.in | +91-22-2576-4907. Social media: @techfest_iitbombay on Instagram and @Techfest_IITB on X. Response time: 24–48 hours.' },
  { q: ['drone', 'uav', 'fpv', 'rc', 'aerial'], a: 'Drone Racing Final Heats are on Day 3 at Sports Complex Bay-B at 17:00. Top 8 FPV pilots compete through a custom obstacle course. Prize: ₹80,000. Registration closes Dec 15.' },
  { q: ['exhibition', 'showcase', 'project', 'isro', 'science'], a: 'The Science Exhibition Zone is open all 4 days at the Ground Exhibition Area. 150+ student projects in robotics, biotech, space tech. Special ISRO Gaganyaan live orbital module demo at the Space Pavilion.' },
  { q: ['transport', 'bus', 'metro', 'train', 'reach', 'travel', 'how to get'], a: 'Nearest metro: Powai Metro Station. Bus: BEST routes 332, 335, 375 to IIT Bombay Gate. Taxi/auto available from Vikhroli and Ghatkopar. Parking inside campus for registered vehicles.' },
];

function getResponse(input) {
  const q = input.toLowerCase().trim();
  if (!q || q.length < 2) return null;
  
  // Greet
  if (/^(hi|hello|hey|greetings|namaste|yo)/.test(q)) {
    return 'SYSTEM ONLINE. WELCOME TO TECHFEST 2026 SUPPORT TERMINAL. I am ARIA (Autonomous Registrant Intelligence Assistant). Query the knowledge base using natural language. Type HELP to see available topics.';
  }
  if (/help|topics|commands|what can|what do/.test(q)) {
    return 'AVAILABLE KNOWLEDGE DOMAINS: [DATES] [PRIZES] [REGISTRATION] [ACCOMMODATION] [ROBOWARS] [HACKATHON] [WORKSHOPS] [LECTURES] [TICKETS] [VENUE] [TEAMS] [CONTACT] [DRONES] [EXHIBITION] [TRANSPORT] — Ask me anything about Techfest 2026.';
  }
  if (/thank|thanks|ty|great|awesome|nice/.test(q)) {
    return 'ACKNOWLEDGED. QUERY RESOLVED. Neural sync maintained. Is there anything else you need assistance with?';
  }
  if (/who are you|what are you|your name|aria/.test(q)) {
    return 'I am ARIA — Autonomous Registrant Intelligence Assistant v2.6 // Deployed by TECHFEST 2026 Systems Team // Knowledge base: 15 domains, 2026 entries // Uptime: 99.97% // Run on Techfest neural infrastructure.';
  }

  for (const entry of KB) {
    if (entry.q.some(kw => q.includes(kw))) {
      return entry.a;
    }
  }
  return null;
}

const SUGGESTIONS = [
  'When is Techfest 2026?',
  'How do I register?',
  'What is the prize pool?',
  'Tell me about Robowars',
  'How to reach IIT Bombay?',
  'Accommodation details?',
];

const BOOT_LOG = [
  '> ARIA v2.6 INITIALIZING...',
  '> Loading knowledge base [████████░░] 82%...',
  '> Loading knowledge base [██████████] 100%',
  '> 15 knowledge domains indexed',
  '> Neural inference engine: ONLINE',
  '> SYSTEM READY. Ask me anything about Techfest 2026.',
];

export default function FAQ() {
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [booting, setBooting]     = useState(true);
  const [bootLines, setBootLines] = useState([]);
  const [typing, setTyping]       = useState(false);
  const bottomRef = useRef();
  const inputRef  = useRef();

  // Boot animation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LOG.length) {
        setBootLines(prev => [...prev, BOOT_LOG[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBooting(false);
          inputRef.current?.focus();
        }, 500);
      }
    }, 380);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, bootLines]);

  const send = (text) => {
    const q = (text || input).trim();
    if (!q) return;
    soundEffects.playClick?.();
    setInput('');

    const userMsg = { role: 'user', text: q, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    const delay = 700 + Math.random() * 600;
    setTimeout(() => {
      const raw = getResponse(q);
      const reply = raw || `QUERY "${q.toUpperCase()}" — No direct match in knowledge base. Try rephrasing or type HELP to see available topics. For complex queries, contact techfest@iitb.ac.in`;
      setMessages(prev => [...prev, { role: 'aria', text: reply, id: Date.now() + 1 }]);
      setTyping(false);
    }, delay);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px', minHeight: '90vh' }}>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 15 // NEURAL SUPPORT TERMINAL</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
        }}>
          ASK <span style={{ color: 'var(--green)', textShadow: '0 0 20px rgba(0,245,196,0.4)' }}>ARIA</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#cbd5e1', maxWidth: '500px', lineHeight: 1.7 }}>
          Autonomous Registrant Intelligence Assistant — powered by the Techfest 2026 knowledge base. Ask about events, registration, venues, prizes, or logistics.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '20px', marginTop: '28px', alignItems: 'start' }}>

        {/* TERMINAL WINDOW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex', flexDirection: 'column',
            height: 'min(600px, 70vh)',
            border: '1px solid rgba(0,245,196,0.25)',
            background: 'rgba(5,8,5,0.98)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Terminal bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 16px',
            borderBottom: '1px solid rgba(0,245,196,0.15)',
            background: 'rgba(0,245,196,0.05)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => (
                <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(0,245,196,0.6)', letterSpacing: '0.2em', flex: 1, textAlign: 'center' }}>
              ARIA NEURAL TERMINAL v2.6 // TECHFEST 2026
            </span>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: booting ? '#febc2e' : '#28c840', boxShadow: `0 0 6px ${booting ? '#febc2e' : '#28c840'}` }} />
          </div>

          {/* Messages area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* Boot log */}
            {bootLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#00f5c4', lineHeight: 1.5 }}
              >
                {line}
              </motion.div>
            ))}

            {/* Messages */}
            {!booting && messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '28px', height: '28px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(56,189,248,0.4)' : 'rgba(0,245,196,0.4)'}`,
                  background: msg.role === 'user' ? 'rgba(56,189,248,0.08)' : 'rgba(0,245,196,0.08)',
                  fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
                  color: msg.role === 'user' ? 'var(--sky)' : 'var(--green)',
                }}>
                  {msg.role === 'user' ? 'YOU' : 'AI'}
                </div>

                {/* Bubble */}
                <div style={{
                  maxWidth: '75%',
                  padding: '10px 14px',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(56,189,248,0.2)' : 'rgba(0,245,196,0.2)'}`,
                  background: msg.role === 'user' ? 'rgba(56,189,248,0.06)' : 'rgba(0,245,196,0.04)',
                  fontFamily: msg.role === 'user' ? 'var(--font-mono)' : 'var(--font-body)',
                  fontSize: '14px',
                  color: '#ffffff',
                  lineHeight: 1.65,
                }}>
                  {msg.role === 'aria' && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--green)', letterSpacing: '0.2em', marginBottom: '6px' }}>
                      ARIA //
                    </div>
                  )}
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <div style={{
                  width: '28px', height: '28px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(0,245,196,0.4)', background: 'rgba(0,245,196,0.08)',
                  fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--green)',
                }}>AI</div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '10px 14px', border: '1px solid rgba(0,245,196,0.15)' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green)',
                      animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </motion.div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          {!booting && (
            <div style={{
              display: 'flex', gap: '8px', padding: '12px 16px',
              borderTop: '1px solid rgba(0,245,196,0.15)',
              background: 'rgba(0,0,0,0.4)', flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--green)', alignSelf: 'center', flexShrink: 0 }}>
                &gt;_
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your query... (Press Enter to transmit)"
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#fff',
                  caretColor: 'var(--green)',
                }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim()}
                style={{
                  padding: '6px 14px', background: 'rgba(0,245,196,0.1)',
                  border: '1px solid rgba(0,245,196,0.3)', color: 'var(--green)',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  opacity: input.trim() ? 1 : 0.4, transition: 'all 0.2s',
                }}
              >
                SEND
              </button>
            </div>
          )}
        </motion.div>

        {/* SIDEBAR: suggestions + FAQ quick links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(14,14,18,0.8)', padding: '16px' }}
          >
            <div className="hud-header" style={{ marginBottom: '12px' }}>
              <span>QUICK QUERIES</span><span>SHORTCUTS</span>
            </div>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => !booting && send(s)}
                disabled={booting}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', marginBottom: '6px',
                  border: '1px solid rgba(0,245,196,0.15)',
                  background: 'rgba(0,245,196,0.03)',
                  color: booting ? 'rgba(189,200,209,0.3)' : '#cbd5e1',
                  fontFamily: 'var(--font-body)', fontSize: '13.5px',
                  cursor: booting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!booting) { e.currentTarget.style.borderColor = 'rgba(0,245,196,0.4)'; e.currentTarget.style.color = '#fff'; }}}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,245,196,0.15)'; e.currentTarget.style.color = booting ? 'rgba(189,200,209,0.3)' : 'rgba(189,200,209,0.7)'; }}
              >
                <span style={{ color: 'var(--green)', marginRight: '6px' }}>›</span>
                {s}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(14,14,18,0.8)', padding: '16px' }}
          >
            <div className="hud-header" style={{ marginBottom: '12px' }}>
              <span>KNOWLEDGE BASE</span><span>15 DOMAINS</span>
            </div>
            {['DATES', 'PRIZES', 'REGISTRATION', 'ACCOMMODATION', 'ROBOWARS', 'HACKATHON', 'WORKSHOPS', 'LECTURES', 'TICKETS', 'VENUE', 'TRANSPORT', 'CONTACT'].map(tag => (
              <div
                key={tag}
                style={{
                  display: 'inline-block', margin: '3px',
                  padding: '2px 8px',
                  border: '1px solid rgba(0,245,196,0.15)',
                  fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(0,245,196,0.6)', letterSpacing: '0.15em',
                }}
              >
                {tag}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.2; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
