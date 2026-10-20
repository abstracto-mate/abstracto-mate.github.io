/*
  Arma la barra superior y el contenido de cada página a partir de assets/datos.js.
  Cada página declara en <body>:
    data-raiz   camino de vuelta a la raíz ("" en la raíz, "../" una carpeta abajo, "../../" dos)
    data-pagina inicio | gauss | nivel
    data-nivel  id del nivel (solo en páginas de nivel)
*/
(function () {
  'use strict';
  var b = document.body, raiz = b.dataset.raiz || '', pagina = b.dataset.pagina, S = window.SITIO;
  var nav = document.getElementById('sitio-nav'), main = document.getElementById('contenido');
  if (!S || !nav || !main) return;

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var a = function (url) { return esc(raiz + url); };
  var flecha = '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var nivel = pagina === 'nivel' ? S.gauss.filter(function (n) { return n.id === b.dataset.nivel; })[0] : null;

  /* barra superior: marca y ruta de regreso */
  var ruta = [];
  if (pagina !== 'inicio') ruta.push({ t: 'Inicio', url: './' });
  if (pagina === 'gauss') ruta.push({ t: 'Gauss' });
  if (nivel) { ruta.push({ t: 'Gauss', url: 'gauss/' }); ruta.push({ t: nivel.t }); }
  nav.innerHTML = '<div class="nav-in"><a class="marca" href="' + a('./') + '">abstracto<span aria-hidden="true">·</span><span class="sr">-</span>mate</a>' +
    (ruta.length ? '<nav aria-label="Ruta"><ol class="ruta">' + ruta.map(function (r) {
      return '<li>' + (r.url ? '<a href="' + a(r.url) + '">' + esc(r.t) + '</a>' : '<span aria-current="page">' + esc(r.t) + '</span>') + '</li>';
    }).join('') + '</ol></nav>' : '') + '</div>';

  /* contenido */
  var tarjeta = function (url, titulo, detalle, clase) {
    return '<li><a class="tarjeta ' + (clase || '') + '" href="' + a(url) + '"><span class="t-tit">' + esc(titulo) + '</span>' +
      (detalle ? '<span class="t-det">' + esc(detalle) + '</span>' : '') + flecha + '</a></li>';
  };

  if (pagina === 'inicio') {
    var secs = S.secciones.filter(function (s) { return s.publicado; });
    main.innerHTML = '<h1 class="sr">abstracto-mate</h1><ul class="rejilla secciones">' + secs.map(function (s) { return tarjeta(s.url, s.t, '', 'grande'); }).join('') + '</ul>';
  }

  if (pagina === 'gauss') {
    main.innerHTML = '<h1>Gauss</h1><ul class="rejilla">' + S.gauss.map(function (n) { return tarjeta('gauss/' + n.id + '/', n.t, n.grado, 'grande'); }).join('') + '</ul>';
  }

  if (nivel) {
    var prev = nivel.incluye ? S.gauss.filter(function (n) { return n.id === nivel.incluye; })[0] : null;
    var temas = nivel.temas.map(function (tm, i) {
      var subs = tm.sub.map(function (s) {
        var o = typeof s === 'string' ? { t: s } : s;
        return '<li>' + (o.url ? '<a href="' + a(o.url) + '">' + esc(o.t) + '</a>' : esc(o.t)) + '</li>';
      }).join('');
      return '<li><details class="tema" id="tema-' + (i + 1) + '"><summary><span class="t-tit">' + esc(tm.t) + '</span><span class="t-det">' + tm.sub.length + (tm.sub.length === 1 ? ' subtema' : ' subtemas') + '</span>' +
        '<svg class="ico gira" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>' +
        '<ul class="subtemas">' + subs + '</ul></details></li>';
    }).join('');
    main.innerHTML = '<h1>' + esc(nivel.t) + '</h1><p class="grado">' + esc(nivel.grado) + '</p><ul class="rejilla temas">' + temas + '</ul>' +
      (prev ? '<p class="incluye-tit">También entra</p><ul class="rejilla">' + tarjeta('gauss/' + prev.id + '/', prev.t, 'Todos sus temas', '') + '</ul>' : '');
  }
})();
