/* Techfest 2026 — SocialLinks Component */
import { motion } from 'framer-motion';
import { SocialIcons } from '../utils/socialIcons';
import { soundEffects } from '../utils/soundEffects';

const SOCIAL_ITEMS = [
  { Icon: SocialIcons.Instagram, href: 'https://www.instagram.com/techfest_iitbombay/', label: 'Instagram', color: '#E1306C' },
  { Icon: SocialIcons.Linkedin,  href: 'https://www.linkedin.com/company/techfest-iit-bombay/', label: 'LinkedIn', color: '#0077B5' },
  { Icon: SocialIcons.Youtube,   href: 'https://youtube.com/@techfestiitbombay_youtube', label: 'YouTube', color: '#FF0000' },
  { Icon: SocialIcons.Twitter,   href: 'https://x.com/Techfest_IITB', label: 'X / Twitter', color: '#1DA1F2' },
  { Icon: SocialIcons.Facebook,  href: 'https://www.facebook.com/iitbombaytechfest/', label: 'Facebook', color: '#1877F2' },
  { Icon: SocialIcons.Discord,   href: 'https://discord.gg/E2q9rbtp', label: 'Discord', color: '#5865F2' },
];

export default function SocialLinks({ direction = 'row', gap = '16px', size = 18 }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: direction,
      alignItems: 'center',
      justifyContent: 'center',
      gap: gap,
    }}>
      {SOCIAL_ITEMS.map((item) => {
        const IconComponent = item.Icon;
        return (
          <motion.a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.label}
            onClick={() => soundEffects.playClick?.()}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: `${size + 14}px`,
              height: `${size + 14}px`,
              border: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: 'rgba(189, 200, 209, 0.6)',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--sky)';
              e.currentTarget.style.color = item.color;
              e.currentTarget.style.boxShadow = `0 0 10px ${item.color}33`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.color = 'rgba(189, 200, 209, 0.6)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <IconComponent size={size} />
          </motion.a>
        );
      })}
    </div>
  );
}
