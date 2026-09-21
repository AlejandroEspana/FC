import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { DISCRETE_COURSE } from "../content/data";

export const Cap01_Sequences: React.FC = () => {
  const meta = DISCRETE_COURSE.cap01_sequences;

  return (
    <ChapterComposition
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="01"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <FormulaDeconstruction
        formula={meta.notationFormula.formula}
        title={meta.notationFormula.title}
        subtitle={meta.notationFormula.subtitle}
        components={meta.notationFormula.components}
      />
    </ChapterComposition>
  );
};
