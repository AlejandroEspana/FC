import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { MatrixMultiplicationStep } from "../../../components/matrices/MatrixMultiplicationStep";
import { Sequence } from "remotion";
import { MATRICES_COURSE } from "../content/data";

export const Cap05_MultiplicationAlgorithm: React.FC = () => {
  const meta = MATRICES_COURSE.cap05_multiplication_algorithm;

  return (
    <ChapterComposition
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="05"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="w-full flex flex-col justify-center items-center">
        {/* Paso 1: Fila 1 x Columna 1 -> c_11 */}
        <Sequence from={0} durationInFrames={375} name="CalculoC11">
          <MatrixMultiplicationStep
            A={meta.matrixA}
            B={meta.matrixB}
            C={meta.matrixC}
            currentRow={0}
            currentCol={0}
          />
        </Sequence>

        {/* Paso 2: Fila 2 x Columna 1 -> c_21 */}
        <Sequence from={375} durationInFrames={375} name="CalculoC21">
          <MatrixMultiplicationStep
            A={meta.matrixA}
            B={meta.matrixB}
            C={meta.matrixC}
            currentRow={1}
            currentCol={0}
          />
        </Sequence>
      </div>
    </ChapterComposition>
  );
};
