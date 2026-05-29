import React from 'react';

export default function TunjaLogo({ className = "", width = "auto", height = "45px", variant = "dark" }) {
  const mainColor = variant === "dark" ? "#212529" : "#FFFFFF"; // Grafito / Blanco
  const secondaryColor = variant === "dark" ? "#495057" : "rgba(255,255,255,0.7)"; 
  const accentColor = "#005C6E"; // Azul Petróleo

  return (
    <svg 
      className={className} 
      style={{ width, height, minWidth: '150px' }} 
      viewBox="0 0 200 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Imagotipo: Trazos geométricos modernos que forman una T y edificaciones */}
      <rect x="5" y="10" width="12" height="30" rx="3" fill={accentColor} />
      <rect x="21" y="20" width="12" height="20" rx="3" fill={mainColor} opacity="0.8" />
      <rect x="37" y="15" width="12" height="25" rx="3" fill={accentColor} opacity="0.6" />
      <circle cx="27" cy="10" r="4" fill={mainColor} />
      
      {/* Texto de la marca */}
      <text 
        x="58" 
        y="35" 
        fill={mainColor} 
        fontFamily="'Space Grotesk', sans-serif" 
        fontWeight="800" 
        fontSize="28" 
        letterSpacing="-1.5"
      >
        TUNJA
      </text>
      <text 
        x="152" 
        y="35" 
        fill={accentColor} 
        fontFamily="'Space Grotesk', sans-serif" 
        fontWeight="800" 
        fontSize="28"
      >
        2.0
      </text>
    </svg>
  );
}
