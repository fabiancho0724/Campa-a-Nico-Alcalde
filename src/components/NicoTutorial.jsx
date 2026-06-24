import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, CheckSquare } from 'lucide-react';
import { useNico } from '../state/nicoStore';

const stepsData = {
  1: {
    title: "¡Hola de nuevo! 🤝",
    text: "Te guiaré paso a paso por la plataforma. Aquí aprenderás a registrar propuestas y participar.",
    tab: null
  },
  2: {
    title: "Las 5 de Nico 🎯",
    text: "En esta pestaña puedes leer los 5 ejes principales del programa y añadir tus propios aportes.",
    tab: "proposals"
  },
  3: {
    title: "Laboratorio Joven 2.0 ⚡",
    text: "¡El corazón digital! Vota ideas de otros jóvenes o propone tus proyectos tecnológicos para Tunja.",
    tab: "joven"
  },
  4: {
    title: "Únete a la Campaña 🌟",
    text: "Sé parte activa del cambio. Regístrate como voluntario para acompañar a Nico en las calles.",
    tab: "unete"
  },
  5: {
    title: "¡Todo Listo! 🏆",
    text: "Completaste la inducción. Has ganado +50 XP y desbloqueado la insignia 'Bienvenida Nico'. ¡A construir ciudad!",
    tab: "proposals"
  }
};

export default function NicoTutorial() {
  const { onboardingStep, nextOnboardingStep, prevOnboardingStep, endOnboarding } = useNico();

  const currentStepData = stepsData[onboardingStep];

  // Auto-navigate tabs based on step tab trigger
  useEffect(() => {
    const stepData = stepsData[onboardingStep];
    if (stepData && stepData.tab) {
      window.dispatchEvent(new CustomEvent('navigateTab', { detail: stepData.tab }));
    }
  }, [onboardingStep]);

  if (onboardingStep === null) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        bottom: '120px',
        right: '24px',
        zIndex: 9998,
        maxWidth: '320px',
        pointerEvents: 'auto'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            background: 'linear-gradient(135deg, rgba(74, 0, 114, 0.95) 0%, rgba(12, 56, 102, 0.95) 100%)',
            color: '#FFFFFF',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '20px',
            padding: '1.25rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            position: 'relative'
          }}
        >
          {/* Header indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)' }}>
              GUÍA INTERACTIVA ({onboardingStep}/5)
            </span>
            <button 
              onClick={endOnboarding}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: '800' }}>{currentStepData.title}</h4>
          <p style={{ margin: '0 0 1.25rem', fontSize: '0.85rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}>
            {currentStepData.text}
          </p>

          {/* Steps Indicator Dots */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '1.25rem' }}>
            {[1,2,3,4,5].map(step => (
              <div 
                key={step} 
                style={{ 
                  flex: 1, 
                  height: '4px', 
                  borderRadius: '2px', 
                  background: step === onboardingStep ? '#00e5ff' : 'rgba(255,255,255,0.25)',
                  transition: 'background 0.3s'
                }} 
              />
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {onboardingStep > 1 ? (
              <button
                onClick={prevOnboardingStep}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.2)'}
                onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}
              >
                <ChevronLeft size={14} />
                Atrás
              </button>
            ) : <div />}

            <button
              onClick={nextOnboardingStep}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#00e5ff',
                border: 'none',
                borderRadius: '50px',
                padding: '0.45rem 1rem',
                fontSize: '0.8rem',
                fontWeight: '800',
                color: '#0c3866',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,229,255,0.3)',
                transition: 'all 0.2s'
              }}
              onMouseOver={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}
            >
              {onboardingStep === 5 ? (
                <>
                  Entendido
                  <CheckSquare size={14} />
                </>
              ) : (
                <>
                  Siguiente
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
