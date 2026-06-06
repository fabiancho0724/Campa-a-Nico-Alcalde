import React, { useState } from 'react';
import { 
  Building,
  Target,
  Users,
  Shield,
  HeartPulse,
  TrendingUp,
  ChevronRight,
  Cpu,
  MonitorPlay,
  Briefcase,
  Activity,
  Milestone,
  CheckCircle2
} from 'lucide-react';

import las4Hero from '../assets/images/las_4_nico_hero_1780678514931.png';
import las4Infra from '../assets/images/las_4_nico_infraestructura_1780678529053.png';
import las4Seguridad from '../assets/images/las_4_nico_seguridad_1780678542508.png';
import las4Salud from '../assets/images/las_4_nico_salud_1780678554520.png';
import hunzaInnovaHub from '../assets/images/hunza_coworking_1780675677359.png';

export default function Proposals() {
  const [activeBandera, setActiveBandera] = useState(null);
  const [proposalText, setProposalText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitProposal = async () => {
    if(!proposalText.trim()) { 
      alert('Por favor escribe tu idea.'); 
      return; 
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/aportes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          autor: 'Ciudadano Túña 2.0',
          titulo: 'Nueva propuesta ciudadana',
          contenido: proposalText
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error HTTP: ${response.status}`);
      }

      alert('¡Idea enviada exitosamente y registrada como aporte!');
      setProposalText('');
    } catch (error) {
      console.error('Error detallado:', error);
      alert(`Hubo un error al enviar tu idea: ${error.message}. Revisa la consola o configuración del backend.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const banderas = [
    {
      id: 'infraestructura',
      title: 'Infraestructura Digna',
      slogan: '"Conectamos barrios, conectamos oportunidades."',
      icon: <Building size={32} />,
      image: las4Infra,
      color: '#0ea5e9'
    },
    {
      id: 'innova',
      title: 'Hunza Innova',
      slogan: '"El talento joven construye la Tunja del futuro."',
      icon: <Cpu size={32} />,
      image: hunzaInnovaHub,
      color: '#8b5cf6'
    },
    {
      id: 'seguridad',
      title: 'Seguridad Inteligente',
      slogan: '"Prevenir antes que reaccionar."',
      icon: <Shield size={32} />,
      image: las4Seguridad,
      color: '#f59e0b'
    },
    {
      id: 'salud',
      title: 'Salud Cerca de Ti',
      slogan: '"La salud llega donde la necesitan los tunjanos."',
      icon: <HeartPulse size={32} />,
      image: las4Salud,
      color: '#10b981'
    }
  ];

  return (
    <div className="las4nico-container animate-fade-in" style={{ 
      color: '#0f172a', 
      background: '#f8fafc', 
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
      border: '1px solid rgba(0,0,0,0.05)',
      marginTop: '1rem'
    }}>
      
      {/* HERO SECTION */}
      <section style={{ 
        position: 'relative', 
        minHeight: '85vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${las4Hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(248, 250, 252, 0.2) 0%, rgba(248, 250, 252, 1) 100%)',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(255,255,255,0.9)', 
            padding: '0.6rem 1.5rem', 
            borderRadius: '50px',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(15,76,129,0.1)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
          }}>
            <Target size={18} fill="var(--primary)" color="var(--primary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--primary)' }}>
              Cuatro banderas, una sola misión: transformar Tunja
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(4rem, 8vw, 6.5rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.05em',
            margin: '0 0 1rem 0',
            lineHeight: 1,
            color: '#0f172a'
          }}>
            LAS 4 DE <span style={{ color: 'var(--secondary)', textShadow: '0 10px 30px rgba(0,229,255,0.2)' }}>NICO</span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', 
            color: '#334155',
            marginBottom: '1rem',
            fontWeight: 800,
            lineHeight: 1.2,
          }}>
            "Una visión moderna para construir la Tunja 2.0."
          </p>

          <p style={{ 
            fontSize: '1.1rem', 
            color: '#64748b',
            marginBottom: '3rem',
            fontWeight: 500,
            maxWidth: '700px',
            margin: '0 auto 3rem auto',
            lineHeight: 1.6
          }}>
            Cuatro grandes apuestas para transformar la calidad de vida de todos los tunjanos. 
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              onClick={() => document.getElementById('ecosistema-pilares').scrollIntoView({behavior: 'smooth'})}
              style={{
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              padding: '1.2rem 3rem',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 15px 30px rgba(15, 76, 129, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Explorar las propuestas <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* EXPERIENCIA CENTRAL - ECOSISTEMA DE PILARES */}
      <section id="ecosistema-pilares" style={{ padding: '8rem 2rem', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at center, rgba(15,76,129,0.03) 0%, transparent 70%)',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginBottom: '4rem', letterSpacing: '-0.03em' }}>
            Descubre el ecosistema Tunja 2.0
          </h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {banderas.map((bandera) => (
              <div 
                key={bandera.id}
                onClick={() => setActiveBandera(bandera.id === activeBandera ? null : bandera.id)}
                style={{
                  background: activeBandera === bandera.id ? bandera.color : '#ffffff',
                  border: `1px solid ${activeBandera === bandera.id ? bandera.color : 'rgba(0,0,0,0.05)'}`,
                  borderRadius: '24px',
                  padding: '2rem',
                  maxWidth: '280px',
                  flex: '1 1 250px',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeBandera === bandera.id ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: activeBandera === bandera.id ? `0 20px 40px ${bandera.color}40` : '0 10px 30px rgba(0,0,0,0.03)',
                  textAlign: 'left'
                }}
              >
                <div style={{ 
                  background: activeBandera === bandera.id ? '#ffffff' : `${bandera.color}15`, 
                  color: activeBandera === bandera.id ? bandera.color : bandera.color, 
                  width: '64px', height: '64px', borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  marginBottom: '1.5rem',
                  transition: 'all 0.3s ease'
                }}>
                  {bandera.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: activeBandera === bandera.id ? '#fff' : '#0f172a', marginBottom: '1rem', lineHeight: 1.2 }}>
                  {bandera.title}
                </h3>
                <p style={{ color: activeBandera === bandera.id ? 'rgba(255,255,255,0.9)' : '#64748b', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                  {bandera.slogan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETALLE DE BANDERA Expandida */}
      {activeBandera && (
        <section className="animate-fade-in" style={{ padding: '6rem 2rem', background: '#ffffff', position: 'relative' }}>
          {banderas.map((b) => b.id === activeBandera && (
            <div key={b.id} style={{ maxWidth: '1200px', margin: '0 auto' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
                <div style={{ borderRadius: '32px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', aspectRatio: '4/3' }}>
                  <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ display: 'inline-block', background: `${b.color}15`, color: b.color, padding: '0.6rem 1.2rem', borderRadius: '50px', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Bandera Activa
                  </div>
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{b.title}</h2>
                  <p style={{ fontSize: '1.5rem', color: b.color, fontStyle: 'italic', fontWeight: 600, marginBottom: '2rem' }}>{b.slogan}</p>
                  
                  {b.id === 'infraestructura' && (
                    <div style={{ color: '#475569', fontSize: '1.15rem', lineHeight: 1.7 }}>
                      <p style={{ marginBottom: '1rem' }}><strong>Visión:</strong> Construir una Tunja más conectada, equitativa y competitiva, donde la infraestructura vial sea una herramienta de bienestar social, integración territorial y desarrollo humano. La movilidad no debe ser un privilegio, sino un derecho.</p>
                      <p style={{ marginBottom: '1rem' }}><strong>Misión:</strong> Transformar progresivamente la infraestructura vial urbana mediante intervenciones sostenibles, técnicamente eficientes y socialmente pertinentes.</p>
                      
                      <h4 style={{ color: '#0f172a', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem' }}>Componentes Estratégicos</h4>
                      <ul style={{ marginTop: '1.5rem', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Pavimentación Sostenible con Economía Circular:</strong> Mezclas asfálticas modificadas con caucho reciclado para mayor durabilidad y reducción de residuos.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Corredores para la Calidad de Vida:</strong> Priorización de vías que conectan hospitales, colegios y centros comunitarios.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Plan Cero Huecos y Seguridad Vial:</strong> Atención preventiva basada en analítica de datos e intervención en puntos críticos de accidentalidad.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Observatorio Ciudadano:</strong> Plataforma de gobierno abierto para reportar, monitorear y realizar seguimiento a cada obra.</div>
                        </li>
                      </ul>
                      
                      <div style={{ background: '#f8fafc', borderLeft: `4px solid ${b.color}`, padding: '1.5rem', borderRadius: '0 16px 16px 0', marginTop: '2rem' }}>
                        <h4 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>Metas Primeros 18 Meses</h4>
                        <p style={{ fontSize: '1rem' }}>Recuperar 30 km de vías urbanas estratégicas, intervenir 20 puntos críticos y reducir en 15% los tiempos de desplazamiento.</p>
                      </div>
                    </div>
                  )}

                  {b.id === 'innova' && (
                    <div style={{ color: '#475569', fontSize: '1.15rem', lineHeight: 1.7 }}>
                      <p style={{ marginBottom: '1rem' }}><strong>Visión:</strong> Convertir a Tunja en el principal ecosistema regional de innovación, emprendimiento, economía digital y desarrollo tecnológico del centro-oriente colombiano.</p>
                      <p style={{ marginBottom: '1rem' }}><strong>Misión:</strong> Diseñar e implementar una política integral de innovación y emprendimiento que articule universidades, sector privado, instituciones públicas, centros de investigación y ciudadanía.</p>
                      
                      <h4 style={{ color: '#0f172a', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem' }}>Componentes Estratégicos</h4>
                      <ul style={{ marginTop: '1.5rem', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Centro de Innovación y Coworking Juvenil:</strong> Incubación de emprendimientos y networking empresarial en un espacio especializado.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Fondo Hunza Emprende:</strong> Capital semilla municipal destinado a financiar emprendimientos de tecnología, innovación y economía creativa.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Academia de Innovación Digital:</strong> Formación gratuita y certificada en IA, programación y ciencia de datos.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Red de Mentores y Laboratorio de Soluciones:</strong> Asesoría especializada para resolver desafíos concretos de la ciudad.</div>
                        </li>
                      </ul>
                      
                      <div style={{ background: '#f8fafc', borderLeft: `4px solid ${b.color}`, padding: '1.5rem', borderRadius: '0 16px 16px 0', marginTop: '2rem' }}>
                        <h4 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>Metas Primeros 18 Meses</h4>
                        <p style={{ fontSize: '1rem' }}>Crear HUNZA INNOVA, financiar 50 emprendimientos, capacitar 2.000 jóvenes y generar 500 oportunidades laborales.</p>
                      </div>
                    </div>
                  )}

                  {b.id === 'seguridad' && (
                    <div style={{ color: '#475569', fontSize: '1.15rem', lineHeight: 1.7 }}>
                      <p style={{ marginBottom: '1rem' }}><strong>Visión:</strong> Transformar a Tunja en una de las ciudades más seguras del país, integrando tecnología de punta, analítica de datos y participación ciudadana para garantizar la tranquilidad en todos los barrios.</p>
                      <p style={{ marginBottom: '1rem' }}><strong>Misión:</strong> Pasar de un modelo reactivo a un modelo de prevención y predicción inteligente, priorizando la protección ciudadana en espacios públicos y comunitarios.</p>
                      
                      <h4 style={{ color: '#0f172a', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem' }}>Componentes Estratégicos</h4>
                      <ul style={{ marginTop: '1.5rem', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Anillo de Cámaras Inteligentes:</strong> Red de alta definición para monitorear en tiempo real todos los sectores críticos de la ciudad.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Sistemas Predictivos de Delito:</strong> Uso de data y analítica (mapas de calor interactivos) para anticipar áreas de riesgo e incrementar presencia preventiva.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Protección a Mujeres y Niños:</strong> Estrategias específicas de reacción inmediata, botones de pánico y rutas seguras en entornos escolares.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Red de Entornos Seguros:</strong> Recuperación de parques y zonas comunes, integrando iluminación LED y dispositivos de auxilio comunitarios.</div>
                        </li>
                      </ul>
                      
                      <div style={{ background: '#f8fafc', borderLeft: `4px solid ${b.color}`, padding: '1.5rem', borderRadius: '0 16px 16px 0', marginTop: '2rem' }}>
                        <h4 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>Metas Primeros 18 Meses</h4>
                        <p style={{ fontSize: '1rem' }}>Instalar el sistema central de monitoreo predictivo, equipar entornos escolares prioritarios con tecnología de seguridad y reducir el índice de delitos urbanos críticos.</p>
                      </div>
                    </div>
                  )}

                  {b.id === 'salud' && (
                    <div style={{ color: '#475569', fontSize: '1.15rem', lineHeight: 1.7 }}>
                      <p style={{ marginBottom: '1rem' }}><strong>Visión:</strong> Convertir a Tunja en la ciudad líder de Boyacá en atención primaria, prevención, salud digital y bienestar comunitario, garantizando que todos los ciudadanos accedan a servicios de calidad, cercanos y humanizados.</p>
                      <p style={{ marginBottom: '1rem' }}><strong>Misión:</strong> Implementar un modelo innovador de atención en salud basado en prevención, atención primaria, telemedicina, salud mental y atención territorial para acercar los servicios médicos a las comunidades.</p>
                      
                      <h4 style={{ color: '#0f172a', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem' }}>Componentes Estratégicos</h4>
                      <ul style={{ marginTop: '1.5rem', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Clínicas Móviles Periféricas:</strong> Unidades móviles de atención médica que recorrerán comunas y sectores rurales con medicina general, enfermería y prevención.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Red Municipal de Telemedicina:</strong> Red de atención digital para facilitar teleconsultas, seguimiento médico y acceso a especialistas con menores tiempos de espera.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Salud Mental para la Vida:</strong> Programa integral de promoción, atención psicológica comunitaria y prevención, prioritario para jóvenes, mujeres y adultos mayores.</div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '5px' }}/>
                          <div><strong>Ruta Integral para el Adulto Mayor:</strong> Programa especializado con valoración preventiva, atención domiciliaria y acompañamiento psicosocial.</div>
                        </li>
                      </ul>
                      
                      <div style={{ background: '#f8fafc', borderLeft: `4px solid ${b.color}`, padding: '1.5rem', borderRadius: '0 16px 16px 0', marginTop: '2rem' }}>
                        <h4 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>Metas Primeros 18 Meses</h4>
                        <p style={{ fontSize: '1rem' }}>Poner en funcionamiento tres Clínicas Móviles Periféricas, implementar la Red Municipal de Telemedicina, y brindar acompañamiento psicológico a 5.000 ciudadanos.</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* INDICADORES DE IMPACTO */}
      <section style={{ padding: '6rem 2rem', background: '#f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Lo que lograremos juntos</h2>
          <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '4rem' }}>Metas claras. Resultados visibles. Una nueva Tunja.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { num: '30+', label: 'Kilómetros recuperados', icon: <Milestone size={32}/> },
              { num: '5.000', label: 'Jóvenes beneficiados', icon: <Users size={32}/> },
              { num: '100+', label: 'Startups incubadas', icon: <Briefcase size={32}/> },
              { num: '24/7', label: 'Monitoreo inteligente', icon: <MonitorPlay size={32}/> }
            ].map((stat, i) => (
              <div key={i} style={{ background: '#fff', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.3s', cursor: 'default' }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', background: 'rgba(15,76,129,0.05)', padding: '1.2rem', borderRadius: '50%' }}>{stat.icon}</div>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{stat.num}</div>
                <div style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: 600, marginTop: '1rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRASES INSPIRADORAS */}
      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.3, letterSpacing: '-0.02em', fontStyle: 'italic' }}>
            "El futuro de Tunja no se espera, se construye. Más oportunidades. Más innovación. Más bienestar."
          </h2>
        </div>
      </section>

      {/* PARTICIPACIÓN CIUDADANA */}
      <section style={{ padding: '8rem 2rem', background: '#f8fafc', color: '#0f172a', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,76,129,0.1)', color: 'var(--primary)', padding: '0.6rem 1.5rem', borderRadius: '50px', fontWeight: 700, marginBottom: '2rem', border: '1px solid rgba(15,76,129,0.2)' }}>
            PARTICIPA
          </div>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em', color: '#0f172a' }}>Tu voz también construye la <span style={{color: 'var(--primary)'}}>Tunja 2.0</span></h2>
          <p style={{ color: '#64748b', fontSize: '1.3rem', marginBottom: '3rem' }}>
            Cada gran transformación comenzó con una idea. Escríbenos tu propuesta y construyamos juntos.
          </p>
          
          <div style={{ background: '#ffffff', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <textarea 
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              placeholder="Ej: Me gustaría proponer un laboratorio de robótica en el sur de la ciudad..."
              style={{ 
                width: '100%', height: '180px', padding: '1.5rem', borderRadius: '16px', 
                background: '#f8fafc', border: '1px solid rgba(0,0,0,0.1)', 
                color: '#0f172a', fontSize: '1.1rem', resize: 'none', marginBottom: '2rem',
                fontFamily: 'inherit'
              }}
            />
            <button 
              onClick={handleSubmitProposal}
              disabled={isSubmitting}
              style={{ 
                background: 'var(--primary)', 
                color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', 
                fontWeight: 800, fontSize: '1.1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer', width: '100%',
                boxShadow: '0 10px 30px rgba(15,76,129,0.3)', transition: 'all 0.3s',
                opacity: isSubmitting ? 0.7 : 1
              }}
              onMouseOver={e => { if(!isSubmitting) e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={e => { if(!isSubmitting) e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar propuesta ciudadana'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

