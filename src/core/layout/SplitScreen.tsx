import React from "react";

interface SplitScreenProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftSpan?: number; // 1 to 12, default 5
  className?: string;
}

export const SplitScreen: React.FC<SplitScreenProps> = ({
  left,
  right,
  leftSpan = 5,
  className = "",
}) => {
  const rightSpan = 12 - leftSpan;

  return (
    <div className={`grid grid-cols-12 gap-8 w-full flex-1 items-center ${className}`}>
      {/* Columna Izquierda: Fórmula principal o Gráfica */}
      <div
        style={{ gridColumn: `span ${leftSpan} / span ${leftSpan}` }}
        className="h-full flex flex-col justify-center items-center p-8 bg-white rounded-2xl border border-slate-200 shadow-md relative"
      >
        {left}
      </div>

      {/* Columna Derecha: Desglose de componentes, definiciones o leyenda con colores */}
      <div
        style={{ gridColumn: `span ${rightSpan} / span ${rightSpan}` }}
        className="h-full flex flex-col justify-center gap-4 p-8 bg-slate-50/80 rounded-2xl border border-slate-200 overflow-hidden"
      >
        {right}
      </div>
    </div>
  );
};
