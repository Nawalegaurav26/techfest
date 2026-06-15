/* Techfest 2026 — Telemetry Log 23 // PRIVACY PROTOCOL */
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { soundEffects } from '../utils/soundEffects';

const SECTIONS = [
  {
    num: '01',
    title: 'DATA WE COLLECT',
    content: [
      '> Registration information: name, email, institution, phone number.',
      '> Usage analytics: pages visited, session duration, device/browser info.',
      '> Cookies: functional session cookies and third-party analytics cookies.',
      '> Competition submissions, team data, and event participation records.',
      '> Voluntary profile information provided during portal onboarding.',
    ],
  },
  {
    num: '02',
    title: 'HOW WE USE YOUR DATA',
    content: [
      '> Event management: registration confirmation, schedule updates, results.',
      '> Communication: newsletters, important announcements, support responses.',
      '> Platform improvement: identifying usage patterns, fixing bugs, enhancing UX.',
      '> Security: fraud detection, abuse prevention, access control enforcement.',
      '> Analytics: aggregate reporting on participation trends (anonymised).',
    ],
  },
  {
    num: '03',
    title: 'DATA SHARING POLICY',
    content: [
      '> We do NOT sell your personal data to any third party — ever.',
      '> Data is shared with event partners ONLY with your explicit consent.',
      '> Sponsors receive only aggregate, anonymised participation statistics.',
      '> Legal disclosures may occur if required by Indian law or court order.',
      '> Internal sharing is limited to authorised Techfest team members only.',
    ],
  },
  {
    num: '04',
    title: 'COOKIES & TRACKING',
    content: [
      '> Functional cookies: required for login sessions and portal operation.',
      '> Analytics cookies: Google Analytics (anonymised IP) for usage insights.',
      '> No advertising or cross-site tracking cookies are deployed.',
      '> Opt-out: disable non-essential cookies via your browser settings.',
      '> Cookie consent banner is shown on first visit — preferences are stored.',
    ],
  },
  {
    num: '05',
    title: 'YOUR RIGHTS',
    content: [
      '> Access: request a copy of all personal data we hold about you.',
      '> Deletion: request permanent erasure of your account and data.',
      '> Portability: receive your data in a machine-readable JSON format.',
      '> Correction: update inaccurate information at any time via your profile.',
      '> Contact: techfest@iitb.ac.in to exercise any of the above rights.',
    ],
  },
  {
    num: '06',
    title: 'CONTACT & JURISDICTION',
    content: [
      '> Email   : techfest@iitb.ac.in',
      '> Address : Techfest Office, Student Activity Centre,',
      '            IIT Bombay, Powai, Mumbai — 400076, India.',
      '> Phone   : +91-22-2576-7901',
      '> Disputes are governed by laws of India under Mumbai jurisdiction.',
    ],
  },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '12px' }}
      >
        <div className="section-overline" style={{ marginBottom: '12px' }}>
          MODULE 23 // PRIVACY PROTOCOL
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5.5vw, 58px)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          PRIVACY{' '}
          <span
            style={{
              color: 'var(--sky)',
              textShadow: '0 0 30px rgba(56,189,248,0.7), 0 0 60px rgba(56,189,248,0.3)',
            }}
          >
            POLICY
          </span>
        </h1>
      </motion.div>

      {/* Meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          display: 'flex',
          gap: '32px',
          marginBottom: '40px',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'LAST UPDATED', value: 'DECEMBER 01, 2025' },
          { label: 'VERSION', value: 'v3.2.1' },
          { label: 'JURISDICTION', value: 'INDIA / MUMBAI' },
          { label: 'STATUS', value: 'ACTIVE' },
        ].map(item => (
          <div key={item.label} className="readout-row" style={{ flexDirection: 'column', gap: '2px' }}>
            <span
              className="readout-label"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.2em',
              }}
            >
              {item.label}
            </span>
            <span
              className="readout-val"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--sky)',
                letterSpacing: '0.1em',
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Terminal document panel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          background: 'rgba(14,14,18,0.8)',
          border: '1px solid rgba(56,189,248,0.15)',
          padding: '32px',
          position: 'relative',
          maxWidth: '860px',
        }}
      >
        <div className="bracket-tl" />
        <div className="bracket-tr" />
        <div className="bracket-bl" />
        <div className="bracket-br" />

        {/* Terminal top bar */}
        <div
          style={{
            borderBottom: '1px solid rgba(56,189,248,0.1)',
            paddingBottom: '16px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--sky)',
              letterSpacing: '0.2em',
            }}
          >
            TECHFEST_LEGAL v3.2.1
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 4px' }}>|</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.1em',
            }}
          >
            privacy_policy.doc
          </span>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              gap: '6px',
            }}
          >
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div
                key={c}
                style={{ width: 10, height: 10, background: c, opacity: 0.6 }}
              />
            ))}
          </div>
        </div>

        {/* Intro text */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'rgba(56,189,248,0.7)',
            lineHeight: 1.7,
            marginBottom: '32px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {'/* '} This Privacy Policy governs the collection, processing, and storage of personal
          data by Techfest, Indian Institute of Technology Bombay ("Techfest", "we", "us").
          By registering or using the Techfest portal, you agree to the terms outlined below. {' */'}
        </div>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.num}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            style={{
              marginBottom: '32px',
              paddingBottom: '28px',
              borderBottom:
                i < SECTIONS.length - 1
                  ? '1px solid rgba(255,255,255,0.05)'
                  : 'none',
            }}
          >
            {/* Section heading */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--plasma)',
                  letterSpacing: '0.15em',
                  fontWeight: 700,
                }}
              >
                [{section.num}]
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.18em',
                }}
              >
                {section.title}
              </span>
            </div>

            {/* Section lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {section.content.map((line, li) => (
                <div
                  key={li}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'rgba(189,200,209,0.55)',
                    lineHeight: 1.65,
                    paddingLeft: '24px',
                    borderLeft: '1px solid rgba(56,189,248,0.1)',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Footer line */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.15em',
            marginTop: '8px',
          }}
        >
          EOF // techfest_privacy_policy.doc // © 2025 Techfest IIT Bombay. All rights reserved.
        </div>
      </motion.div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{ marginTop: '36px' }}
      >
        <button
          onClick={() => {
            soundEffects.playClick?.();
            navigate('/contact');
          }}
          style={{
            background: 'transparent',
            border: '1px solid rgba(56,189,248,0.3)',
            color: 'var(--sky)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            padding: '12px 28px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(56,189,248,0.08)';
            e.currentTarget.style.borderColor = 'var(--sky)';
            e.currentTarget.style.boxShadow = '0 0 16px rgba(56,189,248,0.15)';
            soundEffects.playHover?.();
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span>←</span>
          <span>BACK TO CONTACT</span>
        </button>
      </motion.div>
    </div>
  );
}
