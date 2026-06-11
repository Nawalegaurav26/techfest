import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

export default function TerminalConsole({ fullScreen = false }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'ATHENA AI CORE V1.0.4 - INITIALIZATION COMPLETED' },
    { type: 'system', text: 'CONNECTION SECURE. NEURAL LINK SYNCED.' },
    { type: 'bot', text: 'Greetings, User. I am ATHENA, the Techfest Cybernetic Oracle. Enter "help" or "/help" to view active terminal operations, or query me directly.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [regStep, setRegStep] = useState(0);
  const [regData, setRegData] = useState({ name: '', email: '', event: '' });
  const [matrixActive, setMatrixActive] = useState(false);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of log
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Focus input automatically
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Matrix digital rain effect timeout
  useEffect(() => {
    if (matrixActive) {
      const timer = setTimeout(() => setMatrixActive(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [matrixActive]);

  const handleKeyPress = () => {
    soundEffects.playTypewriter();
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const cleanCmd = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;

    // Save user input in history
    setHistory(prev => [...prev, { type: 'user', text: cmd }]);

    // Registration Flow
    if (isRegistering) {
      handleRegistrationFlow(cmd);
      return;
    }

    if (cleanCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cleanCmd === 'help') {
      soundEffects.playSuccess();
      setHistory(prev => [
        ...prev,
        { type: 'bot', text: 'AVAILABLE PROTOCOLS:' },
        { type: 'bot', text: '  - help             Display system command index' },
        { type: 'bot', text: '  - system           Retrieve CPU core diagnostics' },
        { type: 'bot', text: '  - events           List event categories & tracks' },
        { type: 'bot', text: '  - register         Initiate terminal-based event registration' },
        { type: 'bot', text: '  - matrix           Unlock experimental matrix grid simulation' },
        { type: 'bot', text: '  - evolution        Trigger Cybernetic Protocol sequence' },
        { type: 'bot', text: '  - clear            Flush console log history' }
      ]);
      return;
    }

    if (cleanCmd === 'system') {
      soundEffects.playSuccess();
      setHistory(prev => [
        ...prev,
        { type: 'bot', text: '--- ATHENA DIAGNOSTICS ---' },
        { type: 'bot', text: `  CORE SYNC: ${(85 + Math.random() * 14).toFixed(2)}%` },
        { type: 'bot', text: '  CORES ACTIVE: 16/16 quantum nodes' },
        { type: 'bot', text: '  GRID STATUS: OPERATIONAL' },
        { type: 'bot', text: '  GEOLOC STATUS: IIT Bombay (19.1334° N, 72.9133° E)' },
        { type: 'bot', text: '  CYBERNETIC SYNC: ESTABLISHED' },
        { type: 'bot', text: '--------------------------' }
      ]);
      return;
    }

    if (cleanCmd === 'events') {
      soundEffects.playSuccess();
      setHistory(prev => [
        ...prev,
        { type: 'bot', text: 'ACTIVE COMPETITION SECTORS:' },
        { type: 'bot', text: '  [01] ROBOTICS: Robowars, Meshmerize, GridSolve' },
        { type: 'bot', text: '  [02] CODING: Hackfest, CodeRunner, AI Odyssey' },
        { type: 'bot', text: '  [03] AEROSPACE: Boeing Aeromodelling, Drone Showdown' },
        { type: 'bot', text: '  [04] BIOTECH: BioSyn, NeuroGenesis' },
        { type: 'bot', text: 'Enter "register" to sign up for any event.' }
      ]);
      return;
    }

    if (cleanCmd === 'evolution') {
      soundEffects.playSuccess();
      setHistory(prev => [
        ...prev,
        { type: 'system', text: 'SYNCING NEURAL LINK...' },
        { type: 'bot', text: 'THE CYBERNETIC EVOLUTION IS ACTIVE.' },
        { type: 'bot', text: '"Man and machine, unified in a seamless digital matrix. Humanity enters the next epoch."' }
      ]);
      return;
    }

    if (cleanCmd === 'matrix') {
      soundEffects.playTransition();
      setMatrixActive(true);
      setHistory(prev => [
        ...prev,
        { type: 'system', text: 'INJECTING MATRIX CODE STREAM...' },
        { type: 'bot', text: 'Follow the white rabbit...' }
      ]);
      return;
    }

    if (cleanCmd === 'register') {
      setIsRegistering(true);
      setRegStep(0);
      setHistory(prev => [
        ...prev,
        { type: 'bot', text: 'INITIALIZING TERM-REG PROTOCOL.' },
        { type: 'bot', text: 'Please enter your Full Name:' }
      ]);
      return;
    }

    // Default Chatbot Responses (Natural Language Processing or Gemini API)
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (apiKey) {
      // Append a thinking message
      setHistory(prev => [...prev, { type: 'system', text: 'CONNECTING TO GEMINI API CORE...', id: 'thinking' }]);
      
      // Async fetch
      fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are ATHENA, the cybernetic AI oracle for IIT Bombay Techfest 2026. Keep your answers brief, futuristic, and highly styled (maximum 2-3 sentences). Use technical/cybernetic terminology where appropriate. The user command/prompt is: "${cmd}"`
            }]
          }]
        })
      })
      .then(res => {
        if (!res.ok) throw new Error("API call failed");
        return res.json();
      })
      .then(data => {
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "ATHENA Core synchronization failed. Re-routing output.";
        soundEffects.playSuccess();
        setHistory(prev => {
          // Remove the thinking message and add the bot reply
          const cleanHistory = prev.filter(item => item.id !== 'thinking');
          return [...cleanHistory, { type: 'bot', text: replyText }];
        });
      })
      .catch(err => {
        console.error("Gemini API Error:", err);
        soundEffects.playError();
        setHistory(prev => {
          const cleanHistory = prev.filter(item => item.id !== 'thinking');
          return [...cleanHistory, { type: 'system', text: `ERROR: CORE LINK TIMEOUT. FALLING BACK TO CACHED ARCHIVES.` }, { type: 'bot', text: getLocalFallbackReply(cleanCmd) }];
        });
      });
    } else {
      soundEffects.playSuccess();
      setHistory(prev => [...prev, { type: 'bot', text: getLocalFallbackReply(cleanCmd) }]);
    }
  };

  const handleRegistrationFlow = (input) => {
    if (regStep === 0) {
      setRegData(prev => ({ ...prev, name: input }));
      setRegStep(1);
      setHistory(prev => [...prev, { type: 'bot', text: `Name recorded: "${input}". Please enter your Email address:` }]);
    } else if (regStep === 1) {
      if (!input.includes('@') || !input.includes('.')) {
        soundEffects.playError();
        setHistory(prev => [...prev, { type: 'bot', text: 'Invalid email syntax detected. Please enter a valid Email address:' }]);
      } else {
        setRegData(prev => ({ ...prev, email: input }));
        setRegStep(2);
        setHistory(prev => [
          ...prev, 
          { type: 'bot', text: `Email recorded: "${input}".` },
          { type: 'bot', text: 'Enter the event code or name (e.g. Robowars, AI Odyssey, BioSyn):' }
        ]);
      }
    } else if (regStep === 2) {
      const finalData = { ...regData, event: input };
      setRegData(finalData);
      setIsRegistering(false);
      soundEffects.playSuccess();
      setHistory(prev => [
        ...prev,
        { type: 'system', text: 'TRANSMITTING REGISTRATION DATA...' },
        { type: 'bot', text: `SUCCESS! Registration confirmed for ${finalData.name} (${finalData.email}) in event "${finalData.event}". ID: TF27-REG-${Math.floor(1000 + Math.random() * 9000)}.` }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleCommand(inputValue);
    setInputValue('');
  };

  return (
    <div 
      className={`relative w-full ${fullScreen ? 'h-full flex-1 min-h-[380px]' : 'h-[300px]'} border border-primary/30 bg-[#050505]/85 flex flex-col font-mono text-[11px] overflow-hidden select-text cursor-text`}
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      {/* Scanline / matrix overlays */}
      {matrixActive && <MatrixRain />}

      {/* Terminal Title Bar */}
      <div className="flex justify-between items-center bg-primary/10 px-4 py-2 border-b border-primary/20 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="text-[10px] tracking-widest text-primary font-bold ml-2">ATHENA_CLI_CORE_V1.0</span>
        </div>
        <div className="text-[8px] text-primary/50">SECURE_LINK // AES-256</div>
      </div>

      {/* Output Stream */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 relative">
        <AnimatePresence>
          {history.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={`leading-relaxed ${
                item.type === 'user' 
                  ? 'text-white' 
                  : item.type === 'system' 
                    ? 'text-secondary' 
                    : 'text-tertiary'
              }`}
            >
              {item.type === 'user' && <span className="text-primary mr-2">&gt;</span>}
              {item.type === 'bot' && <span className="text-tertiary mr-2">athena:</span>}
              {item.type === 'system' && <span className="text-secondary mr-2">[SYS]</span>}
              <TypewriterText text={item.text} />
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Command Line Input */}
      <form onSubmit={handleSubmit} className="border-t border-primary/20 px-4 py-2 flex items-center bg-black/60 relative select-none">
        <span className="text-primary mr-2">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={isRegistering ? "Enter input..." : "Type command or chat..."}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[11px] caret-primary"
        />
        <div className="text-[8px] text-primary/60 font-bold ml-2 border border-primary/30 px-1 py-0.5 animate-pulse">
          READY_
        </div>
      </form>
    </div>
  );
}

// Simple Matrix digital rain overlay
function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const columns = Math.floor(canvas.width / 10);
    const rainDrops = Array(columns).fill(1);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&*()";
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = '8px monospace';
      
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * 10, rainDrops[i] * 10);
        
        if (rainDrops[i] * 10 > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-20" />;
}

// Sub-component for typing effect
function TypewriterText({ text }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (text.length < 5) {
      const id = setTimeout(() => {
        setDisplayedText(text);
      }, 0);
      return () => clearTimeout(id);
    }

    let active = true;
    const clearId = setTimeout(() => {
      if (active) setDisplayedText('');
    }, 0);

    let i = 0;
    const interval = setInterval(() => {
      if (active) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }
    }, 8); // Fast typing speed

    return () => {
      active = false;
      clearTimeout(clearId);
      clearInterval(interval);
    };
  }, [text]);

  return <span>{displayedText}</span>;
}

function getLocalFallbackReply(cleanCmd) {
  const chatbotReplies = {
    hello: "Connection stabilized. What assistance do you require?",
    hi: "Connection stabilized. What assistance do you require?",
    techfest: "Techfest is Asia's largest Science and Technology Festival, hosted at IIT Bombay. This year's theme is TF'27: The Cybernetic Evolution.",
    theme: "The Cybernetic Evolution explores the boundary between carbon-based life and silicon-based computation. Expect heavy neon graphics and robotic exhibitions.",
    accommodation: "Accommodation portals are active on the sidebar! You can register and book simulated rooms directly in the dashboard overlay.",
    contact: "You are currently communicating with me (Athena). For human liaison, dial (+91) 22-2576-4060 or access the social nodes.",
    sponsors: "Our major cybernetic sponsors are listed under the SPONSORS directory. Check out Weyland-Yutani, Tyrell Corp, and Cyberdyne Systems.",
    store: "Techfest Official cyber-gear is available in our Store! Pick up a cyborg hoodie or a neural cap from the dashboard.",
    developer: "I was built by the Google DeepMind team using agentic programming.",
    who: "I am ATHENA, the Techfest Cybernetic Oracle."
  };

  let reply = "Query unrecognized. Re-routing command to global system log. Enter 'help' for support.";
  for (const key in chatbotReplies) {
    if (cleanCmd.includes(key)) {
      reply = chatbotReplies[key];
      break;
    }
  }
  return reply;
}
