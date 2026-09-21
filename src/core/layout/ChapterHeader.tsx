import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ChapterHeaderProps {
  courseTitle?: string;
  chapterNumber?: string | number;
  title: string;
  subtitle?: string;
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({
  courseTitle = "Vectores en Física y Matemáticas",
  chapterNumber,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [-40, 0]);

  return (
    <header
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
      className="w-full flex items-center justify-between pb-4 border-b border-[#1E2942] z-50 mb-6"
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-[#38BDF8] font-bold bg-[#121829] px-2.5 py-1 rounded border border-[#1E2942]">
            {courseTitle}
          </span>
          {chapterNumber && (
            <span className="text-xs uppercase tracking-wider text-[#94A3B8]">
              Capítulo {chapterNumber}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          {title}
        </h1>
      </div>

      {subtitle && (
        <div className="text-right">
          <span className="text-sm font-medium text-[#94A3B8] bg-[#121829]/60 px-3 py-1.5 rounded-lg border border-[#1E2942]/80">
            {subtitle}
          </span>
        </div>
      )}
    </header>
  );
};
