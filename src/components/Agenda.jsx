import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ExternalLink, LogOut, ChevronRight } from 'lucide-react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

// --- AUTH & FIREBASE INTEGRATION ---
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar.readonly');

let isSigningIn = false;
let cachedAccessToken = null;

const initAuth = (onAuthSuccess, onAuthFailure) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

const googleSignIn = async () => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// We will implement auth directly inside here or a helper, but let's stub the UI first.
export default function Agenda() {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setNeedsAuth(false);
        fetchEvents(token);
      },
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setError(null);
      const result = await googleSignIn();
      if (result) {
        setNeedsAuth(false);
        fetchEvents(result.accessToken);
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('No se pudo iniciar sesión. Verifica los permisos.');
    }
  };

  const handleLogout = async () => {
    await logout();
    setNeedsAuth(true);
    setEvents([]);
  };

  const fetchEvents = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const timeMin = new Date().toISOString();
      const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&maxResults=10&orderBy=startTime&singleEvents=true`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error al cargar la agenda');
      const data = await res.json();
      setEvents(data.items || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Hubo un problema al cargar los eventos del calendario.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString, dateOnly) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    if (!dateOnly) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    return d.toLocaleDateString('es-CO', options);
  };

  return (
    <div style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--primary)', marginBottom: '0.5rem' }}>La Agenda de Nico</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Conecta con Google Calendar para visualizar los próximos eventos y recorridos de Nicolás por Tunja.</p>
        </div>
        {!needsAuth && (
          <button onClick={handleLogout} style={{ border: '1px solid var(--border-color)', background: 'transparent', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
            <LogOut size={16} /> Salir
          </button>
        )}
      </div>

      {error && <div style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '1rem', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>{error}</div>}

      {needsAuth ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', border: '1px solid var(--border-color)' }}>
          <CalendarIcon size={48} style={{ color: 'var(--primary)' }} />
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Acceso a la Agenda</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Para visualizar la agenda oficial, por favor inicia sesión con tu cuenta.</p>
          </div>
          <button onClick={handleLogin} className="gsi-material-button" style={{ 
            background: 'white', 
            color: '#757575', 
            border: '1px solid #ddd', 
            padding: '8px 16px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
          }}>
             <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '24px', height: '24px' }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            Continuar con Google
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Cargando agenda...</div>
          ) : events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
              No hay eventos próximos programados en este calendario.
            </div>
          ) : (
            events.map((event) => {
              const start = event.start.dateTime || event.start.date;
              const dateOnly = !event.start.dateTime;
              
              return (
                <div key={event.id} style={{ display: 'flex', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                  {/* Left edge accent */}
                  <div style={{ width: '4px', background: 'var(--primary)' }}></div>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{event.summary || 'Evento sin título'}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={14} style={{ color: 'var(--primary)' }} />
                        {formatDate(start, dateOnly)}
                      </div>
                      {event.location && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <MapPin size={14} style={{ color: 'var(--primary)' }} />
                          {event.location}
                        </div>
                      )}
                    </div>
                    {event.description && (
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                        {event.description}
                      </p>
                    )}
                  </div>
                  {event.htmlLink && (
                     <a href={event.htmlLink} target="_blank" rel="noreferrer" style={{ padding: '1.5rem', borderLeft: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        <ChevronRight size={24} />
                     </a>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
