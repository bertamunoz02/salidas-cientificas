// =====================================================================
// LÓGICA DEL TEST · versión 2
// Perfil, arquetipo, afinidad con cada salida y filtro por carrera.
// Los textos y puntuaciones están en data.js.
// =====================================================================

(function (root) {
  "use strict";

  const DIMS = ["D", "I", "S", "C"];
  const media = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  const limitar = (x, a, b) => Math.max(a, Math.min(b, x));

  // ---------- PERFIL (afirmaciones con escala 1-5) ----------
  // acuerdo: [1-5, ...] en el orden de DATA.afirmaciones
  function calcularPerfil(DATA, acuerdo) {
    const suma = { D: [], I: [], S: [], C: [] };
    DATA.afirmaciones.forEach((a, i) => {
      if (acuerdo[i] != null) suma[a.dim].push(acuerdo[i]);
    });
    const perfil = {};
    DIMS.forEach((d) => {
      perfil[d] = suma[d].length ? Math.round(((media(suma[d]) - 1) / 4) * 100) / 10 : 5;
    });
    return perfil;
  }

  // ---------- ARQUETIPO ----------
  function calcularArquetipo(DATA, perfil) {
    const orden = DIMS.slice().sort((a, b) => perfil[b] - perfil[a]);
    const max = perfil[orden[0]], min = perfil[orden[3]];
    const clave = (max - min < DATA.parametros.umbralEquilibrado) ? "EQ" : orden[0] + orden[1];
    return { clave, ...DATA.arquetipos[clave], orden };
  }

  // Nivel de cada dimensión para elegir su texto explicativo
  function nivel(DATA, v) {
    if (v >= DATA.parametros.umbralAlta) return "alta";
    if (v < DATA.parametros.umbralBaja) return "baja";
    return "media";
  }

  // ---------- SITUACIONES ----------
  // elecciones: [índice de opción, ...] en el orden de DATA.situaciones
  function leerSituaciones(DATA, elecciones) {
    const tareas = [];          // [{ pregunta, entorno }]
    let ambito = null, prioridad = null;
    DATA.situaciones.forEach((q, i) => {
      const idx = elecciones[i];
      if (idx == null) return;
      const o = q.opciones[idx];
      if (q.tipo === "ambito") ambito = o.ambito;
      else if (q.tipo === "prioridad") prioridad = o.prio;
      else tareas.push({ pregunta: i, entorno: o.entorno });
    });
    return { tareas, ambito, prioridad };
  }

  // ---------- AFINIDADES PARCIALES (0-100) ----------
  // Personalidad: compara la forma de los dos perfiles (qué dimensiones
  // destacan y cuáles quedan bajas), restando a cada uno su media.
  function afinidadPersonalidad(DATA, perfil, disc) {
    const p = DIMS.map((d) => perfil[d]);
    const mp = media(p), ms = media(disc);
    let s = 0;
    for (let i = 0; i < 4; i++) { const d = (p[i] - mp) - (disc[i] - ms); s += d * d; }
    return limitar(100 * (1 - Math.sqrt(s) / DATA.parametros.distanciaMaxima), 0, 100);
  }

  // Tareas: de las tareas que has elegido, cuánto pesan en esta salida,
  // comparado con lo máximo que podría sumar esta salida en esas preguntas.
  function afinidadTareas(DATA, tareas, entornosSalida) {
    if (!tareas.length) return 50;
    let obtenido = 0, maximo = 0;
    tareas.forEach((t) => {
      obtenido += entornosSalida[t.entorno] || 0;
      const q = DATA.situaciones[t.pregunta];
      maximo += Math.max(...q.opciones.map((o) => entornosSalida[o.entorno] || 0));
    });
    return maximo ? (obtenido / maximo) * 100 : 50;
  }

  function afinidadPrioridad(prioridad, prioridadesSalida) {
    if (!prioridad) return 50;
    return (prioridadesSalida[prioridad] ?? 5) * 10;
  }

  // ---------- REQUISITOS POR CARRERA ----------
  // Un puesto puede tener uno o varios requisitos (req: "x" o req: ["x", "y"]).
  // Devuelve { visible, avisos: [{ etiqueta, texto }] }
  function evaluarRequisito(r, carrera) {
    if (r.certeza === "aviso") return { visible: true, aviso: true };
    const sinCarrera = !carrera || carrera === "nolose" || carrera === "otra";
    if (sinCarrera) return { visible: true, aviso: true };
    const acceso = r.acceso || [], verificar = r.verificar || [];
    if (acceso.includes(carrera)) return { visible: true, aviso: !!r.siempreAviso };
    if (verificar.includes(carrera)) return { visible: true, aviso: true, comprobar: true };
    if (r.certeza === "seguro") return { visible: false, aviso: false };
    return { visible: true, aviso: true };
  }

  function evaluarPuesto(DATA, puesto, carrera) {
    const lista = puesto.req ? [].concat(puesto.req) : [];
    const avisos = [];
    let visible = true;
    lista.forEach((clave) => {
      const r = DATA.requisitos[clave];
      if (!r) return;
      const e = evaluarRequisito(r, carrera);
      if (!e.visible) visible = false;
      if (e.aviso) avisos.push(e.comprobar
        ? { etiqueta: "Comprueba tu acceso", texto: "Tu carrera podría dar acceso, pero hay que comprobarlo en la convocatoria vigente. " + r.texto }
        : { etiqueta: r.etiqueta, texto: r.texto });
    });
    return { visible, avisos };
  }

  // ---------- CATÁLOGO DE SALIDAS ----------
  function construirSalidas(DATA) {
    const porId = {};
    DATA.subcategorias.forEach((s) => { porId[s.id] = s; });
    const salidas = DATA.subcategorias.map((s) => ({ ...s, tipo: "normal" }));
    const oi = DATA.otrasIndustrias;
    oi.sectores.forEach((sector) => {
      Object.keys(sector.puestos).forEach((fKey) => {
        const f = oi.funciones[fKey], base = porId[f.base];
        salidas.push({
          id: "otras-" + sector.id + "-" + fKey, categoria: "otras", tipo: "otras",
          nombre: f.nombre + " · " + sector.nombre, descripcion: sector.descripcion,
          disc: base.disc, entornos: base.entornos, prioridades: base.prioridades,
          ambitos: sector.ambitos, puestos: sector.puestos[fKey]
        });
      });
    });
    return salidas;
  }

  // ---------- CÁLCULO COMPLETO ----------
  // respuestas = { carrera, acuerdo: [1-5]x12, situaciones: [índice]x7 }
  function calcularResultado(DATA, respuestas) {
    const P = DATA.parametros;
    const perfil = calcularPerfil(DATA, respuestas.acuerdo);
    const arquetipo = calcularArquetipo(DATA, perfil);
    const { tareas, ambito, prioridad } = leerSituaciones(DATA, respuestas.situaciones);

    const salidas = construirSalidas(DATA).map((s) => {
      const aP = afinidadPersonalidad(DATA, perfil, s.disc);
      const aT = afinidadTareas(DATA, tareas, s.entornos);
      const aR = afinidadPrioridad(prioridad, s.prioridades);
      const coincideAmbito = !!ambito && s.ambitos.includes(ambito);
      let total = P.pesoPersonalidad * aP + P.pesoTareas * aT + P.pesoPrioridad * aR;
      if (coincideAmbito) total += P.bonusAmbito;
      total = Math.round(limitar(total, 0, 100));
      const puestos = s.puestos
        .map((pu) => ({ ...pu, ...evaluarPuesto(DATA, pu, respuestas.carrera) }))
        .filter((pu) => pu.visible);
      return { ...s, puestos, coincideAmbito, total,
        detalle: { personalidad: Math.round(aP), tareas: Math.round(aT), prioridad: Math.round(aR) } };
    })
      .filter((s) => s.puestos.length > 0)
      .filter((s) => s.tipo !== "otras" || s.coincideAmbito);

    salidas.sort((a, b) => b.total - a.total);
    const top = salidas.slice(0, P.topSalidas);
    const categorias = DATA.categorias.map((c) => {
      const deCat = salidas.filter((s) => s.categoria === c.id);
      return { ...c, mejor: deCat.length ? deCat[0].total : 0, salidas: deCat };
    }).filter((c) => c.salidas.length).sort((a, b) => b.mejor - a.mejor);
    const noEncajan = salidas.filter((s) => s.tipo === "normal").slice(-P.salidasNoEncajan).reverse();

    const niveles = {};
    DIMS.forEach((d) => { niveles[d] = nivel(DATA, perfil[d]); });

    return { perfil, niveles, arquetipo, tareas, ambito, prioridad, salidas, top, categorias, noEncajan };
  }

  const Logic = { DIMS, calcularPerfil, calcularArquetipo, nivel, leerSituaciones,
    afinidadPersonalidad, afinidadTareas, afinidadPrioridad, evaluarPuesto, construirSalidas, calcularResultado };
  if (typeof module !== "undefined" && module.exports) module.exports = Logic;
  root.Logic = Logic;
})(typeof window !== "undefined" ? window : globalThis);
