/**
 * src/components/board/BoardCallout.tsx
 * Tarjeta de llamada de atención o nota técnica fijada en el Tablero Dinámico.
 * Útil para destacar axiomas, advertencias de falacias frecuentes,
 * interpretaciones físicas o aplicaciones en computación.
 */

import React from "react";
import { Equation } from "../equations/Equation";
import { CourseTopic, getTopicTheme } from "../../theme/boardTheme";

export type CalloutType = "insight" | "warning" | "physics" | "axiom" | "application";

export interface BoardCalloutProps {
  type?: CalloutType;
  topic?: CourseTopic;
  title: string;
  text: string;
  math?: string;
  badge?: string;
  className?: string;
}

export const BoardCallout: React.FC<BoardCalloutProps> = ({
  type = "insight",
  topic = "vectors",
  title,
  text,
  math,
  badge,
  className = "",
}) => {
  const theme = getTopicTheme(topic);

  let accentColor = theme.primary;
  let defaultBadge = "INSIGHT CLAVE";

  switch (type) {
    case "warning":
      accentColor = theme.warning;
      defaultBadge = "TRAMPA CONCEPTUAL";
      break;
    case "physics":
      accentColor = theme.secondary;
      defaultBadge = "SIGNIFICADO FÍSICO";
      break;
    case "axiom":
      accentColor = theme.tertiary;
      defaultBadge = "RIGOR AXIOMÁTICO";
      break;
    case "application":
      accentColor = theme.result;
      defaultBadge = "APLICACIÓN EN CÓDIGO";
      break;
    case "insight":
    default:
      accentColor = theme.primary;
      defaultBadge = "INSIGHT CLAVE";
      break;
  }

  return (
    <div
      style={{
        backgroundColor: `${accentColor}10`,
        borderColor: `${accentColor}40`,
        boxShadow: `0 4px 16px rgba(0, 0, 0, 0.3)`,
      }}
      className={`p-4 rounded-xl border flex flex-col gap-2 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span
          style={{
            backgroundColor: `${accentColor}25`,
            borderColor: `${accentColor}50`,
            color: accentColor,
          }}
          className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border tracking-wider"
        >
          {badge || defaultBadge}
        </span>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
      </div>

      <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
      <p className="text-xs text-slate-300 font-sans leading-relaxed">{text}</p>

      {math && (
        <div className="mt-1 p-2 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center">
          <Equation latex={math} fontSize="text-xs" block={false} />
        </div>
      )}
    </div>
  );
};
