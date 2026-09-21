import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { DefinitionCard } from "../../../components/common/DefinitionCard";
import { MatrixDisplay } from "../../../components/matrices/MatrixDisplay";
import { Equation } from "../../../components/equations/Equation";
import { MATRICES_COURSE } from "../content/data";

export const Cap02_SpecialTypes: React.FC = () => {
  const meta = MATRICES_COURSE.cap02_special_types;

  const I3 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  return (
    <ChapterComposition
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="02"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="grid grid-cols-12 gap-8 w-full items-center">
        <div className="col-span-7">
          <DefinitionCard
            title={meta.identityDef.title}
            category={meta.identityDef.category}
            accentColor={meta.identityDef.accentColor}
          >
            <p className="text-base text-[#CBD5E1] leading-relaxed">
              {meta.identityDef.text}
            </p>
            {meta.identityDef.formula && (
              <div className="mt-4 p-4 rounded-xl bg-[#0A0D18] border border-[#34D399]/30 flex items-center justify-center">
                <Equation latex={meta.identityDef.formula} fontSize="text-2xl" />
              </div>
            )}
          </DefinitionCard>
        </div>

        <div className="col-span-5 flex flex-col items-center justify-center p-6 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
          <span className="text-xs font-mono font-bold text-[#34D399] uppercase tracking-wider mb-4">
            Matriz Identidad 3×3
          </span>
          <MatrixDisplay matrix={I3} name="I_3" accentColor="#34D399" />
        </div>
      </div>
    </ChapterComposition>
  );
};
