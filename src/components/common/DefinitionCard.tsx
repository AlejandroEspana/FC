import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BookOpen } from "lucide-react";

export interface DefinitionCardProps {
  title: string;
  category?: string;
  children: React.ReactNode;
  accentColor?: string;
}

export const DefinitionCard: React.FC<DefinitionCardProps> = ({
  title,
  category = "Definición Formal",
  children,
  accentColor = "#38BDF8",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(spr, [0, 1], [0.95, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        borderColor: `${accentColor}40`,
      }}
      className="w-full max-w-4xl mx-auto p-8 rounded-2xl bg-white border border-slate-200 shadow-lg relative overflow-hidden"
    >
      <div
        style={{ backgroundColor: accentColor }}
        className="absolute top-0 left-0 right-0 h-1.5 opacity-90"
      />

      <div className="flex items-center gap-3 mb-4">
        <div
          style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}40` }}
          className="p-2.5 rounded-xl border text-slate-800"
        >
          <BookOpen className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div>
          <span style={{ color: accentColor }} className="text-xs uppercase font-bold tracking-wider">
            {category}
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900">{title}</h3>
        </div>
      </div>

      <div className="text-base text-slate-700 leading-relaxed font-sans space-y-3">
        {children}
      </div>
    </div>
  );
};
