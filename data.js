// =====================================================================
// DATOS DEL TEST DE SALIDAS EN CIENCIAS DE LA VIDA · versión 2
// Todo el contenido editable de la app está aquí.
// Puedes cambiar textos y puntuaciones sin tocar logic.js ni app.js.
// Escala de las puntuaciones de las salidas: 0 a 10.
// =====================================================================

window.DATA = {

  // ---------------------------------------------------------------
  // DIMENSIONES DE PERSONALIDAD
  // Cada una tiene un texto según la puntuación sea alta, media o baja.
  // ---------------------------------------------------------------
  dimensiones: [
    { id: "D", nombre: "Iniciativa", color: "#B5532F",
      define: "Tomar decisiones, asumir retos y mover las cosas.",
      alta: "Te mueves con soltura bajo presión y te gusta marcar el rumbo.",
      media: "Tomas la iniciativa cuando hace falta, sin necesitar llevar siempre el mando.",
      baja: "Prefieres decidir con calma y con la información completa antes de actuar.",
      trabajo: { alta: "Encajas donde hay objetivos ambiciosos, decisiones y negociación.", media: "Puedes liderar proyectos concretos sin necesitar estar siempre al mando.", baja: "Te sentirás mejor en puestos con criterios claros que en los de decidir rápido bajo presión." } },
    { id: "I", nombre: "Comunicación", color: "#B04468",
      define: "Conectar con otras personas, explicar y convencer.",
      alta: "Explicar, convencer y conocer gente te da energía.",
      media: "Te comunicas bien cuando el trabajo lo pide, sin que sea el centro de tu día.",
      baja: "Rindes mejor con tareas de concentración que con mucha interacción.",
      trabajo: { alta: "Brillarás en puestos de contacto: formar, presentar, negociar o divulgar.", media: "Te van bien los equipos con algo de interlocución, sin estar de cara al público todo el día.", baja: "Busca puestos con tiempo para concentrarte y poca exposición pública." } },
    { id: "S", nombre: "Constancia", color: "#2F5D48",
      define: "Estabilidad, paciencia y trabajo en equipo.",
      alta: "Aportas calma, continuidad y un equipo que funciona.",
      media: "Combinas la constancia con cierta necesidad de variedad.",
      baja: "Buscas variedad y cambio; la rutina te pesa.",
      trabajo: { alta: "Te van los equipos estables y los proyectos largos y bien organizados.", media: "Te adaptas tanto a proyectos largos como a cambios puntuales.", baja: "Te sentirás mejor en entornos dinámicos, con proyectos y retos que cambian." } },
    { id: "C", nombre: "Rigor", color: "#1E2A4A",
      define: "Precisión, análisis y atención al detalle.",
      alta: "Necesitas entender el porqué y que todo cuadre al detalle.",
      media: "Cuidas lo importante sin obsesionarte con cada detalle.",
      baja: "Prefieres avanzar rápido y ajustar sobre la marcha.",
      trabajo: { alta: "Encajas en puestos donde la calidad del dato y la precisión son críticas.", media: "Combinas rigor y agilidad, algo muy útil en puestos que mezclan tareas.", baja: "Te van mejor los puestos ágiles que los muy procedimentados." } }
  ],

  // ---------------------------------------------------------------
  // BLOQUE 1 · PERSONALIDAD (12 afirmaciones, escala de acuerdo 1-5)
  // ---------------------------------------------------------------
  escalaAcuerdo: ["Nada", "Poco", "A veces", "Bastante", "Totalmente"],

  afirmaciones: [
    { dim: "D", texto: "En un proyecto, suelo ser quien decide el rumbo y fija los plazos." },
    { dim: "I", texto: "Me resulta fácil explicar algo complejo a alguien que no sabe del tema." },
    { dim: "S", texto: "Prefiero trabajar siempre con las mismas personas que cambiar de equipo con frecuencia." },
    { dim: "C", texto: "Reviso los detalles dos veces antes de dar algo por terminado." },
    { dim: "D", texto: "Los retos difíciles y la presión me motivan más que me agobian." },
    { dim: "I", texto: "Disfruto conociendo gente nueva en congresos y eventos profesionales." },
    { dim: "S", texto: "Termino lo que empiezo, aunque sea largo y repetitivo." },
    { dim: "C", texto: "Necesito entender el porqué de las cosas antes de aplicarlas." },
    { dim: "D", texto: "Prefiero decidir y ajustar sobre la marcha que esperar a tenerlo todo claro." },
    { dim: "I", texto: "Se me da bien convencer a otras personas de una idea." },
    { dim: "S", texto: "Me siento a gusto con rutinas y procedimientos bien definidos." },
    { dim: "C", texto: "Disfruto analizando datos hasta encontrar el patrón." }
  ],

  // ---------------------------------------------------------------
  // BLOQUE 2 · SITUACIONES (7 preguntas, se elige una opción)
  // Las 5 primeras miden el tipo de tarea; cada opción suma a un
  // "entorno". La 6ª elige el tema y la 7ª la prioridad.
  // ---------------------------------------------------------------
  entornos: [
    { id: "lab", nombre: "Laboratorio" },
    { id: "datos", nombre: "Análisis de datos" },
    { id: "personas", nombre: "Relación con personas" },
    { id: "ensenanza", nombre: "Enseñanza" },
    { id: "docum", nombre: "Normativa y documentación" },
    { id: "produccion", nombre: "Producción y procesos" },
    { id: "comunic", nombre: "Comunicación y contenido" },
    { id: "campo", nombre: "Trabajo de campo" }
  ],

  situaciones: [
    { texto: "Tu grupo consigue financiación para un proyecto nuevo. ¿Qué parte te pedirías?", opciones: [
      { entorno: "lab", texto: "Poner a punto los experimentos" },
      { entorno: "datos", texto: "Diseñar cómo se van a analizar los datos" },
      { entorno: "personas", texto: "Coordinar a los demás grupos y personas para que todo avance a la vez" },
      { entorno: "docum", texto: "Preparar los permisos y la documentación para que el proyecto sea impecable" } ] },
    { texto: "Sale al mercado un tratamiento en el que has trabajado. ¿Qué papel te ilusionaría más?", opciones: [
      { entorno: "produccion", texto: "Asegurar que se fabrica bien a gran escala" },
      { entorno: "personas", texto: "Presentarlo a los equipos médicos que lo van a usar" },
      { entorno: "ensenanza", texto: "Formar al personal que tendrá que aplicarlo" },
      { entorno: "docum", texto: "Conseguir que las autoridades sanitarias lo aprueben" } ] },
    { texto: "Vas a un congreso científico. ¿Qué harías con más gusto?", opciones: [
      { entorno: "comunic", texto: "Contar tu trabajo al público general en una charla abierta" },
      { entorno: "ensenanza", texto: "Dar un taller práctico a estudiantes" },
      { entorno: "datos", texto: "Presentar un análisis tuyo con tus propios datos" },
      { entorno: "personas", texto: "Conocer a gente para futuros proyectos y colaboraciones" } ] },
    { texto: "Una semana de trabajo ideal incluiría sobre todo…", opciones: [
      { entorno: "campo", texto: "Salidas para tomar muestras en la naturaleza" },
      { entorno: "lab", texto: "Horas en el laboratorio con un experimento que por fin funciona" },
      { entorno: "produccion", texto: "Mejorar un proceso para que salga más rápido y sin errores" },
      { entorno: "comunic", texto: "Escribir un artículo o preparar un vídeo sobre tu campo" } ] },
    { texto: "Aparece un resultado inesperado en un estudio. ¿Qué te apetece hacer?", opciones: [
      { entorno: "datos", texto: "Revisar los datos hasta entender qué ha pasado" },
      { entorno: "campo", texto: "Volver al terreno a repetir las mediciones" },
      { entorno: "ensenanza", texto: "Usarlo como caso práctico para enseñar a otras personas" },
      { entorno: "docum", texto: "Documentarlo bien y comprobar que se siguieron los protocolos" } ] },
    { tipo: "ambito", texto: "Si pudieras elegir, tu trabajo tendría que ver sobre todo con…", opciones: [
      { ambito: "salud", texto: "La salud de las personas y los medicamentos" },
      { ambito: "basica", texto: "Entender cómo funciona la vida" },
      { ambito: "alimentos", texto: "Los alimentos y la agricultura" },
      { ambito: "quimica", texto: "La química, los materiales o la cosmética" },
      { ambito: "animal", texto: "La salud de los animales" },
      { ambito: "educacion", texto: "La educación y la divulgación" } ] },
    { tipo: "prioridad", texto: "Dos ofertas son iguales en todo salvo en una cosa. ¿Qué te haría elegir?", opciones: [
      { prio: "estabilidad", texto: "Un contrato indefinido y seguridad a largo plazo" },
      { prio: "autonomia", texto: "Libertad para decidir en qué y cómo trabajas" },
      { prio: "salario", texto: "Un sueldo claramente mejor" },
      { prio: "impacto", texto: "Notar un impacto directo en la vida de la gente" } ] }
  ],

  // ---------------------------------------------------------------
  // CARRERAS (pregunta inicial)
  // ---------------------------------------------------------------
  carreras: [
    { id: "biologia", nombre: "Biología", alias: ["ciencias biologicas"] },
    { id: "biologia-sanitaria", nombre: "Biología Sanitaria", alias: [] },
    { id: "biologia-humana", nombre: "Biología Humana", alias: [] },
    { id: "bioquimica", nombre: "Bioquímica", alias: ["bioquimica y biologia molecular"] },
    { id: "biomedicina", nombre: "Biomedicina / Ciencias Biomédicas", alias: ["ciencias biomedicas", "bioquimica y ciencias biomedicas", "biomedicina basica y experimental"] },
    { id: "genetica", nombre: "Genética", alias: [] },
    { id: "microbiologia", nombre: "Microbiología", alias: [] },
    { id: "biotecnologia", nombre: "Biotecnología", alias: [] },
    { id: "bioinformatica", nombre: "Bioinformática", alias: [] },
    { id: "quimica", nombre: "Química", alias: ["ciencias quimicas"] },
    { id: "ing-quimica", nombre: "Ingeniería Química", alias: [] },
    { id: "farmacia", nombre: "Farmacia", alias: [] },
    { id: "ing-biomedica", nombre: "Ingeniería Biomédica", alias: [] },
    { id: "bioingenieria", nombre: "Bioingeniería", alias: [] },
    { id: "otra", nombre: "Otra carrera de ciencias", alias: [] },
    { id: "nolose", nombre: "Aún no lo sé", alias: [] }
  ],

  // ---------------------------------------------------------------
  // REQUISITOS
  // certeza "seguro": se oculta a quien no esté en acceso ni verificar
  // certeza "verificar": nunca se oculta, solo se avisa
  // certeza "aviso": solo informa
  // siempreAviso: muestra el aviso también a quien tiene acceso
  // ---------------------------------------------------------------
  requisitos: {
    // etiqueta: texto corto del cartel; texto: explicación al tocarlo
    farmacia: { certeza: "seguro", acceso: ["farmacia"], verificar: [],
      etiqueta: "Solo Farmacia", texto: "Requiere el grado en Farmacia." },
    farmaciaVerificar: { certeza: "verificar", acceso: ["farmacia"], verificar: [],
      etiqueta: "Suele pedir Farmacia", texto: "Normalmente requiere el grado en Farmacia. Compruébalo en la normativa vigente." },
    examenFSE: { certeza: "aviso",
      etiqueta: "Examen BIR, QIR o FIR", texto: "Se accede por una prueba selectiva nacional tipo oposición (BIR, QIR o FIR), con plazas limitadas cada año." },
    residenciaLab: { certeza: "seguro",
      acceso: ["biologia", "bioquimica", "quimica", "farmacia"],
      verificar: ["biologia-sanitaria", "biologia-humana", "biomedicina", "genetica", "microbiologia", "biotecnologia", "ing-quimica"],
      etiqueta: "Según tu carrera", texto: "Pueden presentarse Biología y Bioquímica (BIR), Química (QIR) y Farmacia (FIR). Para otras carreras, compruébalo en la convocatoria vigente." },
    radiofarmacia: { certeza: "verificar", acceso: ["farmacia", "quimica"], verificar: ["biologia"],
      etiqueta: "Según tu carrera", texto: "Se accede por FIR o QIR; la vía BIR está por confirmar." },
    especialista: { certeza: "seguro", siempreAviso: true,
      acceso: ["biologia", "bioquimica", "quimica", "farmacia"],
      verificar: ["biologia-sanitaria", "biologia-humana", "biomedicina", "genetica", "microbiologia", "biotecnologia", "ing-quimica"],
      etiqueta: "Requiere residencia", texto: "Requiere haber completado una residencia BIR, QIR o FIR." },
    plazaPublica: { certeza: "aviso",
      etiqueta: "Oposición en la pública", texto: "En la sanidad pública, la plaza fija se consigue por oposición o concurso." },
    intcf: { certeza: "verificar", acceso: ["biologia", "bioquimica", "biomedicina", "genetica", "biotecnologia", "farmacia"], verificar: [],
      etiqueta: "Oposición", texto: "Oposición abierta a titulaciones científicas concretas. Compruébalo en la convocatoria vigente." },
    profesorado: { certeza: "aviso",
      etiqueta: "Máster de Profesorado", texto: "Requiere el Máster de Profesorado, también en centros privados. En la pública, además, oposición." },
    doctorado: { certeza: "aviso",
      etiqueta: "Doctorado y ANECA", texto: "Requiere doctorado y acreditación de ANECA." },
    doctoradoSolo: { certeza: "aviso",
      etiqueta: "Doctorado", texto: "Requiere haber hecho el doctorado." },
    masterDoctorado: { certeza: "aviso",
      etiqueta: "Máster oficial", texto: "Para entrar en un programa de doctorado se necesita un máster oficial." },
    oposicion: { certeza: "aviso",
      etiqueta: "Oposición", texto: "Se accede por oposición." },
    masterHabitual: { certeza: "aviso",
      etiqueta: "Máster específico", texto: "No es obligatorio por ley, pero se suele pedir un máster específico." }
  },

  // ---------------------------------------------------------------
  // CATEGORÍAS PRINCIPALES
  // ---------------------------------------------------------------
  categorias: [
    { id: "academica", nombre: "Investigación académica" },
    { id: "farma", nombre: "Industria Farma y MedTech" },
    { id: "otras", nombre: "Otras industrias" },
    { id: "sanitario", nombre: "Ámbito sanitario y sector público" },
    { id: "docencia", nombre: "Docencia" },
    { id: "comunicacion", nombre: "Comunicación científica" }
  ],

  // ---------------------------------------------------------------
  // SALIDAS (subcategorías)
  // disc: [Iniciativa, Comunicación, Constancia, Rigor]
  // entornos: peso de cada tipo de tarea en el día a día (0-10)
  // prioridades: cuánto ofrece de estabilidad, autonomía, salario, impacto
  // ---------------------------------------------------------------
  subcategorias: [

    // ===== INDUSTRIA FARMA Y MEDTECH =====
    { id: "farma-id", categoria: "farma", nombre: "I+D y desarrollo",
      descripcion: "Investigar y desarrollar nuevos fármacos, terapias o dispositivos desde una empresa.",
      disc: [5, 4, 5, 8],
      entornos: { lab: 10, datos: 6, personas: 3, ensenanza: 1, docum: 3, produccion: 4, comunic: 2, campo: 0 },
      prioridades: { estabilidad: 6, autonomia: 6, salario: 7, impacto: 7 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Research Scientist" },
        { nombre: "Process Development Scientist" },
        { nombre: "AI/ML Scientist en descubrimiento de fármacos" },
        { nombre: "Ingeniería biomédica de dispositivos" },
        { nombre: "Gestión de proyectos de I+D" }
      ] },
    { id: "farma-prod", categoria: "farma", nombre: "Producción y fabricación",
      descripcion: "Fabricar medicamentos y terapias a gran escala, cumpliendo las buenas prácticas de fabricación (GMP).",
      disc: [6, 4, 7, 7],
      entornos: { lab: 3, datos: 3, personas: 4, ensenanza: 1, docum: 5, produccion: 10, comunic: 1, campo: 0 },
      prioridades: { estabilidad: 8, autonomia: 4, salario: 6, impacto: 5 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Puesto técnico o jefatura de producción" },
        { nombre: "Desarrollo galénico" },
        { nombre: "Cell Therapy Manufacturing Associate" },
        { nombre: "Transferencia tecnológica" },
        { nombre: "Dirección técnica y persona cualificada (liberación de lotes)", req: "farmaciaVerificar" },
        { nombre: "Responsabilidad técnica de distribución farmacéutica", req: "farmaciaVerificar" }
      ] },
    { id: "farma-cal", categoria: "farma", nombre: "Calidad",
      descripcion: "Garantizar que cada lote cumple los estándares: análisis, auditorías y procedimientos.",
      disc: [4, 4, 7, 8],
      entornos: { lab: 6, datos: 4, personas: 3, ensenanza: 2, docum: 8, produccion: 7, comunic: 1, campo: 0 },
      prioridades: { estabilidad: 8, autonomia: 4, salario: 6, impacto: 5 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Control de calidad químico y microbiológico" },
        { nombre: "Quality Assurance" },
        { nombre: "Validaciones" },
        { nombre: "Desviaciones, OOS-OOT y reclamaciones" },
        { nombre: "Quality Assurance de dispositivos (ISO 13485)" }
      ] },
    { id: "farma-reg", categoria: "farma", nombre: "Regulatorio y farmacovigilancia",
      descripcion: "Desde dentro de la empresa, registrar sus productos ante las agencias y vigilar la seguridad de sus propios medicamentos una vez en el mercado.",
      disc: [3, 4, 7, 9],
      entornos: { lab: 0, datos: 5, personas: 4, ensenanza: 1, docum: 10, produccion: 2, comunic: 3, campo: 0 },
      prioridades: { estabilidad: 8, autonomia: 5, salario: 7, impacto: 6 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Regulatory Affairs (medicamentos y productos sanitarios)" },
        { nombre: "CMC Regulatory en terapias avanzadas" },
        { nombre: "Healthcare Compliance" },
        { nombre: "Farmacovigilancia" },
        { nombre: "Post-Market Surveillance" },
        { nombre: "Vigilance & FSCA" },
        { nombre: "Persona responsable del cumplimiento (PRRC)" }
      ] },
    { id: "farma-eecc", categoria: "farma", nombre: "Ensayos clínicos",
      descripcion: "Coordinar y supervisar los estudios que prueban la eficacia y seguridad de nuevos tratamientos.",
      disc: [4, 6, 7, 7],
      entornos: { lab: 1, datos: 5, personas: 8, ensenanza: 3, docum: 8, produccion: 0, comunic: 2, campo: 0 },
      prioridades: { estabilidad: 6, autonomia: 6, salario: 6, impacto: 8 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Clinical Trial Assistant (CTA)" },
        { nombre: "Clinical Research Associate (CRA)" },
        { nombre: "Clinical Trial Manager (CTM)" },
        { nombre: "Clinical Affairs de productos sanitarios" },
        { nombre: "Clinical Data Management" },
        { nombre: "Coordinación de estudios clínicos en hospital" }
      ] },
    { id: "farma-med", categoria: "farma", nombre: "Departamento médico",
      descripcion: "Ser el enlace científico entre la compañía y los profesionales sanitarios.",
      disc: [3, 8, 5, 7],
      entornos: { lab: 0, datos: 4, personas: 10, ensenanza: 5, docum: 4, produccion: 0, comunic: 6, campo: 0 },
      prioridades: { estabilidad: 7, autonomia: 6, salario: 8, impacto: 8 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Medical Science Liaison (MSL)" },
        { nombre: "Medical Advisor" },
        { nombre: "Información médica" },
        { nombre: "Medical Affairs Excellence" },
        { nombre: "Medical writing" }
      ] },
    { id: "farma-com", categoria: "farma", nombre: "Comercial y soporte técnico",
      descripcion: "Presentar productos a hospitales y profesionales, y dar soporte técnico sobre su uso.",
      disc: [8, 9, 4, 3],
      entornos: { lab: 0, datos: 2, personas: 10, ensenanza: 4, docum: 1, produccion: 0, comunic: 5, campo: 0 },
      prioridades: { estabilidad: 6, autonomia: 7, salario: 8, impacto: 5 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Visita médica" },
        { nombre: "Key Account Manager (KAM)" },
        { nombre: "Gerencia de ventas" },
        { nombre: "Clinical Application Specialist" },
        { nombre: "Field Application Specialist (FAS)" }
      ] },
    { id: "farma-mkt", categoria: "farma", nombre: "Marketing y paciente",
      descripcion: "Diseñar la estrategia y las campañas de un producto, y la relación con los pacientes.",
      disc: [7, 8, 4, 5],
      entornos: { lab: 0, datos: 5, personas: 7, ensenanza: 1, docum: 2, produccion: 0, comunic: 10, campo: 0 },
      prioridades: { estabilidad: 6, autonomia: 5, salario: 8, impacto: 5 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Product Manager o Brand Manager" },
        { nombre: "Marketing Manager" },
        { nombre: "Omnichannel Manager" },
        { nombre: "Customer Engagement" },
        { nombre: "Patient Engagement y Patient Centricity" },
        { nombre: "Cuentas en agencia de marketing de salud" }
      ] },
    { id: "farma-acc", categoria: "farma", nombre: "Acceso al mercado y negocio",
      descripcion: "Negociar precios y acceso al mercado, cerrar alianzas y buscar oportunidades de negocio.",
      disc: [9, 7, 3, 6],
      entornos: { lab: 0, datos: 7, personas: 9, ensenanza: 1, docum: 6, produccion: 0, comunic: 4, campo: 0 },
      prioridades: { estabilidad: 6, autonomia: 6, salario: 10, impacto: 6 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Market Access Manager" },
        { nombre: "Health Economics (HEOR)" },
        { nombre: "Business Development" },
        { nombre: "Alliance Manager" },
        { nombre: "Launch Excellence" },
        { nombre: "Licitaciones públicas" },
        { nombre: "Consultoría healthcare" }
      ] },
    { id: "farma-datos", categoria: "farma", nombre: "Datos y salud digital",
      descripcion: "Analizar datos clínicos, genómicos o de vida real para decidir con evidencia.",
      disc: [4, 3, 5, 9],
      entornos: { lab: 0, datos: 10, personas: 2, ensenanza: 1, docum: 3, produccion: 1, comunic: 3, campo: 0 },
      prioridades: { estabilidad: 7, autonomia: 7, salario: 9, impacto: 6 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Health Data Scientist" },
        { nombre: "Real World Evidence (RWE)" },
        { nombre: "Análisis de datos ómicos" },
        { nombre: "Bioestadística" },
        { nombre: "Inteligencia artificial aplicada a farma" },
        { nombre: "Digital Health Manager" },
        { nombre: "Software sanitario (SaMD)" }
      ] },

    // ===== INVESTIGACIÓN ACADÉMICA =====
    { id: "ac-exp", categoria: "academica", nombre: "Investigación experimental",
      descripcion: "Diseñar experimentos y generar conocimiento nuevo en una universidad o un centro de investigación.",
      disc: [6, 4, 4, 8],
      entornos: { lab: 10, datos: 6, personas: 2, ensenanza: 3, docum: 2, produccion: 0, comunic: 4, campo: 2 },
      prioridades: { estabilidad: 2, autonomia: 9, salario: 3, impacto: 6 },
      ambitos: ["basica"],
      puestos: [
        { nombre: "Doctorado (personal investigador predoctoral)", req: "masterDoctorado" },
        { nombre: "Investigación postdoctoral", req: "doctoradoSolo" },
        { nombre: "Investigación principal (IP)", req: "doctoradoSolo" },
        { nombre: "Escala de Científicos Titulares del CSIC", req: ["doctoradoSolo", "oposicion"] },
        { nombre: "Docencia e investigación universitaria", req: "doctorado" },
        { nombre: "Astrobiología", singular: true, req: "doctoradoSolo" }
      ] },
    { id: "ac-comp", categoria: "academica", nombre: "Investigación computacional",
      descripcion: "Investigar con modelos, simulaciones y análisis de datos ómicos, sin pipeta.",
      disc: [5, 2, 4, 10],
      entornos: { lab: 0, datos: 10, personas: 1, ensenanza: 3, docum: 2, produccion: 0, comunic: 4, campo: 0 },
      prioridades: { estabilidad: 3, autonomia: 10, salario: 4, impacto: 6 },
      ambitos: ["basica"],
      puestos: [
        { nombre: "Bioinformática" },
        { nombre: "Biología computacional" },
        { nombre: "Química teórica y computacional" }
      ] },
    { id: "ac-biomed", categoria: "academica", nombre: "Investigación biomédica y traslacional",
      descripcion: "Investigar en contacto con la clínica para que los descubrimientos lleguen a los pacientes.",
      disc: [4, 6, 6, 8],
      entornos: { lab: 9, datos: 6, personas: 7, ensenanza: 2, docum: 4, produccion: 0, comunic: 3, campo: 0 },
      prioridades: { estabilidad: 3, autonomia: 7, salario: 4, impacto: 10 },
      ambitos: ["salud", "basica"],
      puestos: [
        { nombre: "Investigación en institutos de investigación sanitaria" },
        { nombre: "Biobancos" },
        { nombre: "Investigación hospitalaria" }
      ] },
    { id: "ac-campo", categoria: "academica", nombre: "Investigación de campo",
      descripcion: "Investigar fuera del laboratorio: muestreos, seguimiento de especies y trabajo en la naturaleza.",
      disc: [7, 4, 4, 6],
      entornos: { lab: 3, datos: 6, personas: 2, ensenanza: 2, docum: 2, produccion: 0, comunic: 3, campo: 10 },
      prioridades: { estabilidad: 2, autonomia: 9, salario: 3, impacto: 6 },
      ambitos: ["basica"],
      puestos: [
        { nombre: "Ecología" },
        { nombre: "Zoología y botánica" },
        { nombre: "Biología marina", singular: true },
        { nombre: "Paleontología", singular: true, req: "doctoradoSolo" }
      ] },
    { id: "ac-tec", categoria: "academica", nombre: "Soporte técnico a la investigación",
      descripcion: "Hacer posible la investigación de otros equipos, con más estabilidad que la carrera investigadora.",
      disc: [3, 5, 8, 8],
      entornos: { lab: 10, datos: 4, personas: 5, ensenanza: 3, docum: 4, produccion: 3, comunic: 0, campo: 0 },
      prioridades: { estabilidad: 5, autonomia: 4, salario: 4, impacto: 6 },
      ambitos: ["basica"],
      puestos: [
        { nombre: "Personal técnico de laboratorio de investigación" },
        { nombre: "Lab manager" },
        { nombre: "Servicios científicos (microscopía, citometría, secuenciación)" }
      ] },
    { id: "ac-gest", categoria: "academica", nombre: "Gestión de la investigación",
      descripcion: "La parte organizativa de la ciencia: proyectos, financiación y transferencia de resultados.",
      disc: [7, 7, 5, 6],
      entornos: { lab: 0, datos: 3, personas: 9, ensenanza: 1, docum: 9, produccion: 0, comunic: 5, campo: 0 },
      prioridades: { estabilidad: 6, autonomia: 5, salario: 5, impacto: 6 },
      ambitos: ["basica"],
      puestos: [
        { nombre: "Gestión de proyectos de investigación" },
        { nombre: "Ayudas y proyectos europeos" },
        { nombre: "Transferencia de conocimiento (OTRI)" },
        { nombre: "Patentes académicas" }
      ] },

    // ===== ÁMBITO SANITARIO Y SECTOR PÚBLICO =====
    { id: "san-fse", categoria: "sanitario", nombre: "Formación sanitaria especializada",
      descripcion: "Residencia de cuatro años en un hospital y plaza de especialista después.",
      disc: [5, 5, 7, 8],
      entornos: { lab: 10, datos: 5, personas: 6, ensenanza: 3, docum: 4, produccion: 1, comunic: 1, campo: 0 },
      prioridades: { estabilidad: 10, autonomia: 4, salario: 7, impacto: 10 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Residencia en Análisis Clínicos", req: ["residenciaLab", "examenFSE"] },
        { nombre: "Residencia en Bioquímica Clínica", req: ["residenciaLab", "examenFSE"] },
        { nombre: "Residencia en Inmunología", req: ["residenciaLab", "examenFSE"] },
        { nombre: "Residencia en Microbiología y Parasitología", req: ["residenciaLab", "examenFSE"] },
        { nombre: "Residencia en Radiofarmacia", req: ["radiofarmacia", "examenFSE"] },
        { nombre: "Residencia FIR en Farmacia Hospitalaria", req: ["farmacia", "examenFSE"] },
        { nombre: "Especialista de laboratorio clínico", req: ["especialista", "plazaPublica"] }
      ] },
    { id: "san-forense", categoria: "sanitario", nombre: "Ciencias forenses y seguridad",
      descripcion: "Analizar pruebas para la justicia y las fuerzas de seguridad.",
      disc: [7, 3, 6, 9],
      entornos: { lab: 9, datos: 6, personas: 3, ensenanza: 1, docum: 7, produccion: 0, comunic: 1, campo: 6 },
      prioridades: { estabilidad: 10, autonomia: 5, salario: 6, impacto: 9 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Instituto Nacional de Toxicología y Ciencias Forenses", req: "intcf", singular: true },
        { nombre: "Policía científica", req: "oposicion", singular: true },
        { nombre: "Criminalística de la Guardia Civil", req: "oposicion", singular: true }
      ] },
    { id: "san-sp", categoria: "sanitario", nombre: "Salud pública y control oficial",
      descripcion: "Trabajar para la administración inspeccionando establecimientos y productos, y actuando ante alertas sanitarias que afectan a toda la población.",
      disc: [7, 5, 5, 9],
      entornos: { lab: 3, datos: 3, personas: 6, ensenanza: 2, docum: 9, produccion: 2, comunic: 2, campo: 7 },
      prioridades: { estabilidad: 10, autonomia: 5, salario: 6, impacto: 9 },
      ambitos: ["salud", "alimentos"],
      puestos: [
        { nombre: "Cuerpos técnicos de salud pública", req: "oposicion" },
        { nombre: "Inspección de seguridad alimentaria", req: "oposicion" },
        { nombre: "Laboratorios de salud pública", req: "oposicion" },
        { nombre: "Sanidad exterior", req: "oposicion" },
        { nombre: "Centros autonómicos de farmacovigilancia", req: "oposicion" },
        { nombre: "Farmacia de atención primaria", req: ["farmacia", "oposicion"] },
        { nombre: "Inspección farmacéutica", req: ["farmacia", "oposicion"] }
      ] },
    { id: "san-agencias", categoria: "sanitario", nombre: "Agencias y organismos reguladores",
      descripcion: "Evaluar y autorizar medicamentos, alimentos o patentes desde la administración.",
      disc: [3, 3, 9, 9],
      entornos: { lab: 0, datos: 5, personas: 2, ensenanza: 1, docum: 10, produccion: 0, comunic: 2, campo: 0 },
      prioridades: { estabilidad: 10, autonomia: 5, salario: 6, impacto: 8 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Evaluación en la AEMPS", req: "oposicion" },
        { nombre: "Examen de patentes en la OEPM", req: "oposicion" },
        { nombre: "Evaluación en la AESAN", req: "oposicion" }
      ] },
    { id: "san-opi", categoria: "sanitario", nombre: "Escalas técnicas de investigación pública",
      descripcion: "Plazas fijas de apoyo técnico en organismos públicos de investigación.",
      disc: [3, 3, 9, 8],
      entornos: { lab: 9, datos: 5, personas: 3, ensenanza: 2, docum: 6, produccion: 3, comunic: 0, campo: 2 },
      prioridades: { estabilidad: 10, autonomia: 3, salario: 5, impacto: 5 },
      ambitos: ["basica"],
      puestos: [
        { nombre: "Escala técnica del CSIC", req: "oposicion" },
        { nombre: "Escala técnica del ISCIII", req: "oposicion" },
        { nombre: "Otros organismos públicos de investigación", req: "oposicion" }
      ] },
    { id: "san-clinica", categoria: "sanitario", nombre: "Práctica clínica y asistencial",
      descripcion: "Trabajo clínico con pacientes en centros públicos o privados: farmacia, reproducción asistida, genética.",
      disc: [4, 8, 7, 7],
      entornos: { lab: 6, datos: 2, personas: 10, ensenanza: 4, docum: 3, produccion: 0, comunic: 2, campo: 0 },
      prioridades: { estabilidad: 7, autonomia: 5, salario: 5, impacto: 10 },
      ambitos: ["salud"],
      puestos: [
        { nombre: "Farmacia comunitaria", req: "farmacia" },
        { nombre: "Embriología clínica", req: "masterHabitual" },
        { nombre: "Diagnóstico molecular" },
        { nombre: "Asesoramiento genético", req: "masterHabitual" },
        { nombre: "Bancos de células y tejidos" }
      ] },

    // ===== DOCENCIA =====
    { id: "doc-sec", categoria: "docencia", nombre: "Secundaria y bachillerato",
      descripcion: "Dar clase de Biología y Geología o de Física y Química en institutos y colegios.",
      disc: [6, 8, 7, 4],
      entornos: { lab: 2, datos: 1, personas: 7, ensenanza: 10, docum: 2, produccion: 0, comunic: 5, campo: 2 },
      prioridades: { estabilidad: 10, autonomia: 5, salario: 4, impacto: 9 },
      ambitos: ["educacion"],
      puestos: [
        { nombre: "Docencia de Biología y Geología", req: "profesorado" },
        { nombre: "Docencia de Física y Química", req: "profesorado" }
      ] },
    { id: "doc-fp", categoria: "docencia", nombre: "Formación Profesional",
      descripcion: "Enseñar en ciclos de laboratorio y sanidad, con mucha práctica.",
      disc: [5, 7, 7, 7],
      entornos: { lab: 7, datos: 1, personas: 5, ensenanza: 10, docum: 3, produccion: 3, comunic: 2, campo: 0 },
      prioridades: { estabilidad: 10, autonomia: 5, salario: 4, impacto: 8 },
      ambitos: ["educacion"],
      puestos: [
        { nombre: "Docencia en ciclos de laboratorio clínico y biomédico", req: "profesorado" },
        { nombre: "Docencia en ciclos de análisis y control de calidad", req: "profesorado" },
        { nombre: "Docencia en ciclos de química industrial", req: "profesorado" }
      ] },
    { id: "doc-uni", categoria: "docencia", nombre: "Docencia universitaria",
      descripcion: "Dar clase en grados de ciencias y combinarlo con investigación.",
      disc: [5, 7, 4, 9],
      entornos: { lab: 5, datos: 6, personas: 4, ensenanza: 10, docum: 2, produccion: 0, comunic: 5, campo: 1 },
      prioridades: { estabilidad: 5, autonomia: 9, salario: 5, impacto: 7 },
      ambitos: ["educacion", "basica"],
      puestos: [
        { nombre: "Docencia universitaria", req: "doctorado" }
      ] },
    { id: "doc-acad", categoria: "docencia", nombre: "Academias y formación no reglada",
      descripcion: "Preparar oposiciones, dar apoyo escolar o crear formación online por tu cuenta.",
      disc: [7, 9, 3, 5],
      entornos: { lab: 0, datos: 1, personas: 7, ensenanza: 10, docum: 1, produccion: 0, comunic: 7, campo: 0 },
      prioridades: { estabilidad: 2, autonomia: 10, salario: 3, impacto: 7 },
      ambitos: ["educacion"],
      puestos: [
        { nombre: "Preparación de BIR, FIR o QIR" },
        { nombre: "Apoyo a selectividad" },
        { nombre: "Clases particulares" },
        { nombre: "Formación online" }
      ] },
    { id: "doc-emp", categoria: "docencia", nombre: "Formación en empresa",
      descripcion: "Formar a equipos dentro de una compañía, por ejemplo de ventas o de laboratorio.",
      disc: [7, 8, 5, 5],
      entornos: { lab: 1, datos: 2, personas: 8, ensenanza: 10, docum: 4, produccion: 2, comunic: 5, campo: 0 },
      prioridades: { estabilidad: 6, autonomia: 6, salario: 8, impacto: 5 },
      ambitos: ["educacion", "salud"],
      puestos: [
        { nombre: "Training & Development en industria farmacéutica" },
        { nombre: "Formación técnica de laboratorio" }
      ] },

    // ===== COMUNICACIÓN CIENTÍFICA =====
    { id: "com-div", categoria: "comunicacion", nombre: "Divulgación y creación de contenido",
      descripcion: "Contar ciencia al gran público por tu cuenta: redes, vídeo, pódcast o libros.",
      disc: [8, 9, 2, 4],
      entornos: { lab: 1, datos: 2, personas: 6, ensenanza: 6, docum: 0, produccion: 0, comunic: 10, campo: 3 },
      prioridades: { estabilidad: 1, autonomia: 10, salario: 3, impacto: 8 },
      ambitos: ["educacion"],
      puestos: [
        { nombre: "Divulgación en redes, YouTube o pódcast" },
        { nombre: "Libros de divulgación" },
        { nombre: "Charlas y conferencias" },
        { nombre: "Ilustración científica", singular: true }
      ] },
    { id: "com-per", categoria: "comunicacion", nombre: "Periodismo científico",
      descripcion: "Informar de la actualidad científica en medios de comunicación.",
      disc: [8, 7, 3, 7],
      entornos: { lab: 0, datos: 5, personas: 7, ensenanza: 1, docum: 3, produccion: 0, comunic: 10, campo: 3 },
      prioridades: { estabilidad: 3, autonomia: 7, salario: 3, impacto: 8 },
      ambitos: ["educacion"],
      puestos: [
        { nombre: "Periodismo científico" },
        { nombre: "Redacción en agencias de noticias científicas" }
      ] },
    { id: "com-inst", categoria: "comunicacion", nombre: "Comunicación institucional",
      descripcion: "Comunicar la ciencia de una universidad, un centro de investigación o una empresa.",
      disc: [5, 8, 7, 5],
      entornos: { lab: 0, datos: 3, personas: 8, ensenanza: 3, docum: 4, produccion: 0, comunic: 10, campo: 0 },
      prioridades: { estabilidad: 8, autonomia: 4, salario: 5, impacto: 6 },
      ambitos: ["educacion"],
      puestos: [
        { nombre: "Unidades de cultura científica (UCC+i)" },
        { nombre: "Gabinetes de prensa de centros de investigación" },
        { nombre: "Comunicación corporativa en farma" }
      ] },
    { id: "com-red", categoria: "comunicacion", nombre: "Redacción y edición científica",
      descripcion: "Escribir y editar textos científicos y técnicos con precisión.",
      disc: [3, 3, 7, 10],
      entornos: { lab: 0, datos: 4, personas: 1, ensenanza: 2, docum: 9, produccion: 0, comunic: 10, campo: 0 },
      prioridades: { estabilidad: 6, autonomia: 8, salario: 7, impacto: 5 },
      ambitos: ["educacion", "salud"],
      puestos: [
        { nombre: "Medical writing" },
        { nombre: "Redacción de documentación regulatoria" },
        { nombre: "Agencias de comunicación médica" },
        { nombre: "Edición en revistas y editoriales científicas" },
        { nombre: "Traducción científica" }
      ] },
    { id: "com-museo", categoria: "comunicacion", nombre: "Museos y educación científica",
      descripcion: "Crear experiencias científicas presenciales para todo tipo de público.",
      disc: [5, 9, 7, 3],
      entornos: { lab: 3, datos: 0, personas: 9, ensenanza: 9, docum: 1, produccion: 0, comunic: 8, campo: 3 },
      prioridades: { estabilidad: 5, autonomia: 5, salario: 3, impacto: 8 },
      ambitos: ["educacion"],
      puestos: [
        { nombre: "Educación en museos y centros de ciencia" },
        { nombre: "Diseño de exposiciones" },
        { nombre: "Talleres científicos" },
        { nombre: "Conservación y restauración del patrimonio", singular: true }
      ] }
  ],

  // ---------------------------------------------------------------
  // OTRAS INDUSTRIAS: la función se puntúa como en farma y el tema
  // elegido decide el sector. Solo aparecen los sectores del tema.
  // ---------------------------------------------------------------
  otrasIndustrias: {
    funciones: {
      id: { base: "farma-id", nombre: "I+D" },
      prod: { base: "farma-prod", nombre: "Producción" },
      cal: { base: "farma-cal", nombre: "Calidad" },
      reg: { base: "farma-reg", nombre: "Regulatorio" },
      com: { base: "farma-com", nombre: "Comercial" }
    },
    sectores: [
      { id: "alim", nombre: "Industria alimentaria", ambitos: ["alimentos"],
        descripcion: "Desarrollo de alimentos, seguridad alimentaria y nutrición.",
        puestos: {
          id: [{ nombre: "I+D de producto alimentario" }, { nombre: "Tecnología de alimentos" }, { nombre: "Enología", singular: true, req: "masterHabitual" }],
          prod: [{ nombre: "Producción alimentaria" }],
          cal: [{ nombre: "Calidad y seguridad alimentaria" }],
          reg: [{ nombre: "Etiquetado y normativa alimentaria" }],
          com: [{ nombre: "Área comercial del sector alimentario" }]
        } },
      { id: "agro", nombre: "Agrobiotecnología", ambitos: ["alimentos"],
        descripcion: "Mejora vegetal, sanidad vegetal, semillas y bioestimulantes.",
        puestos: {
          id: [{ nombre: "Mejora genética vegetal" }, { nombre: "I+D agro" }, { nombre: "Ensayos de campo" }],
          reg: [{ nombre: "Registro de fitosanitarios y bioestimulantes" }],
          com: [{ nombre: "Área comercial agro" }]
        } },
      { id: "biotind", nombre: "Biotecnología industrial", ambitos: ["quimica"],
        descripcion: "Fermentación, enzimas, bioprocesos, biocombustibles y bioplásticos.",
        puestos: {
          id: [{ nombre: "Desarrollo de cepas" }],
          prod: [{ nombre: "Bioprocesos" }, { nombre: "Escalado" }],
          cal: [{ nombre: "Calidad en bioprocesos" }],
          com: [{ nombre: "Área comercial de biotecnología" }]
        } },
      { id: "quim", nombre: "Industria química", ambitos: ["quimica"],
        descripcion: "Química fina, materiales, polímeros, pinturas y detergentes.",
        puestos: {
          id: [{ nombre: "I+D química" }],
          prod: [{ nombre: "Procesos químicos" }],
          cal: [{ nombre: "Química analítica y control de calidad" }],
          reg: [{ nombre: "Regulación de sustancias químicas (REACH)" }],
          com: [{ nombre: "Área comercial química" }]
        } },
      { id: "cosm", nombre: "Cosmética y cuidado personal", ambitos: ["quimica"],
        descripcion: "Formulación, eficacia, seguridad y regulación de cosméticos.",
        puestos: {
          id: [{ nombre: "Formulación cosmética" }, { nombre: "Perfumería", singular: true, req: "masterHabitual" }],
          prod: [{ nombre: "Producción cosmética" }],
          cal: [{ nombre: "Control de calidad cosmético" }],
          reg: [{ nombre: "Evaluación de seguridad cosmética" }, { nombre: "Regulatorio cosmético" }],
          com: [{ nombre: "Área comercial de cosmética" }]
        } },
      { id: "labs", nombre: "Laboratorios de análisis", ambitos: ["alimentos", "quimica"],
        descripcion: "Laboratorios privados que analizan muestras para otras empresas.",
        puestos: {
          id: [{ nombre: "Ensayos preclínicos (GLP)" }],
          cal: [{ nombre: "Análisis químico" }, { nombre: "Análisis microbiológico" }, { nombre: "Genética no clínica (paternidad, genotipado, transgénicos)" }, { nombre: "Genética forense privada", singular: true }, { nombre: "Calidad y acreditación (ISO 17025)" }, { nombre: "Jefatura de laboratorio" }],
          com: [{ nombre: "Área comercial de servicios analíticos" }]
        } },
      { id: "animal", nombre: "Salud animal", ambitos: ["animal"],
        descripcion: "Vacunas, fármacos y nutrición para animales.",
        puestos: {
          id: [{ nombre: "I+D de vacunas y fármacos veterinarios" }],
          prod: [{ nombre: "Nutrición animal (piensos y aditivos)" }],
          reg: [{ nombre: "Regulatorio veterinario" }, { nombre: "Farmacovigilancia veterinaria" }],
          com: [{ nombre: "Visita veterinaria" }]
        } }
    ]
  },

  // ---------------------------------------------------------------
  // ARQUETIPOS: dimensión principal + secundaria. "EQ" = equilibrado.
  // ---------------------------------------------------------------
  arquetipos: {
    DI: { nombre: "Liderazgo inspirador", descripcion: "Pones en marcha proyectos y contagias a otras personas las ganas de sumarse. Rindes al máximo cuando hay objetivos ambiciosos y gente a la que convencer." },
    DS: { nombre: "Liderazgo de equipo", descripcion: "Marcas el rumbo sin perder de vista al grupo. Te gusta que las cosas avancen, pero de forma sostenida y con un equipo que funcione." },
    DC: { nombre: "Estrategia analítica", descripcion: "Decides con rapidez y con datos. Te atraen los problemas difíciles en los que hay que analizar a fondo y luego actuar con firmeza." },
    ID: { nombre: "Iniciativa comunicativa", descripcion: "Generas ideas y sabes venderlas. Te mueves bien entre personas y te gusta que tu trabajo se vea y tenga eco." },
    IS: { nombre: "Cohesión de equipo", descripcion: "Conectas a las personas y haces que todo el mundo se sienta parte. Aportas confianza, escucha y buen clima de trabajo." },
    IC: { nombre: "Comunicación rigurosa", descripcion: "Explicas lo complejo sin perder precisión. Combinas el gusto por las personas con el respeto por los datos." },
    SD: { nombre: "Ejecución constante", descripcion: "Haces que las cosas salgan, día tras día. Combinas constancia con determinación para llegar a los objetivos." },
    SI: { nombre: "Apoyo y acompañamiento", descripcion: "Eres la persona a la que el equipo acude. Aportas paciencia, cercanía y estabilidad." },
    SC: { nombre: "Fiabilidad metódica", descripcion: "Trabajas con constancia y método, y tus resultados son de fiar. Te sientes a gusto con procesos claros y bien definidos." },
    CD: { nombre: "Análisis resolutivo", descripcion: "Analizas a fondo y llegas a conclusiones claras. Te gusta resolver problemas complejos y decidir con criterio." },
    CI: { nombre: "Pensamiento explicativo", descripcion: "Entiendes las cosas a fondo y disfrutas haciéndolas comprensibles para otras personas." },
    CS: { nombre: "Precisión y método", descripcion: "Nada se te escapa. Trabajas con detalle, rigor y constancia, y te gusta que todo cuadre." },
    EQ: { nombre: "Perfil versátil", descripcion: "Ninguna dimensión domina sobre las demás: te adaptas con facilidad a entornos muy distintos, lo que te abre muchas puertas." }
  },

  // ---------------------------------------------------------------
  // DATOS CURIOSOS que acompañan a las preguntas
  // ---------------------------------------------------------------
  datosCuriosos: [
    "Las terapias avanzadas (génicas, celulares, CAR-T) son una de las áreas con más escasez de talento especializado en España.",
    "Hay puestos como Omnichannel Manager o Launch Excellence que en 2020 prácticamente no existían en la industria farmacéutica.",
    "Hay gente de ciencias que analiza pigmentos y materiales de obras de arte para conservarlas y restaurarlas.",
    "Un Medical Science Liaison (MSL) es el enlace científico entre una farmacéutica y el personal médico, y no vende nada.",
    "El regulatorio de productos sanitarios se ha convertido en uno de los perfiles más escasos y mejor pagados del sector.",
    "La farmacovigilancia ya usa inteligencia artificial para detectar señales de seguridad entre millones de notificaciones.",
    "La embriología clínica no tiene vía BIR: se llega a ella con un máster de reproducción asistida.",
    "El Centro de Astrobiología, del CSIC y el INTA, investiga el origen de la vida y si puede existir fuera de la Tierra.",
    "El Espacio Europeo de Datos Sanitarios permitirá compartir datos clínicos entre países para investigar, y hará falta mucha gente que sepa analizarlos.",
    "La Oficina Española de Patentes y Marcas tiene examinadores con formación científica que deciden si un invento es patentable.",
    "Las grandes farmacéuticas ya contratan perfiles de sostenibilidad (ESG) por la presión de la normativa europea.",
    "El asesoramiento genético todavía no es una profesión regulada en España, aunque cada vez se necesita más.",
    "Un medical writer redacta protocolos de ensayos, informes clínicos y artículos científicos para la industria.",
    "La economía de la salud (HEOR) está entre los perfiles mejor pagados del sector farmacéutico.",
    "Enología, perfumería e ilustración científica también son salidas para quienes estudian ciencias.",
    "Un Clinical Research Associate (CRA) viaja a los hospitales de un ensayo para comprobar que se sigue el protocolo al pie de la letra.",
    "Los datos ómicos (genómica, proteómica, metabolómica) son la base de la medicina de precisión.",
    "La industria de dispositivos médicos y diagnóstico tiene su propia regulación europea y sus propias salidas, distintas de las de farma.",
    "Farmacia Hospitalaria concentra más de la mitad de las plazas FIR de cada convocatoria.",
    "En los laboratorios de análisis alimentario se comprueba que lo que comemos no tenga patógenos, residuos ni alérgenos ocultos."
  ],


  // ---------------------------------------------------------------
  // PARÁMETROS DE CÁLCULO (se calibrarán en el piloto)
  // ---------------------------------------------------------------
  parametros: {
    pesoPersonalidad: 0.45,
    pesoTareas: 0.45,
    pesoPrioridad: 0.10,
    bonusAmbito: 6,
    distanciaMaxima: 12,
    umbralEquilibrado: 1.5,
    umbralAlta: 6.5,     // a partir de aquí, texto de dimensión "alta"
    umbralBaja: 3.5,     // por debajo, texto "baja"
    topSalidas: 5,
    salidasNoEncajan: 3
  }
};
