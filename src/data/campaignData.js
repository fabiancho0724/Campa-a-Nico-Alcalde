// Datos reales del Presupuesto Municipal de Tunja 2026 y métricas de campaña Pacto Histórico

export const budgetData = {
  vigencia: 2026,
  totalPresupuesto: 534537000000, // $534.537 millones de pesos
  central: {
    nombre: "Administración Central",
    total: 505209000000, // $505.209 millones
    categorias: [
      { id: "funcionamiento", nombre: "Gastos de Funcionamiento", valor: 102888000000, color: "#C5221F", desc: "Sostenimiento administrativo, nómina y gastos operativos de la alcaldía." },
      { id: "inversion", nombre: "Inversión Social y Proyectos", valor: 246609000000, color: "#0F9D58", desc: "Dinero directo destinado a obras públicas, programas de desarrollo y bienestar." },
      { id: "fondos", nombre: "Fondos Especiales", valor: 129069000000, color: "#3F51B5", desc: "Recursos destinados a fines específicos regulados por ley (salud, seguridad, etc.)." },
      { id: "deuda", nombre: "Servicio a la Deuda", valor: 26642000000, color: "#F4B400", desc: "Pago de intereses y amortización de créditos adquiridos por el municipio." }
    ]
  },
  descentralizados: {
    nombre: "Entidades Descentralizadas y Otros",
    total: 29328000000 // $29.328 millones
  },
  // Desglose de Inversión + Fondos Especiales en Sectores Relevantes - Priorizando Salud, Jóvenes, Trabajo, Vías
  sectoresInversion: [
    { id: "salud", nombre: "Salud Pública y E.S.E.", valor: 95000000000, color: "hsl(180, 70%, 38%)", icono: "HeartPulse", desc: "Saneamiento de la ESE Santiago de Tunja, centros de atención primaria y salud preventiva rural." },
    { id: "jovenes", nombre: "Jóvenes y Educación Pública", valor: 112500000000, color: "hsl(150, 70%, 40%)", icono: "GraduationCap", desc: "Mantenimiento de colegios públicos, becas de educación superior, conectividad y Programa de Alimentación Escolar (PAE)." },
    { id: "trabajo", nombre: "Trabajo y Emprendimiento", valor: 45000000000, color: "var(--secondary)", icono: "Briefcase", desc: "Subsidios al empleo joven, incentivos a emprendedores locales y fomento a la industria productiva de Tunja." },
    { id: "vias", nombre: "Vías e Infraestructura Vial", valor: 58000000000, color: "hsl(210, 70%, 45%)", icono: "Milestone", desc: "Plan masivo de pavimentación comunitaria en barrios vulnerables, andenes y recuperación de la malla vial urbana." },
    { id: "seguridad", nombre: "Seguridad y Convivencia", valor: 15000000000, color: "hsl(350, 70%, 45%)", icono: "ShieldAlert", desc: "Cámaras CCTV con inteligencia artificial, alarmas comunitarias e iluminación LED en calles oscuras." },
    { id: "ambiente", nombre: "Medio Ambiente y Agua", valor: 12000000000, color: "hsl(110, 60%, 40%)", icono: "Leaf", desc: "Protección de cuencas hídricas, reforestación y gestión ecológica de residuos." },
    { id: "deporte", nombre: "Deporte y Recreación", valor: 10000000000, color: "hsl(25, 80%, 48%)", icono: "Trophy", desc: "Escuelas de formación deportiva y mantenimiento de parques y polideportivos." },
    { id: "cultura", nombre: "Cultura y Turismo Histórico", valor: 8000000000, color: "var(--bg-primary-hsl)", icono: "Compass", desc: "Promoción de festivales culturales, marca Tunja 2.0 y estímulos directos a artistas locales." },
    { id: "otros", nombre: "Desarrollo Social y Comunitario", valor: 30178000000, color: "hsl(200, 10%, 45%)", icono: "Users", desc: "Atención a poblaciones vulnerables, adulto mayor y programas de inclusión de género." }
  ]
};

