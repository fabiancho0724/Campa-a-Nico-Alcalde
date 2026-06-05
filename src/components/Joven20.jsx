import React, { useState } from 'react';
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
import jovenHero from '../assets/images/joven_hero_tunja_1780673476635.png';
import saberPlus from '../assets/images/saber_plus_education_1780673508458.png';

import hunzaInnovaLogo from '../assets/images/hunza_innova_logo_1780675662347.png';
import hunzaCoworking from '../assets/images/hunza_coworking_1780675677359.png';
import hunzaEmprende from '../assets/images/hunza_emprende_1780675692908.png';
import hunzaAcademia from '../assets/images/hunza_academia_1780675707942.png';
import hunzaMentores from '../assets/images/hunza_mentores_1780675723462.png';

export default function Joven20() {
  const [activeTabDiagnostico, setActiveTabDiagnostico] = useState('ciudad');
  
  const [activeEcosystem, setActiveEcosystem] = useState('coworking');
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalText, setProposalText] = useState("");

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
      color: '#0f172a', 
      background: '#f8fafc', 
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
      border: '1px solid rgba(0,0,0,0.05)'
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
          opacity: 0.15,
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(248, 250, 252, 0.4) 0%, rgba(248, 250, 252, 1) 100%)',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(255,255,255,0.8)', 
            padding: '0.5rem 1rem', 
            borderRadius: '50px',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0,0,0,0.05)',
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
            color: '#0f172a'
          }}>
            JUVENTUD <span style={{ color: 'var(--primary)' }}>TUNJA 2.0</span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', 
            color: '#475569',
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
              boxShadow: '0 10px 25px rgba(15, 76, 129, 0.4)',
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
            <div className="animate-fade-in" style={{ marginTop: '2rem', background: '#fff', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', maxWidth: '700px', margin: '2rem auto 0 auto', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Ecosistema Joven 2.0</h3>
              <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '1.05rem' }}>Escribe tu propuesta para mejorar el ecosistema y envíala al laboratorio de innovación.</p>
              <textarea 
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                placeholder="Describe tu idea detalladamente..."
                style={{ width: '100%', height: '150px', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', marginBottom: '1.5rem', resize: 'none', fontSize: '1rem', fontFamily: 'inherit', color: '#0f172a' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button 
                  onClick={() => setShowProposalForm(false)}
                  style={{ background: 'transparent', color: '#64748b', padding: '0.8rem 1.5rem', borderRadius: '50px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    if(!proposalText.trim()) { alert('Por favor escribe una propuesta antes de enviar.'); return; }
                    alert('¡Propuesta enviada con éxito al Laboratorio del Ecosistema!');
                    setShowProposalForm(false);
                    setProposalText('');
                  }}
                  style={{ background: 'var(--primary)', color: '#fff', padding: '0.8rem 2rem', borderRadius: '50px', border: 'none', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(15,76,129,0.2)' }}>
                  Enviar Propuesta
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DIAGNOSTIC / DASHBOARD */}
      <section style={{ padding: '6rem 2rem', background: '#ffffff', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              Diagnóstico de la Situación
            </h2>
            <p style={{ color: '#64748b', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
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
              background: 'var(--bg-primary)',
              borderRadius: '24px',
              padding: '3rem',
              border: '1px solid rgba(0,0,0,0.05)',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>
                {diagnosticoContent[activeTabDiagnostico].title}
              </h3>
              <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.8 }}>
                {diagnosticoContent[activeTabDiagnostico].text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMAS ESTRATÉGICOS */}
      <section id="ecosistema" style={{ padding: '6rem 2rem', background: '#f8fafc', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-block', background: 'rgba(15, 76, 129, 0.1)', color: 'var(--primary)', padding: '0.4rem 1.2rem', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>PROPUESTA PROGRAMÁTICA</div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>Ecosistema Joven 2.0</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
              Convertir a Tunja en la ciudad líder de Colombia en innovación, formación digital y generación de oportunidades.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Gobierno Abierto Joven', icon: <Mic />, desc: 'Destinar recursos específicos para proyectos juveniles y plataforma de deliberación.' },
              { title: 'Saber Plus 2.0', icon: <BookOpen />, desc: 'Inglés, pensamiento matemático, programación, inteligencia artificial.' },
              { title: 'Talento Tunjano', icon: <Briefcase />, desc: 'Reducir el desempleo juvenil, incentivos y plataforma digital de empleo.' },
              { title: 'Conecta Tunja', icon: <TrendingUp />, desc: 'Apoyos en transporte, conectividad y material para permanencia educativa.' },
              { title: 'Jóvenes con Bienestar', icon: <HeartPulse />, desc: 'Atención psicosocial, actividades deportivas y redes de apoyo.' },
              { title: 'Escuela de Liderazgo', icon: <Compass />, desc: 'Formación anual de líderes comunitarios, ambientales y tecnológicos.' }
            ].map((program, i) => (
              <div key={i} style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '20px',
                padding: '2rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
              }}
              >
                <div style={{ background: 'var(--primary)', color: '#fff', padding: '1rem', borderRadius: '12px' }}>
                  {program.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f172a' }}>{program.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>{program.desc}</p>
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
        background: '#f8fafc',
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
            <img src={hunzaInnovaLogo} alt="Hunza Innova Logo" style={{ height: '80px', marginBottom: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }} />
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', color: '#0f172a', letterSpacing: '-0.03em' }}>
              Explorar el Ecosistema
            </h2>
            <p style={{ color: '#475569', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
              Navega por el ecosistema de innovación tecnológica más avanzado de la región, diseñado para conectar, formar y financiar a la próxima generación de líderes digitales.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '2rem', height: '100%' }}>
            
            {/* Ecosistema Navigation Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
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
                  <div style={{ color: '#64748b', fontSize: '0.85rem', paddingLeft: '2.5rem' }}>
                    {item.subtitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Ecosistema Content Area */}
            <div style={{ 
              background: '#ffffff', 
              borderRadius: '24px', 
              border: '1px solid rgba(0,0,0,0.05)', 
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
                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Centro de Innovación y Coworking</h3>
                    <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Un hub de clase mundial. Accede a espacios colaborativos premium, estaciones de trabajo de alto rendimiento y laboratorios de testeo con equipos de última generación. Un punto de encuentro vibrante diseñado para incubar las startups que transformarán el país.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                      <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                         <div style={{ color: 'var(--primary)', fontSize: '1.8rem', fontWeight: 800 }}>50+</div>
                         <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Espacios Disponibles</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                         <div style={{ color: 'var(--primary)', fontSize: '1.8rem', fontWeight: 800 }}>Vibrante</div>
                         <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Networking Interactivo</div>
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
                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Fondo Hunza Emprende</h3>
                    <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Conectamos tu brillante idea con la financiación necesaria. Un fondo de capital semilla tipo Venture Capital municipal para escalar iniciativas juveniles, apoyando desde la tracción inicial hasta la consolidación y expansión comercial.
                    </p>
                    
                    {/* Ruta del emprendedor */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
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
                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Academia Digital Futurista</h3>
                    <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Una interfaz educativa diseñada para la economía circular, economía digital y el desarrollo avanzado de software. Domina el código, explora algoritmos y gamifica tu aprendizaje con sistemas de progreso en tiempo real e insignias de prestigio.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)', padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'var(--primary)', color: '#fff', padding: '0.8rem', borderRadius: '10px' }}><Cpu size={24}/></div>
                        <div>
                           <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.1rem' }}>Inteligencia Artificial</div>
                           <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Módulo Fundamental Avanzado</div>
                        </div>
                      </div>
                      <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)', padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#f1f5f9', color: '#475569', padding: '0.8rem', borderRadius: '10px' }}><Laptop size={24}/></div>
                        <div>
                           <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.1rem' }}>Data Science</div>
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
                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Red de Mentores & Laboratorio de Soluciones</h3>
                    <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Explora retos de ciudad y diseña soluciones junto a empresarios exitosos, investigadores universitarios y expertos de diferentes industrias. Este es el epicentro colaborativo donde las grandes mentes se unen.
                    </p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                       {['Movilidad Autónoma', 'Seguridad Ciudadana AI', 'Turismo Inmersivo', 'Medio Ambiente Sostenible'].map((reto, index) => (
                         <div key={index} style={{ padding: '0.6rem 1.2rem', background: '#f8fafc', borderRadius: '50px', color: '#334155', fontSize: '0.95rem', fontWeight: 600, border: '1px solid rgba(0,0,0,0.05)' }}>
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
      <section style={{ padding: '8rem 2rem', background: '#ffffff', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: '#f8fafc', padding: '4rem 2rem', borderRadius: '32px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '70px', height: '70px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: '#fff', boxShadow: '0 10px 20px rgba(15, 76, 129, 0.2)' }}>
            <Compass size={36} />
          </div>
          
          {!testStarted ? (
            <>
              <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>Identifica tu Perfil</h2>
              <p style={{ color: '#475569', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                Descubre cuál es tu rol como protagonista en la transformación de Tunja a través de un test interactivo de la Escuela de Liderazgo Juvenil.
              </p>
              
              <button 
              onClick={() => setTestStarted(true)}
              style={{
                background: '#0f172a',
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
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '3rem' }}>
                {questions[testQuestion].q}
              </h2>
              <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                {questions[testQuestion].o.map((opt, i) => (
                  <button 
                  key={i}
                  onClick={() => handleTestAnswer(opt.roll)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.1)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = '#334155' }}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div style={{ display: 'inline-block', background: 'rgba(15, 76, 129, 0.1)', color: 'var(--primary)', padding: '0.5rem 1.5rem', borderRadius: '50px', fontWeight: 700, marginBottom: '1.5rem' }}>RESULTADO</div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>{testResult}</h2>
              <p style={{ color: '#475569', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
                ¡Excelente! Tu perfil encaja perfectamente. Participa en la Escuela de Liderazgo o solicita apoyo en nuestras líneas de talento.
              </p>
              <button 
              onClick={() => alert(`Redirigiendo a las oportunidades para el perfil: ${testResult}`)}
              style={{
                background: 'var(--primary)', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 20px rgba(15,76,129,0.2)'
              }}>
                Ver rutas de formación para mí
              </button>
              <div style={{ marginTop: '1.5rem' }}>
                <button 
                  onClick={() => { setTestStarted(false); setTestQuestion(0); setTestScores({'Líder Comunitario':0, 'Innovador Digital':0, 'Emprendedor':0}); setTestResult(null) }}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>
                  Repetir test
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* HISTORIAS DE TRANSFORMACIÓN */}
      <section style={{ padding: '6rem 2rem', background: '#f8fafc', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '3rem', textAlign: 'center', color: '#0f172a' }}>Historias Reales</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Laura', role: 'Innovadora Digital', desc: 'De estudiante a fundadora de una startup agrotech gracias a Hunza Innova.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' },
              { name: 'Mateo', role: 'Gestor Cultural', desc: 'Liderando el colectivo urbano y rescatando espacios públicos con arte y tecnología.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
              { name: 'Sofía', role: 'Líder Ambiental', desc: 'Coordinando proyectos de sostenibilidad premiados a nivel nacional.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600' }
            ].map((story, i) => (
              <div key={i} style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                aspectRatio: '3/4'
              }}>
                <img src={story.img} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.4) 50%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem'
                }}>
                  <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {story.role}
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#fff' }}>{story.name}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '1.05rem', margin: 0, lineHeight: 1.5 }}>
                    {story.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '2px', background: 'rgba(0,0,0,0.1)' }} />
              <div style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#64748b', fontWeight: 500 }}>"De espectadores a protagonistas"</div>
              <div style={{ width: '60px', height: '2px', background: 'rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

