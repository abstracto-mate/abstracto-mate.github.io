/*
  Contenido de la navegación del sitio. Es la única fuente: las páginas se arman a partir de aquí.
  - publicado: false oculta la sección hasta que exista su página.
  - Un subtema puede volverse enlace agregando url, por ejemplo { t: 'La recta y su ecuación cartesiana', url: 'temas/geometria-analitica/recta/' }.
  Temas de Gauss tomados del temario estatal GAU55 2025.
*/
window.SITIO = {
  secciones: [
    { id: 'gauss', t: 'Gauss', url: 'gauss/', publicado: true },
    { id: 'olimpiada', t: 'Olimpiada', url: 'olimpiada/', publicado: false },
    { id: 'temas', t: 'Por temas', url: 'temas/', publicado: false }
  ],
  gauss: [
    {
      id: 'nivel-6', t: 'Nivel 6', grado: 'Primer semestre de bachillerato',
      temas: [
        { t: 'Aritmética', sub: ['Porcentajes', 'Proporcionalidad directa e inversa', 'Reparto proporcional', 'Razones'] },
        { t: 'Álgebra y geometría elemental', sub: ['Álgebra de secundaria', 'Geometría elemental de secundaria'] },
        { t: 'Conteo y probabilidad', sub: ['Espacio muestral', 'Diagrama de árbol', 'Principio fundamental de conteo', 'Permutaciones', 'Combinaciones', 'Probabilidad clásica'] },
        { t: 'Estadística', sub: ['Población y muestra', 'Tipos de muestreo', 'Tipos de variables', 'Tabla de distribución de frecuencias para datos no agrupados', 'Gráficas para representar información', 'Histograma y polígono de frecuencias'] }
      ]
    },
    {
      id: 'nivel-7', t: 'Nivel 7', grado: 'Tercer semestre de bachillerato', incluye: 'nivel-6',
      temas: [
        { t: 'Aritmética y números', sub: ['Clasificación de los números', 'Operaciones con números enteros', 'Operaciones con fracciones', 'Potencias y radicales', 'Notación científica y desarrollada', 'Teorema fundamental de la aritmética: primos, máximo común divisor y mínimo común múltiplo', 'Razón y propiedad fundamental de las proporciones', 'Proporcionalidad directa e inversa', 'Porcentajes', 'Interés simple y compuesto'] },
        { t: 'Álgebra', sub: ['Lenguaje algebraico', 'Ecuación de primer grado con una incógnita', 'Sistemas de ecuaciones'] },
        { t: 'Geometría', sub: ['Área de una superficie', 'Teorema de Pitágoras', 'Congruencia y semejanza de triángulos'] },
        { t: 'Geometría analítica', sub: ['Distancia entre dos puntos', 'Punto medio de un segmento'] },
        { t: 'Funciones y cálculo', sub: ['Función lineal', 'Función cuadrática', 'Funciones de variable real y sus operaciones', 'Gráficas: simetrías, crecimiento y decrecimiento, máximos y mínimos relativos, concavidad', 'Límites', 'Continuidad de una función', 'Definición de derivada', 'Derivada de funciones polinomiales'] }
      ]
    },
    {
      id: 'nivel-8', t: 'Nivel 8', grado: 'Quinto semestre de bachillerato',
      temas: [
        { t: 'Álgebra', sub: ['El significado de los números y sus operaciones básicas', 'Potencias y radicales', 'Variación directamente proporcional y funciones lineales', 'Operaciones básicas entre polinomios', 'Productos notables', 'Factorización', 'Ecuaciones de primer grado', 'Sistemas de ecuaciones', 'Ecuaciones cuadráticas', 'Funciones cuadráticas y aplicaciones'] },
        { t: 'Geometría y trigonometría', sub: ['Geometría plana: ángulos, triángulos, polígonos, círculo y circunferencia', 'Congruencia y semejanza de triángulos', 'Teorema de Pitágoras', 'Elementos de trigonometría'] },
        { t: 'Geometría analítica', sub: ['Distancia entre puntos, áreas y perímetros', 'La recta y su ecuación cartesiana', 'La circunferencia', 'La parábola'] },
        { t: 'Cálculo diferencial', sub: ['Funciones polinomiales, racionales y con radicales', 'Funciones exponenciales y logarítmicas', 'Funciones trigonométricas', 'Límites y continuidad', 'Derivadas de funciones algebraicas, logarítmicas, exponenciales y trigonométricas', 'Reglas de la suma, el producto, el cociente y la cadena'] }
      ]
    }
  ]
};
