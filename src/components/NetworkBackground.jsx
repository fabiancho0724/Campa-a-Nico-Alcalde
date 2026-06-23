import React, { useEffect, useRef } from 'react';

export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    let animationFrameId;
    
    let mouse = {
      x: null,
      y: null,
      radius: 150
    };

    const init = () => {
      const parent = canvas.parentElement;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;

      particles = [];
      const particleCount = Math.min((width * height) / 15000, 150); // Ajusta la densidad
      
      const isDark = document.documentElement.classList.contains('dark');
      const colorPrimary = isDark ? '59, 130, 246' : '74, 0, 114';
      const colorSecondary = isDark ? '6, 182, 212' : '0, 184, 217';

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(colorPrimary, colorSecondary));
      }
    };

    class Particle {
      constructor(c1, c2) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 0.5;
        // Colores más visibles y corporativos
        const colors = [`rgba(${c1}, 0.6)`, `rgba(${c1}, 0.4)`, `rgba(${c2}, 0.5)`];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Interaction with mouse
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            // Tympanus style effect where particles are pushed or pulled slightly
            // We'll just push them gently
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 2;
            this.y -= forceDirectionY * force * 2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const strokeColor = isDark ? '59, 130, 246' : '74, 0, 114';
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Conexiones
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 140) {
            ctx.beginPath();
            const opacity = (1 - (distance / 140)) * 0.4;
            ctx.strokeStyle = `rgba(${strokeColor}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        // Conexiones con el ratón
        if (mouse.x != null && mouse.y != null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 180) {
               ctx.beginPath();
               const opacity = (1 - (distance / 180)) * 0.5;
               ctx.strokeStyle = `rgba(${strokeColor}, ${opacity})`;
               ctx.lineWidth = 1;
               ctx.moveTo(particles[i].x, particles[i].y);
               ctx.lineTo(mouse.x, mouse.y);
               ctx.stroke();
            }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      // Usar ResizeObserver idealmente, o al menos re-hacer init
      init();
    };
    
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        init();
      });
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    
    // Obtener la posición del cursor, ajustando por scroll
    const handleMouseMove = (e) => {
      // Conseguimos las coordenadas relativas al documento y compensamos con el canvas
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    init();
    animate();

    return () => {
      if (canvas.parentElement) resizeObserver.unobserve(canvas.parentElement);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none' // Importante para que no bloquee los clics en los botones subyacentes
      }}
    />
  );
}
