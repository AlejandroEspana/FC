import React from "react";
import { Sequence } from "remotion";
import { ChapterMeta } from "../content/types";

export interface CourseChapterItem {
  meta: ChapterMeta;
  component: React.ComponentType;
}

export interface CourseCompositionProps {
  chapters: CourseChapterItem[];
}

export const CourseComposition: React.FC<CourseCompositionProps> = ({ chapters }) => {
  let accumulatedStart = 0;

  return (
    <div className="w-full h-full bg-[#070A12]">
      {chapters.map((ch, idx) => {
        const start = accumulatedStart;
        accumulatedStart += ch.meta.durationFrames;
        const ChapterComp = ch.component;

        return (
          <Sequence
            key={ch.meta.id}
            from={start}
            durationInFrames={ch.meta.durationFrames}
            name={`Cap_${ch.meta.number}_${ch.meta.id}`}
          >
            <ChapterComp />
          </Sequence>
        );
      })}
    </div>
  );
};
