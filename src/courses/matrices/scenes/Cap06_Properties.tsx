import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { BulletList } from "../../../components/common/BulletList";
import { MATRICES_COURSE } from "../content/data";

export const Cap06_Properties: React.FC = () => {
  const meta = MATRICES_COURSE.cap06_properties;

  return (
    <ChapterComposition
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="06"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="flex flex-col items-center max-w-4xl w-full">
        <BulletList items={meta.bullets} />
      </div>
    </ChapterComposition>
  );
};
