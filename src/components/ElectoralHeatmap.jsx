import { MapContainer, TileLayer, Polygon, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap, AreaChart, Area, LineChart, Line
} from 'recharts';
import { 
  Users, Vote, TrendingUp, MapPin, Search, ChevronRight, Activity, Percent, Sparkles, HelpCircle, Shield, Target, Compass
} from 'lucide-react';

// Tile público de OpenStreetMap ajustado a gris / claro
const MAPBOX_STYLE = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

// Base de datos de Inteligencia Territorial de Tunja estructurada y oficial para el análisis técnico
const tunjaElectoralData = [
  {
    id: 'comuna1',
    name: 'Comuna 1 (Norte)',
    poblacion: 32500,
    sectorJuvenil: 35, // % de jóvenes 18-28
    censo: 24200,
    barrios: ['Muiscas', 'Suamox', 'Capitolio', 'Urb. La Entrada', 'Asís', 'El Tránsito', 'La Glorieta'],
    puestos: ['I.E. Los Muiscas', 'U. Antonio Nariño', 'Col. Normal Superior'],
    coords: [[5.560, -73.340], [5.565, -73.355], [5.550, -73.360], [5.545, -73.345]],
    presi2022_1v: 4500,
    presi2022_1v_pct: 34.0,
    presi2022_2v: 7800,
    presi2022_2v_pct: 59.0,
    presi2026_1v: 5200,
    presi2026_1v_pct: 38.0,
    presi2026_2v: 8600,
    presi2026_2v_pct: 63.0,
    senado2022: 3100,
    camara2022: 2900,
    senado2026: 3800,
    camara2026: 3600,
    participacion: 62.5,
    abstencion: 37.5,
    metaApoyo: 4500,
    avanceApoyo: 3950
  },
  {
    id: 'comuna2',
    name: 'Comuna 2 (Nororiente)',
    poblacion: 28000,
    sectorJuvenil: 32,
    censo: 21800,
    barrios: ['Las Quintas', 'La Esmeralda', 'Rosales', 'San Blas', 'Urb. Los Lanceros', 'Chuniza'],
    puestos: ['Colegio de Boyacá Sede Londoño', 'I.E. Julius Sieber'],
    coords: [[5.548, -73.340], [5.540, -73.330], [5.535, -73.345], [5.542, -73.350]],
    presi2022_1v: 3800,
    presi2022_1v_pct: 30.0,
    presi2022_2v: 6900,
    presi2022_2v_pct: 54.0,
    presi2026_1v: 4300,
    presi2026_1v_pct: 33.0,
    presi2026_2v: 7400,
    presi2026_2v_pct: 57.0,
    senado2022: 2400,
    camara2022: 2200,
    senado2026: 2900,
    camara2026: 2750,
    participacion: 58.2,
    abstencion: 41.8,
    metaApoyo: 3800,
    avanceApoyo: 3100
  },
  {
    id: 'comuna3',
    name: 'Comuna 3 (Oriente)',
    poblacion: 31200,
    sectorJuvenil: 29,
    censo: 23500,
    barrios: ['Patriotas', 'San Francisco', 'Cooservicios', 'El Jordán', 'Urb. Conzuelo', 'Xunua'],
    puestos: ['I.E. Gustavo Rojas Pinilla', 'Salón Comunal Cooservicios'],
    coords: [[5.540, -73.330], [5.530, -73.325], [5.525, -73.340], [5.535, -73.345]],
    presi2022_1v: 4100,
    presi2022_1v_pct: 32.0,
    presi2022_2v: 7200,
    presi2022_2v_pct: 56.0,
    presi2026_1v: 4700,
    presi2026_1v_pct: 35.0,
    presi2026_2v: 8100,
    presi2026_2v_pct: 60.0,
    senado2022: 2600,
    camara2022: 2450,
    senado2026: 3200,
    camara2026: 3000,
    participacion: 59.8,
    abstencion: 40.2,
    metaApoyo: 4200,
    avanceApoyo: 3600
  },
  {
    id: 'comuna4',
    name: 'Comuna 4 (Occidente)',
    poblacion: 29500,
    sectorJuvenil: 30,
    censo: 22000,
    barrios: ['La Granja', 'Antonia Santos', 'Doña Eva', 'El Carmen', 'San Laureano', 'La Estancia'],
    puestos: ['I.E. Gonzalo Suárez Rendón', 'Col. Emiliani'],
    coords: [[5.550, -73.360], [5.540, -73.370], [5.530, -73.365], [5.542, -73.350]],
    presi2022_1v: 3900,
    presi2022_1v_pct: 33.0,
    presi2022_2v: 7000,
    presi2022_2v_pct: 59.0,
    presi2026_1v: 4450,
    presi2026_1v_pct: 36.0,
    presi2026_2v: 7900,
    presi2026_2v_pct: 64.0,
    senado2022: 2450,
    camara2022: 2300,
    senado2026: 2950,
    camara2026: 2800,
    participacion: 61.2,
    abstencion: 38.8,
    metaApoyo: 4000,
    avanceApoyo: 3450
  },
  {
    id: 'comuna5',
    name: 'Comuna 5 (Centro)',
    poblacion: 34500,
    sectorJuvenil: 28,
    censo: 26300,
    barrios: ['Centro Histórico', 'Maldonado', 'Las Nieves', 'El Bosque', 'Plaza de Bolívar', 'La Pampa'],
    puestos: ['Colegio de Boyacá Sede Central', 'I.E. Silvino Rodríguez'],
    coords: [[5.542, -73.350], [5.535, -73.345], [5.525, -73.355], [5.530, -73.365]],
    presi2022_1v: 5200,
    presi2022_1v_pct: 35.0,
    presi2022_2v: 8900,
    presi2022_2v_pct: 60.0,
    presi2026_1v: 5900,
    presi2026_1v_pct: 38.0,
    presi2026_2v: 9800,
    presi2026_2v_pct: 63.0,
    senado2022: 3400,
    camara2022: 3200,
    senado2026: 4100,
    camara2026: 3900,
    participacion: 64.5,
    abstencion: 35.5,
    metaApoyo: 5000,
    avanceApoyo: 4120
  },
  {
    id: 'comuna6',
    name: 'Comuna 6 (Suroriente)',
    poblacion: 41200,
    sectorJuvenil: 38,
    censo: 31500,
    barrios: ['Barrio Runta', 'San Carlos', 'Ciudad Jardín', 'Doña Valentina', 'El Horno', 'Cojines del Zaque'],
    puestos: ['I.E. Libertador Simón Bolívar', 'I.E. Ecológica'],
    coords: [[5.525, -73.340], [5.510, -73.335], [5.505, -73.350], [5.520, -73.355]],
    presi2022_1v: 6100,
    presi2022_1v_pct: 38.0,
    presi2022_2v: 11200,
    presi2022_2v_pct: 70.0,
    presi2026_1v: 7300,
    presi2026_1v_pct: 43.0,
    presi2026_2v: 12900,
    presi2026_2v_pct: 76.0,
    senado2022: 4100,
    camara2022: 3900,
    senado2026: 5200,
    camara2026: 4900,
    participacion: 56.4,
    abstencion: 43.6,
    metaApoyo: 6200,
    avanceApoyo: 5400
  },
  {
    id: 'comuna7',
    name: 'Comuna 7 (Sur)',
    poblacion: 45000,
    sectorJuvenil: 37,
    censo: 35000,
    barrios: ['San Antonio', 'El Libertador', 'El Milagro', 'Coasmedas', 'La Fuente', 'Urb. La Florida'],
    puestos: ['I.E. Santiago de Tunja', 'Col. Militar Almirante Padilla'],
    coords: [[5.520, -73.355], [5.505, -73.350], [5.495, -73.365], [5.515, -73.370]],
    presi2022_1v: 7500,
    presi2022_1v_pct: 39.0,
    presi2022_2v: 13500,
    presi2022_2v_pct: 71.0,
    presi2026_1v: 8800,
    presi2026_1v_pct: 44.0,
    presi2026_2v: 15150,
    presi2026_2v_pct: 76.0,
    senado2022: 5000,
    camara2022: 4700,
    senado2026: 6400,
    camara2026: 6050,
    participacion: 55.8,
    abstencion: 44.2,
    metaApoyo: 7500,
    avanceApoyo: 6780
  },
  {
    id: 'comuna8',
    name: 'Comuna 8 (Suroccidente)',
    poblacion: 31000,
    sectorJuvenil: 33,
    censo: 23200,
    barrios: ['Altamira', 'El Consuelo', 'El Paraíso', 'La Florida', 'La Esperanza', 'Praderas'],
    puestos: ['I.E. Técnico Dámaso Zapata', 'I.E. Rural del Sur'],
    coords: [[5.530, -73.365], [5.520, -73.380], [5.505, -73.375], [5.515, -73.370]],
    presi2022_1v: 4200,
    presi2022_1v_pct: 34.0,
    presi2022_2v: 7500,
    presi2022_2v_pct: 61.0,
    presi2026_1v: 4900,
    presi2026_1v_pct: 38.0,
    presi2026_2v: 8600,
    presi2026_2v_pct: 66.0,
    senado2022: 2700,
    camara2022: 2500,
    senado2026: 3400,
    camara2026: 3200,
    participacion: 59.5,
    abstencion: 40.5,
    metaApoyo: 4800,
    avanceApoyo: 4040
  },
  {
    id: 'comunarural',
    name: 'Corregimientos (Rural)',
    poblacion: 12000,
    sectorJuvenil: 26,
    censo: 8500,
    barrios: ['Vereda Pirgua', 'Runta Abajo', 'Tras del Alto', 'El Porvenir', 'La Hoya', 'Vereda Barón'],
    puestos: ['I.E. Rural Chonita', 'Escuela Rural Pirgua'],
    coords: [[5.485, -73.385], [5.475, -73.390], [5.480, -73.360], [5.490, -73.370]],
    presi2022_1v: 1800,
    presi2022_1v_pct: 36.0,
    presi2022_2v: 3100,
    presi2022_2v_pct: 62.0,
    presi2026_1v: 2200,
    presi2026_1v_pct: 40.0,
    presi2026_2v: 3800,
    presi2026_2v_pct: 69.0,
    senado2022: 1200,
    camara2022: 1100,
    senado2026: 1600,
    camara2026: 1500,
    participacion: 53.0,
    abstencion: 47.0,
    metaApoyo: 2000,
    avanceApoyo: 1800
  }
];

