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
import hunzaInnova from '../assets/images/hunza_innova_hub_1780673493787.png';
import saberPlus from '../assets/images/saber_plus_education_1780673508458.png';

export default function Joven20() {
  const [activeTabDiagnostico, setActiveTabDiagnostico] = useState('ciudad');
  
  const [budgetLimits, setBudgetLimits] = useState({
    cultura: 200,
    deporte: 150,
    tecnologia: 300,
    medioambiente: 200,
    educacion: 500,
    emprendimiento: 400
  });

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
              onClick={() => alert('¡Únete a la red de Jóvenes 2.0! Te contactaremos pronto.')}
              style={{
              background: '#fff',
              color: 'var(--primary)',
              border: '1px solid rgba(0,0,0,0.1)',
              padding: '1rem 2rem',
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
            onMouseOut={e => e.currentTarget.style.background = '#fff'}
            >
              Construyamos la Tunja 2.0
            </button>
          </div>
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

      {/* HUNZA INNOVA (PREMIUM) */}
      <section style={{ 
        position: 'relative',
        padding: '8rem 2rem',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${hunzaInnova})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.2) 100%)',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: '600px' }}>
            <div style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Laptop size={18} /> Eje 4. Ecosistema Premium
            </div>
            <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1, color: '#0f172a' }}>
              HUNZA <br/><span style={{ color: 'var(--secondary)' }}>INNOVA</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>
              Primer ecosistema municipal de innovación. Un espacio donde convergen la academia, el sector empresarial y la juventud para posicionar a Tunja como referente regional.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: '#334155', fontWeight: 600 }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Centro de Innovación y Coworking Juvenil</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Fondo Hunza Emprende (Capital Semilla)</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Academia de Innovación Digital</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Red de Mentores y Laboratorio de Soluciones</li>
            </ul>
            <p style={{ fontSize: '1.4rem', fontStyle: 'italic', borderLeft: '4px solid var(--primary)', paddingLeft: '1.5rem', color: '#0f172a', marginBottom: '3rem', fontWeight: 700 }}>
              "Hunza Innova: el talento joven construye la Tunja del futuro."
            </p>
            <button 
              onClick={() => alert('Simulación: Solicitando acceso al Centro de Innovación Hunza Innova.')}
              style={{
              background: 'var(--secondary)',
              color: '#fff',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '50px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Explorar el Ecosistema <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* PRESUPUESTO PARTICIPATIVO */}
      <section style={{ padding: '6rem 2rem', background: '#f8fafc', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(15, 76, 129, 0.1)', color: 'var(--primary)', padding: '0.6rem 1.2rem', borderRadius: '50px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
            <Activity size={16} /> Gobierno Abierto - Simulador
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>Presupuesto Participativo Juvenil</h2>
          <p style={{ color: '#475569', marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            Los jóvenes podrán formular, deliberar, priorizar y hacer seguimiento a proyectos. Distribuye recursos virtuales e impacta en tiempo real.
          </p>

          <div style={{ background: '#ffffff', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'left', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {Object.keys(budgetLimits).map(categoria => (
                <div key={categoria}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ textTransform: 'capitalize', fontWeight: 700, color: '#334155' }}>{categoria}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{budgetLimits[categoria]} COP Simulados</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    value={budgetLimits[categoria]} 
                    onChange={e => setBudgetLimits({...budgetLimits, [categoria]: parseInt(e.target.value)})}
                    style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'grab' }}
                  />
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                    Impacto estimado: <strong>+{Math.floor(budgetLimits[categoria] * 1.5)} proyectos beneficiarios</strong>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(15, 76, 129, 0.05)', borderRadius: '16px', border: '1px solid rgba(15, 76, 129, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 600 }}>Impacto Total Requerido</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)' }}>
                  {Object.values(budgetLimits).reduce((a, b) => a + b, 0) * 1.5} <span style={{ fontSize: '1rem', color: '#334155', fontWeight: 600 }}>Jóvenes Involucrados</span>
                </div>
              </div>
              <button 
              onClick={() => alert(`Propuesta guardada en la base de participación. Total impacto estimado: ${Object.values(budgetLimits).reduce((a, b) => a + b, 0) * 1.5}`)}
              style={{
                background: 'var(--primary)', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>Subir Propuesta al Laboratorio</button>
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

