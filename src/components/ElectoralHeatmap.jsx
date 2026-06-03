import { MapContainer, TileLayer, Polygon, Popup, Tooltip, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Users, Vote, TrendingUp, TrendingDown, MapPin, Search, ChevronRight, Activity, Percent 
} from 'lucide-react';
import { electoralData } from '../data/campaignData';

// Mapbox token y estilo (se usa un tile público de OpenStreetMap ajustado a gris si no hay Mapbox token)
const MAPBOX_STYLE = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

// Datos expandidos (simulados geográficamente para demostración de Tunja)
// En un caso real estos vendrían de un GeoJSON o API de la Registraduría
const tunjaElectoralZones = [
  { id: 1, name: 'Comuna 1 (Norte)', type: 'Comuna', votosValidos: 8500, votosSenado: 1950, votosCamara: 1850, candidatoGanador: 'Pacto Histórico', diffSegundo: 400, participacion: 62.5, absPonderada: 37.5, potencialHist: 0.2, barrios: ['Muiscas', 'Suamox', 'Capitolio', 'Urb. La Entrada', 'Asís', 'El Tránsito'], coords: [[5.560, -73.340], [5.565, -73.355], [5.550, -73.360], [5.545, -73.345]] },
  { id: 2, name: 'Comuna 2 (Nororiente)', type: 'Comuna', votosValidos: 7200, votosSenado: 1800, votosCamara: 1720, candidatoGanador: 'Pacto Histórico', diffSegundo: 120, participacion: 58.2, absPonderada: 41.8, potencialHist: 0.25, barrios: ['Las Quintas', 'La Esmeralda', 'Rosales', 'San Blas', 'Urb. Los Lanceros'], coords: [[5.548, -73.340], [5.540, -73.330], [5.535, -73.345], [5.542, -73.350]] },
  { id: 3, name: 'Comuna 3 (Oriente)', type: 'Comuna', votosValidos: 8100, votosSenado: 1980, votosCamara: 1900, candidatoGanador: 'Pacto Histórico', diffSegundo: 310, participacion: 59.8, absPonderada: 40.2, potencialHist: 0.18, barrios: ['Patriotas', 'San Francisco', 'Cooservicios', 'El Jordán', 'Urb. Conzuelo'], coords: [[5.540, -73.330], [5.530, -73.325], [5.525, -73.340], [5.535, -73.345]] },
  { id: 4, name: 'Comuna 4 (Occidente)', type: 'Comuna', votosValidos: 7800, votosSenado: 1650, votosCamara: 1580, candidatoGanador: 'Pacto Histórico', diffSegundo: 550, participacion: 61.2, absPonderada: 38.8, potencialHist: 0.15, barrios: ['La Granja', 'Antonia Santos', 'Doña Eva', 'El Carmen', 'San Laureano'], coords: [[5.550, -73.360], [5.540, -73.370], [5.530, -73.365], [5.542, -73.350]] },
  { id: 5, name: 'Comuna 5 (Centro)', type: 'Comuna', votosValidos: 9500, votosSenado: 2200, votosCamara: 2100, candidatoGanador: 'Pacto Histórico', diffSegundo: 280, participacion: 64.5, absPonderada: 35.5, potencialHist: 0.22, barrios: ['Centro Histórico', 'Maldonado', 'Las Nieves', 'El Bosque', 'Plaza de Bolívar'], coords: [[5.542, -73.350], [5.535, -73.345], [5.525, -73.355], [5.530, -73.365]] },
  { id: 6, name: 'Comuna 6 (Suroriente)', type: 'Comuna', votosValidos: 10200, votosSenado: 12500, votosCamara: 11000, candidatoGanador: 'Pacto Histórico', diffSegundo: 850, participacion: 56.4, absPonderada: 43.6, potencialHist: 0.35, barrios: ['Barrio Runta', 'San Carlos', 'Ciudad Jardín', 'Doña Valentina', 'El Horno'], coords: [[5.525, -73.340], [5.510, -73.335], [5.505, -73.350], [5.520, -73.355]] },
  { id: 7, name: 'Comuna 7 (Sur)', type: 'Comuna', votosValidos: 12500, votosSenado: 12000, votosCamara: 9000, candidatoGanador: 'Pacto Histórico', diffSegundo: 1100, participacion: 55.8, absPonderada: 44.2, potencialHist: 0.38, barrios: ['San Antonio', 'El Libertador', 'El Milagro', 'Coasmedas', 'La Fuente'], coords: [[5.520, -73.355], [5.505, -73.350], [5.495, -73.365], [5.515, -73.370]] },
  { id: 8, name: 'Comuna 8 (Suroccidente)', type: 'Comuna', votosValidos: 8800, votosSenado: 6092, votosCamara: 5080, candidatoGanador: 'Pacto Histórico', diffSegundo: 150, participacion: 59.5, absPonderada: 40.5, potencialHist: 0.28, barrios: ['Altamira', 'El Consuelo', 'El Paraíso', 'La Florida', 'La Esperanza'], coords: [[5.530, -73.365], [5.520, -73.380], [5.505, -73.375], [5.515, -73.370]] }
];

