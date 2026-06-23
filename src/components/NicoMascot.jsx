import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useNico } from '../state/nicoStore';
import { useSoundFX } from '../hooks/useSoundFX';

export default function NicoMascot({ activeTab }) {
  const { emotion, brainState } = useNico();
  const { play } = useSoundFX();
  const [isOpen, setIsOpen] = useState(true);
  const [bubbleText, setBubbleText] = useState('¡Hola! Soy tu asistente de campaña. ¿En qué te puedo ayudar hoy?');
  const [showBubble, setShowBubble] = useState(true);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [blinkState, setBlinkState] = useState('idle'); // 'idle' | 'blink' | 'wink'
  
  const mascotRef = useRef(null);

  // 👀 Motion values for smooth physical mouse-tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 15 });
  const springY = useSpring(y, { stiffness: 60, damping: 15 });

  // Tips suggested for each navigation tab
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

  // Track cursor movement and update tilt coordinates
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mascotRef.current || !isOpen) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      // Incline rotation max limits for head direction (18 degrees max)
      const maxTilt = 18;
      const rotY = (dx / dist) * maxTilt;
      const rotX = -(dy / dist) * maxTilt;

      x.set(rotY);
      y.set(rotX);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen, x, y]);

  // Sync bubble tips when tab switches
  useEffect(() => {
    if (tabTips[activeTab]) {
      setBubbleText(tabTips[activeTab]);
      setShowBubble(true);
    }
  }, [activeTab]);

  // Blink and wink randomized animation cycles
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.22) {
        setBlinkState('wink');
        setTimeout(() => setBlinkState('idle'), 500);
      } else if (rand < 0.55) {
        setBlinkState('blink');
        setTimeout(() => setBlinkState('idle'), 250);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Global mouseover detector to trigger head-nod feedback
  useEffect(() => {
    if (!isOpen) return;
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = target.closest && (
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        (target.classList?.contains && target.classList.contains('nav-tab')) ||
        target.closest('.nav-tab') ||
        target.tagName === 'A' ||
        target.closest('a') ||
        (target.classList?.contains && target.classList.contains('glass-card')) ||
        target.closest('.glass-card')
      );

      if (isInteractive) {
        // Physical quick head-nod feedback
        const currentY = y.get();
        y.set(currentY - 4);
        setTimeout(() => {
          y.set(currentY);
        }, 150);

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
  }, [isOpen, y]);

  // Listen to celebration triggers for jumping & confeti
  useEffect(() => {
    const handleCelebrate = (e) => {
      const msg = e.detail?.message || '¡Acción completada con éxito! ¡Sigamos avanzando juntos!';
      setBubbleText(msg);
      setShowBubble(true);
      setIsCelebrating(true);
      play('success');
      
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

      setTimeout(() => {
        setIsCelebrating(false);
      }, 1000);
    };

    window.addEventListener('nico-celebrate', handleCelebrate);
    return () => window.removeEventListener('nico-celebrate', handleCelebrate);
  }, [play]);

  // Update Confetti physical movement frames
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
    play('click');
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

  // Get eye scaling deformations based on local blink state
  const getEyeAnimation = () => {
    if (blinkState === 'wink') {
      return { scaleY: 0.12, rotate: 6, skewX: 5 };
    }
    if (blinkState === 'blink') {
      return { scaleY: 0.08 };
    }
    return { scaleY: 1, rotate: 0, skewX: 0 };
  };

  // Get physical motion effects based on global emotion state
  const getEmotionAnimation = () => {
    if (isCelebrating) {
      return {
        y: [0, -40, 5, 0],
        scale: [1, 1.1, 0.95, 1],
        rotate: [0, 180, 360, 360],
        transition: { duration: 0.8, ease: 'easeInOut' }
      };
    }

    switch (emotion) {
      case 'happy':
        return { 
          scale: 1.08, 
          rotate: [0, -3, 3, 0], 
          y: [0, -8, 0], 
          transition: { duration: 0.5 } 
        };
      case 'sad':
        return { 
          scale: 0.95, 
          rotate: -4, 
          y: 4, 
          transition: { type: 'spring', stiffness: 120 } 
        };
      case 'surprised':
        return { 
          scale: 1.15, 
          rotate: 0, 
          y: -8, 
          transition: { type: 'spring', stiffness: 220, damping: 10 } 
        };
      case 'thinking':
        return { 
          scale: 1.02, 
          rotate: [0, 3, -3, 0], 
          transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } 
        };
      case 'idle':
      default:
        return { 
          scale: 1, 
          rotate: 0, 
          y: 0, 
          transition: { type: 'spring', stiffness: 100, damping: 15 } 
        };
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9990, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'none' }}>
      
      {/* 1. Confetti rain */}
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

      {/* 2. Speech Bubble with AnimatePresence & HUD bar */}
      <AnimatePresence>
        {showBubble && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
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
              fontFamily: 'var(--font-body)',
              fontWeight: '500'
            }}
          >
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
              onClick={() => { play('click'); setShowBubble(false); }}
              style={{ position: 'absolute', top: '6px', right: '6px', border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
            >
              <X size={14} />
            </button>

            <p style={{ margin: '0 12px 0 0' }}>{bubbleText}</p>

            {/* Living HUD metrics */}
            <div style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '8px',
              fontWeight: '800',
              color: 'rgba(74, 0, 114, 0.65)',
              borderTop: '1px solid rgba(74, 0, 114, 0.12)',
              paddingTop: '6px',
              letterSpacing: '0.04em'
            }}>
              <span>ENERGÍA: {brainState?.energy || 100}%</span>
              <span style={{ textTransform: 'uppercase' }}>ESTADO: {emotion}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Avatar Mascota */}
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div 
            key="avatar-expanded"
            ref={mascotRef}
            initial={{ scale: 0, rotate: -45 }}
            animate={getEmotionAnimation()}
            exit={{ scale: 0, rotate: 45 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            style={{
              pointerEvents: 'auto',
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary) 0%, #0c3866 100%)',
              padding: '3px',
              boxShadow: '0 10px 30px rgba(74, 0, 114, 0.25)',
              cursor: 'pointer',
              position: 'relative',
              rotateX: springY,
              rotateY: springX,
              transformStyle: 'preserve-3d'
            }}
            onClick={showRandomTip}
          >
            {/* Pulsing Aura Behind Mascot */}
            <div style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 184, 217, 0.25) 0%, transparent 70%)',
              zIndex: -1,
              animation: 'aura-pulse-god 2.5s infinite ease-in-out'
            }} />

            {/* Botón Minimizar */}
            <button
              onClick={(e) => { e.stopPropagation(); play('click'); setIsOpen(false); }}
              title="Minimizar mascota"
              style={{
                position: 'absolute', top: '-4px', left: '-4px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10
              }}
            >
              <X size={10} />
            </button>

            <motion.div 
              animate={{
                scale: [1, 1.025, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
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
                alt="Mascota Nico"
                animate={getEyeAnimation()}
                transition={{ duration: 0.15 }}
                style={{
                  width: '90%',
                  height: '90%',
                  objectFit: 'contain'
                }}
              />
            </motion.div>
            
            {/* Decorador de chispa/glowing */}
            <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
              <Sparkles size={11} className="animate-pulse" />
            </div>
          </motion.div>
        ) : (
          /* Collapsed version */
          <motion.button
            key="avatar-collapsed"
            onClick={() => { play('click'); setIsOpen(true); setShowBubble(true); }}
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
            <div style={{
              position: 'absolute', top: '-2px', right: '-2px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-red)', border: '1px solid #fff'
            }} />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes aura-pulse-god {
          0%, 100% { transform: scale(1); opacity: 0.35; filter: blur(2px); }
          50% { transform: scale(1.22); opacity: 0.65; filter: blur(4px); }
        }
      `}</style>
    </div>
  );
}
