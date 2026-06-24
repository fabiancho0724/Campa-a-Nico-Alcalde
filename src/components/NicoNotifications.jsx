import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, Bell } from 'lucide-react';
import { useNico } from '../state/nicoStore';

export default function NicoNotifications() {
  const { notifications, removeNotification } = useNico();

  const getIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <Award size={18} color="#ffb300" />;
      case 'xp':
        return <Zap size={18} color="#00e5ff" />;
      default:
        return <Bell size={18} color="#9c27b0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'achievement':
        return 'rgba(255,179,0,0.3)';
      case 'xp':
        return 'rgba(0,229,255,0.3)';
      default:
        return 'rgba(156,39,176,0.3)';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '120px',
      right: '24px',
      zIndex: 9997,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'flex-end',
      pointerEvents: 'none'
    }}>
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: 'spring', stiffness: 220, damping: 15 }}
            style={{
              pointerEvents: 'auto',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: `2px solid ${getBorderColor(notif.type)}`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '14px',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minWidth: '220px',
              maxWidth: '280px',
              cursor: 'pointer'
            }}
            onClick={() => removeNotification(notif.id)}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(74, 0, 114, 0.08)'
            }}>
              {getIcon(notif.type)}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {notif.title}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.2' }}>
                {notif.message}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
