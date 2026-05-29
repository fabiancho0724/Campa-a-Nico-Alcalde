import React, { useState } from 'react';
import { initialNewsData } from '../data/campaignData';
import { Calendar, Clock, Plus, Filter, Newspaper, X, Eye } from 'lucide-react';

export default function NewsFeed() {
  const [news, setNews] = useState(initialNewsData);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [activeArticle, setActiveArticle] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Estados del Formulario de Simulación
  const [formTitulo, setFormTitulo] = useState('');
  const [formResumen, setFormResumen] = useState('');
  const [formContenido, setFormContenido] = useState('');
  const [formCategoria, setFormCategoria] = useState('General');
  const [formTiempo, setFormTiempo] = useState('3');

  // Categorías Únicas
  const categories = ['Todas', 'Educación', 'Salud', 'Vías e Infraestructura', 'Seguridad', 'General'];

  // Filtrado de Noticias
  const filteredNews = selectedCategory === 'Todas' 
    ? news 
    : news.filter(n => n.categoria === selectedCategory);

  // Publicar Nueva Noticia Simulación
  const handlePublish = (e) => {
    e.preventDefault();
    if (!formTitulo || !formContenido || !formResumen) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const newArticle = {
      id: `news_${Date.now()}`,
      titulo: formTitulo,
      resumen: formResumen,
      contenido: formContenido,
      categoria: formCategoria,
      fecha: new Date().toISOString().split('T')[0],
      leidoMs: Number(formTiempo),
      imagenUrl: "dynamic_campaign_news"
    };

    setNews([newArticle, ...news]);
    
    // Limpiar Formulario
    setFormTitulo('');
    setFormResumen('');
    setFormContenido('');
    setFormCategoria('General');
    setFormTiempo('3');
    setShowAddForm(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Cabecera del Feed */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Campañas y <span className="gradient-text-primary">Noticias Al Día</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Mantente al tanto de los eventos comunitarios, debates políticos y las últimas novedades de Nicolás Alcalde.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={18} />
          {showAddForm ? 'Ocultar Redacción' : 'Redactar Noticia'}
        </button>
      </div>

      {/* Formulario de Simulación de Nueva Noticia */}
      {showAddForm && (
        <div className="glass-card card-secondary animate-fade-in" style={{ border: '1px solid var(--secondary)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Newspaper size={20} />
            Simulación: Publicar Noticia de Campaña
          </h3>
          
          <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Título de la Noticia</label>
                <input 
                  type="text" 
                  value={formTitulo}
                  onChange={(e) => setFormTitulo(e.target.value)}
                  placeholder="Ej. Gran caminata comunitaria..."
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Categoría</label>
                <select 
                  value={formCategoria} 
                  onChange={(e) => setFormCategoria(e.target.value)}
                  className="form-select"
                >
                  <option value="Educación">Educación</option>
                  <option value="Salud">Salud</option>
                  <option value="Vías e Infraestructura">Vías e Infraestructura</option>
                  <option value="Seguridad">Seguridad</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Lectura (minutos)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="15"
                  value={formTiempo}
                  onChange={(e) => setFormTiempo(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Resumen Breve (Para la tarjeta)</label>
              <input 
                type="text" 
                value={formResumen}
                onChange={(e) => setFormResumen(e.target.value)}
                placeholder="Describe brevemente de qué trata la noticia..."
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cuerpo de la Noticia</label>
              <textarea 
                rows="4"
                value={formContenido}
                onChange={(e) => setFormContenido(e.target.value)}
                placeholder="Escribe todo el contenido de la publicación aquí..."
                className="form-textarea"
                required
              ></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-accent">
                Publicar Noticia
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Barra de Filtros */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginRight: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Filter size={16} /> Filtrar:
        </span>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`pill ${selectedCategory === cat ? 'pill-green' : 'pill-gold'}`}
            style={{ 
              cursor: 'pointer',
              background: selectedCategory === cat ? 'var(--primary)' : 'rgba(0, 0, 0,0.03)',
              color: selectedCategory === cat ? 'white' : 'var(--text-secondary)',
              border: selectedCategory === cat ? '1px solid var(--primary)' : '1px solid var(--border-color)',
              padding: '0.4rem 0.9rem',
              transition: 'var(--transition-fast)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Noticias */}
      {filteredNews.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Newspaper size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-secondary)' }}>No se encontraron noticias en esta categoría.</p>
        </div>
      ) : (
        <div className="grid-cols-2" style={{ gap: '1.5rem' }}>
          {filteredNews.map(item => (
            <div key={item.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Encabezado de Tarjeta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="pill pill-green" style={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
                  {item.categoria}
                </span>
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} /> {item.fecha}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {item.leidoMs} min
                  </span>
                </div>
              </div>

              {/* Título y Resumen */}
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                {item.titulo}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                {item.resumen}
              </p>

              {/* Botón de Acción */}
              {item.linkUrl ? (
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary" 
                  style={{ 
                    marginTop: 'auto', 
                    fontSize: '0.8rem', 
                    padding: '0.45rem 1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                  }}
                >
                  <Eye size={16} /> Leer Artículo Completo
                </a>
              ) : (
                <button 
                  onClick={() => setActiveArticle(item)}
                  className="btn btn-secondary" 
                  style={{ 
                    marginTop: 'auto', 
                    fontSize: '0.8rem', 
                    padding: '0.45rem 1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Eye size={16} /> Leer Artículo Completo
                </button>
              )}

            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay para ver artículo completo */}
      {activeArticle && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 8, 16, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem'
        }} className="animate-fade-in">
          
          <div className="glass-card" style={{
            maxWidth: '750px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '2.5rem',
            position: 'relative',
            border: '1px solid var(--border-color)'
          }}>
            
            {/* Botón de Cerrar */}
            <button 
              onClick={() => setActiveArticle(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(0, 0, 0,0.05)',
                border: 'none',
                color: 'var(--text-primary)',
                padding: '0.4rem',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0,0.05)'}
            >
              <X size={20} />
            </button>

            {/* Metadatos en Modal */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="pill pill-green" style={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
                {activeArticle.categoria}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={12} /> {activeArticle.fecha}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={12} /> Lectura de {activeArticle.leidoMs} min
              </span>
            </div>

            {/* Contenido en Modal */}
            <h3 style={{ fontSize: '1.7rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.3' }}>
              {activeArticle.titulo}
            </h3>

            <p style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-secondary)', 
              lineHeight: '1.7', 
              whiteSpace: 'pre-line',
              borderLeft: '3px solid var(--primary)',
              paddingLeft: '1rem',
              background: 'rgba(15, 157, 88, 0.02)',
              borderRadius: '16px',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              {activeArticle.resumen}
            </p>

            <p style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-secondary)', 
              lineHeight: '1.7', 
              whiteSpace: 'pre-line'
            }}>
              {activeArticle.contenido}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <button className="btn btn-primary" onClick={() => setActiveArticle(null)}>
                Entendido
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
