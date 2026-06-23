import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Lock, Eye, EyeOff, Loader, Github } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  getAdditionalUserInfo
} from 'firebase/auth';

const defaultInputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: '8px',
  border: '1px solid var(--border-color)',
  backgroundColor: 'var(--bg-primary)',
  outline: 'none',
  fontSize: '0.95rem',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  color: 'var(--text-primary)'
};

const providersStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: '1.5rem',
  marginBottom: '1.5rem'
};

const providerBtnStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  padding: '0.75rem',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  transition: 'all 0.2s'
};

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login', 'register', 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const checkAndCreateUserDoc = async (userCred) => {
    try {
      const userDocRef = doc(db, 'usuarios', userCred.user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
         const emailLower = (userCred.user.email || '').toLowerCase().trim();
         const isSuperAdmin = emailLower === 'fabian.cely0724@gmail.com';
         await setDoc(userDocRef, {
            uid: userCred.user.uid,
            email: emailLower,
            nombre: userCred.user.displayName || userCred.user.email?.split('@')[0] || 'Ciudadano',
            rol: isSuperAdmin ? 'SuperAdmin' : 'usuario',
            activo: true,
            permisos: {
              historialElectoral: isSuperAdmin,
              balance: isSuperAdmin,
              simulador: isSuperAdmin,
              panelAdmin: isSuperAdmin
            },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
      }
    } catch (e) {
      console.warn("Could not check or create user document in Firestore (client might be offline):", e.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const emailLower = email.toLowerCase().trim();

    try {
      if (mode === 'login') {
        const userCred = await signInWithEmailAndPassword(auth, emailLower, password);
        await checkAndCreateUserDoc(userCred);
        window.dispatchEvent(new CustomEvent('nico-celebrate', { 
          detail: { 
            message: '¡Qué bueno verte de nuevo! Bienvenido a la plataforma inteligente Nico Alcalde.' 
          } 
        }));
        onClose();
      } else if (mode === 'register') {
        const userCred = await createUserWithEmailAndPassword(auth, emailLower, password);
        await checkAndCreateUserDoc(userCred);
        window.dispatchEvent(new CustomEvent('nico-celebrate', { 
          detail: { 
            message: '¡Excelente! Te has registrado con éxito. Bienvenido al cambio inteligente.' 
          } 
        }));
        onClose();
      } else if (mode === 'reset') {
        await sendPasswordResetEmail(auth, emailLower);
        setMessage('Enlace de recuperación enviado. Revisa tu bandeja de entrada.');
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Credenciales incorrectas.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('El correo ya está registrado.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else {
        setError(err.message || 'Error de autenticación');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProviderAuth = async (providerName) => {
    setLoading(true);
    setError(null);
    try {
      let provider;
      if (providerName === 'google') provider = new GoogleAuthProvider();
      if (providerName === 'github') provider = new GithubAuthProvider();
      if (providerName === 'microsoft') {
        provider = new OAuthProvider('microsoft.com');
      }
      
      const userCred = await signInWithPopup(auth, provider);
      await checkAndCreateUserDoc(userCred);
      window.dispatchEvent(new CustomEvent('nico-celebrate', { 
        detail: { 
          message: '¡Bienvenido! Has ingresado correctamente a la plataforma inteligente.' 
        } 
      }));
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error en autenticación por proveedor');
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1.5rem',
      animation: 'fadeIn 0.2s ease'
    }}
    onClick={onClose}
    >
      <div style={{
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '440px',
        position: 'relative',
        padding: '2.5rem',
        animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer', transition: 'background 0.2s'
          }}
          onMouseOver={e=>e.currentTarget.style.background='var(--bg-overlay)'}
          onMouseOut={e=>e.currentTarget.style.background='transparent'}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)' }}>
            {mode === 'login' ? 'Bienvenido de nuevo' : mode === 'register' ? 'Crear Cuenta' : 'Recuperar Acceso'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
            {mode === 'login' ? 'Accede a la plataforma de gobernanza inteligente.' 
             : mode === 'register' ? 'Únete al ecosistema Tunja 2.0.' 
             : 'Te enviaremos un enlace mágico seguro a tu correo.'}
          </p>
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '0.8rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
        {message && (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', padding: '0.8rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A1A1AA' }}>
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...defaultInputStyle, paddingLeft: '2.5rem' }} 
              required 
            />
          </div>

          {mode !== 'reset' && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A1A1AA' }}>
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...defaultInputStyle, paddingLeft: '2.5rem', paddingRight: '2.5rem' }} 
                required 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#A1A1AA', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}

          {mode === 'login' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--primary)' }} /> Recordarme
              </label>
              <button type="button" onClick={() => setMode('reset')} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '500', cursor: 'pointer', padding: 0 }}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              background: 'var(--primary)', 
              color: '#fff', 
              border: 'none', 
              padding: '0.85rem', 
              borderRadius: '8px', 
              fontWeight: '600', 
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer', 
              transition: 'all 0.2s',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 14px rgba(74, 0, 114, 0.3)'
            }}
          >
            {loading ? <Loader className="animate-spin" size={20} /> : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
                <div className="nico-btn-avatar-container" style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', transition: 'transform 0.3s ease' }}>
                  <img className="nico-btn-avatar" src="/CaraNico.png" alt="Nico" style={{ width: '90%', height: '90%', objectFit: 'contain', transition: 'all 0.3s ease' }} />
                </div>
                <span>{mode === 'login' ? 'Iniciar Sesión' : mode === 'register' ? 'Crear Cuenta' : 'Enviar Enlace Mágico'}</span>
              </div>
            )}
          </button>
        </form>

        {mode !== 'reset' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: '#A1A1AA', fontSize: '0.85rem' }}>
              <div style={{ flex: 1, height: '1px', background: '#E4E4E7' }}></div>
              <span style={{ padding: '0 1rem' }}>O continuar con</span>
              <div style={{ flex: 1, height: '1px', background: '#E4E4E7' }}></div>
            </div>

            <div style={providersStyle}>
              {/* Google */}
              {/* Google */}
              <button 
                type="button" 
                onClick={() => handleProviderAuth('google')}
                style={providerBtnStyle}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-overlay)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '20px' }} />
              </button>
              
              {/* Microsoft */}
              <button 
                type="button" 
                onClick={() => handleProviderAuth('microsoft')}
                style={providerBtnStyle}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-overlay)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
              >
                <img src="https://www.svgrepo.com/show/448239/microsoft.svg" alt="Microsoft" style={{ width: '20px' }} />
              </button>

              {/* GitHub */}
              <button 
                type="button" 
                onClick={() => handleProviderAuth('github')}
                style={providerBtnStyle}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-overlay)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
              >
                <Github size={20} color="var(--text-primary)" />
              </button>
            </div>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {mode === 'login' ? (
            <>
              ¿No tienes una cuenta? <button type="button" onClick={() => { setMode('register'); setError(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', padding: 0 }}>Regístrate</button>
            </>
          ) : mode === 'register' ? (
            <>
              ¿Ya tienes una cuenta? <button type="button" onClick={() => { setMode('login'); setError(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', padding: 0 }}>Inicia sesión</button>
            </>
          ) : (
            <button type="button" onClick={() => { setMode('login'); setError(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', padding: 0 }}>Volver a iniciar sesión</button>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
