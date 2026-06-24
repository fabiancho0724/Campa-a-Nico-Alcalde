import React from 'react';
import { motion } from 'framer-motion';

const urlLogosCombined = "https://raw.githubusercontent.com/fabiancho0724/Prueba-123/97dc30d90708e07f3362563c41396d379245a380/Logos.png";

export default function BrandLogos({ variant = 'header' }) {
  // Configuración de escalas según el modo (aumentado en 25%)
  const scale = (variant === 'footer' ? 1.4 : variant === 'hero' ? 1.2 : 1) * 1.25;

  return (
    <motion.div
      className="brand-logos-container"
      animate={{
        y: [0, -4, 0]
      }}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: 'easeInOut'
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.92)',
        padding: '0.4rem 1rem',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        maxWidth: '100%'
      }}
    >
      <motion.img
        src={urlLogosCombined}
        alt="Alianza Tunja 2.0"
        whileHover={{
          scale: 1.1,
          filter: 'brightness(1.15)'
        }}
        whileTap={{
          scale: 0.95
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15
        }}
        style={{
          objectFit: 'contain',
          height: `${48 * scale}px`,
          cursor: 'pointer',
          maxWidth: '100%',
          borderRadius: '4px'
        }}
      />
    </motion.div>
  );
}
