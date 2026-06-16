import React from 'react';
import { Newspaper, CalendarDays, Award, Users, ChevronRight, MessageCircle } from 'lucide-react';

export default function TunjaAvanza() {
  const noticias = [
    {
      tipo: 'LOGRO',
      icon: <Award size={16} />,
      fecha: '15 MAYO 2026',
      titulo: 'Más de 5,000 jóvenes se suman a la visión Tunja 2.0',
      descripcion: 'Nuestra propuesta de inclusión juvenil y modernización digital rompe récords de aceptación en el último encuentro universitario.',
      color: '#10b981'
    },
    {
      tipo: 'EVENTO',
      icon: <CalendarDays size={16} />,
      fecha: '12 MAYO 2026',
      titulo: 'Recorrido por las comunas del sur',
      descripcion: 'Diálogo abierto con líderes de las juntas de acción comunal escuchando directamente las necesidades de movilidad y seguridad.',
      color: '#f59e0b'
    },
    {
      tipo: 'TESTIMONIO',
      icon: <MessageCircle size={16} />,
      fecha: '10 MAYO 2026',
      titulo: '"Tunja necesita gerencia real"',
      descripcion: '"Como pequeño empresario, me entusiasma la propuesta de Hunza Innova y los incentivos tributarios. Por fin alguien habla de empleo real." - Carlos Gómez, Comerciante.',
      color: '#0ea5e9'
    },
    {
      tipo: 'NOTICIA',
      icon: <Newspaper size={16} />,
      fecha: '05 MAYO 2026',
      titulo: 'Presentación del Plan Maestro de Movilidad',
      descripcion: 'Nico presentó en vivo la estrategia de infraestructura verde y redes de microconectividad que transformará el tráfico de la ciudad.',
      color: '#8b5cf6'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '0 1rem 4rem 1rem' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem', padding: '4rem 2rem', background: 'linear-gradient(135deg, rgba(15,76,129,0.05), rgba(0,229,255,0.05))', borderRadius: '32px' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
          Tunja Avanza
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          Sigue el pulso de nuestra campaña. Noticias, logros, eventos y las voces de miles de ciudadanos que ya se sumaron a la transformación.
        </p>
      </div>

      {/* Timeline de Noticias */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {noticias.map((item, index) => (
            <div 
              key={index} 
              style={{
                display: 'flex', gap: '2rem', background: '#fff', padding: '2.5rem', 
                borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', 
                border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ flexShrink: 0, width: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: `${item.color}15`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  {item.icon}
                </div>
                <div style={{ width: '2px', flexGrow: 1, background: 'rgba(0,0,0,0.05)', borderRadius: '10px' }}></div>
              </div>
              
              <div style={{ flexGrow: 1, paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: item.color, background: `${item.color}15`, padding: '0.3rem 0.8rem', borderRadius: '50px', letterSpacing: '1px' }}>
                    {item.tipo}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>{item.fecha}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.3 }}>
                  {item.titulo}
                </h3>
                <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {item.descripcion}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
                  Leer más <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