// Calcular Potencial y Porcentajes
const enrichedZones = tunjaElectoralZones.map(zone => {
  const censo = Math.round(zone.votosValidos / (zone.participacion / 100));
  const abstencionCount = censo - zone.votosValidos;
  const potencial = Math.round(abstencionCount * zone.potencialHist);
  const porcentajePH = (zone.votosSenado / zone.votosValidos) * 100;
  const totalVotosPH = zone.votosSenado + zone.votosCamara; // Suma legislativa para visualización global o podemos usar el promedio
  const promedioPH = (zone.votosSenado + zone.votosCamara) / 2;
  
  let nivelPotencial = 'Bajo';
  if (potencial > 1500) nivelPotencial = 'Muy Alto';
  else if (potencial > 1000) nivelPotencial = 'Alto';
  else if (potencial > 500) nivelPotencial = 'Medio';

  return {
    ...zone,
    censo,
    abstencionCount,
    potencial,
    porcentajePH: (promedioPH / zone.votosValidos) * 100, 
    promedioPH,
    nivelPotencial
  };
});

// Función de color para Heatmap
const getHeatmapColor = (value, min, max, mode) => {
  let ratio = (value - min) / (max - min);
  ratio = Math.max(0, Math.min(1, ratio)); // Clamp 0-1
  
  if (mode === 'votos_ph' || mode === 'porcentaje_ph') {
    // Escala Turquesa a Azul Intenso
    // Cyan claro -> Turquesa Medio -> Azul Petróleo Oscuro
    const startColor = { r: 167, g: 243, b: 208 }; // Verde Claro #A7F3D0
    const endColor = { r: 0, g: 92, b: 110 }; // Azul Petróleo #005C6E

    const r = Math.round(startColor.r + (endColor.r - startColor.r) * ratio);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * ratio);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * ratio);
    
    return `rgb(${r}, ${g}, ${b})`;
  } else if (mode === 'potencial') {
    // Escala Morado claro a oscuro
    return ratio > 0.7 ? '#6D28D9' : ratio > 0.4 ? '#8B5CF6' : ratio > 0.2 ? '#A78BFA' : '#EDE9FE';
  } else if (mode === 'participacion') {
    // Escala Turquesa
    return `rgba(20, 184, 166, ${0.3 + (ratio * 0.7)})`;
  }
  return '#1F2937'; // Default Gris Oscuro
};

