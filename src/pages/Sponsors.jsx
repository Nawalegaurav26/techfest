/* Techfest 2026 — Telemetry Log 11-ENHANCED // SPONSOR TIER SHOWCASE */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const TIERS = [
  {
    id: 'title',
    name: 'TITLE SPONSOR',
    code: 'TIER-0',
    color: '#ff2d55',
    glow: 'rgba(255,45,85,0.3)',
    perks: ['Full naming rights', 'Prime stage branding', 'Opening ceremony slot', 'Exclusive hiring booth'],
    sponsors: [
      { name: 'NEXCORE SYSTEMS', role: 'AI Infrastructure Partner', abbr: 'NX', desc: 'Leading AI chip manufacturer powering the next generation of autonomous systems.' },
    ],
  },
  {
    id: 'platinum',
    name: 'PLATINUM',
    code: 'TIER-1',
    color: '#e0e0ff',
    glow: 'rgba(200,200,255,0.25)',
    perks: ['Main stage branding', 'Dedicated hiring day', 'Workshop slot', '500 CV database access'],
    sponsors: [
      { name: 'GOOGLE',    role: 'Cloud & AI Partner',  abbr: 'G',  desc: 'Powering Techfest with Google Cloud, Gemini AI, and Maps Platform across all digital infrastructure.' },
      { name: 'MICROSOFT', role: 'Azure Partner',        abbr: 'M',  desc: 'Providing Azure AI services, GitHub Copilot access, and ₹1L in cloud credits for all participants.' },
    ],
  },
  {
    id: 'gold',
    name: 'GOLD',
    code: 'TIER-2',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.2)',
    perks: ['Venue branding', 'Competition sponsorship', 'Alumni network access', 'Social media features'],
    sponsors: [
      { name: 'ISRO',     role: 'Space Technology Partner', abbr: '🚀', desc: 'Showcasing the Gaganyaan module and live mission data feeds at the Space Pavilion.' },
      { name: 'INTEL',    role: 'Hardware Partner',         abbr: 'IN', desc: 'Supplying Core Ultra processors and Gaudi AI accelerators for the hackathon compute cluster.' },
      { name: 'QUALCOMM', role: 'Chipset Partner',          abbr: 'QC', desc: 'Powering the IoT and embedded systems workshop track with Snapdragon Dev Kits.' },
    ],
  },
  {
    id: 'silver',
    name: 'SILVER',
    code: 'TIER-3',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.18)',
    perks: ['Event co-branding', 'Stall in exhibition zone', 'Email to database', 'Certificate co-sign'],
    sponsors: [
      { name: 'AWS',     role: 'Cloud',         abbr: 'AW', desc: 'Providing cloud infrastructure, S3 buckets, and Lambda credits for all registered teams.' },
      { name: 'NVIDIA',  role: 'GPU Computing',  abbr: 'NV', desc: 'RTX 4090 workstation access for all ML/AI workshop participants.' },
      { name: 'SAMSUNG', role: 'Mobile Partner', abbr: 'SM', desc: 'Galaxy S24 Ultra devices available for UI/UX demo tracks and AR workshops.' },
      { name: 'D.E. SHAW', role: 'Finance Partner', abbr: 'DS', desc: 'Sponsoring the Quant Finance track and recruiting STEM talent directly.' },
    ],
  },
  {
    id: 'bronze',
    name: 'BRONZE',
    code: 'TIER-4',
    color: '#cd7f32',
    glow: 'rgba(205,127,50,0.15)',
    perks: ['Logo on materials', 'Goody bag inserts', 'Social media mention'],
    sponsors: [
      { name: 'TCS',      role: 'IT Services',      abbr: 'T',  desc: 'Techfest campus placement partner for 2026 batch.' },
      { name: 'FLIPKART', role: 'E-Commerce',        abbr: 'F',  desc: 'Sponsoring the e-commerce case study track.' },
      { name: 'ZOMATO',   role: 'Food Tech',         abbr: 'Z',  desc: 'Providing discounted meals for all registered participants.' },
      { name: 'DRDO',     role: 'Defence Research',  abbr: '⊗',  desc: 'Special defence tech exhibit at the Science Pavilion.' },
      { name: 'PAYTM',    role: 'Fintech',           abbr: 'P',  desc: 'Official payments partner for all Techfest 2026 transactions.' },
    ],
  },
];

const STATS = [
  { value: '150K+', label: 'ATTENDEES REACHED' },
  { value: '45+',   label: 'NATIONS REPRESENTED' },
  { value: '₹8CR',  label: 'SPONSORSHIP RAISED' },
  { value: '72',    label: 'SPONSOR BRANDS' },
];

