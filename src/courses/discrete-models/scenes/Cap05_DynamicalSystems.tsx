import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { DefinitionCard } from "../../../components/common/DefinitionCard";
import { Equation } from "../../../components/equations/Equation";
import { DISCRETE_COURSE } from "../content/data";

export const Cap05_DynamicalSystems: React.FC = () => {
  const meta = DISCRETE_COURSE.cap05_dynamical_systems;

  return (
    <ChapterComposition
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="05"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="flex flex-col items-center max-w-4xl w-full">
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
              <Equation latex={meta.definition.formula} fontSize="text-xl" />
            </div>
          )}
        </DefinitionCard>
      </div>
    </ChapterComposition>
  );
};
