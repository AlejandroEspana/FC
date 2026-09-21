export const VECTORS_CONTENT = {
  courseTitle: "Álgebra Lineal & Física Clásica",
  courseSubtitle: "Curso Fundamental Completo de Vectores",

  cap00_intro: {
    title: "Fundamentos y Naturaleza de los Vectores",
    subtitle: "Motivación, Aplicaciones e Intuición Física",
    whatIsAVector: {
      title: "¿Por qué el mundo real no cabe en un solo número?",
      paragraphs: [
        "En la física y la ingeniería, un simple número real (escalar) como la temperatura o la masa es insuficiente para describir fenómenos con orientación.",
        "Si te dicen que una ráfaga de viento viaja a 60 km/h, esa información está incompleta: ¿hacia dónde empuja la estructura? Los vectores son la herramienta matemática universal para representar magnitud, dirección y sentido simultáneamente.",
      ],
    },
    applications: [
      {
        title: "Mecánica Clásica & Dinámica",
        description: "Fuerzas coplanares, aceleración centrípeta, cantidad de movimiento y campos gravitacionales.",
        badge: "Física",
        badgeColor: "#38BDF8",
      },
      {
        title: "Computación Gráfica & Videojuegos 3D",
        description: "Vértices poligonales, vectores normales para sombreado (shaders), trazado de rayos (raytracing) y física de colisiones.",
        badge: "CGI & Motores",
        badgeColor: "#FACC15",
      },
      {
        title: "Machine Learning & Big Data",
        description: "Embeddings de lenguaje, espacios latentes de alta dimensión y optimización de gradiente descendente.",
        badge: "Inteligencia Artificial",
        badgeColor: "#34D399",
      },
    ],
  },

  cap01_scalars_vs_vectors: {
    title: "Escalares vs Vectores",
    subtitle: "Diferenciación Conceptual Rigurosa",
    scalarDef: {
      title: "Definición Formal de Magnitud Escalar",
      category: "Axioma Fundamental",
      text: "Un escalar es una cantidad física o matemática que queda unívocamente determinada por un único número real (positivo, cero o negativo) acompañado de su correspondiente unidad de medida dimensional. No posee orientación espacial.",
      formula: "T = 36.5\\,^{\\circ}\\mathrm{C}, \\quad m = 70\\,\\mathrm{kg}, \\quad t = 4.2\\,\\mathrm{s}",
    },
    vectorDef: {
      title: "Definición Formal de Vector Euclidiano",
      category: "Espacio Vectorial",
      text: "Un vector en el espacio euclídeo R^n es un elemento que requiere tres propiedades indispensables para su completa definición: 1) Magnitud (módulo o norma no-negativa), 2) Dirección (inclinación de la línea directriz en el espacio), y 3) Sentido (hacia cuál de los dos extremos de la recta apunta la flecha).",
      formula: "\\vec{v} \\in \\mathbb{R}^n, \\quad |\\vec{v}| \\ge 0",
    },
    errorCase: {
      wrong: "La rapidez (speed) y la velocidad (velocity) son sinónimos idénticos.",
      correct: "La rapidez es una magnitud escalar (ej. 80 km/h). La velocidad es un vector que exige dirección y sentido (ej. 80 km/h rumbo 45° Noreste).",
      why: "En el habla cotidiana se usan indistintamente, pero en cálculo diferencial la velocidad es la derivada temporal del vector posición: v(t) = dr/dt, mientras que la rapidez es únicamente su norma |v(t)|.",
    },
  },

  cap02_vector_concept: {
    title: "El Concepto de Vector y su Notación",
    subtitle: "Vector Libre, Vector Aplicado y Representaciones",
    freeVsApplied: [
      {
        title: "Vector Libre (Equipolente)",
        description: "Dos vectores son equipolentes si tienen idéntica longitud, dirección paralela y mismo sentido, sin importar dónde estén ubicados. El vector libre representa a toda la familia de vectores trasladados.",
        badge: "Álgebra Lineal",
        badgeColor: "#38BDF8",
      },
      {
        title: "Vector Aplicado o de Posición",
        description: "Tiene un punto de origen fijo o punto de aplicación (habitualmente el origen O=(0,0) en sistemas de coordenadas o el centro de masa en dinámica).",
        badge: "Estática & Cinemática",
        badgeColor: "#FACC15",
      },
    ],
    notationDecomposition: {
      formula: "\\vec{v} = (v_x,\\, v_y) = \\begin{bmatrix} v_x \\\\ v_y \\end{bmatrix}",
      title: "Notación Analítica de Vectores en R²",
      subtitle: "Correspondencia biunívoca entre puntos y vectores de posición",
      components: [
        {
          symbol: "\\vec{v}",
          name: "Símbolo Vectorial",
          color: "#38BDF8",
          description: "Flecha superior para denotar que el objeto posee orientación geométrica y no es un simple número.",
        },
        {
          symbol: "v_x",
          name: "Componente en el Eje X",
          color: "#FACC15",
          description: "Magnitud con signo de la sombra o proyección ortogonal sobre la recta horizontal de abscisas.",
        },
        {
          symbol: "v_y",
          name: "Componente en el Eje Y",
          color: "#34D399",
          description: "Magnitud con signo de la sombra o proyección ortogonal sobre la recta vertical de ordenadas.",
        },
      ],
    },
  },

  cap03_components_magnitude: {
    title: "Componentes y Magnitud Vectorial",
    subtitle: "Descomposición Ortogonal y Teorema de Pitágoras",
    decompositionFormula: {
      formula: "\\vec{v} = v_x \\hat{i} + v_y \\hat{j}",
      title: "Descomposición Canónica en la Base Estándar",
      subtitle: "Combinación lineal única en términos de versores ortonormales",
      components: [
        {
          symbol: "\\vec{v}",
          name: "Vector Resultante",
          color: "#38BDF8",
          description: "La diagonal que conecta el origen con el punto extremo final (x, y).",
        },
        {
          symbol: "v_x",
          name: "Coeficiente de Proyección X",
          color: "#FACC15",
          description: "Escalar multiplicador que estira o contrae el versor canónico horizontal.",
        },
        {
          symbol: "\\hat{i}",
          name: "Versor Unitario Horizontal (1, 0)",
          color: "#FB923C",
          description: "Vector base de longitud exactamente 1 orientado sobre el eje positivo de las X.",
        },
        {
          symbol: "v_y",
          name: "Coeficiente de Proyección Y",
          color: "#34D399",
          description: "Escalar multiplicador que modula el versor canónico vertical.",
        },
        {
          symbol: "\\hat{j}",
          name: "Versor Unitario Vertical (0, 1)",
          color: "#F472B6",
          description: "Vector base de longitud exactamente 1 orientado sobre el eje positivo de las Y.",
        },
      ],
    },
    magnitudeFormula: {
      formula: "|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}",
      title: "Norma Euclidiana o Magnitud",
      subtitle: "Aplicación directa del Teorema de Pitágoras al triángulo rectángulo de componentes",
      components: [
        {
          symbol: "|\\vec{v}|",
          name: "Módulo o Longitud",
          color: "#34D399",
          description: "Longitud escalar absoluta de la flecha; siempre es un número real mayor o igual a cero.",
        },
        {
          symbol: "v_x^2",
          name: "Cuadrado del Cateto Adyacente",
          color: "#FACC15",
          description: "El cuadrado de la proyección X garantiza que componentes negativas sumen un valor positivo.",
        },
        {
          symbol: "v_y^2",
          name: "Cuadrado del Cateto Opuesto",
          color: "#38BDF8",
          description: "Aporte vertical al cuadrado de la hipotenusa en el plano euclídeo.",
        },
      ],
    },
  },

  cap04_direction_unit: {
    title: "Dirección y Vector Unitario (Normalización)",
    subtitle: "Ángulo Polar, Cuadrantes y Versores",
    directionFormula: {
      formula: "\\theta = \\arctan\\left(\\frac{v_y}{v_x}\\right) + \\Delta\\theta",
      title: "Ángulo de Dirección en Coordenadas Polares",
      subtitle: "Medido en sentido antihorario a partir del semieje positivo de las X",
      components: [
        {
          symbol: "\\theta",
          name: "Ángulo de Inclinación",
          color: "#38BDF8",
          description: "Define unívocamente la dirección de la recta en la que reposa el vector.",
        },
        {
          symbol: "v_y / v_x",
          name: "Pendiente de la Recta (m)",
          color: "#FACC15",
          description: "Razón trigonométrica tangente entre el cateto opuesto y el cateto adyacente.",
        },
        {
          symbol: "\\Delta\\theta",
          name: "Corrección por Cuadrante (atan2)",
          color: "#F472B6",
          description: "Si vx < 0, debe sumarse 180° (pi rad) para ubicar el vector en el cuadrante real.",
        },
      ],
    },
    unitFormula: {
      formula: "\\hat{u} = \\frac{\\vec{v}}{|\\vec{v}|} = \\left(\\frac{v_x}{|\\vec{v}|},\\; \\frac{v_y}{|\\vec{v}|}\\right)",
      title: "Normalización de un Vector (Vector Unitario)",
      subtitle: "Extracción pura de la dirección con módulo idéntico a 1",
      components: [
        {
          symbol: "\\hat{u}",
          name: "Versor o Vector Unitario",
          color: "#34D399",
          description: "Vector adimensional cuya norma euclidiana satisface estrictamente |u| = 1.",
        },
        {
          symbol: "1 / |\\vec{v}|",
          name: "Factor Escalar de Normalización",
          color: "#FB923C",
          description: "Escala inversamente el vector por su propia longitud para contraerlo al círculo unitario.",
        },
      ],
    },
  },

  cap05_operations: {
    title: "Operaciones Vectoriales: Suma, Resta y Escalamiento",
    subtitle: "Rigor Geométrico y Propiedades de Espacio Vectorial",
    sumFormula: {
      formula: "\\vec{w} = \\vec{u} + \\vec{v} = (u_x + v_x)\\hat{i} + (u_y + v_y)\\hat{j}",
      title: "Suma Vectorial: Método Punta-Cola y Suma de Componentes",
      subtitle: "Geométricamente concatena trayectorias; algebraicamente suma coordenadas homólogas",
      components: [
        {
          symbol: "\\vec{w}",
          name: "Vector Resultante Total",
          color: "#34D399",
          description: "Desplazamiento neto directo desde el origen del primer vector hasta la punta del último.",
        },
        {
          symbol: "u_x + v_x",
          name: "Superposición Horizontal",
          color: "#FACC15",
          description: "La suma escalar de los avances en X determina la coordenada X neta.",
        },
        {
          symbol: "u_y + v_y",
          name: "Superposición Vertical",
          color: "#38BDF8",
          description: "La suma escalar de las alturas en Y determina la cota Y final.",
        },
      ],
    },
    subFormula: {
      formula: "\\vec{d} = \\vec{u} - \\vec{v} = \\vec{u} + (-\\vec{v})",
      title: "Resta Vectorial: Desplazamiento Relativo",
      subtitle: "Equivale a sumar el vector opuesto o trazar la flecha desde la punta de v hasta la punta de u",
      components: [
        {
          symbol: "\\vec{d}",
          name: "Vector Diferencia o Distancia Relativa",
          color: "#F43F5E",
          description: "Indica el cambio necesario para viajar desde la posición de v hasta la posición de u.",
        },
        {
          symbol: "-\\vec{v}",
          name: "Vector Opuesto Simétrico",
          color: "#FB923C",
          description: "Misma magnitud y dirección paralela, pero con sentido invertido exactamente 180°.",
        },
      ],
    },
    scalarFormula: {
      formula: "c\\vec{v} = (c \\cdot v_x)\\hat{i} + (c \\cdot v_y)\\hat{j}",
      title: "Multiplicación por Escalar (Homotecia)",
      subtitle: "Modifica la magnitud por el factor |c| e invierte el sentido si c < 0",
      components: [
        {
          symbol: "c",
          name: "Factor Escalar Real",
          color: "#A78BFA",
          description: "Escalar continuo: |c| > 1 dilata, 0 < |c| < 1 contrae, c < 0 voltea 180°.",
        },
        {
          symbol: "c\\vec{v}",
          name: "Vector Colineal Escalado",
          color: "#34D399",
          description: "Permanece estrictamente sobre la misma recta directriz que el vector original.",
        },
      ],
    },
    properties: [
      {
        title: "Conmutatividad de la Suma",
        description: "\\vec{u} + \\vec{v} = \\vec{v} + \\vec{u}. El orden en que se aplican los desplazamientos no altera la posición final.",
        badge: "Propiedad 1",
        badgeColor: "#38BDF8",
      },
      {
        title: "Asociatividad de la Suma",
        description: "(\\vec{u} + \\vec{v}) + \\vec{w} = \\vec{u} + (\\vec{v} + \\vec{w}). Permite sumar N vectores simultáneamente.",
        badge: "Propiedad 2",
        badgeColor: "#34D399",
      },
      {
        title: "Distributividad Escalar",
        description: "c(\\vec{u} + \\vec{v}) = c\\vec{u} + c\\vec{v}. Escalar la suma equivale a sumar los vectores escalados.",
        badge: "Propiedad 3",
        badgeColor: "#FACC15",
      },
    ],
    errorCase: {
      wrong: "Para restar dos vectores simplemente se restan sus módulos: |u - v| = |u| - |v|.",
      correct: "FALSO. El módulo de la resta depende del ángulo: |u - v| = sqrt(|u|² + |v|² - 2|u||v|cosθ) (Ley del Coseno).",
      why: "Restar vectores es una operación puramente direccional en el plano, nunca una resta escalar ordinaria salvo que sean estrictamente colineales en el mismo sentido.",
    },
  },

  cap06_dot_product: {
    title: "El Producto Punto (Producto Escalar)",
    subtitle: "Geometría, Proyecciones y Criterio de Ortogonalidad",
    dotGeomFormula: {
      formula: "\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\,|\\vec{v}| \\cos(\\theta)",
      title: "Definición Geométrica del Producto Punto",
      subtitle: "Medida del solapamiento o alineación mutua entre dos direcciones",
      components: [
        {
          symbol: "\\vec{u} \\cdot \\vec{v}",
          name: "Producto Punto (Escalar)",
          color: "#34D399",
          description: "Produce un único número real (escalar con signo), JAMÁS produce un vector.",
        },
        {
          symbol: "|\\vec{u}| |\\vec{v}|",
          name: "Producto de Magnitudes",
          color: "#38BDF8",
          description: "Magnitudes intrínsecas de ambos vectores.",
        },
        {
          symbol: "\\cos(\\theta)",
          name: "Coseno del Ángulo Intermedio",
          color: "#FACC15",
          description: "Determina el signo: positivo para ángulos agudos, negativo para obtusos, cero a 90°.",
        },
      ],
    },
    dotAlgFormula: {
      formula: "\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y + u_z v_z",
      title: "Formulación Algebraica Cartesiana",
      subtitle: "Cálculo computacional sin necesidad de medir explícitamente el ángulo",
      components: [
        {
          symbol: "u_x v_x",
          name: "Aporte en X",
          color: "#FACC15",
          description: "Producto directo de las coordenadas horizontales.",
        },
        {
          symbol: "u_y v_y",
          name: "Aporte en Y",
          color: "#38BDF8",
          description: "Producto directo de las componentes verticales.",
        },
        {
          symbol: "u_z v_z",
          name: "Aporte en Z",
          color: "#A78BFA",
          description: "Extensión directa a dimensión 3 y dimensiones superiores Rn.",
        },
      ],
    },
    orthogonality: {
      title: "Criterio Fundamental de Ortogonalidad",
      text: "Dos vectores no nulos son perpendiculares (ortogonales a 90°) si y sólo si su producto punto es exactamente CERO: u · v = 0.",
      formula: "\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0",
    },
    errorCase: {
      wrong: "El producto punto u · v da como resultado otro vector perpendicular.",
      correct: "FALSO. El producto punto produce un ESCALAR (número). El producto que genera un vector es el producto cruz (u × v).",
      why: "La palabra 'escalar' proviene de escala o número. El producto punto proyecta un vector sobre otro, colapsando la orientación espacial en una única magnitud algebraica.",
    },
  },

  cap07_cross_product: {
    title: "El Producto Cruz (Vectorial en R³)",
    subtitle: "Ortogonalidad Espacial, Regla de la Mano Derecha y Momento de Torsión",
    crossFormula: {
      formula: "\\vec{w} = \\vec{a} \\times \\vec{b} = \\det \\begin{bmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_x & a_y & a_z \\\\ b_x & b_y & b_z \\end{bmatrix}",
      title: "Determinante Formal del Producto Vectorial",
      subtitle: "Definido exclusivamente en dimensión 3; genera un vector perpendicular al plano ab",
      components: [
        {
          symbol: "\\vec{w}",
          name: "Vector Perpendicular Resultante",
          color: "#34D399",
          description: "Ortogonal simultáneamente a a y b: w · a = 0 y w · b = 0.",
        },
        {
          symbol: "|\\vec{a} \\times \\vec{b}|",
          name: "Área del Paralelogramo",
          color: "#38BDF8",
          description: "La longitud del vector resultante equivale numéricamente al área delimitada por a y b.",
        },
        {
          symbol: "\\text{Regla Mano D.}",
          name: "Orientación Espacial",
          color: "#FACC15",
          description: "Dedos de a hacia b por el camino más corto, el pulgar marca el sentido de w.",
        },
      ],
    },
    crossExpansion: {
      formula: "\\vec{a} \\times \\vec{b} = (a_y b_z - a_z b_y)\\hat{i} - (a_x b_z - a_z b_x)\\hat{j} + (a_x b_y - a_y b_x)\\hat{k}",
      title: "Desarrollo por Menores de Laplace",
      subtitle: "Cálculo analítico elemento a elemento para computación 3D y simuladores",
      components: [
        {
          symbol: "\\hat{i}(a_y b_z - a_z b_y)",
          name: "Componente X",
          color: "#FB923C",
          description: "Menor complementario suprimiendo fila 1 y columna 1.",
        },
        {
          symbol: "\\hat{j}(a_z b_x - a_x b_z)",
          name: "Componente Y",
          color: "#34D399",
          description: "Menor con signo negativo alternado suprimiendo columna 2.",
        },
        {
          symbol: "\\hat{k}(a_x b_y - a_y b_x)",
          name: "Componente Z",
          color: "#A78BFA",
          description: "Menor complementario suprimiendo columna 3.",
        },
      ],
    },
    errorCase: {
      wrong: "El producto cruz es conmutativo: a × b = b × a.",
      correct: "FALSO. El producto vectorial es estrictamente ANTICONMUTATIVO: a × b = -(b × a).",
      why: "Invertir el orden de los factores invierte la rotación en la regla de la mano derecha, apuntando el vector resultante en sentido opuesto de 180°.",
    },
  },

  cap08_summary_exercises: {
    title: "Resumen Maestro & Ejercicios de Dominio",
    subtitle: "Consolidación de Competencias y Resolución Paso a Paso",
    summaryBullets: [
      {
        title: "Naturaleza y Representación",
        description: "Los vectores poseen magnitud, dirección y sentido. Se descomponen canónicamente como v = vx·i + vy·j.",
        badge: "Fundamento",
        badgeColor: "#38BDF8",
      },
      {
        title: "Álgebra Lineal Básica",
        description: "La suma y resta se efectúan componente a componente. El escalamiento dilata o invierte colinealmente.",
        badge: "Operaciones",
        badgeColor: "#34D399",
      },
      {
        title: "Producto Punto vs Cruz",
        description: "Punto: Escalar u·v = |u||v|cosθ (ortogonalidad a 0). Cruz: Vector a×b = |a||b|sinθ·n (área y normal 3D).",
        badge: "Productos",
        badgeColor: "#FACC15",
      },
    ],
    exercise1: {
      level: "Nivel Básico: Magnitud y Ángulo Polar",
      prompt: "Dado el vector \\vec{v} = (3, 4), determinar su norma euclidiana |\\vec{v}| y su ángulo de inclinación \\theta.",
      steps: [
        { label: "Norma", math: "|\\vec{v}| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5" },
        { label: "Ángulo", math: "\\theta = \\arctan(4/3) \\approx 53.13^{\\circ}" },
        { label: "Unitario", math: "\\hat{u} = (3/5, 4/5) = (0.6, 0.8), \\quad |\\hat{u}|=1" },
      ],
    },
    exercise2: {
      level: "Nivel Intermedio: Suma y Verificación de Ortogonalidad",
      prompt: "Sean \\vec{u} = (2, 5) y \\vec{v} = (4, -1). Hallar \\vec{w} = \\vec{u} + \\vec{v} y verificar si son perpendiculares mediante producto escalar.",
      steps: [
        { label: "Suma", math: "\\vec{w} = (2+4, 5+(-1)) = (6, 4)" },
        { label: "Producto Escalar", math: "\\vec{u} \\cdot \\vec{v} = (2)(4) + (5)(-1) = 8 - 5 = 3" },
        { label: "Conclusión", math: "\\vec{u} \\cdot \\vec{v} = 3 \\neq 0 \\implies \\text{NO son ortogonales}" },
      ],
    },
    exercise3: {
      level: "Nivel Avanzado: Producto Vectorial en R³",
      prompt: "Calcular el vector ortogonal \\vec{c} = \\vec{a} \\times \\vec{b} para \\vec{a} = (1, 2, 0) y \\vec{b} = (0, 3, 1).",
      steps: [
        { label: "Determinante", math: "\\vec{a} \\times \\vec{b} = \\det \\begin{bmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & 0 \\\\ 0 & 3 & 1 \\end{bmatrix}" },
        { label: "Componentes", math: "\\hat{i}(2-0) - \\hat{j}(1-0) + \\hat{k}(3-0) = 2\\hat{i} - \\hat{j} + 3\\hat{k}" },
        { label: "Resultado", math: "\\vec{c} = (2, -1, 3), \\quad |\\vec{c}| = \\sqrt{4+1+9} = \\sqrt{14} \\approx 3.74" },
      ],
    },
  },
};