export const electoralData = {
  censoElectoral: 132460, // Habilitados para votar en Tunja
  historico2023: {
    ganador: "Mikhail Krasnov (Elegido)",
    votosGanador: 27330,
    porcentajeGanador: 31.53,
    participacionTotal: 86600, // aprox 65.4%
    abstencionTotal: 45860 // aprox 34.6%
  },
  campanaActual: {
    candidato: "Nicolás Cortés",
    partido: "Pacto Histórico",
    metaVotos: 45000,
    votosProyectadosActual: 38240, // Progreso actual estimado
    voluntariosRegistrados: 2150,
    visitasPuertaAPuerta: 18450,
    comunas: [
      { id: "comuna1", nombre: "Comuna 1 (Norte)", votantes: 15200, metaApoyo: 4500, avanceApoyo: 3950 },
      { id: "comuna2", nombre: "Comuna 2 (Nororiente)", votantes: 12800, metaApoyo: 3800, avanceApoyo: 3100 },
      { id: "comuna3", nombre: "Comuna 3 (Oriente)", votantes: 14500, metaApoyo: 4200, avanceApoyo: 3600 },
      { id: "comuna4", nombre: "Comuna 4 (Occidente)", votantes: 13900, metaApoyo: 4000, avanceApoyo: 3450 },
      { id: "comuna5", nombre: "Comuna 5 (Centro)", votantes: 16200, metaApoyo: 5000, avanceApoyo: 4120 },
      { id: "comuna6", nombre: "Comuna 6 (Suroriente)", votantes: 18500, metaApoyo: 6200, avanceApoyo: 5400 },
      { id: "comuna7", nombre: "Comuna 7 (Sur)", votantes: 22100, metaApoyo: 7500, avanceApoyo: 6780 },
      { id: "comuna8", nombre: "Comuna 8 (Suroccidente)", votantes: 14260, metaApoyo: 4800, avanceApoyo: 4040 },
      { id: "comunarural", nombre: "Corregimientos (Rural)", votantes: 5000, metaApoyo: 2000, avanceApoyo: 1800 }
    ]
  }
};

export const proposalsData = [
  {
    id: "prop1",
    titulo: "Salud a Tu Barrio y Fortalecimiento de la E.S.E.",
    pilar: "Salud",
    icono: "HeartPulse",
    descripcion: "Saneamiento fiscal definitivo de la E.S.E. Santiago de Tunja para garantizar salarios dignos y oportunos a médicos. Implementaremos 3 unidades móviles de salud especializada para recorrer las comunas y crearemos el Centro de Salud Mental 'Mente Sana'.",
    metas: [
      "Deuda cero con el personal de salud de la E.S.E. Santiago de Tunja.",
      "3 unidades de atención móvil equipadas con telemedicina y ecografía.",
      "Atención psicológica y psiquiátrica gratuita las 24/7 mediante la línea 'Mente Sana'."
    ],
    montoReferencia: 95000000000,
    impactoPresupuesto: "Ajuste directo de fondos de salud especializando el recaudo de estampillas pro-hospitales y redistribuyendo recursos de publicidad institucional hacia la operación móvil."
  },
  {
    id: "prop2",
    titulo: "Oportunidades para Jóvenes y Educación de Vanguardia",
    pilar: "Jóvenes",
    icono: "GraduationCap",
    descripcion: "Modernizaremos la infraestructura de los colegios públicos de Tunja y proveeremos conectividad gratuita. Crearemos el programa 'Beca Tunja 2.0' para financiar el acceso a educación superior y tecnológica de jóvenes de estratos 1, 2 y 3.",
    metas: [
      "12 instituciones públicas renovadas digitalmente.",
      "Cobertura de Internet de alta velocidad en áreas educativas rurales.",
      "1,500 jóvenes beneficiados anualmente con la 'Beca Tunja 2.0'."
    ],
    montoReferencia: 112500000000,
    impactoPresupuesto: "Redireccionamiento del 20% en viáticos y contratos de prestación de servicios administrativos redundantes de la alcaldía hacia el fondo municipal de becas."
  },
  {
    id: "prop3",
    titulo: "Trabajo Digno y Fomento al Emprendimiento Local",
    pilar: "Trabajo",
    icono: "Briefcase",
    descripcion: "Crearemos la red de incentivos fiscales 'Tunja Emprende', subsidiando aportes a la seguridad social de jóvenes contratados en su primer empleo. Fortaleceremos las cooperativas de trabajo local para la contratación directa de mano de obra tunjana en obras municipales.",
    metas: [
      "Subsidio directo para el primer empleo de 1,200 jóvenes tunjanos.",
      "Creación del fondo de capital semilla 'Tunja Emprende' con $5,000 millones anuales.",
      "Contratación directa de microempresas locales para el mantenimiento del espacio público."
    ],
    montoReferencia: 45000000000,
    impactoPresupuesto: "Asignación del rubro de desarrollo económico municipal y cofinanciación con la caja de compensación familiar de Boyacá y el SENA."
  },
  {
    id: "prop4",
    titulo: "Tunja Conectada: Plan de Pavimentación Comunal",
    pilar: "Vías e Infraestructura",
    icono: "Milestone",
    descripcion: "Lanzaremos el programa de pavimentación comunitaria más grande de la historia de Tunja, pavimentando 15 km de vías críticas dentro de los barrios de las comunas 6, 7 y 8. Renovaremos los senderos peatonales del Centro Histórico con materiales de alta duración respetando la estética patrimonial.",
    metas: [
      "15 kilómetros de vías urbanas recuperadas integralmente.",
      "12,000 metros cuadrados de senderos patrimoniales restaurados.",
      "Creación de la Vía Activa Sostenible para incentivar el uso de ciclorrutas."
    ],
    montoReferencia: 58000000000,
    impactoPresupuesto: "Incremento del rubro de infraestructura vial mediante la pignoración parcial y transparente de recursos de regalías regionales (Región Central) y cofinanciación nacional."
  },
  {
    id: "prop5",
    titulo: "Tunja Blindada: Seguridad con Inteligencia",
    pilar: "Seguridad y Convivencia",
    icono: "ShieldAlert",
    descripcion: "Ampliación de la red de cámaras CCTV agregando 150 nuevos dispositivos de alta definición con software de reconocimiento facial. Crearemos 8 cuadrantes comunitarios con patrullas de reacción rápida y equiparemos los barrios con 2,000 nuevas luminarias LED inteligentes.",
    metas: [
      "150 nuevas cámaras instaladas y conectadas al comando de la Policía.",
      "8 subestaciones de seguridad móvil integradas por comuna.",
      "2,000 luminarias LED instaladas en calles que hoy están a oscuras."
    ],
    montoReferencia: 15000000000,
    impactoPresupuesto: "Asignación del Fondo de Seguridad Territorial (FONSET) redirigiendo el 40% que actualmente se gasta en arrendamientos administrativos hacia la compra tecnológica de seguridad propia."
  }
];

