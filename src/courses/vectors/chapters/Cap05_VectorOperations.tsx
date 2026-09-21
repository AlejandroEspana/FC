import React from "react";
import { Sequence } from "remotion";
import { SafeZone } from "../../../core/layout/SafeZone";
import { ChapterHeader } from "../../../core/layout/ChapterHeader";
import { FormulaDeconstruction } from "../../../components/math/FormulaDeconstruction";
import { VectorSumGraph } from "../../../components/geometry2d/VectorSumGraph";
import { VectorSubtractionGraph } from "../../../components/geometry2d/VectorSubtractionGraph";
import { ScalarMultGraph } from "../../../components/geometry2d/ScalarMultGraph";
import { BulletList } from "../../../components/cards/BulletList";
import { ErrorCard } from "../../../components/cards/ErrorCard";
import { MathFormula } from "../../../components/math/MathFormula";
import { VECTORS_CONTENT } from "../content";

export const Cap05_VectorOperations: React.FC = () => {
  const content = VECTORS_CONTENT.cap05_operations;

  return (
    <SafeZone>
      <ChapterHeader
        courseTitle={VECTORS_CONTENT.courseTitle}
        chapterNumber="05"
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        {/* Sección 1: Suma Geométrica Punta-Cola (0 a 360 frames) */}
        <Sequence from={0} durationInFrames={360} name="SumaPuntaCola">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            <div className="col-span-6 flex flex-col items-center justify-center p-4 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <span className="text-xs uppercase font-bold text-[#34D399] tracking-wider mb-2 self-start">
                Método Gráfico de la Punta y la Cola
              </span>
              <VectorSumGraph u={[3, 1]} v={[1.5, 2.5]} />
            </div>

            <div className="col-span-6 flex flex-col gap-4 p-8 bg-[#121829]/60 rounded-2xl border border-[#1E2942]">
              <div>
                <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest">
                  Principio de Superposición
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Suma Consecutiva de Desplazamientos
                </h3>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942]">
                  <span className="text-xs text-[#94A3B8] block mb-1">Regla Constructiva:</span>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    1. Se dibuja el primer vector <span className="font-bold text-[#38BDF8]">u</span> en su posición.
                    <br />
                    2. Se traslada rígidamente el origen de <span className="font-bold text-[#FACC15]">v</span> hasta la punta de <span className="font-bold text-[#38BDF8]">u</span>.
                    <br />
                    3. La resultante <span className="font-bold text-[#34D399]">w</span> nace en el origen del primero y culmina en la punta del último.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#34D399]/10 border border-[#34D399]/40 flex items-center justify-between">
                  <span className="text-xs text-[#34D399] font-bold uppercase">Álgebra Componente a Componente:</span>
                  <MathFormula math="\vec{w} = (3 + 1.5,\; 1 + 2.5) = (4.5,\; 3.5)" fontSize="text-lg" block={false} />
                </div>
              </div>
            </div>
          </div>
        </Sequence>

        {/* Sección 2: Descomposición de la Fórmula de Suma (360 a 700 frames) */}
        <Sequence from={360} durationInFrames={340} name="FormulaSumaDesglosada">
          <FormulaDeconstruction
            formula={content.sumFormula.formula}
            title={content.sumFormula.title}
            subtitle={content.sumFormula.subtitle}
            components={content.sumFormula.components}
          />
        </Sequence>

        {/* Sección 3: Resta Vectorial y Desplazamiento Relativo (700 a 1060 frames) */}
        <Sequence from={700} durationInFrames={360} name="RestaVectorial">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            <div className="col-span-6 flex flex-col items-center justify-center p-4 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <span className="text-xs uppercase font-bold text-[#F43F5E] tracking-wider mb-2 self-start">
                Doble Interpretación Geométrica de la Resta
              </span>
              <VectorSubtractionGraph u={[4, 2]} v={[1.5, 3]} />
            </div>

            <div className="col-span-6 flex flex-col gap-4 p-8 bg-[#121829]/60 rounded-2xl border border-[#1E2942]">
              <div>
                <span className="text-xs uppercase font-bold text-[#F43F5E] tracking-widest">
                  Desplazamiento Relativo
                </span>
                <div className="mt-1">
                  <MathFormula math="\vec{u} - \\vec{v} = \\vec{u} + (-\\vec{v})" fontSize="text-2xl" block={false} />
                </div>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942]">
                  <span className="text-xs text-[#FB923C] font-bold block mb-1">1. Enfoque del Vector Opuesto (-v):</span>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Se multiplica el sustraendo por -1, invirtiendo su sentido 180°, y se procede con una suma ordinaria.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942]">
                  <span className="text-xs text-[#F43F5E] font-bold block mb-1">2. Enfoque Punta a Punta (Cinemática Relativa):</span>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    El vector diferencia une directamente la punta de <strong className="text-[#FACC15]">v</strong> con la punta de <strong className="text-[#38BDF8]">u</strong>. Representa el desplazamiento que debe hacer un observador en v para alcanzar a u.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-between">
                  <span className="text-xs text-[#F43F5E] font-bold">Cálculo numérico:</span>
                  <MathFormula math="\vec{d} = (4 - 1.5,\; 2 - 3) = (2.5,\; -1.0)" fontSize="text-lg" block={false} />
                </div>
              </div>
            </div>
          </div>
        </Sequence>

        {/* Sección 4: Escalamiento / Homotecia Continua (1060 a 1420 frames) */}
        <Sequence from={1060} durationInFrames={360} name="MultiplicacionEscalar">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            <div className="col-span-6 flex flex-col items-center justify-center p-4 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <span className="text-xs uppercase font-bold text-[#A78BFA] tracking-wider mb-2 self-start">
                Comportamiento Dinámico del Escalar Real (c)
              </span>
              <ScalarMultGraph />
            </div>

            <div className="col-span-6 flex flex-col gap-4 p-8 bg-[#121829]/60 rounded-2xl border border-[#1E2942]">
              <div>
                <span className="text-xs uppercase font-bold text-[#A78BFA] tracking-widest">
                  Álgebra de la Homotecia
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Multiplicación de un Vector por un Escalar
                </h3>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex justify-between items-center">
                  <span className="text-[#34D399] font-bold">|c| &gt; 1 (Dilatación)</span>
                  <span className="text-slate-400 font-sans">Alarga el vector conservando la recta</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex justify-between items-center">
                  <span className="text-[#FACC15] font-bold">0 &lt; |c| &lt; 1 (Contracción)</span>
                  <span className="text-slate-400 font-sans">Comprime la longitud del vector</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex justify-between items-center">
                  <span className="text-[#F43F5E] font-bold">c &lt; 0 (Inversión)</span>
                  <span className="text-slate-400 font-sans">Voltea el sentido en 180° sobre la misma directriz</span>
                </div>
                <div className="p-3 rounded-xl bg-[#94A3B8]/10 border border-[#94A3B8]/30 flex justify-between items-center">
                  <span className="text-white font-bold">c = 0 (Vector Nulo)</span>
                  <MathFormula math="0 \cdot \vec{v} = \vec{0} = (0, 0)" fontSize="text-sm" block={false} />
                </div>
              </div>
            </div>
          </div>
        </Sequence>

        {/* Sección 5: Propiedades del Espacio Vectorial y Error Común (1420 a 1800 frames) */}
        <Sequence from={1420} durationInFrames={380} name="PropiedadesYError">
          <div className="grid grid-cols-12 gap-8 w-full items-start">
            <div className="col-span-6 flex flex-col gap-4">
              <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest">
                Axiomas de Espacio Vectorial
              </span>
              <BulletList items={content.properties} />
            </div>

            <div className="col-span-6 flex flex-col gap-4">
              <span className="text-xs uppercase font-bold text-[#F43F5E] tracking-widest">
                Prevención de Falacias Frecuentes
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
        <span>Capítulo 05: Operaciones Vectoriales</span>
        <span>Duración: 30.0 segundos (1800 frames @ 60 FPS)</span>
      </footer>
    </SafeZone>
  );
};
