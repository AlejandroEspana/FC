import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { DISCRETE_COURSE } from "../content/data";

export const Cap02_Recurrences: React.FC = () => {
  const meta = DISCRETE_COURSE.cap02_recurrences;

  return (
    <ChapterComposition
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="02"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <FormulaDeconstruction
        formula={meta.recurrenceFormula.formula}
        title={meta.recurrenceFormula.title}
        subtitle={meta.recurrenceFormula.subtitle}
        components={meta.recurrenceFormula.components}
      />
    </ChapterComposition>
  );
};
