/**
 * src/courses/vectors/scenes/Cap13_ExercisesSummary.tsx
 * Capítulo 13: Laboratorio de Ejercicios de Dificultad Gradual y Síntesis Curricular.
 * Rediseñado como Tablero Blanco Científico Dinámico:
 * - Fase 1: Workbench de Dificultad Gradual (Nivel 1: Básico -> Nivel 2: Intermedio -> Nivel 3: Avanzado)
 * - Fase 2: Reto Interactivo con Cuenta Regresiva (Norma Pitagórica)
 * - Fase 3: Comparación Metodológica (Geométrico vs Algebraico)
 * - Fase 4: Pilares Maestros y Síntesis del Curso
 */

import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import { DynamicBoardLayout, BoardWipeTransition } from "../../../components/board";
import { GradualDifficultyWorkbench, GradualExerciseTier } from "../../../components/educational/GradualDifficultyWorkbench";
import { MultipleChoice } from "../../../components/educational/MultipleChoice";
import { ConceptComparison } from "../../../components/educational/ConceptComparison";
import { Summary } from "../../../components/educational/Summary";
import { VECTORS_COURSE } from "../content/data";

const PHASES = [
  { id: "gradual", label: "1. Workbench Gradual: Básico → Intermedio → Reto" },
  { id: "interactive", label: "2. Reto Interactivo: Norma Pitagórica" },
  { id: "comparison", label: "3. Comparación: Geometría vs Álgebra" },
  { id: "summary", label: "4. Síntesis y Pilares Maestros" },
];

