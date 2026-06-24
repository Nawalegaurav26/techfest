/* Techfest 2026 — Telemetry Log 20 // ROBOWARS LEADERBOARD */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const TEAMS = [
  { rank: 1,  name: 'MEGATRON V4',       team: 'TEAM BLITZ',      country: '🇮🇳', wins: 6, losses: 0, kd: '12.0', pts: 1800, class: 'TITAN',  status: 'CHAMPION',  streak: 6 },
  { rank: 2,  name: 'DOOM-SPIN',          team: 'TEAM VORTEX',     country: '🇧🇷', wins: 5, losses: 1, kd: '8.3',  pts: 1540, class: 'TITAN',  status: 'FINALIST',  streak: 3 },
  { rank: 3,  name: 'CYBER-STRIKER',      team: 'MUNICH METALS',   country: '🇩🇪', wins: 5, losses: 1, kd: '7.1',  pts: 1480, class: 'HEAVY',  status: 'SEMI',      streak: 2 },
  { rank: 4,  name: 'IRON TYPHOON',       team: 'ZERO KELVIN',     country: '🇯🇵', wins: 4, losses: 2, kd: '5.5',  pts: 1210, class: 'HEAVY',  status: 'SEMI',      streak: 1 },
  { rank: 5,  name: 'SHIVA PROTOCOL',     team: 'NIT WARANGAL',    country: '🇮🇳', wins: 4, losses: 2, kd: '5.0',  pts: 1160, class: 'TITAN',  status: 'QUARTER',   streak: 2 },
  { rank: 6,  name: 'SCORPION-X',         team: 'TEXAS TORQUE',    country: '🇺🇸', wins: 3, losses: 3, kd: '3.8',  pts: 980,  class: 'FEATHER', status: 'QUARTER',  streak: 0 },
  { rank: 7,  name: 'PULSAR BLADE',       team: 'IIT BOMBAY',      country: '🇮🇳', wins: 3, losses: 3, kd: '3.2',  pts: 920,  class: 'FEATHER', status: 'ACTIVE',   streak: 1 },
  { rank: 8,  name: 'HYDRA STRIKE',       team: 'LONDON ROBOTICS',  country: '🇬🇧', wins: 3, losses: 3, kd: '3.0', pts: 890,  class: 'HEAVY',  status: 'ACTIVE',    streak: 0 },
  { rank: 9,  name: 'NOVA CRUSHER',       team: 'TEAM INFERNO',    country: '🇰🇷', wins: 2, losses: 4, kd: '2.1',  pts: 710,  class: 'TITAN',  status: 'ELIMINATED', streak: 0 },
  { rank: 10, name: 'PLASMA HAWK',        team: 'IITK RACING',     country: '🇮🇳', wins: 2, losses: 4, kd: '1.9',  pts: 650,  class: 'FEATHER', status: 'ELIMINATED', streak: 0 },
  { rank: 11, name: 'TITANFALL MK3',      team: 'BOTS UNLIMITED',  country: '🇨🇦', wins: 1, losses: 5, kd: '1.2',  pts: 440,  class: 'HEAVY',  status: 'ELIMINATED', streak: 0 },
  { rank: 12, name: 'VOID REAPER',        team: 'DARK MATTER ENG', country: '🇫🇷', wins: 1, losses: 5, kd: '0.9',  pts: 380,  class: 'TITAN',  status: 'ELIMINATED', streak: 0 },
];

const BRACKET = [
  // Quarters
  { round: 'QF', matchId: 'Q1', a: 'MEGATRON V4',   b: 'VOID REAPER',   winner: 'MEGATRON V4',  score: '3–0' },
  { round: 'QF', matchId: 'Q2', a: 'DOOM-SPIN',      b: 'PLASMA HAWK',   winner: 'DOOM-SPIN',    score: '3–1' },
  { round: 'QF', matchId: 'Q3', a: 'CYBER-STRIKER',  b: 'NOVA CRUSHER',  winner: 'CYBER-STRIKER', score: '2–1' },
  { round: 'QF', matchId: 'Q4', a: 'IRON TYPHOON',   b: 'SHIVA PROTOCOL', winner: 'IRON TYPHOON', score: '2–1' },
  // Semis
  { round: 'SF', matchId: 'S1', a: 'MEGATRON V4',   b: 'DOOM-SPIN',     winner: 'MEGATRON V4',  score: '3–1' },
  { round: 'SF', matchId: 'S2', a: 'CYBER-STRIKER',  b: 'IRON TYPHOON',  winner: 'CYBER-STRIKER', score: '3–2' },
  // Final
  { round: 'GF', matchId: 'F1', a: 'MEGATRON V4',   b: 'CYBER-STRIKER', winner: 'MEGATRON V4',  score: '3–0' },
];

