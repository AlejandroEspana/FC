import React from "react";
import { Sequence } from "remotion";
import { SafeZone } from "../../../core/layout/SafeZone";
import { ChapterHeader } from "../../../core/layout/ChapterHeader";
import { DefinitionCard } from "../../../components/cards/DefinitionCard";
import { BulletList } from "../../../components/cards/BulletList";
import { VECTORS_CONTENT } from "../content";

export const Cap00_Intro: React.FC = () => {
  const content = VECTORS_CONTENT.cap00_intro;

  return (
    <SafeZone>
      <ChapterHeader
        courseTitle={VECTORS_CONTENT.courseTitle}
        chapterNumber="00"
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        {/* Sección 1: La necesidad física de los vectores (0 a 300 frames) */}
        <Sequence from={0} durationInFrames={300} name="MotivacionFisica">
          <div className="w-full max-w-4xl flex flex-col items-center">
            <DefinitionCard
              title={content.whatIsAVector.title}
              category="Motivación en Física y Ciencias"
              accentColor="#38BDF8"
            >
              <p className="text-lg leading-relaxed text-[#CBD5E1]">
                {content.whatIsAVector.paragraphs[0]}
              </p>
              <p className="text-base text-[#94A3B8] leading-relaxed mt-2 border-l-2 border-[#38BDF8] pl-4 italic">
                {content.whatIsAVector.paragraphs[1]}
              </p>
            </DefinitionCard>
          </div>
        </Sequence>

        {/* Sección 2: Los tres pilares de aplicación (300 a 600 frames) */}
        <Sequence from={300} durationInFrames={350} name="TresPilares">
          <div className="w-full max-w-4xl flex flex-col">
            <div className="mb-4 text-center">
              <span className="text-xs uppercase font-bold text-[#FACC15] tracking-widest">
                Campos de Aplicación
              </span>
              <h2 className="text-2xl font-bold text-white">
                ¿Dónde se utilizan los vectores hoy en día?
              </h2>
            </div>
            <BulletList items={content.applications} delayBetweenItems={18} />
          </div>
        </Sequence>
      </div>

      <footer className="w-full flex justify-between text-xs text-[#64748B] pt-2 border-t border-[#1E2942]/60">
        <span>Remotion Educational Video Engine</span>
        <span>Resolución Nativa 1080p @ 60 FPS</span>
      </footer>
    </SafeZone>
  );
};
