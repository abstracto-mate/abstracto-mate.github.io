/*
  Mapa del sitio: la única fuente de la navegación.
  Para mostrar una página en los menús, cambia publicado a true cuando su carpeta ya exista.
  Las rutas son relativas a la raíz del sitio y terminan en "/" (cada carpeta tiene su index.html).
*/
window.MAPA = [
  {
    id: 'gauss', titulo: 'Gauss',
    items: [
      { t: 'Nivel 6', url: 'gauss/nivel-6/', publicado: false },
      { t: 'Nivel 7', url: 'gauss/nivel-7/', publicado: false },
      { t: 'Nivel 8', url: 'gauss/nivel-8/', publicado: false }
    ]
  },
  {
    id: 'olimpiada', titulo: 'Olimpiada',
    items: [
      { t: 'Álgebra', url: 'olimpiada/algebra/', publicado: false },
      { t: 'Combinatoria', url: 'olimpiada/combinatoria/', publicado: false },
      { t: 'Geometría', url: 'olimpiada/geometria/', publicado: false },
      { t: 'Teoría de números', url: 'olimpiada/teoria-de-numeros/', publicado: false }
    ]
  },
  {
    id: 'temas', titulo: 'Por temas',
    items: [
      { t: 'Geometría analítica', url: 'temas/geometria-analitica/', publicado: false }
    ]
  }
];
