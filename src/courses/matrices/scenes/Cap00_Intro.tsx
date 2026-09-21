import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { BulletList } from "../../../components/common/BulletList";
import { MATRICES_COURSE } from "../content/data";

export const Cap00_Intro: React.FC = () => {
  const meta = MATRICES_COURSE.cap00_intro;

  return (
    <ChapterComposition
      courseTitle={MATRICES_COURSE.title}
      chapterNumber="00"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="flex flex-col items-center max-w-4xl w-full">
        <div className="text-center mb-6">
          <span className="text-xs uppercase font-extrabold text-[#38BDF8] tracking-widest block mb-1">
            Motivación Universal
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            El Lenguaje de la Computación Moderna
          </h2>
          <p className="text-sm text-[#94A3B8] mt-2 max-w-2xl mx-auto font-sans">
            Las matrices son estructuras tabulares que encapsulan transformaciones lineales del espacio,
            sistemas de ecuaciones de múltiples variables y los pesos de las redes neuronales de IA.
          </p>
        </div>

        <BulletList items={meta.bullets} />
      </div>
    </ChapterComposition>
  );
};
