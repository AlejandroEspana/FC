import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SplitScreen } from "../../core/layout/SplitScreen";
import { MathFormula } from "./MathFormula";

export interface FormulaComponentItem {
  symbol: string;
  name: string;
  color: string;
  description: string;
  delayFrames?: number;
}

interface FormulaDeconstructionProps {
  formula: string;
  title?: string;
  subtitle?: string;
  components: FormulaComponentItem[];
  formulaFontSize?: string;
}

export const FormulaDeconstruction: React.FC<FormulaDeconstructionProps> = ({
  formula,
  title,
  subtitle,
  components,
  formulaFontSize = "text-4xl",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftContent = (
    <div className="flex flex-col items-center justify-center text-center gap-6 w-full">
      {title && (
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-[#38BDF8] font-bold px-3 py-1 rounded bg-[#1E2942]/70 border border-[#38BDF8]/30 mb-2">
            Fórmula Fundamental
          </span>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {subtitle && (
            <p className="text-sm text-[#94A3B8] mt-1">{subtitle}</p>
          )}
        </div>
      )}

      <div className="p-8 bg-[#0A0D18]/90 rounded-2xl border border-[#38BDF8]/40 shadow-inner w-full flex items-center justify-center">
        <MathFormula math={formula} fontSize={formulaFontSize} />
      </div>

      <div className="text-xs text-[#94A3B8] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
        Desglose analítico de variables a la derecha
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col gap-3 w-full">
      <div className="text-xs uppercase tracking-wider text-[#94A3B8] font-bold mb-1">
        Componentes y Significado Matemático
      </div>

      {components.map((item, index) => {
        const delay = item.delayFrames ?? index * 18;
        const localFrame = Math.max(0, frame - delay);
        const spr = spring({
          frame: localFrame,
          fps,
          config: { damping: 15, stiffness: 120 },
        });

        const opacity = interpolate(localFrame, [0, 10], [0, 1], {
          extrapolateRight: "clamp",
        });
        const translateX = interpolate(spr, [0, 1], [30, 0]);

        return (
          <div
            key={index}
            style={{
              opacity,
              transform: `translateX(${translateX}px)`,
              borderLeftColor: item.color,
            }}
            className="flex items-start gap-4 p-4 rounded-xl bg-[#0A0D18]/80 border-l-4 border border-[#1E2942] transition-all"
          >
            {/* Badge con símbolo KaTeX en color */}
            <div
              style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}40` }}
              className="px-3 py-2 rounded-lg border flex items-center justify-center min-w-[64px]"
            >
              <MathFormula math={item.symbol} block={false} fontSize="text-xl" />
            </div>

            {/* Texto de explicación */}
            <div className="flex flex-col flex-1">
              <span style={{ color: item.color }} className="text-base font-bold">
                {item.name}
              </span>
              <p className="text-sm text-[#94A3B8] leading-relaxed mt-0.5">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return <SplitScreen left={leftContent} right={rightContent} leftSpan={5} />;
};
