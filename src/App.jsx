import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ElectoralMetrics from './components/ElectoralMetrics';
import BudgetVisualizer from './components/BudgetVisualizer';
import Proposals from './components/Proposals';
import NewsFeed from './components/NewsFeed';
import Agenda from './components/Agenda';
import InteractiveMap from './components/InteractiveMap';
import BrandLogos from './components/BrandLogos';
import AdminPanel from './components/AdminPanel';
import { 
  Vote, Sliders, GraduationCap, Newspaper, Shield, 
  MapPin, CheckSquare, Sparkles, Building, BarChart3, ArrowLeft, Calendar,
  Facebook, Twitter, Instagram, Map
} from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';

export default function App() {

  const urlNicoPhoto = "https://raw.githubusercontent.com/fabiancho0724/Prueba-123/e7fcca3daefa398a6c43271a5c7b379f7ab7ddbf/682871269_3927799717353938_6204895979427810843_n.jpg";

  // viewMode puede ser 'landing' (portada) o 'dashboard' (interfaz principal)
  const [viewMode, setViewMode] = useState('landing');
  const [activeTab, setActiveTab] = useState('proposals'); // Default to a public tab
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            setUserProfile({ role: 'Usuario Registrado', email: currentUser.email });
          }
        } catch (e) {
          console.error("Error fetching user profile:", e);
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, [viewMode]);

  // Si estamos en modo Portada, renderizamos la portada premium
  if (viewMode === 'landing') {
    return <LandingPage onEnterApp={() => setViewMode('dashboard')} />;
  }

  const role = userProfile?.role || userProfile?.rol || 'Usuario Invitado';
  const isAdmin = role === 'Administrador' || role === 'admin';
  const canViewReports = isAdmin || role === 'Editor' || role === 'Analista';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }} className="animate-fade-in">
      
      {/* 1. Encabezado de Navegación Premium */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.9)',
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
              onClick={() => setActiveTab('proposals')}
            >
              <GraduationCap size={16} />
              Rutas
            </button>
            <button 
              className={`nav-tab ${activeTab === 'news' ? 'active' : ''}`}
              onClick={() => setActiveTab('news')}
            >
              <Newspaper size={16} />
              Bitácora
            </button>
            <button 
              className={`nav-tab ${activeTab === 'agenda' ? 'active' : ''}`}
              onClick={() => setActiveTab('agenda')}
            >
              <Calendar size={16} />
              Agenda
            </button>
            <button 
              className={`nav-tab ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              <Map size={16} />
              Mapa
            </button>

            {canViewReports && (
              <>
                <button 
                  className={`nav-tab ${activeTab === 'electoral' ? 'active' : ''}`}
                  onClick={() => setActiveTab('electoral')}
                >
                  <BarChart3 size={16} />
                  Balance
                </button>
                <button 
                  className={`nav-tab ${activeTab === 'budget' ? 'active' : ''}`}
                  onClick={() => setActiveTab('budget')}
                >
                  <Sliders size={16} />
                  Simulador
                </button>
              </>
            )}

            {isAdmin && (
              <button 
                className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`}
                onClick={() => setActiveTab('admin')}
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

      {/* 2. Banner de Campaña y Presentación del Candidato */}
      <section style={{
        background: 'var(--secondary)',
        padding: '2rem 0 1rem 0',
        borderBottom: '1px solid var(--border-color)',
        color: '#FFFFFF'
      }}>
        <div className="container" style={{ margin: '0 auto', maxWidth: '1400px' }}>
          <div className="glass-card" style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.05), transparent)',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Foto / Avatar del Candidato Oficial */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--primary)',
                padding: '3px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={urlNicoPhoto} alt="Nicolás Cortés" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="pill pill-gold" style={{ fontSize: '0.65rem' }}>Perfil Autorizado</span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={12} /> Zona Norte
                  </span>
                </div>
                <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginTop: '0.25rem' }}>
                  Nicolás Cortés
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '0.25rem', maxWidth: '650px' }}>
                  Gestión inteligente de los recursos. Hacia una distribución transparente, conectividad efectiva y desarrollo social sustentable en nuestra ciudad capital.
                </p>
              </div>
            </div>

            {/* Removed Micro Widget de Resumen Financiero Rápido */}
          </div>
        </div>
      </section>

      {/* 3. Contenedor del Contenido Activo */}
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        <div className="container" style={{ margin: '0 auto', maxWidth: '1400px', padding: '2.5rem 2rem' }}>
          
          {/* Renderizado Condicional del Componente Seleccionado */}
          <div className="animate-fade-in" key={activeTab}>
            {activeTab === 'electoral' && canViewReports && <ElectoralMetrics />}
            {activeTab === 'budget' && canViewReports && <BudgetVisualizer />}
            {activeTab === 'proposals' && <Proposals />}
            {activeTab === 'news' && <NewsFeed />}
            {activeTab === 'agenda' && <Agenda />}
            {activeTab === 'map' && <InteractiveMap />}
            {activeTab === 'admin' && isAdmin && <AdminPanel />}
          </div>
          
        </div>
      </main>

      {/* 4. Pie de Página */}
      <footer style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '2rem 0',
        marginTop: 'auto',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', margin: '0 auto', maxWidth: '1400px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <BrandLogos variant="header" />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Plataforma de transparencia en gestión pública y desarrollo urbano.
            </p>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Innovación para la toma de decisiones ciudadanas.
            </p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.75rem' }}>
              &copy; 2026 Tunja 2.0. Diseñado para liderar.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
