import { useState } from 'react';
import { motion } from 'framer-motion';

const MERCH = [
  {
    id: 'm1', name: 'CYBORG EVOLUTION TEE',
    price: '₹749', category: 'APPAREL',
    badge: 'BESTSELLER', color: '#00f2ff',
    desc: 'Premium 100% cotton tee with holographic TF26 cyborg print. Unisex fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    image: '/merch-tee.png',
  },
  {
    id: 'm2', name: 'NEURAL HOODIE',
    price: '₹1,499', category: 'APPAREL',
    badge: 'NEW', color: '#ff8c00',
    desc: 'Heavy fleece hoodie with embroidered circuit-map back panel. Comes in Graphite Black.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/merch-hoodie.png',
  },
  {
    id: 'm3', name: 'TF26 CHROME MUG',
    price: '₹399', category: 'ACCESSORIES',
    badge: 'LIMITED', color: '#ff4444',
    desc: 'Ceramic mug with reactive glow-in-dark TF26 design. 350ml. Dishwasher safe.',
    sizes: [],
    image: null,
  },
  {
    id: 'm4', name: 'HACKATHON KIT',
    price: '₹2,499', category: 'BUNDLES',
    badge: 'POPULAR', color: '#00ff41',
    desc: 'Complete hacker bundle: Tee + Hoodie + Sticker pack + TF26 lanyard + Notebook.',
    sizes: ['M', 'L', 'XL'],
    image: '/merch-tee.png',
  },
  {
    id: 'm5', name: 'COLLECTOR STICKER PACK',
    price: '₹199', category: 'ACCESSORIES',
    badge: null, color: '#00f2ff',
    desc: '12-piece holographic sticker set featuring all Techfest 2026 artwork. Waterproof.',
    sizes: [],
    image: null,
  },
  {
    id: 'm6', name: 'CYBORG WRISTBAND',
    price: '₹299', category: 'ACCESSORIES',
    badge: 'LIMITED', color: '#ff00ff',
    desc: 'NFC-enabled smart wristband. Scan to show your Techfest 2026 registration. Glows cyan.',
    sizes: [],
    image: '/merch-wristband.png',
  },
];

const BADGE_COLORS = {
  BESTSELLER: '#00f2ff',
  NEW: '#00ff41',
  LIMITED: '#ff4444',
  POPULAR: '#ff8c00',
};

export default function Store() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', ...new Set(MERCH.map(m => m.category))];
  const filtered = selectedCategory === 'ALL' ? MERCH : MERCH.filter(m => m.category === selectedCategory);

  const addToCart = (item) => {
    setCart(prev => [...prev, item.id]);
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}
      >
        <div>
          <div className="section-tag" style={{ marginBottom: '12px' }}>MODULE 05 // SUPPLY DEPOT</div>
          <h1 className="section-title">TECHFEST</h1>
          <h1 className="section-title" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(0,242,255,0.4)' }}>STORE</h1>
        </div>

        {/* Cart indicator */}
        <div style={{
          padding: '14px 20px', background: 'rgba(0,0,0,0.5)',
          border: `1px solid ${cart.length > 0 ? 'rgba(0,242,255,0.5)' : 'rgba(0,242,255,0.1)'}`,
          backdropFilter: 'blur(12px)',
          boxShadow: cart.length > 0 ? '0 0 20px rgba(0,242,255,0.15)' : 'none',
          transition: 'all 0.3s',
        }}>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(224,247,255,0.4)', marginBottom: '4px' }}>CART</div>
          <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '22px', fontWeight: 800, color: '#00f2ff' }}>
            {cart.length} <span style={{ fontSize: '10px', color: 'rgba(0,242,255,0.5)' }}>ITEMS</span>
          </div>
        </div>
      </motion.div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '28px 0' }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="nav-capsule"
            style={{
              borderColor: selectedCategory === cat ? '#00f2ff' : 'rgba(0,242,255,0.15)',
              color: selectedCategory === cat ? '#00f2ff' : 'rgba(224,247,255,0.5)',
              background: selectedCategory === cat ? 'rgba(0,242,255,0.08)' : 'transparent',
              cursor: 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            whileHover={{ y: -4 }}
            style={{
              padding: '24px',
              background: 'rgba(0,0,0,0.55)',
              border: `1px solid ${item.color}20`,
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s',
              position: 'relative',
            }}
          >
            {/* Badge */}
            {item.badge && (
              <div style={{
                position: 'absolute', top: 12, right: 12,
                fontFamily: 'Share Tech Mono, monospace', fontSize: '7px', letterSpacing: '0.2em',
                color: BADGE_COLORS[item.badge], border: `1px solid ${BADGE_COLORS[item.badge]}50`,
                padding: '2px 8px', background: BADGE_COLORS[item.badge] + '15',
              }}>{item.badge}</div>
            )}

            {/* Product image */}
            <div style={{
              height: '140px', marginBottom: '16px',
              background: `radial-gradient(ellipse at center, ${item.color}15 0%, rgba(0,0,0,0.3) 100%)`,
              border: `1px solid ${item.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  className="merch-img"
                />
              ) : (
                <div style={{
                  fontFamily: 'Orbitron, monospace', fontSize: '11px', letterSpacing: '0.2em',
                  color: `${item.color}80`,
                  textShadow: `0 0 10px ${item.color}50`
                }}>
                  {item.category}
                </div>
              )}
            </div>

            {/* Category tag */}
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '8px', color: item.color, letterSpacing: '0.2em', marginBottom: '6px' }}>
              [{item.category}]
            </div>

            <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '8px', paddingRight: item.badge ? '70px' : '0' }}>
              {item.name}
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(224,247,255,0.45)', lineHeight: 1.6, marginBottom: '14px' }}>
              {item.desc}
            </p>

            {/* Sizes */}
            {item.sizes.length > 0 && (
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {item.sizes.map(sz => (
                  <div key={sz} style={{
                    fontFamily: 'Share Tech Mono, monospace', fontSize: '8px',
                    color: 'rgba(224,247,255,0.4)', padding: '2px 6px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>{sz}</div>
                ))}
              </div>
            )}

            {/* Price + add to cart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: 800, color: item.color, textShadow: `0 0 10px ${item.color}50` }}>
                {item.price}
              </div>
              <button
                className="cyber-btn"
                style={{ fontSize: '9px', padding: '8px 16px', borderColor: item.color, color: item.color }}
                onClick={() => addToCart(item)}
              >
                + ADD TO CART
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cart summary fixed bottom (when items added) */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            zIndex: 200,
            display: 'flex', alignItems: 'center', gap: '20px',
            padding: '14px 28px',
            background: 'rgba(0,4,16,0.95)',
            border: '1px solid rgba(0,242,255,0.4)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(0,242,255,0.2)',
          }}
        >
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: '#00f2ff' }}>
            {cart.length} ITEM{cart.length > 1 ? 'S' : ''} IN CART
          </span>
          <button className="cyber-btn primary-fill" style={{ fontSize: '9px', padding: '8px 20px' }}>
            CHECKOUT →
          </button>
        </motion.div>
      )}
    </div>
  );
}
