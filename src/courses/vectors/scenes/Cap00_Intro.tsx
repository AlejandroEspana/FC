import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { BulletList } from "../../../components/common/BulletList";
import { VECTORS_COURSE } from "../content/data";

export const Cap00_Intro: React.FC = () => {
  const meta = VECTORS_COURSE.cap00_intro;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="00"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="flex flex-col items-center max-w-4xl w-full">
        <div className="text-center mb-6">
          <span className="text-xs uppercase font-extrabold text-[#38BDF8] tracking-widest block mb-1">
            Motivación Fundamental
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            ¿Por qué el universo no cabe en un solo número?
          </h2>
          <p className="text-sm text-[#94A3B8] mt-2 max-w-2xl mx-auto font-sans">
            En la física y la computación, un escalar puro es insuficiente cuando un fenómeno posee
            orientación espacial. Los vectores son la estructura matemática que unifica magnitud, dirección y sentido.
          </p>
        </div>

        <BulletList items={meta.bullets} />
      </div>
    </ChapterComposition>
  );
};
