import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { StepByStepSolution } from "../../../components/common/StepByStepSolution";
import { MATRICES_COURSE } from "../content/data";

export const Cap10_ExercisesSummary: React.FC = () => {
  const meta = MATRICES_COURSE.cap10_exercises_summary;

  return (
    <ChapterComposition
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="10"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="w-full max-w-4xl">
        <StepByStepSolution exercise={meta.exercise1} />
      </div>
    </ChapterComposition>
  );
};
