import React, { useState, useEffect } from 'react';
import TunjaLogo from './TunjaLogo'; // New Tunja Logo
import { 
  Building, Network, Users, ChevronRight, Activity, Cpu, Play, Target,
  MessageSquare, FileText, CheckCircle, Send, X, ArrowUpRight, Check, MapPin, Facebook, Twitter, Instagram
} from 'lucide-react';

export default function LandingPage({ onEnterApp }) {
  const urlNicoPhoto = "https://raw.githubusercontent.com/fabiancho0724/Prueba-123/e7fcca3daefa398a6c43271a5c7b379f7ab7ddbf/682871269_3927799717353938_6204895979427810843_n.jpg";

  // Estados de la interfaz interactiva
  const [activeModal, setActiveModal] = useState(null); // 'acuerdo', 'invitacion', 'consulta', 'agenda'
  const [rsvpList, setRsvpList] = useState({});
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState({ comuna: 'Distrito Central', sector: 'Tecnología e Innovación', texto: '' });
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [simulatedParticipants, setSimulatedParticipants] = useState(3452);

  // Datos
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
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      overflowX: 'hidden'
    }} className="animate-fade-in">
      
      {/* HEADER ELEGANTE */}
      <header style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
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
        }}>
          <TunjaLogo height="35px" variant="dark" />

          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button onClick={() => setActiveModal('acuerdo')} className="nav-clean-btn hidden-mobile">El Ecosistema</button>
            <button onClick={() => setActiveModal('consulta')} className="nav-clean-btn hidden-mobile">Laboratorio Ciudadano</button>
            <button onClick={() => setActiveModal('agenda')} className="nav-clean-btn hidden-mobile">Actividad</button>
            
            <button 
              onClick={onEnterApp}
              className="btn btn-primary"
              style={{
                borderRadius: '8px',
                padding: '0.6rem 1.25rem',
                fontSize: '0.9rem',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              Plataforma Principal
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION DE ALTO IMPACTO */}
      <main style={{ position: 'relative', marginTop: '70px', padding: '6rem 0', overflow: 'hidden' }}>
        {/* Background Accents (Glassmorphism blobs) */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'var(--primary-glow)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px', background: 'rgba(2, 132, 199, 0.08)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem', alignItems: 'center' }} className="hero-grid">
            
            {/* Texto Hero */}
            <div>
              <span className="pill pill-primary" style={{ marginBottom: '1.5rem' }}>Evolución Urbana Transparente</span>
              <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: '1.05', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
                Gestión Pública de <span style={{ color: 'var(--primary)' }}>Próxima Generación.</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
                Una plataforma basada en datos para monitorear el desarrollo, auditar presupuestos y potenciar una ciudad inteligente, conectada y sostenible.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={onEnterApp} className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
                  Explorar Panel Interactivo
                  <ChevronRight size={18} />
                </button>
                <button onClick={() => setActiveModal('invitacion')} className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem', background: 'var(--bg-card)' }}>
                  <Play size={16} fill="currentColor" />
                  Conocer al Líder
                </button>
              </div>

              {/* Data points (Live) */}
              <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                 <div>
                    <h4 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)', lineHeight: '1' }}>$534<span style={{ fontSize: '1.2rem' }}>M</span></h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>Presupuesto Auditado</p>
                 </div>
                 <div>
                    <h4 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)', lineHeight: '1' }}>{simulatedParticipants.toLocaleString()}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>Veedores Activos</p>
                 </div>
                 <div>
                    <h4 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)', lineHeight: '1' }}>8</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>Nodos Analizados</p>
                 </div>
              </div>
            </div>

            {/* Imagen Hero Interactiva */}
            <div style={{ position: 'relative', perspective: '1000px' }}>
               <div style={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  transform: 'rotateY(-5deg) rotateX(2deg)',
                  transition: 'transform 0.5s ease',
                  cursor: 'pointer'
               }}
               onMouseOver={(e) => e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(-5px)'}
               onMouseOut={(e) => e.currentTarget.style.transform = 'rotateY(-5px) rotateX(2deg) translateY(0)'}
               >
                 <img src={urlNicoPhoto} alt="Candidato y Ciudad" style={{ width: '100%', display: 'block', filter: 'contrast(1.05) saturate(1.1)' }} />
                 <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(to top, var(--secondary) 0%, transparent 100%)', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Activity size={16} color="var(--accent-green)" />
                      <span style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Sistema Activo</span>
                    </div>
                    <h3 style={{ fontSize: '1.5rem' }}>Nicolás Cortés</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Director Estratégico, TUNJA 2.0</p>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </main>

      {/* MODULOS DE SERVICIO (Cards) */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
         <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1rem' }}>Módulos de Transformación</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>Nuestra arquitectura de políticas públicas desglosa el problema y ofrece herramientas técnicas y exactas para empoderar a la comunidad y a sus líderes empresariales.</p>
            </div>

            <div className="grid-cols-3">
               <div className="glass-card" onClick={() => setActiveModal('acuerdo')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                 <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 92, 110, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                   <Target size={24} />
                 </div>
                 <h3 style={{ fontSize: '1.25rem' }}>Alineación Estratégica</h3>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', flex: 1 }}>
                   Documentación maestra del plan directivo municipal. Analiza el marco tecnológico, fiscal y ciudadano propuesto para el ecosistema.
                 </p>
                 <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Leer Documento <ChevronRight size={14} /></span>
               </div>

               <div className="glass-card" onClick={() => setActiveModal('consulta')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                 <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)' }}>
                   <Cpu size={24} />
                 </div>
                 <h3 style={{ fontSize: '1.25rem' }}>Laboratorio de Ideas</h3>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', flex: 1 }}>
                   Ingresa tus propuestas en nuestro motor descentralizado de innovación. Las métricas nos ayudan a identificar prioridades urgentes.
                 </p>
                 <span style={{ color: 'var(--accent-green)', fontWeight: '600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Aportar Ideas <ChevronRight size={14} /></span>
               </div>

               <div className="glass-card" onClick={() => setActiveModal('agenda')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                 <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(212, 175, 55, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                   <Network size={24} />
                 </div>
                 <h3 style={{ fontSize: '1.25rem' }}>Nodos y Sincronizaciones</h3>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', flex: 1 }}>
                   Agenda de encuentros físicos y digitales. Inscríbete en los nodos comunitarios para forjar alianzas y definir el rumbo local.
                 </p>
                 <span style={{ color: 'var(--accent-gold)', fontWeight: '600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Ver Agenda <ChevronRight size={14} /></span>
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER - Redes Sociales */}
      <footer style={{ background: 'var(--secondary)', color: '#fff', padding: '5rem 2rem 3rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
         <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <TunjaLogo height="40px" variant="light" className="mx-auto" style={{ margin: '0 auto 2rem auto' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '1rem', color: '#fff' }}>Hagamos red.</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              Únete a las plataformas oficiales y contribuye al flujo de la ciudad.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
               <a href="https://facebook.com/nicolascortes" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', background: '#fff', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-3px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}><Facebook size={20} /></a>
               <a href="https://twitter.com/nicolascortes" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', background: '#fff', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-3px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}><Twitter size={20} /></a>
               <a href="https://instagram.com/nicolascortes" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', background: '#fff', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-3px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}><Instagram size={20} /></a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
               <img src="https://raw.githubusercontent.com/fabiancho0724/Prueba-123/15a885eeb39f5a481a49cbfa3e071803aca80b91/Logo_primary.png" alt="Pacto Histórico" style={{ height: '35px', objectFit: 'contain', opacity: 0.8 }} />
               <img src="https://raw.githubusercontent.com/fabiancho0724/Prueba-123/15a885eeb39f5a481a49cbfa3e071803aca80b91/Gemini_Generated_Image_a6dj2ja6dj2ja6dj.png" alt="Logotipo Nicolás Cortés" style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '50%', opacity: 0.9, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }} />
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
               <span>&copy; 2026 Plataforma TUNJA 2.0. Todos los derechos reservados.</span>
               <span>Desarrollado para entornos urbanos modernos.</span>
            </div>
         </div>
      </footer>

      {/* MODALES DINÁMICOS */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}
        onClick={() => setActiveModal(null)}
        >
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '650px',
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
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'var(--bg-primary)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              onMouseOver={e=>e.currentTarget.style.background='var(--border-color)'}
              onMouseOut={e=>e.currentTarget.style.background='var(--bg-primary)'}
            >
              <X size={18} />
            </button>

            {/* CONTENIDO: ACUERDO / ECOSISTEMA */}
            {activeModal === 'acuerdo' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Target style={{ color: 'var(--primary)' }} size={28} />
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>
                    Ecosistema Estratégico
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.05rem' }}>
                    Construcción del plan paramétrico para el desarrollo municipal.
                  </p>
                  <p>
                    Analizamos las variables críticas de la ciudad y construimos modelos matemáticos de inversión que favorezcan indicadores reales de progreso, sin retórica.
                  </p>
                  <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '12px' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '1rem' }}>Vectores Principales:</h4>
                    <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <li><strong>Transparencia Fiscal:</strong> Dashboard ciudadano de ejecución del presupuesto ($534M).</li>
                      <li><strong>Infraestructura Inteligente:</strong> Replanteamiento de la malla vial local utilizando datos de tráfico censados en vivo.</li>
                      <li><strong>HUB Tecnológico:</strong> Creación de zonas económicas especiales para atracción de empresas tech.</li>
                    </ul>
                  </div>
                  <div style={{ marginTop: '1.5rem' }}>
                    <button onClick={() => setActiveModal('consulta')} className="btn btn-primary" style={{ width: '100%' }}>
                      Sumar Indicadores Locales
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CONTENIDO: INVITACION / LIDERAZGO */}
            {activeModal === 'invitacion' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Users style={{ color: 'var(--primary)' }} size={28} />
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>
                    Liderazgo Directivo
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                  <img src={urlNicoPhoto} alt="Nicolás Cortés" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1.2rem', marginBottom: '0.25rem' }}>Nicolás Cortés</strong>
                    <span className="pill pill-primary" style={{ fontSize: '0.6rem' }}>Estratega Principal</span>
                  </div>
                </div>
                <div style={{ fontStyle: 'italic', borderLeft: '4px solid var(--primary)', paddingLeft: '1.25rem', color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  "Tunja no necesita ideología, necesita gestión, datos exactos y modelos de operación eficientes. Queremos construir un HUB en Boyacá impulsado por nuestra propia gente."
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Hacemos un llamado a desarrolladores, ingenieros, analistas y ciudadanos comprometidos para ensamblar el nuevo sistema operativo de esta ciudad histórica.
                </p>
                <div style={{ marginTop: '2rem' }}>
                  <button onClick={onEnterApp} className="btn btn-accent" style={{ width: '100%' }}>
                    Acceder a Panel Operativo
                  </button>
                </div>
              </div>
            )}

            {/* CONTENIDO: CONSULTA / LABORATORIO O FORMULARIO */}
            {activeModal === 'consulta' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <Cpu style={{ color: 'var(--accent-green)' }} size={28} />
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>
                    Laboratorio de Innovación
                  </h2>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  Ingresa un ticket con requerimientos de tu zona. Toda data es procesada para definir la matriz temporal de ejecución.
                </p>
                {proposalSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', margin: '0 auto 1.5rem auto' }}>
                      <Check size={32} />
                    </div>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Ticket Entregado</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>La información ha sido cargada en el servidor de propuestas comunitarias temporales.</p>
                  </div>
                ) : (
                  <form onSubmit={handleProposalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Sector Demográfico</label>
                      <select className="form-select" value={newProposal.comuna} onChange={e => setNewProposal({...newProposal, comuna: e.target.value})}>
                        <option>Distrito Central</option>
                        <option>Hub Norte</option>
                        <option>Anillo Oriental</option>
                        <option>Corredor Sur</option>
                        <option>Zona de Expansión Rural</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Eje Temático</label>
                      <select className="form-select" value={newProposal.sector} onChange={e => setNewProposal({...newProposal, sector: e.target.value})}>
                        <option>Tecnología e Innovación</option>
                        <option>Gestión Sanitaria</option>
                        <option>Infraestructura Logística</option>
                        <option>Eficiencia Administrativa</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Especificación Paramétrica (Propuesta)</label>
                      <textarea className="form-textarea" rows={4} placeholder="Detalla el problema técnico y recurso requerido..." value={newProposal.texto} onChange={e => setNewProposal({...newProposal, texto: e.target.value})} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                      Procesar Data
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* CONTENIDO: AGENDA / NODOS */}
            {activeModal === 'agenda' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <Network style={{ color: 'var(--accent-gold)' }} size={28} />
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>
                    Nodos Activos
                  </h2>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Próximos puntos de sincronización presenciales. Confirma tu instancia para reservar aforo.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {localAgenda.map(event => (
                    <div key={event.id} style={{
                      background: rsvpList[event.id] ? 'var(--bg-primary)' : 'var(--bg-card)',
                      border: '1px solid',
                      borderColor: rsvpList[event.id] ? 'var(--border-color)' : 'rgba(0,0,0,0.05)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      display: 'flex', justifyItems: 'center', justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{event.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>📍 {event.place} <br/> ⏰ {event.date} • {event.time}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                         <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Métrica: {rsvpList[event.id] ? event.attendees + 1 : event.attendees} regs</span>
                         {rsvpList[event.id] ? (
                           <span className="pill pill-gray"><Check size={12}/> Listo</span>
                         ) : (
                           <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleRSVP(event.id)}>Registrar</button>
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
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .nav-clean-btn:hover {
          color: var(--primary);
        }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
          .hidden-mobile { display: none; }
        }

        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
