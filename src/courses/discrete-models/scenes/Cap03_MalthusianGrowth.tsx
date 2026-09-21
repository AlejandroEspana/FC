import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { DISCRETE_COURSE } from "../content/data";

export const Cap03_MalthusianGrowth: React.FC = () => {
  const meta = DISCRETE_COURSE.cap03_malthusian_growth;

  return (
    <ChapterComposition
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="03"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <FormulaDeconstruction
        formula={meta.malthusFormula.formula}
        title={meta.malthusFormula.title}
        subtitle={meta.malthusFormula.subtitle}
        components={meta.malthusFormula.components}
      />
    </ChapterComposition>
  );
};
