import React, { useState } from 'react';
import { User, Mail, Shield, CheckCircle2 } from 'lucide-react';

export default function UserProfile({ user, userProfile }) {

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: '24px', boxShadow: '0 4px 25px rgba(0,0,0,0.03)', border: '1px solid var(--border-color)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #F4F4F5', marginBottom: '2rem' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, #2D0046 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(74, 0, 114, 0.2)' }}>
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
              {user?.displayName || 'Usuario de Tunja 2.0'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '1rem', background: '#F4F4F5', padding: '0.4rem 0.8rem', borderRadius: '100px' }}>
                <Mail size={16} /> {user?.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontSize: '0.9rem', background: 'rgba(74, 0, 114, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '100px', fontWeight: '700', textTransform: 'uppercase' }}>
                <Shield size={16} /> {userProfile?.role || 'Ciudadano'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={20} color="var(--primary)" /> Información Personal
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: '#F4F4F5', padding: '1rem', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Nombre Completo</label>
                <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '600' }}>{user?.displayName || 'No especificado'}</div>
              </div>
              <div style={{ background: '#F4F4F5', padding: '1rem', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Correo Electrónico</label>
                <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '600' }}>{user?.email}</div>
              </div>
            </div>
            
            <button style={{ marginTop: '2rem', background: '#171717', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '100px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>
              Editar Perfil
            </button>

          </div>
          
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} color="#10B981" /> Historial de Actividad
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Se unió a la plataforma</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recientemente</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Registro inicial en Tunja 2.0</p>
              </div>
              <div style={{ padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: '12px', background: 'var(--bg-overlay)', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#A1A1AA' }}>Participa en los foros y asambleas para subir de nivel e incrementar tu influencia cívica.</p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
