import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

// Reusable Futuristic HUD Panel
export function HUDPanel({ children, title, subtitle, className = '', animate = true }) {
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      clipPath: 'inset(40% 40% 40% 40% round 0px)' 
    },
    visible: { 
      opacity: 1, 
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      transition: { 
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  const content = (
    <div className={`relative glass-panel bg-black/40 backdrop-blur-xl border border-primary/20 p-6 rounded-none ${className}`}>
      
      {/* HUD Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />

      {/* Futuristic Status Dots */}
      <div className="absolute top-3 right-4 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
        <span className="w-1 h-1 bg-primary/50 rounded-full" />
      </div>

      {/* Decorative Technical Tags */}
      <div className="absolute bottom-2 right-4 text-[7px] font-mono text-primary/40 tracking-[0.2em] select-none pointer-events-none">
        SYS_RECV // LINK_OK // CORE_ACTIVE
      </div>

      {/* Header */}
      {(title || subtitle) && (
        <div className="border-b border-primary/10 pb-4 mb-4 select-none">
          {title && (
            <h3 className="text-sm font-mono tracking-[0.25em] text-white flex items-center gap-2">
              <span className="w-1.5 h-3 bg-primary inline-block" />
              {title}
            </h3>
          )}
          {subtitle && (
            <span className="text-[9px] font-mono text-primary/60 tracking-widest uppercase block mt-1">
              {subtitle}
            </span>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 text-[var(--text-secondary)]">
        {children}
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="w-full flex justify-center"
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// Cyberpunk interactive button
export function FuturisticButton({ children, onClick, active = false, className = '', variant = 'primary' }) {
  const isPrimary = variant === 'primary';
  const accentColor = isPrimary ? 'var(--primary)' : 'var(--secondary)';
  const hoverBg = isPrimary ? 'rgba(0, 242, 255, 0.08)' : 'rgba(255, 0, 255, 0.08)';
  const borderColor = active ? accentColor : `rgba(${isPrimary ? '0, 242, 255' : '255, 0, 255'}, 0.35)`;

  const handleMouseEnter = () => {
    soundEffects.playHover();
  };

  const handleClick = (e) => {
    soundEffects.playClick();
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{
        borderColor: borderColor,
        boxShadow: active ? `0 0 12px ${isPrimary ? 'rgba(0, 242, 255, 0.2)' : 'rgba(255, 0, 255, 0.2)'}` : 'none'
      }}
      className={`px-4 py-2 border text-xs font-mono tracking-widest relative group overflow-hidden transition-all duration-300 ${
        active 
          ? isPrimary ? 'text-[#050505] bg-primary' : 'text-white bg-secondary'
          : isPrimary ? 'text-primary hover:text-white' : 'text-secondary hover:text-white'
      } ${className}`}
    >
      {/* Glitch Overlay on Hover */}
      <div 
        style={{ background: hoverBg }}
        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 pointer-events-none" 
      />

      {/* Button brackets */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/50 group-hover:border-white transition-colors" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/50 group-hover:border-white transition-colors" />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Glowing badge indicator
export function CyberBadge({ status = 'online', text = 'ACTIVE' }) {
  const getColors = () => {
    switch (status) {
      case 'online':
      case 'success':
        return { bg: 'bg-[#00ff41]/10', text: 'text-[#00ff41]', border: 'border-[#00ff41]/30', dot: 'bg-[#00ff41]' };
      case 'warning':
        return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', dot: 'bg-yellow-500' };
      case 'danger':
      case 'offline':
        return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-500' };
      case 'info':
      default:
        return { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/30', dot: 'bg-primary' };
    }
  };

  const colors = getColors();

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 border ${colors.bg} ${colors.text} ${colors.border} text-[8px] font-mono tracking-widest rounded-none`}>
      <span className={`w-1 h-1 rounded-full ${colors.dot} animate-pulse`} />
      {text}
    </span>
  );
}

// Retro sci-fi scanline overlay
export function ScanlineOverlay() {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden select-none opacity-[0.03]">
      {/* Vertical scanline flow */}
      <div 
        className="w-full h-2 bg-white animate-scan"
        style={{
          boxShadow: '0 0 10px 10px rgba(255, 255, 255, 0.5)',
          animation: 'scanline-flow 8s linear infinite'
        }}
      />
      {/* Fine grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
          backgroundSize: '100% 4px, 6px 100%'
        }}
      />
      <style>{`
        @keyframes scanline-flow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}
