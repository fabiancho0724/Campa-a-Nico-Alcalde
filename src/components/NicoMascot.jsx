import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function NicoMascot({ activeTab }) {
  const [isOpen, setIsOpen] = useState(true);
  const [bubbleText, setBubbleText] = useState('¡Hola! Soy tu asistente de campaña. ¿En qué te puedo ayudar hoy?');
  const [showBubble, setShowBubble] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [animationState, setAnimationState] = useState('idle'); // 'idle', 'blink', 'wink'
  
  const mascotRef = useRef(null);

  // Mensajes y sugerencias por pestaña
  const tabTips = {
    proposals: 'Aquí puedes leer las propuestas de la campaña "Las 5 de Nico". ¡También puedes aportar tus ideas!',
    joven: '¡Bienvenido al Laboratorio Ecosistema Joven 2.0! Propón soluciones de tecnología y cultura para Tunja.',
    tunja_avanza: 'Revisa las metas de desarrollo y proyectos clave de infraestructura para el avance de la ciudad.',
    agenda: 'Entérate de las próximas reuniones y eventos de Nico. ¡Inscríbete y acompáñanos!',
    unete: 'Inscríbete como voluntario de la campaña y ayúdanos a llevar esperanza a cada barrio.',
    electoral: 'Consulta las proyecciones electorales e históricos de votación en tiempo real.',
    budget: 'Utiliza el simulador de presupuesto participativo para ver cómo distribuirías los recursos públicos.',
    admin: 'Panel de Control de Campaña. Gestiona accesos, revisa auditorías y edita la configuración general.'
  };

  // Escuchar mouse para seguimiento 3D
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calcular rotación en base a la distancia del cursor
  useEffect(() => {
    if (!mascotRef.current || !isOpen) return;
    const rect = mascotRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // Límite de inclinación de cabeza de 12 grados para que se vea natural
    const maxRot = 12;
    const rotY = (dx / dist) * maxRot;
    const rotX = -(dy / dist) * maxRot;

    setRot({ x: rotX, y: rotY });
  }, [mousePos, isOpen]);

  // Sincronizar tips según pestaña
  useEffect(() => {
    if (tabTips[activeTab]) {
      setBubbleText(tabTips[activeTab]);
      setShowBubble(true);
    }
  }, [activeTab]);

  // Guiño y parpadeo aleatorios controlados por estado
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.22) {
        // Guiño de ojo (Wink)
        setAnimationState('wink');
        setTimeout(() => setAnimationState('idle'), 500);
      } else if (rand < 0.55) {
        // Parpadeo (Blink)
        setAnimationState('blink');
        setTimeout(() => setAnimationState('idle'), 250);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Detector global de hover para reaccionar a botones e inputs
  useEffect(() => {
    if (!isOpen) return;
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = target.tagName === 'BUTTON' || 
                            target.closest('button') || 
                            target.classList?.contains('nav-tab') ||
                            target.closest('.nav-tab') ||
                            target.tagName === 'A' ||
                            target.closest('a') ||
                            target.classList?.contains('glass-card') ||
                            target.closest('.glass-card');

      if (isInteractive) {
        // Reacción física: cabeceo rápido (nod)
        setRot(prev => ({ ...prev, x: prev.x + 5 })); 
        setTimeout(() => {
          setRot(prev => ({ ...prev, x: prev.x - 5 }));
        }, 180);

        // Ocasionalmente muestra sugerencias rápidas sobre botones
        const rand = Math.random();
        if (rand < 0.15) {
          const interactiveReplies = [
            '¡Excelente iniciativa!',
            '¡Súper! Presiona para interactuar.',
            '¡Esa opción nos acerca a la Tunja 2.0!',
            '¡Presiona con confianza!',
            '¡Buen click para avanzar!'
          ];
          setBubbleText(interactiveReplies[Math.floor(Math.random() * interactiveReplies.length)]);
          setShowBubble(true);
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [isOpen]);

  // Manejar eventos de celebración (confeti y salto)
  useEffect(() => {
    const handleCelebrate = (e) => {
      const msg = e.detail?.message || '¡Acción completada con éxito! ¡Sigamos avanzando juntos!';
      setBubbleText(msg);
      setShowBubble(true);
      setIsCelebrating(true);
      
      // Lanzar confeti
      const colors = ['#4A0072', '#00e5ff', '#ffb300', '#00e676', '#ff1744', '#d500f9'];
      const newParticles = Array.from({ length: 45 }).map((_, i) => ({
        id: Date.now() + '-' + i,
        x: 0,
        y: 0,
        vx: (Math.random() - 0.7) * 16 - 3, 
        vy: -Math.random() * 15 - 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
        rotation: Math.random() * 360,
        vRotation: (Math.random() - 0.5) * 30
      }));
      setParticles(prev => [...prev, ...newParticles]);

      // Quitar estado de celebración después del salto
      setTimeout(() => {
        setIsCelebrating(false);
      }, 1000);
    };

    window.addEventListener('nico-celebrate', handleCelebrate);
    return () => window.removeEventListener('nico-celebrate', handleCelebrate);
  }, []);

  // Animación física de partículas de confeti
  useEffect(() => {
    if (particles.length === 0) return;
    let active = true;
    
    const updateParticles = () => {
      if (!active) return;
      setParticles(prev => prev.map(p => {
        const nextY = p.y + p.vy;
        const nextX = p.x + p.vx;
        const nextVy = p.vy + 0.6; 
        const nextVx = p.vx * 0.98; 
        return {
          ...p,
          x: nextX,
          y: nextY,
          vy: nextVy,
          vx: nextVx,
          rotation: p.rotation + p.vRotation
        };
      }).filter(p => p.y < 500 && Math.abs(p.x) < 600));
      
      requestAnimationFrame(updateParticles);
    };

    const animId = requestAnimationFrame(updateParticles);
    return () => {
      active = false;
      cancelAnimationFrame(animId);
    };
  }, [particles]);

  const showRandomTip = () => {
    const tips = [
      '¿Sabías que puedes ver el presupuesto proyectado de Tunja en la pestaña "Simulador"?',
      '¡Tu voz es clave! Envía una propuesta ciudadana en el apartado "Las 5 de Nico".',
      'Si quieres apoyar activamente la campaña, inscríbete en "Únete a la Campaña".',
      'Revisa las metas de la agenda de Nico para acompañarnos en los próximos debates.',
      'En el modo oscuro la aplicación tiene una apariencia más tecnológica. ¡Pruébalo en Ajustes!'
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setBubbleText(randomTip);
    setShowBubble(true);
  };

  // Calcular la deformación facial según el estado
  const getAvatarTransform = () => {
    if (animationState === 'wink') {
      return 'scaleY(0.12) rotate(6deg) skewX(5deg)'; // Simula un guiño con inclinación guiñada
    }
    if (animationState === 'blink') {
      return 'scaleY(0.08)'; // Parpadeo completo
    }
    return 'scaleY(1) rotate(0deg)';
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9990, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'none' }}>
      
      {/* 1. Lluvia de partículas (confeti) */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'visible', bottom: '40px', right: '40px' }}>
        {particles.map(p => (
          <div 
            key={p.id}
            style={{
              position: 'absolute',
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              borderRadius: p.size % 2 === 0 ? '50%' : '2px',
              transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`,
              opacity: Math.max(0, 1 - p.y / 500),
              transition: 'opacity 0.1s linear'
            }}
          />
        ))}
      </div>

      {/* 2. Burbuja de diálogo (Speech Bubble) */}
      {showBubble && isOpen && (
        <div style={{
          pointerEvents: 'auto',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '2px solid rgba(74, 0, 114, 0.2)',
          boxShadow: '0 8px 32px rgba(74, 0, 114, 0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '1rem',
          maxWidth: '280px',
          marginBottom: '12px',
          position: 'relative',
          fontSize: '0.88rem',
          lineHeight: '1.4',
          animation: 'nico-slideUp 0.3s ease forwards',
          fontFamily: 'var(--font-body)',
          fontWeight: '500'
        }}>
          {/* Triángulo indicador */}
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            right: '32px',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid var(--bg-card)',
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))'
          }} />

          {/* Botón cerrar burbuja */}
          <button 
            onClick={() => setShowBubble(false)}
            style={{ position: 'absolute', top: '6px', right: '6px', border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          >
            <X size={14} />
          </button>

          <p style={{ margin: '0 12px 0 0' }}>{bubbleText}</p>
        </div>
      )}

      {/* 3. Avatar Mascota */}
      {isOpen ? (
        <div 
          ref={mascotRef}
          style={{
            pointerEvents: 'auto',
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary) 0%, #0c3866 100%)',
            padding: '3px',
            boxShadow: '0 10px 30px rgba(74, 0, 114, 0.25)',
            cursor: 'pointer',
            transition: isCelebrating ? 'none' : 'transform 0.12s ease-out',
            transform: isCelebrating 
              ? 'translateY(-20px) scale(1.1) rotate(360deg)' 
              : `perspective(300px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            animation: isCelebrating ? 'nico-jump 0.8s ease-in-out' : 'nico-mascot-float 4s ease-in-out infinite'
          }}
          onClick={showRandomTip}
        >
          {/* Botón Minimizar */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            title="Minimizar mascota"
            style={{
              position: 'absolute', top: '-4px', left: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <X size={10} />
          </button>

          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            animation: 'nico-breath 3s ease-in-out infinite' // Respiración suave
          }}>
            <img 
              src="/CaraNico.png" 
              alt="Mascota Nico"
              style={{
                width: '90%',
                height: '90%',
                objectFit: 'contain',
                transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: getAvatarTransform()
              }}
            />
          </div>
          
          {/* Decorador de chispa/glowing */}
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
            <Sparkles size={11} className="animate-pulse" />
          </div>
        </div>
      ) : (
        /* Versión colapsada minimalista */
        <button
          onClick={() => { setIsOpen(true); setShowBubble(true); }}
          title="Abrir asistente Nico"
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
            transition: 'transform 0.2s',
            animation: 'nico-mascot-float 3s ease-in-out infinite',
            position: 'relative'
          }}
          onMouseOver={e=>e.currentTarget.style.transform='scale(1.1)'}
          onMouseOut={e=>e.currentTarget.style.transform='scale(1.0)'}
        >
          <img 
            src="/CaraNico.png" 
            alt="Mascota Nico Mini"
            style={{ width: '80%', height: '80%', objectFit: 'contain', borderRadius: '50%', background: '#fff' }}
          />
          <div style={{
            position: 'absolute', top: '-2px', right: '-2px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-red)', border: '1px solid #fff'
          }} />
        </button>
      )}

      {/* Inyección de estilos CSS Keyframes específicos para la mascota */}
      <style>{`
        @keyframes nico-slideUp {
          from { opacity: 0; transform: translateY(15px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes nico-mascot-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(1.5deg); }
        }
        @keyframes nico-breath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }
        @keyframes nico-jump {
          0%, 100% { transform: translateY(0) rotate(0); }
          40% { transform: translateY(-30px) scale(1.1) rotate(180deg); }
          75% { transform: translateY(5px) scale(0.95) rotate(300deg); }
        }
      `}</style>
    </div>
  );
}
