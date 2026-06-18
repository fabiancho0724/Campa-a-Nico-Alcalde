import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Joven20 from './components/Joven20';
import ElectoralMetrics from './components/ElectoralMetrics';
import BudgetVisualizer from './components/BudgetVisualizer';
import Proposals from './components/Proposals';
import Agenda from './components/Agenda';
import InteractiveMap from './components/InteractiveMap';
import BrandLogos from './components/BrandLogos';
import AdminPanel from './components/AdminPanel';
import UneteCampaign from './components/UneteCampaign';
import TunjaAvanza from './components/TunjaAvanza';
import LegalPolicies from './components/LegalPolicies';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import { 
  Vote, Sliders, GraduationCap, Shield, 
  MapPin, CheckSquare, Sparkles, Building, BarChart3, ArrowLeft, Calendar,
  Facebook, Twitter, Instagram, Map, Target, UserPlus
} from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';

export default function App() {

  const urlNicoPhoto = "https://raw.githubusercontent.com/fabiancho0724/Prueba-123/e7fcca3daefa398a6c43271a5c7b379f7ab7ddbf/682871269_3927799717353938_6204895979427810843_n.jpg";

  // viewMode puede ser 'landing' (portada) o 'dashboard' (interfaz principal)
  const [viewMode, setViewMode] = useState('landing');
  const [activeTab, setActiveTab] = useState('proposals'); // Default to a public tab
  const [activeLegalDoc, setActiveLegalDoc] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Inicializar el tema
    const storedTheme = localStorage.getItem('tunja-theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('tunja-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50);
  };

  const handleLegalClick = (docId) => {
    setActiveLegalDoc(docId);
    setActiveTab('legal');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const emailLower = (currentUser.email || '').toLowerCase().trim();
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (emailLower === 'fabian.cely0724@gmail.com') {
              data.role = 'Administrador';
            }
            setUserProfile(data);
          } else {
            const defaultRole = emailLower === 'fabian.cely0724@gmail.com' ? 'Administrador' : 'Usuario Registrado';
            setUserProfile({ role: defaultRole, email: currentUser.email });
          }
        } catch (e) {
          console.warn("Could not fetch user profile (using defaults):", e.message);
          const defaultRole = emailLower === 'fabian.cely0724@gmail.com' ? 'Administrador' : 'Usuario Registrado';
          setUserProfile({ role: defaultRole, email: currentUser.email });
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, [viewMode]);

  // Si estamos en modo Portada, renderizamos la portada premium
  if (viewMode === 'landing') {
    return <LandingPage 
      onEnterApp={(targetTab = 'proposals') => {
        setViewMode('dashboard');
        setActiveTab(targetTab);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50);
      }} 
      onLegalClick={(docId) => {
        setViewMode('dashboard');
        setActiveLegalDoc(docId);
        setActiveTab('legal');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50);
      }}
    />;
  }

  const role = userProfile?.role || userProfile?.rol || 'Usuario Invitado';
  const isAdmin = role === 'Administrador' || role === 'admin';
  const canViewReports = isAdmin || role === 'Editor' || role === 'Analista';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }} className="animate-fade-in">
      
      {/* 1. Encabezado de Navegación Premium */}
      <header style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
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
              style={{ background: activeTab === 'unete' ? '#0f766e' : 'rgba(15, 118, 110, 0.05)', color: activeTab === 'unete' ? '#fff' : '#0f766e', borderColor: activeTab === 'unete' ? 'transparent' : 'rgba(15, 118, 110, 0.2)' }}
            >
              <UserPlus size={16} />
              Únete a la Campaña
            </button>
            <button 
              className={`nav-tab ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => handleTabChange('map')}
            >
              <BarChart3 size={16} />
              Historia Electoral de Tunja
            </button>

            {canViewReports && (
              <>
                <button 
                  className={`nav-tab ${activeTab === 'electoral' ? 'active' : ''}`}
                  onClick={() => handleTabChange('electoral')}
                >
                  <BarChart3 size={16} />
                  Balance
                </button>
                <button 
                  className={`nav-tab ${activeTab === 'budget' ? 'active' : ''}`}
                  onClick={() => handleTabChange('budget')}
                >
                  <Sliders size={16} />
                  Simulador
                </button>
              </>
            )}

            {isAdmin && (
              <button 
                className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`}
                onClick={() => handleTabChange('admin')}
                style={{ background: activeTab === 'admin' ? 'var(--primary)' : 'rgba(15, 76, 129, 0.05)', color: activeTab === 'admin' ? '#fff' : 'var(--primary)', borderColor: activeTab === 'admin' ? 'transparent' : 'rgba(15, 76, 129, 0.2)' }}
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
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
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
            {activeTab === 'joven' && <Joven20 />}
            {activeTab === 'tunja_avanza' && <TunjaAvanza />}
            {activeTab === 'unete' && <UneteCampaign />}
            {activeTab === 'electoral' && canViewReports && <ElectoralMetrics />}
            {activeTab === 'budget' && canViewReports && <BudgetVisualizer />}
            {activeTab === 'proposals' && <Proposals />}
            {activeTab === 'agenda' && <Agenda />}
            {activeTab === 'map' && <InteractiveMap />}
            {activeTab === 'admin' && isAdmin && <AdminPanel />}
            {activeTab === 'legal' && <LegalPolicies activeLegalDoc={activeLegalDoc} />}
            {activeTab === 'profile' && <UserProfile user={user} userProfile={userProfile} />}
            {activeTab === 'settings' && <Settings theme={theme} changeTheme={changeTheme} />}
          </div>
          
        </div>
      </main>

      {/* 4. Pie de Página */}
      <footer style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 0 2rem',
        marginTop: 'auto',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', margin: '0 auto', maxWidth: '1400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <BrandLogos variant="header" />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Plataforma de transparencia en gestión pública y desarrollo urbano.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <a href="mailto:info@nicoalcaldetunja.co" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                  info@nicoalcaldetunja.co
                </a>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>Políticas</h4>
                <button onClick={() => handleLegalClick('tratamiento')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-primary transition-colors">
                  Autorización de Tratamiento de Datos
                </button>
                <button onClick={() => handleLegalClick('privacidad')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-primary transition-colors">
                  Política de Privacidad
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>Avisos Legales</h4>
                <button onClick={() => handleLegalClick('aviso')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-primary transition-colors">
                  Aviso de Privacidad
                </button>
                <button onClick={() => handleLegalClick('cookies')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-primary transition-colors">
                  Uso de Cookies
                </button>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ marginTop: '0.25rem', fontSize: '0.85rem' }}>
              &copy; 2026 Nicolás Cortés - Alcalde Tunja 2026. Diseñado para liderar.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="https://linktr.ee/nicoalcalde2026?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGn-2dyyhDYCs75XGQkKUDXRGwRC0HyjmGIPxD86ozrmR1ozmRNPaN6ZOm5oIs_aem_3_xAabWQSDx9KHpdgUy6dw" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='var(--primary)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-muted)'}><Facebook size={20} /></a>
              <a href="https://linktr.ee/nicoalcalde2026?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGn-2dyyhDYCs75XGQkKUDXRGwRC0HyjmGIPxD86ozrmR1ozmRNPaN6ZOm5oIs_aem_3_xAabWQSDx9KHpdgUy6dw" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='var(--primary)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-muted)'}><Twitter size={20} /></a>
              <a href="https://linktr.ee/nicoalcalde2026?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGn-2dyyhDYCs75XGQkKUDXRGwRC0HyjmGIPxD86ozrmR1ozmRNPaN6ZOm5oIs_aem_3_xAabWQSDx9KHpdgUy6dw" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='var(--primary)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-muted)'}><Instagram size={20} /></a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
