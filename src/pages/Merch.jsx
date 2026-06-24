/* Techfest 2026 — Telemetry Log 26 // MERCHANDISE CATALOG */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const PRODUCTS = [
  { id: 1, name: 'Cyber Hoodie 2026', category: 'APPAREL', price: 1299, color: '#38bdf8', desc: 'Black hoodie with Techfest 2026 cyberpunk circuit print. Sizes XS-XXL.' },
  { id: 2, name: 'Bot Tee', category: 'APPAREL', price: 599, color: '#ff2d55', desc: 'Limited edition robot graphic tee. Pre-shrunk cotton.' },
  { id: 3, name: 'Circuit Cap', category: 'ACCESSORIES', price: 399, color: '#a855f7', desc: 'Snapback with embroidered Techfest logo and circuit pattern.' },
  { id: 4, name: 'Holographic Sticker Pack', category: 'ACCESSORIES', price: 149, color: '#00f5c4', desc: '12 holographic stickers. Logo, bots, circuit art, and mascot.' },
  { id: 5, name: 'Techfest Mug 2026', category: 'ACCESSORIES', price: 449, color: '#fbbf24', desc: '11oz ceramic mug. Dishwasher safe. Color-change heat reveal.' },
  { id: 6, name: 'Laptop Sleeve', category: 'ACCESSORIES', price: 899, color: '#38bdf8', desc: '15-inch neoprene laptop sleeve with magnetic closure.' },
  { id: 7, name: 'Collectible Pin Set', category: 'COLLECTIBLES', price: 299, color: '#ff8c00', desc: '6 enamel pins: Techfest logo, Robowars, Drone, and more.' },
  { id: 8, name: 'Limited Edition Poster', category: 'COLLECTIBLES', price: 349, color: '#a855f7', desc: 'A2 glossy poster. Signed by Techfest 2026 design team.' },
  { id: 9, name: 'NFT Badge — Gold', category: 'DIGITAL', price: 499, color: '#fbbf24', desc: 'Exclusive digital attendance badge. Minted on Polygon chain.' },
  { id: 10, name: 'Digital Wallpaper Pack', category: 'DIGITAL', price: 99, color: '#00f5c4', desc: '20 4K cyberpunk wallpapers. Desktop + mobile variants.' },
  { id: 11, name: 'Certificate Frame', category: 'COLLECTIBLES', price: 799, color: '#6ee7b7', desc: 'Premium laser-engraved frame sized for Techfest certificates.' },
  { id: 12, name: 'Bot Figure', category: 'COLLECTIBLES', price: 1499, color: '#ff2d55', desc: '3D-printed Megatron V4 bot figure. Painted. Limited to 200 units.' },
];

const TABS = ['ALL', 'APPAREL', 'ACCESSORIES', 'COLLECTIBLES', 'DIGITAL'];

