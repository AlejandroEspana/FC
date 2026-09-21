import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { ErrorCard } from "../../../components/common/ErrorCard";
import { MatrixDisplay } from "../../../components/matrices/MatrixDisplay";
import { MATRICES_COURSE } from "../content/data";

export const Cap07_NonCommutativity: React.FC = () => {
  const meta = MATRICES_COURSE.cap07_non_commutativity;

  const A = [
    [1, 2],
    [0, 1],
  ];
  const B = [
    [2, 0],
    [1, 1],
  ];
  const AB = [
    [4, 2],
    [1, 1],
  ];
  const BA = [
    [2, 4],
    [1, 3],
  ];

  return (
    <ChapterComposition
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="07"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="flex flex-col items-center max-w-5xl w-full gap-8">
        {/* Demostración numérica explícita AB != BA */}
        <div className="grid grid-cols-2 gap-8 w-full">
          <div className="p-6 rounded-2xl bg-[#121829] border border-[#38BDF8]/30 flex flex-col items-center gap-3">
            <span className="text-xs uppercase font-bold text-[#38BDF8] font-mono">
              Producto A · B
            </span>
            <MatrixDisplay matrix={AB} name="A · B" accentColor="#38BDF8" />
          </div>

          <div className="p-6 rounded-2xl bg-[#121829] border border-[#F43F5E]/30 flex flex-col items-center gap-3">
            <span className="text-xs uppercase font-bold text-[#F43F5E] font-mono">
              Producto Invertido B · A
            </span>
            <MatrixDisplay matrix={BA} name="B · A" accentColor="#F43F5E" />
          </div>
        </div>

        <ErrorCard
          errorStatement={meta.errorCase.wrong}
          correction={meta.errorCase.correct}
          why={meta.errorCase.why}
        />
      </div>
    </ChapterComposition>
  );
};
