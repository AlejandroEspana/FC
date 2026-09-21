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
        backgroundColor: theme.panelBg,
        borderColor: `${color}40`,
        boxShadow: `0 12px 32px rgba(0, 0, 0, 0.45), 0 0 24px ${color}15`,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      className={`rounded-2xl border backdrop-blur-md flex flex-col justify-between overflow-hidden relative ${className}`}
    >
      {/* Barra superior de acento con color */}
      <div
        className="h-1 w-full shrink-0"
        style={{ backgroundColor: color }}
      />

      {/* Encabezado del Panel si tiene título o tag */}
      {(title || tag) && (
        <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5">
            {tag && (
              <span
                style={{
                  backgroundColor: `${color}18`,
                  borderColor: `${color}45`,
                  color: color,
                }}
                className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border tracking-wider"
              >
                {tag}
              </span>
            )}
            {title && (
              <h3 className="text-base font-bold text-white tracking-tight">
                {title}
              </h3>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </div>
      )}

      {/* Cuerpo de Contenido */}
      <div className="p-5 flex-1 flex flex-col justify-center overflow-hidden">
        {children}
      </div>

      {/* Pie del Panel opcional */}
      {footer && (
        <div className="px-5 py-2.5 bg-black/25 border-t border-white/5 text-xs text-slate-300 shrink-0">
          {footer}
        </div>
      )}
    </div>
  );
};
