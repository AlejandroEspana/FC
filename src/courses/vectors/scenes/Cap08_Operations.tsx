import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { VectorSumGraph } from "../../../components/vectors/VectorSumGraph";
import { VectorSubtractionGraph } from "../../../components/vectors/VectorSubtractionGraph";
import { ScalarMultGraph } from "../../../components/vectors/ScalarMultGraph";
import { Sequence } from "remotion";
import { VECTORS_COURSE } from "../content/data";

export const Cap08_Operations: React.FC = () => {
  const meta = VECTORS_COURSE.cap08_operations;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="08"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="w-full flex flex-col justify-center items-center">
        {/* Sec 1: Suma Punta-Cola (0..270) */}
        <Sequence from={0} durationInFrames={270} name="SumaPuntaCola">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase font-bold text-[#34D399] tracking-wider mb-2 font-mono">
              Suma Vectorial: Método Punta y Cola
            </span>
            <VectorSumGraph u={[3, 1]} v={[1.5, 2.5]} />
          </div>
        </Sequence>

        {/* Sec 2: Resta Vectorial (270..540) */}
        <Sequence from={270} durationInFrames={270} name="RestaVectorial">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase font-bold text-[#F43F5E] tracking-wider mb-2 font-mono">
              Resta Vectorial: Desplazamiento Relativo
            </span>
            <VectorSubtractionGraph u={[4, 2]} v={[1.5, 3]} />
          </div>
        </Sequence>

        {/* Sec 3: Escalamiento Homotecia (540..800) */}
        <Sequence from={540} durationInFrames={260} name="Escalamiento">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase font-bold text-[#A78BFA] tracking-wider mb-2 font-mono">
              Multiplicación por Escalar (Homotecia Continua)
            </span>
            <ScalarMultGraph />
          </div>
        </Sequence>
      </div>
    </ChapterComposition>
  );
};
