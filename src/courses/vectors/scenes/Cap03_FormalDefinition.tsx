import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { DefinitionCard } from "../../../components/common/DefinitionCard";
import { Equation } from "../../../components/equations/Equation";
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { Vector2D } from "../../../components/vectors/Vector2D";
import { VECTORS_COURSE } from "../content/data";

export const Cap03_FormalDefinition: React.FC = () => {
  const meta = VECTORS_COURSE.cap03_formal_definition;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="03"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="grid grid-cols-12 gap-8 w-full items-center">
        {/* Mitad izquierda: Tarjeta de definición axiomática */}
        <div className="col-span-7">
          <DefinitionCard
            title={meta.definition.title}
            category={meta.definition.category}
            accentColor={meta.definition.accentColor}
          >
            <p className="text-base text-[#CBD5E1] leading-relaxed">
              {meta.definition.text}
            </p>
            {meta.definition.formula && (
              <div className="mt-4 p-4 rounded-xl bg-[#0A0D18] border border-[#34D399]/30 flex items-center justify-center">
                <Equation latex={meta.definition.formula} fontSize="text-2xl" />
              </div>
            )}
          </DefinitionCard>
        </div>

        {/* Mitad derecha: Gráfica del vector en el plano */}
        <div className="col-span-5 flex flex-col items-center justify-center p-4 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
          <span className="text-xs uppercase font-bold text-[#34D399] tracking-wider mb-2 self-start font-mono">
            Vector en R²
          </span>
          <CoordinatePlane width={440} height={320} xRange={[-1, 5]} yRange={[-1, 4]}>
            <Vector2D
              from={[0, 0]}
              to={[3.5, 2.5]}
              color="#34D399"
              label="v = (3.5, 2.5)"
              showComponents={true}
              delay={10}
              strokeWidth={4.5}
            />
          </CoordinatePlane>
        </div>
      </div>
    </ChapterComposition>
  );
};
