import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { DISCRETE_COURSE } from "../content/data";

export const Cap04_LogisticModel: React.FC = () => {
  const meta = DISCRETE_COURSE.cap04_logistic_model;

  return (
    <ChapterComposition
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="04"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <FormulaDeconstruction
        formula={meta.logisticFormula.formula}
        title={meta.logisticFormula.title}
        subtitle={meta.logisticFormula.subtitle}
        components={meta.logisticFormula.components}
      />
    </ChapterComposition>
  );
};
