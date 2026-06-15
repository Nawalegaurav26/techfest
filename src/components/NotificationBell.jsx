/* Techfest 2026 — NotificationBell Component */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

const MOCK_NOTIFICATIONS = [
  { id: 1, text: '🚀 Google & GitHub OAuth integrations online.', time: 'Just now', type: 'system' },
  { id: 2, text: '⚡ Hackathon registration live. Closes soon!', time: '10m ago', type: 'alert' },
  { id: 3, text: '🎙️ Sam Altman keynote slot confirmed (Day 1).', time: '2h ago', type: 'info' },
  { id: 4, text: '🤖 Robowars heavyweight registration count: 48 teams.', time: '1d ago', type: 'stats' }
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [unreadCount, setUnreadCount] = useState(MOCK_NOTIFICATIONS.length);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleToggle = () => {
    soundEffects.playClick?.();
    setOpen(!open);
    if (!open) {
      setUnreadCount(0);
    }
  };

  const clearNotification = (id, e) => {
    e.stopPropagation();
    soundEffects.playClick?.();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={handleToggle}
        style={{
          width: '44px', height: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: open ? 'var(--sky)' : 'rgba(189, 200, 209, 0.6)',
          background: open ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
          transition: 'all 0.2s',
          cursor: 'pointer',
          position: 'relative',
        }}
        title="Notifications"
        aria-label="Toggle notifications"
        onMouseEnter={e => {
          if (!open) {
            e.currentTarget.style.borderColor = 'var(--sky)';
            e.currentTarget.style.color = 'var(--sky)';
          }
        }}
        onMouseLeave={e => {
          if (!open) {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'rgba(189, 200, 209, 0.6)';
          }
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
          notifications
        </span>

        {/* Pulsing notification count badge */}
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '8px', right: '8px',
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: 'var(--plasma)',
            boxShadow: '0 0 8px var(--plasma)',
            animation: 'pulse 1.5s infinite',
          }} />
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              top: '52px', right: 0,
              width: '280px',
              background: 'rgba(14, 14, 18, 0.98)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 15px rgba(56, 189, 248, 0.1)',
              padding: '12px 0',
              zIndex: 200,
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0 16px 8px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--sky)',
                letterSpacing: '0.15em', fontWeight: 700
              }}>
                TELEMETRY FEED
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'rgba(189,200,209,0.4)' }}>
                {notifications.length} ACTIVE
              </span>
            </div>

            {/* List */}
            <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '4px 0' }}>
              {notifications.length === 0 ? (
                <div style={{
                  padding: '24px 16px', textAlign: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(189,200,209,0.4)'
                }}>
                  NO ACTIVE ALERTS
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '10px 16px',
                      display: 'flex', gap: '10px',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontFamily: 'var(--font-body)', fontSize: '10px',
                        color: 'rgba(229,231,235,0.9)', lineHeight: 1.4
                      }}>
                        {item.text}
                      </p>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '7px',
                        color: 'rgba(189,200,209,0.4)', marginTop: '4px', display: 'block'
                      }}>
                        {item.time}
                      </span>
                    </div>
                    <button
                      onClick={(e) => clearNotification(item.id, e)}
                      style={{
                        background: 'transparent', border: 'none',
                        color: 'rgba(255, 255, 255, 0.2)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        alignSelf: 'flex-start', padding: '2px'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--plasma)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.2)'}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>close</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.4); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
