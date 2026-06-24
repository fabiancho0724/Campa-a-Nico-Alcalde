import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Target, Users, Zap, Check } from 'lucide-react';
import { useNico, getLevelName, INSIGNIA_MAP } from '../state/nicoStore';

export default function NicoGamification({ isOpen, onClose }) {
  const { xp, level, unlockedInsignias, completedTasks } = useNico();

  if (!isOpen) return null;

  const nextLevelXP = level * 200;
  const progressPercent = Math.min(100, (xp % nextLevelXP) / nextLevelXP * 100);

  // Insignia icons mapping
  const insigniaIcons = {
    novato: <Zap size={22} />,
    prop_maker: <Target size={22} />,
    compromiso: <Users size={22} />,
    verificado: <Shield size={22} />
  };

  const getInsigniaClass = (id) => {
    return unlockedInsignias.includes(id) ? 'insignia-unlocked' : 'insignia-locked';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{
        pointerEvents: 'auto',
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '2px solid rgba(74, 0, 114, 0.25)',
        boxShadow: '0 12px 40px rgba(74, 0, 114, 0.16)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '20px',
        padding: '1.25rem',
        maxWidth: '300px',
        width: '300px',
        position: 'absolute',
        bottom: '96px',
        right: '0',
        zIndex: 9995,
        fontFamily: 'var(--font-body)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(74,0,114,0.12)', paddingBottom: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Award size={18} color="var(--primary)" />
          Tu Perfil Ciudadano
        </h3>
        <button 
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}
        >
          Cerrar
        </button>
      </div>

      {/* Progress & Level Card */}
      <div style={{ background: 'rgba(74, 0, 114, 0.05)', borderRadius: '12px', padding: '0.85rem', marginBottom: '1.25rem', border: '1px solid rgba(74,0,114,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              NIVEL {level}
            </div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary)', marginTop: '2px' }}>
              {getLevelName(level)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            <span>{xp % nextLevelXP} / {nextLevelXP} XP</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, #00e5ff 100%)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* Insignias Section */}
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Insignias Obtenidas ({unlockedInsignias.length}/4)
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '1rem' }}>
          {Object.keys(INSIGNIA_MAP).map(key => {
            const ins = INSIGNIA_MAP[key];
            const isUnlocked = unlockedInsignias.includes(ins.id);
            return (
              <div 
                key={ins.id}
                title={`${ins.title}: ${ins.desc}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  aspectRatio: '1',
                  borderRadius: '12px',
                  background: isUnlocked ? 'rgba(255, 179, 0, 0.12)' : 'rgba(0,0,0,0.05)',
                  border: isUnlocked ? '2px solid rgba(255, 179, 0, 0.4)' : '1px dashed rgba(0,0,0,0.15)',
                  color: isUnlocked ? '#ffb300' : 'rgba(0,0,0,0.3)',
                  filter: isUnlocked ? 'none' : 'grayscale(1)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
              >
                {insigniaIcons[ins.id]}
                {isUnlocked && (
                  <div style={{
                    position: 'absolute', bottom: '-4px', right: '-4px', width: '12px', height: '12px', borderRadius: '50%', background: '#ffb300', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px'
                  }}>
                    <Check size={8} strokeWidth={4} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Tasks Quick Check */}
      <div style={{ borderTop: '1px solid rgba(74,0,114,0.08)', paddingTop: '10px' }}>
        <h4 style={{ margin: '0 0 6px 0', fontSize: '10px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Logros Ciudadanos
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: completedTasks.includes('welcome') ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            <span style={{ color: completedTasks.includes('welcome') ? '#4caf50' : 'inherit', fontWeight: 'bold' }}>✓</span> Onboarding inicial
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: completedTasks.includes('first_proposal') ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            <span style={{ color: completedTasks.includes('first_proposal') ? '#4caf50' : 'inherit', fontWeight: 'bold' }}>✓</span> Primera propuesta
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: completedTasks.includes('volunteer') ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            <span style={{ color: completedTasks.includes('volunteer') ? '#4caf50' : 'inherit', fontWeight: 'bold' }}>✓</span> Inscribirse como voluntario
          </div>
        </div>
      </div>
    </motion.div>
  );
}
