import React from "react";
import { Matrix, computeMultiplicationStep } from "../../math/matrices";
import { MatrixDisplay } from "./MatrixDisplay";
import { Equation } from "../equations/Equation";

export interface MatrixMultiplicationStepProps {
  A: Matrix;
  B: Matrix;
  C: Matrix;
  currentRow: number;
  currentCol: number;
}

export const MatrixMultiplicationStep: React.FC<MatrixMultiplicationStepProps> = ({
  A,
  B,
  C,
  currentRow,
  currentCol,
}) => {
  const step = computeMultiplicationStep(A, B, currentRow, currentCol);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Las tres matrices dispuestas en producto A x B = C */}
      <div className="flex items-center justify-center gap-6 flex-wrap">
        <MatrixDisplay
          matrix={A}
          name="A"
          highlightRow={currentRow}
          accentColor="#38BDF8"
        />

        <span className="text-2xl font-bold font-mono text-[#FB923C]">×</span>

        <MatrixDisplay
          matrix={B}
          name="B"
          highlightCol={currentCol}
          accentColor="#FACC15"
        />

        <span className="text-2xl font-bold font-mono text-[#34D399]">=</span>

        <MatrixDisplay
          matrix={C}
          name="C"
          highlightCell={[currentRow, currentCol]}
          accentColor="#34D399"
        />
      </div>

      {/* Tarjeta de cálculo paso a paso */}
      <div className="w-full max-w-2xl p-5 rounded-2xl bg-[#121829] border border-[#1E2942] shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#1E2942] pb-2">
          <span className="text-xs uppercase font-bold tracking-wider text-[#34D399]">
            Cálculo del Elemento ({currentRow + 1}, {currentCol + 1})
          </span>
          <span className="text-xs text-[#94A3B8] font-mono">
            Fila {currentRow + 1} de A · Columna {currentCol + 1} de B
          </span>
        </div>

        <div className="flex items-center justify-center p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942]">
          <Equation latex={step.latexExpression} fontSize="text-xl" />
        </div>

        <div className="flex items-center justify-around text-xs font-mono text-[#94A3B8] pt-1">
          {step.terms.map((t, idx) => (
            <span key={idx} className="bg-[#1E2942]/60 px-3 py-1 rounded-md">
              <span className="text-[#38BDF8]">{t.a}</span> ×{" "}
              <span className="text-[#FACC15]">{t.b}</span> ={" "}
              <span className="text-white font-bold">{t.product}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
