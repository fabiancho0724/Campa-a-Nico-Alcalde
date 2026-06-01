import { MapContainer, TileLayer, Polygon, Popup, useMap, GeoJSON } from 'react-leaflet';
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
  { id: 1, name: 'Comuna 1 (Norte)', type: 'Comuna', votosValidos: 8500, votosPH: 1950, candidatoGanador: 'Rodolfo H.', diffSegundo: 400, participacion: 62.5, absPonderada: 37.5, potencialHist: 0.2, coords: [[5.560, -73.340], [5.565, -73.355], [5.550, -73.360], [5.545, -73.345]] },
  { id: 2, name: 'Comuna 2 (Nororiente)', type: 'Comuna', votosValidos: 7200, votosPH: 1800, candidatoGanador: 'Pacto Histórico', diffSegundo: 120, participacion: 58.2, absPonderada: 41.8, potencialHist: 0.25, coords: [[5.548, -73.340], [5.540, -73.330], [5.535, -73.345], [5.542, -73.350]] },
  { id: 3, name: 'Comuna 3 (Oriente)', type: 'Comuna', votosValidos: 8100, votosPH: 1980, candidatoGanador: 'Rodolfo H.', diffSegundo: 310, participacion: 59.8, absPonderada: 40.2, potencialHist: 0.18, coords: [[5.540, -73.330], [5.530, -73.325], [5.525, -73.340], [5.535, -73.345]] },
  { id: 4, name: 'Comuna 4 (Occidente)', type: 'Comuna', votosValidos: 7800, votosPH: 1650, candidatoGanador: 'Rodolfo H.', diffSegundo: 550, participacion: 61.2, absPonderada: 38.8, potencialHist: 0.15, coords: [[5.550, -73.360], [5.540, -73.370], [5.530, -73.365], [5.542, -73.350]] },
  { id: 5, name: 'Comuna 5 (Centro)', type: 'Comuna', votosValidos: 9500, votosPH: 2200, candidatoGanador: 'Rodolfo H.', diffSegundo: 280, participacion: 64.5, absPonderada: 35.5, potencialHist: 0.22, coords: [[5.542, -73.350], [5.535, -73.345], [5.525, -73.355], [5.530, -73.365]] },
  { id: 6, name: 'Comuna 6 (Suroriente)', type: 'Comuna', votosValidos: 10200, votosPH: 3850, candidatoGanador: 'Pacto Histórico', diffSegundo: 850, participacion: 56.4, absPonderada: 43.6, potencialHist: 0.35, coords: [[5.525, -73.340], [5.510, -73.335], [5.505, -73.350], [5.520, -73.355]] },
  { id: 7, name: 'Comuna 7 (Sur)', type: 'Comuna', votosValidos: 12500, votosPH: 4100, candidatoGanador: 'Pacto Histórico', diffSegundo: 1100, participacion: 55.8, absPonderada: 44.2, potencialHist: 0.38, coords: [[5.520, -73.355], [5.505, -73.350], [5.495, -73.365], [5.515, -73.370]] },
  { id: 8, name: 'Comuna 8 (Suroccidente)', type: 'Comuna', votosValidos: 8800, votosPH: 2350, candidatoGanador: 'Rodolfo H.', diffSegundo: 150, participacion: 59.5, absPonderada: 40.5, potencialHist: 0.28, coords: [[5.530, -73.365], [5.520, -73.380], [5.505, -73.375], [5.515, -73.370]] }
];

// Calcular Potencial y Porcentajes
const enrichedZones = tunjaElectoralZones.map(zone => {
  const censo = Math.round(zone.votosValidos / (zone.participacion / 100));
  const abstencionCount = censo - zone.votosValidos;
  const potencial = Math.round(abstencionCount * zone.potencialHist);
  const porcentajePH = (zone.votosPH / zone.votosValidos) * 100;
  
  let nivelPotencial = 'Bajo';
  if (potencial > 1500) nivelPotencial = 'Muy Alto';
  else if (potencial > 1000) nivelPotencial = 'Alto';
  else if (potencial > 500) nivelPotencial = 'Medio';

  return {
    ...zone,
    censo,
    abstencionCount,
    potencial,
    porcentajePH,
    nivelPotencial
  };
});

