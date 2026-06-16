import React, { useState, useEffect } from 'react';
import { 
  Building, Network, Users, ChevronRight, Activity, Cpu, Play, Target,
  MessageSquare, FileText, CheckCircle, Send, X, ArrowUpRight, Check, MapPin, Globe, BarChart, LogOut, Settings, User as UserIcon, LayoutDashboard, Zap,
  Calendar, Map, BarChart3, TrendingUp, Sparkles, Navigation, Layers, Facebook, Twitter
} from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';

import BrandLogos from './BrandLogos';
import AuthModal from './AuthModal';
import NetworkBackground from './NetworkBackground';

export default function LandingPage({ onEnterApp }) {
  const urlNicoPhoto = "https://raw.githubusercontent.com/fabiancho0724/Prueba-123/e7fcca3daefa398a6c43271a5c7b379f7ab7ddbf/682871269_3927799717353938_6204895979427810843_n.jpg";

  const [activeModal, setActiveModal] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [rsvpList, setRsvpList] = useState({});
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState({ comuna: 'Distrito Central', sector: 'Tecnología e Innovación', texto: '' });
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [simulatedParticipants, setSimulatedParticipants] = useState(3452);
  const [isProfileFlipped, setIsProfileFlipped] = useState(false);
  const [activeTimelinePhase, setActiveTimelinePhase] = useState(0);
  const [activePillarTab, setActivePillarTab] = useState('data');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setShowAuthModal(false);
        const emailLower = (currentUser.email || '').toLowerCase().trim();
        try {
          const { doc, getDoc } = await import('firebase/firestore');
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
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };


  const localAgenda = [
    { id: 'com1', title: 'Foro de Movilidad y Diseño Vial', place: 'Hub de Innovación Norte', date: 'Jueves, Mayo 28', time: '5:00 PM', attendees: 215 },
    { id: 'com4', title: 'Despliegue de Startups Locales', place: 'Centro Tecnológico de Tunja', date: 'Viernes, Mayo 29', time: '10:00 AM', attendees: 340 },
    { id: 'com5', title: 'Plan Maestro de Conectividad', place: 'Cámara de Comercio', date: 'Sábado, Mayo 30', time: '4:00 PM', attendees: 420 },
  ];

  const handleRSVP = (id) => {
    if (rsvpList[id]) return;
    setRsvpList(prev => ({ ...prev, [id]: true }));
    setSimulatedParticipants(prev => prev + 1);
  };

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    if (!newProposal.texto.trim()) return;
    setProposals(prev => [newProposal, ...prev]);
    setProposalSubmitted(true);
    setSimulatedParticipants(prev => prev + 1);
    setTimeout(() => {
      setNewProposal({ comuna: 'Distrito Central', sector: 'Tecnología e Innovación', texto: '' });
      setProposalSubmitted(false);
    }, 3000);
  };

  const handleEnterClick = () => {
    if (user) {
      onEnterApp();
    } else {
      openAuth('login');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#f8fafc',
      color: '#0f172a',
      fontFamily: 'var(--font-body)',
      overflowX: 'hidden'
    }} className="animate-fade-in">
      
      {/* HEADER ELEGANTE Y CLARO (Como la app) */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
        position: 'fixed',
        top: 0,
        zIndex: 100,
        width: '100%',
        transition: 'var(--transition-smooth)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
            <BrandLogos variant="header" />
          </div>

          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {user ? (
              <div style={{ position: 'relative' }}>
                <div 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: 'rgba(0,0,0,0.03)', padding: '0.4rem 0.75rem', borderRadius: '100px', border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#171717', lineHeight: '1.2' }}>
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {userProfile?.role || 'Usuario Registrado'}
                    </span>
                  </div>
                </div>

                {showUserMenu && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, width: '220px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid #E4E4E7', padding: '0.5rem', zIndex: 100, animation: 'fadeIn 0.2s ease' }}>
                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', color: '#171717', fontSize: '0.9rem', textAlign: 'left' }} onMouseOver={e=>e.currentTarget.style.background='#F4F4F5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                      <UserIcon size={16} /> Mi Perfil
                    </button>
                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', color: '#171717', fontSize: '0.9rem', textAlign: 'left' }} onMouseOver={e=>e.currentTarget.style.background='#F4F4F5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                      <Settings size={16} /> Configuración
                    </button>
                    <div style={{ height: '1px', background: '#E4E4E7', margin: '0.25rem 0' }}></div>
                    <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', color: '#DC2626', fontSize: '0.9rem', textAlign: 'left' }} onMouseOver={e=>e.currentTarget.style.background='#FEF2F2'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                      <LogOut size={16} /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={() => openAuth('login')}
                  className="nav-clean-btn-light"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => openAuth('register')}
                  style={{
                    background: 'var(--primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 14px rgba(15, 76, 129, 0.3)'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  Crear Cuenta
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* HERO SECTION DE ALTO IMPACTO (Linear style light) */}
      <main style={{ position: 'relative', marginTop: '70px', padding: '6rem 0 4rem 0', overflow: 'hidden', minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Fondo Interactivo de Red de Partículas */}
        <NetworkBackground />
        
        {/* Abstract Glows Animados */}
        <div className="blob-1" style={{ position: 'absolute', top: '-5%', right: '-5%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(15, 76, 129, 0.12) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none', filter: 'blur(50px)' }}></div>
        <div className="blob-2" style={{ position: 'absolute', bottom: '15%', left: '-10%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(0, 184, 217, 0.1) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none', filter: 'blur(50px)' }}></div>
        <div className="blob-3" style={{ position: 'absolute', top: '35%', left: '35%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(109, 93, 252, 0.08) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none', filter: 'blur(50px)' }}></div>
        
        {/* Reticular Grid Pattern Animada */}
        <div className="grid-bg-anim" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(15,76,129,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,76,129,0.035) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 0, pointerEvents: 'none', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)' }}></div>


        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem', alignItems: 'center' }} className="hero-grid">
            
            {/* Texto Hero */}
            <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 76, 129, 0.1)', border: '1px solid rgba(15, 76, 129, 0.18)', padding: '6px 14px', borderRadius: '100px', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(15, 76, 129, 0.05)' }}>
                <span className="live-dot-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }}></span>
                <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '850', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sistema de Inteligencia Territorial</span>
              </div>
              
              {user ? (
                <>
                  <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.5rem)', lineHeight: '1.15', marginBottom: '1.5rem', color: '#0f172a', letterSpacing: '-0.02em', fontWeight: '900' }}>
                    Hola, <span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #00b8d9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline' }}>{user.displayName || user.email?.split('@')[0]}</span>, bienvenido a <span style={{ color: 'var(--primary)' }}>Tunja 2.0</span>, el espacio donde las ideas se convierten en acciones y la innovación impulsa el futuro de nuestra ciudad.
                  </h1>
                  <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '2.5rem', maxWidth: '650px', lineHeight: '1.65' }}>
                    Súmate a la transformación digital de nuestra ciudad. Explora los indicadores electorales históricos, conoce los encuentros de la agenda y participa activamente construyendo comunidad.
                  </p>
                </>
              ) : (
                <>
                  <h1 style={{ fontSize: 'clamp(3rem, 5.5vw, 4.2rem)', lineHeight: '1.1', marginBottom: '1.5rem', color: '#0f172a', letterSpacing: '-0.03em', fontWeight: '900' }}>
                    Ingresa y construyamos juntos la <span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #00b8d9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline' }}>Tunja del futuro.</span>
                  </h1>
                  <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '2.5rem', maxWidth: '620px', lineHeight: '1.65' }}>
                    Datos, participación e innovación corporativa. Conoce, analiza y participa activamente en las decisiones que impulsan la transformación técnica de nuestra ciudad.
                  </p>
                </>
              )}
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {!user ? (
                  <button 
                    onClick={() => openAuth('login')} 
                    className="premium-cta-btn"
                  >
                    🚀 Ingresa y construyamos juntos la Tunja del futuro <ArrowUpRight size={22} className="hidden-mobile" />
                  </button>
                ) : (
                  <button 
                    onClick={onEnterApp} 
                    className="premium-cta-btn"
                  >
                    🚀 Ingresa y construyamos juntos la Tunja del futuro <ChevronRight size={22} className="hidden-mobile" />
                  </button>
                )}
              </div>
            </div>

            {/* Modular Blocks Layout Rediseñado con Imágenes y Profundidad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }} className="hero-blocks-grid">
              
              {/* Block 1 (Historia Electoral) */}
              <div 
                style={{ 
                  background: '#fff', 
                  borderRadius: '20px', 
                  padding: '1.50rem', 
                  border: '1px solid rgba(15, 76, 129, 0.12)', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.035), 0 2px 8px rgba(15, 76, 129, 0.02)', 
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  overflow: 'hidden', 
                  position: 'relative' 
                }} 
                className="premium-interactive-hover-card"
                onClick={handleEnterClick}
              >
                <div style={{ position: 'absolute', inset: 0, opacity: 0.18, backgroundImage: 'url(https://raw.githubusercontent.com/fabiancho0724/Prueba-123/046b55c06b084e0f640e6297111911cc7ff75c5a/lugares-turisticos-de-Tunja.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.4))' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                   <div style={{ background: 'rgba(15,76,129,0.1)', color: 'var(--primary)', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', boxShadow: '0 4px 10px rgba(15,76,129,0.12)' }} className="glowing-icon-container"><Map size={22} /></div>
                   <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: '#0f172a' }}>Historia Electoral</h3>
                   <p style={{ color: '#52525B', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>Análisis cartográfico y estadístico del comportamiento electoral de Tunja.</p>
                </div>
              </div>

              {/* Block 2 (La Agenda de Nico) */}
              <div 
                style={{ 
                  background: '#fff', 
                  borderRadius: '20px', 
                  padding: '1.50rem', 
                  border: '1px solid rgba(16, 185, 129, 0.12)', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.035), 0 2px 8px rgba(16, 185, 129, 0.02)', 
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  position: 'relative', 
                  overflow: 'hidden' 
                }} 
                className="premium-interactive-hover-card"
                onClick={handleEnterClick}
              >
                <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05 }}><Calendar size={120} /></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                   <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', boxShadow: '0 4px 10px rgba(16,185,129,0.12)' }} className="glowing-icon-container"><Calendar size={22} /></div>
                   <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: '#0f172a' }}>La Agenda de Nico</h3>
                   <p style={{ color: '#52525B', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>Cronograma oficial de foros técnicos y encuentros sectoriales.</p>
                </div>
              </div>

              {/* Block 3 (Participación Ciudadana Card Grande) */}
              <div 
                style={{ 
                  position: 'relative', 
                  borderRadius: '20px', 
                  padding: '2rem', 
                  border: '1px solid rgba(15, 76, 129, 0.15)', 
                  boxShadow: '0 15px 35px rgba(15,76,129,0.18)', 
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
                  cursor: 'pointer', 
                  gridColumn: 'span 2', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  color: '#fff', 
                  overflow: 'hidden' 
                }} 
                className="premium-interactive-hover-card-large"
                onClick={handleEnterClick}
              >
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://raw.githubusercontent.com/fabiancho0724/Prueba-123/046b55c06b084e0f640e6297111911cc7ff75c5a/catedral-basilica-tunja.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.55)' }} className="zoom-bg"></div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,76,129,0.85) 0%, rgba(109, 93, 252, 0.6) 100%)' }}></div>
                <div style={{ position: 'relative', zIndex: 1, padding: '0.5rem', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.15)', width: '100%' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800', marginBottom: '0.75rem', letterSpacing: '0.05em' }}><Target size={12} /> ENFOQUE ESTRATÉGICO</div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '900', margin: '0 0 0.5rem 0', color: '#fff' }}>Participación Ciudadana</h3>
                  <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.9rem', lineHeight: '1.5', margin: 0, maxWidth: '480px' }}>Plataforma donde las ideas de los tunjanos se convierten en código y políticas de acción real.</p>
                </div>
              </div>

              {/* Block 4 (Las 5 de Nico & Joven 2.0) */}
              <div 
                style={{ 
                  background: '#fff', 
                  borderRadius: '20px', 
                  padding: '1.50rem', 
                  border: '1px solid rgba(245,158,11,0.12)', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.035), 0 2px 8px rgba(245, 158, 11, 0.02)', 
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }} 
                className="premium-interactive-hover-card"
                onClick={handleEnterClick}
              >
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url(https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                   <div style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', boxShadow: '0 4px 10px rgba(245,158,11,0.12)' }} className="glowing-icon-container"><Sparkles size={22} /></div>
                   <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: '#0f172a' }}>Las 5 de Nico & Joven 2.0</h3>
                   <p style={{ color: '#52525B', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>Pilares estratégicos y comunidad de transformación juvenil.</p>
                </div>
              </div>

               {/* Block 5 (Analítica & Presupuesto) */}
               <div 
                style={{ 
                  background: '#fff', 
                  borderRadius: '20px', 
                  padding: '1.50rem', 
                  border: '1px solid rgba(99,102,241,0.12)', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.035), 0 2px 8px rgba(99, 102, 241, 0.02)', 
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }} 
                className="premium-interactive-hover-card"
                onClick={handleEnterClick}
              >
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                   <div style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', boxShadow: '0 4px 10px rgba(99,102,241,0.12)' }} className="glowing-icon-container"><BarChart3 size={22} /></div>
                   <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: '#0f172a' }}>Analítica & Presupuesto</h3>
                   <p style={{ color: '#52525B', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>Visualización clara de indicadores estratégicos y proyectos.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- SECCIÓN 1: ESTADÍSTICAS EN TIEMPO REAL (Interactive Counter Dashboard Banner) --- */}
        <section style={{ padding: '4rem 0', position: 'relative', zIndex: 2, background: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '850', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Monitoreo Territorial Co-Operativo</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '850', marginTop: '0.5rem', color: '#0F172A' }}>Métricas en Tiempo Real de Tunja 2.0</h2>
              <p style={{ color: '#52525B', fontSize: '1rem', marginTop: '0.25rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>Visualiza los datos actuales que impulsan la toma de decisiones ciudadanas.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="stats-interactive-grid">
              
              {/* Stat Card 1 */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(15, 76, 129, 0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', textAlign: 'center', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }} className="tech-stat-card">
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} className="live-pulse"></div>
                <span style={{ display: 'flex', background: 'rgba(15, 76, 129, 0.06)', color: 'var(--primary)', padding: '0.5rem', borderRadius: '12px', marginBottom: '0.75rem' }}><Users size={20} /></span>
                <span style={{ fontSize: '2rem', fontWeight: '900', color: '#0F172A', display: 'block', fontFamily: 'var(--font-heading)' }}>{simulatedParticipants}</span>
                <span style={{ fontSize: '0.85rem', color: '#52525B', fontWeight: '600', marginTop: '0.25rem' }}>Tunjanos Activos</span>
                <span style={{ fontSize: '0.7rem', color: '#91919C', marginTop: '0.2rem' }}>Participantes en la asamblea</span>
              </div>

              {/* Stat Card 2 */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(0, 184, 217, 0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', textAlign: 'center', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }} className="tech-stat-card">
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} className="live-pulse"></div>
                <span style={{ display: 'flex', background: 'rgba(0, 184, 217, 0.06)', color: 'var(--secondary)', padding: '0.5rem', borderRadius: '12px', marginBottom: '0.75rem' }}><FileText size={20} /></span>
                <span style={{ fontSize: '2rem', fontWeight: '900', color: '#0F172A', display: 'block', fontFamily: 'var(--font-heading)' }}>{proposals.length + 142}</span>
                <span style={{ fontSize: '0.85rem', color: '#52525B', fontWeight: '600', marginTop: '0.25rem' }}>Propuestas de Ciudad</span>
                <span style={{ fontSize: '0.7rem', color: '#91919C', marginTop: '0.2rem' }}>Ideas de desarrollo territorial</span>
              </div>

              {/* Stat Card 3 */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(109, 93, 252, 0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', textAlign: 'center', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }} className="tech-stat-card">
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} className="live-pulse"></div>
                <span style={{ display: 'flex', background: 'rgba(109, 93, 252, 0.06)', color: 'var(--accent)', padding: '0.5rem', borderRadius: '12px', marginBottom: '0.75rem' }}><Calendar size={20} /></span>
                <span style={{ fontSize: '2rem', fontWeight: '900', color: '#0F172A', display: 'block', fontFamily: 'var(--font-heading)' }}>{localAgenda.length + 12}</span>
                <span style={{ fontSize: '0.85rem', color: '#52525B', fontWeight: '600', marginTop: '0.25rem' }}>Foros & Nodos Activos</span>
                <span style={{ fontSize: '0.7rem', color: '#91919C', marginTop: '0.2rem' }}>Reuniones de co-diseño programadas</span>
              </div>

              {/* Stat Card 4 */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', textAlign: 'center', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }} className="tech-stat-card">
                <span style={{ display: 'flex', background: 'rgba(245, 158, 11, 0.06)', color: '#f59e0b', padding: '0.5rem', borderRadius: '12px', marginBottom: '0.75rem' }}><Globe size={20} /></span>
                <span style={{ fontSize: '2rem', fontWeight: '900', color: '#0F172A', display: 'block', fontFamily: 'var(--font-heading)' }}>15 <span style={{ fontSize: '1rem', color: '#52525B', fontWeight: '700' }}>Comunas</span></span>
                <span style={{ fontSize: '0.85rem', color: '#52525B', fontWeight: '600', marginTop: '0.25rem' }}>Zonas Geocodificadas</span>
                <span style={{ fontSize: '0.7rem', color: '#91919C', marginTop: '0.2rem' }}>Cobertura urbana y rural</span>
              </div>

            </div>
          </div>
        </section>

        {/* --- SECCIÓN 2: PILARES DE LA GOBERNANZA DIGITAL (Sleek category explorer with real photos) --- */}
        <section style={{ padding: '6rem 0', position: 'relative', zIndex: 11 }}>
          <div className="container" style={{ maxWidth: '1300px', margin: '0 auto' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: '4rem', alignItems: 'center' }} className="pillars-grid">
              
              {/* Interactive Left selectors */}
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: '850', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Pilares Fundacionales</span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', marginTop: '0.5rem', lineHeight: '1.2' }}>¿Qué define a Tunja 2.0?</h2>
                <p style={{ color: '#52525B', fontSize: '1rem', marginTop: '1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                  Una plataforma moderna, integral y técnica que conecta la analítica territorial con la inteligencia colectiva para reorganizar el futuro de nuestra comunidad.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button 
                    onClick={() => setActivePillarTab('data')}
                    style={{
                      background: activePillarTab === 'data' ? 'rgba(15, 76, 129, 0.08)' : 'transparent',
                      border: '1px solid',
                      borderColor: activePillarTab === 'data' ? 'rgba(15, 76, 129, 0.2)' : 'rgba(0,0,0,0.04)',
                      borderRadius: '14px',
                      padding: '1.25rem 1.5rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.3s'
                    }}
                    className={activePillarTab === 'data' ? 'pulsing-border-tech' : ''}
                  >
                    <span style={{ background: 'var(--primary)', color: '#fff', borderRadius: '8px', padding: '6px', display: 'flex' }}><Layers size={18} /></span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0F172A', fontWeight: '800' }}>Inteligencia y Datos</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>Cartografía y visualización electoral.</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActivePillarTab('participation')}
                    style={{
                      background: activePillarTab === 'participation' ? 'rgba(0, 184, 217, 0.06)' : 'transparent',
                      border: '1px solid',
                      borderColor: activePillarTab === 'participation' ? 'rgba(0, 184, 217, 0.2)' : 'rgba(0,0,0,0.04)',
                      borderRadius: '14px',
                      padding: '1.25rem 1.5rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.3s'
                    }}
                    className={activePillarTab === 'participation' ? 'pulsing-border-tech-cyan' : ''}
                  >
                    <span style={{ background: 'var(--secondary)', color: '#fff', borderRadius: '8px', padding: '6px', display: 'flex' }}><Users size={18} /></span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0F172A', fontWeight: '800' }}>Co-diseño Ciudadano</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>Mapeo vecinal de propuestas directas.</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActivePillarTab('youth')}
                    style={{
                      background: activePillarTab === 'youth' ? 'rgba(109, 93, 252, 0.06)' : 'transparent',
                      border: '1px solid',
                      borderColor: activePillarTab === 'youth' ? 'rgba(109, 93, 252, 0.2)' : 'rgba(0,0,0,0.04)',
                      borderRadius: '14px',
                      padding: '1.25rem 1.5rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.3s'
                    }}
                    className={activePillarTab === 'youth' ? 'pulsing-border-tech-purple' : ''}
                  >
                    <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: '8px', padding: '6px', display: 'flex' }}><Sparkles size={18} /></span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0F172A', fontWeight: '800' }}>Poder Joven 2.0</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>Semilleros y aceleración local.</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Dynamic Content Display Card */}
              <div 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '24px', 
                  padding: '2.5rem', 
                  boxShadow: '0 20px 50px rgba(0,0,0,0.04), 0 4px 15px rgba(0,0,0,0.01)', 
                  border: '1px solid rgba(0,0,0,0.05)', 
                  position: 'relative', 
                  overflow: 'hidden', 
                  minHeight: '440px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                className="category-showcase-panel"
              >
                {/* Visual Backdrop Decorative Frame */}
                <div style={{ position: 'absolute', right: '0', top: '0', width: '220px', height: '220px', borderRadius: '50%', background: activePillarTab === 'data' ? 'rgba(15,76,129,0.03)' : activePillarTab === 'participation' ? 'rgba(0,184,217,0.03)' : 'rgba(109, 93, 252, 0.03)', zIndex: 0, filter: 'blur(30px)', pointerEvents: 'none' }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ background: activePillarTab === 'data' ? 'rgba(15,76,129,0.1)' : activePillarTab === 'participation' ? 'rgba(0,184,217,0.1)' : 'rgba(109,93,252,0.1)', color: activePillarTab === 'data' ? 'var(--primary)' : activePillarTab === 'participation' ? 'var(--secondary)' : 'var(--accent)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '850', letterSpacing: '0.05em' }}>
                      {activePillarTab === 'data' ? 'INTELIGENCIA TERRITORIAL' : activePillarTab === 'participation' ? 'CO-DISEÑO ACTIVO' : 'IMPULSO DE EMPRENDIMIENTO'}
                    </span>
                    <span style={{ color: '#A1A1AA', fontSize: '0.85rem' }}>VISTA DE PILAR v2.0</span>
                  </div>

                  <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', marginBottom: '1rem' }}>
                    {activePillarTab === 'data' && "Inteligencia Territorial y Datos Abiertos"}
                    {activePillarTab === 'participation' && "Co-creación Abierta Ciudad-Gobernante"}
                    {activePillarTab === 'youth' && "Poder Joven 2.0 y Emprendimiento Digital"}
                  </h3>

                  <p style={{ color: '#52525B', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                    {activePillarTab === 'data' && "El futuro se planifica con bases sólidas. En Tunja 2.0 abrimos datos electorales históricos, indicadores demográficos y mapas de participación vecinal. Analiza el comportamiento electoral urbano y rural de la 2da vuelta presidencial de 2022 y descubre focos de crecimiento para fortalecer iniciativas conjuntas."}
                    {activePillarTab === 'participation' && "La ciudadanía ya no es un espectador. Hemos creado un canal bidireccional donde ingenieros, urbanistas y vecinos pueden reportar y registrar requerimientos técnicos que nutren de inmediato los planes de inversión pública. Tus ideas configuran el presupuesto local."}
                    {activePillarTab === 'youth' && "La juventud es el código fuente del cambio en Boyacá. Enlazamos los liderazgos locales con el Hub de startups, los esquemas de aceleración técnica, y las 4 propuestas capitales promovidas por liderazgos jóvenes como Nico. Impulsamos empleo técnico calificado."}
                  </p>

                  <ul style={{ listStyleType: 'none', padding: 0, margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {activePillarTab === 'data' && (
                      <>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--primary)' }} /> Visualizaciones interactivas de las elecciones colombianas en Tunja.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--primary)' }} /> Mapeo georreferenciado de necesidades vecinales específicas.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--primary)' }} /> Acceso directo a bases estadísticas estructuradas de participación.</li>
                      </>
                    )}
                    {activePillarTab === 'participation' && (
                      <>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--secondary)' }} /> Formulación y priorización directa de propuestas en vivo.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--secondary)' }} /> Participación directa en foros y comités de movilidad y diseño vial.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--secondary)' }} /> Veeduría electrónica sobre la ejecución presupuestaria.</li>
                      </>
                    )}
                    {activePillarTab === 'youth' && (
                      <>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--accent)' }} /> Semilleros locales de desarrollo de software e innovación urbana.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--accent)' }} /> Debates continuos del comité juvenil y foros presenciales activos.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--accent)' }} /> Acceso preferencial a capacitaciones de robótica e inteligencia comercial.</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Highly aesthetic photo banner on bottom of tab */}
                <div style={{ marginTop: '1.5rem', width: '100%', height: '140px', borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={
                      activePillarTab === 'data' 
                        ? 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop'
                        : activePillarTab === 'participation' 
                          ? 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=800&auto=format&fit=crop'
                          : 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'
                    } 
                    alt="Tunja 2.0 Feature" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.02)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)' }}></div>
                  <span style={{ position: 'absolute', bottom: '12px', left: '16px', color: '#fff', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.04em' }}>
                    {activePillarTab === 'data' && "NÚCLEO DIGITAL DE DATOS E INDICADORES"}
                    {activePillarTab === 'participation' && "SALA DE CO-DISEÑO PARA INTELIGENCIA CIUDADANA"}
                    {activePillarTab === 'youth' && "HUB DE IMPULSO Y EMPLEABILIDAD JUVENIL"}
                  </span>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* --- SECCIÓN 3: EL CAMINO DE LA CO-CREACIÓN - INTERACTIVE PROCESS TIMELINE --- */}
        <section style={{ padding: '6rem 0', position: 'relative', zIndex: 12, background: 'linear-gradient(180deg, transparent, rgba(15, 76, 129, 0.02) 50%, transparent)' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '850', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Storytelling & Ruta de Impacto</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', marginTop: '0.5rem' }}>El Camino de la Transformación Decisiva</h2>
              <p style={{ color: '#52525B', fontSize: '1rem', marginTop: '0.5rem', maxWidth: '650px', margin: '0.5rem auto 0 auto', lineHeight: '1.6' }}>
                Conoce las fases secuenciales para integrar tu opinión dentro del algoritmo de políticas de Tunja. Haz clic en las fases para interactuar.
              </p>
            </div>

            {/* Interactive Timeline Layout Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '4rem', alignItems: 'center' }} className="timeline-grid">
              
              {/* Left Timeline Path Selectors */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
                {/* Connecting glowing vector line (vertical mockup) */}
                <div style={{ position: 'absolute', left: '23px', top: '2.5rem', bottom: '2.5rem', width: '2px', background: 'linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))', zIndex: 0 }} className="hidden-mobile"></div>

                {[
                  { phase: 0, title: "Fase 1: Mapeo Georeferenciado", icon: <Layers size={16} />, color: 'var(--primary)', label: "Mes 1" },
                  { phase: 1, title: "Fase 2: Diálogos de Co-diseño", icon: <Users size={16} />, color: '#10b981', label: "Mes 2" },
                  { phase: 2, title: "Fase 3: Presupuesto y Priorización", icon: <BarChart3 size={16} />, color: '#f59e0b', label: "Mes 3" },
                  { phase: 3, title: "Fase 4: Despliegue de Código de Ciudad", icon: <Cpu size={16} />, color: '#6d5dfc', label: "Mes 4" }
                ].map((step) => (
                  <div 
                    key={step.phase}
                    onClick={() => setActiveTimelinePhase(step.phase)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      cursor: 'pointer',
                      padding: '1rem 1.25rem',
                      borderRadius: '16px',
                      background: activeTimelinePhase === step.phase ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                      border: '1px solid',
                      borderColor: activeTimelinePhase === step.phase ? 'rgba(0,0,0,0.06)' : 'transparent',
                      boxShadow: activeTimelinePhase === step.phase ? '0 10px 25px rgba(0,0,0,0.04)' : 'none',
                      transition: 'all 0.3s',
                      position: 'relative',
                      zIndex: 1
                    }}
                    className="timeline-item"
                  >
                    {/* Bullet selector inside timeline */}
                    <div 
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: activeTimelinePhase === step.phase ? step.color : '#FFFFFF',
                        color: activeTimelinePhase === step.phase ? '#fff' : '#A1A1AA',
                        border: `2px solid ${step.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s',
                        boxShadow: activeTimelinePhase === step.phase ? `0 0 15px ${step.color}60` : 'none'
                      }}
                      className="glowing-circle"
                    >
                      {step.icon}
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: step.color, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{step.label}</span>
                      <h4 style={{ margin: '0.1rem 0 0 0', color: '#0F172A', fontWeight: '850', fontSize: '1.1rem' }}>{step.title}</h4>
                    </div>

                    {activeTimelinePhase === step.phase && (
                      <span style={{ marginLeft: 'auto', background: `${step.color}15`, color: step.color, padding: '2px 8px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '700' }}>ACTIVO</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Panel Viewer displaying active phase */}
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '24px', 
                  padding: '2.5rem', 
                  border: '1px solid rgba(0,0,0,0.05)', 
                  boxShadow: '0 25px 60px rgba(15, 76, 129, 0.05)', 
                  position: 'relative', 
                  minHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' 
                }}
                className="category-showcase-panel"
                key={activeTimelinePhase} /* Force animate on stage changes */
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '0.05em' }}>COORDENADAS DE PROCESO</span>
                    <span style={{ background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', color: '#475569', fontWeight: '700' }} className="hidden-mobile">
                      {activeTimelinePhase === 0 && "MES 1: INVESTIGACIÓN"}
                      {activeTimelinePhase === 1 && "MES 2: DIÁLOGOS"}
                      {activeTimelinePhase === 2 && "MES 3: ESTADÍSTICA"}
                      {activeTimelinePhase === 3 && "MES 4: DESPLIEGUE"}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(15, 76, 129, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {activeTimelinePhase === 0 && <Layers style={{ color: 'var(--primary)' }} size={24} />}
                      {activeTimelinePhase === 1 && <Users style={{ color: '#10b981' }} size={24} />}
                      {activeTimelinePhase === 2 && <BarChart3 style={{ color: '#f59e0b' }} size={24} />}
                      {activeTimelinePhase === 3 && <Cpu style={{ color: '#6d5dfc' }} size={24} />}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: '#0F172A' }}>
                        {activeTimelinePhase === 0 && "Fase 1: Recolección Geocodificada y Mapeo"}
                        {activeTimelinePhase === 1 && "Fase 2: Diálogos Públicos de Co-Diseño"}
                        {activeTimelinePhase === 2 && "Fase 3: Presupuesto Participativo Algorítmico"}
                        {activeTimelinePhase === 3 && "Fase 4: Despliegue de Código de Ciudad"}
                      </h3>
                      <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#64748B', fontWeight: '600' }}>
                        {activeTimelinePhase === 0 && "Diagnóstico Activo de Necesidades Territoriales"}
                        {activeTimelinePhase === 1 && "Mesas Abiertas con Enfoque de Solución Local"}
                        {activeTimelinePhase === 2 && "Asignación Directa por Veeduría de Votos"}
                        {activeTimelinePhase === 3 && "Ejecución de Código Abierto e Impacto Territorial"}
                      </p>
                    </div>
                  </div>

                  <p style={{ color: '#52525B', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '2rem' }}>
                    {activeTimelinePhase === 0 && "Recopilamos mapas de calor electorales, datos de participación y densidad comunal para diagnosticar las prioridades de desarrollo en cada franja de Tunja. Esto nos permite detectar el potencial estratégico real."}
                    {activeTimelinePhase === 1 && "Discutimos presencialmente y de forma digital a través de los nodos de debate las metas técnicas de movilidad, empleo juvenil, y conectividad pública en el territorio urbano y rural de Tunja."}
                    {activeTimelinePhase === 2 && "Sometemos a análisis las propuestas de los ciudadanos para actuar sobre lo priorizado, garantizando absoluta transparencia fiscal mediante paneles interactivos de analítica tributaria."}
                    {activeTimelinePhase === 3 && "Ejecutamos en conjunto con dependencias gubernamentales, Hubs universitarios y asambleas comunales los portales, optimizaciones inteligentes e ideas de base ciudadanas construidas colectivamente."}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569' }}>Nivel de Maduración Técnico</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary)' }}>
                      {activeTimelinePhase === 0 && "95% Completado"}
                      {activeTimelinePhase === 1 && "70% En Ejecución Activa"}
                      {activeTimelinePhase === 2 && "45% Fase de Diseño"}
                      {activeTimelinePhase === 3 && "20% Próxima Apertura"}
                    </span>
                  </div>

                  {/* Aesthetic visual progress bar */}
                  <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        background: activeTimelinePhase === 0 ? 'var(--primary)' : activeTimelinePhase === 1 ? '#10b981' : activeTimelinePhase === 2 ? '#f59e0b' : '#6d5dfc', 
                        width: activeTimelinePhase === 0 ? '95%' : activeTimelinePhase === 1 ? '70%' : activeTimelinePhase === 2 ? '45%' : '20%',
                        borderRadius: '100px',
                        transition: 'all 0.5s ease-out'
                      }}
                    ></div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
                    <span style={{ color: activeTimelinePhase === 0 ? 'var(--primary)' : activeTimelinePhase === 1 ? '#10b981' : activeTimelinePhase === 2 ? '#f59e0b' : '#6d5dfc', display: 'flex' }}><Check size={16} /></span>
                    <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '500' }}>
                      <strong>Impacto de Fase:</strong>{" "}
                      {activeTimelinePhase === 0 && "Mapeo territorial estratégico preciso en las 15 comunas de Tunja."}
                      {activeTimelinePhase === 1 && "Más de 3,450 ciudadanos interactuando activamente en la asamblea."}
                      {activeTimelinePhase === 2 && "Estructuración de fondos descentralizados y visibilidad presupuestal integral."}
                      {activeTimelinePhase === 3 && "Sincronización en tiempo real de soluciones urbanísticas e infraestructura lógica."}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER ULTRA MODERNO CLARO */}
      <footer style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', padding: '6rem 2rem 2rem 2rem', borderTop: '1px solid var(--border-color)', position: 'relative', zIndex: 10 }}>
         <div className="container" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* BRANDING INTEGRADO */}
            <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
               <BrandLogos variant="footer" />
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem' }}>
               <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='var(--primary)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-muted)'}><Facebook size={20} /></a>
               <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='var(--primary)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-muted)'}><Twitter size={20} /></a>
            </div>

            <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
               <span>&copy; 2026 TUNJA 2.0. Plataforma de Gobernanza Inteligente.</span>
               <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacidad</a>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Términos</a>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Transparencia</a>
               </div>
            </div>
         </div>
      </footer>

      {/* MODALES DINÁMICOS - Estilo UI App pura */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem',
          animation: 'fadeIn 0.2s ease'
        }}
        onClick={() => setActiveModal(null)}
        >
          <div style={{
            background: '#FFFFFF',
            color: '#171717',
            border: '1px solid rgba(0,0,0,0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '85vh',
            overflowY: 'auto',
            position: 'relative',
            padding: '2.5rem',
            animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#F4F4F5', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525B', cursor: 'pointer', transition: 'background 0.2s'
              }}
              onMouseOver={e=>e.currentTarget.style.background='#E4E4E7'}
              onMouseOut={e=>e.currentTarget.style.background='#F4F4F5'}
            >
              <X size={16} />
            </button>

            {/* CONTENIDO: ACUERDO / ECOSISTEMA */}
            {activeModal === 'acuerdo' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(15, 76, 129, 0.1)', color: 'var(--primary)', padding: '0.5rem', borderRadius: '8px' }}>
                     <Target size={24} />
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Arquitectura Estratégica</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#52525B', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  <p style={{ color: '#171717', fontWeight: '600', fontSize: '1.05rem' }}>Despliegue Técnico Municipal</p>
                  <p>Implementamos soluciones tecnológicas sobre políticas de estado. Transformamos el esquema análogo en un núcleo hiperconectado, facilitando el análisis en tiempo real y la predicción de crisis locales.</p>
                  
                  <div style={{ background: '#F4F4F5', border: '1px solid #E4E4E7', padding: '1.25rem', borderRadius: '12px', marginTop: '0.5rem' }}>
                    <h4 style={{ color: '#171717', marginBottom: '0.75rem', fontSize: '1rem' }}>Módulos Principales:</h4>
                    <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <li><strong>Veeduría Fiscal API:</strong> Acceso público a la ejecución del presupuesto mediante tableros dinámicos.</li>
                      <li><strong>Movilidad Basada en Datos:</strong> Rediseño de flujos vehiculares utilizando modelos algorítmicos.</li>
                      <li><strong>Zonas de Innovación Abierta:</strong> Estructuración de hubs para integración con la economía digital.</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveModal('consulta')} className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', background: '#171717', color: '#fff', padding: '0.8rem', borderRadius: '8px' }}>
                    Aportar Requerimiento Técnico
                  </button>
                </div>
              </div>
            )}

            {/* CONTENIDO: INVITACION / LIDERAZGO */}
            {activeModal === 'invitacion' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(109, 93, 252, 0.1)', color: 'var(--accent)', padding: '0.5rem', borderRadius: '8px' }}>
                     <Users size={24} />
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Cúpula Ejecutiva</h2>
                </div>
                
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', background: '#F4F4F5', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #E4E4E7' }}>
                  <img src={urlNicoPhoto} alt="Nicolás Cortés" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#171717' }}>Nicolás Cortés</h4>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#52525B' }}>Coordinador General, TUNJA 2.0</p>
                  </div>
                </div>
                
                <div style={{ borderLeft: '3px solid #171717', paddingLeft: '1rem', color: '#171717', fontStyle: 'italic', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  "La modernidad no se decreta, se programa. Necesitamos infraestructura lógica, recolección de datos y ejecución precisa para elevar la calidad de vida urbana."
                </div>
                
                <p style={{ color: '#52525B', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Convoco a ingenieros, estrategas empresariales y urbanistas a unirse a la plataforma técnica que replanteará el futuro del municipio.
                </p>
                <button onClick={handleEnterClick} className="btn" style={{ width: '100%', marginTop: '2rem', background: 'var(--primary)', color: '#fff', padding: '0.8rem', borderRadius: '8px' }}>
                  Inicializar Sesión
                </button>
              </div>
            )}

            {/* CONTENIDO: CONSULTA / LABORATORIO */}
            {activeModal === 'consulta' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(0, 184, 217, 0.1)', color: 'var(--secondary)', padding: '0.5rem', borderRadius: '8px' }}>
                     <Cpu size={24} />
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Ingreso de Requerimiento</h2>
                </div>
                
                <p style={{ fontSize: '0.95rem', color: '#52525B', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  Los datos ingresados nutren el algoritmo de priorización para el despliegue de políticas públicas v2.0.
                </p>
                
                {proposalSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', margin: '0 auto 1rem auto' }}>
                      <Check size={24} />
                    </div>
                    <h3 style={{ color: '#166534', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>Data Registrada Exitosamente</h3>
                    <p style={{ fontSize: '0.85rem', color: '#166534', opacity: 0.8 }}>Tu paquete de requerimientos fue catalogado en la base central.</p>
                  </div>
                ) : (
                  <form onSubmit={handleProposalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#171717' }}>Módulo Territorial</label>
                      <select style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #E4E4E7', background: '#fff', color: '#171717', fontSize: '0.95rem' }} value={newProposal.comuna} onChange={e => setNewProposal({...newProposal, comuna: e.target.value})}>
                        <option>Distrito Central</option><option>Hub Norte</option><option>Anillo Oriental</option><option>Corredor Sur</option><option>Expansión Rural</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#171717' }}>Categoría Principal</label>
                      <select style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #E4E4E7', background: '#fff', color: '#171717', fontSize: '0.95rem' }} value={newProposal.sector} onChange={e => setNewProposal({...newProposal, sector: e.target.value})}>
                        <option>Infraestructura Lógica</option><option>Salubridad Pública</option><option>Logística Urbana</option><option>Optimización Fiscal</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#171717' }}>Descripción del Parámetro</label>
                      <textarea rows={4} style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #E4E4E7', background: '#fff', color: '#171717', fontSize: '0.95rem', resize: 'none' }} placeholder="Detalla el escenario técnico..." value={newProposal.texto} onChange={e => setNewProposal({...newProposal, texto: e.target.value})} required></textarea>
                    </div>
                    <button type="submit" style={{ marginTop: '0.5rem', background: '#171717', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                      Sincronizar Requerimiento
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* CONTENIDO: AGENDA / NODOS */}
            {activeModal === 'agenda' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--accent-green)', padding: '0.5rem', borderRadius: '8px' }}>
                     <Network size={24} />
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Nodos Activos</h2>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#52525B', marginBottom: '1.5rem' }}>Puntos de reunión presencial agendados. Confirma asistencia para gestión de aforo.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {localAgenda.map(event => (
                    <div key={event.id} style={{
                      background: rsvpList[event.id] ? '#F4F4F5' : '#FFFFFF',
                      border: '1px solid', borderColor: rsvpList[event.id] ? '#E4E4E7' : '#E4E4E7',
                      padding: '1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0', color: '#171717', fontSize: '1rem' }}>{event.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#71717A' }}>{event.place} • {event.date} ({event.time})</p>
                      </div>
                      <div>
                         {rsvpList[event.id] ? (
                           <span style={{ fontSize: '0.8rem', color: '#166534', background: '#DCFCE7', padding: '0.2rem 0.6rem', borderRadius: '100px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Check size={14}/> Agendado</span>
                         ) : (
                           <button onClick={() => handleRSVP(event.id)} style={{ background: '#171717', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '500', cursor: 'pointer' }}>Reservar Cupo</button>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AUTH MODAL ADDITION */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      <style>{`
        .premium-cta-btn {
          background: linear-gradient(135deg, var(--primary) 0%, #0284c7 50%, #0d9488 100%);
          color: #ffffff !important;
          border: none;
          border-radius: 12px;
          padding: 1.25rem 2.5rem;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 850;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          box-shadow: 0 12px 30px rgba(15,76,129,0.35), 0 4px 15px rgba(13,148,136,0.2);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
          line-height: 1.4;
          text-decoration: none;
          max-width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .premium-cta-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 18px 38px rgba(15,76,129,0.45), 0 8px 25px rgba(13,148,136,0.3);
          background: linear-gradient(135deg, #1e40af 0%, #0369a1 50%, #0f766e 100%);
        }
        .premium-cta-btn:active {
          transform: translateY(-1px) scale(0.98);
        }
        @media (max-width: 600px) {
          .premium-cta-btn {
            font-size: 0.95rem !important;
            padding: 1rem 1.25rem !important;
            gap: 0.5rem !important;
          }
        }

        .nav-clean-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .nav-clean-btn:hover { color: #fff; }

        .nav-clean-btn-light {
          background: transparent;
          border: none;
          color: rgba(0,0,0,0.6);
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .nav-clean-btn-light:hover { color: var(--primary); }

        .linear-card {
           background: rgba(255,255,255,0.02);
           border: 1px solid rgba(255,255,255,0.05);
           border-radius: 16px;
           padding: 2rem;
           display: flex;
           flex-direction: column;
           cursor: pointer;
           transition: all 0.3s ease;
           position: relative;
           overflow: hidden;
        }
        .linear-card::before {
           content: '';
           position: absolute; top: 0; left: 0; right: 0; height: 1px;
           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
           opacity: 0; transition: opacity 0.3s;
        }
        .linear-card:hover {
           background: rgba(255,255,255,0.04);
           border-color: rgba(255,255,255,0.1);
           transform: translateY(-4px);
        }
        .linear-card:hover::before { opacity: 1; }
        
        .card-icon-wrapper {
           width: 48px; height: 48px; border-radius: 12px;
           background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
           display: flex; align-items: center; justify-content: center;
           margin-bottom: 1.5rem;
        }

        .card-action {
           color: #fff; font-weight: 600; font-size: 0.85rem; display: flex; align-items: center; gap: 0.25rem;
           margin-top: auto; opacity: 0.7; transition: opacity 0.2s;
        }
        .linear-card:hover .card-action { opacity: 1; gap: 0.4rem; }

        /* Premium redesign animation classes */
        .premium-interactive-hover-card {
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .premium-interactive-hover-card:hover {
          transform: translateY(-6px) scale(1.02) !important;
          box-shadow: 0 15px 35px rgba(15, 76, 129, 0.08), 0 4px 15px rgba(0,0,0,0.03) !important;
          border-color: rgba(15, 76, 129, 0.3) !important;
        }
        .premium-interactive-hover-card-large {
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .premium-interactive-hover-card-large:hover {
          transform: translateY(-6px) scale(1.01) !important;
          box-shadow: 0 20px 45px rgba(15, 76, 129, 0.28) !important;
        }
        .premium-interactive-hover-card-large:hover .zoom-bg {
          transform: scale(1.08);
        }
        .zoom-bg {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glowing-icon-container {
          transition: all 0.3s ease;
        }
        .premium-interactive-hover-card:hover .glowing-icon-container {
          transform: scale(1.1) rotate(4deg);
        }

        /* Pulsing states */
        .live-dot-pulse {
          box-shadow: 0 0 0 0 rgba(15, 76, 129, 0.7);
          animation: radialPulse 1.8s infinite;
        }
        @keyframes radialPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(15,76,129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(15,76,129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(15,76,129, 0);
          }
        }

        .live-pulse {
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          animation: greenPulse 2s infinite;
        }
        @keyframes greenPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        .tech-stat-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tech-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border-color: rgba(15, 76, 129, 0.15);
        }

        .pulsing-border-tech {
          box-shadow: 0 0 15px rgba(15, 76, 129, 0.12) !important;
          border-color: var(--primary) !important;
        }
        .pulsing-border-tech-cyan {
          box-shadow: 0 0 15px rgba(0, 184, 217, 0.12) !important;
          border-color: var(--secondary) !important;
        }
        .pulsing-border-tech-purple {
          box-shadow: 0 0 15px rgba(109, 93, 252, 0.12) !important;
          border-color: var(--accent) !important;
        }

        .timeline-item {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .timeline-item:hover {
          transform: translateX(6px);
          background: #ffffff !important;
          box-shadow: 0 8px 20px rgba(0,0,0,0.035);
        }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hero-blocks-grid { grid-template-columns: 1fr !important; }
          .premium-interactive-hover-card-large { grid-column: span 1 !important; }
          .stats-interactive-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pillars-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .timeline-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hidden-mobile { display: none !important; }
        }
        @media (max-width: 480px) {
          .stats-interactive-grid { grid-template-columns: 1fr !important; }
        }

        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .blob-1 { animation: spinSlow 35s linear infinite; transform-origin: 40% 40%; }
        .blob-2 { animation: spinSlow 45s linear infinite reverse; transform-origin: 60% 60%; }
        .blob-3 { animation: pulseGlow 12s ease-in-out infinite; }
        
        .grid-bg-anim {
          animation: slideDown 25s linear infinite;
        }
        @keyframes slideDown {
          from { background-position: 0 0; }
          to { background-position: 60px 60px; }
        }
      `}</style>
    </div>
  );
}
