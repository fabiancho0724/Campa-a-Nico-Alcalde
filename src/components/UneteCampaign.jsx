import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Target, Search, Calendar, ChevronRight, User, Phone, Mail, MapPin, Briefcase } from 'lucide-react';

export default function UneteCampaign() {
  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    correo: '',
    barrio: '',
    edad: '',
    ocupacion: '',
    apoyo: 'Voluntariado',
    otroApoyo: ''
  });
  
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      await addDoc(collection(db, 'voluntarios'), {
        ...formData,
        fechaRegistro: serverTimestamp()
      });
      setStatus({ submitting: false, success: true, error: null });
      setFormData({
        nombre: '', celular: '', correo: '', barrio: '', edad: '', ocupacion: '', apoyo: 'Voluntariado', otroApoyo: ''
      });
    } catch (error) {
      console.error('Error guardando registro:', error);
      setStatus({ submitting: false, success: false, error: 'Hubo un error al guardar tu registro. Intenta de nuevo.' });
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #0c3866 100%)', color: '#fff', padding: '3rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '150px', height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'scale(1.5)' }}></div>
          <div style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '250px', height: '250px', background: 'rgba(8, 145, 178, 0.2)', borderRadius: '50%', transform: 'scale(1.5)' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Únete a la Campaña de Nico</h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--bg-glass)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Permitir que ciudadanos, simpatizantes y voluntarios se vinculen a la campaña. Llenemos juntos de esperanza a Tunja.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div style={{ padding: '3rem 2rem' }}>
          
          {status.success ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ background: '#dcfce7', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckSquare size={40} color="#16a34a" />
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#166534', marginBottom: '1rem' }}>¡Gracias por unirte!</h3>
              <p style={{ color: '#064e3b', fontSize: '1.1rem' }}>Tu registro ha sido exitoso. Pronto nos comunicaremos contigo.</p>
              <button 
                onClick={() => setStatus({ success: false })}
                style={{ marginTop: '2rem', background: 'var(--primary)', color: '#fff', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Volver al formulario
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Nombre Completo *</label>
                <div style={inputWrapperStyle}>
                  <User size={20} style={iconStyle} />
                  <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} style={inputStyle} placeholder="Ej. Juan Pérez" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Número de Celular *</label>
                <div style={inputWrapperStyle}>
                  <Phone size={20} style={iconStyle} />
                  <input required type="tel" name="celular" value={formData.celular} onChange={handleChange} style={inputStyle} placeholder="Ej. 300 123 4567" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Correo Electrónico *</label>
                <div style={inputWrapperStyle}>
                  <Mail size={20} style={iconStyle} />
                  <input required type="email" name="correo" value={formData.correo} onChange={handleChange} style={inputStyle} placeholder="ejemplo@correo.com" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Barrio o Vereda *</label>
                <div style={inputWrapperStyle}>
                  <MapPin size={20} style={iconStyle} />
                  <input required type="text" name="barrio" value={formData.barrio} onChange={handleChange} style={inputStyle} placeholder="Ej. Las Nieves" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Edad *</label>
                <div style={inputWrapperStyle}>
                  <Calendar size={20} style={iconStyle} />
                  <input required type="number" name="edad" value={formData.edad} onChange={handleChange} style={inputStyle} placeholder="Años" min="14" max="100" />
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Ocupación *</label>
                <div style={inputWrapperStyle}>
                  <Briefcase size={20} style={iconStyle} />
                  <input required type="text" name="ocupacion" value={formData.ocupacion} onChange={handleChange} style={inputStyle} placeholder="Ej. Estudiante, Independiente, Empleado..." />
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>¿Cómo deseas apoyar la campaña? *</label>
                <select required name="apoyo" value={formData.apoyo} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '1.25rem', appearance: 'auto' }}>
                  <option value="" disabled>Selecciona una categoría</option>
                  <option value="Voluntario Digital">Voluntario Digital</option>
                  <option value="Líder de Barrio">Líder de Barrio</option>
                  <option value="Gestor Comunitario">Gestor Comunitario</option>
                  <option value="Apoyo Logístico">Apoyo Logístico</option>
                  <option value="Equipo Programático">Equipo Programático</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              {formData.apoyo === 'Otro' && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Especifica otro apoyo</label>
                  <input type="text" name="otroApoyo" value={formData.otroApoyo} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '1.25rem' }} placeholder="¿De qué otra forma deseas ayudar?" />
                </div>
              )}

              {status.error && (
                <div style={{ gridColumn: '1 / -1', background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem' }}>
                  {status.error}
                </div>
              )}

              <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                <button 
                  type="submit" 
                  disabled={status.submitting}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                    color: '#fff',
                    padding: '1.25rem',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: status.submitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 25px rgba(15, 76, 129, 0.25)',
                    transition: 'all 0.3s ease',
                    opacity: status.submitting ? 0.7 : 1
                  }}
                  onMouseOver={(e) => !status.submitting && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => !status.submitting && (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  {status.submitting ? 'Enviando registro...' : 'Inscribirme ahora'}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}

// Reusable Styles
const labelStyle = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: '600',
  color: 'var(--text-primary)',
  marginBottom: '0.5rem'
};

const inputWrapperStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
};

const iconStyle = {
  position: 'absolute',
  left: '1rem',
  color: 'var(--text-muted)'
};

const inputStyle = {
  width: '100%',
  padding: '1rem 1rem 1rem 3rem',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  fontSize: '1rem',
  color: '#1e293b',
  outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s',
  background: 'var(--bg-primary)'
};

const CheckSquare = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"></polyline>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
);
