import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Compass, 
  Cpu, 
  HeartPulse, 
  Mic, 
  GraduationCap, 
  ChevronRight, 
  Activity, 
  BookOpen, 
  Laptop, 
  AlertCircle
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import jovenHero from '../assets/images/juventud_hero_bg_1781796298041.jpg';
import saberPlus from '../assets/images/saber_plus_education_1780673508458.png';

import hunzaInnovaLogo from '../assets/images/hunza_innova_logo_new_1781795880983.jpg';
import hunzaCoworking from '../assets/images/hunza_coworking_1781795183297.jpg';
import hunzaEmprende from '../assets/images/hunza_emprende_1781795196117.jpg';
import hunzaAcademia from '../assets/images/hunza_academia_1781795206713.jpg';
import hunzaMentores from '../assets/images/hunza_mentores_1781795218616.jpg';

// New generated images for ecosystem
import imgGobiernoJoven from '../assets/images/gobierno_joven_1781794765501.jpg';
import imgSaberPlus from '../assets/images/saber_plus_1781794775793.jpg';
import imgTalentoTunjano from '../assets/images/talento_tunjano_1781794787052.jpg';
import imgConectaTunja from '../assets/images/conecta_tunja_1781794798960.jpg';
import imgJovenesBienestar from '../assets/images/jovenes_bienestar_1781794811019.jpg';
import imgEscuelaLiderazgo from '../assets/images/escuela_liderazgo_1781794823224.jpg';

