# Remotion Educational Video Engine (React + TypeScript + KaTeX + Three.js)

Un motor moderno, modular, determinista y escalable para la producción automatizada de cursos audiovisuales universitarios de matemáticas, física y computación científica.

---

## 1. Principios de Diseño y Arquitectura

Este motor reemplaza completamente el enfoque monolítico de scripts tradicionales por una arquitectura desacoplada basada en el ecosistema React y Remotion:

```
remotion-video-engine/
├── src/
│   ├── math/                  # Capa Matemática Pura (Cero dependencias de UI)
│   │   ├── vectors.ts         # R² / R³, normas, proyecciones, ángulos, dot/cross products
│   │   ├── matrices.ts        # Operaciones m×n, determinantes, descomposición fila×columna
│   │   ├── discrete.ts        # Recurrencias x_{n+1} = f(x_n), puntos fijos, mapa logístico, órbitas cobweb
│   │   ├── geometry.ts        # Bounding boxes AABB, coordenadas polares/cartesianas
│   │   └── validation.ts      # Verificaciones de ortogonalidad, no-nulos y tolerancia
│   │
│   ├── layout/                # Motor de Distribución Espacial y Safe Areas
│   │   ├── SafeArea.ts        # Delimitación Action-Safe, Title-Safe y EducationContentZone (1080p)
│   │   ├── CollisionDetector.ts # Detección de colisiones de cajas (AABB) con cálculo de solape
│   │   ├── measurements.ts    # Estimación predictiva de complejidad KaTeX y auto-escala tipográfica
│   │   └── LayoutEngine.tsx   # Componentes declarativos SplitLayout, Stack, Grid
│   │
│   ├── animation/             # Sistema de Animación Determinista (60 FPS)
│   │   ├── easing.ts          # Curvas de aceleración y desaceleración Bézier
│   │   ├── interpolation.ts   # Interpolación suave de opacidad, traslación y escala
│   │   └── timing.ts          # Conversión frames <-> segundos y offsets relativos
│   │
│   ├── theme/                 # Tokens Visuales y Paleta Pedagógica
│   │   ├── colors.ts          # Fondo abisal (#070A12), azules, ámbar, esmeralda, violeta
│   │   ├── typography.ts      # Jerarquía de títulos, badges y etiquetas monoespaciadas
│   │   └── spacing.ts         # Grilla armónica de 8 puntos
│   │
│   ├── components/            # Componentes Visuales Reutilizables
│   │   ├── typography/        # ChapterTitle, Badge, SectionTitle
│   │   ├── equations/         # Equation (KaTeX auto-ajustable), FormulaDeconstruction
│   │   ├── graphs/            # CoordinatePlane, FunctionGraph, DiscreteGraph, CobwebPlot
│   │   ├── vectors/           # Vector2D, VectorSumGraph, VectorSubtractionGraph, Vector3D (Three.js)
│   │   ├── matrices/          # MatrixDisplay, MatrixMultiplicationStep, TransformationGrid2D
│   │   └── common/            # DefinitionCard, ErrorCard, BulletList, StepByStepSolution
│   │
│   ├── compositions/          # Plantillas de Composición
│   │   ├── ChapterComposition.tsx # Encabezado, zona segura central y pie de página
│   │   └── CourseComposition.tsx  # Concatenación continua de capítulos en un solo MP4
│   │
│   ├── courses/               # Contenido Curricular Completo
│   │   ├── vectors/           # 14 Capítulos fundamentales de Álgebra Vectorial y Física
│   │   ├── matrices/          # 11 Capítulos fundamentales de Matrices y Transformaciones
│   │   └── discrete-models/   # 10 Capítulos de Sistemas Dinámicos y Recurrencias
│   │
│   ├── Root.tsx               # Registro de las 38 composiciones (3 cursos completos + capítulos)
│   └── index.ts               # Punto de entrada de Remotion
│
├── tests/                     # Pruebas Unitarias Automatizadas
│   ├── math.test.ts           # Precisión de cálculos vectoriales, matriciales y discretos
│   ├── layout.test.ts         # Verificación de colisiones AABB y zonas seguras
│   └── content.test.ts        # Integridad curricular de capítulos y duraciones
│
└── scripts/                   # Automatización y CLI
    ├── validate-course.ts     # Validador integral de contenido, geometría y matemáticas
    └── render-course.ts       # CLI de renderizado con opciones interactivas
```

