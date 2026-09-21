import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { Vector2D } from "../../../components/vectors/Vector2D";
import { Equation } from "../../../components/equations/Equation";
import { Sequence } from "remotion";
import { VECTORS_COURSE } from "../content/data";

export const Cap07_Direction: React.FC = () => {
  const meta = VECTORS_COURSE.cap07_direction;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="07"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="w-full flex flex-col justify-center items-center">
        <Sequence from={0} durationInFrames={350} name="VectorUnitarioFormula">
          <FormulaDeconstruction
            formula={meta.unitFormula.formula}
            title={meta.unitFormula.title}
            subtitle={meta.unitFormula.subtitle}
            components={meta.unitFormula.components}
          />
        </Sequence>

        <Sequence from={350} durationInFrames={350} name="NormalizacionGrafica">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            <div className="col-span-5 flex flex-col items-center justify-center p-6 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-wider mb-2 font-mono">
                Normalización sobre Círculo Unitario
              </span>
              <CoordinatePlane width={460} height={340} xRange={[-1.2, 4.2]} yRange={[-1.2, 4.2]}>
                <Vector2D from={[0, 0]} to={[3, 4]} color="#FACC15" label="v = (3, 4)" strokeWidth={3.5} />
                <Vector2D from={[0, 0]} to={[0.6, 0.8]} color="#34D399" label="u = (0.6, 0.8)" delay={25} strokeWidth={5} />
              </CoordinatePlane>
            </div>

            <div className="col-span-7 flex flex-col gap-4 p-8 bg-[#121829]/70 rounded-2xl border border-[#1E2942]">
              <span className="text-xs uppercase font-bold text-[#34D399] tracking-widest font-mono">
                Propiedad del Versor Unitario
              </span>
              <h3 className="text-2xl font-bold text-white">
                Dirección pura con norma exactamente igual a 1
              </h3>
              <div className="space-y-3 font-mono">
                <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex justify-between items-center">
                  <span className="text-xs text-[#94A3B8]">Norma del vector base:</span>
                  <Equation latex="|\vec{v}| = 5" fontSize="text-base" block={false} />
                </div>
                <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex justify-between items-center">
                  <span className="text-xs text-[#94A3B8]">Versor normalizado:</span>
                  <Equation latex="\hat{u} = (3/5, 4/5) = (0.6, 0.8)" fontSize="text-base" block={false} />
                </div>
                <div className="p-3.5 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/40 flex justify-between items-center">
                  <span className="text-xs text-[#38BDF8] font-bold uppercase">Comprobación:</span>
                  <Equation latex="|\hat{u}| = \sqrt{0.6^2 + 0.8^2} = 1" fontSize="text-xl" block={false} />
                </div>
              </div>
            </div>
          </div>
        </Sequence>
      </div>
    </ChapterComposition>
  );
};