const STATUS_STYLES = {
  CHAMPION:   { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)' },
  FINALIST:   { color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)' },
  SEMI:       { color: '#00f2ff', bg: 'rgba(0,242,255,0.08)', border: 'rgba(0,242,255,0.3)' },
  QUARTER:    { color: '#00f5c4', bg: 'rgba(0,245,196,0.08)', border: 'rgba(0,245,196,0.3)' },
  ACTIVE:     { color: '#fff',    bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.15)' },
  ELIMINATED: { color: 'rgba(189,200,209,0.35)', bg: 'transparent', border: 'rgba(255,255,255,0.06)' },
};

const CLASS_COLOR = { TITAN: '#ff2d55', HEAVY: '#ff8c00', FEATHER: '#a855f7' };

export default function Leaderboard() {
  const [tab, setTab]         = useState('RANKINGS');
  const [classFilter, setClassFilter] = useState('ALL');
  const [highlighted, setHighlighted] = useState(null);
  const [tick, setTick]       = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const filtered = classFilter === 'ALL'
    ? TEAMS
    : TEAMS.filter(t => t.class === classFilter);

  return (
    <div className="page-section" style={{ paddingBottom: '80px', minHeight: '90vh' }}>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 12 // COMBAT STANDINGS</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
        }}>
          ROBOWARS <span style={{ color: 'var(--plasma)', textShadow: '0 0 20px rgba(255,45,85,0.5)' }}>LEADERBOARD</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(241,245,249,0.9)', maxWidth: '640px', lineHeight: 1.7 }}>
          Live combat standings across all weight classes. Rankings updated after each match. Track team KD ratios, win streaks, and bracket progression.
        </p>
      </motion.div>

      {/* LIVE TICKER */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '10px 16px', margin: '24px 0 20px',
          border: '1px solid rgba(255,45,85,0.2)',
          background: 'rgba(255,45,85,0.04)',
          overflow: 'hidden', position: 'relative',
        }}
      >
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: tick % 2 === 0 ? '#ff2d55' : 'rgba(255,45,85,0.3)',
          boxShadow: tick % 2 === 0 ? '0 0 8px #ff2d55' : 'none',
          flexShrink: 0, transition: 'all 0.5s',
        }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,45,85,0.8)', letterSpacing: '0.2em', flexShrink: 0 }}>
          LIVE
        </span>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap' }}
          >
            {[
              'MEGATRON V4 WINS QF MATCH vs VOID REAPER — 3:0',
              'DOOM-SPIN ADVANCES TO FINALS — SEMIFINAL WIN',
              'CYBER-STRIKER narrowly beats IRON TYPHOON — 3:2',
              'NEXT MATCH: MEGATRON V4 vs CYBER-STRIKER — GRAND FINAL',
              'ARENA ONLINE // TECHFEST SPORTS COMPLEX // BAY-C',
              'MEGATRON V4 WINS QF MATCH vs VOID REAPER — 3:0',
              'DOOM-SPIN ADVANCES TO FINALS — SEMIFINAL WIN',
              'CYBER-STRIKER narrowly beats IRON TYPHOON — 3:2',
              'NEXT MATCH: MEGATRON V4 vs CYBER-STRIKER — GRAND FINAL',
              'ARENA ONLINE // TECHFEST SPORTS COMPLEX // BAY-C',
            ].map((text, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.7)', letterSpacing: '0.1em' }}>
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '0px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
        {['RANKINGS', 'BRACKET'].map(t => (
          <button
            key={t}
            onClick={() => { soundEffects.playClick?.(); setTab(t); }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em',
              padding: '14px 28px', border: 'none', background: 'transparent', cursor: 'pointer',
              color: tab === t ? 'var(--plasma)' : '#cbd5e1',
              borderBottom: tab === t ? '3px solid var(--plasma)' : '3px solid transparent',
              transition: 'all 0.2s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* RANKINGS TAB */}
      {tab === 'RANKINGS' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {/* Class Filter */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {['ALL', 'TITAN', 'HEAVY', 'FEATHER'].map(c => (
              <button
                key={c}
                onClick={() => { soundEffects.playClick?.(); setClassFilter(c); }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em',
                  padding: '6px 14px', cursor: 'pointer', borderRadius: '0px',
                  border: `1px solid ${classFilter === c ? (CLASS_COLOR[c] || 'var(--sky)') : 'rgba(255,255,255,0.25)'}`,
                  background: classFilter === c ? `${CLASS_COLOR[c] || 'rgba(56,189,248,1)'}25` : 'transparent',
                  color: classFilter === c ? (CLASS_COLOR[c] || 'var(--sky)') : '#e2e8f0',
                  transition: 'all 0.2s',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Scroll hint on mobile */}
          <div className="mobile-scroll-hint" style={{
            fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(189,200,209,0.3)',
            marginBottom: '8px', display: 'none', letterSpacing: '0.1em'
          }}>
            [SWIPE HORIZONTALLY TO SCAN COMPLETE SPECS]
          </div>

          {/* Scrollable table container */}
          <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ minWidth: '600px' }}>
              {/* Table Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 110px 80px 70px 80px 90px',
                gap: '8px', padding: '12px 16px',
                borderBottom: '2px solid rgba(56,189,248,0.4)',
                background: 'rgba(56,189,248,0.1)',
              }}>
                {['#', 'BOT / TEAM', 'CLASS', 'W–L', 'K/D', 'PTS', 'STATUS'].map(h => (
                  <span key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#38bdf8', letterSpacing: '0.2em', fontWeight: 700 }}>{h}</span>
                ))}
              </div>

              {/* Rows */}
              {filtered.map((team, i) => {
                const s = STATUS_STYLES[team.status] || STATUS_STYLES.ACTIVE;
                const isElim = team.status === 'ELIMINATED';
                const isHL   = highlighted === team.rank;
                return (
                  <motion.div
                    key={team.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => { soundEffects.playClick?.(); setHighlighted(isHL ? null : team.rank); }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr 110px 80px 70px 80px 90px',
                      gap: '8px', padding: '16px 16px',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      background: isHL ? 'rgba(255,45,85,0.12)' : 'transparent',
                      opacity: isElim ? 0.65 : 1,
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => !isElim && (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={e => e.currentTarget.style.background = isHL ? 'rgba(255,45,85,0.12)' : 'transparent'}
                  >
                    {/* Rank */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800,
                        color: team.rank <= 3 ? ['#fbbf24', '#e2e8f0', '#f59e0b'][team.rank - 1] : '#cbd5e1',
                      }}>
                        {team.rank <= 3 ? ['①', '②', '③'][team.rank - 1] : team.rank}
                      </span>
                    </div>

                    {/* Bot/Team */}
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: isElim ? 'rgba(226,232,240,0.6)' : '#fff', letterSpacing: '-0.01em' }}>
                        {team.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(226,232,240,0.7)', marginTop: '2px' }}>
                        {team.country} {team.team}
                      </div>
                    </div>

                    {/* Class */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                        color: CLASS_COLOR[team.class] || '#fff',
                        padding: '3px 8px',
                        border: `1px solid ${CLASS_COLOR[team.class] || '#fff'}77`,
                        background: `${CLASS_COLOR[team.class] || '#fff'}22`,
                      }}>
                        {team.class}
                      </span>
                    </div>

                    {/* W–L */}
                    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700 }}>
                      <span style={{ color: '#00f5c4' }}>{team.wins}</span>
                      <span style={{ color: 'rgba(226,232,240,0.5)', margin: '0 4px' }}>–</span>
                      <span style={{ color: '#ff2d55' }}>{team.losses}</span>
                    </div>

                    {/* K/D */}
                    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#cbd5e1' }}>
                      {team.kd}
                    </div>

                    {/* PTS */}
                    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 800, color: 'var(--sky)' }}>
                      {team.pts.toLocaleString()}
                    </div>

                    {/* Status */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
                        color: s.color === 'rgba(189,200,209,0.35)' ? 'rgba(226,232,240,0.6)' : s.color, padding: '3px 8px',
                        border: `1px solid ${s.border}`,
                        background: s.bg,
                      }}>
                        {team.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* BRACKET TAB */}
      {tab === 'BRACKET' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <div className="leaderboard-bracket">
            {['QF', 'SF', 'GF'].map((round, roundIdx) => {
              const roundLabel = { QF: 'QUARTER-FINALS', SF: 'SEMI-FINALS', GF: 'GRAND FINAL' }[round];
              const matches = BRACKET.filter(m => m.round === round);
              return (
                <div key={round}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700,
                    letterSpacing: '0.25em', color: 'var(--sky)', marginBottom: '16px',
                    paddingBottom: '8px', borderBottom: '1px solid rgba(56,189,248,0.4)',
                  }}>
                    {roundLabel}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {matches.map(match => (
                      <motion.div
                        key={match.matchId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          border: '1px solid rgba(56,189,248,0.3)',
                          background: 'rgba(14,14,18,0.9)',
                          position: 'relative', overflow: 'hidden',
                        }}
                      >
                        {/* Match ID chip */}
                        <div style={{
                          padding: '6px 14px',
                          borderBottom: '1px solid rgba(56,189,248,0.2)',
                          background: 'rgba(56,189,248,0.1)',
                          fontFamily: 'var(--font-mono)', fontSize: '10px',
                          color: 'rgba(56,189,248,0.85)', letterSpacing: '0.2em',
                        }}>
                          MATCH {match.matchId} // {match.score}
                        </div>

                        {/* Team A */}
                        <div style={{
                          padding: '12px 14px',
                          borderBottom: '1px solid rgba(255,255,255,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          background: match.winner === match.a ? 'rgba(0,245,196,0.12)' : 'transparent',
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700,
                            color: match.winner === match.a ? '#00f5c4' : '#cbd5e1',
                            letterSpacing: '0.05em',
                          }}>
                            {match.a}
                          </span>
                          {match.winner === match.a && (
                            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#00f5c4' }}>
                              emoji_events
                            </span>
                          )}
                        </div>

                        {/* VS divider */}
                        <div style={{
                          textAlign: 'center', padding: '4px',
                          fontFamily: 'var(--font-mono)', fontSize: '10px',
                          color: '#ff2d55', letterSpacing: '0.2em',
                        }}>
                          VS
                        </div>

                        {/* Team B */}
                        <div style={{
                          padding: '12px 14px',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          background: match.winner === match.b ? 'rgba(0,245,196,0.12)' : 'transparent',
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700,
                            color: match.winner === match.b ? '#00f5c4' : '#cbd5e1',
                            letterSpacing: '0.05em',
                          }}>
                            {match.b}
                          </span>
                          {match.winner === match.b && (
                            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#00f5c4' }}>
                              emoji_events
                            </span>
                          )}
                        </div>

                        {/* Glow bar on Grand Final */}
                        {round === 'GF' && (
                          <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                            background: 'linear-gradient(90deg, var(--plasma), #fbbf24, var(--plasma))',
                            boxShadow: '0 0 12px rgba(255,45,85,0.8)',
                          }} />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Champion banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{
              marginTop: '32px', padding: '24px', textAlign: 'center',
              border: '1px solid rgba(251,191,36,0.3)',
              background: 'linear-gradient(135deg, rgba(251,191,36,0.08), rgba(255,45,85,0.06))',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#fbbf24', letterSpacing: '0.3em', marginBottom: '8px' }}>
              ⚡ GRAND CHAMPION // TECHFEST 2026
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800,
              color: '#fbbf24', textShadow: '0 0 30px rgba(251,191,36,0.5)',
            }}>
              MEGATRON V4
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'rgba(241,245,249,0.85)', marginTop: '6px' }}>
              TEAM BLITZ 🇮🇳 // 6W–0L // 1800 PTS
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
