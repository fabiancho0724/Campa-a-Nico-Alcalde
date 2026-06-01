import React, { useState } from 'react';
import { MapPin, Users, TrendingUp, Building, Eye, ChevronRight, BarChart3, CheckCircle, Vote } from 'lucide-react';
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
          Visualización de resultados oficiales de pre-conteo, participación comunal y potencial estratégico electoral en el territorio urbano y rural.
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
        boxShadow: 'var(--shadow-sm)'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: '48px', height: '48px', borderRadius: '12px', 
            background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444',
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <BarChart3 size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              Resultados Oficiales - Elecciones Tunja
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Basado en el pre-conteo oficial de la{' '}
              <a 
                href="https://resultados.registraduria.gov.co/resultados/0/00" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#EF4444', fontWeight: '600', textDecoration: 'none' }}
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
            border: '2px solid rgba(239, 68, 68, 0.3)', 
            borderRadius: '16px', 
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#EF4444' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span className="pill" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', fontWeight: 'bold', fontSize: '0.75rem' }}>
                PACTO HISTÓRICO
              </span>
              <Vote size={20} color="#EF4444" />
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', margin: '0.5rem 0' }}>
              18,450
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Votos escrutados en Tunja</p>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Participación (%)</span>
              <span style={{ fontWeight: 'bold', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={14} />
                21.4%
              </span>
            </div>
          </div>

          {/* Tarjeta 2 - Censo Total */}
          <div style={{ 
            background: 'var(--bg-primary)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '16px', 
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem' }}>
                TOTAL VOTANTES ACTIVOS
              </span>
              <Users size={20} color="var(--text-muted)" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0.5rem 0' }}>
              86,212
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Del Censo Electoral de Tunja</p>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Mesas informadas</span>
                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>100%</span>
              </div>
              <div style={{ width: '100%', background: 'rgba(0,0,0,0.05)', height: '4px', borderRadius: '2px' }}>
                <div style={{ width: '100%', background: 'var(--primary)', height: '100%', borderRadius: '2px' }}></div>
              </div>
            </div>
          </div>

          {/* Tarjeta 3 - Posición / Impacto */}
          <div style={{ 
            background: 'var(--bg-primary)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '16px', 
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem' }}>
                IMPACTO ELECTORAL
              </span>
              <CheckCircle size={20} color="#10B981" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0.5rem 0', lineHeight: 1.2 }}>
              Fuerza Líder
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>En movilización progresista</p>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', background: '#EF4444', borderRadius: '50%' }}></span>
                  Mayor crecimiento interanual
                </li>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', background: '#EF4444', borderRadius: '50%' }}></span>
                  Fuerte respaldo en Comunas 6 y 7
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
