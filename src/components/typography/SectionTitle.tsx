import React from "react";

export interface SectionTitleProps {
  tag?: string;
  title: string;
  tagColor?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  tag,
  title,
  tagColor = "#38BDF8",
}) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      {tag && (
        <span
          style={{ color: tagColor }}
          className="text-xs font-bold uppercase tracking-widest font-mono"
        >
          {tag}
        </span>
      )}
      <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
    </div>
  );
};
