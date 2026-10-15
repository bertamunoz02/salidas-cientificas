// =====================================================================
// INTERFAZ v4: pantallas, navegación y resultado en tres pasos
// =====================================================================

(function () {
  "use strict";

  const D = window.DATA;
  const L = window.Logic;
  const app = document.getElementById("app");
  const TOTAL = 1 + D.afirmaciones.length + D.situaciones.length; // 20
  const SIN_MOVIMIENTO = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICONO_ATRAS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  const ICONO_SIGUIENTE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  const ICONO_BAJAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  // ---------- secuencia ----------
  const PASOS = [{ t: "portada" }, { t: "carrera" }];
  D.afirmaciones.forEach((_, i) => PASOS.push({ t: "afirmacion", i }));
  D.situaciones.forEach((_, i) => PASOS.push({ t: "situacion", i }));
  PASOS.push({ t: "perfil" }, { t: "salidas" }, { t: "caminos" });

  const PARTE = { carrera: 1, afirmacion: 2, situacion: 3 };
  const MARCA = "Con B de Biología";
  const FIRMA = `<p class="firma">© ${new Date().getFullYear()} ${MARCA}</p>`;
  const FIRMA_RED = `<div class="firma-red"><p class="firma-red-titulo">Más en ${MARCA}</p><nav class="firma-red-enlaces" aria-label="Con B de Biología"><a href="https://bertamunoz02.github.io/blog/" target="_blank" rel="noopener">Blog</a><a href="https://www.instagram.com/bertamunoz_02/" target="_blank" rel="noopener">Instagram</a><a href="https://www.tiktok.com/@bertamunoz_02" target="_blank" rel="noopener">TikTok</a></nav>${FIRMA}</div>`;
  const NOMBRE_PARTE = { 1: "Tu carrera", 2: "Cómo eres", 3: "Cómo trabajarías" };

  let estado;
  function estadoInicial() {
    return {
      paso: 0, carrera: null,
      acuerdo: D.afirmaciones.map(() => null),
      situaciones: D.situaciones.map(() => null),
      orden: D.situaciones.map((q) => barajar(q.opciones.map((_, i) => i))),
      resultado: null, bloqueado: false, mapa: {}
    };
  }
  function barajar(a) {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
    return b;
  }
  const fmt = (n) => (Math.round(n * 10) / 10).toString().replace(".", ",");
  const dos = (n) => String(n).padStart(2, "0");
  const nombreCat = (id) => (D.categorias.find((c) => c.id === id) || {}).nombre || "";

  function numero(p) {
    if (p.t === "carrera") return 1;
    if (p.t === "afirmacion") return 2 + p.i;
    if (p.t === "situacion") return 2 + D.afirmaciones.length + p.i;
    return 0;
  }
  function calcular() {
    if (!estado.resultado) {
      estado.resultado = L.calcularResultado(D, { carrera: estado.carrera, acuerdo: estado.acuerdo, situaciones: estado.situaciones });
    }
    return estado.resultado;
  }

  // =====================================================================
  // RENDER
  // =====================================================================
  function render(enfocar) {
    const p = PASOS[estado.paso];
    const vistas = { portada: vistaPortada, carrera: vistaCarrera, afirmacion: () => vistaAfirmacion(p.i),
      situacion: () => vistaSituacion(p.i), perfil: vistaPerfil, salidas: vistaSalidas, caminos: vistaCaminos };
    app.innerHTML = vistas[p.t]();
    window.scrollTo(0, 0);
    activarMovimiento();
    if (enfocar !== false) {
      const destino = app.querySelector("[data-foco]");
      if (destino) destino.focus({ preventScroll: true });
    }
  }

  // ---------- efectos al desplazarse ----------
  let observador = null;
  function activarMovimiento() {
    if (observador) { observador.disconnect(); observador = null; }
    const elementos = app.querySelectorAll(".revela");
    if (SIN_MOVIMIENTO || !("IntersectionObserver" in window)) {
      elementos.forEach((e) => e.classList.add("visible"));
    } else {
      observador = new IntersectionObserver((entradas) => {
        entradas.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); observador.unobserve(en.target); } });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
      elementos.forEach((e) => observador.observe(e));
    }
    actualizarPortada();
  }
  // La portada de cada resultado se desvanece y se aleja al bajar
  function actualizarPortada() {
    const h = app.querySelector(".hero-contenido");
    if (!h || SIN_MOVIMIENTO) return;
    const alto = window.innerHeight || 800;
    const t = Math.min(1, window.scrollY / (alto * 0.75));
    h.style.opacity = String(1 - t);
    h.style.transform = `translateY(${-t * 60}px) scale(${1 - t * 0.06})`;
  }
  window.addEventListener("scroll", actualizarPortada, { passive: true });

  function panelPregunta(p, titulo) {
    const n = numero(p);
    return `
      <section class="panel-oscuro">
        <div class="cabecera-pregunta">
          <div class="barra">
            <button class="atras" data-accion="atras">${ICONO_ATRAS} Anterior</button>
            <span class="espacio"></span>
            <span class="contador">${n} de ${TOTAL}</span>
          </div>
          <div class="progreso" role="progressbar" aria-label="Progreso del test" aria-valuemin="0" aria-valuemax="${TOTAL}" aria-valuenow="${n}"><div style="width:${(n / TOTAL) * 100}%"></div></div>
        </div>
        <aside class="dato">
          <p class="dato-titulo">¿Sabías que…?</p>
          <p class="dato-texto">${D.datosCuriosos[(n - 1) % D.datosCuriosos.length]}</p>
        </aside>
        <div class="cuerpo-pregunta">
          <p class="parte">${NOMBRE_PARTE[PARTE[p.t]]}</p>
          <h1 class="pregunta">${titulo}</h1>
        </div>
        <span class="numeral" aria-hidden="true">${dos(n)}</span>
      </section>`;
  }

  // =====================================================================
  // PORTADA
  // =====================================================================
  function vistaPortada() {
    const nombres = [];
    D.subcategorias.forEach((s) => s.puestos.forEach((p) => nombres.push(p.nombre)));
    D.otrasIndustrias.sectores.forEach((sec) => Object.values(sec.puestos).forEach((l) => l.forEach((p) => nombres.push(p.nombre))));
    const unicos = [...new Set(nombres)].filter((n) => n.length < 48);
    const filas = [0, 1, 2, 3].map((f) => unicos.filter((_, i) => i % 4 === f));
    const franja = (lista, k) => {
      const c = lista.map((n) => `<span>${n}</span>`).join("");
      return `<div class="franja ${k % 2 ? "inversa" : ""}" style="--dur:${90 + k * 14}s"><div class="pista">${c}${c}</div></div>`;
    };
    return `
      <div class="pagina portada">
        <section class="panel-oscuro">
          <div class="barra"><span class="marca">${MARCA}</span><span class="espacio"></span><span class="sello">test de <b>salidas científicas</b></span></div>
          <div class="cuerpo-pregunta"><h1 class="portada-titulo">¿Qué salida científica encaja contigo?</h1></div>
          <div class="mural" aria-hidden="true">${filas.map(franja).join("")}</div>
        </section>
        <section class="panel-claro portada-relato">
          ${ilustracionCruce()}
          <div class="relato">
            <p class="relato-grande">Terminas la carrera y llega la pregunta de siempre: <em>¿y ahora qué?</em></p>
            <p>Laboratorio, docencia, oposiciones… y poco más. Eso es casi todo lo que nos cuentan a quienes estudiamos ciencias. Por eso tanta gente acaba eligiendo a ciegas, o por descarte.</p>
            <p>Pero la ciencia abre muchísimas más puertas: industria, regulación, hospitales, datos, divulgación. Este test nace para eso, para ayudarte a descubrir cuáles encajan contigo antes de decidir.</p>
          </div>
          <button class="boton" data-accion="empezar" data-foco>Empezar el test <span class="boton-nota">20 preguntas</span> ${ICONO_SIGUIENTE}</button>
          ${FIRMA_RED}
        </section>
      </div>`;
  }

  // Dibujo: un cruce de caminos con carteles que apuntan en todas direcciones
  function ilustracionCruce() {
    const cartel = (y, dir, texto, color, giro) => {
      const ancho = 30 + texto.length * 9.2;
      const x = dir > 0 ? 154 : 146 - ancho;
      const punta = dir > 0 ? `M${x} ${y} H${x + ancho} L${x + ancho + 18} ${y + 17} L${x + ancho} ${y + 34} H${x} Z`
                            : `M${x + ancho} ${y} H${x} L${x - 18} ${y + 17} L${x} ${y + 34} H${x + ancho} Z`;
      return `<g transform="rotate(${giro} 150 ${y + 17})">
        <path d="${punta}" fill="${color}" stroke="#131B2E" stroke-width="2.5" stroke-linejoin="round"/>
        <text x="${x + ancho / 2 + (dir > 0 ? 4 : -4)}" y="${y + 23}" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-style="italic" font-size="17" fill="#ffffff">${texto}</text>
      </g>`;
    };
    return `
    <svg class="ilustracion" viewBox="0 0 300 300" role="img" aria-label="Un poste en un cruce de caminos con carteles que señalan hacia laboratorio, industria, hospital, aula, divulgación y otras salidas">
      <ellipse cx="150" cy="282" rx="120" ry="12" fill="#F3DCE2"/>
      <path d="M40 300 C90 268 120 262 150 262 C180 262 210 268 260 300" fill="none" stroke="#E6C9D2" stroke-width="2" stroke-dasharray="2 9" stroke-linecap="round"/>
      <rect x="143" y="34" width="14" height="250" rx="3" fill="#E8D9C4" stroke="#131B2E" stroke-width="2.5"/>
      <circle cx="150" cy="30" r="9" fill="#131B2E"/>
      ${cartel(48, 1, "Laboratorio", "#1E2A4A", -4)}
      ${cartel(88, -1, "Industria", "#2F5D48", 3)}
      ${cartel(128, 1, "Hospital", "#B04468", 5)}
      ${cartel(168, -1, "Aula", "#B5532F", -3)}
      ${cartel(208, 1, "Divulgación", "#8F3555", -2)}
      <g font-family="Newsreader, Georgia, serif" font-style="italic" fill="#6B7369" font-size="38">
        <text x="40" y="70">?</text><text x="252" y="190" font-size="28">?</text><text x="56" y="250" font-size="24">?</text>
      </g>
    </svg>`;
  }

  // =====================================================================
  // PREGUNTAS
  // =====================================================================
  function vistaCarrera() {
    const p = PASOS[estado.paso];
    const boton = (c) => `<button class="respuesta carrera ${["otra", "nolose"].includes(c.id) ? "ancha" : ""}" data-accion="carrera" data-id="${c.id}" aria-pressed="${estado.carrera === c.id}">${c.nombre}</button>`;
    return `
      <div class="pagina parte-1">
        ${panelPregunta(p, "¿Qué estudias, has estudiado o te gustaría estudiar?")}
        <section class="panel-claro">
          <div class="lista-carreras" role="group" aria-label="Carreras">${D.carreras.map(boton).join("")}</div>
          ${FIRMA}
        </section>
      </div>`;
  }

  function vistaAfirmacion(i) {
    const p = PASOS[estado.paso];
    const actual = estado.acuerdo[i];
    const intensidad = [8, 16, 28, 42, 58];
    return `
      <div class="pagina parte-2">
        ${panelPregunta(p, D.afirmaciones[i].texto)}
        <section class="panel-claro">
          <div class="respuestas escala" role="group" aria-label="Grado de acuerdo">
            ${D.escalaAcuerdo.map((txt, k) => `<button class="respuesta grado ${k >= 3 ? "fuerte" : ""}" style="--mezcla:${intensidad[k]}%" data-accion="acuerdo" data-valor="${k + 1}" aria-pressed="${actual === k + 1}" ${k === 0 ? "data-foco" : ""}><span class="grado-num" aria-hidden="true">${k + 1}</span>${txt}</button>`).join("")}
          </div>
          ${FIRMA}
        </section>
      </div>`;
  }

  function vistaSituacion(i) {
    const p = PASOS[estado.paso];
    const q = D.situaciones[i];
    const actual = estado.situaciones[i];
    const letras = "ABCDEF";
    return `
      <div class="pagina parte-3">
        ${panelPregunta(p, q.texto)}
        <section class="panel-claro">
          <div class="respuestas ${q.opciones.length > 4 ? "muchas" : ""}" role="group" aria-label="Opciones">
            ${estado.orden[i].map((idx, k) => `<button class="respuesta opcion" data-accion="situacion" data-idx="${idx}" aria-pressed="${actual === idx}" ${k === 0 ? "data-foco" : ""}><span class="letra" aria-hidden="true">${letras[k]}</span><span>${q.opciones[idx].texto}</span></button>`).join("")}
          </div>
          ${FIRMA}
        </section>
      </div>`;
  }

  // =====================================================================
  // RESULTADO 1 · TU PERFIL PROFESIONAL
  // =====================================================================
  function hero(claseExtra, contenido) {
    return `
      <section class="hero ${claseExtra}">
        <div class="hero-contenido">${contenido}</div>
        <span class="desliza" aria-hidden="true">Desliza ${ICONO_BAJAR}</span>
      </section>`;
  }

  function vistaPerfil() {
    const r = calcular();
    const a = r.arquetipo;
    const dims = L.DIMS.slice().sort((x, y) => r.perfil[y] - r.perfil[x]);
    const principales = a.clave === "EQ" ? [] : [a.clave[0], a.clave[1]];
    const nombre = (id) => D.dimensiones.find((x) => x.id === id).nombre;
    const mezcla = a.clave === "EQ" ? "Equilibrio entre las cuatro dimensiones" : `${nombre(principales[0])} y ${nombre(principales[1]).toLowerCase()}`;
    return `
      <div class="resultado">
        ${hero("hero-perfil", `
          <p class="hero-etiqueta">Tu perfil profesional es</p>
          <h1 class="hero-titulo" tabindex="-1" data-foco>${a.nombre}</h1>
          <p class="hero-sub">${mezcla}</p>`)}
        <section class="lamina">
          <div class="interior">
            <p class="lamina-intro revela">${a.descripcion}</p>
            <div class="dimensiones">
              ${dims.map((id, k) => {
                const d = D.dimensiones.find((x) => x.id === id);
                const v = r.perfil[id], nivel = r.niveles[id];
                return `<article class="dimension revela ${principales.includes(id) ? "destaca" : ""}" style="--color:${d.color};--retardo:${k * 90}ms">
                  <div class="dim-fila"><h2 class="dim-nombre">${d.nombre}</h2><span class="dim-valor">${fmt(v)}</span></div>
                  <div class="riel" role="img" aria-label="${d.nombre}: ${fmt(v)} de 10"><div style="--ancho:${Math.max(v * 10, 3)}%"></div></div>
                  <p class="dim-define">${d.define}</p>
                  <p class="dim-texto">${d[nivel]} ${d.trabajo[nivel]}</p>
                </article>`;
              }).join("")}
            </div>
            <div class="navegacion revela">
              <button class="boton grande" data-accion="siguiente">Ver tus salidas ${ICONO_SIGUIENTE}</button>
              <button class="boton grande secundario" data-accion="compartir">Compartir mi perfil</button>
            </div>
            ${FIRMA_RED}
          </div>
        </section>
      </div>`;
  }

  // =====================================================================
  // RESULTADO 2 · TUS 5 SALIDAS
  // =====================================================================
  function vistaSalidas() {
    const r = calcular();
    return `
      <div class="resultado">
        ${hero("hero-salidas", `
          <p class="hero-etiqueta">Según tus respuestas</p>
          <h1 class="hero-titulo" tabindex="-1" data-foco>Estas son las salidas que más encajan contigo</h1>`)}
        <section class="lamina">
          <div class="interior estrecho">
            ${r.top.map((s, k) => tarjetaSalida(s, k)).join("")}
            <div class="navegacion revela">
              <button class="boton grande" data-accion="siguiente">Ver todos los caminos ${ICONO_SIGUIENTE}</button>
              <button class="enlace" data-accion="atras">${ICONO_ATRAS} Volver a tu perfil</button>
            </div>
            ${FIRMA}
          </div>
        </section>
      </div>`;
  }

  const ICONO_ALERTA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.5v.01"/></svg>';
  let contadorAviso = 0;
  function listaPuestos(puestos) {
    return `<ul class="puestos">${puestos.map((pu) => {
      const avisos = (pu.avisos || []).map((a) => {
        const id = "aviso-" + (++contadorAviso);
        return { boton: `<button class="cartel" data-accion="aviso" aria-expanded="false" aria-controls="${id}">${ICONO_ALERTA}${a.etiqueta}</button>`,
          texto: `<span class="cartel-texto" id="${id}" hidden>${a.texto}</span>` };
      });
      return `<li><span class="puesto-linea"><span class="puesto-nombre">${pu.nombre}</span>${pu.singular ? '<span class="cartel singular">Poco conocida</span>' : ""}${avisos.map((a) => a.boton).join("")}</span>${avisos.map((a) => a.texto).join("")}</li>`;
    }).join("")}</ul>`;
  }
  function tarjetaSalida(s, k) {
    const cat = s.tipo === "otras" ? "Otras industrias" : nombreCat(s.categoria);
    return `
      <div class="salida revela ${k === 0 ? "primera" : ""}" data-abierta="${k === 0}" style="--retardo:${k * 70}ms">
        <button data-accion="ficha" aria-expanded="${k === 0}">
          <span class="orden">${k + 1}</span>
          <span class="nombre">${s.nombre}<small>${cat}</small></span>
          <span class="pct">${s.total}<small>%</small></span>
        </button>
        <div class="ficha"><div class="ficha-interior">
          <p>${s.descripcion}</p>
          <h3>Puestos</h3>
          ${listaPuestos(s.puestos)}
          <h3>Por qué encaja contigo</h3>
          <div class="motivos">
            ${motivo("Tu forma de ser", s.detalle.personalidad)}
            ${motivo("Las tareas que eliges", s.detalle.tareas)}
            ${motivo("Lo que priorizas", s.detalle.prioridad)}
          </div>
        </div></div>
      </div>`;
  }
  const motivo = (t, v) => `<div class="motivo"><span>${t}</span><div class="riel" aria-hidden="true"><div style="--ancho:${v}%"></div></div><b>${v}%</b></div>`;

  // =====================================================================
  // RESULTADO 3 · TODOS LOS CAMINOS
  // =====================================================================
  function vistaCaminos() {
    const r = calcular();
    const normales = r.salidas.filter((s) => s.tipo === "normal");
    const topIds = new Set(r.top.map((s) => s.id));
    const tercio = Math.ceil(normales.length / 3);
    const nivelDe = {};
    normales.forEach((s, k) => { nivelDe[s.id] = topIds.has(s.id) ? "tuya" : k < tercio ? "alta" : k < tercio * 2 ? "media" : "baja"; });
    const sectores = D.otrasIndustrias.sectores.map((sec) => {
      const combos = r.salidas.filter((s) => s.id.startsWith("otras-" + sec.id + "-"));
      let nv = "baja";
      if (combos.some((c) => topIds.has(c.id))) nv = "tuya";
      else if (combos.length) nv = r.salidas.indexOf(combos[0]) < r.salidas.length / 3 ? "alta" : "media";
      const puestos = Object.values(sec.puestos).flat().map((p) => ({ ...p, ...L.evaluarPuesto(D, p, estado.carrera) })).filter((p) => p.visible);
      return { id: "sector-" + sec.id, nombre: sec.nombre, descripcion: sec.descripcion, nivel: nv, puestos };
    });
    const peso = { tuya: 0, alta: 1, media: 2, baja: 3 };
    const mapa = r.categorias.map((c) => {
      const piezas = c.id === "otras" ? sectores : D.subcategorias.filter((s) => s.categoria === c.id).map((s) => {
        const enRes = r.salidas.find((x) => x.id === s.id);
        return { id: s.id, nombre: s.nombre, descripcion: s.descripcion, nivel: enRes ? nivelDe[s.id] : "baja", puestos: enRes ? enRes.puestos : [] };
      }).filter((s) => s.puestos.length);
      return { ...c, piezas: piezas.sort((a, b) => peso[a.nivel] - peso[b.nivel]) };
    });
    if (!mapa.some((c) => c.id === "otras")) mapa.push({ id: "otras", nombre: nombreCat("otras"), piezas: sectores });
    estado.mapa = {};
    mapa.forEach((c) => c.piezas.forEach((p) => { estado.mapa[p.id] = p; }));
    const etiqueta = { tuya: "Tu salida", alta: "Afinidad alta", media: "Afinidad media", baja: "Afinidad baja" };

    return `
      <div class="resultado">
        ${hero("hero-caminos", `
          <p class="hero-etiqueta">${mapa.length} caminos, de más a menos afinidad</p>
          <h1 class="hero-titulo" tabindex="-1" data-foco>Todo lo que puedes hacer con tu carrera</h1>`)}
        <section class="lamina">
          <div class="interior estrecho">
            ${mapa.map((c, k) => `
              <article class="camino revela">
                <div class="camino-cabecera"><span class="camino-orden">${k + 1}</span><h2>${c.nombre}</h2></div>
                <div class="piezas">
                  ${c.piezas.map((p, j) => `
                    <div class="pieza revela n-${p.nivel}" style="--retardo:${j * 60}ms">
                      <button data-accion="pieza" data-id="${p.id}" aria-expanded="false">
                        <span class="pieza-nombre">${p.nombre}</span>
                        <span class="pieza-nivel">${etiqueta[p.nivel]}</span>
                        <span class="pieza-icono" aria-hidden="true">${ICONO_BAJAR}</span>
                      </button>
                      <div class="pieza-detalle" hidden></div>
                    </div>`).join("")}
                </div>
              </article>`).join("")}
            <div class="navegacion revela">
              <button class="boton grande" data-accion="compartir">Compartir mi resultado</button>
              <button class="boton grande secundario" data-accion="reiniciar">Repetir el test</button>
              <button class="enlace" data-accion="atras">${ICONO_ATRAS} Volver a tus salidas</button>
            </div>
            ${FIRMA_RED}
          </div>
        </section>
      </div>`;
  }

  // =====================================================================
  // ACCIONES
  // =====================================================================
  function irA(paso) { estado.paso = Math.max(0, Math.min(PASOS.length - 1, paso)); estado.bloqueado = false; render(); }

  function responderYAvanzar(boton) {
    if (estado.bloqueado) return;
    estado.bloqueado = true;
    boton.parentElement.querySelectorAll(".respuesta").forEach((b) => b.setAttribute("aria-pressed", "false"));
    boton.setAttribute("aria-pressed", "true");
    estado.resultado = null; historia = null;
    setTimeout(() => irA(estado.paso + 1), 240);
  }

  function toast(texto) {
    const t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status"); t.textContent = texto;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2400);
  }

  // ---------- COMPARTIR ----------
  const urlTest = () => location.href.split("#")[0];
  const textoCompartir = () => `He hecho el test de salidas científicas y mi perfil profesional es «${estado.resultado.arquetipo.nombre}». ¿Qué salida científica encaja contigo?`;
  const COLOR_CLARO = { D: "#F2A37E", I: "#F0A6BB", S: "#8FC1A8", C: "#A9B6DA" };
  let historia = null; // { blob, url }

  function envolver(ctx, texto, ancho) {
    const palabras = texto.split(" "), lineas = [];
    let linea = "";
    palabras.forEach((p) => {
      const prueba = linea ? linea + " " + p : p;
      if (ctx.measureText(prueba).width > ancho && linea) { lineas.push(linea); linea = p; } else linea = prueba;
    });
    if (linea) lineas.push(linea);
    return lineas;
  }

  // Imagen de 1080 x 1920 para historias de Instagram
  async function generarHistoria() {
    try {
      if (document.fonts) await Promise.all([
        document.fonts.load('500 150px "Newsreader"'), document.fonts.load('italic 500 54px "Newsreader"'),
        document.fonts.load('500 40px "Schibsted Grotesk"')]);
    } catch (e) { /* se usan las fuentes de reserva */ }
    const r = estado.resultado, a = r.arquetipo;
    const W = 1080, H = 1920, M = 96;
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const c = cv.getContext("2d");
    const SERIF = '"Newsreader", Georgia, serif', SANS = '"Schibsted Grotesk", Arial, sans-serif';

    c.fillStyle = "#131B2E"; c.fillRect(0, 0, W, H);
    let g = c.createRadialGradient(900, 320, 0, 900, 320, 1100);
    g.addColorStop(0, "rgba(52,74,150,.85)"); g.addColorStop(1, "rgba(19,27,46,0)");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    g = c.createRadialGradient(120, 1750, 0, 120, 1750, 900);
    g.addColorStop(0, "rgba(85,39,106,.7)"); g.addColorStop(1, "rgba(19,27,46,0)");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    ["#B5532F", "#B04468", "#2F5D48", "#A9B6DA"].forEach((col, i) => { c.fillStyle = col; c.fillRect(i * W / 4, 0, W / 4, 16); });

    c.textBaseline = "alphabetic";
    c.fillStyle = "rgba(255,255,255,.9)"; c.font = `600 44px ${SERIF}`; c.fillText("Salidas científicas", M, 150);
    c.textAlign = "right"; c.fillStyle = "rgba(255,255,255,.75)"; c.font = `italic 500 40px ${SERIF}`; c.fillText(MARCA, W - M, 150); c.textAlign = "left";

    let y = 330;
    c.fillStyle = "rgba(255,255,255,.7)"; c.font = `500 42px ${SANS}`; c.fillText("Mi perfil profesional es", M, y);
    y += 24;
    c.fillStyle = "#ffffff"; c.font = `500 132px ${SERIF}`;
    envolver(c, a.nombre, W - 2 * M).forEach((l) => { y += 132; c.fillText(l, M, y); });
    const nombre = (id) => D.dimensiones.find((x) => x.id === id).nombre;
    const mezcla = a.clave === "EQ" ? "Equilibrio entre las cuatro dimensiones" : `${nombre(a.clave[0])} y ${nombre(a.clave[1]).toLowerCase()}`;
    y += 72; c.fillStyle = "#C9D1E3"; c.font = `italic 500 54px ${SERIF}`; c.fillText(mezcla, M, y);

    y += 100;
    L.DIMS.slice().sort((x, z) => r.perfil[z] - r.perfil[x]).forEach((id) => {
      const v = r.perfil[id];
      c.fillStyle = COLOR_CLARO[id]; c.font = `500 46px ${SERIF}`; c.fillText(nombre(id), M, y);
      c.textAlign = "right"; c.font = `500 52px ${SERIF}`; c.fillText(fmt(v), W - M, y); c.textAlign = "left";
      const by = y + 26, bw = W - 2 * M;
      c.fillStyle = "rgba(255,255,255,.12)"; redondeado(c, M, by, bw, 18, 9); c.fill();
      c.fillStyle = COLOR_CLARO[id]; redondeado(c, M, by, Math.max(bw * v / 10, 18), 18, 9); c.fill();
      y += 118;
    });

    y += 20;
    c.fillStyle = "rgba(255,255,255,.7)"; c.font = `500 38px ${SANS}`; c.fillText("Mis salidas con más afinidad", M, y);
    y += 8;
    r.top.slice(0, 3).forEach((sal, k) => {
      y += 64;
      c.font = `italic 500 58px ${SERIF}`; c.fillStyle = "#F0A6BB"; c.fillText(String(k + 1), M, y + 4);
      c.font = `500 46px ${SERIF}`; c.fillStyle = "#ffffff";
      const lineas = envolver(c, sal.nombre, W - 2 * M - 190).slice(0, 2);
      lineas.forEach((l, j) => c.fillText(l, M + 70, y + j * 54));
      c.textAlign = "right"; c.fillStyle = "rgba(255,255,255,.75)"; c.fillText(sal.total + "%", W - M, y); c.textAlign = "left";
      y += (lineas.length - 1) * 54 + 20;
    });

    c.fillStyle = "rgba(255,255,255,.7)"; c.font = `500 36px ${SANS}`; c.fillText("¿Y tú? Haz el test en", M, H - 150);
    c.fillStyle = "#ffffff"; c.font = `600 40px ${SANS}`;
    c.fillText(urlTest().replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/index\.html$/, ""), M, H - 92);
    c.textAlign = "right"; c.fillStyle = "rgba(255,255,255,.55)"; c.font = `italic 500 34px ${SERIF}`; c.fillText("© " + MARCA, W - M, H - 150); c.textAlign = "left";

    const blob = await new Promise((res) => cv.toBlob(res, "image/png"));
    return { blob, url: URL.createObjectURL(blob) };
  }
  function redondeado(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }

  async function compartir() {
    const texto = textoCompartir(), url = urlTest();
    const enc = encodeURIComponent;
    const hoja = document.createElement("div");
    hoja.className = "hoja-fondo";
    hoja.innerHTML = `
      <div class="hoja" role="dialog" aria-modal="true" aria-labelledby="hoja-titulo">
        <div class="hoja-cabecera"><h2 id="hoja-titulo">Comparte tu resultado</h2><button class="hoja-cerrar" data-hoja="cerrar" aria-label="Cerrar">×</button></div>
        <div class="hoja-vista"><div class="hoja-imagen cargando"></div></div>
        <button class="boton grande" data-hoja="historia">Subir a historias de Instagram</button>
        <div class="hoja-opciones">
          <a class="opcion-compartir" href="https://twitter.com/intent/tweet?text=${enc(texto)}&url=${enc(url)}" target="_blank" rel="noopener">X (Twitter)</a>
          <a class="opcion-compartir" href="https://wa.me/?text=${enc(texto + " " + url)}" target="_blank" rel="noopener">WhatsApp</a>
          <button class="opcion-compartir" data-hoja="mensaje">Mensaje de Instagram</button>
          <button class="opcion-compartir" data-hoja="copiar">Copiar enlace</button>
        </div>
      </div>`;
    document.body.appendChild(hoja);
    document.body.style.overflow = "hidden";
    const cerrar = () => { hoja.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", tecla); };
    const tecla = (e) => { if (e.key === "Escape") cerrar(); };
    document.addEventListener("keydown", tecla);
    hoja.querySelector(".hoja-cerrar").focus();

    if (!historia) historia = await generarHistoria();
    const vista = hoja.querySelector(".hoja-imagen");
    if (vista) { vista.classList.remove("cargando"); vista.innerHTML = `<img src="${historia.url}" alt="Imagen de tu resultado para historias">`; }

    hoja.addEventListener("click", async (ev) => {
      if (ev.target === hoja) return cerrar();
      const b = ev.target.closest("[data-hoja]");
      if (!b) return;
      const acc = b.dataset.hoja;
      if (acc === "cerrar") cerrar();
      else if (acc === "historia") {
        const archivo = new File([historia.blob], "mi-perfil-cientifico.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
          try { await navigator.share({ files: [archivo] }); } catch (e) { /* cancelado */ }
        } else {
          const a = document.createElement("a"); a.href = historia.url; a.download = "mi-perfil-cientifico.png";
          document.body.appendChild(a); a.click(); a.remove();
          toast("Imagen guardada. Súbela a tus historias desde Instagram");
        }
      }
      else if (acc === "mensaje") {
        if (navigator.share) { try { await navigator.share({ text: texto, url }); } catch (e) { /* cancelado */ } }
        else { await copiar(texto + " " + url); toast("Texto copiado. Pégalo en un mensaje de Instagram"); }
      }
      else if (acc === "copiar") { await copiar(url); toast("Enlace copiado"); }
    });
  }
  async function copiar(t) {
    try { await navigator.clipboard.writeText(t); }
    catch (e) { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (x) {} ta.remove(); }
  }

  function abrirPieza(b) {
    const pieza = b.parentElement;
    const det = pieza.querySelector(".pieza-detalle");
    const abierta = b.getAttribute("aria-expanded") === "true";
    if (abierta) { b.setAttribute("aria-expanded", "false"); det.hidden = true; return; }
    const p = estado.mapa[b.dataset.id];
    det.innerHTML = `<p>${p.descripcion}</p>${listaPuestos(p.puestos)}`;
    det.hidden = false;
    b.setAttribute("aria-expanded", "true");
  }

  app.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-accion]");
    if (!b) return;
    const acc = b.dataset.accion;
    if (acc === "empezar") irA(1);
    else if (acc === "atras") irA(estado.paso - 1);
    else if (acc === "siguiente") irA(estado.paso + 1);
    else if (acc === "carrera") { estado.carrera = b.dataset.id; responderYAvanzar(b); }
    else if (acc === "acuerdo") { estado.acuerdo[PASOS[estado.paso].i] = +b.dataset.valor; responderYAvanzar(b); }
    else if (acc === "situacion") { estado.situaciones[PASOS[estado.paso].i] = +b.dataset.idx; responderYAvanzar(b); }
    else if (acc === "ficha") {
      const c = b.parentElement, abierta = c.dataset.abierta === "true";
      c.dataset.abierta = String(!abierta); b.setAttribute("aria-expanded", String(!abierta));
    }
    else if (acc === "pieza") abrirPieza(b);
    else if (acc === "compartir") compartir();
    else if (acc === "reiniciar") { estado = estadoInicial(); historia = null; render(); }
    else if (acc === "aviso") {
      const t = document.getElementById(b.getAttribute("aria-controls"));
      const abierto = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", String(!abierto)); t.hidden = abierto;
    }
  });

  estado = estadoInicial();
  render(false);
})();
