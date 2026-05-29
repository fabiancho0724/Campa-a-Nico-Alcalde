import React, { useState, useEffect } from 'react';
import { budgetData } from '../data/campaignData';
import { 
  DollarSign, Sliders, ArrowRight, CheckCircle2, AlertTriangle, Info,
  GraduationCap, HeartPulse, Milestone, ShieldAlert, Leaf, Trophy, Compass, Users
} from 'lucide-react';

// Mapeo de strings a Componentes de Iconos
const iconMap = {
  GraduationCap,
  HeartPulse,
  Milestone,
  ShieldAlert,
  Leaf,
  Trophy,
  Compass,
  Users
};

export default function BudgetVisualizer() {
  const { totalPresupuesto, central, sectoresInversion } = budgetData;

  // Estado del Simulador
  // Rubros que el usuario puede reducir (valores iniciales)
  const [funcionamiento, setFuncionamiento] = useState(central.categorias[0].valor);
  const [deuda, setDeuda] = useState(central.categorias[3].valor);
  const [gastosAdministrativos, setGastosAdministrativos] = useState(15000000000); // Rubro ineficiente simulado dentro de "Otros"

  // Rubros a potenciar (valores de incremento acumulados por el usuario)
  const [addEducacion, setAddEducacion] = useState(0);
  const [addSalud, setAddSalud] = useState(0);
  const [addVias, setAddVias] = useState(0);
  const [addSeguridad, setAddSeguridad] = useState(0);

  // Valores base originales de los rubros recortables
  const baseFuncionamiento = central.categorias[0].valor;
  const baseDeuda = central.categorias[3].valor;
  const baseGastosAdmin = 15000000000;

  // Ahorro total acumulado
  const ahorroFuncionamiento = baseFuncionamiento - funcionamiento;
  const ahorroDeuda = baseDeuda - deuda;
  const ahorroAdmin = baseGastosAdmin - gastosAdministrativos;
  const ahorroTotal = ahorroFuncionamiento + ahorroDeuda + ahorroAdmin;

  // Recursos ya asignados por el usuario
  const asignadoTotal = addEducacion + addSalud + addVias + addSeguridad;

  // Fondo libre disponible para asignar
  const fondoDisponible = ahorroTotal - asignadoTotal;

  // Sectores de Inversión actuales (con adición dinámica del simulador)
  const [sectores, setSectores] = useState(sectoresInversion);

  useEffect(() => {
    // Actualizar los valores de los sectores en tiempo real según el simulador
    const nuevosSectores = sectoresInversion.map(sec => {
      if (sec.id === 'educacion') return { ...sec, valorSimulado: sec.valor + addEducacion };
      if (sec.id === 'salud') return { ...sec, valorSimulado: sec.valor + addSalud };
      if (sec.id === 'vias') return { ...sec, valorSimulado: sec.valor + addVias };
      if (sec.id === 'seguridad') return { ...sec, valorSimulado: sec.valor + addSeguridad };
      return { ...sec, valorSimulado: sec.valor };
    });
    setSectores(nuevosSectores);
  }, [addEducacion, addSalud, addVias, addSeguridad]);

  // Formateador de moneda en pesos colombianos
  const formatCOP = (val) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  // Conversor simplificado a Miles de Millones para lectura rápida
  const formatMCOP = (val) => {
    return `$${(val / 1000000000).toFixed(1)} mil millones`;
  };

  // Función para reestablecer la simulación
  const restablecerSimulador = () => {
    setFuncionamiento(baseFuncionamiento);
    setDeuda(baseDeuda);
    setGastosAdministrativos(baseGastosAdmin);
    setAddEducacion(0);
    setAddSalud(0);
    setAddVias(0);
    setAddSeguridad(0);
  };

  // Asignar fondos rápidos a un rubro
  const asignarFondos = (rubro, incremento) => {
    if (fondoDisponible >= incremento) {
      if (rubro === 'educacion') setAddEducacion(p => p + incremento);
      if (rubro === 'salud') setAddSalud(p => p + incremento);
      if (rubro === 'vias') setAddVias(p => p + incremento);
      if (rubro === 'seguridad') setAddSeguridad(p => p + incremento);
    }
  };

  // Restar fondos asignados
  const restarFondos = (rubro, decremento) => {
    if (rubro === 'educacion' && addEducacion >= decremento) setAddEducacion(p => p - decremento);
    if (rubro === 'salud' && addSalud >= decremento) setAddSalud(p => p - decremento);
    if (rubro === 'vias' && addVias >= decremento) setAddVias(p => p - decremento);
    if (rubro === 'seguridad' && addSeguridad >= decremento) setAddSeguridad(p => p - decremento);
  };

  // Proyecciones de impacto social basadas en el dinero reasignado
  const impacto = {
    colegiosModernizados: Math.floor(addEducacion / 3500000000), // $3.500 millones por colegio
    becasFinanciadas: Math.floor(addEducacion / 4000000), // $4 millones por beca semestral
    unidadesMoviles: Math.floor(addSalud / 2500000000), // $2.500 millones por unidad móvil de salud
    atencionesEspeciales: Math.floor(addSalud / 150000), // $150.000 por consulta especializada
    kmPavimentados: (addVias / 1800000000).toFixed(1), // $1.800 millones por km pavimentado y canalizado
    camarasInteligentes: Math.floor(addSeguridad / 45000000), // $45 millones por nodo de cámara IA
    luminariasLed: Math.floor(addSeguridad / 2500000) // $2.5 millones por luminaria LED instalada
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Cabecera Financiera */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Presupuesto Municipal de Tunja <span className="gradient-text-primary">2026</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Explora de manera visual la distribución de los <strong>{formatCOP(totalPresupuesto)}</strong> aprobados para Tunja, y simula cómo los redistribuiríamos en nuestra campaña.
          </p>
        </div>
        <div style={{ background: 'var(--primary-glow)', border: '1px solid var(--primary)', padding: '0.6rem 1.2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <DollarSign size={20} style={{ color: 'var(--primary)' }} />
          <span style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--text-primary)' }}>
            Total: {formatCOP(totalPresupuesto)} COP
          </span>
        </div>
      </div>

      {/* Grid del Treemap Presupuestal */}
      <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>1. Mosaico Presupuestal: Administración Central</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
          
          {/* Mosaico Visual de Cuadrículas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gridTemplateRows: '150px 120px',
              gap: '0.75rem'
            }}>
              {/* Bloque Inversión Social (El más grande) */}
              <div className="glass-card" style={{
                background: 'var(--gradient-main)',
                borderColor: 'rgba(15, 157, 88, 0.3)',
                gridRow: '1 / 3',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem'
              }}>
                <div>
                  <span className="pill pill-green" style={{ marginBottom: '0.5rem' }}>48.8% del Central</span>
                  <h4 style={{ fontSize: '1.25rem' }}>{central.categorias[1].nombre}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {central.categorias[1].desc}
                  </p>
                </div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>
                  {formatCOP(central.categorias[1].valor)}
                </h3>
              </div>

              {/* Bloque Fondos Especiales */}
              <div className="glass-card" style={{
                background: 'var(--gradient-main)',
                borderColor: 'rgba(63, 81, 181, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1rem'
              }}>
                <div>
                  <span className="pill" style={{ background: 'rgba(63, 81, 181, 0.15)', color: '#7986CB', border: '1px solid rgba(63, 81, 181, 0.25)', marginBottom: '0.35rem' }}>
                    25.5%
                  </span>
                  <h5 style={{ fontSize: '0.95rem' }}>{central.categorias[2].nombre}</h5>
                </div>
                <h4 style={{ fontSize: '1.3rem', color: '#7986CB' }}>
                  {formatCOP(central.categorias[2].valor)}
                </h4>
              </div>

              {/* Bloque Funcionamiento */}
              <div className="glass-card" style={{
                background: 'var(--gradient-main)',
                borderColor: 'rgba(197, 34, 31, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1rem'
              }}>
                <div>
                  <span className="pill pill-red" style={{ marginBottom: '0.35rem' }}>20.4%</span>
                  <h5 style={{ fontSize: '0.95rem' }}>{central.categorias[0].nombre}</h5>
                </div>
                <h4 style={{ fontSize: '1.3rem', color: 'var(--accent-red)' }}>
                  {formatCOP(funcionamiento)}
                </h4>
              </div>
            </div>

            {/* Fila Inferior - Servicio a la Deuda */}
            <div className="glass-card" style={{
              background: 'var(--gradient-main)',
              borderColor: 'var(--secondary-glow)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 1.25rem'
            }}>
              <div>
                <span className="pill pill-gold" style={{ marginRight: '0.5rem' }}>5.3%</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{central.categorias[3].nombre}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '1rem' }}>
                  {central.categorias[3].desc}
                </span>
              </div>
              <h4 style={{ fontSize: '1.3rem', color: 'var(--secondary)' }}>
                {formatCOP(deuda)}
              </h4>
            </div>
          </div>

          {/* Tarjeta de Información e Importancia */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
              <Info size={22} />
              <h4 style={{ fontSize: '1.15rem' }}>¿Cómo interpretar el presupuesto?</h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              El presupuesto general de Tunja para 2026 asciende a **$534.537 millones**. La mayor parte del recurso es administrado directamente por el despacho central ($505.209 millones). 
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Aunque la **Inversión Social** parece alta, una gran parte está comprometida en contratos administrativos corrientes de funcionamiento e intereses de endeudamiento. 
            </p>
            <div style={{ borderLeft: '3px solid var(--secondary)', paddingLeft: '0.75rem', background: 'var(--secondary-glow)', borderRadius: '16px', padding: '0.6rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--secondary)', display: 'block', marginBottom: '0.15rem' }}>
                Oportunidad de Optimización:
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                A través de la eficiencia y la reducción de burocracia innecesaria, podemos liberar recursos millonarios para proyectos urgentes de la comunidad. ¡Pruébalo en nuestro simulador abajo!
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Simulador Financiero Interactivo */}
      <div className="glass-card" style={{
        background: 'rgba(15,23,42,0.4)',
        borderColor: 'rgba(0, 0, 0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '2rem'
      }}>
        
        {/* Encabezado del Simulador */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Sliders size={20} style={{ color: 'var(--secondary)' }} />
              <h3 style={{ fontSize: '1.4rem' }}>2. Simulador Presupuestal: Reasigna los Recursos</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Disminuye los rubros administrativos ineficientes (izquierda) y destina el ahorro a proyectos sociales de tu interés (derecha).
            </p>
          </div>
          
          <button className="btn btn-secondary" onClick={restablecerSimulador} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            Restablecer Valores
          </button>
        </div>

        {/* Panel del Simulador (Dos Columnas) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2.5rem' }}>
          
          {/* Columna Izquierda: Ajustes de Recortes (Sliders) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📉 Reducir Gastos Ineficientes</span>
            </h4>

            {/* Slider 1: Funcionamiento */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: '500' }}>Gastos de Funcionamiento</span>
                <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>
                  {formatCOP(funcionamiento)}
                </span>
              </div>
              <input 
                type="range"
                min={baseFuncionamiento * 0.8} // Recorte máximo del 20%
                max={baseFuncionamiento}
                step="500000000" // paso de 500 millones
                value={funcionamiento}
                onChange={(e) => setFuncionamiento(Number(e.target.value))}
                style={{ cursor: 'pointer', accentColor: 'var(--accent-red)', width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Ahorro: {formatCOP(ahorroFuncionamiento)}</span>
                <span>Máx recorte: 20%</span>
              </div>
            </div>

            {/* Slider 2: Servicio de Deuda */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: '500' }}>Pago a la Deuda (Renegociación)</span>
                <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>
                  {formatCOP(deuda)}
                </span>
              </div>
              <input 
                type="range"
                min={baseDeuda * 0.85} // Recorte máximo 15%
                max={baseDeuda}
                step="250000000" // paso de 250 millones
                value={deuda}
                onChange={(e) => setDeuda(Number(e.target.value))}
                style={{ cursor: 'pointer', accentColor: 'var(--accent-red)', width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Ahorro: {formatCOP(ahorroDeuda)}</span>
                <span>Máx recorte: 15%</span>
              </div>
            </div>

            {/* Slider 3: Contratos / Publicidad Innecesaria */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: '500' }}>Contratos Administrativos de Apoyo</span>
                <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>
                  {formatCOP(gastosAdministrativos)}
                </span>
              </div>
              <input 
                type="range"
                min={baseGastosAdmin * 0.7} // Recorte máximo 30%
                max={baseGastosAdmin}
                step="200000000"
                value={gastosAdministrativos}
                onChange={(e) => setGastosAdministrativos(Number(e.target.value))}
                style={{ cursor: 'pointer', accentColor: 'var(--accent-red)', width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Ahorro: {formatCOP(ahorroAdmin)}</span>
                <span>Máx recorte: 30%</span>
              </div>
            </div>

            {/* Caja de Balance (Fondo de Ahorro) */}
            <div style={{
              background: 'rgba(0, 0, 0,0.02)',
              border: '1px dashed var(--border-color)',
              padding: '1.25rem',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Fondo Liberado Acumulado:</span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                {formatCOP(ahorroTotal)}
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Disponible para Asignar:</span>
                <span style={{ fontWeight: 'bold', color: fondoDisponible > 0 ? 'var(--secondary)' : 'var(--text-muted)' }}>
                  {formatCOP(fondoDisponible)}
                </span>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Asignación a Sectores de Inversión */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📈 Invertir en Bienestar Social</span>
            </h4>

            {/* Fila de Controles para los 4 Rubros */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              
              {/* Asignación a Educación */}
              <div style={{ background: 'rgba(0, 0, 0,0.02)', border: '1px solid var(--border-color)', padding: '0.75rem 1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(15, 157, 88, 0.12)', color: 'var(--primary)', padding: '0.5rem', borderRadius: '16px' }}>
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block' }}>Educación y Escuelas</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Inversión actual: {formatMCOP(112500000000)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button 
                    onClick={() => restarFondos('educacion', 1000000000)}
                    disabled={addEducacion === 0}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.5rem', minWidth: '30px', border: '1px solid rgba(0, 0, 0,0.08)' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', minWidth: '70px', textLight: 'center', color: addEducacion > 0 ? 'var(--primary)' : 'var(--text-primary)' }}>
                    +{formatMCOP(addEducacion).replace(' mil millones', ' B')}
                  </span>
                  <button 
                    onClick={() => asignarFondos('educacion', 1000000000)}
                    disabled={fondoDisponible < 1000000000}
                    className="btn btn-primary"
                    style={{ padding: '0.25rem 0.5rem', minWidth: '30px' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Asignación a Salud */}
              <div style={{ background: 'rgba(0, 0, 0,0.02)', border: '1px solid var(--border-color)', padding: '0.75rem 1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(0, 188, 212, 0.12)', color: '#00BCD4', padding: '0.5rem', borderRadius: '16px' }}>
                    <HeartPulse size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block' }}>Salud y E.S.E. Municipal</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Inversión actual: {formatMCOP(95000000000)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button 
                    onClick={() => restarFondos('salud', 1000000000)}
                    disabled={addSalud === 0}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.5rem', minWidth: '30px', border: '1px solid rgba(0, 0, 0,0.08)' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', minWidth: '70px', textLight: 'center', color: addSalud > 0 ? '#00BCD4' : 'var(--text-primary)' }}>
                    +{formatMCOP(addSalud).replace(' mil millones', ' B')}
                  </span>
                  <button 
                    onClick={() => asignarFondos('salud', 1000000000)}
                    disabled={fondoDisponible < 1000000000}
                    className="btn btn-primary"
                    style={{ padding: '0.25rem 0.5rem', minWidth: '30px' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Asignación a Vías */}
              <div style={{ background: 'rgba(0, 0, 0,0.02)', border: '1px solid var(--border-color)', padding: '0.75rem 1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(33, 150, 243, 0.12)', color: '#2196F3', padding: '0.5rem', borderRadius: '16px' }}>
                    <Milestone size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block' }}>Vías y Pavimentación</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Inversión actual: {formatMCOP(48000000000)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button 
                    onClick={() => restarFondos('vias', 1000000000)}
                    disabled={addVias === 0}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.5rem', minWidth: '30px', border: '1px solid rgba(0, 0, 0,0.08)' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', minWidth: '70px', textLight: 'center', color: addVias > 0 ? '#2196F3' : 'var(--text-primary)' }}>
                    +{formatMCOP(addVias).replace(' mil millones', ' B')}
                  </span>
                  <button 
                    onClick={() => asignarFondos('vias', 1000000000)}
                    disabled={fondoDisponible < 1000000000}
                    className="btn btn-primary"
                    style={{ padding: '0.25rem 0.5rem', minWidth: '30px' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Asignación a Seguridad */}
              <div style={{ background: 'rgba(0, 0, 0,0.02)', border: '1px solid var(--border-color)', padding: '0.75rem 1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(244, 67, 54, 0.12)', color: '#F44336', padding: '0.5rem', borderRadius: '16px' }}>
                    <ShieldAlert size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block' }}>Seguridad e Inteligencia</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Inversión actual: {formatMCOP(15000000000)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button 
                    onClick={() => restarFondos('seguridad', 1000000000)}
                    disabled={addSeguridad === 0}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.5rem', minWidth: '30px', border: '1px solid rgba(0, 0, 0,0.08)' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', minWidth: '70px', textLight: 'center', color: addSeguridad > 0 ? '#F44336' : 'var(--text-primary)' }}>
                    +{formatMCOP(addSeguridad).replace(' mil millones', ' B')}
                  </span>
                  <button 
                    onClick={() => asignarFondos('seguridad', 1000000000)}
                    disabled={fondoDisponible < 1000000000}
                    className="btn btn-primary"
                    style={{ padding: '0.25rem 0.5rem', minWidth: '30px' }}
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Cuadro de Indicadores de Impacto Ficticio/Simulado */}
            <div style={{
              background: 'rgba(15,157,88,0.04)',
              border: '1px solid rgba(15,157,88,0.12)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Impacto Real Estimado del Plan de Gobierno
              </span>
              
              {asignadoTotal === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  Empieza a reasignar dinero para ver qué metas comunitarias podemos financiar en conjunto con la ciudadanía de Tunja.
                </p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {addEducacion > 0 && (
                    <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>🎓 {impacto.becasFinanciadas.toLocaleString()} jóvenes</span>
                      <span style={{ color: 'var(--text-secondary)' }}>con semestres universitarios pagos.</span>
                      {impacto.colegiosModernizados > 0 && (
                        <span style={{ color: 'var(--primary)', fontSize: '0.75rem', marginTop: '0.15rem' }}>
                          ✓ {impacto.colegiosModernizados} colegios renovados.
                        </span>
                      )}
                    </div>
                  )}

                  {addSalud > 0 && (
                    <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>🏥 {impacto.atencionesEspeciales.toLocaleString()} consultas</span>
                      <span style={{ color: 'var(--text-secondary)' }}>médicas especializadas gratis.</span>
                      {impacto.unidadesMoviles > 0 && (
                        <span style={{ color: '#00BCD4', fontSize: '0.75rem', marginTop: '0.15rem' }}>
                          ✓ {impacto.unidadesMoviles} unidades móviles equipadas.
                        </span>
                      )}
                    </div>
                  )}

                  {addVias > 0 && (
                    <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>🛣️ {impacto.kmPavimentados} km de vías</span>
                      <span style={{ color: 'var(--text-secondary)' }}>urbanas pavimentadas a nuevo.</span>
                      <span style={{ color: '#2196F3', fontSize: '0.75rem', marginTop: '0.15rem' }}>
                        ✓ Mayor fluidez en comunas 6, 7 y 8.
                      </span>
                    </div>
                  )}

                  {addSeguridad > 0 && (
                    <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>🛡️ {impacto.luminariasLed.toLocaleString()} postes</span>
                      <span style={{ color: 'var(--text-secondary)' }}>con iluminación LED inteligente.</span>
                      {impacto.camarasInteligentes > 0 && (
                        <span style={{ color: '#F44336', fontSize: '0.75rem', marginTop: '0.15rem' }}>
                          ✓ {impacto.camarasInteligentes} cámaras inteligentes IA.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Grid del Desglose de Inversiones Actuales por Sector */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>3. Distribución de Sectores de Inversión (Líneas de Presupuesto)</h3>
        
        <div className="grid-cols-2" style={{ gap: '1.25rem' }}>
          {sectores.map(sec => {
            const Icon = iconMap[sec.icono] || DollarSign;
            const valorAMostrar = sec.valorSimulado !== undefined ? sec.valorSimulado : sec.valor;
            const haSidoIncrementado = valorAMostrar > sec.valor;
            const basePercent = ((sec.valor / 505209000000) * 100).toFixed(1);
            const simPercent = ((valorAMostrar / 505209000000) * 100).toFixed(1);

            return (
              <div 
                key={sec.id}
                style={{
                  background: 'var(--border-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'var(--transition-smooth)',
                  boxShadow: haSidoIncrementado ? `0 0 15px -3px ${sec.color}44` : 'none',
                  borderColor: haSidoIncrementado ? sec.color : 'var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: `${sec.color}15`, color: sec.color, padding: '0.4rem', borderRadius: '16px' }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem' }}>{sec.nombre}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{basePercent}% del presupuesto base</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: haSidoIncrementado ? 'var(--primary)' : 'var(--text-primary)' }}>
                      {formatCOP(valorAMostrar)}
                    </span>
                    {haSidoIncrementado && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--primary)', display: 'block', fontWeight: 'bold' }}>
                        ▲ +{(((valorAMostrar - sec.valor)/sec.valor)*100).toFixed(0)}% Incrementado
                      </span>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {sec.desc}
                </p>

                {/* Barra de Porcentaje */}
                <div style={{ width: '100%', height: '6px', background: 'rgba(0, 0, 0,0.05)', borderRadius: '16px', position: 'relative', overflow: 'hidden', marginTop: '0.25rem' }}>
                  <div style={{ 
                    width: `${simPercent * 3}%`, // escala visual para destacar
                    maxWidth: '100%',
                    height: '100%', 
                    background: sec.color, 
                    borderRadius: '16px',
                    transition: 'width 0.4s ease'
                  }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
