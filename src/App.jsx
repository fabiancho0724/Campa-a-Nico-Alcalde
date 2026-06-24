import React, { useState, useEffect, lazy, Suspense } from 'react';
import LandingPage from './components/LandingPage';
import Joven20 from './components/Joven20';
import Proposals from './components/Proposals';
import Agenda from './components/Agenda';
import BrandLogos from './components/BrandLogos';
import UneteCampaign from './components/UneteCampaign';
import TunjaAvanza from './components/TunjaAvanza';
import LegalPolicies from './components/LegalPolicies';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import NicoMascot from './components/NicoMascot';
import { NicoProvider } from './state/nicoStore';
import { useNicoEvents } from './hooks/useNicoEvents';
import { eventBus } from './core/eventBus';
import { useSoundFX } from './hooks/useSoundFX';
import FloatingWorld from './components/FloatingWorld';

// Carga perezosa (lazy loading) para componentes pesados
const ElectoralMetrics = lazy(() => import('./components/ElectoralMetrics'));
const BudgetVisualizer = lazy(() => import('./components/BudgetVisualizer'));
const InteractiveMap = lazy(() => import('./components/InteractiveMap'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
import { 
  Vote, Sliders, GraduationCap, Shield, 
  MapPin, CheckSquare, Sparkles, Building, BarChart3, ArrowLeft, Calendar,
  Facebook, Instagram, Map, Target, UserPlus
} from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';

function AppContent() {
  useNicoEvents();
  const { play } = useSoundFX();

  const urlNicoPhoto = "https://raw.githubusercontent.com/fabiancho0724/Prueba-123/e7fcca3daefa398a6c43271a5c7b379f7ab7ddbf/682871269_3927799717353938_6204895979427810843_n.jpg";

  // viewMode puede ser 'landing' (portada) o 'dashboard' (interfaz principal)
  const [viewMode, setViewMode] = useState('landing');
  const [activeTab, setActiveTab] = useState('proposals'); // Default to a public tab
  const [activeLegalDoc, setActiveLegalDoc] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('tunja-theme');
    return storedTheme || 'light';
  });

  // Helpers de rol y permisos
  const isSuperAdmin = userProfile?.rol === 'SuperAdmin' || user?.email?.toLowerCase().trim() === 'fabian.cely0724@gmail.com';
  
  const hasPerm = (permName) => {
    if (isSuperAdmin) return true;
    return !!userProfile?.permisos?.[permName];
  };

  const checkTabAccess = (tabId) => {
    if (tabId === 'map') return hasPerm('historialElectoral');
    if (tabId === 'electoral') return hasPerm('balance');
    if (tabId === 'budget') return hasPerm('simulador');
    if (tabId === 'admin') return hasPerm('panelAdmin');
    return true;
  };

  const logAccessAttempt = async (tabName) => {
    try {
      await addDoc(collection(db, 'auditorias'), {
        uid: user?.uid || 'anonimo',
        email: user?.email || 'anonimo',
        accion: 'Intento de acceso no autorizado',
        modulo: tabName,
        detalles: `El usuario intentó acceder al módulo restringido: ${tabName}`,
        timestamp: serverTimestamp()
      });
    } catch (e) {
      console.warn("Could not log access attempt to Firestore:", e.message);
    }
  };

  const handleTabChange = (tabId) => {
    if (!checkTabAccess(tabId)) {
      logAccessAttempt(tabId);
      setActiveTab('denied');
    } else {
      setActiveTab(tabId);
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50);
  };

  const handleLegalClick = (docId) => {
    setActiveLegalDoc(docId);
    handleTabChange('legal');
  };

  // Inicializar y detectar tema (manual y automático)
  useEffect(() => {
    const storedTheme = localStorage.getItem('tunja-theme');
    if (storedTheme) {
      if (storedTheme === 'system') {
        setTheme('system');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
      } else {
        setTheme(storedTheme);
        document.documentElement.classList.toggle('dark', storedTheme === 'dark');
      }
    } else {
      setTheme('light');
      document.documentElement.classList.toggle('dark', false);
    }

    const handleNavigate = (e) => {
      if (e.detail) {
        handleTabChange(e.detail);
      }
    };
    window.addEventListener('navigateTab', handleNavigate);
    return () => window.removeEventListener('navigateTab', handleNavigate);
  }, [userProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  // Escuchar cambios en la preferencia del sistema operativo para dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const storedTheme = localStorage.getItem('tunja-theme');
      if (!storedTheme || storedTheme === 'system') {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Escuchar cambios de URL (hash o query params) para protección de rutas
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const hashParam = window.location.hash.replace('#', '');
      const targetTab = tabParam || hashParam;
      
      if (targetTab && targetTab !== activeTab) {
        if (!checkTabAccess(targetTab)) {
          logAccessAttempt(targetTab);
          setActiveTab('denied');
        } else {
          setActiveTab(targetTab);
        }
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50);
      }
    };
    
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    
    // Validar el acceso en carga inicial
    if (userProfile !== null || !user) {
      handleUrlChange();
    }
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [userProfile, user, activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeTheme = (newTheme) => {
    if (newTheme === 'system') {
      setTheme('system');
      localStorage.removeItem('tunja-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      setTheme(newTheme);
      localStorage.setItem('tunja-theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const emailLower = (currentUser.email || '').toLowerCase().trim();
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (emailLower === 'fabian.cely0724@gmail.com') {
              const needsUpdate = data.rol !== 'SuperAdmin' || 
                                  !data.permisos?.panelAdmin || 
                                  !data.permisos?.historialElectoral || 
                                  !data.permisos?.balance || 
                                  !data.permisos?.simulador;
              if (needsUpdate) {
                try {
                  await updateDoc(doc(db, 'usuarios', currentUser.uid), {
                    rol: 'SuperAdmin',
                    permisos: {
                      historialElectoral: true,
                      balance: true,
                      simulador: true,
                      panelAdmin: true
                    },
                    updatedAt: new Date()
                  });
                } catch (updateErr) {
                  console.warn("Could not update SuperAdmin permissions in Firestore:", updateErr.message);
                }
                data.rol = 'SuperAdmin';
                data.permisos = {
                  historialElectoral: true,
                  balance: true,
                  simulador: true,
                  panelAdmin: true
                };
              }
            }
            setUserProfile(data);
          } else {
            const isSA = emailLower === 'fabian.cely0724@gmail.com';
            const defaultProfile = { 
              uid: currentUser.uid,
              nombre: currentUser.displayName || currentUser.email?.split('@')[0] || 'Ciudadano',
              rol: isSA ? 'SuperAdmin' : 'usuario', 
              email: emailLower,
              activo: true,
              permisos: {
                historialElectoral: isSA,
                balance: isSA,
                simulador: isSA,
                panelAdmin: isSA
              },
              createdAt: new Date(),
              updatedAt: new Date()
            };
            try {
              await setDoc(doc(db, 'usuarios', currentUser.uid), defaultProfile);
            } catch (setErr) {
              console.warn("Could not create user document in Firestore:", setErr.message);
            }
            setUserProfile(defaultProfile);
          }
        } catch (e) {
          console.warn("Could not fetch user profile (using defaults):", e.message);
          const isSA = emailLower === 'fabian.cely0724@gmail.com';
          setUserProfile({ 
            rol: isSA ? 'SuperAdmin' : 'usuario', 
            email: currentUser.email,
            activo: true,
            permisos: {
              historialElectoral: isSA,
              balance: isSA,
              simulador: isSA,
              panelAdmin: isSA
            }
          });
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, [viewMode]);

  useEffect(() => {
    const handleGlobalError = () => {
      eventBus.emit({ type: 'ERROR' });
      play('error');
    };
    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, [play]);

  // Si estamos en modo Portada, renderizamos la portada premium
  if (viewMode === 'landing') {
    return <LandingPage 
      onEnterApp={(targetTab = 'proposals') => {
        setViewMode('dashboard');
        handleTabChange(targetTab);
      }} 
      onLegalClick={(docId) => {
        setViewMode('dashboard');
        setActiveLegalDoc(docId);
        handleTabChange('legal');
      }}
    />;
  }

  const role = userProfile?.rol || userProfile?.role || 'Usuario Invitado';
  const isAdmin = role === 'SuperAdmin' || role === 'Administrador' || role === 'admin';
  const canViewReports = isAdmin || role === 'Editor' || role === 'Analista';

  const handleGlobalClick = (e) => {
    const target = e.target;
    if (target) {
      const isInteractive = target.closest && (
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        (target.classList?.contains && target.classList.contains('nav-tab')) ||
        target.closest('.nav-tab') ||
        target.tagName === 'A' ||
        target.closest('a')
      );

      if (isInteractive) {
        eventBus.emit({ type: 'CLICK' });
        play('click');
      }
    }
  };

  return (
    <div 
      onClick={handleGlobalClick}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }} 
      className="animate-fade-in"
    >
      <FloatingWorld />
      
      {/* 1. Encabezado de Navegación Premium */}
      <header style={{
        background: '#4A0072',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '0.85rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem', margin: '0 auto', maxWidth: '1400px' }}>
          
          {/* Logos Header - Click para volver a la portada */}
          <div 
            onClick={() => setViewMode('landing')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
            title="Volver a la portada"
          >
            <BrandLogos variant="header" />
          </div>

          {/* Menú de Navegación de Pestañas (Desktop) */}
          <nav className="nav-tab-container" style={{ flexWrap: 'wrap' }}>
            <button 
              className={`nav-tab ${activeTab === 'proposals' ? 'active' : ''}`}
              onClick={() => handleTabChange('proposals')}
            >
              <Target size={16} />
              Las 5 de Nico
            </button>
            <button 
              className={`nav-tab ${activeTab === 'joven' ? 'active' : ''}`}
              onClick={() => handleTabChange('joven')}
            >
              <Sparkles size={16} />
              Joven 2.0
            </button>
            <button 
              className={`nav-tab ${activeTab === 'tunja_avanza' ? 'active' : ''}`}
              onClick={() => handleTabChange('tunja_avanza')}
            >
              <Building size={16} />
              Tunja Avanza
            </button>
            <button 
              className={`nav-tab ${activeTab === 'agenda' ? 'active' : ''}`}
              onClick={() => handleTabChange('agenda')}
            >
              <Calendar size={16} />
              La Agenda de Nico
            </button>
            <button 
              className={`nav-tab ${activeTab === 'unete' ? 'active' : ''}`}
              onClick={() => handleTabChange('unete')}
            >
              <UserPlus size={16} />
              Únete a la Campaña
            </button>
            {hasPerm('historialElectoral') && (
              <button 
                className={`nav-tab ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => handleTabChange('map')}
              >
                <BarChart3 size={16} />
                Historia Electoral de Tunja
              </button>
            )}

            {hasPerm('balance') && (
              <button 
                className={`nav-tab ${activeTab === 'electoral' ? 'active' : ''}`}
                onClick={() => handleTabChange('electoral')}
              >
                <BarChart3 size={16} />
                Balance
              </button>
            )}

            {hasPerm('simulador') && (
              <button 
                className={`nav-tab ${activeTab === 'budget' ? 'active' : ''}`}
                onClick={() => handleTabChange('budget')}
              >
                <Sliders size={16} />
                Simulador
              </button>
            )}

            {hasPerm('panelAdmin') && (
              <button 
                className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`}
                onClick={() => handleTabChange('admin')}
              >
                <Shield size={16} />
                Panel Admin
              </button>
            )}
          </nav>

          {/* Botones de Control / Portada */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => setViewMode('landing')}
              style={{ 
                padding: '0.4rem 0.8rem', 
                fontSize: '0.8rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.35rem',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: 500
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <ArrowLeft size={14} />
              Salir al inicio
            </button>
          </div>

        </div>
      </header>

      {/* 2. Banner de Campaña y Presentación del Candidato removido */}

      {/* 3. Contenedor del Contenido Activo */}
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        <div className="container" style={{ margin: '0 auto', maxWidth: '1400px', padding: '2.5rem 2rem' }}>
          
          {/* Renderizado Condicional del Componente Seleccionado */}
          <div className="animate-fade-in" key={activeTab}>
            <Suspense fallback={
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '5rem 2rem', 
                color: 'var(--text-secondary)' 
              }}>
                <div className="loading-spinner" style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid var(--border-color)',
                  borderTop: '4px solid var(--primary)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '1rem'
                }} />
                <span style={{ fontWeight: '600' }}>Cargando módulo...</span>
              </div>
            }>
              {activeTab === 'joven' && <Joven20 />}
              {activeTab === 'tunja_avanza' && <TunjaAvanza />}
              {activeTab === 'unete' && <UneteCampaign onLegalClick={handleLegalClick} />}
              {activeTab === 'electoral' && hasPerm('balance') && <ElectoralMetrics />}
              {activeTab === 'budget' && hasPerm('simulador') && <BudgetVisualizer />}
              {activeTab === 'proposals' && <Proposals />}
              {activeTab === 'agenda' && <Agenda />}
              {activeTab === 'map' && hasPerm('historialElectoral') && <InteractiveMap />}
              {activeTab === 'admin' && hasPerm('panelAdmin') && <AdminPanel />}
              {activeTab === 'denied' && <AccesoDenegado />}
              {activeTab === 'legal' && <LegalPolicies activeLegalDoc={activeLegalDoc} />}
              {activeTab === 'profile' && <UserProfile user={user} userProfile={userProfile} />}
              {activeTab === 'settings' && <Settings theme={theme} changeTheme={changeTheme} />}
            </Suspense>
          </div>
          
        </div>
      </main>

      {/* 4. Pie de Página */}
      <footer style={{
        background: '#4A0072',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        padding: '3rem 0 2rem',
        marginTop: 'auto',
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.7)'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', margin: '0 auto', maxWidth: '1400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <BrandLogos variant="header" />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                Plataforma de transparencia en gestión pública y desarrollo urbano.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <a href="mailto:info@nicoalcaldetunja.co" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 500 }}>
                  info@nicoalcaldetunja.co
                </a>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>Políticas</h4>
                <button onClick={() => handleLegalClick('tratamiento')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-white transition-colors">
                  Autorización de Tratamiento de Datos
                </button>
                <button onClick={() => handleLegalClick('privacidad')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-white transition-colors">
                  Política de Privacidad
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>Avisos Legales</h4>
                <button onClick={() => handleLegalClick('aviso')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-white transition-colors">
                  Aviso de Privacidad
                </button>
                <button onClick={() => handleLegalClick('cookies')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-white transition-colors">
                  Uso de Cookies
                </button>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ marginTop: '0.25rem', fontSize: '0.85rem' }}>
              &copy; 2026 Nicolás Cortés - Alcalde Tunja 2026. Diseñado para liderar.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <a href="https://www.facebook.com/profile.php?id=61590899663005&mibextid=wwXIfr&rdid=Vi1gH6cPjSKxOTAf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18j5J1LUz8%2F%3Fmibextid%3DwwXIfr#" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} onMouseOver={e=>e.currentTarget.style.color='#FFFFFF'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'} title="Facebook"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/nicolas__cortes_" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} onMouseOver={e=>e.currentTarget.style.color='#FFFFFF'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'} title="Instagram"><Instagram size={20} /></a>
              <a href="https://www.tiktok.com/@nicolascortes_60" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} onMouseOver={e=>e.currentTarget.style.color='#FFFFFF'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'} title="TikTok">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="none" style={{ display: 'block' }}>
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.85.96 1.99 1.63 3.25 1.95v3.91c-1.32-.01-2.61-.31-3.79-.88-.73-.34-1.38-.83-1.92-1.43v5.82c0 2.2-.82 4.31-2.29 5.92-1.74 1.83-4.22 2.87-6.81 2.87-2.31 0-4.54-.83-6.28-2.35C.42 18.25-.32 15.69-.17 13.06c.21-2.9 2.18-5.46 4.96-6.39 1.15-.36 2.37-.44 3.56-.23v4.06c-.84-.33-1.77-.32-2.6.02-.91.38-1.63 1.13-1.93 2.05-.41 1.25-.09 2.63.82 3.56.88.94 2.16 1.39 3.44 1.2 1.48-.18 2.68-1.28 2.94-2.75.07-.38.09-.76.09-1.14V0h1.39z"/>
                </svg>
              </a>
              <a href="https://api.whatsapp.com/send?phone=573228554050" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} onMouseOver={e=>e.currentTarget.style.color='#FFFFFF'} onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'} title="WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="none" style={{ display: 'block' }}>
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.966.01c3.178.001 6.169 1.24 8.424 3.496 2.254 2.256 3.491 5.253 3.49 8.434-.003 6.616-5.34 11.954-11.91 11.954-.002 0-.005 0-.007 0-2.008-.002-3.98-.51-5.733-1.474L0 24zm6.59-4.846c1.6.95 3.18 1.448 4.773 1.449 5.432 0 9.851-4.417 9.854-9.851.002-2.633-1.02-5.107-2.877-6.967-1.857-1.86-4.333-2.883-6.974-2.884-5.438 0-9.86 4.418-9.863 9.852-.001 1.702.449 3.366 1.306 4.806l-.99 3.614 3.708-.973zm12.183-6.852c-.29-.145-1.714-.847-1.98-.943-.264-.097-.457-.145-.65.145-.19.29-.74.943-.907 1.133-.166.19-.333.215-.623.07-1.36-.682-2.28-1.21-3.155-2.71-.24-.412.24-.383.687-1.275.074-.15.037-.28-.018-.39-.056-.113-.457-1.1-.626-1.506-.164-.397-.333-.342-.457-.348-.12-.006-.257-.007-.394-.007-.137 0-.36.05-.55.263-.19.213-.726.71-.726 1.73s.74 2.002.84 2.137c.103.136 1.458 2.227 3.532 3.12 1.57.674 2.164.717 2.935.602.433-.064 1.714-.7 1.954-1.378.24-.678.24-1.26.17-1.378-.074-.117-.267-.193-.557-.338z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <NicoMascot activeTab={activeTab} />
    </div>
  );
}

export default function App() {
  return (
    <NicoProvider>
      <AppContent />
    </NicoProvider>
  );
}

function AccesoDenegado() {
  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '3rem 2rem', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', marginBottom: '1.5rem' }}>
        <Shield size={40} />
      </div>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>Acceso Denegado</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '1rem' }}>
        No tienes permisos suficientes para acceder a este módulo restringido de la campaña. Si consideras que esto es un error o necesitas gestionar este panel, por favor contacta al SuperAdministrador para que habilite tu acceso.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('navigateTab', { detail: 'proposals' }))} 
          className="btn btn-primary"
        >
          Volver a Propuestas
        </button>
      </div>
    </div>
  );
}
