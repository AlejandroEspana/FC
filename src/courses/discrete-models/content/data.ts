/**
 * src/courses/discrete-models/content/data.ts
 * Contenido pedagógico riguroso para el Curso de Modelos Discretos y Sistemas Dinámicos.
 */

import { FormulaDeconstructionData, DefinitionCardData, ErrorCardData, BulletItemData, ExerciseData } from "../../../content/types";

export const DISCRETE_COURSE = {
  id: "discrete-models",
  title: "Sistemas Dinámicos & Modelación Discreta",
  subtitle: "Curso Fundamental: Ecuaciones en Diferencias, Recurrencias, Estabilidad y Caos",

  cap00_intro: {
    title: "El Mundo en Tiempo Discreto",
    subtitle: "Por qué la computación y la biología operan a pasos finitos",
    durationFrames: 600,
    bullets: [
      {
        title: "Tiempo Continuo vs Tiempo Discreto",
        description: "En el mundo continuo el tiempo fluye suavemente (ecuaciones diferenciales t in R). En el discreto, avanza a pulsos enteros (n = 0, 1, 2, 3...).",
        badge: "Fundamento",
        badgeColor: "#38BDF8",
      },
      {
        title: "Generaciones Biológicas y Poblaciones",
        description: "Poblaciones de insectos o bacterias con reproducción estacional no se mezclan continuamente; se modelan paso a paso.",
        badge: "Biología",
        badgeColor: "#34D399",
      },
      {
        title: "Algoritmos y Finanzas Cuantitativas",
        description: "Interés compuesto anual, cotizaciones bursátiles y bucles iterativos en software son inherentemente discretos.",
        badge: "Computación",
        badgeColor: "#FACC15",
      },
    ] as BulletItemData[],
  },

  cap01_sequences: {
    title: "Secuencias y Evolución Temporal",
    subtitle: "Notación x_n, Condiciones Iniciales x_0 y Órbitas",
    durationFrames: 600,
    notationFormula: {
      formula: "\\{x_n\\}_{n=0}^{\\infty} = \\{ x_0,\\; x_1,\\; x_2,\\; x_3,\\; \\dots \\}",
      title: "Trayectoria u Órbita Temporal",
      subtitle: "Secuencia ordenada de estados que describe la historia completa del sistema",
      components: [
        { symbol: "n", name: "Paso de Tiempo Discreto", color: "#38BDF8", description: "Entero no negativo (n = 0, 1, 2, ...) que indexa la época o generación." },
        { symbol: "x_0", name: "Estado Inicial", color: "#FACC15", description: "Punto de partida o condición inicial indispensable para la evolución." },
        { symbol: "x_n", name: "Estado en el Tiempo n", color: "#34D399", description: "Valor de la variable de estado tras n iteraciones del modelo." },
      ],
    } as FormulaDeconstructionData,
  },

  cap02_recurrences: {
    title: "Ecuaciones en Diferencias de Primer Orden",
    subtitle: "La regla de evolución determinista x_{n+1} = f(x_n)",
    durationFrames: 650,
    recurrenceFormula: {
      formula: "x_{n+1} = f(x_n)",
      title: "Ecuación de Recurrencia",
      subtitle: "El estado futuro depende deterministamente del estado presente inmediato",
      components: [
        { symbol: "x_{n+1}", name: "Estado Futuro Inmediato", color: "#34D399", description: "Siguiente generación o valor tras avanzar exactamente un paso." },
        { symbol: "f(\\cdot)", name: "Función de Transición o Mapa", color: "#38BDF8", description: "Regla matemática o ley física que transforma el presente en el futuro." },
        { symbol: "x_n", name: "Estado Presente Actual", color: "#FACC15", description: "Configuración actual del sistema en el instante n." },
      ],
    } as FormulaDeconstructionData,
  },

  cap03_malthusian_growth: {
    title: "Crecimiento y Decaimiento Exponencial Discreto",
    subtitle: "El Modelo Lineal de Malthus y su Solución Analítica",
    durationFrames: 700,
    malthusFormula: {
      formula: "x_{n+1} = r \\cdot x_n \\implies x_n = x_0 \\cdot r^n",
      title: "Modelo de Malthus en Tiempo Discreto",
      subtitle: "Crecimiento geométrico sin restricciones de recursos",
      components: [
        { symbol: "r > 1", name: "Crecimiento Exponencial", color: "#34D399", description: "La población explota hacia infinito geométricamente." },
        { symbol: "0 < r < 1", name: "Decaimiento Exponencial", color: "#FACC15", description: "La población se extingue asintóticamente hacia cero." },
        { symbol: "r = 1", name: "Estado Estacionario Neutro", color: "#38BDF8", description: "La población permanece exactamente constante: x_n = x_0." },
      ],
    } as FormulaDeconstructionData,
  },

  cap04_logistic_model: {
    title: "El Modelo Logístico Poblacional",
    subtitle: "Saturación por Capacidad de Carga y No-Linealidad",
    durationFrames: 750,
    logisticFormula: {
      formula: "x_{n+1} = r \\cdot x_n (1 - x_n)",
      title: "El Mapa Logístico Cuadrático",
      subtitle: "Competencia intraespecífica y freno ambiental cuadrático",
      components: [
        { symbol: "x_n", name: "Densidad Normalizada", color: "#38BDF8", description: "Fracción de la capacidad de carga (0 <= x_n <= 1)." },
        { symbol: "r", name: "Parámetro de Fertilidad Intrínseca", color: "#FACC15", description: "Tasa neta de reproducción de la especie." },
        { symbol: "(1 - x_n)", name: "Factor de Resistencia Ambiental", color: "#F472B6", description: "A medida que la población se satura (x -> 1), el factor decae a cero." },
      ],
    } as FormulaDeconstructionData,
  },

  cap05_dynamical_systems: {
    title: "Sistemas Dinámicos Discretos: Estados y Órbitas",
    subtitle: "Espacio de Estados, Atractores y Cuenca de Atracción",
    durationFrames: 650,
    definition: {
      title: "El Espacio de Estados",
      category: "Geometría Dinámica",
      text: "Conjunto de todas las configuraciones posibles que puede adoptar el sistema. Para una sola variable es un intervalo real [0, 1]. Una órbita es la trayectoria que recorre el sistema a lo largo del tiempo empezando desde x_0.",
      formula: "x_{k} = f^{\\circ k}(x_0) = \\underbrace{f(f(\\dots f(x_0)\\dots))}_{k\\text{ veces}}",
      accentColor: "#38BDF8",
    } as DefinitionCardData,
  },

  cap06_fixed_points_stability: {
    title: "Puntos Fijos y Criterio Analítico de Estabilidad",
    subtitle: "Equilibrios x* = f(x*) y la Derivada |f'(x*)| < 1",
    durationFrames: 750,
    stabilityFormula: {
      formula: "x^* = f(x^*), \\quad \\text{Estable si } |f'(x^*)| < 1, \\quad \\text{Inestable si } |f'(x^*)| > 1",
      title: "Teorema de Linealización y Estabilidad Asintótica",
      subtitle: "La magnitud de la pendiente local determina si las perturbaciones se amortiguan o crecen",
      components: [
        { symbol: "x^*", name: "Punto Fijo o Equilibrio", color: "#34D399", description: "Estado estacionario donde el sistema reposa indefinidamente: f(x*) = x*." },
        { symbol: "|f'(x^*)| < 1", name: "Atractor Estable", color: "#38BDF8", description: "Las trayectorias cercanas son absorbidas hacia x* exponencialmente." },
        { symbol: "|f'(x^*)| > 1", name: "Repulsor Inestable", color: "#F87171", description: "Cualquier perturbación microscópica expulsa al sistema lejos de x*." },
      ],
    } as FormulaDeconstructionData,
  },

  cap07_cobweb_plot: {
    title: "El Diagrama de Telaraña (Cobweb Plot)",
    subtitle: "Análisis Gráfico de Fase: Curva y = f(x) y Recta Identidad y = x",
    durationFrames: 850,
    rValue: 2.8,
    x0: 0.15,
  },

  cap08_chaos_bifurcations: {
    title: "De la Estabilidad al Caos Determinista",
    subtitle: "Bifurcaciones de Duplicación de Periodo y Sensibilidad",
    durationFrames: 750,
    bullets: [
      {
        title: "1 < r < 3: Equilibrio Único Estable",
        description: "El sistema converge monótona u oscilatoriamente hacia el punto fijo x* = 1 - 1/r.",
        badge: "Orden",
        badgeColor: "#34D399",
      },
      {
        title: "3 < r < 3.449: Ciclo Límite de Periodo 2",
        description: "El punto fijo se vuelve inestable y la población oscila eternamente entre dos valores.",
        badge: "Bifurcación",
        badgeColor: "#FACC15",
      },
      {
        title: "r > 3.57: Caos Determinista (Efecto Mariposa)",
        description: "Trayectorias aperiódicas impredecibles a largo plazo aunque la ecuación es 100% determinista.",
        badge: "Caos",
        badgeColor: "#F87171",
      },
    ] as BulletItemData[],
  },

  cap09_exercises_summary: {
    title: "Ejercicios Resueltos y Síntesis de Sistemas Discretos",
    subtitle: "Cálculo analítico de equilibrios y estabilidad",
    durationFrames: 850,
    exercise1: {
      level: "Nivel Intermedio: Puntos Fijos del Mapa Logístico",
      prompt: "Para el mapa logístico x_{n+1} = 2.5 x_n (1 - x_n), hallar el equilibrio no trivial y clasificar su estabilidad.",
      steps: [
        { label: "1. Ecuación de punto fijo", math: "x^* = 2.5 x^* (1 - x^*) \\implies 1 = 2.5(1 - x^*)" },
        { label: "2. Despeje analítico", math: "1 - x^* = \\frac{1}{2.5} = 0.4 \\implies x^* = 0.6" },
        { label: "3. Derivada de f(x)", math: "f'(x) = 2.5(1 - 2x) \\implies f'(0.6) = 2.5(1 - 1.2) = -0.5" },
        { label: "4. Criterio de estabilidad", math: "|f'(0.6)| = |-0.5| = 0.5 < 1 \\implies \\text{ATRACTOR ESTABLE}" },
      ],
    } as ExerciseData,
  },
};
