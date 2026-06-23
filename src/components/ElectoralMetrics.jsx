import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { electoralData } from '../data/campaignData';
import { Users, TrendingUp, UserCheck, MapPin, Sparkles, AlertCircle } from 'lucide-react';

export default function ElectoralMetrics() {
  const { censoElectoral, historico2023, campanaActual } = electoralData;
  const [campanaSettings, setCampanaSettings] = useState({
    metaVotos: campanaActual.metaVotos,
    votosProyectadosActual: campanaActual.votosProyectadosActual,
    voluntariosMeta: 5000
  });
  
  const [selectedCommune, setSelectedCommune] = useState(campanaActual.comunas[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [voluntarios, setVoluntarios] = useState(campanaActual.voluntariosRegistrados);
  const [visitas, setVisitas] = useState(campanaActual.visitasPuertaAPuerta);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'configuracion', 'global'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCampanaSettings({
            metaVotos: Number(data.metaVotos) || campanaActual.metaVotos,
            votosProyectadosActual: Number(data.votosProyectados) || campanaActual.votosProyectadosActual,
            voluntariosMeta: Number(data.voluntariosMeta) || 5000
          });
        }
      } catch (e) {
        console.warn("Could not fetch remote campana settings:", e.message);
      }
    };
    loadSettings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Filtrar comunas por búsqueda
  const filteredCommunes = campanaActual.comunas.filter(c => 
    c.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simular registro de un nuevo voluntario
  const registrarVoluntario = () => {
    setVoluntarios(prev => prev + 1);
    setVisitas(prev => prev + Math.floor(Math.random() * 5) + 1);
  };

  // Cálculos para gráfico SVG Donut
  const total2023 = historico2023.participacionTotal + historico2023.abstencionTotal;
  const partPercent = ((historico2023.participacionTotal / total2023) * 100).toFixed(1);
  const abstPercent = ((historico2023.abstencionTotal / total2023) * 100).toFixed(1);
  
  // Radio del círculo SVG es 40. Circunferencia = 2 * PI * r = 2 * 3.14159 * 40 = 251.3
  const circumference = 251.3;
  const partDash = (historico2023.participacionTotal / total2023) * circumference;
  const abstDash = circumference - partDash;

  // Progreso de meta actual
  const avanceMetaVotos = ((campanaSettings.votosProyectadosActual / campanaSettings.metaVotos) * 100).toFixed(1);

  return (
    
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
      
      {/* Cabecera del Módulo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Métricas Electorales <span className="gradient-text-primary">Tunja 2026</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Análisis histórico de las elecciones 2023 y seguimiento de metas de campaña en tiempo real.
          </p>
        </div>
        <button className="btn btn-primary" onClick={registrarVoluntario}>
          <Sparkles size={18} />
          Sumar Voluntario (+1)
        </button>
      </div>

      {/* Grid Superior - KPIs */}
      <div className="grid-cols-4">
        
        <div className="glass-card card-primary" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'var(--primary-glow)', padding: '0.75rem', borderRadius: '16px', color: 'var(--primary)' }}>
            <Users size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Censo Electoral Tunja</p>
            <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{censoElectoral.toLocaleString()}</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Habilitados para votar</p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'var(--secondary-glow)', padding: '0.75rem', borderRadius: '16px', color: 'var(--secondary)' }}>
            <TrendingUp size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Meta Votos 2026</p>
            <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{campanaSettings.metaVotos.toLocaleString()}</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.1rem' }}>{avanceMetaVotos}% Proyectado</p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(63, 81, 181, 0.15)', padding: '0.75rem', borderRadius: '16px', color: '#5C6BC0' }}>
            <UserCheck size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Voluntarios Activos</p>
            <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{voluntarios.toLocaleString()}</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Líderes comunales</p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(233, 30, 99, 0.15)', padding: '0.75rem', borderRadius: '16px', color: '#EC407A' }}>
            <MapPin size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Puerta a Puerta</p>
            <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{visitas.toLocaleString()}</h3>
            <p style={{ fontSize: '0.75rem', color: '#EC407A', marginTop: '0.1rem' }}>Hogares impactados</p>
          </div>
        </div>

      </div>

      {/* Grid Principal - Gráficos e Información Sectorial */}
      <div className="grid-cols-2">
        
        {/* Gráfico Donut de Censo e Histórico 2023 */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Histórico Electoral: Elecciones 2023</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Comportamiento de participación en la última elección de alcalde en Tunja.
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem', margin: 'auto 0' }}>
            
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '180px', height: '180px' }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                {/* Fondo */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(0, 0, 0,0.03)" strokeWidth="12" />
                {/* Abstención */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="var(--accent-red)" 
                  strokeWidth="12"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={-partDash}
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
                {/* Participación */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="var(--primary)" 
                  strokeWidth="12"
                  strokeDasharray={`${partDash} ${circumference}`}
                  strokeDashoffset="0"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              
              {/* Centro del Donut */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Votantes</span>
                <span style={{ fontSize: '1.35rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                  {historico2023.participacionTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Leyendas del Gráfico */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '180px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '16px', background: 'var(--primary)', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Participación: {partPercent}%</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '1.25rem' }}>
                  {historico2023.participacionTotal.toLocaleString()} votos depositados
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '16px', background: 'var(--accent-red)', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Abstención: {abstPercent}%</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '1.25rem' }}>
                  {historico2023.abstencionTotal.toLocaleString()} habilitados no votaron
                </span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>
                  <strong>Ganador 2023:</strong> {historico2023.ganador}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>
                  ★ {historico2023.votosGanador.toLocaleString()} votos ({historico2023.porcentajeGanador}%)
                </span>
              </div>
            </div>

          </div>

          <div className="glass-card" style={{ background: 'rgba(0, 0, 0,0.02)', border: 'none', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <AlertCircle size={20} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              <strong>Estrategia de Victoria:</strong> En 2023, el alcalde fue electo con 27.330 votos en un escenario de alta dispersión. Para 2026, establecemos la meta en <strong>{campanaSettings.metaVotos.toLocaleString()} votos</strong> para consolidar una mayoría sólida e incontestable.
            </p>
          </div>
        </div>

        {/* Sección de Comunas y Metas Locales */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Monitoreo de Apoyos por Comuna</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Evolución del censo de simpatizantes por división territorial.</p>
            </div>
            
            {/* Input de Búsqueda */}
            <input 
              type="text" 
              placeholder="Buscar comuna..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', width: '160px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem', height: '100%', minHeight: '300px' }}>
            
            {/* Lista de Comunas */}
            <div style={{ overflowY: 'auto', maxHeight: '310px', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '0.25rem' }}>
              {filteredCommunes.map(commune => {
                const percent = ((commune.avanceApoyo / commune.metaApoyo) * 100).toFixed(0);
                const isSelected = selectedCommune.id === commune.id;
                
                return (
                  <div 
                    key={commune.id}
                    onClick={() => setSelectedCommune(commune)}
                    style={{
                      padding: '0.75rem 1rem',
                      background: isSelected ? 'var(--border-color)' : 'rgba(0, 0, 0,0.02)',
                      borderLeft: isSelected ? '3px solid var(--primary)' : '3px solid transparent',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}
                    className="commune-item"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{commune.nombre}</span>
                      <span style={{ fontSize: '0.8rem', color: isSelected ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 'bold' }}>{percent}%</span>
                    </div>
                    {/* Barra de Progreso */}
                    <div style={{ width: '100%', height: '4px', background: 'rgba(0, 0, 0,0.05)', borderRadius: '16px', overflow: 'hidden' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: 'var(--primary)', borderRadius: '16px' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ficha Detallada de la Comuna Seleccionada */}
            <div className="glass-card" style={{ background: 'rgba(0, 0, 0,0.03)', border: '1px solid rgba(0, 0, 0,0.04)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
              <div>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 'bold', display: 'block', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                  Ficha Territorial
                </span>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{selectedCommune.nombre}</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid rgba(0, 0, 0,0.05)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Votantes Habilitados:</span>
                  <span style={{ fontWeight: '600' }}>{selectedCommune.votantes.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid rgba(0, 0, 0,0.05)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Objetivo de Votos:</span>
                  <span style={{ fontWeight: '600', color: 'var(--secondary)' }}>{selectedCommune.metaApoyo.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid rgba(0, 0, 0,0.05)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Apoyos Confirmados:</span>
                  <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{selectedCommune.avanceApoyo.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Diferencia restante:</span>
                  <span style={{ fontWeight: '600', color: 'var(--accent-red)' }}>
                    {(selectedCommune.metaApoyo - selectedCommune.avanceApoyo).toLocaleString()}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(15,157,88,0.04)', padding: '0.75rem', borderRadius: '16px', border: '1px solid rgba(15,157,88,0.1)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)' }}>Estado de Campaña:</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {selectedCommune.avanceApoyo >= selectedCommune.metaApoyo * 0.85 
                    ? "★ Zona consolidada. Prioridad: Sostenimiento y fidelización." 
                    : "⚠️ Zona prioritaria. Requiere intensificar visitas puerta a puerta y eventos comunitarios."
                  }
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
