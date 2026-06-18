import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Star, Users, Brain, HeartPulse, Sparkles, Navigation, Activity } from 'lucide-react';

export default function Agenda() {
  const [view, setView] = useState('mes'); // mes, semana, dia
  const [currentDate, setCurrentDate] = useState(new Date());

  const mockEvents = [
    { id: 1, title: 'Reunión de equipo', category: 'Interno', date: new Date(new Date().setDate(new Date().getDate() + 1)), time: '09:00 AM', location: 'Centro de Innovación', icon: <Users size={18} /> },
    { id: 2, title: 'Jornada comunitaria', category: 'Social', date: new Date(new Date().setDate(new Date().getDate() + 3)), time: '02:00 PM', location: 'Parque Principal Barrio Sur', icon: <HeartPulse size={18} /> },
    { id: 3, title: 'Encuentro juvenil', category: 'Juventud', date: new Date(new Date().setDate(new Date().getDate() + 5)), time: '04:00 PM', location: 'Plaza de Bolívar', icon: <Sparkles size={18} /> },
    { id: 4, title: 'Sesión de planeación', category: 'Estratégico', date: new Date(new Date().setDate(new Date().getDate() + 7)), time: '10:00 AM', location: 'Sala de Juntas', icon: <Brain size={18} /> },
    { id: 5, title: 'Actividad deportiva', category: 'Recreación', date: new Date(new Date().setDate(new Date().getDate() + 10)), time: '08:00 AM', location: 'Complejo Deportivo', icon: <Activity size={18} /> },
    { id: 6, title: 'Evento cultural', category: 'Cultura', date: new Date(new Date().setDate(new Date().getDate() + 14)), time: '06:00 PM', location: 'Teatro Mayor', icon: <Star size={18} /> }
  ];

  const categories = ['Todos', 'Social', 'Estratégico', 'Juventud', 'Cultura'];
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredEvents = mockEvents.filter(e => activeCategory === 'Todos' || e.category === activeCategory);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const currentMonthDays = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const renderCalendarGrid = () => {
    const grid = [];
    for (let i = 0; i < firstDay; i++) {
      grid.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }
    
    for (let day = 1; day <= currentMonthDays; day++) {
      const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = new Date().toDateString() === dateToCheck.toDateString();
      
      const dayEvents = filteredEvents.filter(e => e.date.toDateString() === dateToCheck.toDateString());
      
      grid.push(
        <div key={`day-${day}`} className={`calendar-cell ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}>
          <div className="day-number">{day}</div>
          <div className="day-events">
            {dayEvents.map(e => (
              <div key={e.id} className="mini-event-indicator" title={e.title}>
                {e.title}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return grid;
  };

  // Countdown logic for highlighted event
  const nextEvent = mockEvents[0];
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = nextEvent.date - now;
      if (distance < 0) {
        setTimeLeft('¡Ocurriendo ahora!');
        return;
      }
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${d}d ${h}h ${m}m`);
    }, 1000);
    return () => clearInterval(timer);
  }, [nextEvent]);

  return (
    <div className="agenda-container animate-fade-in" style={{ padding: '2rem 0' }}>
      
      {/* HEADER AGENDA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            <CalendarIcon size={20} />
            <span style={{ fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Agenda Pública</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>La Agenda de Nico</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Acompaña las actividades y compromisos en la construcción de Tunja 2.0.</p>
        </div>
        
        <div style={{ display: 'flex', background: 'var(--bg-card)', borderRadius: '12px', padding: '0.4rem', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          {['mes', 'semana', 'dia'].map(v => (
            <button 
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '0.5rem 1.5rem',
                border: 'none',
                background: view === v ? 'var(--primary)' : 'transparent',
                color: view === v ? '#fff' : '#64748b',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 300px', gap: '2rem', alignItems: 'start' }}>
        
        {/* MAIN CALENDAR AREA */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={prevMonth} style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#f8fafc'} onMouseOut={e=>e.currentTarget.style.background='#fff'}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextMonth} style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#f8fafc'} onMouseOut={e=>e.currentTarget.style.background='#fff'}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'rgba(0,0,0,0.1)'}`,
                  background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                  color: activeCategory === cat ? '#fff' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {view === 'mes' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', marginBottom: '10px' }}>
                {days.map(day => (
                  <div key={day} style={{ textAlign: 'center', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                    {day}
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {renderCalendarGrid()}
              </div>
            </div>
          )}

          {view !== 'mes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredEvents.map(event => (
                <div key={event.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '16px', background: 'var(--bg-primary)', transition: 'all 0.2s' }} className="list-event-card">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', width: '80px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase' }}>{monthNames[event.date.getMonth()].slice(0,3)}</span>
                    <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{event.date.getDate()}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ background: 'rgba(15,76,129,0.1)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>{event.category}</span>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>{event.title}</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16}/> {event.time}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={16}/> {event.location}</div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredEvents.length === 0 && (
                 <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                   No hay eventos para esta vista.
                 </div>
              )}
            </div>
          )}

        </div>
        
        {/* SIDEBAR WIDGETS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Highlighted Event */}
          <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '24px', padding: '2rem', color: '#fff', boxShadow: '0 20px 40px rgba(15,76,129,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Star size={120} /></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem', backdropFilter: 'blur(5px)' }}>
                <Star size={14} fill="#fff" /> EVENTO DESTACADO
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>{nextEvent.title}</h3>
              <div style={{ opacity: 0.9, fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={14} /> Hoy, {nextEvent.time}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} /> {nextEvent.location}</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                 <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginBottom: '0.2rem' }}>Comienza en</div>
                 <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'monospace' }}>{timeLeft}</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
             <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Resumen Mensual</h3>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    <div style={{ background: 'rgba(15,76,129,0.1)', padding: '0.5rem', borderRadius: '8px', color: 'var(--primary)' }}><Activity size={16}/></div>
                    Eventos Activos
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{mockEvents.length}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    <div style={{ background: 'rgba(16,185,129,0.1)', padding: '0.5rem', borderRadius: '8px', color: '#10b981' }}><Users size={16}/></div>
                    Comunidades
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>4</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    <div style={{ background: 'rgba(245,158,11,0.1)', padding: '0.5rem', borderRadius: '8px', color: '#f59e0b' }}><Navigation size={16}/></div>
                    Localidades
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>2</div>
                </div>
             </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .calendar-cell {
          min-height: 100px;
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 12px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          background: #fff;
          transition: all 0.2s;
        }
        .calendar-cell.empty {
          background: transparent;
          border: none;
        }
        .calendar-cell:hover:not(.empty) {
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(15,76,129,0.1);
        }
        .calendar-cell.today {
          background: rgba(15,76,129,0.02);
          border: 2px solid var(--primary);
        }
        .calendar-cell.today .day-number {
          background: var(--primary);
          color: #fff;
        }
        .day-number {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 700;
          font-size: 0.9rem;
          color: #475569;
          margin-bottom: 0.5rem;
        }
        .day-events {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          overflow: hidden;
        }
        .mini-event-indicator {
          font-size: 0.7rem;
          background: rgba(15,76,129,0.1);
          color: var(--primary);
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
        }
        .list-event-card:hover {
          transform: translateX(5px);
          border-color: var(--primary);
          box-shadow: 0 10px 25px rgba(15,76,129,0.05);
        }
        @media (max-width: 900px) {
          .agenda-container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />

    </div>
  );
}
