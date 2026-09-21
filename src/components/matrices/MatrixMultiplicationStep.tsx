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
      <div className="w-full max-w-2xl p-5 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-700">
            Cálculo del Elemento ({currentRow + 1}, {currentCol + 1})
          </span>
          <span className="text-xs text-slate-500 font-mono font-medium">
            Fila {currentRow + 1} de A · Columna {currentCol + 1} de B
          </span>
        </div>

        <div className="flex items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900">
          <Equation latex={step.latexExpression} fontSize="text-xl" />
        </div>

        <div className="flex items-center justify-around text-xs font-mono text-slate-600 pt-1">
          {step.terms.map((t, idx) => (
            <span key={idx} className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-md">
              <span className="text-blue-700 font-bold">{t.a}</span> ×{" "}
              <span className="text-amber-700 font-bold">{t.b}</span> ={" "}
              <span className="text-slate-900 font-bold">{t.product}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
