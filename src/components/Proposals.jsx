import React, { useState } from 'react';
import { proposalsData } from '../data/campaignData';
import { 
  GraduationCap, HeartPulse, Milestone, ShieldAlert, Compass, 
  Target, Info, CheckCircle2, ChevronRight 
} from 'lucide-react';

const iconMap = {
  GraduationCap,
  HeartPulse,
  Milestone,
  ShieldAlert,
  Compass
};

export default function Proposals() {
  const [selectedProposal, setSelectedProposal] = useState(proposalsData[0]);

  // Formateador de moneda en pesos
  const formatCOP = (val) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Cabecera de Propuestas */}
      <div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Plan de Gobierno <span className="gradient-text-primary">Tunja 2026</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Conoce en detalle nuestras 5 propuestas estructurales, diseñadas con rigurosidad y conectadas a la realidad del presupuesto de la ciudad.
        </p>
      </div>

      {/* Grid Principal de Propuestas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }}>
        
        {/* Lado Izquierdo: Lista de Pilares */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {proposalsData.map(proposal => {
            const Icon = iconMap[proposal.icono] || GraduationCap;
            const isSelected = selectedProposal.id === proposal.id;

            return (
              <div 
                key={proposal.id}
                onClick={() => setSelectedProposal(proposal)}
                style={{
                  padding: '1.25rem',
                  background: isSelected ? 'var(--border-color)' : 'var(--bg-card)',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
                className="proposal-list-item"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    background: isSelected ? 'var(--primary-glow)' : 'rgba(0, 0, 0,0.03)',
                    color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                    padding: '0.6rem',
                    borderRadius: '16px',
                    transition: 'var(--transition-fast)'
                  }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: isSelected ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Pilar: {proposal.pilar}
                    </span>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                      {proposal.titulo.split(':')[0]}
                    </h4>
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: isSelected ? 'var(--primary)' : 'var(--text-muted)', transition: 'var(--transition-fast)' }} />
              </div>
            );
          })}
        </div>

        {/* Lado Derecho: Detalles de la Propuesta Seleccionada */}
        <div className="glass-card card-primary" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
          
          {/* Cabecera de Ficha de Propuesta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
            <div>
              <span className="pill pill-green" style={{ marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                PROPUESTA COMPROMISO
              </span>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                {selectedProposal.titulo}
              </h3>
            </div>
            
            <div style={{ background: 'rgba(0, 0, 0,0.03)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Monto Sector Base</span>
              <span style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--secondary)' }}>
                {formatCOP(selectedProposal.montoReferencia)} COP
              </span>
            </div>
          </div>

          {/* Descripción Principal */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} style={{ color: 'var(--primary)' }} />
              Visión y Enfoque del Proyecto
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {selectedProposal.descripcion}
            </p>
          </div>

          {/* Metas Específicas */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--primary)' }} />
              Metas del Cuatrenio (2026-2030)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {selectedProposal.metas.map((meta, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(0, 0, 0,0.01)', padding: '0.75rem', borderRadius: '16px', border: '1px solid rgba(0, 0, 0,0.03)' }}>
                  <span style={{ background: 'var(--primary-glow)', color: 'var(--primary)', width: '22px', height: '22px', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', flexShrink: 0 }}>
                    {index + 1}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {meta}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Enlace Financiero del Presupuesto */}
          <div style={{
            background: 'var(--secondary-glow)',
            border: '1px solid var(--secondary-glow)',
            borderRadius: '16px',
            padding: '1.25rem',
            marginTop: 'auto',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start'
          }}>
            <Info size={22} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h5 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '0.25rem' }}>
                Financiación y Viabilidad Presupuestal
              </h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {selectedProposal.impactoPresupuesto}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