export default function Joven20() {
  const [activeTabDiagnostico, setActiveTabDiagnostico] = useState('ciudad');
  
  const [activeEcosystem, setActiveEcosystem] = useState('coworking');
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalText, setProposalText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentAportes, setRecentAportes] = useState([]);
  const [loadingAportes, setLoadingAportes] = useState(false);

  const fetchRecentAportes = async () => {
    setLoadingAportes(true);
    try {
      const { getDocs, collection } = await import('firebase/firestore');
      const snap = await getDocs(collection(db, 'ecosistema_joven'));
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
      console.error("Error fetching recent Joven proposals:", err);
    } finally {
      setLoadingAportes(false);
    }
  };

  useEffect(() => {
    fetchRecentAportes();
  }, []);

  const handleSubmitProposal = async () => {
    if(!proposalText.trim()) { 
      alert('Por favor escribe una propuesta antes de enviar.'); 
      return; 
    }
    
    setIsSubmitting(true);
    try {
      const currentUser = auth.currentUser;
      const autorName = currentUser ? (currentUser.displayName || currentUser.email) : 'Joven Tunja 2.0';
      const autorEmail = currentUser ? currentUser.email : 'joven_anonimo@tunja.gov.co';

      await addDoc(collection(db, 'ecosistema_joven'), {
        autor: autorName,
        email: autorEmail,
        titulo: 'Nueva idea ecosistema joven',
        contenido: proposalText,
        origen: 'Ecosistema Joven 2.0',
        createdAt: serverTimestamp()
      });

      window.dispatchEvent(new CustomEvent('nico-celebrate', { 
        detail: { 
          message: '¡Excelente propuesta! Tu aporte ha sido enviado con éxito al Laboratorio del Ecosistema Joven 2.0.' 
        } 
      }));
      alert('¡Propuesta enviada con éxito al Laboratorio del Ecosistema!');
      setShowProposalForm(false);
      setProposalText('');
      fetchRecentAportes();
    } catch (error) {
      console.error('Error detallado:', error);
      alert(`Hubo un error al enviar tu idea: ${error.message}. Revisa la consola o configuración de Firebase.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [testStarted, setTestStarted] = useState(false);
  const [testQuestion, setTestQuestion] = useState(0);
  const [testScores, setTestScores] = useState({
    'Líder Comunitario': 0, 'Innovador Digital': 0, 'Emprendedor': 0
  });
  const [testResult, setTestResult] = useState(null);

  const questions = [
    {
      q: "¿Qué actividad disfrutas más en tu tiempo libre?",
      o: [
        { text: "Idear nuevos negocios o proyectos", roll: "Emprendedor" },
        { text: "Ayudar y organizar actividades en mi barrio", roll: "Líder Comunitario" },
        { text: "Aprender sobre tecnología y apps", roll: "Innovador Digital" }
      ]
    },
    {
      q: "¿Cómo te gustaría aportar a la Tunja 2.0?",
      o: [
        { text: "Creando empleo y empresas locales", roll: "Emprendedor" },
        { text: "Representando la voz de los jóvenes", roll: "Líder Comunitario" },
        { text: "Desarrollando soluciones de software", roll: "Innovador Digital" }
      ]
    },
    {
      q: "¿Qué herramienta consideras más útil para cambiar la ciudad?",
      o: [
        { text: "Un plan de negocios sólido", roll: "Emprendedor" },
        { text: "El diálogo, la empatía y la unión", roll: "Líder Comunitario" },
        { text: "Código, datos e inteligencia artificial", roll: "Innovador Digital" }
      ]
    }
  ];

  const handleTestAnswer = (roll) => {
    const newScores = { ...testScores, [roll]: testScores[roll] + 1 };
    setTestScores(newScores);
    if (testQuestion < questions.length - 1) {
      setTestQuestion(testQuestion + 1);
    } else {
      const topRoll = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
      setTestResult(topRoll);
    }
  };

  const diagnosticoContent = {
    'ciudad': { title: 'Ciudad Universitaria', icon: <GraduationCap size={20}/>, text: 'Tunja posee una condición privilegiada dentro del contexto regional. Miles de jóvenes de diferentes municipios desarrollan sus procesos de formación académica, generando una importante dinámica.' },
    'brechas': { title: 'Educación y Brechas', icon: <AlertCircle size={20}/>, text: 'Muchos jóvenes enfrentan dificultades para acceder a formación en competencias estratégicas como: Inglés, Programación, Inteligencia artificial, Liderazgo, lo que reduce la competitividad.' },
    'fuga': { title: 'Empleo Juvenil y Fuga de Talento', icon: <TrendingUp size={20}/>, text: 'La limitada diversificación económica dificulta generar empleos de calidad. Numerosos jóvenes se ven obligados a migrar hacia grandes ciudades en búsqueda de oportunidades, generando pérdida de capital humano.' },
    'participacion': { title: 'Participación Limitada', icon: <Users size={20}/>, text: 'Los mecanismos existentes suelen percibirse como espacios consultivos con escasa incidencia presupuestal. Esta situación limita la construcción de ciudadanía activa.' }
  };

  return (
    <div className="joven20-container animate-fade-in" style={{ 
      color: 'var(--text-primary)', 
      background: 'var(--bg-primary)', 
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
      border: '1px solid var(--border-color)'
    }}>
      {/* HERO SECTION */}
      <section style={{ 
        position: 'relative', 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${jovenHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          opacity: 0.8,
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(248, 250, 252, 0.2) 0%, rgba(248, 250, 252, 0.95) 100%)',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'var(--bg-glass)', 
            padding: '0.5rem 1rem', 
            borderRadius: '50px',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
          }}>
            <Sparkles size={16} fill="var(--primary)" color="var(--primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary)' }}>
              La generación que lidera la transformación
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.04em',
            margin: '0 0 1rem 0',
            lineHeight: 1.1,
            color: 'var(--text-primary)'
          }}>
            Juventud <span style={{ color: 'var(--primary)' }}>Tunja 2.0</span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', 
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: '650px',
            margin: '0 auto 3rem auto'
          }}>
            La juventud no es el futuro de Tunja. <strong style={{ color: 'var(--primary)' }}>Es su presente más valioso.</strong> Convierte tus sueños en los proyectos de nuestra ciudad.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => document.getElementById('ecosistema').scrollIntoView({behavior: 'smooth'})}
              style={{
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 10px 25px rgba(74, 0, 114, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Explorar oportunidades <ChevronRight size={20} />
            </button>
            <button 
              onClick={() => setShowProposalForm(!showProposalForm)}
              style={{
              background: showProposalForm ? 'var(--primary)' : '#fff',
              color: showProposalForm ? '#fff' : 'var(--primary)',
              border: showProposalForm ? 'none' : '1px solid rgba(0,0,0,0.1)',
              padding: '1rem 2rem',
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => !showProposalForm && (e.currentTarget.style.background = '#f1f5f9')}
            onMouseOut={e => !showProposalForm && (e.currentTarget.style.background = '#fff')}
            >
              Construyamos la Tunja 2.0
            </button>
          </div>

          {showProposalForm && (
            <div className="animate-fade-in" style={{ marginTop: '2rem', background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', maxWidth: '700px', margin: '2rem auto 0 auto', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Ecosistema Joven 2.0</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>Las grandes transformaciones comienzan con una idea. Cuéntanos la tuya para construir la Tunja 2.0.</p>
              <textarea 
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                placeholder="Describe tu idea detalladamente..."
                style={{ width: '100%', height: '150px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', resize: 'none', fontSize: '1rem', fontFamily: 'inherit', color: 'var(--text-primary)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
                <button 
                  onClick={() => setShowProposalForm(false)}
                  style={{ background: 'transparent', color: 'var(--text-muted)', padding: '0.8rem 1.5rem', borderRadius: '50px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button 
                  onClick={handleSubmitProposal}
                  disabled={isSubmitting}
                  style={{ background: 'var(--primary)', color: '#fff', padding: '0.8rem 2rem', borderRadius: '50px', border: 'none', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 4px 15px rgba(15,76,129,0.2)', opacity: isSubmitting ? 0.7 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
                    <div className="nico-btn-avatar-container" style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s ease' }}>
                      <img className="nico-btn-avatar" src="/CaraNico.png" alt="Nico" style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'all 0.3s ease' }} />
                    </div>
                    <span>{isSubmitting ? 'Enviando...' : 'Enviar Propuesta'}</span>
                  </div>
                </button>
              </div>

              {/* Dynamic community feed inside the proposal section of Joven20 */}
              <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={18} color="var(--primary)" />
                    Ideas de la Comunidad Joven ({recentAportes.length})
                  </h4>
                  <button 
                    onClick={fetchRecentAportes} 
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Actualizar
                  </button>
                </div>

                {loadingAportes ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>Cargando ideas de jóvenes...</span>
                  </div>
                ) : recentAportes.length === 0 ? (
                  <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    ¡Sé el primero en aportar una propuesta al Ecosistema Joven!
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                    {recentAportes.map((aporte) => {
                      let formattedDate = '';
                      if (aporte.createdAt) {
                        const dateObj = aporte.createdAt.seconds ? new Date(aporte.createdAt.seconds * 1000) : new Date(aporte.createdAt);
                        formattedDate = dateObj.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
                      }
                      return (
                        <div key={aporte.id} style={{ background: 'var(--bg-primary)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                            <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.95rem' }}>{aporte.autor || 'Anónimo'}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formattedDate}</span>
                          </div>
                          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{aporte.contenido}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DIAGNOSTIC / DASHBOARD */}
      <section style={{ padding: '6rem 2rem', background: 'var(--bg-card)', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Diagnóstico de la Situación
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
              La juventud constituye uno de los principales activos estratégicos para el desarrollo de las ciudades contemporáneas. Presentamos la realidad actual de nuestra capital.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {Object.keys(diagnosticoContent).map((key) => (
                <button key={key} onClick={() => setActiveTabDiagnostico(key)} style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: activeTabDiagnostico === key ? 'var(--bg-primary)' : 'transparent',
                  border: `1px solid ${activeTabDiagnostico === key ? 'rgba(0,0,0,0.1)' : 'transparent'}`,
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontWeight: 600,
                  color: activeTabDiagnostico === key ? 'var(--primary)' : '#64748b',
                  transition: 'all 0.3s'
                }}>
                  {diagnosticoContent[key].icon} {diagnosticoContent[key].title}
                </button>
              ))}
            </div>
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: '32px',
              padding: '4rem',
              border: '1px solid rgba(15,76,129,0.05)',
              minHeight: '350px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
            }}>
              <div 
                className="animate-fade-in"
                style={{ 
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                  background: activeTabDiagnostico === 'ciudad' ? 'radial-gradient(circle at 100% 0%, rgba(15,76,129,0.08) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(0,184,217,0.08) 0%, transparent 50%)' :
                              activeTabDiagnostico === 'brechas' ? 'radial-gradient(circle at 100% 0%, rgba(239,68,68,0.08) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(245,158,11,0.08) 0%, transparent 50%)' :
                              activeTabDiagnostico === 'fuga' ? 'radial-gradient(circle at 100% 0%, rgba(16,185,129,0.08) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(14,165,233,0.08) 0%, transparent 50%)' :
                              'radial-gradient(circle at 100% 0%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(236,72,153,0.08) 0%, transparent 50%)',
                  zIndex: 0
                }}
              ></div>
              
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(15,76,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,76,129,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 0 }}></div>
              <h3 style={{ position: 'relative', zIndex: 2, fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                {diagnosticoContent[activeTabDiagnostico].title}
              </h3>
              <p style={{ position: 'relative', zIndex: 2, fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.8, fontWeight: 500 }}>
                {diagnosticoContent[activeTabDiagnostico].text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMAS ESTRATÉGICOS */}
      <section id="ecosistema" style={{ padding: '6rem 2rem', background: 'var(--bg-primary)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-block', background: 'rgba(74, 0, 114, 0.1)', color: 'var(--primary)', padding: '0.4rem 1.2rem', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>Propuesta Programática</div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Ecosistema Joven 2.0</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
              Convertir a Tunja en la ciudad líder de Colombia en innovación, formación digital y generación de oportunidades.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Gobierno Abierto Joven', icon: <Mic />, desc: 'Destinar recursos específicos para proyectos juveniles y plataforma de deliberación.', bg: imgGobiernoJoven },
              { title: 'Saber Plus 2.0', icon: <BookOpen />, desc: 'Inglés, pensamiento matemático, programación, inteligencia artificial.', bg: imgSaberPlus },
              { title: 'Talento Tunjano', icon: <Briefcase />, desc: 'Reducir el desempleo juvenil, incentivos y plataforma digital de empleo.', bg: imgTalentoTunjano },
              { title: 'Conecta Tunja', icon: <TrendingUp />, desc: 'Apoyos en transporte, conectividad y material para permanencia educativa.', bg: imgConectaTunja },
              { title: 'Jóvenes con Bienestar', icon: <HeartPulse />, desc: 'Atención psicosocial, actividades deportivas y redes de apoyo.', bg: imgJovenesBienestar },
              { title: 'Escuela de Liderazgo', icon: <Compass />, desc: 'Formación anual de líderes comunitarios, ambientales y tecnológicos.', bg: imgEscuelaLiderazgo }
            ].map((program, i) => (
              <div key={i} style={{
                position: 'relative',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '2rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                overflow: 'hidden'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                e.currentTarget.querySelector('.program-bg').style.opacity = '0.15';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
                e.currentTarget.querySelector('.program-bg').style.opacity = '0.05';
              }}
              >
                <div className="program-bg" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${program.bg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05, transition: 'opacity 0.3s' }}></div>
                <div style={{ position: 'relative', zIndex: 1, background: 'var(--primary)', color: '#fff', padding: '1rem', borderRadius: '12px' }}>
                  {program.icon}
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{program.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>{program.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIOUS HUNZA INNOVA SECTION HAS BEEN REPLACED BY EXPLORAR EL ECOSISTEMA */}

      {/* ECOSYSTEM / EXPLORAR EL ECOSISTEMA (HUNZA INNOVA) */}
      <section style={{ 
        position: 'relative',
        padding: '8rem 2rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'var(--bg-primary)',
        overflow: 'hidden'
      }}>
        {/* Animated background stars/particles placeholder */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at center, rgba(15,76,129,0.05) 0%, transparent 60%)',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="logo-pulse-container" style={{ margin: '0 auto 2.5rem', width: '240px', height: '240px', position: 'relative' }}>
              {/* Neural impulse network effect wrappers */}
              <div style={{ position: 'absolute', top: '-10%', left: '-10%', right: '-10%', bottom: '-10%', background: 'radial-gradient(circle, rgba(0,184,217,0.1) 0%, transparent 70%)', borderRadius: '50%', animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite', zIndex: 0 }}></div>
              <div style={{ position: 'absolute', top: '-5%', left: '-5%', right: '-5%', bottom: '-5%', border: '1px solid rgba(0,184,217,0.2)', borderRadius: '50%', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', zIndex: 0 }}></div>
              <div style={{ position: 'absolute', top: '0%', left: '0%', right: '0%', bottom: '0%', border: '2px dashed rgba(109,93,252,0.3)', borderRadius: '50%', animation: 'spin 15s linear infinite', zIndex: 0 }}></div>
              <img src={hunzaInnovaLogo} alt="Hunza Innova Logo" style={{ position: 'relative', height: '100%', width: '100%', objectFit: 'contain', borderRadius: '24px', boxShadow: '0 15px 50px rgba(0,0,0,0.12)', zIndex: 1, animation: 'float 6s ease-in-out infinite' }} />
            </div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Explorar el Ecosistema
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
              Navega por el ecosistema de innovación tecnológica más avanzado de la región, diseñado para conectar, formar y financiar a la próxima generación de líderes digitales.
            </p>
          </div>

          <div className="ecosystem-grid">
            
            {/* Ecosistema Navigation Sidebar */}
            <div className="nav-tab-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', height: 'fit-content', background: 'transparent', border: 'none', boxShadow: 'none' }}>
              {[
                { id: 'coworking', title: 'Centro de Innovación', icon: <Laptop size={18}/>, subtitle: 'Coworking y Laboratorios' },
                { id: 'fondo', title: 'Fondo Hunza Emprende', icon: <TrendingUp size={18}/>, subtitle: 'Capital Semilla' },
                { id: 'academia', title: 'Academia Digital', icon: <Cpu size={18}/>, subtitle: 'Inteligencia Artificial' },
                { id: 'mentores', title: 'Red de Mentores', icon: <Users size={18}/>, subtitle: 'Laboratorio de Soluciones' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveEcosystem(item.id)}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: `1px solid ${activeEcosystem === item.id ? 'rgba(15,76,129,0.2)' : 'rgba(0,0,0,0.05)'}`,
                    background: activeEcosystem === item.id ? 'rgba(15,76,129,0.05)' : '#ffffff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: activeEcosystem === item.id ? 'none' : '0 4px 15px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ color: activeEcosystem === item.id ? 'var(--primary)' : '#64748b', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                    {item.icon} <span style={{ fontWeight: 700, fontSize: '1.1rem', color: activeEcosystem === item.id ? '#0f172a' : '#475569' }}>{item.title}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', paddingLeft: '2.5rem' }}>
                    {item.subtitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Ecosistema Content Area */}
            <div style={{ 
              background: 'var(--bg-card)', 
              borderRadius: '24px', 
              border: '1px solid var(--border-color)', 
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '600px',
              position: 'relative'
            }}>
              
              {activeEcosystem === 'coworking' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ height: '300px', backgroundImage: `url(${hunzaCoworking})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)' }} />
                  </div>
                  <div style={{ padding: '3rem', flex: 1 }}>
                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Centro de Innovación y Coworking</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Un hub de clase mundial. Accede a espacios colaborativos premium, estaciones de trabajo de alto rendimiento y laboratorios de testeo con equipos de última generación. Un punto de encuentro vibrante diseñado para incubar las startups que transformarán el país.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                      <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                         <div style={{ color: 'var(--primary)', fontSize: '1.8rem', fontWeight: 800 }}>50+</div>
                         <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Espacios Disponibles</div>
                      </div>
                      <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                         <div style={{ color: 'var(--primary)', fontSize: '1.8rem', fontWeight: 800 }}>Vibrante</div>
                         <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Networking Interactivo</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeEcosystem === 'fondo' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ height: '300px', backgroundImage: `url(${hunzaEmprende})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                     <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)' }} />
                  </div>
                  <div style={{ padding: '3rem', flex: 1 }}>
                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Fondo Hunza Emprende</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Conectamos tu brillante idea con la financiación necesaria. Un fondo de capital semilla tipo Venture Capital municipal para escalar iniciativas juveniles, apoyando desde la tracción inicial hasta la consolidación y expansión comercial.
                    </p>
                    
                    {/* Ruta del emprendedor */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'var(--bg-primary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                       {[
                         { step: '1', title: 'Idea' },
                         { step: '2', title: 'Validación' },
                         { step: '3', title: 'Capital Semilla' },
                         { step: '4', title: 'Crecimiento' },
                       ].map((s, i) => (
                         <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', flex: 1 }}>
                           <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: i === 2 ? 'var(--primary)' : '#ffffff', color: i === 2 ? '#fff' : '#475569', border: i !== 2 ? '1px solid rgba(0,0,0,0.1)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '0.5rem', zIndex: 2, boxShadow: i === 2 ? '0 4px 10px rgba(15,76,129,0.3)' : 'none'}}>
                             {s.step}
                           </div>
                           <div style={{ color: i === 2 ? 'var(--primary)' : '#64748b', fontSize: '0.9rem', fontWeight: 700 }}>{s.title}</div>
                           {i < 3 && <div style={{ position: 'absolute', top: '20px', left: '60%', right: '-40%', height: '2px', background: i === 1 ? 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, var(--primary) 100%)' : 'rgba(0,0,0,0.1)', zIndex: 1 }} />}
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              )}

              {activeEcosystem === 'academia' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ height: '300px', backgroundImage: `url(${hunzaAcademia})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                     <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)' }} />
                  </div>
                  <div style={{ padding: '3rem', flex: 1 }}>
                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Academia Digital Futurista</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Una interfaz educativa diseñada para la economía circular, economía digital y el desarrollo avanzado de software. Domina el código, explora algoritmos y gamifica tu aprendizaje con sistemas de progreso en tiempo real e insignias de prestigio.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'var(--primary)', color: '#fff', padding: '0.8rem', borderRadius: '10px' }}><Cpu size={24}/></div>
                        <div>
                           <div style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.1rem' }}>Inteligencia Artificial</div>
                           <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Módulo Fundamental Avanzado</div>
                        </div>
                      </div>
                      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#f1f5f9', color: 'var(--text-secondary)', padding: '0.8rem', borderRadius: '10px' }}><Laptop size={24}/></div>
                        <div>
                           <div style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.1rem' }}>Data Science</div>
                           <div style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}>Próxima Certificación</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeEcosystem === 'mentores' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ height: '300px', backgroundImage: `url(${hunzaMentores})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                     <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)' }} />
                  </div>
                  <div style={{ padding: '3rem', flex: 1 }}>
                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Red de Mentores & Laboratorio de Soluciones</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Explora retos de ciudad y diseña soluciones junto a empresarios exitosos, investigadores universitarios y expertos de diferentes industrias. Este es el epicentro colaborativo donde las grandes mentes se unen.
                    </p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                       {['Movilidad Autónoma', 'Seguridad Ciudadana AI', 'Turismo Inmersivo', 'Medio Ambiente Sostenible'].map((reto, index) => (
                         <div key={index} style={{ padding: '0.6rem 1.2rem', background: 'var(--bg-primary)', borderRadius: '50px', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600, border: '1px solid var(--border-color)' }}>
                           {reto}
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TEST JOVEN 2.0 */}
      <section style={{ padding: '8rem 2rem', background: 'var(--bg-card)', textAlign: 'center', position: 'relative', backgroundImage: 'url(https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%202.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.85)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', padding: '4rem 2rem', borderRadius: '32px', border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
          <div style={{ width: '70px', height: '70px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: '#fff', boxShadow: '0 10px 20px rgba(74, 0, 114, 0.2)' }}>
            <Compass size={36} />
          </div>
          
          {!testStarted ? (
            <>
              <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Identifica tu Perfil</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                Descubre cuál es tu rol como protagonista en la transformación de Tunja a través de un test interactivo de la Escuela de Liderazgo Juvenil.
              </p>
              
              <button 
              onClick={() => setTestStarted(true)}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                padding: '1.25rem 3rem',
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Comenzar Evaluación
              </button>
            </>
          ) : !testResult ? (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>Pregunta {testQuestion + 1} de {questions.length}</h3>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '3rem' }}>
                {questions[testQuestion].q}
              </h2>
              <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                {questions[testQuestion].o.map((opt, i) => (
                  <button 
                  key={i}
                  onClick={() => handleTestAnswer(opt.roll)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div style={{ display: 'inline-block', background: 'rgba(74, 0, 114, 0.1)', color: 'var(--primary)', padding: '0.5rem 1.5rem', borderRadius: '50px', fontWeight: 700, marginBottom: '1.5rem' }}>Resultado</div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem' }}>{testResult}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
                ¡Excelente! Tu perfil encaja perfectamente. Participa en la Escuela de Liderazgo o solicita apoyo en nuestras líneas de talento.
              </p>
              <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.dispatchEvent(new CustomEvent('navigateTab', { detail: 'unete' }));
              }}
              style={{
                background: 'var(--primary)', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 20px rgba(15,76,129,0.2)'
              }}>
                Únete al cambio
              </button>
              <div style={{ marginTop: '1.5rem' }}>
                <button 
                  onClick={() => { setTestStarted(false); setTestQuestion(0); setTestScores({'Líder Comunitario':0, 'Innovador Digital':0, 'Emprendedor':0}); setTestResult(null) }}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>
                  Repetir test
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* CITA LLAMATIVA */}
      <section style={{ padding: '6rem 2rem 2rem 2rem', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', background: 'linear-gradient(135deg, rgba(15,76,129,0.85), rgba(109,93,252,0.85)), url(https://raw.githubusercontent.com/fabiancho0724/Prueba-123/0ad66b0d183c79dd1a572cdb0be638e0369c01a2/Tunja%205.png)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '4rem 3rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(15,76,129,0.2)' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', lineHeight: 1.3, letterSpacing: '-0.02em', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
            "Solo faltas tú para convertir tus ideas en la fuerza que transformará la Tunja 2.0."
          </h2>
        </div>
      </section>

      {/* HISTORIAS DE TRANSFORMACIÓN */}
      <section style={{ padding: '2rem 2rem 6rem 2rem', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '3rem', textAlign: 'center', color: 'var(--text-primary)' }}>Historias Reales</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Anyi', desc: 'Queremos una administración moderna, digital y transparente, no un montón de trámites en papel que parecen del siglo pasado.', img: 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/3a45c5d1ab88c16c3b27e788212141818deb17d3/Anyi%20%20Queremos%20una%20administraci%C3%B3n%20moderna%2C%20digital%20y%20transparente%2C%20no%20un%20mont%C3%B3n%20de%20tr%C3%A1mites%20en%20papel%20que%20parecen%20del%20siglo%20pasado.jpeg' },
              { name: 'Jhonatan', desc: 'Ya dejamos de ser espectadores. Es el momento de una gerencia joven, con las manos limpias y los pies en la tierra.', img: 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/3a45c5d1ab88c16c3b27e788212141818deb17d3/Jhonatan%20%20Ya%20dejamos%20de%20ser%20espectadores.%20Es%20el%20momento%20de%20una%20gerencia%20joven%2C%20con%20las%20manos%20limpias%20y%20los%20pies%20en%20la%20tierra.jpeg' },
              { name: 'Natalia', desc: 'Estudiar en Tunja no puede ser el boleto de salida. Queremos prosperar aquí, cerca de nuestras familias.', img: 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/3a45c5d1ab88c16c3b27e788212141818deb17d3/Natalia%20Estudiar%20en%20Tunja%20no%20puede%20ser%20el%20boleto%20de%20salida.%20Queremos%20prosperar%20aqu%C3%AD%2C%20cerca%20de%20nuestras%20familias..jpeg' },
              { name: 'Juan Jose', desc: 'Ser joven no es un impedimento para generar cambios sociales.', img: 'https://raw.githubusercontent.com/fabiancho0724/Prueba-123/3a45c5d1ab88c16c3b27e788212141818deb17d3/Juan%20Jose%20%20%20Ser%20joven%20no%20es%20un%20impedimento%20para%20generar%20cambios%20sociales.jpeg' }
            ].map((story, i) => (
              <div key={i} className="story-card" style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                aspectRatio: '3/4',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-15px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                e.currentTarget.querySelector('.story-img').style.transform = 'scale(1.08)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                e.currentTarget.querySelector('.story-img').style.transform = 'scale(1)';
              }}
              >
                <img className="story-img" src={story.img} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }} />
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.4) 50%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                  transition: 'background 0.4s ease'
                }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#fff' }}>{story.name}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '1.05rem', margin: 0, lineHeight: 1.5 }}>
                    "{story.desc}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '2px', background: 'rgba(0,0,0,0.1)' }} />
              <div style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--text-muted)', fontWeight: 500 }}>"De espectadores a protagonistas"</div>
              <div style={{ width: '60px', height: '2px', background: 'rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

