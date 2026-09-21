/**
 * src/components/board/BoardPanel.tsx
 * Panel modular de información para el Tablero Dinámico.
 * Entra con animación física spring escalonada (staggered),
 * posee bordes luminosos y garantiza que su contenido interior no desborde.
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CourseTopic, getTopicTheme } from "../../theme/boardTheme";

export interface BoardPanelProps {
  title?: string;
  tag?: string;
  topic?: CourseTopic;
  accentColor?: string;
  delay?: number; // Frames de retardo para entrada escalonada
  width?: string | number;
  height?: string | number;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const BoardPanel: React.FC<BoardPanelProps> = ({
  title,
  tag,
  topic = "vectors",
  accentColor,
  delay = 0,
  width,
  height,
  children,
  footer,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = getTopicTheme(topic);
  const color = accentColor || theme.primary;

  const anim = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  const translateY = interpolate(anim, [0, 1], [18, 0]);
  const opacity = interpolate(anim, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        backgroundColor: "#FFFFFF",
        borderColor: `${color}35`,
        boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04), 0 0 16px ${color}10`,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      className={`rounded-2xl border flex flex-col justify-between overflow-hidden relative shadow-md ${className}`}
    >
      {/* Barra superior de acento con color temático */}
      <div
        className="h-1.5 w-full shrink-0"
        style={{ backgroundColor: color }}
      />

      {/* Encabezado del Panel si tiene título o tag */}
      {(title || tag) && (
        <div className="px-5 pt-3.5 pb-2.5 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            {tag && (
              <span
                style={{
                  backgroundColor: `${color}15`,
                  borderColor: `${color}40`,
                  color: color,
                }}
                className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full border tracking-wider"
              >
                {tag}
              </span>
            )}
            {title && (
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                {title}
              </h3>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-200" />
            <span className="w-2 h-2 rounded-full bg-slate-200" />
          </div>
        </div>
      )}

      {/* Cuerpo de Contenido */}
      <div className="p-5 flex-1 flex flex-col justify-center overflow-hidden text-slate-800">
        {children}
      </div>

      {/* Pie del Panel opcional */}
      {footer && (
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 font-medium shrink-0">
          {footer}
        </div>
      )}
    </div>
  );
};
