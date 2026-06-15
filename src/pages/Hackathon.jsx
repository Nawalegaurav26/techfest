/* Techfest 2026 — Telemetry Log 17 // NEURAL HACKATHON */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const PHASES = [
  {
    id: 1,
    icon: '⚡',
    label: 'PHASE 01',
    title: 'Problem Reveal',
    time: '09:00 — Day 1',
    desc: 'Problem statements are revealed across all 6 domains simultaneously. Teams receive access to datasets, APIs, and compute resources. The 36-hour clock starts NOW.',
    color: 'var(--sky)',
    glow: 'rgba(56,189,248,0.2)',
  },
  {
    id: 2,
    icon: '🧠',
    label: 'PHASE 02',
    title: 'Mentor Rounds',
    time: '10:00–18:00 — Day 2',
    desc: 'Industry mentors from Google, ISRO, Microsoft, and D.E. Shaw rotate through teams for 20-minute advisory sessions. Mid-point evaluation and leaderboard reveal.',
    color: 'var(--plasma)',
    glow: 'rgba(255,45,85,0.2)',
  },
  {
    id: 3,
    icon: '🏆',
    label: 'PHASE 03',
    title: 'Final Pitch',
    time: '09:00 — Day 3',
    desc: 'Top 10 teams present to a panel of VCs, researchers, and senior engineers. 5-minute pitch + 5-minute Q&A. Winners announced at Techfest closing ceremony.',
    color: 'var(--green)',
    glow: 'rgba(0,245,196,0.2)',
  },
];

const PRIZES = [
  { rank: '1ST', label: 'Champion', amount: '₹5,00,000', icon: '🥇', color: '#FFD700', glow: 'rgba(255,215,0,0.25)', border: 'rgba(255,215,0,0.5)' },
  { rank: '2ND', label: 'Runner Up', amount: '₹3,00,000', icon: '🥈', color: '#C0C0C0', glow: 'rgba(192,192,192,0.2)', border: 'rgba(192,192,192,0.4)' },
  { rank: '3RD', label: 'Second Runner', amount: '₹1,50,000', icon: '🥉', color: '#CD7F32', glow: 'rgba(205,127,50,0.2)', border: 'rgba(205,127,50,0.4)' },
  { rank: 'ROOKIE', label: 'Best Rookie', amount: '₹75,000', icon: '🌱', color: 'var(--green)', glow: 'rgba(0,245,196,0.2)', border: 'rgba(0,245,196,0.4)' },
];

const RULES = [
  'Teams must consist of 2–4 members. Solo registrations are not permitted.',
  'All code must be written during the hackathon. Pre-built boilerplates are allowed but must be declared.',
  'Solutions must address the given problem statement. Off-topic submissions will be disqualified.',
  'Use of publicly available APIs, open-source libraries, and datasets is permitted and encouraged.',
  'Teams must submit a working prototype + GitHub repo + 3-minute demo video by the deadline.',
  'Plagiarism or code theft results in immediate disqualification and a permanent ban from Techfest.',
];

const DOMAINS = [
  { icon: '🤖', name: 'AI / ML', desc: 'Generative models, edge AI, computer vision, NLP, reinforcement learning.' },
  { icon: '⛓️', name: 'Web3', desc: 'Decentralized apps, smart contracts, DeFi protocols, DAOs, NFT infrastructure.' },
  { icon: '🏥', name: 'Healthcare Tech', desc: 'Diagnostics AI, wearable health, telemedicine platforms, drug discovery.' },
  { icon: '🚀', name: 'Space Tech', desc: 'Satellite comms, orbital mechanics tools, remote sensing, mission simulation.' },
  { icon: '💰', name: 'FinTech', desc: 'Quant trading, fraud detection, credit scoring, embedded finance solutions.' },
  { icon: '🌱', name: 'Sustainability', desc: 'Climate modelling, energy optimization, smart grids, carbon tracking apps.' },
];

