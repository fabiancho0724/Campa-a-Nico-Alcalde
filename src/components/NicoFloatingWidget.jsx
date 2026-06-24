import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Award } from 'lucide-react';
import { useNico } from '../state/nicoStore';
import { useSoundFX } from '../hooks/useSoundFX';

import NicoAvatar from './NicoAvatar';
import NicoAssistant from './NicoAssistant';
import NicoTutorial from './NicoTutorial';
import NicoNotifications from './NicoNotifications';
import NicoGamification from './NicoGamification';
import NicoEmotionEngine from './NicoEmotionEngine';

export default function NicoFloatingWidget({ activeTab }) {
  const { emotion } = useNico();
  const { play } = useSoundFX();
  const [isOpen, setIsOpen] = useState(true);
  const [showBubble, setShowBubble] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleWidget = () => {
    play('click');
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowBubble(true);
    } else {
      setIsProfileOpen(false);
    }
  };

  const toggleProfile = (e) => {
    e.stopPropagation();
    play('click');
    setIsProfileOpen(!isProfileOpen);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9990,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      pointerEvents: 'none'
    }}>
      {/* Background Engines & Global Stack elements */}
      <NicoEmotionEngine />
      <NicoNotifications />
      <NicoTutorial />

      {/* Onboarding / Gamification Pop-up cards */}
      <AnimatePresence>
        {isProfileOpen && isOpen && (
          <NicoGamification 
            isOpen={isProfileOpen} 
            onClose={() => { play('click'); setIsProfileOpen(false); }} 
          />
        )}
      </AnimatePresence>

      {/* Speech bubble Assistant advice */}
      <NicoAssistant 
        activeTab={activeTab} 
        showBubble={showBubble && !isProfileOpen} 
        setShowBubble={setShowBubble} 
      />

      {/* Main interactive Mascot Avatar */}
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="avatar-expanded"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            whileHover={{ scale: 1.05 }}
            style={{
              pointerEvents: 'auto',
              width: '84px',
              height: '84px',
              position: 'relative'
            }}
          >
            {/* Collapse Trigger button */}
            <button
              onClick={toggleWidget}
              title="Minimizar Nico"
              style={{
                position: 'absolute',
                top: '-4px',
                left: '-4px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1.5px solid rgba(74,0,114,0.2)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                zIndex: 10
              }}
            >
              <X size={11} />
            </button>

            {/* Render sub avatar representation */}
            <div 
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                play('click');
                setShowBubble(true);
              }}
            >
              <NicoAvatar 
                emotion={emotion} 
                isCelebrating={emotion === 'celebrating'} 
                isOpen={isOpen} 
              />
            </div>

            {/* Medal/Award Badge button for toggling Profile Card */}
            <button
              onClick={toggleProfile}
              title="Ver mi perfil ciudadano"
              style={{
                position: 'absolute',
                bottom: '-4px',
                left: '-4px',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: isProfileOpen ? '#ffb300' : 'var(--primary)',
                border: '2px solid #FFFFFF',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(74,0,114,0.25)',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              onMouseOver={e=>e.currentTarget.style.transform='scale(1.15)'}
              onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}
            >
              <Award size={13} fill="currentColor" />
            </button>

            {/* Glowing Sparkles badge */}
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}>
              <Sparkles size={11} className="animate-pulse" />
            </div>
          </motion.div>
        ) : (
          /* Collapsed Mini Mascot Button */
          <motion.button
            key="avatar-collapsed"
            onClick={toggleWidget}
            title="Abrir asistente Nico"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              pointerEvents: 'auto',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(74, 0, 114, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <img 
              src="/CaraNico.png" 
              alt="Mascota Nico Mini"
              style={{ width: '80%', height: '80%', objectFit: 'contain', borderRadius: '50%', background: '#fff' }}
            />
            {/* Pulsing indicator dot */}
            <div style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--accent-red)',
              border: '2px solid #fff'
            }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}
