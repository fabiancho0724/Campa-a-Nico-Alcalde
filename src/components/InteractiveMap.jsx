import React, { useState } from 'react';
import { MapPin, Users, TrendingUp, Building, Eye, ChevronRight, BarChart3, CheckCircle, Vote, Activity } from 'lucide-react';
import ElectoralHeatmap from './ElectoralHeatmap';
import { electoralData } from '../data/campaignData';

// Configuración espacial y geográfica real para cada Comuna de Tunja (Cojunto de Barrios)
const comunaMeta = {
  comuna1: {
    coords: { x: 50, y: 15 },
    color: '#005C6E', // Azul Petróleo (Primary)
    strata: '3-4',
    population: '15,200',
    potential: 'Media-Alta',
    barrios: ['Muiscas', 'Suamox', 'Capitolio', 'Urb. La Entrada', 'Asís', 'El Tránsito']
  },
  comuna2: {
    coords: { x: 75, y: 25 },
    color: '#0284C7', // Celeste Accent
    strata: '2-3',
    population: '12,800',
    potential: 'Muy Alta',
    barrios: ['Las Quintas', 'La Esmeralda', 'Rosales', 'San Blas', 'Urb. Los Lanceros']
  },
  comuna3: {
    coords: { x: 82, y: 48 },
    color: '#BA2DDE', // Violeta
    strata: '3',
    population: '14,500',
    potential: 'Alta',
    barrios: ['Patriotas', 'San Francisco', 'Cooservicios', 'El Jordán', 'Urb. Conzuelo']
  },
  comuna4: {
    coords: { x: 22, y: 40 },
    color: '#EF4444', // Rojo Accent
    strata: '3-4',
    population: '13,900',
    potential: 'Media',
    barrios: ['La Granja', 'Antonia Santos', 'Doña Eva', 'El Carmen', 'San Laureano']
  },
  comuna5: {
    coords: { x: 50, y: 45 },
    color: '#10B981', // Verde Esmeralda
    strata: '2-3',
    population: '16,200',
    potential: 'Muy Alta',
    barrios: ['Centro Histórico', 'Maldonado', 'Las Nieves', 'El Bosque', 'Plaza de Bolívar']
  },
  comuna6: {
    coords: { x: 70, y: 75 },
    color: '#D4AF37', // Dorado / Oro
    strata: '1-2',
    population: '18,500',
    potential: 'Alta',
    barrios: ['Barrio Runta', 'San Carlos', 'Ciudad Jardín', 'Doña Valentina', 'El Horno']
  },
  comuna7: {
    coords: { x: 50, y: 80 },
    color: '#F97316', // Naranja
    strata: '2',
    population: '22,100',
    potential: 'Media-Alta',
    barrios: ['San Antonio', 'El Libertador', 'El Milagro', 'Coasmedas', 'La Fuente']
  },
  comuna8: {
    coords: { x: 25, y: 70 },
    color: '#2979FF', // Azul Eléctrico
    strata: '2-3',
    population: '14,260',
    potential: 'Media',
    barrios: ['Altamira', 'El Consuelo', 'El Paraíso', 'La Florida', 'La Esperanza']
  },
  comunarural: {
    coords: { x: 48, y: 92 },
    color: '#8D6E63', // Café Arcilla / Tierra
    strata: '1',
    population: '5,000',
    potential: 'Alta',
    barrios: ['Vereda Pirgua', 'Runta Abajo', 'Tras del Alto', 'El Porvenir', 'La Hoya']
  }
};

// Polígonos SVG para dar una geometría territorial coherente a las comunas de Tunja
const comunaPolygons = {
  comuna1: "33,5 65,5 72,23 50,28 30,20",
  comuna2: "72,23 95,20 95,40 65,42 50,28",
  comuna3: "65,42 95,40 95,62 65,65 52,50",
  comuna4: "5,25 33,20 33,48 15,55 5,42",
  comuna5: "33,20 50,28 65,42 52,50 45,55 33,48",
  comuna6: "52,50 85,58 90,78 60,78 52,65",
  comuna7: "33,65 60,65 60,86 33,86",
  comuna8: "15,55 45,55 33,65 15,75",
  comunarural: "3,86 97,86 97,98 3,98"
};

// Pequeños desvíos relativos de coordenadas para graficar los barrios individuales de cada comuna
const barrioOffsets = [
  { dx: -4, dy: -4 },
  { dx: 5, dy: -2 },
  { dx: -2, dy: 4 },
  { dx: 4, dy: 3 },
  { dx: -5, dy: 1 },
  { dx: 3, dy: -5 }
];

