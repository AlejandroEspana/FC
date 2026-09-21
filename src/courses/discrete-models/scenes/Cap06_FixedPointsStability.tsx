import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { DISCRETE_COURSE } from "../content/data";

export const Cap06_FixedPointsStability: React.FC = () => {
  const meta = DISCRETE_COURSE.cap06_fixed_points_stability;

  return (
    <ChapterComposition
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="06"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <FormulaDeconstruction
        formula={meta.stabilityFormula.formula}
        title={meta.stabilityFormula.title}
        subtitle={meta.stabilityFormula.subtitle}
        components={meta.stabilityFormula.components}
      />
    </ChapterComposition>
  );
};