const GRADUAL_TIERS: GradualExerciseTier[] = [
  {
    level: "basic",
    levelBadge: "Nivel 1: Básico / Intuición Directa",
    title: "Norma Euclidiana y Normalización Unitaria",
    statement: "Dado el vector coplanar v = (6, 8), determina su longitud física absoluta ||v|| y su versor unitario colineal û.",
    givenData: [
      { label: "Vector base", value: "\\vec{v} = (6, 8)", color: "#2563EB" },
      { label: "Dimensión", value: "\\mathbb{R}^2" },
    ],
    targetVariable: "\\|\\vec{v}\\| \\quad \\text{y} \\quad \\hat{u} = \\frac{\\vec{v}}{\\|\\vec{v}\\|}",
    steps: [
      {
        label: "Paso 1: Suma de cuadrados catetos",
        math: "\\|\\vec{v}\\|^2 = v_x^2 + v_y^2 = 6^2 + 8^2 = 36 + 64 = 100",
        explanation: "Teorema de Pitágoras aplicado a los catetos ortogonales de proyección.",
      },
      {
        label: "Paso 2: Extracción de raíz cuadrada",
        math: "\\|\\vec{v}\\| = \\sqrt{100} = 10",
        explanation: "La norma siempre es un escalar no negativo.",
        highlight: true,
      },
      {
        label: "Paso 3: Construcción del versor unitario",
        math: "\\hat{u} = \\frac{(6, 8)}{10} = \\left(\\frac{6}{10}, \\frac{8}{10}\\right) = (0.6, \\; 0.8)",
        explanation: "Mantiene la orientación exacta pero con longitud normalizada a 1.",
      },
    ],
    result: {
      math: "\\|\\vec{v}\\| = 10, \\quad \\hat{u} = (0.6, \\; 0.8), \\quad \\|\\hat{u}\\| = \\sqrt{0.36 + 0.64} = 1",
      label: "VERIFICACIÓN DIRECTA",
      interpretation: "El vector tiene una magnitud de 10 unidades y su versor base preserva su dirección pura.",
    },
    keyTakeaway: "Regla Mnemotécnica: Dividir cualquier vector no nulo por su norma engendra un versor direccional unitario puro.",
  },
  {
    level: "intermediate",
    levelBadge: "Nivel 2: Intermedio / Problema Inverso",
    title: "Condición de Ortogonalidad y Despeje de Parámetro",
    statement: "Determina el valor exacto del escalar k para que los vectores a = (3, -2) y b = (4, k) sean estrictamente perpendiculares entre sí.",
    givenData: [
      { label: "Vector a", value: "\\vec{a} = (3, -2)", color: "#2563EB" },
      { label: "Vector b(k)", value: "\\vec{b} = (4, k)", color: "#D97706" },
      { label: "Condición geométrica", value: "\\vec{a} \\perp \\vec{b} \\iff \\theta = 90^\\circ", color: "#DC2626" },
    ],
    targetVariable: "k \\in \\mathbb{R} \\quad / \\quad \\vec{a} \\cdot \\vec{b} = 0",
    steps: [
      {
        label: "Paso 1: Criterio fundamental del producto escalar",
        math: "\\vec{a} \\cdot \\vec{b} = \\|\\vec{a}\\| \\|\\vec{b}\\| \\cos(90^\\circ) = \\|\\vec{a}\\| \\|\\vec{b}\\| \\cdot 0 = 0",
        explanation: "La perpendicularidad equivale analíticamente a que el producto punto sea idénticamente cero.",
      },
      {
        label: "Paso 2: Expansión por componentes cartesianas",
        math: "\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y = (3)(4) + (-2)(k) = 12 - 2k",
        explanation: "Multiplicación directa término a término de los ejes ortogonales.",
        highlight: true,
      },
      {
        label: "Paso 3: Ecuación lineal y despeje de k",
        math: "12 - 2k = 0 \\implies 2k = 12 \\implies k = 6",
        explanation: "Despeje algebraico unívoco de la incógnita desconocida.",
      },
    ],
    result: {
      math: "k = 6 \\implies \\vec{b} = (4, 6) \\quad [\\vec{a} \\cdot \\vec{b} = 3(4) + (-2)(6) = 12 - 12 = 0]",
      label: "PARÁMETRO COMPATIBLE",
      interpretation: "Para k = 6, el ángulo formado entre ambos vectores es exactamente 90°.",
    },
    keyTakeaway: "Teorema de Anulación: Dos vectores no nulos son ortogonales si y solo si su producto escalar es nulo.",
  },
  {
    level: "advanced",
    levelBadge: "Nivel 3: Avanzado / Descomposición Vectorial",
    title: "Proyección Ortogonal y Descomposición en Dos Componentes",
    statement: "Descompón el vector u = (4, 7) en la suma de dos vectores perpendiculares: uno paralelo a la directriz v = (3, 1) y otro ortogonal a ella.",
    givenData: [
      { label: "Vector a proyectar", value: "\\vec{u} = (4, 7)", color: "#2563EB" },
      { label: "Vector eje", value: "\\vec{v} = (3, 1)", color: "#059669" },
    ],
    targetVariable: "\\vec{u} = \\vec{u}_\\parallel + \\vec{u}_\\perp \\quad / \\quad \\vec{u}_\\parallel \\parallel \\vec{v}, \\; \\vec{u}_\\perp \\perp \\vec{v}",
    steps: [
      {
        label: "Paso 1: Componente Paralela (Proyección)",
        math: "\\text{proy}_{\\vec{v}}(\\vec{u}) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{v}\\|^2} \\vec{v} = \\frac{4(3) + 7(1)}{3^2 + 1^2} (3, 1) = \\frac{19}{10} (3, 1) = (5.7, \\; 1.9)",
        explanation: "La 'sombra' geométrica de u que cae sobre la línea generada por v.",
        highlight: true,
      },
      {
        label: "Paso 2: Componente Ortogonal Residual",
        math: "\\vec{u}_\\perp = \\vec{u} - \\vec{u}_\\parallel = (4, 7) - (5.7, 1.9) = (-1.7, \\; 5.1)",
        explanation: "Diferencia vectorial que representa la desviación normal respecto al eje.",
      },
      {
        label: "Paso 3: Verificación de Ortogonalidad",
        math: "\\vec{u}_\\parallel \\cdot \\vec{u}_\\perp = (5.7)(-1.7) + (1.9)(5.1) = -9.69 + 9.69 = 0",
        explanation: "Comprueba con rigor absoluto que las dos componentes son mutuamente perpendiculares.",
      },
    ],
    result: {
      math: "\\vec{u} = (5.7, \\; 1.9) + (-1.7, \\; 5.1) = (4, 7)",
      label: "DESCOMPOSICIÓN VERIFICADA",
      interpretation: "El vector original queda expresado como la suma exacta de sus partes paralela y normal.",
    },
    keyTakeaway: "Principio de Gram-Schmidt: Cualquier vector puede descomponerse en una componente a lo largo de un eje y un residuo estrictamente perpendicular.",
  },
];

