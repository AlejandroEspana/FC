import React from "react";
import { Sequence } from "remotion";
import { SafeZone } from "../../../core/layout/SafeZone";
import { ChapterHeader } from "../../../core/layout/ChapterHeader";
import { FormulaDeconstruction } from "../../../components/math/FormulaDeconstruction";
import { CrossProduct3D } from "../../../components/geometry3d/CrossProduct3D";
import { DefinitionCard } from "../../../components/cards/DefinitionCard";
import { ErrorCard } from "../../../components/cards/ErrorCard";
import { MathFormula } from "../../../components/math/MathFormula";
import { VECTORS_CONTENT } from "../content";

export const Cap07_CrossProduct3D: React.FC = () => {
  const content = VECTORS_CONTENT.cap07_cross_product;

  return (
    <SafeZone>
      <ChapterHeader
        courseTitle={VECTORS_CONTENT.courseTitle}
        chapterNumber="07"
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        {/* Sección 1: Definición Formal con Determinante 3x3 (0 a 360 frames) */}
        <Sequence from={0} durationInFrames={360} name="DeterminanteProductoCruz">
          <FormulaDeconstruction
            formula={content.crossFormula.formula}
            title={content.crossFormula.title}
            subtitle={content.crossFormula.subtitle}
            components={content.crossFormula.components}
          />
        </Sequence>

        {/* Sección 2: Desarrollo Analítico por Menores de Laplace (360 a 700 frames) */}
        <Sequence from={360} durationInFrames={340} name="DesarrolloLaplace">
          <FormulaDeconstruction
            formula={content.crossExpansion.formula}
            title={content.crossExpansion.title}
            subtitle={content.crossExpansion.subtitle}
            components={content.crossExpansion.components}
          />
        </Sequence>

        {/* Sección 3: Visualización Tridimensional Three.js con Órbita (700 a 1180 frames) */}
        <Sequence from={700} durationInFrames={480} name="Visualizacion3DThreeJS">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            {/* Lienzo 3D interactivo animado */}
            <div className="col-span-6 flex flex-col items-center justify-center">
              <CrossProduct3D width={620} height={400} />
            </div>

            {/* Explicación de la Regla de la Mano Derecha y Área */}
            <div className="col-span-6 flex flex-col gap-4 p-8 bg-[#121829]/60 rounded-2xl border border-[#1E2942]">
              <div>
                <span className="text-xs uppercase font-bold text-[#FACC15] tracking-widest">
                  Geometría Espacial en R³
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Regla de la Mano Derecha y Área
                </h3>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942]">
                  <span className="text-xs text-[#FACC15] font-bold block mb-1">
                    1. Sentido Espacial (Convención Dextrógira):
                  </span>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Apuntando los 4 dedos desde <strong className="text-[#38BDF8]">a</strong> hacia{" "}
                    <strong className="text-[#FACC15]">b</strong> doblando la palma, el pulgar extendido señala la
                    dirección inequívoca del vector <strong className="text-[#34D399]">w = a × b</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942]">
                  <span className="text-xs text-[#38BDF8] font-bold block mb-1">
                    2. Magnitud = Área del Paralelogramo:
                  </span>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    El plano sombreado en la vista 3D tiene una superficie exactamente igual a:
                  </p>
                  <div className="mt-2">
                    <MathFormula math="|\vec{a} \times \vec{b}| = |\vec{a}| |\vec{b}| \sin(\theta) = \text{Área}" fontSize="text-sm" block={false} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 flex items-center justify-between">
                  <span className="text-xs text-[#34D399] font-bold uppercase">Ortogonalidad Doble:</span>
                  <MathFormula math="\vec{w} \cdot \vec{a} = 0 \quad \land \quad \vec{w} \cdot \vec{b} = 0" fontSize="text-sm" block={false} />
                </div>
              </div>
            </div>
          </div>
        </Sequence>

        {/* Sección 4: Anticonmutatividad y Error Común (1180 a 1540 frames) */}
        <Sequence from={1180} durationInFrames={360} name="Anticonmutatividad">
          <div className="grid grid-cols-12 gap-8 w-full items-start">
            <div className="col-span-6 flex flex-col gap-4">
              <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest">
                Propiedad Anticonmutativa y Torque
              </span>
              <DefinitionCard
                title="Anticonmutatividad Estricta"
                category="Álgebra No Abeliana"
                accentColor="#38BDF8"
              >
                <p className="text-base text-[#CBD5E1] leading-relaxed">
                  Invertir el orden de los vectores en el producto cruz invierte el sentido de rotación según la regla de la mano derecha, multiplicando el vector por -1. En física clásica define el Momento de Fuerza o Torque: {"\\(\\vec{\\tau} = \\vec{r} \\times \\vec{F}\\)"}.
                </p>
                <div className="mt-4 p-4 rounded-xl bg-[#0A0D18] border border-[#38BDF8]/30 flex items-center justify-center">
                  <MathFormula math="\vec{a} \times \vec{b} = -(\vec{b} \times \vec{a})" fontSize="2xl" />
                </div>
              </DefinitionCard>
            </div>

            <div className="col-span-6 flex flex-col gap-4">
              <span className="text-xs uppercase font-bold text-[#F43F5E] tracking-widest">
                Falacia de Conmutatividad
              </span>
              <ErrorCard
                errorStatement={content.errorCase.wrong}
                correction={content.errorCase.correct}
                why={content.errorCase.why}
              />
            </div>
          </div>
        </Sequence>
      </div>

      <footer className="w-full flex justify-between text-xs text-[#64748B] pt-2 border-t border-[#1E2942]/60">
        <span>Capítulo 07: Producto Cruz en 3D</span>
        <span>Duración: 25.6 segundos (1540 frames @ 60 FPS)</span>
      </footer>
    </SafeZone>
  );
};
