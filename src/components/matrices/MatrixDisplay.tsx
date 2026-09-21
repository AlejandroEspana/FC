import React from "react";
import { Matrix, getMatrixDimensions } from "../../math/matrices";
import { Equation } from "../equations/Equation";

export interface MatrixDisplayProps {
  matrix: Matrix;
  name?: string;
  highlightRow?: number; // 0-indexed
  highlightCol?: number; // 0-indexed
  highlightCell?: [number, number]; // [row, col]
  accentColor?: string;
  className?: string;
}

export const MatrixDisplay: React.FC<MatrixDisplayProps> = ({
  matrix,
  name,
  highlightRow,
  highlightCol,
  highlightCell,
  accentColor = "#38BDF8",
  className = "",
}) => {
  const dim = getMatrixDimensions(matrix);

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {name && (
        <span className="text-sm font-bold font-mono text-[#94A3B8]">
          Matriz {name} ({dim.rows}×{dim.cols})
        </span>
      )}

      {/* Bloque con corchetes matriciales */}
      <div className="flex items-center">
        {/* Corchete izquierdo */}
        <div
          style={{ borderColor: accentColor }}
          className="w-2.5 self-stretch border-l-2 border-t-2 border-b-2 rounded-l-lg"
        />

        {/* Celdas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${dim.cols}, minmax(40px, 1fr))`,
            gap: "10px",
          }}
          className="p-3 font-mono text-base font-bold text-center"
        >
          {matrix.map((row, i) =>
            row.map((val, j) => {
              const isRowMatch = highlightRow !== undefined && highlightRow === i;
              const isColMatch = highlightCol !== undefined && highlightCol === j;
              const isCellMatch =
                highlightCell !== undefined &&
                highlightCell[0] === i &&
                highlightCell[1] === j;

              let cellBg = "bg-[#121829]";
              let cellBorder = "border-[#1E2942]";
              let textColor = "text-white";

              if (isCellMatch) {
                cellBg = "bg-[#34D399]/20";
                cellBorder = "border-[#34D399]";
                textColor = "text-[#34D399]";
              } else if (isRowMatch) {
                cellBg = "bg-[#38BDF8]/20";
                cellBorder = "border-[#38BDF8]";
                textColor = "text-[#38BDF8]";
              } else if (isColMatch) {
                cellBg = "bg-[#FACC15]/20";
                cellBorder = "border-[#FACC15]";
                textColor = "text-[#FACC15]";
              }

              return (
                <div
                  key={`cell-${i}-${j}`}
                  className={`w-12 h-10 flex items-center justify-center rounded-lg border ${cellBg} ${cellBorder} ${textColor} transition-all shadow-sm`}
                >
                  {typeof val === "number" ? val.toFixed(Number.isInteger(val) ? 0 : 2) : val}
                </div>
              );
            })
          )}
        </div>

        {/* Corchete derecho */}
        <div
          style={{ borderColor: accentColor }}
          className="w-2.5 self-stretch border-r-2 border-t-2 border-b-2 rounded-r-lg"
        />
      </div>
    </div>
  );
};