export default function Sponsors() {
  const [activeTier, setActiveTier] = useState(null);
  const [hoveredSponsor, setHoveredSponsor] = useState(null);

  return (
    <div className="page-section" style={{ paddingBottom: '80px', minHeight: '90vh' }}>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 16 // STRATEGIC ALLIANCES</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
        }}>
          OUR <span style={{ color: '#fbbf24', textShadow: '0 0 20px rgba(251,191,36,0.4)' }}>SPONSORS</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(241,245,249,0.9)', maxWidth: '640px', lineHeight: 1.7 }}>
          Techfest 2026 is powered by the world's most innovative companies. These strategic alliances make Asia's largest Science & Technology Festival possible.
        </p>
      </motion.div>

      {/* STATS ROW */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', margin: '32px 0', background: 'rgba(255,255,255,0.06)' }}
      >
        {STATS.map(s => (
          <div key={s.label} style={{ padding: '24px 16px', background: 'var(--surface-0)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#fbbf24', marginBottom: '6px' }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(226,232,240,0.7)', letterSpacing: '0.2em' }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* TIER SECTIONS */}
      {TIERS.map((tier, ti) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: ti * 0.08, duration: 0.6 }}
          style={{ marginBottom: '40px' }}
        >
          {/* Tier header */}
          <div
            onClick={() => { soundEffects.playClick?.(); setActiveTier(activeTier === tier.id ? null : tier.id); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '14px 20px', cursor: 'pointer',
              border: `1px solid ${activeTier === tier.id ? tier.color + '88' : tier.color + '33'}`,
              background: activeTier === tier.id ? `${tier.color}0e` : 'rgba(14,14,18,0.7)',
              transition: 'all 0.3s',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Glow line */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
              background: tier.color,
              boxShadow: `0 0 12px ${tier.glow}`,
            }} />

            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em',
              color: tier.color, padding: '3px 8px',
              border: `1px solid ${tier.color}55`,
              background: `${tier.color}10`,
              marginLeft: '8px', flexShrink: 0,
            }}>
              {tier.code}
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 800, color: tier.color, flex: 1 }}>
              {tier.name}
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(226, 232, 240, 0.75)' }}>
              {tier.sponsors.length} {tier.sponsors.length === 1 ? 'PARTNER' : 'PARTNERS'}
            </div>

            <span className="material-symbols-outlined" style={{
              fontSize: '18px', color: tier.color,
              transform: activeTier === tier.id ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}>
              expand_more
            </span>
          </div>

          {/* Sponsor cards */}
          <AnimatePresence>
            {activeTier === tier.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: tier.id === 'title' ? '1fr' : 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '1px',
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${tier.color}22`,
                  borderTop: 'none',
                }}>
                  {tier.sponsors.map((sp, si) => (
                    <motion.div
                      key={sp.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: si * 0.07 }}
                      onMouseEnter={() => { soundEffects.playHover?.(); setHoveredSponsor(sp.name); }}
                      onMouseLeave={() => setHoveredSponsor(null)}
                      style={{
                        padding: '28px 24px',
                        background: hoveredSponsor === sp.name ? `${tier.color}0c` : 'var(--surface-0)',
                        transition: 'background 0.3s',
                        cursor: 'default',
                        position: 'relative',
                      }}
                    >
                      {/* Logo circle */}
                      <div style={{
                        width: tier.id === 'title' ? '80px' : '56px',
                        height: tier.id === 'title' ? '80px' : '56px',
                        border: `2px solid ${tier.color}66`,
                        background: `${tier.color}12`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '16px',
                        boxShadow: hoveredSponsor === sp.name ? `0 0 20px ${tier.glow}` : 'none',
                        transition: 'box-shadow 0.3s',
                        fontFamily: 'var(--font-display)',
                        fontSize: tier.id === 'title' ? '28px' : '20px',
                        fontWeight: 800,
                        color: tier.color,
                      }}>
                        {sp.abbr}
                      </div>

                      <div style={{ fontFamily: 'var(--font-display)', fontSize: tier.id === 'title' ? '22px' : '16px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                        {sp.name}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px', color: tier.color,
                        letterSpacing: '0.15em', marginBottom: '12px',
                      }}>
                        {sp.role}
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(226, 232, 240, 0.85)', lineHeight: 1.7, margin: 0 }}>
                        {sp.desc}
                      </p>
                    </motion.div>
                  ))}

                  {/* Tier perks panel */}
                  <div style={{
                    padding: '28px 24px',
                    background: 'rgba(5,5,8,0.6)',
                    borderLeft: `1px solid ${tier.color}22`,
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: tier.color, letterSpacing: '0.2em', marginBottom: '14px' }}>
                      PARTNER BENEFITS
                    </div>
                    {tier.perks.map((p, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '7px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        fontFamily: 'var(--font-body)', fontSize: '14px',
                        color: 'rgba(241, 245, 249, 0.9)',
                      }}>
                        <div style={{ width: '5px', height: '5px', background: tier.color, flexShrink: 0 }} />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* BECOME A SPONSOR CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          padding: '48px 32px', textAlign: 'center',
          border: '1px solid rgba(251,191,36,0.25)',
          background: 'linear-gradient(135deg, rgba(251,191,36,0.06) 0%, rgba(255,45,85,0.04) 100%)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(251,191,36,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="bracket-tl" style={{ borderColor: '#fbbf24' }} />
        <div className="bracket-tr" style={{ borderColor: '#fbbf24' }} />
        <div className="bracket-bl" style={{ borderColor: '#fbbf24' }} />
        <div className="bracket-br" style={{ borderColor: '#fbbf24' }} />

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#fbbf24', letterSpacing: '0.3em', marginBottom: '12px' }}>
          OPEN FOR PARTNERSHIPS
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
          BECOME A <span style={{ color: '#fbbf24' }}>TECHFEST 2026</span> SPONSOR
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(241,245,249,0.9)', maxWidth: '640px', margin: '0 auto 28px', lineHeight: 1.7 }}>
          Reach 150K+ highly engaged STEM professionals, engineers, and future innovators. Custom partnership packages available for all tiers.
        </p>
        <a
          href="mailto:sponsors@techfest.org"
          style={{ textDecoration: 'none' }}
        >
          <button className="btn-primary" style={{ margin: '0 auto' }}>
            <span className="btn-tl" /><span className="btn-br" />
            CONTACT SPONSORSHIP TEAM
          </button>
        </a>
      </motion.div>
    </div>
  );
}
