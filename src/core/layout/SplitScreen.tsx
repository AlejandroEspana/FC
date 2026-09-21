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
        className="h-full flex flex-col justify-center items-center p-8 bg-[#121829]/80 rounded-2xl border border-[#1E2942] shadow-2xl relative"
      >
        {left}
      </div>

      {/* Columna Derecha: Desglose de componentes, definiciones o leyenda con colores */}
      <div
        style={{ gridColumn: `span ${rightSpan} / span ${rightSpan}` }}
        className="h-full flex flex-col justify-center gap-4 p-8 bg-[#121829]/40 rounded-2xl border border-[#1E2942]/60 overflow-hidden"
      >
        {right}
      </div>
    </div>
  );
};
