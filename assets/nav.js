/*
  Barra de navegación compartida por todas las páginas.
  Cada página la carga así (data-raiz = camino de vuelta a la raíz: "" en la raíz, "../../" dos carpetas abajo):
    <header id="sitio-nav" class="sitio-nav"></header>
    <script src="RAIZ/assets/mapa.js"></script>
    <script src="RAIZ/assets/nav.js" data-raiz="RAIZ/"></script>
  Vista previa (muestra lo no publicado): agrega #vista-previa a la dirección. Se mantiene durante la sesión del navegador.
*/
(function () {
  'use strict';
  var script = document.currentScript;
  var raiz = (script && script.dataset.raiz) || '';
  var host = document.getElementById('sitio-nav');
  if (!host) return;

  var vp = location.hash === '#vista-previa';
  try {
    if (vp) sessionStorage.setItem('am-vista-previa', '1');
    vp = vp || sessionStorage.getItem('am-vista-previa') === '1';
  } catch (e) { /* sin almacenamiento: solo cuenta el hash */ }

  var actual = location.pathname.replace(/index\.html$/, '');
  var grupos = (window.MAPA || []).map(function (g) {
    return { id: g.id, titulo: g.titulo, items: g.items.filter(function (i) { return i.publicado || vp; }) };
  }).filter(function (g) { return g.items.length; });

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var flecha = '<svg class="flecha" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var menu = grupos.map(function (g) {
    var links = g.items.map(function (i) {
      var href = raiz + i.url, cur = actual.slice(-i.url.length) === i.url;
      return '<li><a href="' + esc(href) + '"' + (cur ? ' aria-current="page"' : '') + (i.publicado ? '' : ' class="no-publicado"') + '>' + esc(i.t) + '</a></li>';
    }).join('');
    return '<li class="grupo"><button type="button" class="grupo-btn" aria-expanded="false" aria-controls="sub-' + g.id + '">' + esc(g.titulo) + flecha + '</button>' +
      '<ul class="sub" id="sub-' + g.id + '">' + links + '</ul></li>';
  }).join('');

  host.innerHTML =
    '<div class="nav-in">' +
      '<a class="marca" href="' + esc(raiz || './') + '">abstracto<span aria-hidden="true">·</span><span class="sr">-</span>mate</a>' +
      (grupos.length ? '<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="nav-menu"><span class="hamb" aria-hidden="true"></span>Menú</button>' +
        '<ul class="nav-menu" id="nav-menu">' + menu + '</ul>' : '') +
    '</div>' +
    (vp ? '<p class="vista-previa">Vista previa: se muestran páginas no publicadas</p>' : '');

  var toggle = host.querySelector('.nav-toggle');
  var panel = host.querySelector('.nav-menu');
  var btns = Array.prototype.slice.call(host.querySelectorAll('.grupo-btn'));
  var movil = window.matchMedia('(max-width: 759px)');

  function cerrarGrupos(excepto) { btns.forEach(function (b) { if (b !== excepto) b.setAttribute('aria-expanded', 'false'); }); }
  function cerrarTodo() { cerrarGrupos(); if (toggle) { toggle.setAttribute('aria-expanded', 'false'); panel.classList.remove('abierto'); } }

  if (toggle) toggle.addEventListener('click', function () {
    var abrir = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(abrir));
    panel.classList.toggle('abierto', abrir);
    if (!abrir) cerrarGrupos();
  });
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var abrir = b.getAttribute('aria-expanded') !== 'true';
      cerrarGrupos(b);
      b.setAttribute('aria-expanded', String(abrir));
    });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' && !movil.matches) { e.preventDefault(); b.setAttribute('aria-expanded', 'true'); cerrarGrupos(b); var p = b.nextElementSibling.querySelector('a'); if (p) p.focus(); }
    });
  });
  host.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var abierto = btns.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (abierto) { abierto.setAttribute('aria-expanded', 'false'); abierto.focus(); }
    else if (toggle && toggle.getAttribute('aria-expanded') === 'true') { cerrarTodo(); toggle.focus(); }
  });
  document.addEventListener('click', function (e) { if (!host.contains(e.target)) cerrarTodo(); });
  host.addEventListener('focusout', function (e) { if (!movil.matches && e.relatedTarget && !host.contains(e.relatedTarget)) cerrarGrupos(); });
  var alCambiar = function () { cerrarTodo(); };
  if (movil.addEventListener) movil.addEventListener('change', alCambiar); else if (movil.addListener) movil.addListener(alCambiar);
})();
