import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Shield, Users, Search, Edit2, CheckCircle, XCircle, UserX, Loader } from 'lucide-react';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    fetchUsers();
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

  const filteredUsers = users.filter(u => 
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.displayName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
      
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            <Shield size={20} color="var(--primary)" />
            Panel de Administración
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Gestión de roles y control de acceso (RBAC).</p>
        </div>
        
        <div style={{ position: 'relative', width: '300px' }}>
          <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#A1A1AA' }}>
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar por correo o nombre..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.2rem', borderRadius: '6px', border: '1px solid #E4E4E7', outline: 'none', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#71717A' }}>
          <Loader size={32} className="animate-spin" style={{ margin: '0 auto 1rem auto' }} />
          <p>Cargando usuarios...</p>
        </div>
      ) : error ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#DC2626' }}>
          <p>{error}</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Usuario</th>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Rol</th>
                <th style={{ padding: '1rem', fontWeight: '600' }}>Estado</th>
                <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#A1A1AA', fontSize: '0.9rem' }}>No se encontraron usuarios.</td>
                </tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#F8FAFC'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {(user.displayName || user.email || '?')[0].toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: '#0F172A', fontSize: '0.9rem' }}>{user.displayName || 'Sin Nombre'}</div>
                        <div style={{ color: '#64748B', fontSize: '0.8rem' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      background: (user.role || user.rol) === 'Administrador' ? '#FEF3C7' : '#EFF6FF', 
                      color: (user.role || user.rol) === 'Administrador' ? '#92400E' : '#1D4ED8', 
                      padding: '0.2rem 0.6rem', 
                      borderRadius: '100px', 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      border: `1px solid ${(user.role || user.rol) === 'Administrador' ? '#FDE68A' : '#BFDBFE'}` 
                    }}>
                      {user.role || user.rol || 'Usuario Registrado'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      color: user.estado === 'inactivo' ? '#DC2626' : '#16A34A', 
                      fontSize: '0.85rem', fontWeight: '500' 
                    }}>
                      {user.estado === 'inactivo' ? <XCircle size={14} /> : <CheckCircle size={14} />}
                      {user.estado === 'inactivo' ? 'Inactivo' : 'Activo'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleEdit(user)}
                      style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px', transition: 'all 0.2s' }}
                      title="Editar Usuario"
                      onMouseOver={e=>{e.currentTarget.style.color='#0F172A'; e.currentTarget.style.background='#F1F5F9'}}
                      onMouseOut={e=>{e.currentTarget.style.color='#64748B'; e.currentTarget.style.background='transparent'}}
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Edición */}
      {editingUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', width: '90%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Editar Accesos - {editingUser.email}</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: '500' }}>Rol</label>
              <select 
                value={editRole} 
                onChange={e => setEditRole(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #E2E8F0', outline: 'none' }}
              >
                <option value="Administrador">Administrador</option>
                <option value="Editor">Editor</option>
                <option value="Analista">Analista</option>
                <option value="Usuario Registrado">Usuario Registrado</option>
                <option value="Usuario Invitado">Invitado</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: '500' }}>Estado</label>
              <select 
                value={editStatus} 
                onChange={e => setEditStatus(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #E2E8F0', outline: 'none' }}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setEditingUser(null)}
                style={{ background: '#F1F5F9', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', color: '#475569' }}
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                style={{ background: 'var(--primary)', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', color: '#fff' }}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
