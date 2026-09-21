import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { BulletList } from "../../../components/common/BulletList";
import { DISCRETE_COURSE } from "../content/data";

export const Cap08_ChaosBifurcations: React.FC = () => {
  const meta = DISCRETE_COURSE.cap08_chaos_bifurcations;

  return (
    <ChapterComposition
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="08"
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
