import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { MATRICES_COURSE } from "../content/data";

export const Cap03_Operations: React.FC = () => {
  const meta = MATRICES_COURSE.cap03_operations;

  return (
    <ChapterComposition
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="03"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <FormulaDeconstruction
        formula={meta.sumFormula.formula}
        title={meta.sumFormula.title}
        subtitle={meta.sumFormula.subtitle}
        components={meta.sumFormula.components}
      />
    </ChapterComposition>
  );
};
