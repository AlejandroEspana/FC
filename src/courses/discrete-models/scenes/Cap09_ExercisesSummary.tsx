import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { StepByStepSolution } from "../../../components/common/StepByStepSolution";
import { DISCRETE_COURSE } from "../content/data";

export const Cap09_ExercisesSummary: React.FC = () => {
  const meta = DISCRETE_COURSE.cap09_exercises_summary;

  return (
    <ChapterComposition
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="09"
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
