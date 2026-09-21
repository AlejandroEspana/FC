import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";

interface ErrorCardProps {
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
      className="w-full max-w-4xl mx-auto p-8 rounded-2xl bg-white border border-rose-200 shadow-lg relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-500" />

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-rose-600 font-mono">
            Error Frecuente & Concepto Erróneo
          </span>
          <h3 className="text-xl font-bold text-slate-900">Cuidado con esta asunción falsa</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        {/* Error */}
        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block mb-1">
              Afirmación Incorrecta
            </span>
            <p className="text-sm text-slate-800 font-medium">{errorStatement}</p>
          </div>
        </div>

        {/* Corrección */}
        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Realidad Matemática
            </span>
            <p className="text-sm text-slate-800 font-medium">{correction}</p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
        <strong className="text-slate-900 block mb-1">¿Por qué ocurre este error?</strong>
        {why}
      </div>
    </div>
  );
};
