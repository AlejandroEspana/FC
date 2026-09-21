/**
 * src/courses/vectors/scenes/Cap13_ExercisesSummary.tsx
 * Capítulo 13: Laboratorio de Ejercicios Multiformato y Síntesis Curricular.
 * Implementa una variedad amplia de problemas:
 * - Tipo 1: Cálculo directo interactivo con tiempo para pensar (MultipleChoice)
 * - Tipo 2: Problema inverso (WorkedExample)
 * - Tipo 6: Comparación metodológica (ConceptComparison: Geométrico vs Algebraico)
 * - Síntesis y pilares conceptuales (Summary)
 */

import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { Sequence } from "remotion";
import { MultipleChoice } from "../../../components/educational/MultipleChoice";
import { WorkedExample } from "../../../components/educational/WorkedExample";
import { ConceptComparison } from "../../../components/educational/ConceptComparison";
import { Summary } from "../../../components/educational/Summary";
import { VECTORS_COURSE } from "../content/data";

export const Cap13_ExercisesSummary: React.FC = () => {
  const meta = VECTORS_COURSE.cap13_exercises_summary;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="13"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="w-full flex flex-col justify-center items-center max-w-5xl mx-auto">
        {/* =========================================================================
            1. EJERCICIO INTERACTIVO (Tipo 1: Cálculo Directo con Cuenta Regresiva)
            ========================================================================= */}
        <Sequence from={0} durationInFrames={250} name="Ejercicio1_Interactivo">
          <div className="w-full">
            <MultipleChoice
              question="¿Cuál es la norma o longitud euclidiana exacta del vector dado a continuación?"
              mathContext="\vec{v} = (6, 8)"
              thinkingFrames={120} // 2 segundos de pausa para pensar a 60 FPS
              options={[
                { id: "A", text: "14 unidades", isCorrect: false },
                { id: "B", text: "10 unidades", math: "\\sqrt{6^2 + 8^2} = 10", isCorrect: true },
                { id: "C", text: "48 unidades", isCorrect: false },
                { id: "D", text: "7 unidades", isCorrect: false },
              ]}
              explanation="Aplicando la norma euclidiana: ||v|| = √(6² + 8²) = √(36 + 64) = √100 = 10. Es el triángulo pitagórico semejante al (3, 4, 5) ampliado por un factor escalar c = 2."
            />
          </div>
        </Sequence>

        {/* =========================================================================
            2. PROBLEMA INVERSO (Tipo 2: De Magnitud y Ángulo a Componentes)
            ========================================================================= */}
        <Sequence from={250} durationInFrames={230} name="Ejercicio2_ProblemaInverso">
          <div className="w-full">
            <WorkedExample
              typeBadge="Tipo 2: Problema Inverso"
              title="Reconstrucción de Componentes Ortogonales"
              prompt="Una fuerza de 10 Newtons se aplica con un ángulo de inclinación de 60° respecto a la horizontal. Determina las componentes rectangulares F_x y F_y."
              givenData={[
                { label: "Magnitud", value: "|\\vec{F}| = 10\\text{ N}" },
                { label: "Ángulo", value: "\\theta = 60^\\circ" },
              ]}
              targetVariable="\\vec{F} = (F_x, F_y)"
              steps={[
                {
                  label: "1. Componente horizontal F_x:",
                  math: "F_x = |\\vec{F}| \\cos(60^\\circ) = 10 \\cdot 0.5 = 5\\text{ N}",
                  explanation: "Proyección trigonométrica sobre el eje de abscisas.",
                },
                {
                  label: "2. Componente vertical F_y:",
                  math: "F_y = |\\vec{F}| \\sin(60^\\circ) = 10 \\cdot \\frac{\\sqrt{3}}{2} \\approx 8.66\\text{ N}",
                  explanation: "Proyección trigonométrica sobre el eje de ordenadas.",
                },
              ]}
              finalResult={{
                math: "\\vec{F} = (5, \\; 5\\sqrt{3})\\text{ N} \\approx (5, \\; 8.66)\\text{ N}",
                interpretation: "La fuerza ejerce 5 N de empuje horizontal y 8.66 N de elevación vertical.",
              }}
            />
          </div>
        </Sequence>

        {/* =========================================================================
            3. COMPARACIÓN METODOLÓGICA (Tipo 6: Geométrico vs Algebraico)
            ========================================================================= */}
        <Sequence from={480} durationInFrames={220} name="Ejercicio3_ComparacionMetodos">
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
                color: "#38BDF8",
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
                color: "#FACC15",
              }}
            />
          </div>
        </Sequence>

        {/* =========================================================================
            4. SÍNTESIS CURRICULAR DEL CURSO COMPLETO
            ========================================================================= */}
        <Sequence from={700} durationInFrames={200} name="SintesisCurso">
          <div className="w-full">
            <Summary
              title="Pilares Maestros del Álgebra Vectorial"
              subtitle="Los tres fundamentos indispensables aprendidos en este curso"
              pillars={[
                {
                  title: "1. Descomposición Ortogonal",
                  keyFormula: "\\vec{v} = v_x\\hat{i} + v_y\\hat{j}",
                  takeaway: "Cualquier fenómeno vectorial complejo se simplifica descomponiéndolo en ejes perpendiculares independientes.",
                  color: "#38BDF8",
                },
                {
                  title: "2. Norma y Versor Unitario",
                  keyFormula: "\\|v\\| = \\sqrt{\\sum v_i^2}, \\quad \\hat{u} = \\frac{\\vec{v}}{\\|v\\|}",
                  takeaway: "Separar magnitud (cuánto) de dirección pura (hacia dónde) es la base del cómputo gráfico y normalizado.",
                  color: "#FACC15",
                },
                {
                  title: "3. Productos y Ortogonalidad",
                  keyFormula: "\\vec{u} \\cdot \\vec{v} = \\|u\\|\\|v\\|\\cos\\theta, \\quad \\vec{a} \\times \\vec{b}",
                  takeaway: "El producto escalar detecta perpendicularidad (cero); el producto cruz engendra vectores normales espaciales en 3D.",
                  color: "#34D399",
                },
              ]}
              futureConnection="Estos conceptos son los cimientos inmediatos del curso siguiente: Álgebra Matricial y Transformaciones Lineales en R² y R³."
            />
          </div>
        </Sequence>
      </div>
    </ChapterComposition>
  );
};