---

## 2. Cursos Completos Implementados

### Curso 1: Álgebra Lineal & Física Clásica - Vectores
*Duración Total: 9,850 frames (~164 segundos a 60 FPS)*
- **Cap00**: Fundamentos y Naturaleza de los Vectores (Física, Gráficos 3D, IA).
- **Cap01**: Preconceptos Matemáticos Indispensables (Plano cartesiano, trigonometría, Pitágoras).
- **Cap02**: Intuición Geométrica (Magnitud, dirección, sentido, vectores libres vs. fijos).
- **Cap03**: Definición Formal en $\mathbb{R}^2$ y $\mathbb{R}^3$ (Espacios vectoriales y axiomas).
- **Cap04**: Notación y Representaciones (Flechas, pares ordenados y base canónica).
- **Cap05**: Descomposición Ortogonal y Componentes ($v_x = |v|\cos\theta$, $v_y = |v|\sin\theta$).
- **Cap06**: Magnitud y Norma Euclidiana ($\|v\| = \sqrt{v_x^2 + v_y^2}$).
- **Cap07**: Ángulo de Dirección y Vector Unitario ($\theta = \text{atan2}(v_y, v_x)$, $\hat{u} = \vec{v}/\|\vec{v}\|$).
- **Cap08**: Operaciones Fundamentales (Suma punta-cola, resta como suma opuesta, escalamiento).
- **Cap09**: El Producto Punto o Escalar ($\vec{u} \cdot \vec{v}$, ortogonalidad, proyecciones).
- **Cap10**: El Producto Cruz en $\mathbb{R}^3$ (Determinante 3×3, regla de la mano derecha, Three.js 3D).
- **Cap11**: Proyecciones Ortogonales (Proyección escalar y vectorial en física).
- **Cap12**: Errores Conceptuales Frecuentes (Sumar escalares a vectores, conmutatividad del producto cruz).
- **Cap13**: Ejercicios Prácticos y Resumen Integral (3 ejercicios resueltos paso a paso).

### Curso 2: Álgebra Lineal Computacional - Producto de Matrices
*Duración Total: 7,500 frames (~125 segundos a 60 FPS)*
- **Cap00**: Introducción al Mundo Matricial (Redes neuronales, transformaciones 3D, sistemas lineales).
- **Cap01**: Anatomía de una Matriz ($m \times n$, índices $a_{ij}$, filas y columnas).
- **Cap02**: Tipos Especiales (Cuadradas, identidad $I$, nula, diagonales, triangulares).
- **Cap03**: Operaciones Básicas (Suma y resta elemento a elemento, multiplicación por escalar).
- **Cap04**: Compatibilidad Dimensional ($A_{m \times n} \times B_{n \times p} = C_{m \times p}$).
- **Cap05**: El Algoritmo de Multiplicación: Fila × Columna (Cálculo animado de $c_{ij} = \sum a_{ik} b_{kj}$).
- **Cap06**: Propiedades de la Multiplicación (Asociatividad, distributividad, elemento neutro).
- **Cap07**: La Trampa de la No Conmutatividad ($AB \neq BA$, contraejemplo analítico).
- **Cap08**: Interpretación Geométrica en 2D (Rotación, escalamiento, cizallamiento y reflexión).
- **Cap09**: Aplicaciones del Mundo Real (CGI 3D, PageRank de Google, Transformers en IA).
- **Cap10**: Ejercicios Prácticos y Resumen Integral (Multiplicación manual paso a paso y verificación).

