import React from "react";
import { Badge } from "./Badge";

export interface ChapterTitleProps {
  courseTitle: string;
  chapterNumber: string;
  title: string;
  subtitle?: string;
}

export const ChapterTitle: React.FC<ChapterTitleProps> = ({
  courseTitle,
  chapterNumber,
  title,
  subtitle,
}) => {
  return (
    <div className="w-full flex items-center justify-between pb-4 border-b border-[#1E2942]/80 mb-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Badge text={courseTitle} color="#38BDF8" />
          <span className="text-xs font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
            Capítulo {chapterNumber}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">{title}</h1>
      </div>

      {subtitle && (
        <div className="px-4 py-2 rounded-xl bg-[#121829] border border-[#1E2942] text-xs text-[#94A3B8] max-w-md text-right">
          {subtitle}
        </div>
      )}
    </div>
  );
};
