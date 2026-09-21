import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { MATRICES_COURSE } from "../content/data";

export const Cap01_Anatomy: React.FC = () => {
  const meta = MATRICES_COURSE.cap01_anatomy;

  return (
    <ChapterComposition
      courseTitle={MATRICES_COURSE.title}
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
