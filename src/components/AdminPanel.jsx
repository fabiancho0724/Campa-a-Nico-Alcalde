import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Shield, Users, Search, Edit2, CheckCircle, XCircle, Loader, Download, Database, Inbox, Trash2 } from 'lucide-react';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [aportes, setAportes] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users' o 'aportes'
  const [loading, setLoading] = useState(true);
  const [aportesLoading, setAportesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aportesSearchTerm, setAportesSearchTerm] = useState('');
  
  const [editingUser, setEditingUser] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const fetchedUsers = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(fetchedUsers);
    } catch (err) {
      console.error(err);
      setError('Error al cargar la lista de usuarios. Verifica tus permisos como Administrador.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAportes = async () => {
    setAportesLoading(true);
    try {
      const snap = await getDocs(collection(db, 'aportes'));
      const fetchedAportes = snap.docs.map(doc => {
        const data = doc.data();
        let formattedDate = 'Sin fecha';
        if (data.createdAt) {
          if (data.createdAt.seconds) {
            formattedDate = new Date(data.createdAt.seconds * 1000).toLocaleString('es-CO');
          } else if (data.createdAt.toDate) {
            formattedDate = data.createdAt.toDate().toLocaleString('es-CO');
          } else {
            formattedDate = new Date(data.createdAt).toLocaleString('es-CO');
          }
        }
        return { 
          id: doc.id, 
          ...data,
          dateStr: formattedDate 
        };
      });
      // Ordenar: lo más nuevo primero
      fetchedAportes.sort((a, b) => {
        const secA = a.createdAt?.seconds || 0;
        const secB = b.createdAt?.seconds || 0;
        return secB - secA;
      });
      setAportes(fetchedAportes);
    } catch (err) {
      console.error(err);
    } finally {
      setAportesLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAportes();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditRole(user.role || user.rol || 'Usuario Registrado');
    setEditStatus(user.estado || 'activo');
  };

  const handleSave = async () => {
    if (!editingUser) return;
    try {
      await updateDoc(doc(db, 'users', editingUser.id), {
        role: editRole,
        estado: editStatus,
        updatedAt: new Date()
      });
      setEditingUser(null);
      fetchUsers(); // Refresh
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el usuario. Verifica permisos de consola.');
    }
  };

  const handleDeleteAporte = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este aporte de la base de datos de ciudadanos?')) return;
    try {
      await deleteDoc(doc(db, 'aportes', id));
      fetchAportes(); // Refresh
    } catch (err) {
      console.error(err);
      alert('Error al eliminar el aporte.');
    }
  };

  // Exportar base de datos como CSV
  const exportToCSV = () => {
    if (aportes.length === 0) {
      alert('No hay aportes para exportar.');
      return;
    }
    const headers = ['ID', 'Autor', 'Email', 'Titulo', 'Contenido', 'Origen', 'Fecha'];
    
    // Preparar filas
    const rows = aportes.map(a => [
      a.id,
      a.autor || '',
      a.email || '',
      a.titulo || '',
      (a.contenido || '').replace(/"/g, '""').replace(/\n/g, ' '), // escapar comillas y nuevas líneas
      a.origen || '',
      a.dateStr || ''
    ]);

    // Crear contenido CSV seguro con BOM para el soporte UTF-8 en Excel
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BD_Aportes_Ciudadanos_Tunja_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Exportar base de datos como JSON
  const exportToJSON = () => {
    if (aportes.length === 0) {
      alert('No hay aportes para exportar.');
      return;
    }
    const cleanData = aportes.map(({ id, autor, email, titulo, contenido, origen, dateStr }) => ({
      id, autor, email, titulo, contenido, origen, fecha: dateStr
    }));
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(cleanData, null, 2))}`;
    const link = document.createElement("a");
    link.setAttribute("href", jsonString);
    link.setAttribute("download", `BD_Aportes_Ciudadanos_Tunja_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = users.filter(u => 
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.displayName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAportes = aportes.filter(a =>
    (a.autor || '').toLowerCase().includes(aportesSearchTerm.toLowerCase()) ||
    (a.email || '').toLowerCase().includes(aportesSearchTerm.toLowerCase()) ||
    (a.contenido || '').toLowerCase().includes(aportesSearchTerm.toLowerCase()) ||
    (a.origen || '').toLowerCase().includes(aportesSearchTerm.toLowerCase())
  );

  return (
    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
      
      {/* 1. Encabezado del Panel */}
      <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', background: '#fafafa' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '900', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.65rem', fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
            <Shield size={24} color="var(--primary)" />
            Panel de Administración Gubernamental
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Control de accesos y repositorio automatizado de aportes de la ciudadanía de Tunja.</p>
        </div>
      </div>

      {/* 2. Filtros y Selector de Pestañas */}
      <div style={{ padding: '1rem 2rem', background: '#ffffff', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Selector de Pestañas Premium */}
        <div style={{ display: 'flex', gap: '0.5rem', background: '#F1F5F9', padding: '0.25rem', borderRadius: '10px' }}>
          <button 
            onClick={() => setActiveTab('users')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'users' ? '#ffffff' : 'transparent',
              color: activeTab === 'users' ? 'var(--primary)' : '#64748B',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: activeTab === 'users' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Users size={16} />
            Usuarios/Roles ({users.length})
          </button>
          
          <button 
            onClick={() => setActiveTab('aportes')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'aportes' ? '#ffffff' : 'transparent',
              color: activeTab === 'aportes' ? 'var(--primary)' : '#64748B',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: activeTab === 'aportes' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Database size={16} />
            Respuestas/Aportes ({aportes.length})
          </button>
        </div>

        {/* Buscador Contextual Dinámico */}
        {activeTab === 'users' ? (
          <div style={{ position: 'relative', width: '320px' }}>
            <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A1A1AA' }}>
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar usuarios por correo o nombre..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.4rem', borderRadius: '8px', border: '1px solid #E4E4E7', outline: 'none', fontSize: '0.85rem' }}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Buscador de Aportes */}
            <div style={{ position: 'relative', width: '280px' }}>
              <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A1A1AA' }}>
                <Search size={16} />
              </div>
              <input 
                type="text" 
                placeholder="Buscar en ideas, autor u origen..." 
                value={aportesSearchTerm}
                onChange={e => setAportesSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.4rem', borderRadius: '8px', border: '1px solid #E4E4E7', outline: 'none', fontSize: '0.85rem' }}
              />
            </div>

            {/* Acciones de descarga de base de datos */}
            <button 
              onClick={exportToCSV}
              style={{
                background: '#10B981',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.65rem 1rem',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'background 0.2s'
              }}
              className="export-btn"
              title="Descargar base de datos en formato Excel/CSV"
            >
              <Download size={14} /> Exportar CSV
            </button>
            
            <button 
              onClick={exportToJSON}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.65rem 1rem',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'background 0.2s'
              }}
              title="Descargar respaldo en JSON legible"
            >
              <Download size={14} /> Exportar JSON
            </button>
          </div>
        )}
      </div>

      {/* 3. Renderizado del Contenido Activo (Usuarios o Aportes) */}
      
      {/* PESTAÑA 1: GESTIÓN DE USUARIOS */}
      {activeTab === 'users' && (
        <>
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#71717A' }}>
              <Loader size={36} className="animate-spin" style={{ margin: '0 auto 1.25rem auto', color: 'var(--primary)' }} />
              <p style={{ fontWeight: 500 }}>Sincronizando cuentas ciudadanas...</p>
            </div>
          ) : error ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#DC2626', fontWeight: 500 }}>
              <p>{error}</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Usuario</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Rol en Plataforma</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Estado de Conexión</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.95rem' }}>No se encontraron usuarios que coincidan con la búsqueda.</td>
                    </tr>
                  ) : filteredUsers.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#F8FAFC'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, #00b8d9 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.95rem' }}>
                            {(user.displayName || user.email || '?')[0].toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.95rem' }}>{user.displayName || 'Ciudadano Activo'}</div>
                            <div style={{ color: '#475569', fontSize: '0.85rem' }}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <span style={{ 
                          background: (user.role || user.rol) === 'Administrador' ? '#FEF3C7' : '#EFF6FF', 
                          color: (user.role || user.rol) === 'Administrador' ? '#92400E' : '#1D4ED8', 
                          padding: '0.3rem 0.75rem', 
                          borderRadius: '100px', 
                          fontSize: '0.8rem', 
                          fontWeight: '800', 
                          border: `1px solid ${(user.role || user.rol) === 'Administrador' ? '#FDE68A' : '#BFDBFE'}` 
                        }}>
                          {user.role || user.rol || 'Usuario Registrado'}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <span style={{ 
                          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                          color: user.estado === 'inactivo' ? '#DC2626' : '#16A34A', 
                          fontSize: '0.85rem', fontWeight: '700' 
                        }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: user.estado === 'inactivo' ? '#DC2626' : '#16A34A', display: 'inline-block' }}></span>
                          {user.estado === 'inactivo' ? 'Acceso Suspendido' : 'Acceso Permitido'}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleEdit(user)}
                          style={{ background: '#F1F5F9', border: 'none', color: '#475569', cursor: 'pointer', padding: '0.5rem 0.75rem', borderRadius: '8px', transition: 'all 0.2s', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                          onMouseOver={e=>{e.currentTarget.style.color='#0F172A'; e.currentTarget.style.background='#E2E8F0'}}
                          onMouseOut={e=>{e.currentTarget.style.color='#475569'; e.currentTarget.style.background='#F1F5F9'}}
                        >
                          <Edit2 size={14} /> Editar Rol
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* PESTAÑA 2: REPOSITORIO AUTOMÁTICO DE APORTES (DATABASE ANSWERS) */}
      {activeTab === 'aportes' && (
        <>
          {aportesLoading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#71717A' }}>
              <Loader size={36} className="animate-spin" style={{ margin: '0 auto 1.25rem auto', color: 'var(--primary)' }} />
              <p style={{ fontWeight: 500 }}>Sincronizando el repositorio de voces ciudadanas...</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', width: '220px' }}>Ciudadano</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', width: '180px' }}>Sección / Origen</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Idea / Propuesta Registrada</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', width: '150px' }}>Fecha Registro</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', textAlign: 'right', width: '80px' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAportes.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '4rem 1.5rem', textAlign: 'center', color: '#94A3B8' }}>
                        <Inbox size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#475569' }}>No se han registrado aportes aún</div>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>Las respuestas o ideas de los ciudadano aparecerán aquí al enviarla.</p>
                      </td>
                    </tr>
                  ) : filteredAportes.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#F8FAFC'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                      <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.95rem' }}>{item.autor || 'Anónimo'}</div>
                        <div style={{ color: '#64748B', fontSize: '0.82rem', fontFamily: 'monospace' }}>{item.email}</div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top' }}>
                        <span style={{ 
                          background: item.origen === 'Las 4 de Nico' ? '#E0F2FE' : '#F3E8FF',
                          color: item.origen === 'Las 4 de Nico' ? '#0369A1' : '#6B21A8',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: '800',
                          border: `1px solid ${item.origen === 'Las 4 de Nico' ? '#BAE6FD' : '#E9D5FF'}`
                        }}>
                          {item.origen || 'General'}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top' }}>
                        <div style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '500', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                          {item.contenido}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top', color: '#64748B', fontSize: '0.85rem', fontWeight: '500' }}>
                        {item.dateStr}
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeleteAporte(item.id)}
                          style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0.35rem', borderRadius: '6px', transition: 'all 0.2s' }}
                          title="Eliminar de la base de datos"
                          onMouseOver={e=>{e.currentTarget.style.color='#DC2626'; e.currentTarget.style.background='#FEF2F2'}}
                          onMouseOut={e=>{e.currentTarget.style.color='#94A3B8'; e.currentTarget.style.background='transparent'}}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* 4. Modal de Edición de Usuario */}
      {editingUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', width: '90%', maxWidth: '420px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #F1F5F9', animation: 'fadeIn 0.2s ease' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>Editar Perfil Ciudadano</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: '#64748B', fontSize: '0.85rem' }}>Ajusta el nivel de privilegios y accesos para: <strong>{editingUser.email}</strong></p>
            
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '700', color: '#334155' }}>Asignar Rol Administrativo</label>
              <select 
                value={editRole} 
                onChange={e => setEditRole(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.9rem', color: '#334155', fontWeight: '600' }}
              >
                <option value="Administrador">Administrador (Control Total)</option>
                <option value="Editor">Editor (Gestión de Contenido)</option>
                <option value="Analista">Analista (Acceso a Reportes)</option>
                <option value="Usuario Registrado">Usuario Registrado (Lector/Aportante)</option>
                <option value="Usuario Invitado">Invitado (Consultante Externo)</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '700', color: '#334155' }}>Estado de la Cuenta</label>
              <select 
                value={editStatus} 
                onChange={e => setEditStatus(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.9rem', color: '#334155', fontWeight: '600' }}
              >
                <option value="activo">Cuenta Activa (Accede al panel)</option>
                <option value="inactivo">Cuenta Suspedida (Denegado)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setEditingUser(null)}
                style={{ background: '#F1F5F9', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', color: '#475569', fontSize: '0.9rem' }}
              >
                Cerrar
              </button>
              <button 
                onClick={handleSave}
                style={{ background: 'var(--primary)', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', color: '#fff', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(15, 76, 129, 0.2)' }}
              >
                Guardar Ajustes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
