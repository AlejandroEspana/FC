/**
 * src/courses/vectors/scenes/Cap00_Intro.tsx
 * Capítulo 00: Fundamentos y Naturaleza de los Vectores.
 * Rediseñado como Tablero Científico Dinámico.
 */

import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import {
  DynamicBoardLayout,
  BoardPanel,
  BoardEquationWorkbench,
  BoardCallout,
} from "../../../components/board";
import { VECTORS_COURSE } from "../content/data";
import { TOPIC_THEMES } from "../../../theme/boardTheme";
import { Equation } from "../../../components/equations/Equation";

const PHASES = [
  { id: "motivation", label: "1. La Necesidad Física de la Dirección" },
  { id: "domains", label: "2. Las Tres Grandes Áreas de Aplicación" },
];

export const Cap00_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = TOPIC_THEMES.vectors;

  // 2 fases de 300 frames cada una (total 600 frames = 10s @ 60 FPS)
  const currentPhaseIndex = frame < 300 ? 0 : 1;

  let activeTakeaway = "Un escalar describe 'cuánto'; un vector describe 'cuánto, hacia dónde y en qué sentido'.";
  if (currentPhaseIndex === 1) {
    activeTakeaway = "Desde la gravedad hasta las redes neuronales: los vectores son el lenguaje unificado de la ciencia.";
  }

  return (
    <DynamicBoardLayout
      topic="vectors"
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="00"
      title="Naturaleza y Poder de los Vectores"
      subtitle="¿Por qué el universo físico y computacional no cabe en un solo número?"
      currentPhaseIndex={currentPhaseIndex}
      totalPhases={2}
      phases={PHASES}
      activeTakeaway={activeTakeaway}
    >
      {/* =========================================================================
          FASE 1: MOTIVACIÓN Y ESCALAR VS VECTOR (0..300 frames)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={300} name="Fase_Motivacion">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          {/* Columna Izquierda: Premisa Teórica */}
          <div className="col-span-6 flex flex-col gap-3.5">
            <BoardPanel
              tag="PREMISA FUNDAMENTAL"
              title="La Insuficiencia de los Escalares"
              topic="vectors"
              accentColor={theme.primary}
            >
              <BoardEquationWorkbench
                topic="vectors"
                title="Estructura de la Información"
                formula="\vec{v} = \begin{pmatrix} \text{Magnitud: } \|\vec{v}\| \\ \text{Dirección: } \theta \\ \text{Sentido: } \pm \end{pmatrix} \neq s \in \mathbb{R}"
                steps={[
                  { label: "Escalar Puro:", latex: "T = 25^\\circ\\text{C}, \\quad m = 70\\text{ kg}", note: "Solo magnitud numérica" },
                  { label: "Vector Completo:", latex: "\\vec{v} = 100\\text{ km/h (Rumbo Norte)}", note: "Orientación espacial indeformable", highlight: true },
                ]}
                result={{
                  latex: "\\vec{v} \\in \\mathbb{R}^n, \\quad n \\ge 2",
                  label: "DIMENSIÓN ESPACIAL",
                  interpretation: "Exige al menos dos o tres coordenadas para su determinación unívoca.",
                }}
              />
            </BoardPanel>

            <BoardCallout
              type="physics"
              topic="vectors"
              title="Consecuencias Físicas de la Dirección"
              text="Un avión que vuela a 500 km/h con viento cruzado de 100 km/h se estrellaría si el piloto se limitara a sumar los números escalares: debe calcular la resultante vectorial vectorial."
            />
          </div>

          {/* Columna Derecha: Triada de Propiedades Vectoriales */}
          <div className="col-span-6 flex flex-col gap-3">
            <BoardPanel
              tag="LOS TRES PILARES DEL VECTOR"
              title="Anatomía de la Flecha Vectorial"
              topic="vectors"
              accentColor={theme.result}
            >
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">Magnitud o Norma (|v|)</h4>
                    <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                      Longitud euclidiana absoluta que mide la intensidad de la fuerza, velocidad o desplazamiento.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">Dirección (Recta Directriz)</h4>
                    <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                      La inclinación angular theta de la recta infinita que sustenta el vector en el espacio.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">Sentido (Orientación de la Punta)</h4>
                    <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                      Hacia qué extremo de la recta apunta la flecha (ej. hacia el Este o hacia el Oeste).
                    </p>
                  </div>
                </div>
              </div>
            </BoardPanel>
          </div>
        </div>
      </Sequence>

      {/* =========================================================================
          FASE 2: LAS TRES REVOLUCIONES APLICADAS (300..600 frames)
          ========================================================================= */}
      <Sequence from={300} durationInFrames={300} name="Fase_Dominios">
        <div className="grid grid-cols-12 gap-6 w-full items-center h-full px-2">
          {/* Tarjeta 1: Física Clásica */}
          <div className="col-span-4 flex flex-col h-full">
            <BoardPanel
              tag="DOMINIO 1: DINÁMICA"
              title="Física Clásica & Campos"
              topic="vectors"
              accentColor="#38BDF8"
              className="h-full"
            >
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                Desde las leyes de Newton hasta el electromagnetismo de Maxwell, las fuerzas, aceleraciones y campos son vectores coplanares y espaciales.
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center">
                <Equation latex="\vec{F}_{\text{neta}} = m \vec{a} = \sum_{i=1}^k \vec{F}_i" fontSize="text-xs" block={false} />
              </div>
            </BoardPanel>
          </div>

          {/* Tarjeta 2: Gráficos 3D */}
          <div className="col-span-4 flex flex-col h-full">
            <BoardPanel
              tag="DOMINIO 2: CGI & MOTORES"
              title="Computación Gráfica 3D"
              topic="vectors"
              accentColor="#FBBF24"
              className="h-full"
            >
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                Cada vértice de un modelo 3D en Unreal Engine o Blender es un vector de posición; las normales de iluminación determinan el sombreado realista.
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center">
                <Equation latex="\vec{N} = \frac{\vec{u} \times \vec{v}}{\|\vec{u} \times \vec{v}\|}" fontSize="text-xs" block={false} />
              </div>
            </BoardPanel>
          </div>

          {/* Tarjeta 3: Inteligencia Artificial */}
          <div className="col-span-4 flex flex-col h-full">
            <BoardPanel
              tag="DOMINIO 3: IA & BIG DATA"
              title="Embeddings & Espacios Latentes"
              topic="vectors"
              accentColor="#34D399"
              className="h-full"
            >
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                En modelos de lenguaje como GPT o Gemini, las palabras y conceptos son vectores de alta dimensión (ej. R¹⁵³⁶) comparados mediante similitud coseno.
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center">
                <Equation latex="\text{Sim}(A, B) = \frac{\vec{A} \cdot \vec{B}}{\|\vec{A}\| \|\vec{B}\|}" fontSize="text-xs" block={false} />
              </div>
            </BoardPanel>
          </div>
        </div>
      </Sequence>
    </DynamicBoardLayout>
  );
};
