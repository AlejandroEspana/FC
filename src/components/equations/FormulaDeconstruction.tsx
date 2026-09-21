import React from "react";
import { FormulaComponent } from "../../content/types";
import { Equation } from "./Equation";

export interface FormulaDeconstructionProps {
  formula: string;
  title: string;
  subtitle?: string;
  components: FormulaComponent[];
}

export const FormulaDeconstruction: React.FC<FormulaDeconstructionProps> = ({
  formula,
  title,
  subtitle,
  components,
}) => {
  return (
    <div className="grid grid-cols-12 gap-8 w-full items-center">
      {/* Mitad izquierda: Tarjeta principal de la fórmula */}
      <div className="col-span-5 flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-200 shadow-md">
        <div className="text-center mb-6">
          <span className="text-xs uppercase font-extrabold text-blue-600 tracking-widest block mb-1 font-mono">
            Fórmula Fundamental
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h3>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-sans">{subtitle}</p>
          )}
        </div>

        <div className="w-full p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner overflow-hidden text-slate-900">
          <Equation latex={formula} fontSize="text-3xl" containerWidthPx={620} />
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Desglose analítico de variables a la derecha</span>
        </div>
      </div>

      {/* Mitad derecha: Desglose de cada componente */}
      <div className="col-span-7 flex flex-col gap-3.5">
        <span className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1 font-mono">
          Componentes y Significado Matemático
        </span>

        {components.map((c, idx) => (
          <div
            key={idx}
            style={{ borderLeftColor: c.color }}
            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 border-l-4 shadow-sm hover:bg-slate-50 transition-all"
          >
            {/* Badge KaTeX responsivo */}
            <div
              style={{
                backgroundColor: `${c.color}15`,
                borderColor: `${c.color}40`,
                color: c.color,
              }}
              className="min-w-[3.75rem] w-auto max-w-[12rem] px-3.5 py-1.5 h-14 rounded-xl border flex items-center justify-center font-bold shrink-0 text-lg font-mono shadow-inner overflow-hidden"
            >
              <Equation latex={c.symbol} fontSize="text-lg" block={false} containerWidthPx={180} />
            </div>

            {/* Nombre y descripción */}
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <span style={{ color: c.color }} className="text-sm font-bold tracking-tight">
                {c.name}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
