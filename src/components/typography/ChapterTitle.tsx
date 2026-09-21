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
    <div className="w-full flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Badge text={courseTitle} color="#2563EB" />
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            Capítulo {chapterNumber}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">{title}</h1>
      </div>

      {subtitle && (
        <div className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 max-w-md text-right font-medium">
          {subtitle}
        </div>
      )}
    </div>
  );
};