export default function ElectoralHeatmap() {
  const [metricMode, setMetricMode] = useState('votos_ph'); // votos_ph, porcentaje_ph, participacion, potencial
  const [selectedZone, setSelectedZone] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Limites min/max para las escalas
  const maxVotosPH = Math.max(...enrichedZones.map(z => z.promedioPH));
  const minVotosPH = Math.min(...enrichedZones.map(z => z.promedioPH));
  const maxPorcentaje = Math.max(...enrichedZones.map(z => z.porcentajePH));
  const minPorcentaje = Math.min(...enrichedZones.map(z => z.porcentajePH));
  const maxPotencial = Math.max(...enrichedZones.map(z => z.potencial));
  const minPotencial = Math.min(...enrichedZones.map(z => z.potencial));
  const maxParticipacion = Math.max(...enrichedZones.map(z => z.participacion));
  const minParticipacion = Math.min(...enrichedZones.map(z => z.participacion));

  // Top 10 Data para Gráficos
  const sortedByPH = [...enrichedZones].sort((a, b) => b.promedioPH - a.promedioPH).slice(0, 10);
  const chartData = sortedByPH.map(z => ({
    name: z.name.split(' ')[1].replace(/[()]/g, ''),
    VotosPH: z.promedioPH,
    Potencial: z.potencial
  }));

  // Totales
  const totalCenso = enrichedZones.reduce((acc, z) => acc + z.censo, 0);
  const totalVotos = enrichedZones.reduce((acc, z) => acc + z.votosValidos, 0);
  const totalVotosPH = enrichedZones.reduce((acc, z) => acc + z.promedioPH, 0);
  const porcentajeTotalPH = (totalVotosPH / totalVotos) * 100;

  useEffect(() => {
    // Seleccionar por defecto la zona con más votos
    if (!selectedZone) setSelectedZone(sortedByPH[0]);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full animate-fade-in text-gray-800">
      
      {/* COLUMNA IZQUIERDA: Mapa y Controles */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        
        {/* Encabezado y Filtros Principales */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm relative z-10">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold font-heading text-gray-900 flex items-center gap-2">
                <MapPin className="text-[#005C6E]" />
                Heatmap Electoral Tunja
              </h2>
              <p className="text-sm text-gray-500">Elecciones Presidenciales (2da Vuelta 2022) - Pacto Histórico</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar comuna..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Selector de Métricas */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'votos_ph', label: 'Total Votos PH', icon: Vote },
              { id: 'porcentaje_ph', label: '% Apoyo PH', icon: Percent },
              { id: 'participacion', label: 'Participación', icon: Activity },
              { id: 'potencial', label: 'Potencial Crecimiento', icon: TrendingUp }
            ].map(metric => (
              <button
                key={metric.id}
                onClick={() => setMetricMode(metric.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  metricMode === metric.id 
                    ? 'bg-[#005C6E]/10 text-[#005C6E] border border-[#005C6E]/30' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <metric.icon size={16} />
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenedor del Mapa (Leaflet) */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-[500px] relative">
          
          <MapContainer 
            center={[5.535, -73.355]} // Centro de Tunja aprox
            zoom={13} 
            style={{ height: '100%', width: '100%', zIndex: 10 }}
            scrollWheelZoom={false}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
              url={MAPBOX_STYLE}
            />
            
            {enrichedZones.filter(z => z.name.toLowerCase().includes(searchQuery.toLowerCase())).map(zone => {
              
              // Determinar color basado en el modo actual
              let fillColor = '#CCC';
              if (metricMode === 'votos_ph') fillColor = getHeatmapColor(zone.promedioPH, minVotosPH, maxVotosPH, 'votos_ph');
              if (metricMode === 'porcentaje_ph') fillColor = getHeatmapColor(zone.porcentajePH, minPorcentaje, maxPorcentaje, 'porcentaje_ph');
              if (metricMode === 'potencial') fillColor = getHeatmapColor(zone.potencial, minPotencial, maxPotencial, 'potencial');
              if (metricMode === 'participacion') fillColor = getHeatmapColor(zone.participacion, minParticipacion, maxParticipacion, 'participacion');

              return (
                <Polygon 
                  key={zone.id}
                  positions={zone.coords}
                  pathOptions={{ 
                    fillColor, 
                    fillOpacity: 0.7, 
                    color: selectedZone?.id === zone.id ? '#1A1A20' : '#ffffff', 
                    weight: selectedZone?.id === zone.id ? 3 : 1,
                    dashArray: selectedZone?.id === zone.id ? '' : '3'
                  }}
                  eventHandlers={{
                    click: () => {
                      setSelectedZone(zone);
                    }
                  }}
                >
                  <Tooltip permanent direction="center" className="text-[10px] font-bold leading-none bg-white text-gray-800 p-1 px-2 rounded-md shadow-md border-0 ring-1 ring-gray-200 z-[500] whitespace-nowrap opacity-90">
                    {zone.name.split(' ')[1].replace(/[()]/g, '')}
                  </Tooltip>
                  <Popup>
                    <div className="p-1 min-w-[200px]">
                      <span className="font-bold block border-b pb-1 mb-2 text-[#005C6E]">{zone.name}</span>
                      <div className="text-xs space-y-2">
                        <div className="flex justify-between"><span>Votantes de la zona:</span> <span className="font-bold text-gray-700">{zone.votosValidos.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span>Votos PH:</span> <span className="font-bold text-[#005C6E]">{zone.promedioPH.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span>Participación:</span> <span className="font-bold text-emerald-600">{zone.participacion}%</span></div>
                        <div className="flex justify-between pt-1 border-t"><span>Potencial Estimado:</span> <span className="font-bold text-purple-600">~{zone.potencial.toLocaleString()}</span></div>
                      </div>
                    </div>
                  </Popup>
                </Polygon>
              );
            })}
          </MapContainer>

          {/* Leyenda Flotante en el mapa */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-xl z-[400] text-xs w-56">
            <span className="font-bold block mb-2 text-gray-800 uppercase tracking-wider text-[10px]">
              {metricMode === 'votos_ph' && 'Intensidad de Votos PH'}
              {metricMode === 'porcentaje_ph' && 'Concentración (%) PH'}
              {metricMode === 'potencial' && 'Potencial Recuperación'}
              {metricMode === 'participacion' && 'Nivel de Participación'}
            </span>
            <div className="flex w-full h-2 rounded-full overflow-hidden mb-2 shadow-inner">
              <div className="h-full flex-1" style={{ background: metricMode === 'potencial' ? '#EDE9FE' : metricMode === 'participacion' ? 'rgba(20,184,166,0.3)' : '#A7F3D0' }}></div>
              <div className="h-full flex-1" style={{ background: metricMode === 'potencial' ? '#A78BFA' : metricMode === 'participacion' ? 'rgba(20,184,166,0.6)' : '#34D399' }}></div>
              <div className="h-full flex-1" style={{ background: metricMode === 'potencial' ? '#6D28D9' : metricMode === 'participacion' ? 'rgba(20,184,166,1)' : '#005C6E' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 font-medium tracking-widest uppercase">
              <span>Menor</span>
              <span>Mayor</span>
            </div>
          </div>
        </div>

      </div>

      {/* COLUMNA DERECHA: Dashboard Analítico */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        
        {/* Tarjeta de Resumen Global Tunja */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm relative overflow-hidden border border-gray-200">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#005C6E] opacity-[0.03] rounded-bl-full"></div>
          
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-[#005C6E] font-bold">Consolidado</h3>
            <span className="bg-[#005C6E]/10 text-[#005C6E] text-[10px] font-bold px-3 py-1 rounded-full border border-[#005C6E]/20 whitespace-nowrap">
              ELECCIONES 2022
            </span>
          </div>
          
          <div className="flex flex-col gap-2 mb-6 sm:mb-8">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider break-words flex flex-wrap">TOTAL VOTOS PACTO HISTÓRICO</p>
            <div className="flex flex-wrap items-baseline gap-3 mt-1">
              <p className="text-5xl font-bold text-gray-900 font-heading tracking-tight" style={{ fontSize: 'min(3.5rem, 12vw)', lineHeight: 1 }}>{totalVotosPH.toLocaleString()}</p>
              <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 whitespace-nowrap">
                <TrendingUp size={16} />
                {porcentajeTotalPH.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border-t border-gray-100 pt-5 sm:pt-6">
            <div className="flex flex-col">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Censo Total</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{totalCenso.toLocaleString()}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Participación Promedio</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{((totalVotos / totalCenso)*100).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Panel de Zona Seleccionada (Interacción) */}
        {selectedZone ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden ring-1 ring-gray-200 mt-6 lg:mt-0 transition-all duration-300">
            {/* Gradiente sutil de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#005C6E] opacity-[0.03] rounded-full blur-3xl" style={{ transform: 'translate(30%, -30%)' }}></div>
            
            {/* Header del Panel */}
            <div className="flex flex-col gap-4 mb-6 sm:mb-8 relative z-10 border-b border-gray-100 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-[#005C6E] bg-[#005C6E]/10 px-3 py-1 rounded-full uppercase tracking-wider border border-[#005C6E]/20 whitespace-nowrap">
                    FICHA TERRITORIAL
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                    RANKING #{sortedByPH.findIndex(z => z.id === selectedZone.id) + 1}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 leading-tight font-heading break-words" style={{ fontSize: 'min(2.5rem, 8vw)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  {selectedZone.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 flex items-center gap-1.5"><MapPin size={14} className="text-[#005C6E]" /> Centro Oriente</p>
              </div>
            </div>

            {/* Grid de Métricas Principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8 relative z-10 w-full overflow-hidden">
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200 relative overflow-hidden group hover:border-[#005C6E]/30 transition-colors h-fit flex flex-col justify-center min-h-[100px]">
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mb-1.5 font-semibold break-words">Total Votantes</p>
                <p className="font-bold text-gray-900 font-heading break-words" style={{ fontSize: 'min(2rem, 7vw)' }}>{selectedZone.votosValidos.toLocaleString()}</p>
              </div>

              <div className="bg-emerald-50/50 rounded-2xl p-4 sm:p-5 border border-emerald-100 relative overflow-hidden group hover:border-emerald-300 transition-colors h-fit flex flex-col justify-center min-h-[100px]">
                <p className="text-[10px] sm:text-xs text-emerald-700 uppercase tracking-widest mb-1.5 font-semibold break-words">Participación</p>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p className="font-bold text-emerald-600 font-heading break-words" style={{ fontSize: 'min(2.2rem, 8vw)' }}>{selectedZone.participacion}%</p>
                </div>
              </div>

              <div className="bg-[#005C6E]/5 rounded-2xl p-4 sm:p-5 lg:p-6 border border-[#005C6E]/20 col-span-1 sm:col-span-2 relative overflow-hidden h-fit flex flex-col min-h-[140px]">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#005C6E]/5 to-transparent"></div>
                <div className="flex flex-wrap justify-between items-center gap-3 mb-3 relative z-10 w-full">
                  <p className="text-[10px] sm:text-xs text-[#005C6E] uppercase tracking-wider font-semibold">Apoyo Pacto Histórico</p> 
                  <span className="text-[10px] sm:text-xs font-bold text-white bg-[#005C6E] px-2.5 py-1 rounded-md shadow-sm whitespace-nowrap">
                    {selectedZone.porcentajePH.toFixed(1)}%
                  </span>
                </div>
                <p className="font-bold text-[#005C6E] font-heading relative z-10 break-words mt-auto" style={{ fontSize: 'min(3rem, 10vw)' }}>{selectedZone.promedioPH.toLocaleString()}</p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden relative z-10 shrink-0">
                  <div className="bg-[#005C6E] h-2 rounded-full max-w-full" style={{ width: `${Math.min(selectedZone.porcentajePH, 100)}%` }}></div>
                </div>
              </div>
            </div>

            {/* Listado de Barrios */}
            <div className="relative z-10 w-full">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center justify-between">
                Barrios Integrantes ({selectedZone.barrios.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-h-[250px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                {selectedZone.barrios.map((barrio, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-gray-700 font-medium hover:bg-white hover:border-[#005C6E]/30 transition-colors shadow-sm whitespace-normal leading-tight h-fit" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    {barrio}
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 flex flex-col items-center justify-center min-h-[350px] shadow-sm mt-6 lg:mt-0">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 border border-gray-100">
              <MapPin size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading">Inteligencia Territorial</h3>
            <p className="text-sm max-w-xs leading-relaxed">Selecciona una comuna en el mapa interactivo para desplegar su ficha de análisis electoral detallada y barrios integrados.</p>
          </div>
        )}

        {/* Gráfico de Barras - Top Zonas */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm flex-1 mt-6 lg:mt-0">
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center justify-between">
            Desempeño y Potencial por Zona
            <ChevronRight size={16} className="text-gray-400" />
          </h4>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} width={120} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', background: '#ffffff', color: '#111827', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', color: '#111827' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="VotosPH" name="Votos Confirmados" stackId="a" fill="#005C6E" radius={[0, 0, 0, 0]} barSize={12} />
                <Bar dataKey="Potencial" name="Reserva/Potencial" stackId="a" fill="#10B981" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
