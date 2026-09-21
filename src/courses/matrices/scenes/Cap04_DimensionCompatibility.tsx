import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { MATRICES_COURSE } from "../content/data";

export const Cap04_DimensionCompatibility: React.FC = () => {
  const meta = MATRICES_COURSE.cap04_dimension_compatibility;

  return (
    <ChapterComposition
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="04"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <FormulaDeconstruction
        formula={meta.compatFormula.formula}
        title={meta.compatFormula.title}
        subtitle={meta.compatFormula.subtitle}
        components={meta.compatFormula.components}
      />
    </ChapterComposition>
  );
};
