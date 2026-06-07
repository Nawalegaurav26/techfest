import { useState } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const MERCH = [
  {
    id: 'm1', name: 'CYBORG EVOLUTION TEE',
    price: '₹749', category: 'APPAREL',
    badge: 'BESTSELLER', color: 'var(--sky)',
    desc: 'Premium 100% cotton tee with holographic TF26 cyborg print. Unisex fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    image: '/merch-tee.png',
  },
  {
    id: 'm2', name: 'NEURAL HOODIE',
    price: '₹1,499', category: 'APPAREL',
    badge: 'NEW', color: 'var(--plasma)',
    desc: 'Heavy fleece hoodie with embroidered circuit-map back panel. Comes in Graphite Black.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/merch-hoodie.png',
  },
  {
    id: 'm3', name: 'TF26 CHROME MUG',
    price: '₹399', category: 'ACCESSORIES',
    badge: 'LIMITED', color: '#ff8c00',
    desc: 'Ceramic mug with reactive glow-in-dark TF26 design. 350ml. Dishwasher safe.',
    sizes: [],
    image: null,
  },
  {
    id: 'm4', name: 'HACKATHON KIT',
    price: '₹2,499', category: 'BUNDLES',
    badge: 'POPULAR', color: '#22c55e',
    desc: 'Complete hacker bundle: Tee + Hoodie + Sticker pack + TF26 lanyard + Notebook.',
    sizes: ['M', 'L', 'XL'],
    image: '/merch-tee.png',
  },
  {
    id: 'm5', name: 'COLLECTOR STICKER PACK',
    price: '₹199', category: 'ACCESSORIES',
    badge: null, color: 'var(--sky)',
    desc: '12-piece holographic sticker set featuring all Techfest 2026 artwork. Waterproof.',
    sizes: [],
    image: null,
  },
  {
    id: 'm6', name: 'CYBORG WRISTBAND',
    price: '₹299', category: 'ACCESSORIES',
    badge: 'LIMITED', color: '#d946ef',
    desc: 'NFC-enabled smart wristband. Scan to show your Techfest 2026 registration. Glows cyan.',
    sizes: [],
    image: '/merch-wristband.png',
  },
];

const BADGE_COLORS = {
  BESTSELLER: 'var(--sky)',
  NEW: '#22c55e',
  LIMITED: '#ff8c00',
  POPULAR: 'var(--plasma)',
};