export default function InteractiveMap() {
  // Unimos los datos dinámicos de campaña en vivo de campaignData con nuestros metadatos espaciales
  const neighborhoods = electoralData.campanaActual.comunas.map(c => {
    const meta = comunaMeta[c.id] || { 
      coords: { x: 50, y: 50 }, 
      color: '#005C6E', 
      strata: '2', 
      population: '10,000', 
      potential: 'Media', 
      barrios: [] 
    };
    return {
      ...c,
      ...meta
    };
  });

  const [selectedZone, setSelectedZone] = useState(neighborhoods[5]); // Comuna 6 por defecto
  const [hoveredZoneId, setHoveredZoneId] = useState(null);

  return (
    <div style={{ padding: '1rem 0' }} className="animate-fade-in">
      
      {/* Encabezado sin bordes ni cajas extras */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
          Cartografía Electoral Tunja <span className="gradient-text-primary">2.0</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.95rem' }}>
          Visualización de resultados oficiales Presidenciales (2da Vuelta 2022), participación comunal y potencial estratégico electoral en el territorio urbano y rural.
        </p>
      </div>

      <ElectoralHeatmap />

      {/* RESULTADOS ELECTORALES REGISTRADURÍA - FOCUS PACTO HISTÓRICO */}
      <div style={{
        marginTop: '3.5rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: 'var(--shadow-xl)'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ 
            width: '48px', height: '48px', borderRadius: '12px', 
            background: '#005C6E1A', color: '#005C6E',
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <BarChart3 size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              Votación Presidencial (2022) - Tunja
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              Histórico de Segunda Vuelta,{' '}
              <a 
                href="https://resultados.registraduria.gov.co/resultados/0/07001/" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#005C6E', fontWeight: '600', textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Registraduría Nacional del Estado Civil
              </a>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta 1 - Desempeño Pacto Histórico */}
          <div style={{ 
            background: 'var(--bg-primary)', 
            border: '2px solid rgba(0, 92, 110, 0.3)', 
            borderRadius: '16px', 
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,92,110,0.05)'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: '#005C6E' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span className="pill" style={{ background: 'rgba(0, 92, 110, 0.15)', color: '#005C6E', fontWeight: 'bold', fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid rgba(0,92,110,0.2)' }}>
                PACTO HISTÓRICO
              </span>
              <Vote size={24} color="#005C6E" />
            </div>
            <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-primary)', margin: '0.5rem 0', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
              37.018
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Votos en Tunja (Primera Vuelta)</p>
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Representación</span>
                <span style={{ fontWeight: 'bold', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '1.1rem', marginTop: '0.25rem' }}>
                  <TrendingUp size={16} />
                  36.13%
                </span>
              </div>
            </div>
            
            {/* Gráfico radial / anillo sutil de fondo */}
            <svg style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '120px', height: '120px', opacity: 0.1, transform: 'rotate(-45deg)' }} viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="40" fill="none" stroke="#005C6E" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={`${251.2 * (1 - 0.3613)}`} />
               <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="20" strokeDasharray="251.2" style={{ opacity: 0.2 }}/>
            </svg>
          </div>

          {/* Tarjeta 2 - Censo Total */}
          <div style={{ 
            background: 'var(--bg-primary)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '16px', 
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Censo Electoral Total
              </span>
              <Users size={24} color="var(--text-muted)" />
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0.5rem 0', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
              86,212
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Votantes en la ciudad de Tunja</p>
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Mesas informadas (428)</span>
                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>100%</span>
              </div>
              <div style={{ width: '100%', background: 'rgba(0,0,0,0.05)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '100%', background: '#BA2DDE', height: '100%', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>

          {/* Tarjeta 3 - Posición / Impacto */}
          <div style={{ 
            background: 'var(--bg-primary)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '16px', 
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Indicador de Impacto
              </span>
              <CheckCircle size={24} color="#10B981" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0.5rem 0', lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
              Fuerza Líder Progresista
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.5rem' }}>Oportunidad estratégica de crecimiento</p>
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                  <div style={{ width: '8px', height: '8px', background: '#005C6E', borderRadius: '50%' }}></div>
                  Potencial alto de capitalización local
                </li>
                <li style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                  <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%' }}></div>
                  Fuerte respaldo en Suroriente
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Sección Proyección 2026 */}
        <div style={{ marginTop: '4rem', paddingTop: '2.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), transparent)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '12px', 
              background: '#8B5CF61A', color: '#8B5CF6',
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                Elecciones Presidenciales 2026 - Tunja
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Resultados de Votación (Fuente: Registraduría Nacional del Estado Civil)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarjeta Resultados Pacto 2026 */}
            <div style={{ 
              background: 'linear-gradient(135deg, #fdfcff 0%, #ede9fe 100%)', 
              border: '1px solid rgba(139, 92, 246, 0.2)', 
              borderRadius: '16px', 
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(139, 92, 246, 0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span className="pill" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#6D28D9', fontWeight: 'bold', fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  PACTO HISTÓRICO 2026
                </span>
                <TrendingUp size={24} color="#6D28D9" />
              </div>
              <div style={{ fontSize: '4.5rem', fontWeight: '900', color: '#4C1D95', margin: '0.5rem 0', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                45.890
              </div>
              <p style={{ fontSize: '1.1rem', color: '#5B21B6', fontWeight: 600 }}>Votos confirmados en Tunja</p>
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(139, 92, 246, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6D28D9', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Participación Consolidada</span>
                  <span style={{ fontWeight: 'bold', color: '#6D28D9', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '1.5rem', marginTop: '0.25rem' }}>
                    <TrendingUp size={20} />
                    44.5%
                  </span>
                </div>
                <a 
                  href="https://www.resultados.registraduria.gov.co/resultados/0/07001/" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ fontSize: '0.8rem', color: '#6D28D9', textDecoration: 'underline', fontWeight: 500 }}
                >
                  Ver Resultados Oficiales
                </a>
              </div>
              
              <svg style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '200px', height: '200px', opacity: 0.1, transform: 'rotate(-45deg)' }} viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#6D28D9" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={`${251.2 * (1 - 0.4312)}`} />
                 <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="20" strokeDasharray="251.2" style={{ opacity: 0.2 }}/>
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={18} color="#8B5CF6" /> Estrategia de Consolidación
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Para alcanzar la meta de los <strong>44.172 votos</strong>, se requiere un esfuerzo integral en el territorio, partiendo desde la base histórica. La atención debe centrarse prioritariamente en las comunas 6 y 7, fortaleciendo el mensaje y la participación ciudadana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
