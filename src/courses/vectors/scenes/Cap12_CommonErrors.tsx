import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { ErrorCard } from "../../../components/common/ErrorCard";
import { VECTORS_COURSE } from "../content/data";

export const Cap12_CommonErrors: React.FC = () => {
  const meta = VECTORS_COURSE.cap12_common_errors;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="12"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="flex flex-col items-center max-w-4xl w-full">
        <ErrorCard
          errorStatement={meta.error1.wrong}
          correction={meta.error1.correct}
          why={meta.error1.why}
        />
      </div>
    </ChapterComposition>
  );
};
