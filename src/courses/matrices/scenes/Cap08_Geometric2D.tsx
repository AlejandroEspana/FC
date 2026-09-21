import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { TransformationGrid2D } from "../../../components/matrices/TransformationGrid2D";
import { MatrixDisplay } from "../../../components/matrices/MatrixDisplay";
import { MATRICES_COURSE } from "../content/data";

export const Cap08_Geometric2D: React.FC = () => {
  const meta = MATRICES_COURSE.cap08_geometric_2d;

  return (
    <ChapterComposition
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="08"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="grid grid-cols-12 gap-8 w-full items-center">
        {/* Rejilla de transformación lineal animada */}
        <div className="col-span-7 flex flex-col items-center justify-center p-4 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
          <TransformationGrid2D
            targetMatrix={meta.shearMatrix}
            transformationName="Cizallamiento Horizontal (Shear M = [[1, 1.2], [0, 1]])"
          />
        </div>

        {/* Panel explicativo con la matriz */}
        <div className="col-span-5 flex flex-col gap-6 p-7 bg-[#121829]/70 rounded-2xl border border-[#1E2942]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] font-mono">
            Interpretación Geométrica
          </span>
          <h3 className="text-xl font-bold text-white">
            Las columnas de la matriz representan adónde van a parar los versores base
          </h3>

          <MatrixDisplay matrix={meta.shearMatrix} name="M (Shear)" accentColor="#38BDF8" />

          <div className="space-y-2 text-xs text-[#CBD5E1] font-sans leading-relaxed">
            <p>
              • <strong>Columna 1:</strong> <span className="font-mono text-[#38BDF8]">(1, 0)</span> permanece fija sobre el eje X.
            </p>
            <p>
              • <strong>Columna 2:</strong> <span className="font-mono text-[#FACC15]">(1.2, 1)</span> inclina el versor vertical hacia la derecha deformando el cuadrado en un paralelogramo.
            </p>
          </div>
        </div>
      </div>
    </ChapterComposition>
  );
};
