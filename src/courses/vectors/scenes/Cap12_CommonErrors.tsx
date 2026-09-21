/**
 * src/courses/vectors/scenes/Cap12_CommonErrors.tsx
 * Capítulo 12: Auditoría de Falacias y Errores Frecuentes en Álgebra Vectorial.
 * Rediseñado como Tablero Científico Dinámico con análisis crítico de 4 errores clásicos.
 */

import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import {
  DynamicBoardLayout,
  BoardPanel,
  BoardCallout,
} from "../../../components/board";
import { ErrorAnalysis } from "../../../components/educational/ErrorAnalysis";
import { VECTORS_COURSE } from "../content/data";
import { TOPIC_THEMES } from "../../../theme/boardTheme";

const PHASES = [
  { id: "sum_scalar", label: "1. Suma Escalar + Vector & División Prohibida" },
  { id: "norm_sub", label: "2. Resta de Normas vs Norma de la Resta" },
  { id: "cross_comm", label: "3. La Trampa de Conmutatividad en Producto Cruz" },
];

export const Cap12_CommonErrors: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.vectors;

  // 3 fases de 230 frames (total 690 ~ 700 frames)
  const currentPhaseIndex = frame < 230 ? 0 : frame < 460 ? 1 : 2;

  let activeTakeaway = "Prevención: Un escalar y un vector viven en espacios distintos; JAMÁS se suman ni se dividen entre sí.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Resta geométrica: ||u - v|| depende del ángulo relativo; no es la resta aritmética de sus módulos.";
  } else if (currentPhaseIndex === 2) {
    activeTakeaway = "Anti-conmutatividad: a × b = -(b × a). El orden de los factores altera el signo del vector normal.";
  }

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="12"
      title="Auditoría de Falacias Conceptuales"
      subtitle="Prevención Rigurosa de Errores Típicos en Exámenes y Modelación Científica"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={3}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: SUMAR ESCALAR A VECTOR & DIVISIÓN INEXISTENTE
          ========================================================================= */}
      <Sequence from={0} durationInFrames={230} name="Fase_Error1">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="FALACIA DIMENSIONAL 1"
              title="Sumar Escalares Directamente a Vectores"
              topic="vectors"
              accentColor={theme.warning}
            >
              <ErrorAnalysis
                title="Suma Escalar-Vectorial Inválida"
                misconception="Intentar añadir una cantidad numérica pura a un objeto vectorial multivariado."
                wrongDerivation={{
                  label: "Operación Matemáticamente Absurda:",
                  math: "\\vec{v} = (3, 4) \\implies \\vec{v} + 5 = (8, 9) \\;\\text{o } 12",
                }}
                correctDerivation={{
                  label: "Solo se suman vectores con vectores:",
                  math: "\\vec{v} + 5\\hat{i} = (8, 4) \\quad \\text{o} \\quad \\vec{v} + (5, 5) = (8, 9)",
                }}
                diagnosis="Un escalar carece de componentes espaciales. Para modificar un vector se debe sumar otro vector o multiplicar por el escalar."
              />
            </BoardPanel>
          </div>

          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="FALACIA ALGEBRAICA 2"
              title="La División Entre Vectores NO Existe"
              topic="vectors"
              accentColor={theme.warning}
            >
              <ErrorAnalysis
                title="División Vectorial Inexistente"
                misconception="Asumir que si existe la multiplicación vectorial, debe existir la división u / v."
                wrongDerivation={{
                  label: "Notación Sin Sentido:",
                  math: "\\frac{\\vec{u}}{\\vec{v}} = \\frac{(6, 8)}{(3, 4)} = (2, 2) \\;\\text{o } 2",
                }}
                correctDerivation={{
                  label: "Inversión Matricial o Proyecciones:",
                  math: "\\text{No existe inverso multiplicativo general en } \\mathbb{R}^n",
                }}
                diagnosis="En un espacio vectorial no existe la división entre vectores. Se emplean factores escalares inversos (1/|v|) o matrices inversas cuadradas."
              />
            </BoardPanel>
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          FASE 2: RESTA DE NORMAS VS NORMA DE LA RESTA
          ========================================================================= */}
      <Sequence from={230} durationInFrames={230} name="Fase_Error2">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          <div className="col-span-7 flex flex-col gap-3.5">
            <BoardPanel
              tag="DESIGUALDAD TRIANGULAR"
              title="La Falacia de Restar las Longitudes Módulos"
              topic="vectors"
              accentColor={theme.warning}
            >
              <ErrorAnalysis
                title="||u - v|| ≠ ||u|| - ||v||"
                misconception="Restar los módulos escalares en vez de restar las componentes ortogonales."
                wrongDerivation={{
                  label: "Cálculo Escalar Falso:",
                  math: "|(4, 0)| = 4, \\; |(0, 3)| = 3 \\implies |\\vec{u} - \\vec{v}| = 4 - 3 = 1",
                }}
                correctDerivation={{
                  label: "Cálculo Pitagórico Correcto:",
                  math: "\\vec{u} - \\vec{v} = (4, -3) \\implies |\\vec{u} - \\vec{v}| = \\sqrt{4^2 + (-3)^2} = 5",
                }}
                diagnosis="Al ser ortogonales a 90°, la resta de vectores forma la hipotenusa de un triángulo de catetos 4 y 3, dando exactamente 5, JAMÁS 1."
              />
            </BoardPanel>
          </div>

          <div className="col-span-5 flex flex-col gap-3.5">
            <BoardCallout
              type="axiom"
              topic="vectors"
              title="Desigualdad Triangular Inversa"
              text="La longitud de la diferencia satisface estrictamente: ||u|| - ||v|| <= ||u - v|| <= ||u|| + ||v||. Solo se cumple la igualdad estricta cuando ambos vectores son exactamente colineales con el mismo sentido."
              math="|\\,|\\vec{u}\\| - \\|\\vec{v}\\|\\,| \\le \\|\\vec{u} - \\vec{v}\\|"
            />
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          FASE 3: CONMUTATIVIDAD DEL PRODUCTO CRUZ
          ========================================================================= */}
      <Sequence from={460} durationInFrames={240} name="Fase_Error3">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          <div className="col-span-7 flex flex-col gap-3.5">
            <BoardPanel
              tag="ÁLGEBRA ESPACIAL 3D"
              title="Asumir Conmutatividad en el Producto Cruz"
              topic="vectors"
              accentColor={theme.warning}
            >
              <ErrorAnalysis
                title="a × b ≠ b × a"
                misconception="Trasladar la propiedad conmutativa del producto escalar (u · v = v · u) al producto cruz."
                wrongDerivation={{
                  label: "Afirmación Errónea:",
                  math: "\\hat{i} \\times \\hat{j} = \\hat{k} \\implies \\hat{j} \\times \\hat{i} = \\hat{k}",
                }}
                correctDerivation={{
                  label: "Anti-conmutatividad Estricta:",
                  math: "\\hat{j} \\times \\hat{i} = -\\hat{k} \\implies \\vec{b} \\times \\vec{a} = -(\\vec{a} \\times \\vec{b})",
                }}
                diagnosis="El intercambio de dos filas en un determinante multiplica su valor por -1. Físicamente, la regla de la mano derecha apunta en el sentido opuesto al invertir los factores."
              />
            </BoardPanel>
          </div>

          <div className="col-span-5 flex flex-col gap-3.5">
            <BoardCallout
              type="physics"
              topic="vectors"
              title="Impacto Crítico en Videojuegos y Motores 3D"
              text="En motores gráficos como Unity, Unreal o Three.js, confundir a × b con b × a invierte la normal de las caras poligonales, haciendo que el sombreado de luz ilumine hacia adentro (backface culling) y el objeto se vuelva invisible."
            />
          </div>
        </div>
      </Sequence>
    </DynamicBoardLayout>
  );
};
