import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingWorld() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 5 + 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 12 + Math.random() * 12;
        return (
          <motion.div
            key={i}
            className="floating-world-particle"
            style={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              background: 'rgba(74, 0, 114, 0.15)',
              borderRadius: '50%',
              left: `${left}%`,
              top: `${top}%`,
              boxShadow: '0 0 8px rgba(74, 0, 114, 0.3)'
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.35, 0.1]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        );
      })}
    </div>
  );
}
