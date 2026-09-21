import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { DefinitionCard } from "../../../components/common/DefinitionCard";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { Equation } from "../../../components/equations/Equation";
import { Sequence } from "remotion";
import { VECTORS_COURSE } from "../content/data";

export const Cap01_Preconcepts: React.FC = () => {
  const meta = VECTORS_COURSE.cap01_preconcepts;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="01"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="w-full flex flex-col justify-center items-center">
        <Sequence from={0} durationInFrames={300} name="EspacioEuclideoDef">
          <DefinitionCard
            title={meta.definition.title}
            category={meta.definition.category}
            accentColor={meta.definition.accentColor}
          >
            <p className="text-base text-[#CBD5E1] leading-relaxed">
              {meta.definition.text}
            </p>
            {meta.definition.formula && (
              <div className="mt-4 p-4 rounded-xl bg-[#0A0D18] border border-[#38BDF8]/30 flex items-center justify-center">
                <Equation latex={meta.definition.formula} fontSize="text-2xl" />
              </div>
            )}
          </DefinitionCard>
        </Sequence>

        <Sequence from={300} durationInFrames={300} name="TrigonometriaDesglose">
          <FormulaDeconstruction
            formula={meta.trigFormula.formula}
            title={meta.trigFormula.title}
            subtitle={meta.trigFormula.subtitle}
            components={meta.trigFormula.components}
          />
        </Sequence>
      </div>
    </ChapterComposition>
  );
};
