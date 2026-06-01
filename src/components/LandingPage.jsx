import React, { useState, useEffect } from 'react';
import { 
  Building, Network, Users, ChevronRight, Activity, Cpu, Play, Target,
  MessageSquare, FileText, CheckCircle, Send, X, ArrowUpRight, Check, MapPin, Facebook, Twitter, Instagram, Globe, BarChart
} from 'lucide-react';

import BrandLogos from './BrandLogos';

export default function LandingPage({ onEnterApp }) {
  const urlNicoPhoto = "https://raw.githubusercontent.com/fabiancho0724/Prueba-123/e7fcca3daefa398a6c43271a5c7b379f7ab7ddbf/682871269_3927799717353938_6204895979427810843_n.jpg";

  const [activeModal, setActiveModal] = useState(null);
  const [rsvpList, setRsvpList] = useState({});
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState({ comuna: 'Distrito Central', sector: 'Tecnología e Innovación', texto: '' });
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [simulatedParticipants, setSimulatedParticipants] = useState(3452);
  const [isProfileFlipped, setIsProfileFlipped] = useState(false);

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

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-dark)',
      color: '#FFFFFF',
      fontFamily: 'var(--font-body)',
      overflowX: 'hidden'
    }} className="animate-fade-in">
      
      {/* HEADER ELEGANTE Y OSCURO */}
      <header style={{
        background: '#0F0F0F',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
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
        }}>
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BrandLogos variant="header" />
          </div>

          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button onClick={() => setActiveModal('acuerdo')} className="nav-clean-btn hidden-mobile">Ecosistema</button>
            <button onClick={() => setActiveModal('consulta')} className="nav-clean-btn hidden-mobile">Laboratorio</button>
            <button onClick={() => setActiveModal('agenda')} className="nav-clean-btn hidden-mobile">Nodes</button>
            
            <button 
              onClick={onEnterApp}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                transition: 'all 0.2s',
                boxShadow: '0 0 15px rgba(15, 76, 129, 0.4)'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(15, 76, 129, 0.6)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(15, 76, 129, 0.4)'; }}
            >
              Iniciar Panel Operativo
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION DE ALTO IMPACTO MODO OSCURO (Linear style) */}
      <main style={{ position: 'relative', marginTop: '70px', padding: '8rem 0 6rem 0', overflow: 'hidden', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        {/* Abstract Glows */}
        <div style={{ position: 'absolute', top: '10%', right: '15%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(109, 93, 252, 0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(0, 184, 217, 0.1) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }}></div>
        
        {/* Reticular Grid Pattern */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0, pointerEvents: 'none', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 90%)' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem', alignItems: 'center' }} className="hero-grid">
            
            {/* Texto Hero */}
            <div style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '6px 12px', borderRadius: '100px', marginBottom: '2rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 10px var(--accent-green)' }}></div>
                <span style={{ color: 'var(--accent-green)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Sistema Operativo Municipal Activo</span>
              </div>
              
              <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', lineHeight: '1.05', marginBottom: '1.5rem', color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                Construyendo la<br/>
                <span style={{ 
                  background: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>Ciudad Inteligente.</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: '#A1A1AA', marginBottom: '2.5rem', maxWidth: '580px', lineHeight: '1.6' }}>
                Arquitectura de gestión pública impulsada por datos. Monitoreo presupuestal en tiempo real, urbanismo conectado e innovación cívica para el futuro de Tunja.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={onEnterApp} style={{ 
                  background: '#FFFFFF', 
                  color: '#000000', 
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.85rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Acceso al Dashboard <ArrowUpRight size={18} />
                </button>
                <button onClick={() => setActiveModal('invitacion')} style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  color: '#FFFFFF', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '0.85rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  <Play size={16} fill="currentColor" /> Ver Visión 2.0
                </button>
              </div>

              {/* Análisis del Panorama */}
              <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem' }}>
                <p style={{ color: '#E4E4E7', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem', fontWeight: '300' }}>
                  El análisis financiero del panorama actual nos deja una conclusión clara: Tunja no puede seguir gobernada bajo las fórmulas del pasado si pretende obtener resultados distintos. Frente a la rigidez presupuestal y la desatención de los sectores clave, surge la urgencia de una administración con energía renovada, visión de futuro y las manos libres de la política tradicional.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                    <img src="https://raw.githubusercontent.com/fabiancho0724/Prueba-123/046b55c06b084e0f640e6297111911cc7ff75c5a/catedral-basilica-tunja.jpg" alt="Catedral Basílica de Tunja" style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                    <img src="https://raw.githubusercontent.com/fabiancho0724/Prueba-123/046b55c06b084e0f640e6297111911cc7ff75c5a/lugares-turisticos-de-Tunja.jpeg" alt="Lugares Turísticos de Tunja" style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Imagen Hero Interactiva / Panel de Datos Mock */}
            <div 
              style={{ position: 'relative', perspective: '1500px', animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both', cursor: 'pointer' }}
              onClick={() => setIsProfileFlipped(!isProfileFlipped)}
            >
               
               <div style={{ 
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isProfileFlipped ? 'rotateY(180deg)' : 'rotateY(-8deg) rotateX(4deg) scale(0.95)',
                  width: '100%',
               }}
               onMouseOver={(e) => {
                 if (!isProfileFlipped) e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
               }}
               onMouseOut={(e) => {
                 if (!isProfileFlipped) e.currentTarget.style.transform = 'rotateY(-8deg) rotateX(4deg) scale(0.95)';
               }}
               >
                 {/* FRONT FACE */}
                 <div style={{
                    backfaceVisibility: 'hidden',
                    borderRadius: '24px', 
                    background: 'linear-gradient(180deg, rgba(30,30,30,0.8) 0%, rgba(10,10,10,0.9) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '1rem',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(15, 76, 129, 0.2)',
                 }}>
                   {/* Top Bar of the Mock Dashboard */}
                   <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem', padding: '0.25rem' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}></div>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }}></div>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E' }}></div>
                   </div>

                   {/* Contenido Visual Híbrido: Foto + Data */}
                   <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                      <img src={urlNicoPhoto} alt="Candidato" style={{ width: '100%', display: 'block', opacity: '0.9', filter: 'grayscale(10%) contrast(1.1)' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.3) 60%, transparent 100%)' }}></div>
                      
                      {/* Floating Data Widgets over Image */}
                      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                              <span style={{ background: 'var(--primary)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'inline-block' }}>Candidato a la Alcaldía de Tunja</span>
                              <h3 style={{ fontSize: '1.6rem', color: '#fff', margin: 0 }}>Nicolás Cortés</h3>
                              <p style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>Plan de Transformación Urbana</p>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '0.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                               <Globe size={20} color="var(--secondary)" />
                            </div>
                         </div>
                         
                         {/* Redes Sociales en lugar de Aprobación de Proyectos */}
                         <div style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                              <Facebook size={24} color="#fff" style={{ opacity: 0.8 }} />
                              <span style={{ fontSize: '0.7rem', color: '#fff', opacity: 0.8 }}>Facebook</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                              <Instagram size={24} color="#fff" style={{ opacity: 0.8 }} />
                              <span style={{ fontSize: '0.7rem', color: '#fff', opacity: 0.8 }}>Instagram</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                              <Twitter size={24} color="#fff" style={{ opacity: 0.8 }} />
                              <span style={{ fontSize: '0.7rem', color: '#fff', opacity: 0.8 }}>Twitter</span>
                            </div>
                         </div>

                      </div>
                   </div>
                 </div>
                 
                 {/* BACK FACE */}
                 <div style={{
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '24px', 
                    background: 'linear-gradient(180deg, rgba(20,20,22,1) 0%, rgba(10,10,12,1) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '2.5rem',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(15, 76, 129, 0.2)',
                    transform: 'rotateY(180deg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                 }}>
                   <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', marginBottom: '1.5rem', border: '3px solid var(--primary)' }}>
                     <img src={urlNicoPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Perfil de Nicolás Cortés" />
                   </div>
                   <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.3rem' }}>Nicolás Cortés</h3>
                   <span style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Candidato a la Alcaldía</span>
                   <p style={{ color: '#A1A1AA', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                     Líder visionario comprometido con la transformación digital, el emprendimiento local, y la gobernanza de datos para construir la Tunja del futuro, una ciudad inteligente y participativa.
                   </p>
                   <button style={{
                     background: 'var(--primary)',
                     color: '#fff',
                     border: 'none',
                     padding: '0.75rem 2rem',
                     borderRadius: '8px',
                     fontWeight: '600',
                     cursor: 'pointer',
                     transition: 'opacity 0.2s'
                   }}
                   onMouseOver={e => e.currentTarget.style.opacity = 0.8}
                   onMouseOut={e => e.currentTarget.style.opacity = 1}
                   >
                     Conocer su Visión
                   </button>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </main>

      {/* MODULOS DE SERVICIO (Cards al estilo Linear) */}
      <section style={{ padding: '6rem 0', background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
         <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem', maxWidth: '700px', margin: '0 auto 5rem auto' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Infraestructura de Gestión</h2>
              <p style={{ color: '#A1A1AA', fontSize: '1.05rem', lineHeight: '1.6' }}>Desplegamos herramientas modulares para auditar, proponer y ejecutar políticas públicas con precisión técnica y transparencia absoluta.</p>
            </div>

            <div className="grid-cols-3">
               
               {/* Card 1 */}
               <div className="linear-card" onClick={() => setActiveModal('acuerdo')}>
                 <div className="card-icon-wrapper" style={{ color: 'var(--primary)' }}>
                   <BarChart size={24} />
                 </div>
                 <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.75rem' }}>Alineación Estratégica</h3>
                 <p style={{ color: '#A1A1AA', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                   Monitor de ejecución fiscal y cumplimiento de metas. Analiza el marco tecnológico y presupuestal propuesto para el núcleo urbano.
                 </p>
                 <span className="card-action">Conocer Detalles <ChevronRight size={14} /></span>
               </div>

               {/* Card 2 */}
               <div className="linear-card" onClick={() => setActiveModal('consulta')}>
                 <div className="card-icon-wrapper" style={{ color: 'var(--accent)' }}>
                   <Cpu size={24} />
                 </div>
                 <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.75rem' }}>Laboratorio Ciudadano</h3>
                 <p style={{ color: '#A1A1AA', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                   Motor de innovación abierta. Ingresa requerimientos estructurados y participa en la definición de la matriz de desarrollo local.
                 </p>
                 <span className="card-action">Aportar Ideas <ChevronRight size={14} /></span>
               </div>

               {/* Card 3 */}
               <div className="linear-card" onClick={() => setActiveModal('agenda')}>
                 <div className="card-icon-wrapper" style={{ color: 'var(--secondary)' }}>
                   <Network size={24} />
                 </div>
                 <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.75rem' }}>Red de Nodos</h3>
                 <p style={{ color: '#A1A1AA', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                   Sincronización de eventos presenciales y virtuales. Inscríbete a los foros técnicos para construir alianzas estratégicas.
                 </p>
                 <span className="card-action">Ver Calendario <ChevronRight size={14} /></span>
               </div>

            </div>
         </div>
      </section>

      {/* FOOTER ULTRA MODERNO */}
      <footer style={{ background: '#0F0F0F', color: '#fff', padding: '6rem 2rem 2rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
         <div className="container" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* BRANDING INTEGRADO */}
            <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
               <BrandLogos variant="footer" />
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem' }}>
               <a href="#" style={{ color: '#A1A1AA', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#fff'} onMouseOut={e=>e.currentTarget.style.color='#A1A1AA'}><Facebook size={20} /></a>
               <a href="#" style={{ color: '#A1A1AA', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#fff'} onMouseOut={e=>e.currentTarget.style.color='#A1A1AA'}><Twitter size={20} /></a>
               <a href="#" style={{ color: '#A1A1AA', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#fff'} onMouseOut={e=>e.currentTarget.style.color='#A1A1AA'}><Instagram size={20} /></a>
            </div>

            <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: '#71717A', fontSize: '0.85rem' }}>
               <span>&copy; 2026 TUNJA 2.0. Plataforma de Gobernanza Inteligente.</span>
               <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href="#" style={{ color: '#71717A', textDecoration: 'none' }}>Privacidad</a>
                  <a href="#" style={{ color: '#71717A', textDecoration: 'none' }}>Términos</a>
                  <a href="#" style={{ color: '#71717A', textDecoration: 'none' }}>Transparencia</a>
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
                <button onClick={onEnterApp} className="btn" style={{ width: '100%', marginTop: '2rem', background: 'var(--primary)', color: '#fff', padding: '0.8rem', borderRadius: '8px' }}>
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

      <style>{`
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

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hidden-mobile { display: none !important; }
        }

        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

