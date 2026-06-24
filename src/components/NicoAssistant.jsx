import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useNico } from '../state/nicoStore';

export default function NicoAssistant({ activeTab, showBubble, setShowBubble }) {
  const { emotion, brainState, startOnboarding } = useNico();
  const [bubbleText, setBubbleText] = useState('¡Hola! Soy tu asistente de campaña. ¿En qué te puedo ayudar hoy?');

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

  useEffect(() => {
    if (tabTips[activeTab]) {
      setBubbleText(tabTips[activeTab]);
      setShowBubble(true);
    }
  }, [activeTab, setShowBubble]);

  // Dynamic advice messages depending on emotion
  useEffect(() => {
    if (emotion === 'resting') {
      setBubbleText('Zzz... Nico está tomando un descanso. Mueve el cursor para despertarlo.');
    } else if (emotion === 'celebrating') {
      setBubbleText('🎉 ¡Excelente! Seguimos sumando ideas para transformar a Tunja.');
    } else if (emotion === 'sad') {
      setBubbleText('Uh oh... Ocurrió un error en la plataforma. ¡Hagámoslo de nuevo!');
    }
  }, [emotion]);

  return (
    <AnimatePresence>
      {showBubble && (
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
          {/* Bubble Indicator Triangle */}
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            right: '32px',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid var(--bg-card)',
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.06))'
          }} />

          {/* Close button */}
          <button 
            onClick={() => setShowBubble(false)}
            style={{ position: 'absolute', top: '6px', right: '6px', border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          >
            <X size={14} />
          </button>

          <p style={{ margin: '0 14px 8px 0', fontSize: '0.9rem' }}>{bubbleText}</p>

          {/* Quick onboarding guide link */}
          {emotion !== 'resting' && (
            <button
              onClick={() => {
                setShowBubble(false);
                startOnboarding();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(74, 0, 114, 0.08)',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--primary)',
                cursor: 'pointer',
                marginBottom: '4px',
                transition: 'all 0.2s'
              }}
              onMouseOver={e=>e.currentTarget.style.background='rgba(74, 0, 114, 0.15)'}
              onMouseOut={e=>e.currentTarget.style.background='rgba(74, 0, 114, 0.08)'}
            >
              <Play size={10} fill="currentColor" />
              Guía de Inicio Rápido
            </button>
          )}

          {/* Living HUD metrics */}
          <div style={{
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '8.5px',
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
  );
}