export default function Hackathon() {
  const [domainHover, setDomainHover] = useState(null);

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* ── HERO ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', padding: '60px 0 48px', position: 'relative' }}
      >
        <div className="section-overline" style={{ justifyContent: 'center', marginBottom: '20px' }}>
          MODULE 17 // NEURAL HACKATHON
        </div>

        {/* Scan-line hero accent */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '1px', height: '60px',
          background: 'linear-gradient(to bottom, transparent, var(--sky))',
          opacity: 0.5,
        }} />

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(40px, 8vw, 96px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: 'var(--sky)',
          textShadow: '0 0 30px rgba(56,189,248,0.5), 0 0 80px rgba(56,189,248,0.2)',
          marginBottom: '16px',
        }}>
          36-HOUR<br />
          <span style={{ color: '#fff', textShadow: 'none' }}>HACKATHON</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'rgba(189,200,209,0.6)',
          maxWidth: '520px',
          margin: '0 auto 32px',
          lineHeight: 1.7,
        }}>
          Asia's largest student hackathon. Six domains. One leaderboard. ₹10+ lakh in total prizes.
          Build something that changes the world in 36 hours.
        </p>

        {/* Quick stats */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap',
        }}>
          {[
            { val: '36 HRS', label: 'Duration' },
            { val: '₹10L+', label: 'Prize Pool' },
            { val: '500+', label: 'Participants' },
            { val: '6', label: 'Domains' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--sky)',
                textShadow: '0 0 12px rgba(56,189,248,0.5)',
              }}>{stat.val}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'rgba(189,200,209,0.4)',
                letterSpacing: '0.2em',
                marginTop: '4px',
              }}>{stat.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── PHASE TIMELINE ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.25em',
          color: 'rgba(189,200,209,0.4)',
          marginBottom: '20px',
        }}>
          ── HACKATHON PHASES ──
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px', marginBottom: '60px' }}>
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              className="glass-panel"
              style={{
                padding: '28px 24px',
                border: `1px solid ${phase.color}40`,
                background: `${phase.glow.replace('0.2)', '0.04)')}`,
                boxShadow: `0 0 20px ${phase.glow}`,
                position: 'relative',
              }}
            >
              <div className="bracket-tl" style={{ borderColor: phase.color }} />
              <div className="bracket-br" style={{ borderColor: phase.color }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px', lineHeight: 1 }}>{phase.icon}</span>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: phase.color,
                  }}>{phase.label}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#fff',
                    marginTop: '2px',
                  }}>{phase.title}</h3>
                </div>
              </div>

              <div className="readout-row" style={{ marginBottom: '14px' }}>
                <span className="readout-label" style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.4)', fontWeight: 700, letterSpacing: '0.15em',
                }}>TIME</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', color: phase.color, fontWeight: 700,
                }}>{phase.time}</span>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(189,200,209,0.6)',
                lineHeight: 1.6,
              }}>{phase.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── PRIZE TIERS ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '60px' }}
      >
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.25em',
          color: 'rgba(189,200,209,0.4)',
          marginBottom: '20px',
        }}>── PRIZE DISTRIBUTION ──</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px), 1fr))', gap: '16px' }}>
          {PRIZES.map((p, i) => (
            <motion.div
              key={p.rank}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel"
              style={{
                padding: '28px 20px',
                border: `1px solid ${p.border}`,
                background: p.glow.replace('0.2)', '0.04)'),
                boxShadow: `0 0 20px ${p.glow}, inset 0 0 30px ${p.glow.replace('0.2)', '0.02)')}`,
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div className="bracket-tl" style={{ borderColor: p.color }} />
              <div className="bracket-tr" style={{ borderColor: p.color }} />
              <div className="bracket-bl" style={{ borderColor: p.color }} />
              <div className="bracket-br" style={{ borderColor: p.color }} />

              <div style={{ fontSize: '40px', marginBottom: '12px', lineHeight: 1 }}>{p.icon}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: p.color,
                marginBottom: '6px',
              }}>{p.rank} PLACE</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                color: 'rgba(189,200,209,0.5)',
                marginBottom: '12px',
              }}>{p.label}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 4vw, 30px)',
                fontWeight: 800,
                color: p.color,
                textShadow: `0 0 15px ${p.glow}`,
                letterSpacing: '-0.02em',
              }}>{p.amount}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── RULES ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '60px' }}
      >
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.25em',
          color: 'rgba(189,200,209,0.4)',
          marginBottom: '20px',
        }}>── COMPETITION RULESET ──</h2>

        <div
          className="glass-panel"
          style={{
            padding: '28px 32px',
            border: '1px solid rgba(0,245,196,0.15)',
            background: 'rgba(0,245,196,0.02)',
            position: 'relative',
          }}
        >
          <div className="bracket-tl" style={{ borderColor: 'var(--green)' }} />
          <div className="bracket-br" style={{ borderColor: 'var(--green)' }} />

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'var(--green)',
            marginBottom: '20px',
          }}>
            $ cat hackathon_rules.txt
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {RULES.map((rule, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--green)',
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: '1px',
                }}>{String(i + 1).padStart(2, '0')}.</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'rgba(189,200,209,0.75)',
                  lineHeight: 1.6,
                }}>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── PROBLEM DOMAINS ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '60px' }}
      >
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.25em',
          color: 'rgba(189,200,209,0.4)',
          marginBottom: '20px',
        }}>── PROBLEM DOMAINS ──</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,260px), 1fr))', gap: '14px' }}>
          {DOMAINS.map((domain, i) => {
            const isHover = domainHover === i;
            return (
              <motion.div
                key={domain.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onMouseEnter={() => { setDomainHover(i); soundEffects.playHover?.(); }}
                onMouseLeave={() => setDomainHover(null)}
                className="glass-panel"
                style={{
                  padding: '24px 20px',
                  border: isHover ? '1px solid rgba(56,189,248,0.5)' : '1px solid rgba(56,189,248,0.12)',
                  boxShadow: isHover ? '0 0 20px rgba(56,189,248,0.12)' : 'none',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
              >
                <div className="bracket-tl" />
                <div className="bracket-br" />
                <div style={{ fontSize: '32px', marginBottom: '12px', lineHeight: 1 }}>{domain.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 800,
                  color: isHover ? 'var(--sky)' : '#fff',
                  marginBottom: '8px',
                  transition: 'color 0.3s',
                }}>{domain.name}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'rgba(189,200,209,0.55)',
                  lineHeight: 1.6,
                }}>{domain.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── CTA ROW ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-panel"
        style={{
          padding: '40px 32px',
          border: '1px solid rgba(56,189,248,0.2)',
          background: 'rgba(56,189,248,0.02)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="bracket-tl" />
        <div className="bracket-tr" />
        <div className="bracket-bl" />
        <div className="bracket-br" />

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.25em',
          color: 'rgba(189,200,209,0.3)',
          marginBottom: '12px',
        }}>REGISTRATION CLOSES // JAN 15, 2026</div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 4vw, 36px)',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '28px',
        }}>Ready to hack the future?</h2>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/register"
            onClick={() => soundEffects.playClick?.()}
            className="btn-primary"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              fontSize: '12px',
              background: 'var(--sky)',
              color: '#000',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              border: 'none',
              boxShadow: '0 0 24px rgba(56,189,248,0.4)',
            }}
          >
            <span className="btn-tl" style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
            <span className="btn-br" style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
            REGISTER YOUR TEAM
          </a>
          <button
            className="btn-ghost"
            onClick={() => soundEffects.playClick?.()}
            style={{ padding: '14px 32px', fontSize: '12px' }}
          >
            DOWNLOAD PROBLEM PACK
          </button>
        </div>
      </motion.div>
    </div>
  );
}