export default function Store() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [hovered, setHovered] = useState(null);

  const categories = ['ALL', ...new Set(MERCH.map(m => m.category))];
  const filtered = selectedCategory === 'ALL' ? MERCH : MERCH.filter(m => m.category === selectedCategory);

  const addToCart = (item) => {
    soundEffects.playSuccess?.();
    setCart(prev => [...prev, item.id]);
  };

  return (
    <div className="page-section" style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}
      >
        <div>
          <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 05 // SUPPLY DEPOT</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            EXCLUSIVE <span className="glow-sky" style={{ color: 'var(--sky)' }}>TECHFEST STORE</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'rgba(189, 200, 209, 0.5)',
            maxWidth: '480px',
            marginTop: '12px',
            lineHeight: 1.7
          }}>
            Acquire official Techfest 2026 gear, high-conductivity bionics merchandise, and collector stickers.
          </p>
        </div>

        {/* Cart indicator */}
        <div 
          className="glass-panel"
          style={{
            padding: '14px 24px',
            border: `1px solid ${cart.length > 0 ? 'var(--sky)' : 'rgba(255,255,255,0.1)'}`,
            backdropFilter: 'var(--glass-blur)',
            boxShadow: cart.length > 0 ? '0 0 20px rgba(56,189,248,0.15)' : 'none',
            transition: 'all 0.3s',
            position: 'relative'
          }}
        >
          <div className="bracket-tl" style={{ width: '8px', height: '8px', borderColor: cart.length > 0 ? 'var(--sky)' : 'rgba(255,255,255,0.2)' }} />
          <div className="bracket-br" style={{ width: '8px', height: '8px', borderColor: cart.length > 0 ? 'var(--sky)' : 'rgba(255,255,255,0.2)' }} />

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(189,200,209,0.4)', marginBottom: '4px' }}>CART TELEMETRY</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: cart.length > 0 ? 'var(--sky)' : '#fff' }}>
            {cart.length} <span style={{ fontSize: '10px', color: 'rgba(189,200,209,0.5)', fontWeight: 600 }}>ITEMS</span>
          </div>
        </div>
      </motion.div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '28px 0 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}
      >
        {categories.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playClick?.();
                setSelectedCategory(cat);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                padding: '8px 16px',
                color: isActive ? '#fff' : 'rgba(189,200,209,0.4)',
                background: isActive ? 'rgba(56,189,248,0.1)' : 'transparent',
                border: isActive ? '1px solid var(--sky)' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: isActive ? '0 0 15px rgba(56,189,248,0.2)' : 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)';
                  soundEffects.playHover?.();
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(189,200,209,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '20px' }}>
        {filtered.map((item, i) => {
          const isHovered = hovered === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 + 0.3 }}
              onMouseEnter={() => {
                setHovered(item.id);
                soundEffects.playHover?.();
              }}
              onMouseLeave={() => setHovered(null)}
              className="glass-panel"
              style={{
                padding: '24px',
                border: `1px solid ${isHovered ? 'var(--sky)' : 'rgba(56,189,248,0.15)'}`,
                boxShadow: isHovered ? '0 0 25px rgba(56,189,248,0.12)' : 'none',
                backdropFilter: 'var(--glass-blur)',
                transition: 'all 0.3s',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '340px'
              }}
            >
              <div className="bracket-tl" style={{ borderColor: isHovered ? 'var(--sky)' : 'rgba(56,189,248,0.3)' }} />
              <div className="bracket-br" style={{ borderColor: isHovered ? 'var(--sky)' : 'rgba(56,189,248,0.3)' }} />

              <div>
                {/* Badge */}
                {item.badge && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.15em',
                    color: BADGE_COLORS[item.badge], border: `1px solid ${BADGE_COLORS[item.badge]}50`,
                    padding: '2px 8px', background: BADGE_COLORS[item.badge] + '15',
                    fontWeight: 700
                  }}>{item.badge}</div>
                )}

                {/* Product image */}
                <div style={{
                  height: '140px', marginBottom: '16px',
                  background: isHovered
                    ? `radial-gradient(ellipse at center, rgba(56,189,248,0.15) 0%, rgba(5,5,8,0.5) 100%)`
                    : `radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, rgba(5,5,8,0.6) 100%)`,
                  border: `1px solid ${isHovered ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: isHovered ? 'grayscale(0)' : 'grayscale(30%)',
                        transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s'
                      }}
                    />
                  ) : (
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.2em',
                      color: 'rgba(189,200,209,0.3)',
                      textShadow: '0 0 10px rgba(255,255,255,0.05)'
                    }}>
                      NO TELEMETRY IMAGE
                    </div>
                  )}
                </div>

                {/* Category tag */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  color: isHovered ? 'var(--sky)' : 'rgba(189,200,209,0.4)',
                  letterSpacing: '0.2em',
                  marginBottom: '6px',
                  fontWeight: 700,
                  transition: 'color 0.3s'
                }}>
                  [{item.category}]
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '8px',
                  paddingRight: item.badge ? '70px' : '0'
                }}>
                  {item.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  color: 'rgba(189,200,209,0.5)',
                  lineHeight: 1.6,
                  marginBottom: '14px'
                }}>
                  {item.desc}
                </p>

                {/* Sizes */}
                {item.sizes.length > 0 && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {item.sizes.map(sz => (
                      <div key={sz} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '8px',
                        color: 'rgba(189,200,209,0.4)', padding: '2px 6px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.02)',
                        fontWeight: 600
                      }}>{sz}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price + add to cart */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px', marginTop: '10px' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: isHovered ? 'var(--sky)' : '#fff',
                  textShadow: isHovered ? 'var(--glow-sky-sm)' : 'none',
                  transition: 'all 0.3s'
                }}>
                  {item.price}
                </div>
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    padding: '8px 16px',
                    background: isHovered ? 'rgba(56,189,248,0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHovered ? 'var(--sky)' : 'rgba(255,255,255,0.08)'}`,
                    color: isHovered ? 'var(--sky)' : 'rgba(189,200,209,0.6)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(56,189,248,0.15)';
                    e.currentTarget.style.borderColor = 'var(--sky)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(189,200,209,0.6)';
                  }}
                >
                  + ACQUIRE SUPPLY
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cart summary fixed bottom (when items added) */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-panel"
          style={{
            position: 'fixed', bottom: 44, left: '50%', transform: 'translateX(-50%)',
            zIndex: 200,
            display: 'flex', alignItems: 'center', gap: '20px',
            padding: '14px 28px',
            border: '1px solid var(--sky)',
            backdropFilter: 'var(--glass-blur)',
            boxShadow: '0 0 40px rgba(56,189,248,0.25)',
          }}
        >
          <div className="bracket-tl" style={{ borderColor: 'var(--sky)' }} />
          <div className="bracket-br" style={{ borderColor: 'var(--sky)' }} />

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--sky)', fontWeight: 700 }}>
            {cart.length} ITEM{cart.length > 1 ? 'S' : ''} DETECTED IN CARGO
          </span>
          <button 
            className="btn-primary" 
            style={{ fontSize: '9px', padding: '8px 20px' }}
            onClick={() => {
              soundEffects.playClick?.();
              alert("Routing cargo transaction to gateway...");
            }}
          >
            DEPART TO CHECKOUT →
          </button>
        </motion.div>
      )}
    </div>
  );
}
