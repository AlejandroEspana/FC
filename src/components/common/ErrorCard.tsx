import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";

export interface ErrorCardProps {
  errorStatement: string;
  correction: string;
  why: string;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({
  errorStatement,
  correction,
  why,
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

  return (
    <div
      style={{ opacity, transform: `scale(${interpolate(spr, [0, 1], [0.96, 1])})` }}
      className="w-full max-w-4xl mx-auto p-8 rounded-2xl bg-[#121829]/95 border border-[#F87171]/40 shadow-2xl relative overflow-hidden backdrop-blur-md"
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F87171]" />

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-[#F87171]/20 border border-[#F87171]/40 text-[#F87171]">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#F87171]">
            Error Frecuente & Concepto Erróneo
          </span>
          <h3 className="text-xl font-bold text-white">Cuidado con esta asunción falsa</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        {/* Error */}
        <div className="p-4 rounded-xl bg-[#0A0D18]/80 border border-[#F87171]/30 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-[#F87171] shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-[#F87171] uppercase tracking-wider block mb-1">
              Afirmación Incorrecta
            </span>
            <p className="text-sm text-[#F8FAFC] font-medium font-sans">{errorStatement}</p>
          </div>
        </div>

        {/* Corrección */}
        <div className="p-4 rounded-xl bg-[#0A0D18]/80 border border-[#34D399]/30 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#34D399] shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-[#34D399] uppercase tracking-wider block mb-1">
              Realidad Matemática
            </span>
            <p className="text-sm text-[#F8FAFC] font-medium font-sans">{correction}</p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#1E2942]/40 border border-[#1E2942] text-sm text-[#CBD5E1] leading-relaxed font-sans">
        <strong className="text-white block mb-1">¿Por qué ocurre este error?</strong>
        {why}
      </div>
    </div>
  );
};
