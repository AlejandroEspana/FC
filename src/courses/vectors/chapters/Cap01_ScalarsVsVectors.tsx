import React from "react";
import { Sequence } from "remotion";
import { SafeZone } from "../../../core/layout/SafeZone";
import { ChapterHeader } from "../../../core/layout/ChapterHeader";
import { DefinitionCard } from "../../../components/cards/DefinitionCard";
import { ErrorCard } from "../../../components/cards/ErrorCard";
import { MathFormula } from "../../../components/math/MathFormula";
import { VECTORS_CONTENT } from "../content";

export const Cap01_ScalarsVsVectors: React.FC = () => {
  const content = VECTORS_CONTENT.cap01_scalars_vs_vectors;

  return (
    <SafeZone>
      <ChapterHeader
        courseTitle={VECTORS_CONTENT.courseTitle}
        chapterNumber="01"
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        {/* Sección 1: Definición de Escalar (0 a 300 frames) */}
        <Sequence from={0} durationInFrames={300} name="DefinicionEscalar">
          <div className="w-full max-w-4xl">
            <DefinitionCard
              title={content.scalarDef.title}
              category={content.scalarDef.category}
              accentColor="#38BDF8"
            >
              <p className="text-base text-[#CBD5E1] leading-relaxed">
                {content.scalarDef.text}
              </p>
              <div className="mt-4 p-4 rounded-xl bg-[#0A0D18] border border-[#38BDF8]/30 flex items-center justify-center">
                <MathFormula math={content.scalarDef.formula} fontSize="text-2xl" />
              </div>
            </DefinitionCard>
          </div>
        </Sequence>

        {/* Sección 2: Definición de Vector (300 a 600 frames) */}
        <Sequence from={300} durationInFrames={300} name="DefinicionVector">
          <div className="w-full max-w-4xl">
            <DefinitionCard
              title={content.vectorDef.title}
              category={content.vectorDef.category}
              accentColor="#FACC15"
            >
              <p className="text-base text-[#CBD5E1] leading-relaxed">
                {content.vectorDef.text}
              </p>
              <div className="mt-4 p-4 rounded-xl bg-[#0A0D18] border border-[#FACC15]/30 flex items-center justify-center">
                <MathFormula math={content.vectorDef.formula} fontSize="text-2xl" />
              </div>
            </DefinitionCard>
          </div>
        </Sequence>

        {/* Sección 3: Tabla Comparativa Lado a Lado (600 a 900 frames) */}
        <Sequence from={600} durationInFrames={300} name="TablaComparativa">
          <div className="w-full max-w-5xl grid grid-cols-2 gap-8">
            {/* Columna Escalar */}
            <div className="p-6 rounded-2xl bg-[#121829] border border-[#38BDF8]/40 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2942]">
                <h3 className="text-xl font-bold text-[#38BDF8]">MAGNITUD ESCALAR</h3>
                <span className="text-xs font-mono text-[#94A3B8]">1 Parámetro</span>
              </div>
              <ul className="space-y-3 text-sm text-[#CBD5E1]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span>Definida exclusivamente por número real + unidad.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span>Suma mediante álgebra escalar básica: 5 kg + 2 kg = 7 kg.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span>Invariante ante rotaciones del sistema de coordenadas.</span>
                </li>
                <li className="flex items-center gap-2 text-[#94A3B8]">
                  <span>Ejemplos: Masa, Tiempo, Temperatura, Densidad, Energía.</span>
                </li>
              </ul>
            </div>

            {/* Columna Vectorial */}
            <div className="p-6 rounded-2xl bg-[#121829] border border-[#FACC15]/40 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2942]">
                <h3 className="text-xl font-bold text-[#FACC15]">MAGNITUD VECTORIAL</h3>
                <span className="text-xs font-mono text-[#94A3B8]">3 Parámetros</span>
              </div>
              <ul className="space-y-3 text-sm text-[#CBD5E1]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FACC15]" />
                  <span>Requiere módulo, dirección polar y sentido de la flecha.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FACC15]" />
                  <span>Suma geométrica (paralelogramo o regla punta-cola).</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FACC15]" />
                  <span>Sus componentes se transforman al rotar los ejes.</span>
                </li>
                <li className="flex items-center gap-2 text-[#94A3B8]">
                  <span>Ejemplos: Fuerza, Desplazamiento, Velocidad, Aceleración.</span>
                </li>
              </ul>
            </div>
          </div>
        </Sequence>

        {/* Sección 4: Error Frecuente (900 a 1200 frames) */}
        <Sequence from={900} durationInFrames={300} name="ErrorFrecuente">
          <ErrorCard
            errorStatement={content.errorCase.wrong}
            correction={content.errorCase.correct}
            why={content.errorCase.why}
          />
        </Sequence>
      </div>

      <footer className="w-full flex justify-between text-xs text-[#64748B] pt-2 border-t border-[#1E2942]/60">
        <span>Capítulo 01: Escalares vs Vectores</span>
        <span>Duración: 20 segundos (1200 frames @ 60 FPS)</span>
      </footer>
    </SafeZone>
  );
};
