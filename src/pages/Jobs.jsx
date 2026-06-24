/* Techfest 2026 — Telemetry Log 19 // RECRUITMENT TERMINAL */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const FILTERS = ['ALL', 'FULL-TIME', 'INTERNSHIP', 'RESEARCH', 'CONTRACT'];

const JOBS = [
  {
    id: 'j1',
    company: 'Google',
    abbr: 'G',
    role: 'SWE Intern',
    type: 'INTERNSHIP',
    salary: '₹1.5L/mo',
    deadline: 'Jan 15',
    skills: ['Python', 'ML', 'APIs'],
    desc: 'Work with the AI team on Gemini infrastructure. Help build scalable ML serving systems and contribute to production-grade models.',
    color: '#4285f4',
  },
  {
    id: 'j2',
    company: 'ISRO',
    abbr: 'IS',
    role: 'Aerospace Research',
    type: 'RESEARCH',
    salary: '₹80K/mo',
    deadline: 'Feb 1',
    skills: ['Propulsion', 'MATLAB', 'CAD'],
    desc: 'Contribute to the Gaganyaan mission simulation team. Develop trajectory models and analyze propulsion subsystems.',
    color: '#ff8c00',
  },
  {
    id: 'j3',
    company: 'Microsoft',
    abbr: 'MS',
    role: 'Product Manager',
    type: 'FULL-TIME',
    salary: '₹45L PA',
    deadline: 'Jan 30',
    skills: ['PM', 'Azure', 'Leadership'],
    desc: 'Join the Azure AI product team in Hyderabad. Define product roadmaps, work with engineering teams, and drive enterprise adoption.',
    color: '#00a4ef',
  },
  {
    id: 'j4',
    company: 'D.E. Shaw',
    abbr: 'DE',
    role: 'Quant Analyst',
    type: 'FULL-TIME',
    salary: '₹60L PA',
    deadline: 'Jan 20',
    skills: ['Stats', 'Python', 'Finance'],
    desc: 'Quantitative trading and risk modeling role. Build statistical models for algorithmic trading and market-making strategies.',
    color: '#00f5c4',
  },
  {
    id: 'j5',
    company: 'NVIDIA',
    abbr: 'NV',
    role: 'CUDA Engineer',
    type: 'FULL-TIME',
    salary: '₹55L PA',
    deadline: 'Feb 10',
    skills: ['CUDA', 'C++', 'GPU'],
    desc: 'GPU kernel optimization for AI inference. Write high-performance CUDA kernels and develop libraries for next-gen AI acceleration.',
    color: '#76b900',
  },
  {
    id: 'j6',
    company: 'IIT Bombay',
    abbr: 'IB',
    role: 'Research Fellow',
    type: 'RESEARCH',
    salary: '₹35K/mo',
    deadline: 'Mar 1',
    skills: ['Research', 'Publications'],
    desc: 'PhD-track research fellowship in the robotics lab. Publish in top-tier conferences and work on state-of-the-art autonomous systems.',
    color: '#ff2d55',
  },
];

const TYPE_COLORS = {
  'FULL-TIME':  { text: '#00f5c4', bg: 'rgba(0,245,196,0.08)', border: 'rgba(0,245,196,0.3)' },
  'INTERNSHIP': { text: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.3)' },
  'RESEARCH':   { text: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.3)' },
  'CONTRACT':   { text: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.3)' },
};

