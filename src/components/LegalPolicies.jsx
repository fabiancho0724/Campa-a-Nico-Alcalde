import React from 'react';
import { FileText, Shield, Cookie, Lock } from 'lucide-react';

export default function LegalPolicies({ activeLegalDoc }) {
  const policies = {
    tratamiento: {
      title: "Autorización de Tratamiento de Datos",
      icon: <FileText size={28} className="text-primary mb-4" />,
      content: (
        <>
          <p>En cumplimiento de lo dispuesto en la Ley 1581 de 2012 y sus decretos reglamentarios, autorizo de manera libre, previa, expresa, voluntaria y debidamente informada, a la campaña política de <strong>Nicolás Cortés</strong> a la Alcaldía de Tunja 2026, para que recolecte, almacene, use, circule, suprima, procese, compile, intercambie, dé tratamiento, actualice y disponga de los datos personales que he suministrado y que se incorporen en sus distintas bases de datos y/o archivos.</p>
          <p>La recolección y tratamiento de mis datos personales tiene como finalidades:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>El envío de información relacionada con las propuestas, eventos, noticias y actividades de la campaña "Nico Alcalde Tunja 2026".</li>
            <li>La invitación a participar en espacios de diálogo, reuniones, foros y demás eventos políticos y sociales.</li>
            <li>El análisis estadístico y de segmentación para estrategias de comunicación política y contacto directo.</li>
            <li>El envío de mensajes de texto (SMS), correos electrónicos, mensajes de WhatsApp y contacto telefónico.</li>
            <li>La organización de bases de datos de voluntarios, simpatizantes y equipos de trabajo de la campaña.</li>
          </ul>
          <p>Reconozco que me han sido informados mis derechos como titular de los datos personales, los cuales incluyen conocer, actualizar, rectificar y solicitar la supresión de mi información, así como solicitar prueba de la autorización otorgada y revocarla en cualquier momento.</p>
          <p>Para el ejercicio de mis derechos, podré comunicarme al correo electrónico: <strong>info@nicoalcaldetunja.co</strong>.</p>
        </>
      )
    },
    privacidad: {
      title: "Política de Privacidad y Tratamiento de Datos Personales",
      icon: <Shield size={28} className="text-primary mb-4" />,
      content: (
        <>
          <h4 className="font-bold mb-2">1. Objetivo</h4>
          <p>Establecer los criterios para la recolección, almacenamiento, uso, circulación y supresión de los datos personales tratados por la campaña de <strong>Nicolás Cortés, Alcalde Tunja 2026</strong>, garantizando el derecho constitucional que tienen todas las personas a conocer, actualizar y rectificar la información que se haya recogido sobre ellas en nuestras bases de datos o archivos.</p>
          
          <h4 className="font-bold mb-2 mt-4">2. Responsable del Tratamiento</h4>
          <p>El responsable del tratamiento de sus datos personales es la campaña política de Nicolás Cortés, con medios de contacto a través del correo electrónico: <strong>info@nicoalcaldetunja.co</strong>.</p>

          <h4 className="font-bold mb-2 mt-4">3. Finalidades</h4>
          <p>La información recolectada será utilizada con propósitos proselitistas, de comunicación política y organizativa de la campaña, tales como:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Difundir información política, programática y de actualidad sobre la campaña.</li>
            <li>Convocar a eventos, reuniones y manifestaciones.</li>
            <li>Analizar preferencias, tendencias y conformar perfiles demográficos para estrategias de la campaña.</li>
            <li>Registrar y administrar información de simpatizantes, voluntarios y aportantes.</li>
          </ul>

          <h4 className="font-bold mb-2 mt-4">4. Derechos de los Titulares</h4>
          <p>Como titular de sus datos personales, usted tiene derecho a:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Conocer, actualizar y rectificar sus datos personales.</li>
            <li>Solicitar prueba de la autorización otorgada.</li>
            <li>Ser informado sobre el uso que se ha dado a sus datos.</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
            <li>Revocar la autorización y/o solicitar la supresión del dato.</li>
            <li>Acceder en forma gratuita a sus datos personales.</li>
          </ul>

          <h4 className="font-bold mb-2 mt-4">5. Seguridad de la Información</h4>
          <p>La campaña ha adoptado las medidas de seguridad tecnológicas, físicas y administrativas necesarias para proteger la información contra acceso no autorizado, alteración, pérdida o uso indebido.</p>
        </>
      )
    },
    aviso: {
      title: "Aviso de Privacidad",
      icon: <Lock size={28} className="text-primary mb-4" />,
      content: (
        <>
          <p>La campaña política de <strong>Nicolás Cortés a la Alcaldía de Tunja 2026</strong>, en cumplimiento de la Ley 1581 de 2012 y su Decreto Reglamentario 1377 de 2013 (compilado en el Decreto 1074 de 2015), informa a los titulares de datos personales que se encuentran en nuestras bases de datos, que cuenta con una Política de Privacidad y Tratamiento de Datos Personales.</p>
          <p>Los datos personales aportados serán objeto de tratamiento (recolección, almacenamiento, uso, circulación o supresión) con la finalidad de establecer un canal de comunicación directo respecto a las actividades, proyectos, convocatorias, ideas y directrices de la campaña política.</p>
          <p>El tratamiento se realizará de manera estrictamente confidencial, bajo estrictas medidas de seguridad que garanticen la protección de su integridad.</p>
          <p>Le invitamos a conocer nuestra <strong>Política de Privacidad y Tratamiento de Datos Personales</strong> publicada en este mismo portal web. Usted podrá ejercer sus derechos a conocer, actualizar, rectificar y suprimir sus datos personales a través del canal de atención dispuesto para tal fin: el correo electrónico <strong>info@nicoalcaldetunja.co</strong>.</p>
        </>
      )
    },
    cookies: {
      title: "Política de Uso de Cookies y Datos",
      icon: <Cookie size={28} className="text-primary mb-4" />,
      content: (
        <>
          <p>La plataforma digital de la campaña de <strong>Nicolás Cortés a la Alcaldía de Tunja 2026</strong> utiliza cookies y otras tecnologías de seguimiento similares (como web beacons o píxeles) para mejorar su experiencia de navegación, analizar el tráfico del sitio web, personalizar el contenido y apoyar en nuestras actividades de comunicación.</p>
          
          <h4 className="font-bold mb-2 mt-4">¿Qué es una cookie?</h4>
          <p>Una cookie es un pequeño archivo de texto que un sitio web almacena en su computadora o dispositivo móvil cuando usted lo visita. Permite que el sitio recuerde sus acciones y preferencias (tales como inicio de sesión, idioma, tamaño de fuente y otras preferencias de visualización) durante un período de tiempo.</p>

          <h4 className="font-bold mb-2 mt-4">¿Qué tipos de cookies utilizamos?</h4>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Cookies estrictamente necesarias:</strong> Son obligatorias para el correcto funcionamiento del sitio web y no se pueden desactivar en nuestros sistemas. Generalmente solo se configuran en respuesta a acciones realizadas por usted.</li>
            <li><strong>Cookies de rendimiento y análisis:</strong> Nos permiten contar las visitas y fuentes de tráfico para poder evaluar y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más o menos populares.</li>
            <li><strong>Cookies de funcionalidad:</strong> Permiten que el sitio web ofrezca una mejor funcionalidad y personalización.</li>
            <li><strong>Cookies dirigidas o publicitarias:</strong> Pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios o plataformas de redes sociales para construir un perfil de sus intereses.</li>
          </ul>

          <h4 className="font-bold mb-2 mt-4">Control y desactivación de cookies</h4>
          <p>Usted puede controlar y eliminar las cookies en cualquier momento ajustando las preferencias de su navegador web (Chrome, Safari, Firefox, Edge, etc.). Tenga en cuenta que bloquear algunos tipos de cookies puede afectar su experiencia en el sitio y los servicios que podemos ofrecer.</p>

          <p>Si tiene alguna pregunta sobre el uso de cookies en nuestro sitio, puede escribirnos a: <strong>info@nicoalcaldetunja.co</strong>.</p>
        </>
      )
    }
  };

  const doc = policies[activeLegalDoc] || policies.tratamiento;

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '24px',
        padding: '3rem 4rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        border: '1px solid rgba(15,76,129,0.08)'
      }}>
        {doc.icon}
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {doc.title}
        </h2>
        <div style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {doc.content}
        </div>
      </div>
    </div>
  );
}
