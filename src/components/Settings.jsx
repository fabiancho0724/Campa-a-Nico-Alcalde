import React, { useState } from 'react';
import { Bell, Lock, Globe, Moon, Monitor, Paintbrush } from 'lucide-react';

export default function Settings({ theme, changeTheme }) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
    messages: true
  });
  
  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
        
        <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', margin: '0 0 2rem 0', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          Configuración
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* SECCIÓN PREFERENCIAS */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Paintbrush size={20} color="var(--primary)" /> Apariencia y Preferencias
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <button 
                onClick={() => changeTheme('light')}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem', borderRadius: '16px', border: `2px solid ${theme === 'light' ? 'var(--primary)' : 'var(--border-color)'}`, background: theme === 'light' ? 'var(--primary-glow)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <Monitor size={32} color={theme === 'light' ? 'var(--primary)' : 'var(--text-muted)'} />
                <span style={{ fontWeight: '700', color: theme === 'light' ? 'var(--primary)' : 'var(--text-secondary)' }}>Claro</span>
              </button>
              <button 
                onClick={() => changeTheme('dark')}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem', borderRadius: '16px', border: `2px solid ${theme === 'dark' ? 'var(--primary)' : 'var(--border-color)'}`, background: theme === 'dark' ? 'var(--primary-glow)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <Moon size={32} color={theme === 'dark' ? 'var(--primary)' : 'var(--text-muted)'} />
                <span style={{ fontWeight: '700', color: theme === 'dark' ? 'var(--primary)' : 'var(--text-secondary)' }}>Oscuro</span>
              </button>
            </div>
          </div>

          {/* SECCIÓN NOTIFICACIONES */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={20} color="var(--primary)" /> Notificaciones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-overlay)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Resúmenes por Correo</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Recibir novedades semanales de la plataforma</div>
                </div>
                <ToggleSwitch active={notifications.email} onClick={() => toggleNotification('email')} />
              </div>

              <div style={{ height: '1px', background: '#E4E4E7' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Avisos de Foros</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Notificar cuando hay nuevas reuniones mapeadas</div>
                </div>
                <ToggleSwitch active={notifications.updates} onClick={() => toggleNotification('updates')} />
              </div>

            </div>
          </div>

          {/* SECCIÓN SEGURIDAD */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={20} color="var(--primary)" /> Seguridad
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button style={{ background: '#F4F4F5', border: '1px solid var(--border-color)', padding: '1rem 1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }} onMouseOver={e=>e.currentTarget.style.background='#E4E4E7'} onMouseOut={e=>e.currentTarget.style.background='#F4F4F5'}>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Cambiar contraseña</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Actualiza tu clave de acceso de manera segura</div>
                </div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Componente helper para el toggle
function ToggleSwitch({ active, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        width: '44px', height: '24px', 
        background: active ? 'var(--primary)' : '#E4E4E7', 
        borderRadius: '100px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.3s'
      }}
    >
      <div style={{ 
        width: '20px', height: '20px', 
        background: 'var(--bg-card)', 
        borderRadius: '50%', 
        position: 'absolute', 
        top: '2px', 
        left: active ? '22px' : '2px', 
        transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} />
    </div>
  );
}
