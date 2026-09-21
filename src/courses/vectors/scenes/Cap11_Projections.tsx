import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { VECTORS_COURSE } from "../content/data";

export const Cap11_Projections: React.FC = () => {
  const meta = VECTORS_COURSE.cap11_projections;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="11"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <FormulaDeconstruction
        formula={meta.projFormula.formula}
        title={meta.projFormula.title}
        subtitle={meta.projFormula.subtitle}
        components={meta.projFormula.components}
      />
    </ChapterComposition>
  );
};