// Función de color para Heatmap
const getHeatmapColor = (value, min, max, mode) => {
  let ratio = (value - min) / (max - min);
  ratio = Math.max(0, Math.min(1, ratio)); // Clamp 0-1
  
  if (mode === 'votos_ph' || mode === 'porcentaje_ph') {
    // Escala Rojo (Pacto Histórico)
    // Amarillo -> Naranja -> Rojo Oscuro
    const r = 255;
    const g = Math.round(255 * (1 - ratio));
    const b = Math.round(150 * (1 - ratio));
    return `rgb(${r}, ${g}, ${b})`;
  } else if (mode === 'potencial') {
    // Escala Verde/Azul para potencial
    return ratio > 0.7 ? '#10B981' : ratio > 0.4 ? '#34D399' : ratio > 0.2 ? '#6EE7B7' : '#D1FAE5';
  } else if (mode === 'participacion') {
    // Escala Azul
    return `rgba(59, 130, 246, ${0.2 + (ratio * 0.8)})`;
  }
  return '#9CA3AF'; // Default Gris
};

export default function ElectoralHeatmap() {
  const [metricMode, setMetricMode] = useState('votos_ph'); // votos_ph, porcentaje_ph, participacion, potencial
  const [selectedZone, setSelectedZone] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Limites min/max para las escalas
  const maxVotosPH = Math.max(...enrichedZones.map(z => z.votosPH));
  const minVotosPH = Math.min(...enrichedZones.map(z => z.votosPH));
  const maxPorcentaje = Math.max(...enrichedZones.map(z => z.porcentajePH));
  const minPorcentaje = Math.min(...enrichedZones.map(z => z.porcentajePH));
  const maxPotencial = Math.max(...enrichedZones.map(z => z.potencial));
  const minPotencial = Math.min(...enrichedZones.map(z => z.potencial));
  const maxParticipacion = Math.max(...enrichedZones.map(z => z.participacion));
  const minParticipacion = Math.min(...enrichedZones.map(z => z.participacion));

  // Top 10 Data para Gráficos
  const sortedByPH = [...enrichedZones].sort((a, b) => b.votosPH - a.votosPH).slice(0, 10);
  const chartData = sortedByPH.map(z => ({
    name: z.name.split(' ')[1].replace(/[()]/g, ''),
    VotosPH: z.votosPH,
    Potencial: z.potencial
  }));

  // Totales
  const totalCenso = enrichedZones.reduce((acc, z) => acc + z.censo, 0);
  const totalVotos = enrichedZones.reduce((acc, z) => acc + z.votosValidos, 0);
  const totalVotosPH = enrichedZones.reduce((acc, z) => acc + z.votosPH, 0);
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
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold font-heading text-gray-900 flex items-center gap-2">
                <MapPin className="text-red-500" />
                Heatmap Electoral Tunja
              </h2>
              <p className="text-sm text-gray-500">Resultados Presidenciales - Pacto Histórico</p>
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
                    ? 'bg-red-50 text-red-600 border border-red-200' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
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
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
              url={MAPBOX_STYLE}
            />
            
            {enrichedZones.filter(z => z.name.toLowerCase().includes(searchQuery.toLowerCase())).map(zone => {
              
              // Determinar color basado en el modo actual
              let fillColor = '#CCC';
              if (metricMode === 'votos_ph') fillColor = getHeatmapColor(zone.votosPH, minVotosPH, maxVotosPH, 'votos_ph');
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
                    color: selectedZone?.id === zone.id ? '#111827' : '#ffffff', 
                    weight: selectedZone?.id === zone.id ? 2 : 1,
                    dashArray: selectedZone?.id === zone.id ? '' : '3'
                  }}
                  eventHandlers={{
                    click: () => setSelectedZone(zone)
                  }}
                >
                  <Popup>
                    <div className="p-1 min-w-[150px]">
                      <span className="font-bold block border-b pb-1 mb-2">{zone.name}</span>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between"><span>Votos PH:</span> <span className="font-bold text-red-600">{zone.votosPH.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span>Participación:</span> <span>{zone.participacion}%</span></div>
                      </div>
                    </div>
                  </Popup>
                </Polygon>
              );
            })}
          </MapContainer>

          {/* Leyenda Flotante en el mapa */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-gray-200 shadow-sm z-[20] text-xs">
            <span className="font-bold block mb-2 text-gray-700">
              {metricMode === 'votos_ph' && 'Intensidad de Votos PH'}
              {metricMode === 'porcentaje_ph' && 'Concentración (%) PH'}
              {metricMode === 'potencial' && 'Potencial Recuperación'}
              {metricMode === 'participacion' && 'Nivel de Participación'}
            </span>
            <div className="flex w-32 h-3 rounded-full overflow-hidden mb-1">
              <div className="h-full flex-1" style={{ background: metricMode === 'potencial' ? '#D1FAE5' : metricMode === 'participacion' ? 'rgba(59,130,246,0.2)' : 'rgb(255,255,150)' }}></div>
              <div className="h-full flex-1" style={{ background: metricMode === 'potencial' ? '#6EE7B7' : metricMode === 'participacion' ? 'rgba(59,130,246,0.5)' : 'rgb(255,150,50)' }}></div>
              <div className="h-full flex-1" style={{ background: metricMode === 'potencial' ? '#10B981' : metricMode === 'participacion' ? 'rgba(59,130,246,0.9)' : 'rgb(255,0,0)' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 font-medium">
              <span>Menor</span>
              <span>Mayor</span>
            </div>
          </div>
        </div>

      </div>

      {/* COLUMNA DERECHA: Dashboard Analítico */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        
        {/* Tarjeta de Resumen Global Tunja */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full"></div>
          <h3 className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-4">Consolidado Tunja</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Total Votos PH</p>
              <p className="text-2xl font-bold text-red-400">{totalVotosPH.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">% Apoyo Global</p>
              <p className="text-2xl font-bold text-white">{porcentajeTotalPH.toFixed(1)}%</p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-3">
            <p className="text-xs text-gray-400 flex justify-between">
              <span>Censo Total:</span> <strong>{totalCenso.toLocaleString()}</strong>
            </p>
            <p className="text-xs text-gray-400 flex justify-between mt-1">
              <span>Participación Promedio:</span> <strong>{((totalVotos / totalCenso)*100).toFixed(1)}%</strong>
            </p>
          </div>
        </div>

        {/* Panel de Zona Seleccionada (Interacción) */}
        {selectedZone ? (
          <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-2xl"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full uppercase">Zona Seleccionada</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 leading-tight">{selectedZone.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 uppercase block">Ranking Local</span>
                <span className="text-lg font-bold text-gray-900">
                  #{sortedByPH.findIndex(z => z.id === selectedZone.id) + 1}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] text-gray-500 uppercase mb-1">Votación PH</p>
                <p className="text-lg font-bold text-gray-900">{selectedZone.votosPH.toLocaleString()}</p>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${selectedZone.porcentajePH}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{selectedZone.porcentajePH.toFixed(1)}% del total</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] text-gray-500 uppercase mb-1">Potencial Reserva</p>
                <p className="text-lg font-bold text-emerald-600">~{selectedZone.potencial.toLocaleString()}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                  selectedZone.nivelPotencial === 'Muy Alto' ? 'bg-emerald-100 text-emerald-700' :
                  selectedZone.nivelPotencial === 'Alto' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  NIVEL: {selectedZone.nivelPotencial}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Candidato Ganador local:</span>
                <span className="font-medium text-gray-900">{selectedZone.candidatoGanador}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Diferencia con P.H.:</span>
                <span className="font-medium text-red-500">
                  {selectedZone.candidatoGanador === 'Pacto Histórico' 
                    ? `+${selectedZone.diffSegundo}` 
                    : `-${selectedZone.diffSegundo}`} votos
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Participación:</span>
                <span className="font-medium text-gray-900">{selectedZone.participacion}%</span>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center text-gray-500 text-sm flex flex-col items-center justify-center min-h-[200px]">
            <MapPin size={32} className="text-gray-300 mb-2" />
            Selecciona una zona en el mapa para ver sus detalles estratificados.
          </div>
        )}

        {/* Gráfico de Barras - Top Zonas */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex-1">
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center justify-between">
            Desempeño y Potencial por Zona
            <ChevronRight size={16} className="text-gray-400" />
          </h4>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} width={70} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="VotosPH" name="Votos Confirmados" stackId="a" fill="#EF4444" radius={[0, 0, 0, 0]} barSize={12} />
                <Bar dataKey="Potencial" name="Reserva/Potencial" stackId="a" fill="#34D399" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