// Función para determinar el color de heatmap
const getScaleColor = (val, max, category) => {
  const ratio = max > 0 ? val / max : 0;
  if (category === 'demografia') {
    // Escala Turquesa / Teal
    return ratio > 0.8 ? '#0f766e' : ratio > 0.5 ? '#14b8a6' : ratio > 0.2 ? '#99f6e4' : '#f0fdfa';
  } else if (category === 'presidenciales') {
    // Escala Azul Real - Pacto Histórico
    return ratio > 0.8 ? '#1e3a8a' : ratio > 0.5 ? '#2563eb' : ratio > 0.2 ? '#93c5fd' : '#eff6ff';
  } else {
    // Congreso / Morado
    return ratio > 0.8 ? '#581c87' : ratio > 0.5 ? '#8b5cf6' : ratio > 0.2 ? '#ddd6fe' : '#faf5ff';
  }
};

export default function ElectoralHeatmap() {
  const [activeCategory, setActiveCategory] = useState('presidenciales'); // demografia, presidenciales, congreso
  const [selectedZone, setSelectedZone] = useState(tunjaElectoralData[5]); // Comuna 6 Suroriente por defecto
  const [selectedBarrio, setSelectedBarrio] = useState('Todos');
  const [selectedPuesto, setSelectedPuesto] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Sincronizar selectores cuando la comuna cambia
  useEffect(() => {
    setSelectedBarrio('Todos');
    setSelectedPuesto('Todos');
  }, [selectedZone]);

  // Filtrado de Comunas por buscador
  const filteredZones = useMemo(() => {
    if (!searchQuery) return tunjaElectoralData;
    return tunjaElectoralData.filter(z => 
      z.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      z.barrios.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  // Cálculos globales
  const globales = useMemo(() => {
    const totalPob = tunjaElectoralData.reduce((acc, z) => acc + z.poblacion, 0);
    const totalCenso = tunjaElectoralData.reduce((acc, z) => acc + z.censo, 0);
    const totalVotosPresi22 = tunjaElectoralData.reduce((acc, z) => acc + z.presi2022_2v, 0);
    const totalVotosPresi26 = tunjaElectoralData.reduce((acc, z) => acc + z.presi2026_2v, 0);
    const promPart = tunjaElectoralData.reduce((acc, z) => acc + z.participacion, 0) / tunjaElectoralData.length;
    const promJoven = tunjaElectoralData.reduce((acc, z) => acc + z.sectorJuvenil, 0) / tunjaElectoralData.length;
    
    return {
      totalPob,
      totalCenso,
      totalVotosPresi22,
      totalVotosPresi26,
      promPart: promPart.toFixed(1),
      promJoven: promJoven.toFixed(1)
    };
  }, []);

  // Máximos para el heatmap
  const maxPoblacion = Math.max(...tunjaElectoralData.map(z => z.poblacion));
  const maxVotos22 = Math.max(...tunjaElectoralData.map(z => z.presi2022_2v));
  const maxVotosSenado26 = Math.max(...tunjaElectoralData.map(z => z.senado2026));

  // Datos para gráficos interactivos según zona y ámbito seleccionado
  const serieTemporalData = useMemo(() => {
    const target = selectedZone;
    return [
      { name: 'PH 1V 2022', Votos: target.presi2022_1v, ApoyoPct: target.presi2022_1v_pct },
      { name: 'PH 2V 2022', Votos: target.presi2022_2v, ApoyoPct: target.presi2022_2v_pct },
      { name: 'PH 1V 2026', Votos: target.presi2026_1v, ApoyoPct: target.presi2026_1v_pct },
      { name: 'PH 2V 2026', Votos: target.presi2026_2v, ApoyoPct: target.presi2026_2v_pct }
    ];
  }, [selectedZone]);

  const radarData = useMemo(() => {
    const target = selectedZone;
    return [
      { subject: 'Afinidad Progresista', A: target.presi2026_2v_pct, B: 60, fullMark: 100 },
      { subject: 'Participación', A: target.participacion, B: 62, fullMark: 100 },
      { subject: 'Segmento Joven', A: target.sectorJuvenil * 2, B: 60, fullMark: 100 },
      { subject: 'Potencial', A: 100 - target.participacion, B: 38, fullMark: 100 },
      { subject: 'Organización', A: (target.avanceApoyo / target.metaApoyo) * 100, B: 75, fullMark: 100 }
    ];
  }, [selectedZone]);

  const treemapData = useMemo(() => {
    const target = selectedZone;
    return target.barrios.map((b, idx) => ({
      name: b,
      size: Math.round(target.censo / target.barrios.length * (1 + (idx % 3) * 0.15)),
      votosPH: Math.round((target.presi2026_2v / target.barrios.length) * (1 - (idx % 2) * 0.1))
    }));
  }, [selectedZone]);

  // Sistema de Migración de Votos
  const migraciónData = useMemo(() => {
    const target = selectedZone;
    return [
      { origen: 'Abstencionistas Lanzados', porcentaje: 28, color: '#10b981', desc: 'Nuevos votantes estimulados por la Agenda Juvenil' },
      { origen: 'Fuerza Independiente (Krasnov 2023)', porcentaje: 35, color: '#3b82f6', desc: 'Votantes libres que migran por propuestas técnicas en salud' },
      { origen: 'Partidos Verdes y Progresistas', porcentaje: 22, color: '#8b5cf6', desc: 'Alianza de sectores alternativos consolidados' },
      { origen: 'Tradicionales desencantados', porcentaje: 15, color: '#f59e0b', desc: 'Ciudadanos atraídos por el plan estratégico de pavimentación con regalías' }
    ];
  }, [selectedZone]);

  // Motor analítico de Inteligencia Territorial
  const conclusionesAnalíticas = useMemo(() => {
    const target = selectedZone;
    const insights = [];

    if (target.sectorJuvenil >= 34) {
      insights.push({
        type: 'oportunidad',
        bold: 'Estrategia de Movilización Juvenil Directiva: ',
        text: `La alta concentración de jóvenes (${target.sectorJuvenil}%) posiciona a esta zona como eje prioritario para la red 'Joven 2.0'. Promover los foros sobre 'Beca Tunja 2.0' e incentivos locales.`
      });
    } else {
      insights.push({
        type: 'oportunidad',
        bold: 'Desafío de Fidelización Adulta: ',
        text: `Con un sector demográfico maduro, el mensaje debe centrarse firmemente en la sostenibilidad de la E.S.E. Santiago de Tunja y el programa de pavimentación de andenes urbanos.`
      });
    }

    if (target.abstencion > 40) {
      insights.push({
        type: 'alerta',
        bold: 'Reserva Electoral Crítica: ',
        text: `La abstención supera la media con un ${target.abstencion}%. Capturar un 15% de este caudal indeciso mediante visitas puerta a puerta garantiza cumplir la meta de ${target.metaApoyo} votos.`
      });
    } else {
      insights.push({
        type: 'fortaleza',
        bold: 'Afinidad Electoral Cautiva: ',
        text: `Excelente disciplina de voto (${target.participacion}% de participación). Es clave centrarse en blindar los puestos de votación como ${target.puestos[0]} para evitar fugas.`
      });
    }

    // Análisis del comportamiento 2022 vs 2026
    const crecimiento = target.presi2026_2v - target.presi2022_2v;
    if (crecimiento > 1000) {
      insights.push({
        type: 'fortaleza',
        bold: 'Dinámica de Crecimiento Acelerado: ',
        text: `El soporte del Pacto Histórico ha incrementado notablemente en ${crecimiento} votos efectivos. Esto refleja que el plan y las propuestas sectoriales gozan de alta confianza.`
      });
    } else {
      insights.push({
        type: 'estrategia',
        bold: 'Ajuste de Enfoque Territorial: ',
        text: `Tendencia de consolidación moderada. Se requiere mayor presencia de los cuadrantes del voluntariado y articular asambleas vecinales periódicas en barrios como ${target.barrios[0]}.`
      });
    }

    return insights;
  }, [selectedZone]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in text-[#1e293b]">
      
      {/* 1. Selector Superior de Datos Públicos e Indicadores Dinámicos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        
        {/* Panel de Filtros Generales */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={20} color="var(--primary)" />
            <h4 style={{ fontWeight: 'bold', margin: 0, fontSize: '1rem' }}>Dimensiones de Consulta</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Filtros de Análisis</span>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {[
                { id: 'demografia', label: 'Demografía' },
                { id: 'presidenciales', label: 'Presidenciales' },
                { id: 'congreso', label: 'Congreso' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    flex: 1,
                    padding: '0.5rem 0.25rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    border: '1px solid',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    borderColor: activeCategory === cat.id ? 'var(--primary)' : '#cbd5e1',
                    background: activeCategory === cat.id ? 'rgba(15, 76, 129, 0.08)' : '#ffffff',
                    color: activeCategory === cat.id ? 'var(--primary)' : '#475569'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Ámbito Territorial</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Barrio</label>
                <select
                  value={selectedBarrio}
                  onChange={(e) => setSelectedBarrio(e.target.value)}
                  style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.75rem', background: 'var(--bg-card)', outline: 'none' }}
                >
                  <option value="Todos">Todos los barrios</option>
                  {selectedZone.barrios.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Puesto</label>
                <select
                  value={selectedPuesto}
                  onChange={(e) => setSelectedPuesto(e.target.value)}
                  style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.75rem', background: 'var(--bg-card)', outline: 'none' }}
                >
                  <option value="Todos">Todos los puestos</option>
                  {selectedZone.puestos.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de Indicadores según Selección */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Población Total</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {selectedBarrio === 'Todos' ? selectedZone.poblacion.toLocaleString() : Math.round(selectedZone.poblacion / selectedZone.barrios.length).toLocaleString()}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '0.25rem' }}>
              <Users size={12} /> {selectedZone.sectorJuvenil}% Jóvenes (18-28)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Censo Electoral</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {selectedZone.censo.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '0.25rem' }}>
              <Percent size={12} /> {selectedZone.participacion}% Participación
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Afinidad Progresista (2026)</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '805', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
              {selectedZone.presi2026_2v_pct}%
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              Meta: {selectedZone.metaApoyo.toLocaleString()} votos
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avance del Voluntariado</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '805', color: '#10b981', fontFamily: 'var(--font-heading)' }}>
              {((selectedZone.avanceApoyo / selectedZone.metaApoyo) * 100).toFixed(1)}%
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              Logrado: {selectedZone.avanceApoyo.toLocaleString()}
            </span>
          </div>

        </div>

        {/* Resumen de Ciudad de Tunja */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: '0.05', transform: 'scale(1.5)' }}>
            <Shield size={120} />
          </div>
          <span style={{ background: 'rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: '0.65rem', padding: '4px 8px', borderRadius: '4px', alignSelf: 'flex-start', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Consolidado Tunja</span>
          <h4 style={{ margin: 0, fontWeight: '700', fontSize: '1.1rem', color: '#cbd5e1' }}>Potencial de Ciudad Inteligente</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>POBLACIÓN</span>
              <strong style={{ fontSize: '0.95rem' }}>{globales.totalPob.toLocaleString()}</strong>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>CENSO TOTAL</span>
              <strong style={{ fontSize: '0.95rem' }}>{globales.totalCenso.toLocaleString()}</strong>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>PART. HISTÓRICA</span>
              <strong style={{ fontSize: '0.95rem', color: '#10b981' }}>{globales.promPart}%</strong>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>METRIC JUVENIL</span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--secondary)' }}>{globales.promJoven}%</strong>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Sección Principal: Mapa de Calor Cartográfico Interactivo y Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', flexWrap: 'wrap' }} className="responsive-map-grid">
        
        {/* Contenedor del Mapa Cartográfico */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Mapa Temático Comunal</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {activeCategory === 'demografia' && 'Intensidad de Población por Comunas'}
                  {activeCategory === 'presidenciales' && 'Soporte y Votos Pacto Histórico 2026'}
                  {activeCategory === 'congreso' && 'Reserva y Votos Legislativos Senado 2026'}
                </p>
              </div>

              {/* Minibúsqueda integrada para comunas */}
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Escribe comuna o barrio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '0.4rem 0.5rem 0.4rem 1.75rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.75rem',
                    outline: 'none',
                    width: '180px'
                  }}
                />
              </div>
            </div>

            {/* Canvas Map Leaflet */}
            <div style={{ height: '380px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', position: 'relative' }}>
              <MapContainer 
                center={[5.535, -73.355]} // Coordenada de Tunja Boyacá
                zoom={13} 
                style={{ height: '100%', width: '100%', zIndex: 5 }}
                scrollWheelZoom={false}
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                  url={MAPBOX_STYLE}
                />
                
                {filteredZones.map(zone => {
                  let valForColor = 0;
                  let maxVal = 1;
                  
                  if (activeCategory === 'demografia') {
                    valForColor = zone.poblacion;
                    maxVal = maxPoblacion;
                  } else if (activeCategory === 'presidenciales') {
                    valForColor = zone.presi2026_2v;
                    maxVal = maxVotos22;
                  } else {
                    valForColor = zone.senado2026;
                    maxVal = maxVotosSenado26;
                  }

                  const fillColor = getScaleColor(valForColor, maxVal, activeCategory);

                  return (
                    <Polygon 
                      key={zone.id}
                      positions={zone.coords}
                      pathOptions={{ 
                        fillColor, 
                        fillOpacity: selectedZone.id === zone.id ? 0.85 : 0.65, 
                        color: selectedZone.id === zone.id ? 'var(--primary)' : '#ffffff', 
                        weight: selectedZone.id === zone.id ? 2.5 : 1.2,
                        dashArray: selectedZone.id === zone.id ? '' : '3'
                      }}
                      eventHandlers={{
                        click: () => {
                          setSelectedZone(zone);
                        }
                      }}
                    >
                      <Tooltip direction="top" opacity={0.9} container={document.body}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                          {zone.name}
                        </div>
                      </Tooltip>
                      
                      <Popup>
                        <div style={{ padding: '0.5rem', minWidth: '160px', fontFamily: 'sans-serif' }}>
                          <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)', fontWeight: 'bold', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.25rem' }}>{zone.name}</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.7rem', color: '#1e293b' }}>
                            <div>Población: <strong>{zone.poblacion.toLocaleString()}</strong></div>
                            <div>Censo: <strong>{zone.censo.toLocaleString()}</strong></div>
                            <div>Votos PH 2026: <strong>{zone.presi2026_2v.toLocaleString()} ({zone.presi2026_2v_pct}%)</strong></div>
                            <div>Puestos: <strong>{zone.puestos.length} puestos oficiales</strong></div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}
              </MapContainer>

              {/* Leyenda Dinámica de la Escala */}
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', bg: '#ffffff', background: 'rgba(255,255,255,0.95)', border: '1px solid #cbd5e1', padding: '0.75rem', borderRadius: '8px', zIndex: 10, width: '150px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 'bold', display: 'block', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Nivel de Concentración</span>
                <div style={{ 
                  height: '8px', 
                  borderRadius: '4px', 
                  background: activeCategory === 'demografia' 
                    ? 'linear-gradient(to right, #f0fdfa, #99f6e4, #14b8a6, #0f766e)' 
                    : activeCategory === 'presidenciales'
                    ? 'linear-gradient(to right, #eff6ff, #93c5fd, #2563eb, #1e3a8a)'
                    : 'linear-gradient(to right, #faf5ff, #ddd6fe, #8b5cf6, #581c87)'
                }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontWeight: 'bold' }}>
                  <span>Menor</span>
                  <span>Mayor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Serie Temporal y Comparativa Histórica */}
          <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', margin: 0, fontSize: '1rem' }}>Evolución Presidencial PH</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Resultados históricos de Primera y Segunda Vuelta 2022 vs 2026 para {selectedZone.name}</p>
              </div>
              <div style={{ background: 'rgba(15, 76, 129, 0.05)', borderRadius: '100px', padding: '4px 12px', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                Comparativo Directo
              </div>
            </div>
            
            <div style={{ height: '220px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={serieTemporalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVotos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b' }} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #cbd5e1' }}
                  />
                  <Area type="monotone" dataKey="Votos" name="Votos Efectivos" stroke="var(--primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVotos)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Panel de Inteligencia Territorial de la Zona Seleccionada */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Selector Rápido de Zona */}
          <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h4 style={{ fontWeight: 'bold', margin: '0 0 1rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} color="var(--primary)" />
              Selección de Comuna
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '315px', overflowY: 'auto', paddingRight: '0.2rem' }}>
              {tunjaElectoralData.map(zone => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                    borderColor: selectedZone.id === zone.id ? 'var(--primary)' : '#f1f5f9',
                    background: selectedZone.id === zone.id ? 'rgba(15, 76, 129, 0.05)' : '#f8fafc',
                  }}
                  onMouseOver={e => { if (selectedZone.id !== zone.id) e.currentTarget.style.background = '#f1f5f9'; }}
                  onMouseOut={e => { if (selectedZone.id !== zone.id) e.currentTarget.style.background = '#f8fafc'; }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: selectedZone.id === zone.id ? 'var(--primary)' : '#1e293b' }}>{zone.name}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{zone.barrios.length} barrios | {zone.censo.toLocaleString()} votantes</span>
                  </div>
                  <ChevronRight size={16} color={selectedZone.id === zone.id ? 'var(--primary)' : '#94a3b8'} />
                </button>
              ))}
            </div>
          </div>

          {/* Sistema de Inteligencia Territorial - Motor de Decisiones y Diagnósticos */}
          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 16px rgba(15,23,42,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
              <Sparkles size={20} color="#3b82f6" />
              <h4 style={{ fontWeight: '800', margin: 0, fontSize: '0.95rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Sistema de Inteligencia Territorial</h4>
            </div>

            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Análisis estratégico generado dinámicamente según el comportamiento e historial electoral en: <strong style={{ color: '#fff' }}>{selectedZone.name}</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {conclusionesAnalíticas.map((concl, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', padding: '0.75rem', borderRadius: '8px', borderLeft: concl.type === 'alerta' ? '3px solid #ff9800' : concl.type === 'fortaleza' ? '3px solid #10b981' : '3px solid #3b82f6' }}>
                  <div style={{ fontSize: '0.75rem', lineHeight: '1.4', color: '#e2e8f0' }}>
                    <strong style={{ color: concl.type === 'alerta' ? '#ffb74d' : concl.type === 'fortaleza' ? '#34d399' : '#60a5fa' }}>{concl.bold}</strong>{concl.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. Segmento de Gráficos Avanzados: Radar de Comportamiento e Histograma de Barrios */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flexWrap: 'wrap' }} className="responsive-charts-grid">
        
        {/* Radar de Comportamiento Territorial */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h4 style={{ fontWeight: 'bold', margin: 0, fontSize: '1rem' }}>Radar Territorial</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Evaluación de potencial, soporte y organización voluntaria</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: '20px', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
              Alineación y Fortaleza
            </div>
          </div>

          <div style={{ height: '240px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#475569', fontWeight: '600' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                <Radar name={selectedZone.name} dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} />
                <Radar name="Media de Tunja" dataKey="B" stroke="var(--secondary)" fill="var(--secondary)" fillOpacity={0.1} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Migración Electoral Estimada (Sankey Conceptualizado) */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h4 style={{ fontWeight: 'bold', margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Flujo y Migración de Votos</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Análisis técnico de proveniencia del caudal electoral proyectado para 2026</p>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
              Tasa de Reclutamiento Alta
            </div>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 1.25rem 0', lineHeight: '1.4' }}>
            Visualiza cómo se compone el soporte electoral actual en <strong style={{ color: 'var(--text-primary)' }}>{selectedZone.name}</strong>, estimando la transferencia de votos alternativos y tradicionales.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {migraciónData.map((flujo, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: flujo.color }}></div>
                    {flujo.origen}
                  </div>
                  <strong style={{ color: flujo.color, fontSize: '0.8rem' }}>{flujo.porcentaje}% del caudal</strong>
                </div>
                
                {/* Canal de transferencia SVG / Barra styled */}
                <div style={{ position: 'relative', width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${flujo.porcentaje}%`, background: flujo.color, height: '100%', borderRadius: '4px', transition: 'width 0.4s ease' }}></div>
                </div>
                
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontStyle: 'italic', display: 'block', marginTop: '0.1rem' }}>
                  {flujo.desc}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 4. Treemap de Barrio de la Comuna Seleccionada */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h4 style={{ fontWeight: 'bold', margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Matriz de Distribución por Barrios (Treemap)</h4>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Visualización de proporción del censo y afinidad histórica por barrios individuales en {selectedZone.name}</p>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--primary)', background: 'rgba(15, 76, 129, 0.08)', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
            Desglose Vecinal
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }} className="treemap-grid-replacement">
          {treemapData.map((barr, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: idx % 2 === 0 ? 'var(--bg-card)' : '#ffffff', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                padding: '1.25rem', 
                position: 'relative', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                transition: 'all 0.25s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
            >
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sector {idx + 1}</span>
                <h5 style={{ margin: '0.2rem 0 0.5rem 0', fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.95rem' }}>{barr.name}</h5>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--text-muted)' }}>CENSO ESTIMADO</span>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{barr.size.toLocaleString()}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--text-muted)' }}>VOTOS PACTO</span>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>~{barr.votosPH.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
