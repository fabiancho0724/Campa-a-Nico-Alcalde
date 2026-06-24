import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function NicoAvatar({ emotion, isCelebrating, isOpen }) {
  const mascotRef = useRef(null);
  const [blinkState, setBlinkState] = useState('idle'); // 'idle' | 'blink' | 'wink'
  
  // Spring values for mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 75, damping: 15 });
  const springY = useSpring(y, { stiffness: 75, damping: 15 });

  // Handle cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mascotRef.current || !isOpen) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      // Incline rotation max limits for head direction (16 degrees max)
      const maxTilt = 16;
      const rotY = (dx / dist) * maxTilt;
      const rotX = -(dy / dist) * maxTilt;

      x.set(rotY);
      y.set(rotX);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen, x, y]);

  // Random blink and wink cycles
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.18) {
        setBlinkState('wink');
        setTimeout(() => setBlinkState('idle'), 450);
      } else if (rand < 0.5) {
        setBlinkState('blink');
        setTimeout(() => setBlinkState('idle'), 200);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Get eye scaling based on blink state
  const getEyeAnimation = () => {
    if (emotion === 'resting') return { scaleY: 0.05, originY: 0.5 };
    if (blinkState === 'wink') return { scaleY: 0.1, rotate: 5 };
    if (blinkState === 'blink') return { scaleY: 0.08 };
    return { scaleY: 1, rotate: 0 };
  };

  // Get emotional scale & rotation
  const getEmotionScaleAndRotate = () => {
    if (isCelebrating || emotion === 'celebrating') {
      return {
        y: [0, -32, 4, 0],
        scale: [1, 1.15, 0.95, 1],
        rotate: [0, 180, 360, 360],
        transition: { duration: 0.85, ease: 'easeInOut' }
      };
    }

    switch (emotion) {
      case 'happy':
        return { scale: 1.08, rotate: [0, -3, 3, 0], y: [0, -6, 0] };
      case 'sad':
        return { scale: 0.94, rotate: -5, y: 5 };
      case 'surprised':
        return { scale: 1.16, y: -10, transition: { type: 'spring', stiffness: 300, damping: 8 } };
      case 'thinking':
        return { scale: 1.02, rotate: [0, 4, -4, 0], transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' } };
      case 'listening':
        return { scale: 1.05, rotate: 5 };
      case 'greeting':
        return { scale: 1.08, rotate: [0, -5, 5, 0] };
      case 'resting':
        return { scale: 0.95, y: 2, rotate: -2 };
      default:
        return { scale: 1, rotate: 0, y: 0 };
    }
  };

  // Get emotional aura/glow background
  const getAuraColor = () => {
    switch (emotion) {
      case 'celebrating':
      case 'happy':
        return 'radial-gradient(circle, rgba(255, 179, 0, 0.45) 0%, transparent 70%)';
      case 'sad':
        return 'radial-gradient(circle, rgba(33, 150, 243, 0.35) 0%, transparent 70%)';
      case 'surprised':
        return 'radial-gradient(circle, rgba(255, 23, 68, 0.4) 0%, transparent 70%)';
      case 'thinking':
        return 'radial-gradient(circle, rgba(156, 39, 176, 0.35) 0%, transparent 70%)';
      case 'greeting':
      case 'listening':
      case 'explaining':
        return 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, transparent 70%)';
      case 'resting':
        return 'radial-gradient(circle, rgba(120, 144, 156, 0.25) 0%, transparent 70%)';
      default:
        return 'radial-gradient(circle, rgba(142, 68, 173, 0.25) 0%, transparent 70%)';
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 1. Aura Glow Behind Mascot */}
      <motion.div
        animate={{
          scale: (emotion === 'celebrating' || emotion === 'surprised') ? [1, 1.35, 1] : [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: '50%',
          background: getAuraColor(),
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      {/* 2. Emoticon Indicators (zZZ, ?, !) */}
      {emotion === 'resting' && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], y: -25, scale: 1 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeOut' }}
          style={{ position: 'absolute', top: '-10px', left: '10px', color: '#78909c', fontWeight: 'bold', fontSize: '18px', pointerEvents: 'none', zIndex: 10, fontFamily: 'monospace' }}
        >
          zZZ
        </motion.div>
      )}

      {emotion === 'thinking' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], y: [-5, -25], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          style={{ position: 'absolute', top: '-12px', left: '15px', color: '#9c27b0', fontSize: '20px', pointerEvents: 'none', zIndex: 10, fontWeight: '900' }}
        >
          ?
        </motion.div>
      )}

      {emotion === 'surprised' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: [0, 1, 0], y: -20, scale: 1.4 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'absolute', top: '-12px', right: '15px', color: '#ff1744', fontSize: '22px', pointerEvents: 'none', zIndex: 10, fontWeight: '900' }}
        >
          !
        </motion.div>
      )}

      {/* 3. Main Avatar Face Container with springs */}
      <motion.div
        ref={mascotRef}
        animate={getEmotionScaleAndRotate()}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary) 0%, #0c3866 100%)',
          padding: '3px',
          boxShadow: '0 8px 24px rgba(74, 0, 114, 0.25)',
          cursor: 'pointer',
          position: 'relative',
          rotateX: springY,
          rotateY: springX,
          transformStyle: 'preserve-3d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.02, 1] // Breathing animation
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: 'easeInOut'
          }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <motion.img
            src="/CaraNico.png"
            alt="Cara de Nico"
            animate={getEyeAnimation()}
            transition={{ duration: 0.12 }}
            style={{
              width: '90%',
              height: '90%',
              objectFit: 'contain'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
