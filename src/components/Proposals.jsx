import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  MessageSquare,
  MapPin,
  Heart
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const img1 = 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%201.png';
const img2 = 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%202.png';
const img3 = 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%203.png';
const img4 = 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%204.png';
const img5 = 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%205.png';
const img6 = 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%206.png';

export default function Proposals() {
  const [activeBandera, setActiveBandera] = useState(null);
  const [proposalText, setProposalText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentAportes, setRecentAportes] = useState([]);
  const [loadingAportes, setLoadingAportes] = useState(false);

  const fetchRecentAportes = async () => {
    setLoadingAportes(true);
    try {
      const { getDocs, collection } = await import('firebase/firestore');
      const snap = await getDocs(collection(db, 'tu_voz_construye_tunja'));
      const items = snap.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, ...data };
      })
      .sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      setRecentAportes(items);
    } catch (err) {
      console.error("Error fetching recent proposals:", err);
    } finally {
      setLoadingAportes(false);
    }
  };

  useEffect(() => {
    fetchRecentAportes();
  }, []);

  const handleSubmitProposal = async () => {
    if(!proposalText.trim()) { 
      alert('Por favor escribe tu idea.'); 
      return; 
    }
    
    setIsSubmitting(true);
    try {
      const currentUser = auth.currentUser;
      const autorName = currentUser ? (currentUser.displayName || currentUser.email) : 'Ciudadano Tunja 2.0';
      const autorEmail = currentUser ? currentUser.email : 'anonimo@tunja.gov.co';

      await addDoc(collection(db, 'tu_voz_construye_tunja'), {
        autor: autorName,
        email: autorEmail,
        titulo: 'Nueva propuesta ciudadana',
        contenido: proposalText,
        origen: 'Las 5 de Nico',
        createdAt: serverTimestamp()
      });

      window.dispatchEvent(new CustomEvent('nico-celebrate', { 
        detail: { 
          message: '¡Espectacular! Tu propuesta ha sido registrada en "Las 5 de Nico". ¡Gracias por sumar tu voz!' 
        } 
      }));
      alert('¡Idea enviada exitosamente y registrada como aporte!');
      setProposalText('');
      fetchRecentAportes();
    } catch (error) {
      console.error('Error detallado:', error);
      alert(`Hubo un error al enviar tu idea: ${error.message}. Revisa la consola o configuración de Firebase.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const banderas = [
    {
      id: 'movilidad',
      title: 'Tunja Se Mueve: Transporte y Movilidad',
      slogan: '"Transformar la movilidad de Tunja no es solo un asunto de pavimentar calles, es el eje fundamental para construir una ciudad verdaderamente moderna, habitable y equitativa."',
      icon: <Target size={32} />,
      image: img1, color: '#0ea5e9'
    },
    {
      id: 'empleo',
      title: 'Me Quedo en Tunja: Empleo y Economía Local',
      slogan: '"No podemos seguir exportando talento humano; necesitamos encender la economía local."',
      icon: <Briefcase size={32} />,
      image: img2, color: '#8b5cf6'
    },
    {
      id: 'seguridad',
      title: 'Estoy Seguro en Tunja: Seguridad y Convivencia',
      slogan: '"La tranquilidad de los tunjanos no se negocia con discursos, se defiende con autoridad y gerencia."',
      icon: <Shield size={32} />,
      image: img3, color: '#f59e0b'
    },
    {
      id: 'dignidad',
      title: 'Tunja Digna: Dignidad Social, Educación y Salud',
      slogan: '"Queremos una ciudad donde el barrio en el que naces no condicione tu futuro, y donde el acceso a una vida digna sea un derecho garantizado."',
      icon: <HeartPulse size={32} />,
      image: img4, color: '#10b981'
    },
    {
      id: 'viva',
      title: 'Tunja Viva: Nuestra Ciudad, Nuestra Gente',
      slogan: '"Gobernar a Tunja desde adentro significa reconocer que la ciudad no se construye únicamente desde las instituciones, sino desde las esquinas, los parques y las comunidades que les dan vida."',
      icon: <Users size={32} />,
      image: img5, color: '#e11d48'
    }
  ];

  return (
    <div className="las4nico-container animate-fade-in" style={{ 
      color: 'var(--text-primary)', 
      background: 'var(--bg-primary)', 
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
      border: '1px solid var(--border-color)',
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
          backgroundImage: `url(${img6})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.05)',
          animation: 'slowZoom 20s infinite alternate ease-in-out',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(248, 250, 252, 0.95) 0%, rgba(248, 250, 252, 0.6) 100%)',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'left', maxWidth: '1000px', width: '100%' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(255,255,255,0.85)', 
            padding: '0.6rem 1.5rem', 
            borderRadius: '50px',
            marginBottom: '2rem',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.4)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <Target size={18} fill="var(--primary)" color="var(--primary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--primary)' }}>
              Ingresa y construyamos juntos la Tunja del futuro
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(4rem, 8vw, 6.5rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.05em',
            margin: '0 0 1rem 0',
            lineHeight: 1,
            color: 'var(--text-primary)'
          }}>
            LAS 5 DE <span style={{ color: 'var(--secondary)', textShadow: '0 10px 30px rgba(0,229,255,0.2)' }}>NICO</span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', 
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            fontWeight: 800,
            lineHeight: 1.2,
          }}>
            "Una visión moderna para construir la Tunja 2.0."
          </p>

          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            fontWeight: 500,
            maxWidth: '600px',
            lineHeight: 1.6
          }}>
            Cinco grandes apuestas para transformar la calidad de vida de todos los tunjanos. 
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
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
              boxShadow: '0 15px 30px rgba(74, 0, 114, 0.4)',
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
      <section id="ecosistema-pilares" style={{ padding: '8rem 2rem', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at center, rgba(15,76,129,0.03) 0%, transparent 70%)',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4rem', letterSpacing: '-0.03em' }}>
            Descubre el ecosistema Tunja 2.0
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: activeBandera ? '2.5rem' : '0', transition: 'margin 0.3s' }}>
            {banderas.map((bandera, i) => (
              <div 
                key={bandera.id}
                onClick={() => setActiveBandera(bandera.id === activeBandera ? null : bandera.id)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: activeBandera === bandera.id ? bandera.color : '#ffffff',
                  border: `1px solid ${activeBandera === bandera.id ? bandera.color : 'rgba(15,76,129,0.1)'}`,
                  borderRadius: '24px',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeBandera === bandera.id ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: activeBandera === bandera.id ? `0 15px 30px ${bandera.color}50` : '0 10px 30px rgba(0,0,0,0.08)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  minHeight: '220px',
                  justifyContent: 'flex-end',
                }}
                onMouseOver={e => {
                  if (activeBandera !== bandera.id) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.12)';
                    if(e.currentTarget.querySelector('.card-bg-overlay')) e.currentTarget.querySelector('.card-bg-overlay').style.opacity = '0.85';
                  }
                }}
                onMouseOut={e => {
                  if (activeBandera !== bandera.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                    if(e.currentTarget.querySelector('.card-bg-overlay')) e.currentTarget.querySelector('.card-bg-overlay').style.opacity = '0.95';
                  }
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: `url(${bandera.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0,
                  transition: 'transform 0.5s ease',
                  transform: activeBandera === bandera.id ? 'scale(1.1)' : 'scale(1)',
                }} />
                
                <div className="card-bg-overlay" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: activeBandera === bandera.id 
                    ? `linear-gradient(to top, ${bandera.color} 0%, rgba(255,255,255,0.3) 100%)`
                    : 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 100%)',
                  zIndex: 1,
                  transition: 'all 0.4s ease',
                  opacity: activeBandera === bandera.id ? 0.8 : 0.95
                }} />

                {/* Progress dot indicator */}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 2 }}>
                  <div style={{ 
                    width: '8px', height: '8px', borderRadius: '50%', 
                    background: activeBandera === bandera.id ? '#fff' : bandera.color,
                    boxShadow: activeBandera === bandera.id ? `0 0 10px var(--bg-glass)` : `0 0 10px ${bandera.color}`
                  }}></div>
                </div>

                <div style={{ 
                  position: 'relative', zIndex: 2,
                  background: activeBandera === bandera.id ? 'rgba(255,255,255,0.25)' : 'var(--bg-glass)', 
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  color: activeBandera === bandera.id ? '#ffffff' : bandera.color, 
                  width: '56px', height: '56px', borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  transition: 'all 0.3s ease',
                  marginBottom: 'auto',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  {bandera.icon}
                </div>
                
                <h3 style={{ 
                  position: 'relative', zIndex: 2, 
                  fontSize: '1.3rem', fontWeight: 800, 
                  color: activeBandera === bandera.id ? '#ffffff' : '#0f172a', lineHeight: 1.25,
                  textShadow: activeBandera === bandera.id ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'
                }}>
                  {bandera.title}
                </h3>
              </div>
            ))}
          </div>

          {/* PANEL DE DETALLE INFERIOR DINÁMICO */}
          {activeBandera && (
            <div 
              className="animate-fade-in glass"
              style={{
                borderRadius: '24px', width: '100%',
                position: 'relative', textAlign: 'left',
                overflow: 'hidden',
                marginTop: '1rem'
              }}
            >
              {banderas.map((b) => b.id === activeBandera && (
                <div key={b.id}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
                    <div style={{ 
                        flex: '1 1 300px', minHeight: '300px',
                        backgroundImage: `url(${b.image})`, 
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))` }} />
                    </div>
                    
                    <div style={{ flex: '2 1 400px', padding: 'clamp(2rem, 5vw, 3.5rem)', background: 'var(--bg-card)', position: 'relative' }}>
                      <button 
                        onClick={() => setActiveBandera(null)}
                        style={{
                          position: 'absolute', top: '1.5rem', right: '1.5rem',
                          background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '50%',
                          width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', transition: 'background 0.2s', zIndex: 10,
                          fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                      >
                        ×
                      </button>

                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: `${b.color}15`, color: b.color, padding: '0.6rem 1.2rem', borderRadius: '50px', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <div style={{ marginRight: '0.5rem', display: 'flex' }}>{b.icon}</div>
                        Visión Programática
                      </div>
                      <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{b.title}</h2>
                      <p style={{ fontSize: '1.25rem', color: b.color, fontStyle: 'italic', fontWeight: 600, marginBottom: '2rem' }}>{b.slogan}</p>
                      
                      {b.id === 'movilidad' && (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                          <p style={{ marginBottom: '1rem' }}><strong>Visión:</strong> Construir una ciudad verdaderamente moderna, habitable y equitativa. Nuestro compromiso va más allá de la gestión urbana tradicional: nos enfocamos en diseñar un entorno público seguro, eficiente y pensado para el bienestar y el encuentro de todos los tunjanos.</p>
                          
                          <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem' }}>Líneas de Acción</h4>
                          <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Mantenimiento Permanente:</strong> Implementar cuadrillas de mantenimiento vial permanentes.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Infraestructura Verde de Alta Resistencia:</strong> Adoptar asfalto con Grano de Caucho Reciclado (GCR) para mayor durabilidad y menor impacto.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Redes de Microconectividad Urbana:</strong> Circuitos de conectividad interna para descongestionar arterias principales.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Urbanismo Vivo y Entornos Saludables:</strong> Revitalización de espacios públicos a escala humana.</div>
                            </li>
                          </ul>
                        </div>
                      )}

                      {b.id === 'empleo' && (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                          <p style={{ marginBottom: '1rem' }}><strong>Visión:</strong> Tunja es la capital universitaria y cultural, no podemos seguir rezagados. Nuestro compromiso es transformar la ciudad en un territorio atractivo para la inversión, competitivo para los empresarios y digno para los trabajadores.</p>
                          
                          <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem' }}>Líneas de Acción</h4>
                          <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Incentivos Tributarios:</strong> Paquete de estímulos locales para atraer inversiones a las (Mipymes).</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>HUNZA INNOVA:</strong> Adecuación de Centro de innovación con Coworking de alta velocidad y laboratorios de software.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Bolsa Pública de Empleo Juvenil:</strong> Intermediación y acompañamiento laboral para nuestros jóvenes.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Programa Mujeres Emprendedoras:</strong> Capital semilla autónomo y redes de comercialización.</div>
                            </li>
                          </ul>
                        </div>
                      )}

                      {b.id === 'seguridad' && (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                          <p style={{ marginBottom: '1rem' }}><strong>Visión:</strong> Nuestra meta es recuperar la paz en las calles, reconstruir la confianza entre los vecinos y transformar la administración municipal en un motor transparente, eficiente y libre de las mañas de la vieja política.</p>
                          
                          <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem' }}>Líneas de Acción</h4>
                          <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Esquema Dinámico de Cuadrantes:</strong> Rotación enfocada en días de mayor riesgo (viernes y sábados) y meses críticos.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Videovigilancia Estratégica:</strong> Instalar cámaras en los cinco puntos de mayor tránsito peatonal y comercial.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Brigadas Mixtas:</strong> Patrullaje peatonal coordinado entre la Policía y "Guardianes Ciudadanos".</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Sistema de Alerta Temprana de Reincidencia (SATER):</strong> Prevención e identificación de hogares con reportes reiterativos.</div>
                            </li>
                          </ul>
                        </div>
                      )}

                      {b.id === 'dignidad' && (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                          <p style={{ marginBottom: '1rem' }}><strong>Visión:</strong> Asumimos el compromiso ético y legal de nivelar la cancha para que el acceso a una vida digna sea un derecho garantizado, priorizando la Salud y la Educación de calidad.</p>
                          
                          <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem' }}>Líneas de Acción</h4>
                          <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Salud Cerca de Ti:</strong> Modelo innovador enfocado en determinantes de salud, promoviendo atención familiar integral.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Garantía PAE y Nutrición:</strong> Raciones en caliente para institutions públicas, cerrando la brecha de pobreza.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Mentores:</strong> Programa de asistencia escolar gratuita y alfabetización tanto tradicional como digital sin distinción alguna.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Salud Rural Inclusiva:</strong> Implementar auxiliares de salud y la figura del Promotor de Salud en cada vereda comunitaria.</div>
                            </li>
                          </ul>
                        </div>
                      )}

                      {b.id === 'viva' && (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                          <p style={{ marginBottom: '1rem' }}><strong>Visión:</strong> Gobernar a Tunja desde adentro. Devolver la fiesta, el cuidado y el espacio público a quienes realmente les pertenecen, asegurando que cada habitante tenga un lugar.</p>
                          
                          <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem' }}>Líneas de Acción</h4>
                          <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Circuito del Aguinaldo Boyacense:</strong> Fiestas descentralizadas por barrios y veredas de Tunja, integrando juntas de acción comunal (JAC) y líderes.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Acceso por Intercambio Solidario:</strong> Eliminación de boletería en eventos y reemplazo por aportes en alimentos no perecederos u otros donativos vitales.</div>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                              <CheckCircle2 color={b.color} size={20} style={{ flexShrink: 0, marginTop: '4px' }}/>
                              <div><strong>Fin del Clientelismo en Eventos:</strong> Derogación de zonas preferentes o "VIP" para corporados y funcionarios en fiestas públicas, todos somos iguales en la celebración.</div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* INDICADORES DE IMPACTO EN TIEMPO REAL */}
      <section style={{ padding: '6rem 2rem', background: '#f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Lo que logramos juntos</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '4rem' }}>La fuerza de nuestra campaña está en la gente. Únete al movimiento.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { num: '30+', label: 'Ciudadanos Registrados', icon: <Users size={32}/> },
              { num: '850+', label: 'Propuestas Recibidas', icon: <MessageSquare size={32}/> },
              { num: '45', label: 'Barrios Impactados', icon: <MapPin size={32}/> },
              { num: '24', label: 'Eventos Realizados', icon: <Target size={32}/> },
              { num: '120', label: 'Voluntarios Vinculados', icon: <Heart size={32}/> }
            ].map((stat, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.3s', cursor: 'default' }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', background: 'rgba(74,0,114,0.05)', padding: '1.2rem', borderRadius: '50%' }}>{stat.icon}</div>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{stat.num}</div>
                <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '1rem' }}>{stat.label}</div>
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
      <section style={{ padding: '8rem 2rem', background: 'var(--bg-primary)', color: 'var(--text-primary)', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(74,0,114,0.1)', color: 'var(--primary)', padding: '0.6rem 1.5rem', borderRadius: '50px', fontWeight: 700, marginBottom: '2rem', border: '1px solid rgba(74,0,114,0.2)' }}>
            PARTICIPA
          </div>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>Tu Voz Construye Tunja</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', marginBottom: '3rem' }}>
            Cada gran transformación comenzó con una idea. Escríbenos tu propuesta, reporta una necesidad o comparte tus ideas.
          </p>
          
          <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <textarea 
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              placeholder="Ej: Me gustaría proponer un laboratorio de robótica en el sur de la ciudad..."
              style={{ 
                width: '100%', height: '180px', padding: '1.5rem', borderRadius: '16px', 
                background: 'var(--bg-primary)', border: '1px solid var(--border-color)', 
                color: 'var(--text-primary)', fontSize: '1.1rem', resize: 'none', marginBottom: '2rem',
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
                <div className="nico-btn-avatar-container" style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', transition: 'transform 0.3s ease' }}>
                  <img className="nico-btn-avatar" src="/CaraNico.png" alt="Nico" style={{ width: '90%', height: '90%', objectFit: 'contain', transition: 'all 0.3s ease' }} />
                </div>
                <span>{isSubmitting ? 'Enviando...' : 'Enviar propuesta ciudadana'}</span>
              </div>
            </button>
          </div>

          {/* Live Citizen Proposals List */}
          <div style={{ marginTop: '4rem', textAlign: 'left', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid rgba(15,76,129,0.1)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={22} color="var(--primary)" />
                Propuestas de la Comunidad ({recentAportes.length})
              </h3>
              <button 
                onClick={fetchRecentAportes} 
                style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                Actualizar
              </button>
            </div>

            {loadingAportes ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                <span>Cargando aportes ciudadanos...</span>
              </div>
            ) : recentAportes.length === 0 ? (
              <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)' }}>
                ¡Sé el primero en enviar tu propuesta para Las 5 de Nico!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentAportes.map((aporte) => {
                  let formattedDate = '';
                  if (aporte.createdAt) {
                    const dateObj = aporte.createdAt.seconds ? new Date(aporte.createdAt.seconds * 1000) : new Date(aporte.createdAt);
                    formattedDate = dateObj.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
                  }
                  return (
                    <div key={aporte.id} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '1rem' }}>{aporte.autor || 'Anónimo'}</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '500' }}>{formattedDate}</span>
                      </div>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{aporte.contenido}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

