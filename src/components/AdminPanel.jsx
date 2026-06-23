import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { Shield, Users, Search, Edit2, CheckCircle, XCircle, Loader, Download, Database, Inbox, Trash2, Settings, Key, AlertTriangle } from 'lucide-react';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [aportes, setAportes] = useState([]);
  const [auditorias, setAuditorias] = useState([]);
  const [config, setConfig] = useState({
    metaVotos: 45000,
    votosProyectados: 38240,
    voluntariosMeta: 5000,
    mensajeHero: 'Participación ciudadana y control presupuestal real',
    linktreeUrl: 'https://linktr.ee/nicoalcalde2026'
  });
  
  const [activeTab, setActiveTab] = useState('users'); // 'users', 'aportes', 'audits', 'config'
  const [loading, setLoading] = useState(true);
  const [aportesLoading, setAportesLoading] = useState(false);
  const [auditsLoading, setAuditsLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(false);
  
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aportesSearchTerm, setAportesSearchTerm] = useState('');
  const [auditsSearchTerm, setAuditsSearchTerm] = useState('');
  
  const [editingUser, setEditingUser] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editPermisos, setEditPermisos] = useState({
    historialElectoral: false,
    balance: false,
    simulador: false,
    panelAdmin: false
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDocs(collection(db, 'usuarios'));
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
      const snap1 = await getDocs(collection(db, 'tu_voz_construye_tunja'));
      const fetched1 = snap1.docs.map(doc => {
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
          collection: 'tu_voz_construye_tunja',
          dateStr: formattedDate 
        };
      });

      const snap2 = await getDocs(collection(db, 'ecosistema_joven'));
      const fetched2 = snap2.docs.map(doc => {
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
          collection: 'ecosistema_joven',
          dateStr: formattedDate 
        };
      });

      const fetchedAportes = [...fetched1, ...fetched2];
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

  const fetchAuditorias = async () => {
    setAuditsLoading(true);
    try {
      const snap = await getDocs(collection(db, 'auditorias'));
      const fetchedAudits = snap.docs.map(doc => {
        const data = doc.data();
        let formattedDate = 'Sin fecha';
        if (data.timestamp) {
          if (data.timestamp.seconds) {
            formattedDate = new Date(data.timestamp.seconds * 1000).toLocaleString('es-CO');
          } else if (data.timestamp.toDate) {
            formattedDate = data.timestamp.toDate().toLocaleString('es-CO');
          } else {
            formattedDate = new Date(data.timestamp).toLocaleString('es-CO');
          }
        }
        return { 
          id: doc.id, 
          ...data,
          dateStr: formattedDate 
        };
      });
      fetchedAudits.sort((a, b) => {
        const secA = a.timestamp?.seconds || 0;
        const secB = b.timestamp?.seconds || 0;
        return secB - secA;
      });
      setAuditorias(fetchedAudits);
    } catch (err) {
      console.error("Error fetching audits:", err);
    } finally {
      setAuditsLoading(false);
    }
  };

  const fetchConfig = async () => {
    setConfigLoading(true);
    try {
      const docSnap = await getDoc(doc(db, 'configuracion', 'global'));
      if (docSnap.exists()) {
        setConfig(prev => ({ ...prev, ...docSnap.data() }));
      }
    } catch (err) {
      console.warn("Could not load global configuration:", err.message);
    } finally {
      setConfigLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAportes();
    fetchAuditorias();
    fetchConfig();
  }, []);

  const handleEdit = (user) => {
    if (user.email?.toLowerCase().trim() === 'fabian.cely0724@gmail.com' || (user.rol || user.role) === 'SuperAdmin') {
      alert('Las credenciales y permisos del SuperAdministrador principal están protegidos y no pueden ser modificados.');
      return;
    }
    setEditingUser(user);
    setEditRole(user.rol || user.role || 'usuario');
    setEditStatus(user.activo !== false ? 'activo' : 'inactivo');
    setEditPermisos({
      historialElectoral: !!user.permisos?.historialElectoral,
      balance: !!user.permisos?.balance,
      simulador: !!user.permisos?.simulador,
      panelAdmin: !!user.permisos?.panelAdmin
    });
  };

  const handleSave = async () => {
    if (!editingUser) return;
    try {
      await updateDoc(doc(db, 'usuarios', editingUser.id), {
        rol: editRole,
        activo: editStatus === 'activo',
        permisos: editPermisos,
        updatedAt: new Date()
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el usuario. Verifica permisos en Firestore.');
    }
  };

  const handleDeleteAporte = async (id, colName) => {
    if (!window.confirm('¿Estás seguro de eliminar este aporte de la base de datos?')) return;
    try {
      const targetCol = colName || 'tu_voz_construye_tunja';
      await deleteDoc(doc(db, targetCol, id));
      fetchAportes();
    } catch (err) {
      console.error(err);
      alert('Error al eliminar el aporte.');
    }
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setConfigLoading(true);
    try {
      await setDoc(doc(db, 'configuracion', 'global'), {
        metaVotos: Number(config.metaVotos),
        votosProyectados: Number(config.votosProyectados),
        voluntariosMeta: Number(config.voluntariosMeta),
        mensajeHero: config.mensajeHero,
        linktreeUrl: config.linktreeUrl,
        updatedAt: new Date()
      });
      alert('Configuración global actualizada exitosamente.');
      fetchConfig();
    } catch (err) {
      console.error("Error saving global setting:", err);
      alert('Error al guardar la configuración global en Firestore.');
    } finally {
      setConfigLoading(false);
    }
  };

  // Exportar base de datos como CSV
  const exportToCSV = () => {
    if (aportes.length === 0) {
      alert('No hay aportes para exportar.');
      return;
    }
    const headers = ['ID', 'Autor', 'Email', 'Titulo', 'Contenido', 'Origen', 'Fecha'];
    const rows = aportes.map(a => [
      a.id,
      a.autor || '',
      a.email || '',
      a.titulo || '',
      (a.contenido || '').replace(/"/g, '""').replace(/\n/g, ' '),
      a.origen || '',
      a.dateStr || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BD_Aportes_Ciudadanos_${new Date().toISOString().split('T')[0]}.csv`);
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
    link.setAttribute("download", `BD_Aportes_Ciudadanos_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = users.filter(u => 
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.nombre || u.displayName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAportes = aportes.filter(a =>
    (a.autor || '').toLowerCase().includes(aportesSearchTerm.toLowerCase()) ||
    (a.email || '').toLowerCase().includes(aportesSearchTerm.toLowerCase()) ||
    (a.contenido || '').toLowerCase().includes(aportesSearchTerm.toLowerCase()) ||
    (a.origen || '').toLowerCase().includes(aportesSearchTerm.toLowerCase())
  );

  const filteredAudits = auditorias.filter(au =>
    (au.email || '').toLowerCase().includes(auditsSearchTerm.toLowerCase()) ||
    (au.modulo || '').toLowerCase().includes(auditsSearchTerm.toLowerCase()) ||
    (au.detalles || '').toLowerCase().includes(auditsSearchTerm.toLowerCase())
  );

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
      
      {/* 1. Encabezado del Panel */}
      <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', background: 'var(--bg-primary)' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '900', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.65rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            <Shield size={24} color="var(--primary)" />
            Panel de Control de Campaña
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Gestión de accesos, auditorías del sistema y configuración de metas gubernamentales en tiempo real.</p>
        </div>
      </div>

      {/* 2. Filtros y Selector de Pestañas */}
      <div style={{ padding: '1rem 2rem', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Selector de Pestañas Premium */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-primary)', padding: '0.25rem', borderRadius: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('users')}
            style={{
              padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none',
              background: activeTab === 'users' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'users' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: activeTab === 'users' ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s'
            }}
          >
            <Users size={16} />
            Usuarios ({users.length})
          </button>
          
          <button 
            onClick={() => setActiveTab('aportes')}
            style={{
              padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none',
              background: activeTab === 'aportes' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'aportes' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: activeTab === 'aportes' ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s'
            }}
          >
            <Database size={16} />
            Aportes ({aportes.length})
          </button>

          <button 
            onClick={() => setActiveTab('audits')}
            style={{
              padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none',
              background: activeTab === 'audits' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'audits' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: activeTab === 'audits' ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s'
            }}
          >
            <Key size={16} />
            Auditorías ({auditorias.length})
          </button>

          <button 
            onClick={() => setActiveTab('config')}
            style={{
              padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none',
              background: activeTab === 'config' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'config' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: activeTab === 'config' ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s'
            }}
          >
            <Settings size={16} />
            Metas / Config
          </button>
        </div>

        {/* Buscadores Dinámicos */}
        {activeTab === 'users' && (
          <div style={{ position: 'relative', width: '300px' }}>
            <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar usuarios..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.4rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
          </div>
        )}

        {activeTab === 'aportes' && (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '250px' }}>
              <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Search size={16} />
              </div>
              <input 
                type="text" 
                placeholder="Buscar aportes..." 
                value={aportesSearchTerm}
                onChange={e => setAportesSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.4rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              />
            </div>
            <button 
              onClick={exportToCSV}
              style={{ background: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.65rem 1rem', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Download size={14} /> CSV
            </button>
            <button 
              onClick={exportToJSON}
              style={{ background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.65rem 1rem', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Download size={14} /> JSON
            </button>
          </div>
        )}

        {activeTab === 'audits' && (
          <div style={{ position: 'relative', width: '300px' }}>
            <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Filtrar auditorías..." 
              value={auditsSearchTerm}
              onChange={e => setAuditsSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.4rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
          </div>
        )}
      </div>

      {/* 3. Renderizado del Contenido Activo */}
      
      {/* PESTAÑA 1: GESTIÓN DE USUARIOS */}
      {activeTab === 'users' && (
        <>
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Loader size={36} className="animate-spin" style={{ margin: '0 auto 1.25rem auto', color: 'var(--primary)' }} />
              <p>Sincronizando cuentas ciudadanas...</p>
            </div>
          ) : error ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--accent-red)', fontWeight: 500 }}>
              <p>{error}</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Usuario</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Rol</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Permisos Módulos</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Estado</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', textAlign: 'right' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No se encontraron usuarios.</td>
                    </tr>
                  ) : filteredUsers.map((user) => {
                    const isSA = user.email?.toLowerCase().trim() === 'fabian.cely0724@gmail.com' || (user.rol || user.role) === 'SuperAdmin';
                    return (
                      <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='var(--bg-primary)'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.95rem' }}>
                              {(user.nombre || user.displayName || user.email || '?')[0].toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>{user.nombre || user.displayName || 'Ciudadano Activo'}</div>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <span style={{ 
                            background: isSA ? 'rgba(74,0,114,0.1)' : 'var(--bg-primary)', 
                            color: isSA ? 'var(--primary)' : 'var(--text-primary)', 
                            padding: '0.3rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '800', 
                            border: `1px solid ${isSA ? 'var(--primary)' : 'var(--border-color)'}` 
                          }}>
                            {user.rol || user.role || 'usuario'}
                          </span>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <span title="Historial Electoral" style={{ width: '8px', height: '8px', borderRadius: '50%', background: (isSA || user.permisos?.historialElectoral) ? 'var(--accent-green)' : 'var(--text-muted)', display: 'inline-block' }}></span>
                            <span title="Balance" style={{ width: '8px', height: '8px', borderRadius: '50%', background: (isSA || user.permisos?.balance) ? 'var(--accent-green)' : 'var(--text-muted)', display: 'inline-block' }}></span>
                            <span title="Simulador" style={{ width: '8px', height: '8px', borderRadius: '50%', background: (isSA || user.permisos?.simulador) ? 'var(--accent-green)' : 'var(--text-muted)', display: 'inline-block' }}></span>
                            <span title="Panel Admin" style={{ width: '8px', height: '8px', borderRadius: '50%', background: (isSA || user.permisos?.panelAdmin) ? 'var(--accent-green)' : 'var(--text-muted)', display: 'inline-block' }}></span>
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <span style={{ 
                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                            color: user.activo === false ? 'var(--accent-red)' : 'var(--accent-green)', 
                            fontSize: '0.85rem', fontWeight: '700' 
                          }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: user.activo === false ? 'var(--accent-red)' : 'var(--accent-green)', display: 'inline-block' }}></span>
                            {user.activo === false ? 'Suspendido' : 'Activo'}
                          </span>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleEdit(user)}
                            disabled={isSA}
                            style={{ 
                              background: isSA ? 'var(--bg-primary)' : 'var(--bg-secondary)', 
                              border: '1px solid var(--border-color)', 
                              color: isSA ? 'var(--text-muted)' : 'var(--text-secondary)', 
                              cursor: isSA ? 'not-allowed' : 'pointer', 
                              padding: '0.5rem 0.75rem', borderRadius: '8px', transition: 'all 0.2s', fontWeight: '600', 
                              display: 'inline-flex', alignItems: 'center', gap: '0.35rem' 
                            }}
                          >
                            <Edit2 size={14} /> Editar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* PESTAÑA 2: APORTES */}
      {activeTab === 'aportes' && (
        <>
          {aportesLoading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Loader size={36} className="animate-spin" style={{ margin: '0 auto 1.25rem auto', color: 'var(--primary)' }} />
              <p>Sincronizando aportes ciudadanos...</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', width: '220px' }}>Ciudadano</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', width: '180px' }}>Sección</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Idea / Propuesta</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', width: '150px' }}>Fecha</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', textAlign: 'right', width: '80px' }}>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAportes.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '4rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Inbox size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>No se han registrado aportes aún</div>
                      </td>
                    </tr>
                  ) : filteredAportes.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='var(--bg-primary)'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                      <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.autor || 'Anónimo'}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{item.email}</div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top' }}>
                        <span style={{ 
                          background: item.origen === 'Las 5 de Nico' ? 'rgba(14,165,233,0.1)' : 'rgba(139,92,246,0.1)',
                          color: item.origen === 'Las 5 de Nico' ? '#0284c7' : '#7c3aed',
                          padding: '0.25rem 0.65rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '800',
                          border: `1px solid ${item.origen === 'Las 5 de Nico' ? 'rgba(14,165,233,0.2)' : 'rgba(139,92,246,0.2)'}`
                        }}>
                          {item.origen || 'General'}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top' }}>
                        <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '500', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                          {item.contenido}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {item.dateStr}
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'top', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeleteAporte(item.id, item.collection)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.35rem', borderRadius: '6px', transition: 'all 0.2s' }}
                          onMouseOver={e=>e.currentTarget.style.color='var(--accent-red)'}
                          onMouseOut={e=>e.currentTarget.style.color='var(--text-muted)'}
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

      {/* PESTAÑA 3: AUDITORÍAS */}
      {activeTab === 'audits' && (
        <>
          {auditsLoading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Loader size={36} className="animate-spin" style={{ margin: '0 auto 1.25rem auto', color: 'var(--primary)' }} />
              <p>Cargando registros de auditoría...</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', width: '220px' }}>Usuario</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', width: '150px' }}>Módulo Restringido</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Acción Registrada</th>
                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', width: '180px' }}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAudits.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ padding: '4rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Inbox size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>No hay intentos de acceso no autorizados registrados.</div>
                      </td>
                    </tr>
                  ) : filteredAudits.map((audit) => (
                    <tr key={audit.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='var(--bg-primary)'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>{audit.email}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>UID: {audit.uid}</div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '800' }}>
                          {audit.modulo}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-red)' }}>
                          <AlertTriangle size={14} />
                          {audit.detalles || audit.accion}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {audit.dateStr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* PESTAÑA 4: CONFIGURACIÓN GLOBAL */}
      {activeTab === 'config' && (
        <div style={{ padding: '2.5rem 2rem', maxWidth: '600px' }}>
          {configLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Loader size={24} className="animate-spin" style={{ margin: '0 auto', color: 'var(--primary)' }} />
            </div>
          ) : (
            <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Meta de Votos de Campaña</label>
                <input 
                  type="number" 
                  value={config.metaVotos}
                  onChange={e => setConfig(prev => ({ ...prev, metaVotos: e.target.value }))}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontWeight: '600' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Votos Proyectados Actuales</label>
                <input 
                  type="number" 
                  value={config.votosProyectados}
                  onChange={e => setConfig(prev => ({ ...prev, votosProyectados: e.target.value }))}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontWeight: '600' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Meta de Voluntarios</label>
                <input 
                  type="number" 
                  value={config.voluntariosMeta}
                  onChange={e => setConfig(prev => ({ ...prev, voluntariosMeta: e.target.value }))}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontWeight: '600' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Mensaje de Portada (Hero Slogan)</label>
                <textarea 
                  rows="3"
                  value={config.mensajeHero}
                  onChange={e => setConfig(prev => ({ ...prev, mensajeHero: e.target.value }))}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontWeight: '600', fontFamily: 'var(--font-body)', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Enlace Linktree Oficial</label>
                <input 
                  type="url" 
                  value={config.linktreeUrl}
                  onChange={e => setConfig(prev => ({ ...prev, linktreeUrl: e.target.value }))}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontWeight: '600' }}
                />
              </div>

              <button 
                type="submit"
                style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(74, 0, 114, 0.2)' }}
              >
                <Settings size={16} /> Guardar Configuración
              </button>

            </form>
          )}
        </div>
      )}

      {/* 4. Modal de Edición de Usuario */}
      {editingUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '2rem', width: '90%', maxWidth: '440px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)', animation: 'fadeIn 0.2s ease' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>Editar Perfil Ciudadano</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ajusta el nivel de privilegios y accesos para: <strong>{editingUser.email}</strong></p>
            
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Asignar Rol Administrativo</label>
              <select 
                value={editRole} 
                onChange={e => setEditRole(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600', background: 'var(--bg-primary)' }}
              >
                <option value="usuario">Usuario Registrado (Lector/Aportante)</option>
                <option value="Administrador">Administrador (Gestión General)</option>
                <option value="Editor">Editor (Gestión de Contenido)</option>
                <option value="Analista">Analista (Acceso a Reportes)</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Estado de la Cuenta</label>
              <select 
                value={editStatus} 
                onChange={e => setEditStatus(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600', background: 'var(--bg-primary)' }}
              >
                <option value="activo">Cuenta Activa (Acceso Permitido)</option>
                <option value="inactivo">Cuenta Suspendida (Acceso Denegado)</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Permisos de Acceso a Módulos</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}>
                  <input 
                    type="checkbox" 
                    checked={editPermisos.historialElectoral} 
                    onChange={e => setEditPermisos(prev => ({ ...prev, historialElectoral: e.target.checked }))} 
                  />
                  Historial Electoral
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}>
                  <input 
                    type="checkbox" 
                    checked={editPermisos.balance} 
                    onChange={e => setEditPermisos(prev => ({ ...prev, balance: e.target.checked }))} 
                  />
                  Balance
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}>
                  <input 
                    type="checkbox" 
                    checked={editPermisos.simulador} 
                    onChange={e => setEditPermisos(prev => ({ ...prev, simulador: e.target.checked }))} 
                  />
                  Simulador
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}>
                  <input 
                    type="checkbox" 
                    checked={editPermisos.panelAdmin} 
                    onChange={e => setEditPermisos(prev => ({ ...prev, panelAdmin: e.target.checked }))} 
                  />
                  Panel Admin
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setEditingUser(null)}
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0.75rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.9rem' }}
              >
                Cerrar
              </button>
              <button 
                onClick={handleSave}
                style={{ background: 'var(--primary)', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', color: '#fff', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(74, 0, 114, 0.2)' }}
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
