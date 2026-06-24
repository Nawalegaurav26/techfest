/* Techfest 2026 — Telemetry Log 22 // TECHFEST HISTORY */
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { soundEffects } from '../utils/soundEffects';

const MILESTONES = [
  {
    year: '1998',
    title: 'First Edition',
    desc: "IIT Bombay's inaugural science festival. 500 participants, 12 events.",
    color: '#38BDF8',
  },
  {
    year: '2001',
    title: 'Going National',
    desc: 'Pan-India reach achieved. 3,000 participants from 50+ colleges.',
    color: '#ff2d55',
  },
  {
    year: '2005',
    title: 'International Recognition',
    desc: 'First international teams from 10 countries. Prize pool crosses ₹10L.',
    color: '#a855f7',
  },
  {
    year: '2008',
    title: 'Decade Growth',
    desc: '15,000 participants, 150+ events. ISRO partnership formed.',
    color: '#fbbf24',
  },
  {
    year: '2010',
    title: 'Guinness Record',
    desc: 'Largest science festival record attempted. 50,000 visitors.',
    color: '#38BDF8',
  },
  {
    year: '2015',
    title: 'Digital Evolution',
    desc: 'Online registrations, livestreaming, and drone shows introduced.',
    color: '#ff2d55',
  },
  {
    year: '2018',
    title: 'Robowars Expansion',
    desc: 'International robot combat league partnership. ₹50L prize pool.',
    color: '#a855f7',
  },
  {
    year: '2020',
    title: 'Virtual Pivot',
    desc: 'COVID-19 edition goes fully digital. 1,00,000 virtual participants.',
    color: '#fbbf24',
  },
  {
    year: '2023',
    title: 'Return Triumphant',
    desc: 'Largest in-person edition. 15,000 participants, ₹80L prizes.',
    color: '#38BDF8',
  },
  {
    year: '2026',
    title: 'Cybernetic Evolution',
    desc: 'AI integration, 1 Crore+ prize pool, global expansion.',
    color: '#ff2d55',
  },
];

function TimelineCard({ milestone, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        position: 'relative',
        marginBottom: '48px',
      }}
    >
      {/* Centre dot */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '28px',
          transform: 'translateX(-50%)',
          width: '14px',
          height: '14px',
          background: milestone.color,
          boxShadow: `0 0 16px ${milestone.color}`,
          zIndex: 2,
          border: '2px solid rgba(5,5,8,0.9)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="bracket-tl bracket-br"
        style={{
          width: 'calc(50% - 40px)',
          background: 'rgba(14,14,18,0.8)',
          border: `1px solid ${milestone.color}33`,
          padding: '24px',
          position: 'relative',
          cursor: 'default',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = milestone.color + '88';
          e.currentTarget.style.boxShadow = `0 0 24px ${milestone.color}22`;
          soundEffects.playHover?.();
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = milestone.color + '33';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Connector line to centre */}
        <div
          style={{
            position: 'absolute',
            top: '34px',
            [isLeft ? 'right' : 'left']: '-40px',
            width: '38px',
            height: '1.5px',
            background: `linear-gradient(${isLeft ? 'to right' : 'to left'}, transparent, ${milestone.color}bb)`,
          }}
        />

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 52px)',
            fontWeight: 900,
            color: milestone.color,
            lineHeight: 1,
            textShadow: `0 0 24px ${milestone.color}88`,
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}
        >
          {milestone.year}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '8px',
            letterSpacing: '0.02em',
          }}
        >
          {milestone.title}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'rgba(241,245,249,0.85)',
            lineHeight: 1.6,
          }}
        >
          {milestone.desc}
        </div>

        {/* Index badge */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: milestone.color,
            fontWeight: 'bold',
            letterSpacing: '0.15em',
          }}
        >
          {String(index + 1).padStart(2, '0')} / 10
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '16px' }}
      >
        <div className="section-overline" style={{ marginBottom: '12px' }}>
          MODULE 22 // TECHFEST HISTORY
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          TECHFEST{' '}
          <span
            style={{
              color: 'var(--plasma)',
              textShadow: '0 0 30px #ff2d5588, 0 0 60px #ff2d5544',
            }}
          >
            HISTORY
          </span>
        </h1>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'rgba(241,245,249,0.6)',
            marginTop: '8px',
            letterSpacing: '0.3em',
          }}
        >
          SINCE 1998
        </div>
      </motion.div>

      {/* Sub-description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: 'rgba(241,245,249,0.8)',
          lineHeight: 1.7,
          maxWidth: '600px',
          marginBottom: '60px',
        }}
      >
        From a modest debut in 1998 to Asia's largest science festival, trace the evolution of
        Techfest through its most defining milestones — year by year, innovation by innovation.
      </motion.div>

      {/* Timeline Container */}
      <div style={{ position: 'relative' }}>
        {/* Vertical centre spine */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1.5px',
            transform: 'translateX(-50%)',
            background:
              'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2) 10%, rgba(255,255,255,0.2) 90%, transparent)',
            zIndex: 1,
          }}
        />

        {MILESTONES.map((milestone, index) => (
          <TimelineCard key={milestone.year} milestone={milestone} index={index} />
        ))}
      </div>

      {/* Stats footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
          marginTop: '24px',
        }}
      >
        {[
          { label: 'YEARS RUNNING', value: '28+' },
          { label: 'TOTAL EVENTS', value: '1,500+' },
          { label: 'GLOBAL NATIONS', value: '54+' },
          { label: 'PRIZE AWARDED', value: '₹1CR+' },
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              background: 'rgba(14,14,18,0.8)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '20px 24px',
              position: 'relative',
            }}
          >
            <div className="bracket-tl" />
            <div className="bracket-br" />
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--sky)',
                textShadow: '0 0 20px rgba(56,189,248,0.5)',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(241,245,249,0.65)',
                letterSpacing: '0.2em',
                marginTop: '4px',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