export const Cap13_ExercisesSummary: React.FC = () => {
  const frame = useCurrentFrame();
  const meta = VECTORS_COURSE.cap13_exercises_summary;

  // 4 fases distribuidas en 900 frames:
  // Fase 1: Gradual (0..320)
  // Fase 2: Interactive (320..540)
  // Fase 3: Comparison (540..720)
  // Fase 4: Summary (720..900)
  const currentPhaseIndex = frame < 320 ? 0 : frame < 540 ? 1 : frame < 720 ? 2 : 3;

  let activeTakeaway = "Dificultad Gradual: Domina la norma básica antes de despejar incógnitas ortogonales y proyecciones.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Entrenamiento: Calcula mentalmente la norma euclidiana antes de que expire la cuenta regresiva.";
  } else if (currentPhaseIndex === 2) {
    activeTakeaway = "Metodología: El enfoque geométrico brinda intuición física; el analítico escala a n dimensiones.";
  } else if (currentPhaseIndex === 3) {
    activeTakeaway = "Conexión Curricular: Los vectores son los cimientos inmediatos del Álgebra Matricial y Transformaciones.";
  }

  // Nivel activo dinámico en la Fase 1 según el frame local (0..320)
  const gradualLevel = frame < 105 ? "basic" : frame < 215 ? "intermediate" : "advanced";

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="13"
      title={meta.title}
      subtitle={meta.subtitle}
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={4}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      <div className="w-full flex flex-col justify-center items-center max-w-5xl mx-auto h-full">
        {/* =========================================================================
            1. WORKBENCH DE DIFICULTAD GRADUAL (0..320 frames)
            ========================================================================= */}
        <Sequence from={0} durationInFrames={320} name="Fase1_DificultadGradual">
          <BoardWipeTransition
            durationInFrames={320}
            wipeDurationFrames={32}
            direction="left-to-right"
            wiperColor="#2563EB"
            showIndicator={true}
          >
            <div className="w-full">
              <GradualDifficultyWorkbench
                topic="vectors"
                activeLevel={gradualLevel}
                tiers={GRADUAL_TIERS}
              />
            </div>
          </BoardWipeTransition>
        </Sequence>

        {/* =========================================================================
            2. RETO INTERACTIVO CON CUENTA REGRESIVA (320..540 frames)
            ========================================================================= */}
        <Sequence from={320} durationInFrames={220} name="Fase2_EjercicioInteractivo">
          <BoardWipeTransition
            durationInFrames={220}
            wipeDurationFrames={30}
            direction="right-to-left"
            wiperColor="#D97706"
            showIndicator={true}
          >
            <div className="w-full">
              <MultipleChoice
                question="¿Cuál es la norma o longitud euclidiana exacta del vector dado a continuación?"
                mathContext="\vec{v} = (6, 8)"
                thinkingFrames={110}
                options={[
                  { id: "A", text: "14 unidades", isCorrect: false },
                  { id: "B", text: "10 unidades", math: "\\sqrt{6^2 + 8^2} = 10", isCorrect: true },
                  { id: "C", text: "48 unidades", isCorrect: false },
                  { id: "D", text: "7 unidades", isCorrect: false },
                ]}
                explanation="Aplicando la norma euclidiana: ||v|| = √(6² + 8²) = √(36 + 64) = √100 = 10. Es el triángulo pitagórico semejante al (3, 4, 5) ampliado por un factor escalar c = 2."
              />
            </div>
          </BoardWipeTransition>
        </Sequence>

        {/* =========================================================================
            3. COMPARACIÓN METODOLÓGICA (540..720 frames)
            ========================================================================= */}
        <Sequence from={540} durationInFrames={180} name="Fase3_ComparacionMetodos">
          <BoardWipeTransition
            durationInFrames={180}
            wipeDurationFrames={28}
            direction="left-to-right"
            wiperColor="#059669"
            showIndicator={true}
          >
            <div className="w-full">
              <ConceptComparison
                title="Comparación: Método Geométrico vs Método Algebraico"
                description="Dos formas complementarias de operar con vectores: visual e intuitiva vs analítica y escalable a n dimensiones."
                methodA={{
                  name: "Método Geométrico (Punta-Cola)",
                  badge: "Enfoque Visual",
                  formula: "\\vec{u} + \\vec{v} \\text{ (regla del paralelogramo)}",
                  pros: [
                    "Proporciona intuición física directa.",
                    "Fácil de visualizar en 2D y 3D.",
                    "Permite estimar resultados rápidamente sin calculadora.",
                  ],
                  cons: [
                    "Impreciso para mediciones manuales finas.",
                    "Inviable en dimensiones mayores a 3 (R⁴, Rⁿ).",
                  ],
                  bestFor: "Explicaciones conceptuales, estática y cinemática en física básica.",
                  color: "#2563EB",
                }}
                methodB={{
                  name: "Método Algebraico (Componentes)",
                  badge: "Enfoque Analítico",
                  formula: "(u_x + v_x, \\; u_y + v_y, \\dots, u_n + v_n)",
                  pros: [
                    "Precisión numérica absoluta.",
                    "Escalable trivialmente a cualquier dimensión n.",
                    "Idóneo para implementación en código y computación.",
                  ],
                  cons: [
                    "Puede ocultar la interpretación espacial si solo se memorizan fórmulas.",
                  ],
                  bestFor: "Motores gráficos, Machine Learning, simulaciones y física computacional.",
                  color: "#D97706",
                }}
              />
            </div>
          </BoardWipeTransition>
        </Sequence>

        {/* =========================================================================
            4. SÍNTESIS CURRICULAR DEL CURSO COMPLETO (720..900 frames)
            ========================================================================= */}
        <Sequence from={720} durationInFrames={180} name="Fase4_SintesisCurso">
          <div className="w-full">
            <Summary
              title="Pilares Maestros del Álgebra Vectorial"
              subtitle="Los tres fundamentos indispensables aprendidos en este curso"
              pillars={[
                {
                  title: "1. Descomposición Ortogonal",
                  keyFormula: "\\vec{v} = v_x\\hat{i} + v_y\\hat{j}",
                  takeaway: "Cualquier fenómeno vectorial complejo se simplifica descomponiéndolo en ejes perpendiculares independientes.",
                  color: "#2563EB",
                },
                {
                  title: "2. Norma y Versor Unitario",
                  keyFormula: "\\|v\\| = \\sqrt{\\sum v_i^2}, \\quad \\hat{u} = \\frac{\\vec{v}}{\\|v\\|}",
                  takeaway: "Separar magnitud (cuánto) de dirección pura (hacia dónde) es la base del cómputo gráfico y normalizado.",
                  color: "#D97706",
                },
                {
                  title: "3. Productos y Ortogonalidad",
                  keyFormula: "\\vec{u} \\cdot \\vec{v} = \\|u\\|\\|v\\|\\cos\\theta, \\quad \\vec{a} \\times \\vec{b}",
                  takeaway: "El producto escalar detecta perpendicularidad (cero); el producto cruz engendra vectores normales espaciales en 3D.",
                  color: "#059669",
                },
              ]}
              futureConnection="Estos conceptos son los cimientos inmediatos del curso siguiente: Álgebra Matricial y Transformaciones Lineales en R² y R³."
            />
          </div>
        </Sequence>
      </div>
    </DynamicBoardLayout>
  );
};

