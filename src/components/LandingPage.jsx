import React, { useState, useEffect } from 'react';
import { 
  Building, Network, Users, ChevronRight, Activity, Cpu, Play, Target,
  MessageSquare, FileText, CheckCircle, Send, X, ArrowUpRight, Check, MapPin, Globe, BarChart, LogOut, Settings, User as UserIcon, LayoutDashboard, Zap,
  Calendar, Map, BarChart3, TrendingUp, Sparkles, Navigation, Layers, Facebook, Instagram
} from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';

import BrandLogos from './BrandLogos';
import AuthModal from './AuthModal';
import NetworkBackground from './NetworkBackground';

const img6 = 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%206.png';

export default function LandingPage({ onEnterApp, onLegalClick }) {
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
          const userDoc = await getDoc(doc(db, 'usuarios', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (emailLower === 'fabian.cely0724@gmail.com') {
              data.rol = 'SuperAdmin';
            }
            setUserProfile(data);
          } else {
            const defaultRole = emailLower === 'fabian.cely0724@gmail.com' ? 'SuperAdmin' : 'usuario';
            setUserProfile({ 
              rol: defaultRole, 
              email: currentUser.email,
              permisos: {
                historialElectoral: emailLower === 'fabian.cely0724@gmail.com',
                balance: emailLower === 'fabian.cely0724@gmail.com',
                simulador: emailLower === 'fabian.cely0724@gmail.com',
                panelAdmin: emailLower === 'fabian.cely0724@gmail.com'
              }
            });
          }
        } catch (e) {
          console.warn("Could not fetch user profile (using defaults):", e.message);
          const defaultRole = emailLower === 'fabian.cely0724@gmail.com' ? 'SuperAdmin' : 'usuario';
          setUserProfile({ 
            rol: defaultRole, 
            email: currentUser.email,
            permisos: {
              historialElectoral: emailLower === 'fabian.cely0724@gmail.com',
              balance: emailLower === 'fabian.cely0724@gmail.com',
              simulador: emailLower === 'fabian.cely0724@gmail.com',
              panelAdmin: emailLower === 'fabian.cely0724@gmail.com'
            }
          });
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

  const handleEnterClick = (tabId = 'proposals') => {
    onEnterApp(tabId);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      overflowX: 'hidden'
    }} className="animate-fade-in">
      
      {/* HEADER ELEGANTE Y CLARO (Como la app) */}
      <header style={{
        background: '#4A0072',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
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
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 0.75rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.2s' }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#FFFFFF', lineHeight: '1.2' }}>
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {userProfile?.rol || userProfile?.role || 'Usuario Registrado'}
                    </span>
                  </div>
                </div>

                {showUserMenu && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, width: '220px', background: 'var(--bg-card)', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', padding: '0.5rem', zIndex: 100, animation: 'fadeIn 0.2s ease' }}>
                    <button onClick={() => { setShowUserMenu(false); onEnterApp('profile'); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', color: 'var(--text-primary)', fontSize: '0.9rem', textAlign: 'left' }} onMouseOver={e=>e.currentTarget.style.background='#F4F4F5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                      <UserIcon size={16} /> Mi Perfil
                    </button>
                    <button onClick={() => { setShowUserMenu(false); onEnterApp('settings'); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', color: 'var(--text-primary)', fontSize: '0.9rem', textAlign: 'left' }} onMouseOver={e=>e.currentTarget.style.background='#F4F4F5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
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
                  style={{ 
                    padding: '0.5rem 1rem', 
                    background: 'transparent',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    borderRadius: '8px'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
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
                    boxShadow: '0 4px 14px rgba(74, 0, 114, 0.3)'
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

      <main style={{ position: 'relative', marginTop: '70px', display: 'flex', flexDirection: 'column' }}>

        {/* --- NUEVO HERO SECTION DE ALTO IMPACTO --- */}
        <section style={{ position: 'relative', minHeight: '95vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          
          {/* Fondo Avanzado con Glassmorphism y Parallax */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
             <NetworkBackground />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--bg-hero) 0%, var(--bg-hero-fade) 100%)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}></div>
             
             {/* Imagen del Candidato Integrada */}
             <div className="hero-image-wrapper" style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', inset: 0, background: `url(${urlNicoPhoto}) no-repeat center right / cover`, filter: 'brightness(1.1) contrast(1.05)', maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 30%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 30%, black 100%)', opacity: 0.9 }}></div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 0%, var(--hero-fade-solid) 90%)' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, var(--hero-fade-solid) 0%, transparent 100%)' }}></div>
             </div>
          </div>

          {/* Glows Decorativos Modernos */}
          <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(74, 0, 114, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0, animation: 'pulseGlow 8s infinite alternate' }}></div>
          <div style={{ position: 'absolute', bottom: '10%', right: '30%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0, animation: 'pulseGlow 6s infinite alternate-reverse' }}></div>

          <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4rem 1.5rem 2rem 1.5rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ maxWidth: '65%', position: 'relative' }} className="hero-content-wrapper">
              
              <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                 {/* Sello de campaña */}
                 <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bg-glass)', border: '1px solid rgba(74, 0, 114, 0.2)', padding: '8px 18px', borderRadius: '100px', marginBottom: '2rem', boxShadow: '0 8px 16px rgba(0,0,0,0.06)', backdropFilter: 'blur(10px)' }}>
                    <span className="live-dot-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                    <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '850', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Campaña Alcaldía Tunja 2026</span>
                 </div>
                 
                 <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: '1.05', marginBottom: '1.5rem', color: 'var(--text-primary)', letterSpacing: '-0.03em', fontWeight: '900', textShadow: '0 0 40px var(--bg-glass)' }}>
                    El futuro de Tunja se construye <span style={{ position: 'relative', display: 'inline-block' }}>
                       <span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', position: 'relative', zIndex: 1 }}>HOY.</span>
                       <svg style={{ position: 'absolute', bottom: '0px', left: 0, width: '100%', height: '14px', zIndex: 0, opacity: 0.3, color: 'var(--primary)' }} viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>
                    </span>
                 </h1>
                 
                 <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--text-primary)', marginBottom: '3rem', maxWidth: '90%', lineHeight: '1.6', fontWeight: '500', textShadow: '0 2px 4px rgba(255,255,255,0.5)' }}>
                    Juntos somos la fuerza que Tunja necesita para despertar. Únete al movimiento que transformará nuestra ciudad con innovación, transparencia y participación ciudadana real. ¡Es nuestro momento!
                 </p>
                 
                 {/* Call to Actions - Botones Imposibles de Ignorar */}
                 <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                   <button onClick={() => handleEnterClick('unete')} className="btn-hero-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--primary) 0%, #2D0046 100%)', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '100px', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: '0 10px 25px rgba(74, 0, 114, 0.3)' }}>
                      🔥 Únete al Movimiento <ArrowUpRight size={22} className="hidden-mobile" />
                   </button>
                   <button onClick={() => handleEnterClick('proposals')} className="btn-hero-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', fontWeight: '700', background: 'var(--bg-glass)', color: 'var(--primary)', border: '1px solid rgba(15,76,129,0.2)', padding: '1rem 2rem', borderRadius: '100px', cursor: 'pointer', transition: 'all 0.3s', backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                      <Target size={20} /> Conoce la Propuesta
                   </button>
                 </div>
              </div>

              {/* Micro Estadísticas Flotantes en Glassmorphism */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '4rem', animation: 'fadeInUp 1s ease 0.4s both' }}>
                 <div className="glass-stat" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.75)', padding: '1rem 1.5rem', borderRadius: '20px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--bg-glass)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.8rem', borderRadius: '14px' }}>
                       <Users size={26} />
                    </div>
                    <div>
                       <h4 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>{simulatedParticipants.toLocaleString()}+</h4>
                       <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ciudadanos Unidos</p>
                    </div>
                 </div>
                 
                 <div className="glass-stat" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.75)', padding: '1rem 1.5rem', borderRadius: '20px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--bg-glass)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#0ea5e9', padding: '0.8rem', borderRadius: '14px' }}>
                       <MapPin size={26} />
                    </div>
                    <div>
                       <h4 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>100%</h4>
                       <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cobertura Local</p>
                    </div>
                 </div>

                 <div className="glass-stat" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.75)', padding: '1rem 1.5rem', borderRadius: '20px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--bg-glass)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease' }}>
                    <div style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '0.8rem', borderRadius: '14px' }}>
                       <TrendingUp size={26} />
                    </div>
                    <div>
                       <h4 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>+48%</h4>
                       <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Crecimiento Mensual</p>
                    </div>
                 </div>
              </div>

            </div>
          </div>

          <style>{`
            .btn-hero-primary:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 40px rgba(74, 0, 114, 0.4) !important; }
            .btn-hero-primary:active { transform: translateY(0) scale(0.98); }
            .btn-hero-secondary:hover { background: #fff !important; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.1) !important; border-color: rgba(15,76,129,0.3) !important; color: #0c3e6b !important; }
            .btn-hero-secondary:active { transform: translateY(0); }
            .btn-hero-tertiary:hover { color: var(--primary) !important; border-bottom: 2px solid var(--primary) !important; transform: translateY(-1px); }
            .glass-stat:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.08) !important; }
            
            @keyframes pulseGlow {
              0% { opacity: 0.5; transform: scale(0.9); }
              100% { opacity: 0.8; transform: scale(1.1); }
            }
            @keyframes bounceScroll { 0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); } 40% { transform: translateY(-12px) translateX(-50%); } 60% { transform: translateY(-6px) translateX(-50%); } }
            
            @media (max-width: 1024px) {
               .hero-image-wrapper { display: none; }
               .hero-content-wrapper { max-width: 100% !important; text-align: center; }
               .hero-content-wrapper .live-dot-pulse { margin: 0 auto; }
               .hero-content-wrapper > div:first-child > div:first-child { margin-left: auto; margin-right: auto; }
               .hero-content-wrapper p { margin-left: auto; margin-right: auto; }
               .hero-content-wrapper > div:first-child > div:last-child { justify-content: center; }
               .glass-stat { flex: 1; min-width: 250px; justify-content: center; }
               .hero-content-wrapper > div:last-child { justify-content: center; }
            }
          `}</style>
        </section>

        {/* --- SECCIÓN 2: PILARES DE LA GOBERNANZA DIGITAL (Sleek category explorer with real photos) --- */}
        <section style={{ padding: '2rem 0 6rem 0', position: 'relative', overflow: 'hidden', zIndex: 11 }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 1 }}>
            <NetworkBackground />
          </div>
          <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: '4rem', alignItems: 'center' }} className="pillars-grid">
              
              {/* Interactive Left selectors */}
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: '850', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Pilares Fundacionales</span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginTop: '0.5rem', lineHeight: '1.2' }}>¿Qué define a Tunja 2.0?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                  Una plataforma moderna, integral y técnica que conecta la analítica territorial con la inteligencia colectiva para reorganizar el futuro de nuestra comunidad.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button 
                    onClick={() => setActivePillarTab('data')}
                    style={{
                      background: activePillarTab === 'data' ? 'rgba(74, 0, 114, 0.08)' : 'transparent',
                      border: '1px solid',
                      borderColor: activePillarTab === 'data' ? 'rgba(74, 0, 114, 0.2)' : 'rgba(0,0,0,0.04)',
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
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '800' }}>Inteligencia y Datos</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cartografía y visualización electoral.</p>
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
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '800' }}>Co-diseño Ciudadano</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mapeo vecinal de propuestas directas.</p>
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
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '800' }}>Poder Joven 2.0</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Semilleros y aceleración local.</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Dynamic Content Display Card */}
              <div 
                style={{ 
                  background: 'var(--bg-card)', 
                  borderRadius: '24px', 
                  padding: '2.5rem', 
                  boxShadow: '0 20px 50px rgba(0,0,0,0.04), 0 4px 15px rgba(0,0,0,0.01)', 
                  border: '1px solid var(--border-color)', 
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

                  <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    {activePillarTab === 'data' && "Inteligencia Territorial y Datos Abiertos"}
                    {activePillarTab === 'participation' && "Co-creación Abierta Ciudad-Gobernante"}
                    {activePillarTab === 'youth' && "Poder Joven 2.0 y Emprendimiento Digital"}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                    {activePillarTab === 'data' && "El futuro se planifica con bases sólidas. En Tunja 2.0 abrimos datos electorales históricos, indicadores demográficos y mapas de participación vecinal. Analiza el comportamiento electoral urbano y rural de la 2da vuelta presidencial de 2022 y descubre focos de crecimiento para fortalecer iniciativas conjuntas."}
                    {activePillarTab === 'participation' && "La ciudadanía ya no es un espectador. Hemos creado un canal bidireccional donde ingenieros, urbanistas y vecinos pueden reportar y registrar requerimientos técnicos que nutren de inmediato los planes de inversión pública. Tus ideas configuran el presupuesto local."}
                    {activePillarTab === 'youth' && "La juventud es el código fuente del cambio en Boyacá. Enlazamos los liderazgos locales con el Hub de startups, los esquemas de aceleración técnica, y las 4 propuestas capitales promovidas por liderazgos jóvenes como Nico. Impulsamos empleo técnico calificado."}
                  </p>

                  <ul style={{ listStyleType: 'none', padding: 0, margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {activePillarTab === 'data' && (
                      <>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--primary)' }} /> Visualizaciones interactivas de las elecciones colombianas en Tunja.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--primary)' }} /> Mapeo georreferenciado de necesidades vecinales específicas.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--primary)' }} /> Acceso directo a bases estadísticas estructuradas de participación.</li>
                      </>
                    )}
                    {activePillarTab === 'participation' && (
                      <>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--secondary)' }} /> Formulación y priorización directa de propuestas en vivo.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--secondary)' }} /> Participación directa en foros y comités de movilidad y diseño vial.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--secondary)' }} /> Veeduría electrónica sobre la ejecución presupuestaria.</li>
                      </>
                    )}
                    {activePillarTab === 'youth' && (
                      <>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--accent)' }} /> Semilleros locales de desarrollo de software e innovación urbana.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--accent)' }} /> Debates continuos del comité juvenil y foros presenciales activos.</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}><CheckCircle size={16} style={{ color: 'var(--accent)' }} /> Acceso preferencial a capacitaciones de robótica e inteligencia comercial.</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Highly aesthetic photo banner on bottom of tab */}
                <div style={{ marginTop: '1.5rem', width: '100%', height: '140px', borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={
                      activePillarTab === 'data' 
                        ? 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%201.png'
                        : activePillarTab === 'participation' 
                          ? 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%203.png'
                          : 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%206.png'
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
        <section style={{ padding: '2rem 0 6rem 0', position: 'relative', overflow: 'hidden', zIndex: 12 }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 1, transform: 'scaleY(-1)' }}>
            <NetworkBackground />
          </div>
          <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: '4rem', alignItems: 'center' }} className="pillars-grid">
              
              {/* Interactive Left selectors */}
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginTop: '0.5rem', lineHeight: '1.2' }}>El Camino de la Transformación Decisiva</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                  Conoce las fases secuenciales para integrar tu opinión dentro del algoritmo de políticas de Tunja. Haz clic en las fases para interactuar.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { phase: 0, title: "Fase 1: Mapeo Georeferenciado", icon: <Layers size={18} />, color: 'var(--primary)', label: "Mes 1", desc: "Mes 1: Investigación Activa" },
                    { phase: 1, title: "Fase 2: Diálogos de Co-diseño", icon: <Users size={18} />, color: 'var(--secondary)', label: "Mes 2", desc: "Mes 2: Intercambio Social" },
                    { phase: 2, title: "Fase 3: Presupuesto y Priorización", icon: <BarChart3 size={18} />, color: 'var(--accent)', label: "Mes 3", desc: "Mes 3: Toma de Decisiones" },
                    { phase: 3, title: "Fase 4: Despliegue de Código", icon: <Cpu size={18} />, color: '#10b981', label: "Mes 4", desc: "Mes 4: Acciones Ejecutables" }
                  ].map((step) => {
                    const isActive = activeTimelinePhase === step.phase;
                    const rgbColor = step.phase === 0 ? 'rgba(74, 0, 114' : step.phase === 1 ? 'rgba(0, 184, 217' : step.phase === 2 ? 'rgba(109, 93, 252' : 'rgba(16, 185, 129';
                    const activePulsingClass = step.phase === 0 ? 'pulsing-border-tech' : step.phase === 1 ? 'pulsing-border-tech-cyan' : step.phase === 2 ? 'pulsing-border-tech-purple' : '';

                    return (
                      <button 
                        key={step.phase}
                        onClick={() => setActiveTimelinePhase(step.phase)}
                        style={{
                          background: isActive ? `${rgbColor}, 0.08)` : 'transparent',
                          border: '1px solid',
                          borderColor: isActive ? `${rgbColor}, 0.2)` : 'rgba(0,0,0,0.04)',
                          borderRadius: '14px',
                          padding: '1.25rem 1.5rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          transition: 'all 0.3s'
                        }}
                        className={isActive ? activePulsingClass : ''}
                      >
                        <span style={{ background: step.color, color: '#fff', borderRadius: '8px', padding: '6px', display: 'flex' }}>
                          {step.icon}
                        </span>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '800' }}>{step.title}</h4>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{step.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Panel Viewer displaying active phase */}
              <div 
                style={{ 
                  background: 'var(--bg-card)', 
                  borderRadius: '24px', 
                  padding: '2.5rem', 
                  boxShadow: '0 20px 50px rgba(0,0,0,0.04), 0 4px 15px rgba(0,0,0,0.01)', 
                  border: '1px solid var(--border-color)', 
                  position: 'relative', 
                  overflow: 'hidden', 
                  minHeight: '440px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' 
                }}
                className="category-showcase-panel"
                key={activeTimelinePhase} /* Force animate on stage changes */
              >
                {/* Visual Backdrop Decorative Frame */}
                <div style={{ position: 'absolute', right: '0', top: '0', width: '220px', height: '220px', borderRadius: '50%', background: activeTimelinePhase === 0 ? 'rgba(15,76,129,0.03)' : activeTimelinePhase === 1 ? 'rgba(0,184,217,0.03)' : activeTimelinePhase === 2 ? 'rgba(109, 93, 252, 0.03)' : 'rgba(16, 185, 129, 0.03)', zIndex: 0, filter: 'blur(30px)', pointerEvents: 'none' }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '900', color: activeTimelinePhase === 0 ? 'var(--primary)' : activeTimelinePhase === 1 ? 'var(--secondary)' : activeTimelinePhase === 2 ? 'var(--accent)' : '#10b981', letterSpacing: '0.05em' }}>COORDENADAS DE PROCESO</span>
                    <span style={{ background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '700' }} className="hidden-mobile">
                      {activeTimelinePhase === 0 && "MES 1: INVESTIGACIÓN"}
                      {activeTimelinePhase === 1 && "MES 2: DIÁLOGOS"}
                      {activeTimelinePhase === 2 && "MES 3: ESTADÍSTICA"}
                      {activeTimelinePhase === 3 && "MES 4: DESPLIEGUE"}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(74, 0, 114, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {activeTimelinePhase === 0 && <Layers style={{ color: 'var(--primary)' }} size={24} />}
                      {activeTimelinePhase === 1 && <Users style={{ color: '#10b981' }} size={24} />}
                      {activeTimelinePhase === 2 && <BarChart3 style={{ color: '#f59e0b' }} size={24} />}
                      {activeTimelinePhase === 3 && <Cpu style={{ color: '#10b981' }} size={24} />}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                        {activeTimelinePhase === 0 && "Fase 1: Recolección Geocodificada y Mapeo"}
                        {activeTimelinePhase === 1 && "Fase 2: Diálogos Públicos de Co-Diseño"}
                        {activeTimelinePhase === 2 && "Fase 3: Presupuesto Participativo Algorítmico"}
                        {activeTimelinePhase === 3 && "Fase 4: Despliegue de Código de Ciudad"}
                      </h3>
                      <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                        {activeTimelinePhase === 0 && "Diagnóstico Activo de Necesidades Territoriales"}
                        {activeTimelinePhase === 1 && "Mesas Abiertas con Enfoque de Solución Local"}
                        {activeTimelinePhase === 2 && "Asignación Directa por Veeduría de Votos"}
                        {activeTimelinePhase === 3 && "Ejecución de Código Abierto e Impacto Territorial"}
                      </p>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '2rem' }}>
                    {activeTimelinePhase === 0 && "Recopilamos mapas de calor electorales, datos de participación y densidad comunal para diagnosticar las prioridades de desarrollo en cada franja de Tunja. Esto nos permite detectar el potencial estratégico real."}
                    {activeTimelinePhase === 1 && "Discutimos presencialmente y de forma digital a través de los nodos de debate las metas técnicas de movilidad, empleo juvenil, y conectividad pública en el territorio urbano y rural de Tunja."}
                    {activeTimelinePhase === 2 && "Sometemos a análisis las propuestas de los ciudadanos para actuar sobre lo priorizado, garantizando absoluta transparencia fiscal mediante paneles interactivos de analítica tributaria."}
                    {activeTimelinePhase === 3 && "Ejecutamos en conjunto con dependencias gubernamentales, Hubs universitarios y asambleas comunales los portales, optimizaciones inteligentes e ideas de base ciudadanas construidas colectivamente."}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Nivel de Maduración Técnico</span>
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

                  {/* Highly aesthetic photo banner on bottom of tab */}
                  <div style={{ marginTop: '1.5rem', width: '100%', height: '140px', borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={
                        activeTimelinePhase === 0 
                          ? 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%201.png'
                          : activeTimelinePhase === 1 
                            ? 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%205.png'
                            : activeTimelinePhase === 2
                              ? 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%203.png'
                              : 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%206.png'
                      } 
                      alt="Tunja Proceso Fases" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.02)' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)' }}></div>
                    <span style={{ position: 'absolute', bottom: '12px', left: '16px', color: '#fff', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.04em' }}>
                      {activeTimelinePhase === 0 && "MAPING TERRITORIAL"}
                      {activeTimelinePhase === 1 && "PARTICIPACIÓN CIUDADANA VIVA"}
                      {activeTimelinePhase === 2 && "ANÁLISIS ESTADÍSTICO Y FINANCIERO"}
                      {activeTimelinePhase === 3 && "DESPLIEGUE FINAL Y RETROALIMENTACIÓN"}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER ULTRA MODERNO CLARO */}
      <footer style={{ background: '#4A0072', color: 'rgba(255,255,255,0.7)', padding: '6rem 2rem 2rem 2rem', borderTop: '1px solid rgba(0,0,0,0.1)', position: 'relative', zIndex: 10 }}>
         <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem' }}>
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
                    <button onClick={() => onLegalClick('tratamiento')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-white transition-colors">
                      Autorización de Tratamiento de Datos
                    </button>
                    <button onClick={() => onLegalClick('privacidad')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-white transition-colors">
                      Política de Privacidad
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h4 style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>Avisos Legales</h4>
                    <button onClick={() => onLegalClick('aviso')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-white transition-colors">
                      Aviso de Privacidad
                    </button>
                    <button onClick={() => onLegalClick('cookies')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }} className="hover:text-white transition-colors">
                      Uso de Cookies
                    </button>
                  </div>
               </div>
            </div>

            <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
               <span>&copy; 2026 Nicolás Cortés - Alcalde Tunja 2026. Diseñado para liderar.</span>
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
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
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
                position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#F4F4F5', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'background 0.2s'
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
                  <div style={{ background: 'rgba(74, 0, 114, 0.1)', color: 'var(--primary)', padding: '0.5rem', borderRadius: '8px' }}>
                     <Target size={24} />
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Arquitectura Estratégica</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.05rem' }}>Despliegue Técnico Municipal</p>
                  <p>Implementamos soluciones tecnológicas sobre políticas de estado. Transformamos el esquema análogo en un núcleo hiperconectado, facilitando el análisis en tiempo real y la predicción de crisis locales.</p>
                  
                  <div style={{ background: '#F4F4F5', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '12px', marginTop: '0.5rem' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '1rem' }}>Módulos Principales:</h4>
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
                
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', background: '#F4F4F5', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                  <img src={urlNicoPhoto} alt="Nicolás Cortés" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Nicolás Cortés</h4>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Coordinador General, TUNJA 2.0</p>
                  </div>
                </div>
                
                <div style={{ borderLeft: '3px solid #171717', paddingLeft: '1rem', color: 'var(--text-primary)', fontStyle: 'italic', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  "La modernidad no se decreta, se programa. Necesitamos infraestructura lógica, recolección de datos y ejecución precisa para elevar la calidad de vida urbana."
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
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
                
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
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
                      <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-primary)' }}>Módulo Territorial</label>
                      <select style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.95rem' }} value={newProposal.comuna} onChange={e => setNewProposal({...newProposal, comuna: e.target.value})}>
                        <option>Distrito Central</option><option>Hub Norte</option><option>Anillo Oriental</option><option>Corredor Sur</option><option>Expansión Rural</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-primary)' }}>Categoría Principal</label>
                      <select style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.95rem' }} value={newProposal.sector} onChange={e => setNewProposal({...newProposal, sector: e.target.value})}>
                        <option>Infraestructura Lógica</option><option>Salubridad Pública</option><option>Logística Urbana</option><option>Optimización Fiscal</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-primary)' }}>Descripción del Parámetro</label>
                      <textarea rows={4} style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.95rem', resize: 'none' }} placeholder="Detalla el escenario técnico..." value={newProposal.texto} onChange={e => setNewProposal({...newProposal, texto: e.target.value})} required></textarea>
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
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Puntos de reunión presencial agendados. Confirma asistencia para gestión de aforo.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {localAgenda.map(event => (
                    <div key={event.id} style={{
                      background: rsvpList[event.id] ? '#F4F4F5' : '#FFFFFF',
                      border: '1px solid', borderColor: rsvpList[event.id] ? '#E4E4E7' : '#E4E4E7',
                      padding: '1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)', fontSize: '1rem' }}>{event.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{event.place} • {event.date} ({event.time})</p>
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
          box-shadow: 0 15px 35px rgba(74, 0, 114, 0.08), 0 4px 15px rgba(0,0,0,0.03) !important;
          border-color: rgba(74, 0, 114, 0.3) !important;
        }
        .premium-interactive-hover-card-large {
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .premium-interactive-hover-card-large:hover {
          transform: translateY(-6px) scale(1.01) !important;
          box-shadow: 0 20px 45px rgba(74, 0, 114, 0.28) !important;
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
          box-shadow: 0 0 0 0 rgba(74, 0, 114, 0.7);
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
          border-color: rgba(74, 0, 114, 0.15);
        }

        .pulsing-border-tech {
          box-shadow: 0 0 15px rgba(74, 0, 114, 0.12) !important;
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