### Curso 3: Sistemas Dinámicos & Modelación - Modelos Discretos
*Duración Total: 7,150 frames (~119 segundos a 60 FPS)*
- **Cap00**: De la Observación a la Ecuación en Diferencias (Tiempo discreto vs. continuo).
- **Cap01**: Sucesiones como Estados Temporales ($x_0, x_1, \dots, x_n$).
- **Cap02**: Ecuaciones de Recurrencia ($x_{n+1} = f(x_n)$ de primer y segundo orden).
- **Cap03**: Crecimiento Maltusiano ($x_{n+1} = r x_n$, explosión exponencial y limitaciones).
- **Cap04**: El Modelo Logístico ($x_{n+1} = r x_n (1 - x_n)$, capacidad de carga).
- **Cap05**: Introducción a los Sistemas Dinámicos Discretos (Espacio de fases y órbitas).
- **Cap06**: Puntos Fijos y Análisis de Estabilidad ($x^* = f(x^*)$, criterio $|f'(x^*)| < 1$).
- **Cap07**: El Diagrama de Telaraña (Cobweb Plot interactivo con curva y recta identidad $y = x$).
- **Cap08**: Bifurcaciones y Caos (Duplicación de período, diagrama de Feigenbaum).
- **Cap09**: Ejercicios Prácticos y Resumen Integral (Cálculo de puntos fijos y clasificación de estabilidad).

---

## 3. Comandos y Scripts Disponibles

### Inspección y Edición Visual en Vivo
Inicia el estudio interactivo de Remotion para previsualizar, reproducir a 60 FPS y depurar cualquier escena:
```bash
npm start
```

### Verificación de Tipos y Pruebas Unitarias
Ejecuta la suite de pruebas unitarias (matemáticas, layouts AABB y tiempos de cursos):
```bash
npm test
```

Ejecuta el script de validación integral:
```bash
npm run validate
```

Compilación y chequeo estricto de tipos de TypeScript:
```bash
npm run build
```

### Listar Composiciones Registradas
Muestra las 38 composiciones disponibles (cursos completos y capítulos individuales):
```bash
npm run compositions
```

---

## 4. Renderizado de Videos a Máxima Resolución (1080p @ 60 FPS)

### Renderizar un Curso Completo (Todo en un solo archivo MP4)
```bash
# Curso de Vectores (~164 segundos continuos)
npm run render:vectors

# Curso de Matrices (~125 segundos continuos)
npm run render:matrices

# Curso de Modelos Discretos (~119 segundos continuos)
npm run render:discrete

# Renderizar los 3 cursos en lote
npm run render:all
```

### Renderizado Vía CLI Personalizado (`scripts/render-course.ts`)
```bash
# Renderizar por nombre de curso
npx tsx scripts/render-course.ts --course=vectors
npx tsx scripts/render-course.ts --course=matrices
npx tsx scripts/render-course.ts --course=discrete

# Renderizar un capítulo específico
npx tsx scripts/render-course.ts --chapter=Vec-Cap05
npx tsx scripts/render-course.ts --chapter=Mat-Cap08
npx tsx scripts/render-course.ts --chapter=Disc-Cap07
```

### Capturar un Frame Estático (Still Frame)
```bash
npx remotion still src/index.ts Mat-Cap05 out/mat_frame.png --frame=200
npx remotion still src/index.ts Disc-Cap07 out/disc_frame.png --frame=200
npx remotion still src/index.ts Vec-Cap10 out/vec3d_frame.png --frame=450
```

---

## 5. Prevención de Superposición y Zonas Seguras

El motor implementa dos mecanismos para garantizar legibilidad:

1. **SplitLayout Declarativo**:
   Divide el lienzo 1080p en paneles izquierdo y derecho independientes mediante CSS Grid, reservando el encabezado (120px) y el pie de página (50px). Ningún texto comparte contenedor con un gráfico.
2. **Auto-escala Predictiva de KaTeX**:
   El módulo `measurements.ts` analiza la complejidad de la expresión LaTeX antes de renderizarla y calcula automáticamente el tamaño de fuente óptimo (`text-2xl` a `text-5xl`), evitando desbordes horizontales o verticales.
3. **Validador de Colisiones AABB (`CollisionDetector.ts`)**:
   Verifica en tiempo de pruebas que ningún elemento visual se superponga con otro.
