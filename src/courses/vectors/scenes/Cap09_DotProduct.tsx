import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { Vector2D } from "../../../components/vectors/Vector2D";
import { Equation } from "../../../components/equations/Equation";
import { Sequence } from "remotion";
import { VECTORS_COURSE } from "../content/data";

export const Cap09_DotProduct: React.FC = () => {
  const meta = VECTORS_COURSE.cap09_dot_product;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="09"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="w-full flex flex-col justify-center items-center">
        <Sequence from={0} durationInFrames={400} name="ProductoPuntoFormula">
          <FormulaDeconstruction
            formula={meta.dotFormula.formula}
            title={meta.dotFormula.title}
            subtitle={meta.dotFormula.subtitle}
            components={meta.dotFormula.components}
          />
        </Sequence>

        <Sequence from={400} durationInFrames={400} name="ProyeccionVisual">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            <div className="col-span-5 flex flex-col items-center justify-center p-6 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <span className="text-xs uppercase font-bold text-[#34D399] tracking-wider mb-2 font-mono">
                Proyección y Solapamiento Escalar
              </span>
              <CoordinatePlane width={460} height={340} xRange={[-0.5, 4.5]} yRange={[-0.5, 3.5]}>
                <Vector2D from={[0, 0]} to={[4, 0]} color="#38BDF8" label="u = (4, 0)" strokeWidth={4} />
                <Vector2D from={[0, 0]} to={[2, 2.5]} color="#FACC15" label="v = (2, 2.5)" strokeWidth={4} />
              </CoordinatePlane>
            </div>

            <div className="col-span-7 flex flex-col gap-4 p-8 bg-[#121829]/70 rounded-2xl border border-[#1E2942]">
              <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest font-mono">
                Cálculo Cartesiano Directo
              </span>
              <h3 className="text-2xl font-bold text-white">
                Suma de productos de componentes homólogas
              </h3>
              <div className="space-y-3 font-mono">
                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex justify-between items-center">
                  <span className="text-xs text-[#94A3B8]">Fórmula algebraica:</span>
                  <Equation latex="\vec{u} \cdot \vec{v} = u_x v_x + u_y v_y" fontSize="text-lg" block={false} />
                </div>
                <div className="p-4 rounded-xl bg-[#34D399]/10 border border-[#34D399]/40 flex justify-between items-center">
                  <span className="text-xs text-[#34D399] font-bold uppercase">Resultado Escalar:</span>
                  <Equation latex="\vec{u} \cdot \vec{v} = (4)(2) + (0)(2.5) = 8" fontSize="text-xl" block={false} />
                </div>
              </div>
            </div>
          </div>
        </Sequence>
      </div>
    </ChapterComposition>
  );
};