function JobCard({ job, index }) {
  const [applied, setApplied] = useState(false);
  const tc = TYPE_COLORS[job.type] || TYPE_COLORS['CONTRACT'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className="glass-panel"
      style={{
        padding: '24px 22px',
        border: '1px solid rgba(56,189,248,0.12)',
        background: 'rgba(255,255,255,0.015)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <div className="bracket-tl" />
      <div className="bracket-br" />

      {/* Header row: logo + title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        {/* Company logo abbr */}
        <div style={{
          width: '44px',
          height: '44px',
          background: `${job.color}18`,
          border: `1px solid ${job.color}55`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontFamily: 'var(--font-display)',
          fontSize: '12px',
          fontWeight: 800,
          color: job.color,
          letterSpacing: '0.05em',
        }}>
          {job.abbr}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', flexWrap: 'wrap' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: job.color,
                fontWeight: 700,
                letterSpacing: '0.15em',
                marginBottom: '3px',
              }}>{job.company}</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '17px',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.2,
              }}>{job.role}</h3>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              padding: '3px 10px',
              background: tc.bg,
              border: `1px solid ${tc.border}`,
              color: tc.text,
              flexShrink: 0,
            }}>{job.type}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: '#cbd5e1',
        lineHeight: 1.6,
      }}>{job.desc}</p>

      {/* Skills */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {job.skills.map(skill => (
          <span key={skill} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            fontWeight: 700,
            color: '#cbd5e1',
            padding: '3px 10px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            letterSpacing: '0.1em',
          }}>{skill}</span>
        ))}
      </div>

      {/* Footer row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.15em', marginBottom: '2px' }}>SALARY</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 800, color: 'var(--green)' }}>{job.salary}</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'rgba(189,200,209,0.3)', letterSpacing: '0.15em', marginBottom: '2px' }}>DEADLINE</div>
             <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#cbd5e1' }}>{job.deadline}</div>
          </div>
        </div>
        <button
          onClick={() => {
            soundEffects.playClick?.();
            setApplied(true);
          }}
          disabled={applied}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            padding: '9px 18px',
            background: applied ? 'rgba(0,245,196,0.06)' : 'rgba(56,189,248,0.05)',
            border: applied ? '1px solid rgba(0,245,196,0.4)' : `1px solid ${job.color}55`,
            color: applied ? 'var(--green)' : job.color,
            transition: 'all 0.3s ease',
            cursor: applied ? 'default' : 'pointer',
          }}
          onMouseEnter={e => {
            if (!applied) {
              e.currentTarget.style.background = `${job.color}15`;
              e.currentTarget.style.boxShadow = `0 0 12px ${job.color}30`;
              soundEffects.playHover?.();
            }
          }}
          onMouseLeave={e => {
            if (!applied) {
              e.currentTarget.style.background = 'rgba(56,189,248,0.05)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {applied ? '✓ APPLIED' : 'APPLY NOW'}
        </button>
      </div>
    </motion.div>
  );
}

export default function Jobs() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL' ? JOBS : JOBS.filter(j => j.type === activeFilter);

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '40px' }}
      >
        <div className="section-overline" style={{ marginBottom: '14px' }}>
          MODULE 19 // RECRUITMENT TERMINAL
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#fff',
          marginBottom: '12px',
        }}>
          CAREERS &amp; <span
            className="glow-sky"
            style={{ color: 'var(--sky)' }}
          >RECRUITMENT</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15.5px',
          color: '#cbd5e1',
          maxWidth: '520px',
          lineHeight: 1.7,
        }}>
          Exclusive placement opportunities for Techfest attendees and participants. Top companies,
          research labs, and startups recruiting directly on campus.
        </p>
      </motion.div>

      {/* ── FILTER CHIPS ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}
      >
        {FILTERS.map(filter => {
          const isActive = activeFilter === filter;
          const tc = filter !== 'ALL' ? TYPE_COLORS[filter] : null;
          return (
            <button
              key={filter}
              onClick={() => {
                soundEffects.playClick?.();
                setActiveFilter(filter);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                padding: '8px 18px',
                background: isActive
                  ? (tc ? tc.bg : 'rgba(56,189,248,0.08)')
                  : 'rgba(255,255,255,0.02)',
                border: isActive
                  ? `1px solid ${tc ? tc.border : 'rgba(56,189,248,0.5)'}`
                  : '1px solid rgba(255,255,255,0.08)',
                color: isActive ? (tc ? tc.text : 'var(--sky)') : '#cbd5e1',
                boxShadow: isActive ? `0 0 12px ${tc ? tc.border : 'rgba(56,189,248,0.2)'}` : 'none',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)';
                  e.currentTarget.style.color = 'rgba(189,200,209,0.7)';
                  soundEffects.playHover?.();
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(189,200,209,0.4)';
                }
              }}
            >
              {filter}
            </button>
          );
        })}
        <div style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'rgba(189,200,209,0.3)',
          letterSpacing: '0.15em',
          alignSelf: 'center',
        }}>
          {filtered.length} LISTING{filtered.length !== 1 ? 'S' : ''} FOUND
        </div>
      </motion.div>

      {/* ── JOB LISTINGS ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,360px), 1fr))',
            gap: '16px',
          }}
        >
          {filtered.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '80px 20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'rgba(189,200,209,0.3)',
            letterSpacing: '0.1em',
          }}
        >
          NO LISTINGS MATCH THIS FILTER //
        </motion.div>
      )}
    </div>
  );
}
