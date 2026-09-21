import React from "react";
import { SafeZone } from "../components/layout/SafeZone";
import { ChapterTitle } from "../components/typography/ChapterTitle";

export interface ChapterCompositionProps {
  courseTitle: string;
  chapterNumber: string;
  title: string;
  subtitle?: string;
  durationFrames: number;
  fps?: number;
  children: React.ReactNode;
}

export const ChapterComposition: React.FC<ChapterCompositionProps> = ({
  courseTitle,
  chapterNumber,
  title,
  subtitle,
  durationFrames,
  fps = 60,
  children,
}) => {
  const durationSeconds = (durationFrames / fps).toFixed(1);

  return (
    <SafeZone>
      <ChapterTitle
        courseTitle={courseTitle}
        chapterNumber={chapterNumber}
        title={title}
        subtitle={subtitle}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        {children}
      </div>

      <footer className="w-full flex justify-between text-xs text-[#64748B] pt-3 border-t border-[#1E2942]/60 font-mono">
        <span>
          Capítulo {chapterNumber}: {title}
        </span>
        <span>
          Duración: {durationSeconds}s ({durationFrames} frames @ {fps} FPS)
        </span>
      </footer>
    </SafeZone>
  );
};
