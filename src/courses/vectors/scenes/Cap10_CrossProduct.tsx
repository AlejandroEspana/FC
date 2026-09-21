import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { FormulaDeconstruction } from "../../../components/equations/FormulaDeconstruction";
import { Vector3D } from "../../../components/vectors/Vector3D";
import { Sequence } from "remotion";
import { VECTORS_COURSE } from "../content/data";

export const Cap10_CrossProduct: React.FC = () => {
  const meta = VECTORS_COURSE.cap10_cross_product;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="10"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="w-full flex flex-col justify-center items-center">
        <Sequence from={0} durationInFrames={380} name="ProductoCruzFormula">
          <FormulaDeconstruction
            formula={meta.crossFormula.formula}
            title={meta.crossFormula.title}
            subtitle={meta.crossFormula.subtitle}
            components={meta.crossFormula.components}
          />
        </Sequence>

        <Sequence from={380} durationInFrames={470} name="Visualizacion3DThreeJS">
          <div className="flex flex-col items-center">
            <Vector3D width={640} height={400} />
          </div>
        </Sequence>
      </div>
    </ChapterComposition>
  );
};
