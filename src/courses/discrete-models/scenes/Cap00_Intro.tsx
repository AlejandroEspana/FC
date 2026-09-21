import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { BulletList } from "../../../components/common/BulletList";
import { DISCRETE_COURSE } from "../content/data";

export const Cap00_Intro: React.FC = () => {
  const meta = DISCRETE_COURSE.cap00_intro;

  return (
    <ChapterComposition
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="00"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="flex flex-col items-center max-w-4xl w-full">
        <div className="text-center mb-6">
          <span className="text-xs uppercase font-extrabold text-[#38BDF8] tracking-widest block mb-1 font-mono">
            Tiempo Discreto y Algoritmos
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            La Realidad en Pasos Finitos
          </h2>
          <p className="text-sm text-[#94A3B8] mt-2 max-w-2xl mx-auto font-sans">
            Mientras el cálculo diferencial tradicional asume que el tiempo fluye de forma continua e infinitesimal,
            la biología computacional, la informática y las finanzas evolucionan en épocas y generaciones discretas.
          </p>
        </div>

        <BulletList items={meta.bullets} />
      </div>
    </ChapterComposition>
  );
};