function ProductCard({ product, isWishlisted, onWishlist, onBuy }) {
  const [hovered, setHovered] = useState(false);
  const c = product.color;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35 }}
      style={{
        background: 'rgba(14,14,18,0.85)',
        border: `1px solid ${hovered ? c + '66' : 'rgba(255,255,255,0.07)'}`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 8px 40px ${c}18` : 'none',
      }}
      onMouseEnter={() => { setHovered(true); soundEffects.playHover?.(); }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bracket-tl" />
      <div className="bracket-br" />

      {/* Color header band */}
      <div
        style={{
          height: '6px',
          background: `linear-gradient(90deg, ${c}, ${c}44)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)`,
            backgroundSize: '200% 100%',
            animation: 'goldShimmer 2s linear infinite',
          }}
        />
      </div>

      {/* Wishlist toggle */}
      <button
        onClick={e => {
          e.stopPropagation();
          soundEffects.playClick?.();
          onWishlist(product.id);
        }}
        style={{
          position: 'absolute',
          top: '18px',
          right: '14px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '18px',
          lineHeight: 1,
          padding: '4px',
          color: isWishlisted ? '#ff2d55' : 'rgba(255,255,255,0.2)',
          transition: 'color 0.25s, transform 0.25s',
          transform: isWishlisted ? 'scale(1.2)' : 'scale(1)',
          zIndex: 2,
        }}
        title="Add to wishlist"
      >
        {isWishlisted ? '♥' : '♡'}
      </button>

      {/* Card body */}
      <div style={{ padding: '20px 20px 0' }}>
        {/* Category badge */}
        <div
          style={{
            display: 'inline-block',
            background: c + '18',
            border: `1px solid ${c}44`,
            color: c,
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            padding: '3px 8px',
            marginBottom: '12px',
          }}
        >
          {product.category}
        </div>

        {/* Product visual placeholder */}
        <div
          style={{
            height: '100px',
            background: `radial-gradient(circle at 40% 40%, ${c}20 0%, rgba(5,5,8,0.6) 70%)`,
            border: `1px solid ${c}15`,
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `repeating-linear-gradient(45deg, ${c}06 0px, ${c}06 1px, transparent 1px, transparent 16px)`,
            }}
          />
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 900,
              color: c + '30',
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
          >
            TF
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.3,
            marginBottom: '6px',
            paddingRight: '24px',
          }}
        >
          {product.name}
        </div>

        {/* Description */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'rgba(226, 232, 240, 0.85)',
            lineHeight: 1.6,
            marginBottom: '16px',
            minHeight: '38px',
          }}
        >
          {product.desc}
        </div>

        {/* Price */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 900,
            color: '#fbbf24',
            textShadow: '0 0 16px rgba(251,191,36,0.4)',
            marginBottom: '16px',
          }}
        >
          ₹{product.price.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          marginTop: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <button
          onClick={() => {
            soundEffects.playClick?.();
            onWishlist(product.id);
          }}
          style={{
            background: 'transparent',
            border: 'none',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            color: isWishlisted ? '#ff2d55' : '#cbd5e1',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            padding: '12px 8px',
            cursor: 'pointer',
            transition: 'all 0.25s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,45,85,0.08)';
            e.currentTarget.style.color = '#ff2d55';
            soundEffects.playHover?.();
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = isWishlisted ? '#ff2d55' : '#cbd5e1';
          }}
        >
          {isWishlisted ? '♥' : '♡'} WISHLIST
        </button>

        <button
          onClick={() => {
            soundEffects.playClick?.();
            onBuy(product);
          }}
          style={{
            background: c + '15',
            border: 'none',
            color: c,
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            padding: '12px 8px',
            cursor: 'pointer',
            transition: 'all 0.25s',
            fontWeight: 700,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = c + '30';
            soundEffects.playHover?.();
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = c + '15';
          }}
        >
          BUY NOW →
        </button>
      </div>
    </motion.div>
  );
}

const shimmerKeyframes = `
@keyframes goldShimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
`;

export default function Merch() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [wishlisted, setWishlisted] = useState(new Set());
  const [cartCount, setCartCount] = useState(0);
  const [cartFlash, setCartFlash] = useState(false);

  const filtered =
    activeTab === 'ALL'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeTab);

  const toggleWishlist = id => {
    setWishlisted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBuy = product => {
    setCartCount(c => c + 1);
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 600);
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>
      <style>{shimmerKeyframes}</style>

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '12px',
        }}
      >
        <div>
          <div className="section-overline" style={{ marginBottom: '12px' }}>
            MODULE 26 // MERCHANDISE CATALOG
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
            TECHFEST{' '}
            <span
              style={{
                color: 'var(--sky)',
                textShadow:
                  '0 0 30px rgba(56,189,248,0.7), 0 0 60px rgba(56,189,248,0.3)',
              }}
            >
              MERCH
            </span>
          </h1>
        </div>

        {/* Cart counter */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingTop: '8px' }}>
          {wishlisted.size > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#ff2d55',
                letterSpacing: '0.1em',
              }}
            >
              ♥ {wishlisted.size} SAVED
            </div>
          )}

          <motion.div
            animate={cartFlash ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'relative',
              background: cartFlash
                ? 'rgba(56,189,248,0.2)'
                : 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.3)',
              padding: '10px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--sky)',
              letterSpacing: '0.15em',
              transition: 'background 0.3s',
            }}
          >
            <span style={{ fontSize: '16px' }}>🛒</span>
            CART
            {cartCount > 0 && (
              <motion.div
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'var(--plasma)',
                  color: '#fff',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                {cartCount}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'rgba(241, 245, 249, 0.9)',
          marginBottom: '36px',
          lineHeight: 1.6,
          maxWidth: '640px',
        }}
      >
        Official Techfest 2026 merchandise — from cyberpunk apparel and collectibles
        to digital assets. Limited quantities available.
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
          return (
            <button
              key={tab}
              onClick={() => {
                soundEffects.playClick?.();
                setActiveTab(tab);
              }}
              style={{
                background: isActive
                  ? 'rgba(56,189,248,0.12)'
                  : 'transparent',
                border: `1px solid ${isActive ? 'var(--sky)' : 'rgba(255,255,255,0.25)'}`,
                color: isActive ? 'var(--sky)' : '#cbd5e1',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.18em',
                padding: '10px 20px',
                cursor: 'pointer',
                transition: 'all 0.25s',
                fontWeight: isActive ? 700 : 400,
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.5)';
                  e.currentTarget.style.color = 'var(--sky)';
                }
                soundEffects.playHover?.();
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.color = '#cbd5e1';
                }
              }}
            >
              {tab}
            </button>
          );
        })}

        {/* Item count */}
        <div
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'rgba(226, 232, 240, 0.65)',
            letterSpacing: '0.15em',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {filtered.length} ITEMS
        </div>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
          gap: '16px',
          marginBottom: '48px',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlisted.has(product.id)}
              onWishlist={toggleWishlist}
              onBuy={handleBuy}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{
          background: 'rgba(14,14,18,0.8)',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 24px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <span style={{ color: 'var(--sky)', fontSize: '16px', marginTop: '1px' }}>ⓘ</span>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'rgba(226, 232, 240, 0.8)',
            lineHeight: 1.7,
            letterSpacing: '0.05em',
          }}
        >
          Orders are processed after Techfest 2026 (Jan 17–19). Delivery within 10–14 business days across India.
          Digital products delivered via email within 24 hours of purchase. All prices inclusive of GST.
          For bulk/institutional orders: techfest@iitb.ac.in
        </div>
      </motion.div>
    </div>
  );
}
