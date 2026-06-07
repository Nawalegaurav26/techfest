import { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CyberBot from '../components/CyberBot';
import { soundEffects } from '../utils/soundEffects';

export default function RoboLab() {
  const [renderMode, setRenderMode] = useState('SOLID');
  const [coreRotationSpeed, setCoreRotationSpeed] = useState(1.0);
  const [showParticles, setShowParticles] = useState(true);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [manualStance, setManualStance] = useState(null);
  
  // Custom manual flash/pulse state
  const [plasmaBurst, setPlasmaBurst] = useState(false);

  // Diagnostics scrolling terminal logs
  const [logs, setLogs] = useState([
    '[INIT] Telemetry uplink connection online...',
    '[DIAG] Anti-gravity magnetic drive: ACTIVE.',
    '[SYNC] Cybernetic interface synced.'
  ]);

  // Track window scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollRatio(window.scrollY / totalHeight);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine active stance index: 0 = Hover, 1 = Flight, 2 = Scan, 3 = Overload
  const activeStance = useMemo(() => {
    if (manualStance !== null) {
      if (manualStance === 0.0) return 0;
      if (manualStance === 0.33) return 1;
      if (manualStance === 0.66) return 2;
      return 3;
    }
    if (scrollRatio < 0.25) return 0;
    if (scrollRatio < 0.55) return 1;
    if (scrollRatio < 0.82) return 2;
    return 3;
  }, [scrollRatio, manualStance]);

  // Telemetry status names & specs based on stance
  const stanceInfo = useMemo(() => {
    switch (activeStance) {
      case 0:
        return {
          title: 'STANDBY HOVER',
          status: 'SYNCED',
          statusColor: 'var(--green)',
          temp: '345 K',
          thrust: '0.12 G',
          speed: '0.0 Mach',
          latency: '4ms'
        };
      case 1:
        return {
          title: 'TACTICAL FLIGHT',
          status: 'PROPULSION_ON',
          statusColor: 'var(--sky)',
          temp: '1,024 K',
          thrust: '2.40 G',
          speed: '3.2 Mach',
          latency: '15ms'
        };
      case 2:
        return {
          title: 'COGNITIVE SCAN',
          status: 'SCANNING',
          statusColor: 'var(--sky)',
          temp: '420 K',
          thrust: '0.08 G',
          speed: '0.2 Mach',
          latency: '12ms'
        };
      case 3:
        return {
          title: 'PLASMA OVERLOAD',
          status: 'MELTDOWN_WARNING',
          statusColor: 'var(--plasma)',
          temp: '5,800 K',
          thrust: '4.50 G',
          speed: '0.8 Mach',
          latency: '98ms'
        };
      default:
        return {};
    }
  }, [activeStance]);

  // Telemetry logs update loop
  useEffect(() => {
    const logPool = {
      0: [
        'Standby hover altitude stable at 1.50m.',
        'Anti-gravity coils: 100% efficiency.',
        'Visor collimators aligned to coordinate center.',
        'System balance matrix: NOMINAL.',
        'Tokamak plasma containment: LOCKED.'
      ],
      1: [
        'Vector nozzles firing. Thrust: 2.40G.',
        'Ion velocity: 450 km/s. Mach speed rising.',
        'Aerodynamic drag compensation: ENERGIZED.',
        'Magnetic fields reshaping for forward pitch.',
        'Fuel burn rate: 8.5 kg/s. Output peak.'
      ],
      2: [
        'Collimator visor scanning cone: ENGAGED.',
        'Lidar mapping area coordinates: SUCCESS.',
        'Targeting neural nodes. Scan range: 450m.',
        'Syncing structural wireframes to local cache.',
        'Threat matrix feedback: ZERO_DETECTED.'
      ],
      3: [
        'REACTOR VOLTAGE EXCEEDS SHIELD RATING BY 350%.',
        'Plasma flow critical. Meltdown imminent.',
        'Thermal dissipation limits reached. Temperature: 5800K.',
        'Visor output redirected to primary weapon.',
        'EMERGENCY VENTILATION STAGE 4 TRIGGERED.'
      ]
    };

    const timer = setInterval(() => {
      const pool = logPool[activeStance] || logPool[0];
      const randomMsg = pool[Math.floor(Math.random() * pool.length)];
      const timeStr = new Date().toLocaleTimeString().split(' ')[0];
      
      setLogs(prev => {
        const next = [...prev, `[${timeStr}] ${randomMsg}`];
        if (next.length > 8) next.shift(); // Keep last 8 lines
        return next;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [activeStance]);

  const isFirstStance = useRef(true);
  useEffect(() => {
    if (isFirstStance.current) {
      isFirstStance.current = false;
      return;
    }
    soundEffects.playTransition?.();
  }, [activeStance]);

  // Scroll to section manually
  const scrollToSection = (targetPercent) => {
    soundEffects.playClick?.();
    setManualStance(null); // release manual lock
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = docHeight * targetPercent;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  // Synthesize custom plasma energy sound using Web Audio API
  const synthesizePlasmaSound = () => {
    if (typeof window === 'undefined') return;
    if (!window.__soundEnabled) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    try {
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.35);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 1.2);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + 0.35);
      filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1.2);
      
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
      
      // Electric snap peak
      setTimeout(() => {
        try {
          const oscSnap = ctx.createOscillator();
          const gainSnap = ctx.createGain();
          oscSnap.type = 'triangle';
          oscSnap.frequency.setValueAtTime(2200, ctx.currentTime);
          oscSnap.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
          
          gainSnap.gain.setValueAtTime(0.06, ctx.currentTime);
          gainSnap.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          
          oscSnap.connect(gainSnap);
          gainSnap.connect(ctx.destination);
          
          oscSnap.start();
          oscSnap.stop(ctx.currentTime + 0.2);
        } catch (err) {}
      }, 350);
    } catch (e) {
      console.warn("Plasma synthesis failed:", e);
    }
  };

  // Trigger temporary plasma explosion effect
  const handlePlasmaBurst = () => {
    synthesizePlasmaSound();
    setPlasmaBurst(true);
    // Push alert log
    const timeStr = new Date().toLocaleTimeString().split(' ')[0];
    setLogs(prev => {
      const next = [...prev, `[${timeStr}] [CRITICAL] MANUAL PLASMA OVERFLOW COMMITTED!`];
      if (next.length > 8) next.shift();
      return next;
    });
    setTimeout(() => {
      setPlasmaBurst(false);
    }, 1500);
  };

  return (
    <div style={{ position: 'relative', minHeight: '350vh' }}>
      
      {/* CSS STYLING OVERLAYS (LOCALIZED) */}
      <style>{`
        .robolab-container {
          position: relative;
          z-index: 10;
        }

        .robolab-canvas-wrapper {
          position: fixed;
          top: var(--nav-h);
          left: 0;
          width: 100vw;
          height: calc(100vh - var(--nav-h) - var(--footer-h));
          z-index: 2;
          background: radial-gradient(circle at 50% 50%, #0c0d14 0%, #050508 100%);
        }

        .robolab-panel {
          font-family: var(--font-mono);
          position: fixed;
          width: 290px;
          z-index: 20;
          max-height: calc(100vh - var(--nav-h) - var(--footer-h) - 40px);
          overflow-y: auto;
          scrollbar-width: none;
        }
        .robolab-panel::-webkit-scrollbar {
          display: none;
        }

        .robolab-panel-left {
          left: calc(var(--sidebar-w) + 20px);
          top: calc(var(--nav-h) + 20px);
        }

        .robolab-panel-right {
          right: calc(var(--sidebar-w) + 20px);
          top: calc(var(--nav-h) + 20px);
        }

        .hud-header {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: rgba(56, 189, 248, 0.4);
          letter-spacing: 0.2em;
          border-bottom: 1px dashed rgba(56, 189, 248, 0.15);
          padding-bottom: 6px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
        }

        .hud-btn {
          width: 100%;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(189, 200, 209, 0.75);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 14px;
          margin-bottom: 6px;
          text-align: left;
          transition: all 0.2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .hud-btn:hover {
          color: var(--sky);
          background: rgba(56, 189, 248, 0.05);
          border-color: rgba(56, 189, 248, 0.3);
        }
        .hud-btn.active {
          color: #fff;
          background: rgba(56, 189, 248, 0.12);
          border-color: var(--sky);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.2);
        }
        .hud-btn.overload-active {
          color: #fff;
          background: rgba(255, 45, 85, 0.15);
          border-color: var(--plasma);
          box-shadow: 0 0 12px rgba(255, 45, 85, 0.3);
        }

        .hud-slider-group {
          margin: 16px 0;
        }
        .hud-slider-label {
          font-size: 9px;
          color: rgba(189, 200, 209, 0.5);
          letter-spacing: 0.15em;
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .hud-slider {
          width: 100%;
          -webkit-appearance: none;
          background: rgba(255, 255, 255, 0.08);
          height: 3px;
          outline: none;
        }
        .hud-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          background: var(--sky);
          box-shadow: var(--glow-sky-sm);
          cursor: pointer;
        }

        .readout-row {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          margin-bottom: 8px;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        .readout-label {
          color: rgba(189, 200, 209, 0.5);
          letter-spacing: 0.1em;
        }
        .readout-val {
          font-weight: 700;
          color: #fff;
        }

        .hud-console {
          font-family: var(--font-mono);
          font-size: 8px;
          line-height: 1.5;
          color: var(--sky-dim);
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(56, 189, 248, 0.12);
          padding: 8px;
          height: 155px;
          overflow-y: hidden;
        }

        /* Narrative blocks in the center column */
        .spec-scroller {
          width: 100%;
          max-width: 440px;
          margin: 0 auto;
          position: relative;
          z-index: 5;
          pointer-events: none;
          padding-top: 100px;
        }
        .spec-section {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }
        .spec-card {
          pointer-events: auto;
          background: rgba(5, 5, 8, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 30px;
          position: relative;
          transition: all 0.3s ease;
        }
        .spec-card:hover {
          border-color: rgba(56, 189, 248, 0.2);
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.05);
        }

        .hud-callout {
          display: flex;
          align-items: center;
          gap: 8px;
          pointer-events: none;
          white-space: nowrap;
        }
        .hud-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--sky);
          box-shadow: 0 0 8px var(--sky);
          animation: hudPulseAnim 1.6s infinite ease-in-out;
        }
        @keyframes hudPulseAnim {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.25); opacity: 1; box-shadow: 0 0 12px var(--sky); }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
        .hud-label {
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #fff;
          background: rgba(5, 5, 8, 0.9);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 4px 8px;
        }

        /* Mobile Responsive adjustments */
        @media (max-width: 1024px) {
          .robolab-canvas-wrapper {
            position: sticky;
            top: var(--nav-h);
            left: 0;
            width: 100vw;
            height: 42vh;
            z-index: 5;
            border-bottom: 1px solid rgba(56, 189, 248, 0.15);
          }
          .robolab-panel {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            width: 100%;
            max-height: none;
            margin-bottom: 15px;
          }
          .spec-scroller {
            max-width: 100%;
            padding-top: 20px;
            pointer-events: auto;
          }
          .spec-section {
            min-height: auto;
            margin-bottom: 30px;
          }
        }
      `}</style>

      {/* ─── 3D VIEWPORT CANVAS ─── */}
      <div className="robolab-canvas-wrapper">
        <Canvas camera={{ position: [0, 0.2, 2.6], fov: 50 }}>
          {/* Neon mood lighting */}
          <ambientLight intensity={plasmaBurst ? 0.9 : 0.4} color={plasmaBurst ? '#ff0033' : '#ffffff'} />
          <pointLight position={[5, 5, 5]} intensity={plasmaBurst ? 4.0 : 1.5} color={plasmaBurst ? '#ff0055' : '#00f2ff'} />
          <pointLight position={[-5, -5, -5]} intensity={0.8} color="#7b00ff" />
          <pointLight position={[0, 4, -2]} intensity={1.0} color="#ffffff" />
          
          {/* Glowing core explosion point light */}
          {plasmaBurst && (
            <pointLight position={[0, 0.2, 0]} intensity={6.0} color="#ff2d55" distance={2.5} decay={1} />
          )}
          
          <CyberBot
            renderMode={renderMode}
            coreRotationSpeed={coreRotationSpeed}
            showParticles={showParticles}
            stanceOverride={manualStance}
          />
        </Canvas>
      </div>

      {/* ─── HUD OVERLAYS & SCROLLING CONTENTS ─── */}
      <div className="robolab-container px-4">
        
        {/* LEFT PANEL: RENDER ENGINE CONTROLS */}
        <div className="robolab-panel robolab-panel-left glass-panel p-5">
          <div className="bracket-tl" />
          <div className="bracket-tr" />
          <div className="bracket-bl" />
          <div className="bracket-br" />
          
          <div className="hud-header">
            <span>STANCE OVERRIDE</span>
            <span>TX_ST.03</span>
          </div>

          <button
            className={`hud-btn ${activeStance === 0 ? 'active' : ''}`}
            onClick={() => scrollToSection(0.0)}
          >
            <span>STANDBY HOVER</span>
            <span>00%</span>
          </button>
          <button
            className={`hud-btn ${activeStance === 1 ? 'active' : ''}`}
            onClick={() => scrollToSection(0.33)}
          >
            <span>TACTICAL FLIGHT</span>
            <span>33%</span>
          </button>
          <button
            className={`hud-btn ${activeStance === 2 ? 'active' : ''}`}
            onClick={() => scrollToSection(0.66)}
          >
            <span>TACTICAL SCAN</span>
            <span>66%</span>
          </button>
          <button
            className={`hud-btn ${activeStance === 3 ? 'overload-active' : ''}`}
            onClick={() => scrollToSection(1.0)}
          >
            <span>PLASMA OVERLOAD</span>
            <span>99%</span>
          </button>

          <div className="hud-header mt-5">
            <span>RENDER ENGINE</span>
            <span>MESH.01</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['SOLID', 'WIREFRAME', 'POINT_CLOUD'].map((mode) => (
              <button
                key={mode}
                className={`hud-btn ${renderMode === mode ? 'active' : ''}`}
                onClick={() => {
                  soundEffects.playClick?.();
                  setRenderMode(mode);
                }}
              >
                <span>{mode.replace('_', ' ')}</span>
                <span style={{ fontSize: '8px', opacity: 0.5 }}>{renderMode === mode ? '●' : '○'}</span>
              </button>
            ))}
          </div>

          <div className="hud-header mt-5">
            <span>CORE DIAGNOSTICS</span>
            <span>SYS_CTRL</span>
          </div>

          <div className="hud-slider-group">
            <div className="hud-slider-label">
              <span>REACTOR SPEED</span>
              <span>{coreRotationSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="5.0"
              step="0.1"
              value={coreRotationSpeed}
              onChange={(e) => setCoreRotationSpeed(parseFloat(e.target.value))}
              className="hud-slider"
            />
          </div>

          <button
            className="hud-btn"
            style={{
              borderColor: 'rgba(255, 45, 85, 0.4)',
              background: 'rgba(255, 45, 85, 0.04)',
              color: 'var(--plasma)',
            }}
            onClick={handlePlasmaBurst}
          >
            <span>BURST PLASMA OVERFLOW</span>
            <span>⚡</span>
          </button>

          <button
            className="hud-btn mt-2"
            onClick={() => {
              soundEffects.playClick?.();
              setShowParticles(!showParticles);
            }}
          >
            <span>ION THRUSTER COILS</span>
            <span style={{ color: showParticles ? 'var(--green)' : 'var(--plasma)' }}>
              {showParticles ? 'ONLINE' : 'OFFLINE'}
            </span>
          </button>
        </div>

        {/* RIGHT PANEL: TELEMETRY AND CONSOLE LOGS */}
        <div className="robolab-panel robolab-panel-right glass-panel p-5">
          <div className="bracket-tl" />
          <div className="bracket-tr" />
          <div className="bracket-bl" />
          <div className="bracket-br" />

          <div className="hud-header">
            <span>ROBOTIC TELEMETRY</span>
            <span>TX_TM.98</span>
          </div>

          <div className="readout-row">
            <span className="readout-label">SYSTEM STATE</span>
            <span className="readout-val" style={{ color: stanceInfo.statusColor }}>
              {stanceInfo.status}
            </span>
          </div>

          <div className="readout-row">
            <span className="readout-label">REACTOR CORE</span>
            <span className="readout-val">{stanceInfo.temp}</span>
          </div>

          <div className="readout-row">
            <span className="readout-label">THRUST MATRIX</span>
            <span className="readout-val">{stanceInfo.thrust}</span>
          </div>

          <div className="readout-row">
            <span className="readout-label">SPEED VECTOR</span>
            <span className="readout-val">{stanceInfo.speed}</span>
          </div>

          <div className="readout-row">
            <span className="readout-label">LINK LATENCY</span>
            <span className="readout-val" style={{ color: activeStance === 3 ? 'var(--plasma)' : 'var(--green)' }}>
              {stanceInfo.latency}
            </span>
          </div>

          <div className="hud-header mt-5">
            <span>DIAGNOSTIC FEED</span>
            <span>LOG.TXT</span>
          </div>

          <div className="hud-console">
            {logs.map((log, i) => (
              <div
                key={i}
                style={{
                  color: log.includes('ALERT') || log.includes('CRITICAL') ? 'var(--plasma)' : 'rgba(123, 208, 255, 0.85)',
                  marginBottom: '4px',
                  wordBreak: 'break-all'
                }}
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* CENTER NARRATIVE: SCROLL-DRIVEN SPECIFICATION CARDS */}
        <div className="spec-scroller">
          
          {/* SECTION 1: STANDBY HOVER */}
          <div className="spec-section" id="sect-hover">
            <div className="spec-card">
              <div className="bracket-tl" />
              <div className="bracket-tr" />
              <div className="bracket-bl" />
              <div className="bracket-br" />

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--sky)', letterSpacing: '0.2em', marginBottom: '8px' }}>
                MODULE_01 // STABILITY
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '14px', letterSpacing: '-0.01em' }}>
                NEURAL HOVER PLATFORM
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(189,200,209,0.6)', lineHeight: 1.6, marginBottom: '16px' }}>
                In this standby hover configuration, the CyberBot maintains a static hover lock at 1.50 meters. The balance gyros and anti-gravity magnetic induction coils operate at baseline power consumption, establishing a low-latency neural connection to control operators.
              </p>
              
              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                <div className="readout-row">
                  <span className="readout-label">MAGNETIC BALANCE</span>
                  <span className="readout-val">100% NOMINAL</span>
                </div>
                <div className="readout-row">
                  <span className="readout-label">POWER DRAW</span>
                  <span className="readout-val">1.2 GW / HR</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: VECTOR FLIGHT */}
          <div className="spec-section" id="sect-flight">
            <div className="spec-card">
              <div className="bracket-tl" />
              <div className="bracket-tr" />
              <div className="bracket-bl" />
              <div className="bracket-br" />

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--sky)', letterSpacing: '0.2em', marginBottom: '8px' }}>
                MODULE_02 // KINETICS
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '14px', letterSpacing: '-0.01em' }}>
                IONIC VECTOR JET DRIVE
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(189,200,209,0.6)', lineHeight: 1.6, marginBottom: '16px' }}>
                When forward traversal velocities exceed standard limits, the robot shifts into flight configuration. The structural torso tilts forward by 42 degrees, arms tuck behind the drag profile, and thrust output increases exponentially to achieve velocities up to Mach 3.2.
              </p>

              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                <div className="readout-row">
                  <span className="readout-label">THRUSTER OUTPUT</span>
                  <span className="readout-val">2.40 G FORCE</span>
                </div>
                <div className="readout-row">
                  <span className="readout-label">AERO SHIELDING</span>
                  <span className="readout-val">ACTIVE (98%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: SCANNING */}
          <div className="spec-section" id="sect-scan">
            <div className="spec-card">
              <div className="bracket-tl" />
              <div className="bracket-tr" />
              <div className="bracket-bl" />
              <div className="bracket-br" />

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--sky)', letterSpacing: '0.2em', marginBottom: '8px' }}>
                MODULE_03 // INTELLIGENCE
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '14px', letterSpacing: '-0.01em' }}>
                COLLIMATED VISION SENSOR
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(189,200,209,0.6)', lineHeight: 1.6, marginBottom: '16px' }}>
                The visor collimator uses high-intensity laser grids to map surrounding environments. Projects a 60-degree holographic scanning cone onto the target floor, performing real-time structural analysis and threat tracking.
              </p>

              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                <div className="readout-row">
                  <span className="readout-label">SCAN RANGE</span>
                  <span className="readout-val">450 METERS</span>
                </div>
                <div className="readout-row">
                  <span className="readout-label">YAW RESOLUTION</span>
                  <span className="readout-val">0.05 MM / RAD</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: PLASMA OVERLOAD */}
          <div className="spec-section" id="sect-overload">
            <div className="spec-card">
              <div className="bracket-tl" />
              <div className="bracket-tr" />
              <div className="bracket-bl" />
              <div className="bracket-br" />

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--plasma)', letterSpacing: '0.2em', marginBottom: '8px' }}>
                MODULE_04 // CRITICAL
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'var(--plasma)', marginBottom: '14px', letterSpacing: '-0.01em' }}>
                PLASMA REACTOR OVERLOAD
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(189,200,209,0.6)', lineHeight: 1.6, marginBottom: '16px' }}>
                WARNING: High-capacity combat configuration exceeds Tokamak thermal shield capacities. Visor glows red as energy channels directly into core discharge lines. Core spins at 5.5x normal velocity. Thermal meltdown will occur if containment shields collapse.
              </p>

              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                <div className="readout-row">
                  <span className="readout-label">CORE TEMPERATURE</span>
                  <span className="readout-val" style={{ color: 'var(--plasma)' }}>5,800 KELVIN</span>
                </div>
                <div className="readout-row">
                  <span className="readout-label">SHIELD DECAY RATE</span>
                  <span className="readout-val" style={{ color: 'var(--plasma)' }}>1.2% / SEC</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
