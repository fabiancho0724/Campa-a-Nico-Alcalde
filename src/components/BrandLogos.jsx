import React from 'react';

const urlLogosCombined = "https://raw.githubusercontent.com/fabiancho0724/Prueba-123/97dc30d90708e07f3362563c41396d379245a380/Logos.png";

export default function BrandLogos({ variant = 'header' }) {
  // Configuración de escalas según el modo
  const scale = variant === 'footer' ? 1.4 : variant === 'hero' ? 1.2 : 1;
  const isDark = true;
  
  // Estilos del contenedor general
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: variant === 'hero' ? '0' : '0',
    borderRadius: '0', // Quitar forma de píldora global
    background: 'transparent', // Sin fondo global
    border: 'none',
    boxShadow: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    maxWidth: '100%'
  };

  const imageStyle = {
    objectFit: 'contain',
    height: `${48 * scale}px`,
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
    cursor: 'pointer',
    maxWidth: '100%',
    borderRadius: '4px'
  };

  const interactiveProps = {
    onMouseOver: (e) => {
      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
      e.currentTarget.style.filter = 'brightness(1.1)';
    },
    onMouseOut: (e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.filter = 'brightness(1)';
    }
  };

  return (
    <div className="brand-logos-container" style={containerStyle}>
      <img
        src={urlLogosCombined}
        alt="Alianza Tunja 2.0"
        style={imageStyle}
        {...interactiveProps}
      />
    </div>
  );
}
