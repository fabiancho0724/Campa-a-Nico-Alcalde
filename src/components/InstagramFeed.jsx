import React, { useState, useEffect } from 'react';
import { Instagram, Play, Heart, MessageCircle, ExternalLink, Calendar, Loader, Activity, TrendingUp, Users } from 'lucide-react';

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ followers: '15.2K', recentPosts: 12, engagement: '+4.5%' });

  // La integración está preparada para consumir la API de Instagram Graph / Basic Display API.
  // Requiere configurar el token de acceso en las variables de entorno.
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      setLoading(true);
      try {
        const token = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
        
        if (!token) {
          // Fallback informativo de integración si no hay token configurado
          throw new Error('Token de acceso de Instagram no configurado. (VITE_INSTAGRAM_ACCESS_TOKEN)');
        }

        // Endpoint de Instagram Graph API
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}`);
        
        if (!response.ok) {
          throw new Error('Error al conectar con la API de Instagram.');
        }

        const data = await response.json();
        
        // Filtramos para mostrar priorizando Reels/Videos o imágenes
        const formattedPosts = data.data.map(post => ({
          id: post.id,
          type: post.media_type === 'VIDEO' ? 'reel' : 'image',
          imageUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
          caption: post.caption || '',
          url: post.permalink,
          date: new Date(post.timestamp),
        }));

        setPosts(formattedPosts.slice(0, 5)); // Mostrar últimos 5 (1 destacado + 4 secundarios)
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <div style={{ marginTop: '5rem', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
      {/* HEADER DE LA SECCIÓN */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(220, 39, 67, 0.2)' }}>
            <Instagram size={24} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#fff', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              Actividad en Redes
            </h3>
            <p style={{ margin: '0.25rem 0 0 0', color: '#A1A1AA', fontSize: '0.95rem' }}>Últimas publicaciones y anuncios de Nicolás Cortés</p>
          </div>
        </div>
        
        <a 
          href="https://www.instagram.com/nicolas__cortes_/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'var(--primary)', 
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '100px',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: '600',
            transition: 'all 0.2s',
            boxShadow: '0 4px 14px rgba(15, 76, 129, 0.4)'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
        >
          @nicolas__cortes_ <ExternalLink size={16} />
        </a>
      </div>

      {/* PANEL INTELIGENTE (ESTADÍSTICAS) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', backdropFilter: 'blur(10px)' }}>
           <div style={{ background: 'rgba(15, 76, 129, 0.2)', padding: '0.75rem', borderRadius: '12px', color: 'var(--primary)' }}>
             <Activity size={24} />
           </div>
           <div>
             <p style={{ margin: 0, color: '#A1A1AA', fontSize: '0.85rem' }}>Publicaciones Recientes (7d)</p>
             <h4 style={{ margin: '0.25rem 0 0 0', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.recentPosts}</h4>
           </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', backdropFilter: 'blur(10px)' }}>
           <div style={{ background: 'rgba(34, 197, 94, 0.2)', padding: '0.75rem', borderRadius: '12px', color: '#22C55E' }}>
             <TrendingUp size={24} />
           </div>
           <div>
             <p style={{ margin: 0, color: '#A1A1AA', fontSize: '0.85rem' }}>Interacción Semanal</p>
             <h4 style={{ margin: '0.25rem 0 0 0', color: '#22C55E', fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.engagement}</h4>
           </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', backdropFilter: 'blur(10px)' }}>
           <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '12px', color: '#fff' }}>
             <Users size={24} />
           </div>
           <div>
             <p style={{ margin: 0, color: '#A1A1AA', fontSize: '0.85rem' }}>Comunidad</p>
             <h4 style={{ margin: '0.25rem 0 0 0', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.followers}</h4>
           </div>
        </div>
      </div>

      {/* ÁREA DE CONTENIDO DINÁMICO */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#A1A1AA' }}>
            <Loader size={32} className="animate-spin" color="var(--primary)" />
            <span>Sincronizando últimas publicaciones...</span>
          </div>
        </div>
      ) : error ? (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px dashed rgba(255, 255, 255, 0.1)', 
          borderRadius: '16px', 
          padding: '4rem 2rem', 
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <Instagram size={48} color="#71717A" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h4 style={{ color: '#E4E4E7', fontSize: '1.4rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Sincronización en Espera...</h4>
          <p style={{ color: '#A1A1AA', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
            Para mostrar automáticamente tus Reels y publicaciones en tiempo real, asegúrate de configurar el token de la API Oficial de Instagram Basic Display.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', display: 'inline-block', color: '#F87171', fontSize: '0.85rem', border: '1px solid rgba(248, 113, 113, 0.2)', maxWidth: '100%', overflowX: 'auto', textAlign: 'left' }}>
            <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Estado del Sistema:</strong>
            <code style={{ fontFamily: 'var(--font-mono)' }}>{error}</code>
          </div>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {posts.map((post, index) => (
            <a 
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                overflow: 'hidden',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                gridColumn: index === 0 ? 'span 2' : 'span 1', // El primer post es destacado
                gridRow: index === 0 ? 'span 2' : 'span 1'
              }}
              onMouseOver={(e) => { 
                e.currentTarget.style.transform = 'translateY(-5px)'; 
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              className="instagram-card"
            >
              <div style={{ position: 'relative', height: index === 0 ? '400px' : '280px', overflow: 'hidden' }}>
                <img 
                  src={post.imageUrl} 
                  alt={post.caption} 
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                  className="post-image"
                />
                
                {/* Etiqueta de tipo */}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '0.4rem 0.6rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fff', fontSize: '0.8rem', fontWeight: '600' }}>
                  {post.type === 'reel' ? <><Play size={14} fill="#fff" /> Reel</> : <><Instagram size={14} /> Foto</>}
                  {index === 0 && <span style={{ marginLeft: '0.5rem', paddingLeft: '0.5rem', borderLeft: '1px solid rgba(255,255,255,0.3)', color: 'var(--accent)' }}>Destacado</span>}
                </div>

                {/* Overlay de hover */}
                <div className="hover-overlay" style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.5rem',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  backdropFilter: 'blur(4px)'
                }}>
                   <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                     <ExternalLink size={20} /> Ver en Instagram
                   </span>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <p style={{ 
                  color: '#E4E4E7', 
                  fontSize: index === 0 ? '1.1rem' : '0.95rem', 
                  lineHeight: '1.6',
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: index === 0 ? 3 : 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: '300'
                }}>
                  {post.caption}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#71717A', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} />
                    {post.date.toLocaleDateString('es-CO', { month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      <style>{`
        .instagram-card:hover .post-image {
          transform: scale(1.08); /* Suave zoom effect */
        }
        .instagram-card:hover .hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
