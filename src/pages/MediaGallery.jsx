/* Techfest 2026 — Telemetry Log 24 // MEDIA ARCHIVE */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const CATEGORY_COLORS = {
  ROBOWARS: '#ff2d55',
  LECTURES: '#a855f7',
  EXHIBITIONS: '#ff8c00',
  CULTURAL: '#00f5c4',
  HACKATHON: '#00f2ff',
};

const GALLERY_ITEMS = [
  { id: 1, category: 'ROBOWARS', title: 'Megatron V4 Finals', year: '2024', span: 'tall', desc: 'The legendary Megatron V4 destroying its opponent in the 2024 Robowars final round. 127kg of pure combat engineering.' },
  { id: 2, category: 'LECTURES', title: 'Dr. Kalam Memorial Talk', year: '2023', span: 'wide', desc: 'Special memorial lecture series honouring Dr. APJ Abdul Kalam, attended by 3,000+ students and faculty.' },
  { id: 3, category: 'EXHIBITIONS', title: 'Mars Rover Display', year: '2023', span: 'square', desc: 'Full-scale Mars Rover replica on display at the Space Tech pavilion, Techfest 2023.' },
  { id: 4, category: 'HACKATHON', title: '24-Hour Sprint', year: '2022', span: 'wide', desc: 'Teams coding through the night at the ByteForce hackathon — 38.5 hours of continuous innovation.' },
  { id: 5, category: 'CULTURAL', title: 'Drone Light Show', year: '2023', span: 'tall', desc: '200-drone choreographed light show over the IIT Bombay main ground, visible from 5km away.' },
  { id: 6, category: 'ROBOWARS', title: 'Semi-Final Clash', year: '2023', span: 'square', desc: 'SkyFox vs Team Omega in the semifinal — sparks flying as two 80kg bots collide at full speed.' },
  { id: 7, category: 'LECTURES', title: 'AI Future Panel', year: '2024', span: 'square', desc: 'Top AI researchers from MIT, DeepMind, and IIT Bombay discuss the road to AGI.' },
  { id: 8, category: 'EXHIBITIONS', title: 'Humanoid Robot Zone', year: '2024', span: 'wide', desc: 'Interactive humanoid robotics exhibition featuring Boston Dynamics-class demos and live interaction.' },
  { id: 9, category: 'CULTURAL', title: 'Opening Ceremony', year: '2023', span: 'tall', desc: 'Grand opening ceremony with 15,000 attendees, laser show, and live band performance at the convocation ground.' },
  { id: 10, category: 'HACKATHON', title: 'Award Ceremony', year: '2023', span: 'square', desc: 'Winners of TF Hack 2023 receiving the ₹5L grand prize from the jury panel.' },
  { id: 11, category: 'ROBOWARS', title: 'Pit Area Operations', year: '2022', span: 'wide', desc: 'Engineers frantically repairing bots between rounds in the high-energy Robowars pit area.' },
  { id: 12, category: 'LECTURES', title: 'Space Robotics Talk', year: '2022', span: 'square', desc: 'ISRO scientist on India\'s future in autonomous space robotics and the Gaganyaan mission.' },
  { id: 13, category: 'EXHIBITIONS', title: 'Nano-Tech Pavilion', year: '2023', span: 'tall', desc: 'Cutting-edge nanotechnology and materials science showcase featuring live microscopy demonstrations.' },
  { id: 14, category: 'CULTURAL', title: 'Bot Mascot Parade', year: '2024', span: 'square', desc: 'Techfest\'s iconic bot mascot parade with 12 giant animatronic figures rolling through the campus.' },
  { id: 15, category: 'HACKATHON', title: 'Quantum Computing Challenge', year: '2024', span: 'wide', desc: 'India\'s first quantum computing hackathon, run in partnership with IBM Quantum Network.' },
  { id: 16, category: 'EXHIBITIONS', title: 'VR Experience Zone', year: '2024', span: 'square', desc: 'Immersive virtual reality zone simulating a walk on the Moon, 10,000 visitors in 3 days.' },
];

const SPAN_STYLES = {
  tall:   { gridRow: 'span 2', aspectRatio: undefined },
  wide:   { gridColumn: 'span 2', aspectRatio: undefined },
  square: {},
};

const TABS = ['ALL', 'ROBOWARS', 'LECTURES', 'EXHIBITIONS', 'CULTURAL', 'HACKATHON'];

function GalleryCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLORS[item.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35 }}
      style={{
        ...SPAN_STYLES[item.span],
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        minHeight: item.span === 'tall' ? '340px' : '160px',
        background: `linear-gradient(135deg, ${color}22 0%, rgba(5,5,8,0.95) 60%, ${color}11 100%)`,
        border: `1px solid ${color}33`,
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? `0 8px 40px ${color}33` : 'none',
      }}
      onClick={() => {
        soundEffects.playClick?.();
        onClick(item);
      }}
      onMouseEnter={() => { setHovered(true); soundEffects.playHover?.(); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${color}06 0px,
            ${color}06 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: 'absolute',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          top: '20%',
          left: '20%',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Category badge */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: color + 'cc',
          color: '#050508',
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          padding: '4px 8px',
          zIndex: 2,
        }}
      >
        {item.category}
      </div>

      {/* Year badge */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: color + 'bb',
          letterSpacing: '0.1em',
          zIndex: 2,
        }}
      >
        {item.year}
      </div>

      {/* Bottom title overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: `linear-gradient(to top, rgba(5,5,8,0.95) 0%, transparent 100%)`,
          padding: '32px 16px 16px',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.04em',
          }}
        >
          {item.title}
        </div>
      </div>

      {/* Hover VIEW overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `rgba(5,5,8,0.5)`,
              zIndex: 3,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  border: `1px solid ${color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: color,
                  fontSize: '18px',
                }}
              >
                ⊕
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: color,
                  letterSpacing: '0.25em',
                  fontWeight: 700,
                }}
              >
                VIEW
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LightboxModal({ item, onClose }) {
  const color = CATEGORY_COLORS[item.category];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5,5,8,0.92)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(14,14,18,0.98)',
          border: `1px solid ${color}44`,
          maxWidth: '680px',
          width: '100%',
          position: 'relative',
          boxShadow: `0 0 80px ${color}22`,
        }}
      >
        <div className="bracket-tl" />
        <div className="bracket-tr" />
        <div className="bracket-bl" />
        <div className="bracket-br" />

        {/* Image preview area */}
        <div
          style={{
            height: '280px',
            background: `linear-gradient(135deg, ${color}22 0%, rgba(5,5,8,0.9) 50%, ${color}11 100%)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `repeating-linear-gradient(45deg, ${color}08 0px, ${color}08 1px, transparent 1px, transparent 24px)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: '48px', opacity: 0.3 }}>◈</div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: color + '88',
                letterSpacing: '0.3em',
              }}
            >
              MEDIA // {item.category}
            </div>
          </div>

          {/* Category tag */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: color,
              color: '#050508',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              padding: '5px 10px',
            }}
          >
            {item.category}
          </div>

          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: color,
              letterSpacing: '0.1em',
            }}
          >
            {item.year}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '28px' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '12px',
              letterSpacing: '0.02em',
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(189,200,209,0.6)',
              lineHeight: 1.7,
              marginBottom: '24px',
            }}
          >
            {item.desc}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: `1px solid ${color}55`,
                color: color,
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                padding: '10px 24px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = color + '15';
                e.currentTarget.style.borderColor = color;
                soundEffects.playHover?.();
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = color + '55';
              }}
            >
              ✕ CLOSE
            </button>
            <button
              style={{
                background: color + '15',
                border: `1px solid ${color}`,
                color: color,
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                padding: '10px 24px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = color + '30';
                soundEffects.playHover?.();
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = color + '15';
              }}
              onClick={() => soundEffects.playClick?.()}
            >
              ↓ DOWNLOAD
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered =
    activeTab === 'ALL'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(item => item.category === activeTab);

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
          MODULE 24 // MEDIA ARCHIVE
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 6vw, 62px)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          MEDIA{' '}
          <span
            style={{
              color: 'var(--plasma)',
              textShadow: '0 0 30px rgba(255,45,85,0.7), 0 0 60px rgba(255,45,85,0.3)',
            }}
          >
            GALLERY
          </span>
        </h1>
      </motion.div>

      {/* Sub-text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'rgba(189,200,209,0.5)',
          marginBottom: '36px',
          lineHeight: 1.6,
          maxWidth: '500px',
        }}
      >
        A visual archive spanning 10 editions. Explore moments from Robowars, landmark
        lectures, cultural nights, exhibitions, and hackathons.
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '32px',
        }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab;
          const color =
            tab === 'ALL' ? 'var(--sky)' : CATEGORY_COLORS[tab];
          return (
            <button
              key={tab}
              onClick={() => {
                soundEffects.playClick?.();
                setActiveTab(tab);
              }}
              style={{
                background: isActive ? color + '20' : 'transparent',
                border: `1px solid ${isActive ? color : 'rgba(255,255,255,0.1)'}`,
                color: isActive ? color : 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.18em',
                padding: '8px 18px',
                cursor: 'pointer',
                transition: 'all 0.25s',
                fontWeight: isActive ? 700 : 400,
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.color = color;
                }
                soundEffects.playHover?.();
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                }
              }}
            >
              {tab}
            </button>
          );
        })}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gridAutoRows: '160px',
          gap: '12px',
          marginBottom: '48px',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(item => (
            <GalleryCard key={item.id} item={item} onClick={setLightboxItem} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '32px',
        }}
      >
        {[
          { value: '500+', label: 'Photos' },
          { value: '120+', label: 'Videos' },
          { value: '10', label: 'Editions Archived' },
        ].map(stat => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--plasma)',
                textShadow: '0 0 20px rgba(255,45,85,0.4)',
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <LightboxModal
            item={lightboxItem}
            onClose={() => {
              soundEffects.playClick?.();
              setLightboxItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