export const initialNewsData = [
  {
    id: "news1",
    titulo: "Nicolás Cortés presenta firmas y traza su primera meta para consolidar llegada a la Alcaldía de Tunja",
    resumen: "El candidato entregó firmas de ciudadanos validando su candidatura independiente.",
    contenido: "Con un contundente respaldo popular, Nicolás Cortés inscribió su candidatura tras recolectar firmas por diversos sectores de la ciudad, comprometiéndose con una agenda renovadora.",
    categoria: "Política",
    fecha: "2023-07-28",
    leidoMs: 4,
    linkUrl: "https://eldiarioboyaca.com/nicolas-cortes-presenta-firmas-y-traza-su-primera-meta-para-consolidar-llegada-a-la-alcaldia-de-tunja/",
    imagenUrl: "reunion_gremios"
  },
  {
    id: "news2",
    titulo: "Noticieros Locales: Nicolás Cortés encabeza intención de voto en sectores juveniles",
    resumen: "Informan que según los recientes sondeos, un gran porcentaje de estudiantes universitarios respaldan la candidatura.",
    contenido: "El apoyo al plan de desarrollo está calando fuerte en las universidades, logrando liderar gran parte de la intención de voto.",
    categoria: "Política",
    fecha: "2023-09-22",
    leidoMs: 5,
    linkUrl: "https://multimediacolombia.com/2023/10/aqui-estan-los-seis-hombres-que-compiten-por-el-primer-cargo-de-los-tunjanos/",
    imagenUrl: "cierre_campana"
  },
  {
    id: "news3",
    titulo: "Nicolás Cortés candidato a la alcaldía habla de sus propuestas ciudadanas",
    resumen: "Entrevista en Boyacá Radio sobre su plan de desarrollo.",
    contenido: "Nicolás Cortés detalló cómo abordará la gestión de recursos públicos y fortalecerá el primer nivel en la E.S.E municipal.",
    categoria: "Salud",
    fecha: "2023-08-30",
    leidoMs: 3,
    linkUrl: "https://boyacaradio.com/noticia.php?id=32519",
    imagenUrl: "plan_salud"
  },
  {
    id: "news4",
    titulo: "Debate Alcaldía: Las propuestas de Nicolás Cortés",
    resumen: "Cortés se destacó en el foro abordando el patrimonio y turismo sostenible.",
    contenido: "Presentó iniciativas tangibles sobre cómo potenciar el circuito histórico de Tunja con presupuestos bien dirigidos.",
    categoria: "Debate",
    fecha: "2023-09-05",
    leidoMs: 4,
    linkUrl: "https://andinastereo.com/tunja/asi-fue-el-debate-con-los-candidatos-a-la-alcaldia-de-tunja/",
    imagenUrl: "foro_cultura"
  }
];
