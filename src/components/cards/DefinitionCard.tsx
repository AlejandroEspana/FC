import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BookOpen } from "lucide-react";

interface DefinitionCardProps {
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
      className="w-full max-w-4xl mx-auto p-8 rounded-2xl bg-[#121829]/90 border shadow-2xl relative overflow-hidden backdrop-blur-md"
    >
      <div
        style={{ backgroundColor: accentColor }}
        className="absolute top-0 left-0 right-0 h-1.5 opacity-80"
      />

      <div className="flex items-center gap-3 mb-4">
        <div
          style={{ backgroundColor: `${accentColor}20`, borderColor: `${accentColor}50` }}
          className="p-2 rounded-lg border text-white"
        >
          <BookOpen className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div>
          <span style={{ color: accentColor }} className="text-xs uppercase font-bold tracking-wider">
            {category}
          </span>
          <h3 className="text-2xl font-extrabold text-white">{title}</h3>
        </div>
      </div>

      <div className="text-base text-[#CBD5E1] leading-relaxed font-sans space-y-3">
        {children}
      </div>
    </div>
  );
};
