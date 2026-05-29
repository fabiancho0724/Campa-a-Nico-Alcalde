import React, { useState } from 'react';
import { MapPin, Users, Activity, ChevronRight, TrendingUp, Building } from 'lucide-react';

// Datos de las 8 comunas de Tunja con métricas realistas proyectadas para el Pacto Histórico
const neighborhoods = [
  { id: 'c1', name: 'Comuna 1 (Centro)', votes: 5430, expected: 6000, color: 'var(--primary)', coords: { x: 50, y: 50 }, youthPercent: 35, strata: '3-4', population: '18,500', potential: 'Media-Alta' },
  { id: 'c2', name: 'Comuna 2 (Noroccidental)', votes: 7200, expected: 6500, color: '#00E5FF', coords: { x: 35, y: 30 }, youthPercent: 48, strata: '2-3', population: '25,300', potential: 'Muy Alta' },
  { id: 'c3', name: 'Comuna 3 (Nororiental - Muiscas)', votes: 8550, expected: 7800, color: '#BA2DDE', coords: { x: 65, y: 25 }, youthPercent: 42, strata: '3', population: '28,100', potential: 'Alta' },
  { id: 'c4', name: 'Comuna 4 (Occidental)', votes: 4120, expected: 4500, color: '#FF3366', coords: { x: 25, y: 55 }, youthPercent: 30, strata: '3-4', population: '14,200', potential: 'Media' },
  { id: 'c5', name: 'Comuna 5 (Centro Sur)', votes: 6800, expected: 6200, color: '#00FF88', coords: { x: 45, y: 65 }, youthPercent: 55, strata: '2-3', population: '22,400', potential: 'Muy Alta' },
  { id: 'c6', name: 'Comuna 6 (Sur - Runta)', votes: 9450, expected: 8500, color: '#FFE675', coords: { x: 40, y: 85 }, youthPercent: 40, strata: '1-2', population: '31,000', potential: 'Alta' },
  { id: 'c7', name: 'Comuna 7 (Oriental - Patriotas)', votes: 5800, expected: 6500, color: 'var(--primary)', coords: { x: 75, y: 60 }, youthPercent: 38, strata: '2', population: '20,500', potential: 'Media-Alta' },
  { id: 'c8', name: 'Comuna 8 (Suroccidental)', votes: 3200, expected: 4000, color: '#00E5FF', coords: { x: 25, y: 75 }, youthPercent: 32, strata: '2-3', population: '12,800', potential: 'Media' }
];

export default function InteractiveMap() {
  const [selectedZone, setSelectedZone] = useState(neighborhoods[5]); // Default Comuna 6

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>Mapa Electoral de Tunja</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          Análisis interactivo de resultados al Senado y Cámara. Selecciona una comuna para ver el comportamiento demográfico y proyección del Pacto Histórico.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', padding: '1rem' }}>
        {/* Mapa Interactivo (Visión abstracta de la ciudad) */}
        <div className="lg:col-span-2" style={{ position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', borderRadius: '24px', zIndex: 1, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://raw.githubusercontent.com/fabiancho0724/Prueba-123/15a885eeb39f5a481a49cbfa3e071803aca80b91/Gemini_Generated_Image_4rzt974rzt974rzt%20(1).png')`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.2)', zIndex: 0 }}></div>
          <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', zIndex: 1 }}>
            {/* Rutas/Conexiones falsas centralizadas abstractas de Tunja */}
            <svg style={{ position: 'absolute', top:0, left:0, width: '100%', height: '100%' }}>
              <line x1="50%" y1="50%" x2="35%" y2="30%" stroke="rgba(0, 0, 0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="65%" y2="25%" stroke="rgba(0, 0, 0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="25%" y2="55%" stroke="rgba(0, 0, 0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="45%" y2="65%" stroke="rgba(0, 0, 0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="45%" y1="65%" x2="40%" y2="85%" stroke="rgba(0, 0, 0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="75%" y2="60%" stroke="rgba(0, 0, 0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="45%" y1="65%" x2="25%" y2="75%" stroke="rgba(0, 0, 0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {neighborhoods.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              const radius = isSelected ? 40 : 25;
              return (
                <div 
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  style={{
                    position: 'absolute',
                    top: `${zone.coords.y}%`,
                    left: `${zone.coords.x}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${radius * 2}px`,
                    height: `${radius * 2}px`,
                    backgroundColor: zone.color,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    boxShadow: isSelected ? `0 0 30px ${zone.color}` : `0 0 5px rgba(0,0,0,0.2)`,
                    border: isSelected ? '4px solid #fff' : '2px solid rgba(0, 0, 0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    zIndex: isSelected ? 10 : 1
                  }}
                >
                  {isSelected && (
                    <div style={{ position: 'absolute', top: '110%', color: '#1a1a1a', fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center', textShadow: 'none', background: 'rgba(255,255,255,0.95)', padding: '0.3rem 0.6rem', borderRadius: '8px', whiteSpace: 'nowrap', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                      {zone.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel de Detalles */}
        <div className="flex flex-col gap-6" style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '24px', zIndex: 1, color: '#FFFFFF' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: selectedZone.color, marginBottom: '0.5rem' }}>{selectedZone.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
              <TrendingUp size={16} />
              <span>Resultados Pacto Histórico</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(255, 255, 255,0.05)', padding: '1rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Votos Obtenidos</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedZone.votes.toLocaleString()}</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255,0.05)', padding: '1rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Meta Proyectada</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedZone.expected.toLocaleString()}</div>
            </div>
          </div>

          <div>
             <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255,0.1)', paddingBottom: '0.5rem' }}>Estructura Demográfica</h4>
             
             <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem' }}><Users size={14} style={{ display: 'inline', marginRight: '4px' }}/>Votantes Jóvenes (18-35)</span>
                  <span style={{ fontWeight: 'bold' }}>{selectedZone.youthPercent}%</span>
                </div>
                <div style={{ width: '100%', background: 'rgba(255, 255, 255,0.1)', height: '8px', borderRadius: '4px' }}>
                   <div style={{ width: `${selectedZone.youthPercent}%`, background: selectedZone.color, height: '100%', borderRadius: '4px', transition: 'width 0.5s ease' }}></div>
                </div>
             </div>

             <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255,0.05)', padding: '0.75rem', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building size={14}/>Estratos Predominantes</span>
                <span style={{ fontWeight: 'bold', background: 'rgba(255, 255, 255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '100px' }}>{selectedZone.strata}</span>
             </div>

             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255,0.05)', padding: '0.75rem', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14}/>Población Total</span>
                <span style={{ fontWeight: 'bold' }}>{selectedZone.population} hab.</span>
             </div>
          </div>

          <div style={{ marginTop: 'auto', background: `linear-gradient(to right, ${selectedZone.color}22, transparent)`, padding: '1.25rem', borderRadius: '16px', borderLeft: `4px solid ${selectedZone.color}` }}>
             <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                <strong>Potencial Electoral: {selectedZone.potential}.</strong> {selectedZone.votes >= selectedZone.expected ? 'Zona fuerte del partido. Se recomienda mantener mesas de trabajo de participación.' : 'Zona de oportunidad. Aumentar presencia gubernamental y acompañamiento en las bases locales.'}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
