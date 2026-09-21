import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import { SafeZone } from "../../../core/layout/SafeZone";
import { ChapterHeader } from "../../../core/layout/ChapterHeader";
import { BulletList } from "../../../components/cards/BulletList";
import { CoordinatePlane } from "../../../components/geometry2d/CoordinatePlane";
import { AnimatedVector } from "../../../components/geometry2d/AnimatedVector";
import { FormulaDeconstruction } from "../../../components/math/FormulaDeconstruction";
import { VECTORS_CONTENT } from "../content";

export const Cap02_VectorConcept: React.FC = () => {
  const content = VECTORS_CONTENT.cap02_vector_concept;
  const frame = useCurrentFrame();

  return (
    <SafeZone>
      <ChapterHeader
        courseTitle={VECTORS_CONTENT.courseTitle}
        chapterNumber="02"
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        {/* Sección 1: Vector Libre vs Aplicado (0 a 300 frames) */}
        <Sequence from={0} durationInFrames={300} name="LibreVsAplicado">
          <div className="w-full max-w-4xl">
            <BulletList items={content.freeVsApplied} delayBetweenItems={20} />
          </div>
        </Sequence>

        {/* Sección 2: Visualización Geométrica Dinámica en el Plano (300 a 650 frames) */}
        <Sequence from={300} durationInFrames={350} name="PlanoDinamico">
          <div className="flex items-center gap-8 w-full max-w-5xl justify-center">
            <CoordinatePlane width={580} height={440} xRange={[-4, 4]} yRange={[-3, 3]}>
              <AnimatedVector
                from={[0, 0]}
                to={[3, 2]}
                color="#38BDF8"
                label="v = (3, 2)"
                showComponents={true}
                delay={10}
              />
            </CoordinatePlane>

            <div className="flex flex-col gap-4 max-w-sm">
              <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest">
                Geometría en el Plano R²
              </span>
              <h3 className="text-2xl font-bold text-white">Anatomía de la Flecha</h3>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                El vector de posición nace en el origen <strong className="text-white">O = (0, 0)</strong> y su extremo toca las coordenadas <strong className="text-[#38BDF8]">(3, 2)</strong>.
              </p>
              <div className="p-3 rounded-xl bg-[#121829] border border-[#1E2942] text-xs text-[#94A3B8] space-y-1.5">
                <div>• <strong className="text-white">Longitud:</strong> Longitud de la hipotenusa.</div>
                <div>• <strong className="text-white">Dirección:</strong> Pendiente angular con el eje X.</div>
                <div>• <strong className="text-white">Sentido:</strong> Hacia dónde apunta el vértice.</div>
              </div>
            </div>
          </div>
        </Sequence>

        {/* Sección 3: Desglose de Notación en Pantalla Dividida (650 a 1000 frames) */}
        <Sequence from={650} durationInFrames={350} name="DesgloseNotacion">
          <FormulaDeconstruction
            formula={content.notationDecomposition.formula}
            title={content.notationDecomposition.title}
            subtitle={content.notationDecomposition.subtitle}
            components={content.notationDecomposition.components}
          />
        </Sequence>
      </div>

      <footer className="w-full flex justify-between text-xs text-[#64748B] pt-2 border-t border-[#1E2942]/60">
        <span>Capítulo 02: El Concepto de Vector</span>
        <span>Duración: 16.6 segundos (1000 frames @ 60 FPS)</span>
      </footer>
    </SafeZone>
  );
};
