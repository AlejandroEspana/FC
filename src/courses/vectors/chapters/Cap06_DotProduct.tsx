import React from "react";
import { Sequence } from "remotion";
import { SafeZone } from "../../../core/layout/SafeZone";
import { ChapterHeader } from "../../../core/layout/ChapterHeader";
import { FormulaDeconstruction } from "../../../components/math/FormulaDeconstruction";
import { CoordinatePlane } from "../../../components/geometry2d/CoordinatePlane";
import { AnimatedVector } from "../../../components/geometry2d/AnimatedVector";
import { DefinitionCard } from "../../../components/cards/DefinitionCard";
import { ErrorCard } from "../../../components/cards/ErrorCard";
import { MathFormula } from "../../../components/math/MathFormula";
import { VECTORS_CONTENT } from "../content";

export const Cap06_DotProduct: React.FC = () => {
  const content = VECTORS_CONTENT.cap06_dot_product;

  return (
    <SafeZone>
      <ChapterHeader
        courseTitle={VECTORS_CONTENT.courseTitle}
        chapterNumber="06"
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        {/* Sección 1: Definición Geométrica del Producto Punto (0 a 360 frames) */}
        <Sequence from={0} durationInFrames={360} name="ProductoPuntoGeometrico">
          <FormulaDeconstruction
            formula={content.dotGeomFormula.formula}
            title={content.dotGeomFormula.title}
            subtitle={content.dotGeomFormula.subtitle}
            components={content.dotGeomFormula.components}
          />
        </Sequence>

        {/* Sección 2: Formulación Algebraica Cartesiana (360 a 700 frames) */}
        <Sequence from={360} durationInFrames={340} name="ProductoPuntoAlgebraico">
          <FormulaDeconstruction
            formula={content.dotAlgFormula.formula}
            title={content.dotAlgFormula.title}
            subtitle={content.dotAlgFormula.subtitle}
            components={content.dotAlgFormula.components}
          />
        </Sequence>

        {/* Sección 3: Interpretación Geométrica como Proyección Escalar (700 a 1100 frames) */}
        <Sequence from={700} durationInFrames={400} name="ProyeccionGeometrica">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            {/* Gráfica con vector base y vector inclinado proyectado */}
            <div className="col-span-5 flex flex-col items-center justify-center p-6 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <span className="text-xs uppercase font-bold text-[#34D399] tracking-wider mb-2">
                Proyección Ortogonal Escalar
              </span>

              <CoordinatePlane width={480} height={360} xRange={[-0.5, 4.5]} yRange={[-0.5, 3.5]}>
                {/* Vector base u sobre el eje X */}
                <AnimatedVector
                  from={[0, 0]}
                  to={[4, 0]}
                  color="#38BDF8"
                  label="u = (4, 0)"
                  delay={5}
                  strokeWidth={4.5}
                />

                {/* Vector inclinado v */}
                <AnimatedVector
                  from={[0, 0]}
                  to={[2, 2.5]}
                  color="#FACC15"
                  label="v = (2, 2.5)"
                  delay={25}
                  strokeWidth={4.5}
                />

                {/* Sombra proyectada sobre u */}
                <line
                  x1={2 * 106.6 + 53.3}
                  y1={360 - (2.5 * 102.8 + 51.4)}
                  x2={2 * 106.6 + 53.3}
                  y2={360 - 51.4}
                  stroke="#34D399"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity={0.8}
                />
              </CoordinatePlane>
            </div>

            {/* Panel explicativo de las 3 fases del producto escalar */}
            <div className="col-span-7 flex flex-col gap-4 p-8 bg-[#121829]/60 rounded-2xl border border-[#1E2942]">
              <div>
                <span className="text-xs uppercase font-bold text-[#34D399] tracking-widest">
                  Física y Geometría
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  El Producto Punto como Trabajo Mecánico
                </h3>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex justify-between items-center">
                  <span className="text-xs text-[#34D399] font-bold">θ &lt; 90° (Ángulo Agudo)</span>
                  <span className="text-xs text-slate-300 font-sans">
                    <MathFormula math="\vec{u} \cdot \vec{v} > 0" fontSize="text-sm" block={false} /> (Trabajo motor o aceleración)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex justify-between items-center">
                  <span className="text-xs text-[#38BDF8] font-bold">θ = 90° (Perpendicular)</span>
                  <span className="text-xs text-slate-300 font-sans">
                    <MathFormula math="\vec{u} \cdot \vec{v} = 0" fontSize="text-sm" block={false} /> (Ortogonalidad absoluta)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex justify-between items-center">
                  <span className="text-xs text-[#F43F5E] font-bold">θ &gt; 90° (Ángulo Obtuso)</span>
                  <span className="text-xs text-slate-300 font-sans">
                    <MathFormula math="\vec{u} \cdot \vec{v} < 0" fontSize="text-sm" block={false} /> (Freno o trabajo disipativo)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 flex justify-between items-center">
                  <span className="text-xs text-[#34D399] font-bold uppercase">Cálculo del Ejemplo:</span>
                  <MathFormula math="\vec{u} \cdot \vec{v} = (4)(2) + (0)(2.5) = 8" fontSize="text-lg" block={false} />
                </div>
              </div>
            </div>
          </div>
        </Sequence>

        {/* Sección 4: Criterio de Ortogonalidad y Error Común (1100 a 1480 frames) */}
        <Sequence from={1100} durationInFrames={380} name="CriterioOrtogonalidad">
          <div className="grid grid-cols-12 gap-8 w-full items-start">
            <div className="col-span-6 flex flex-col gap-4">
              <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest">
                Teorema de Perpendicularidad
              </span>
              <DefinitionCard
                title={content.orthogonality.title}
                category="Criterio Fundamental"
                accentColor="#38BDF8"
              >
                <p className="text-base text-[#CBD5E1] leading-relaxed">
                  {content.orthogonality.text}
                </p>
                <div className="mt-4 p-4 rounded-xl bg-[#0A0D18] border border-[#38BDF8]/30 flex items-center justify-center">
                  <MathFormula math={content.orthogonality.formula} fontSize="text-2xl" />
                </div>
              </DefinitionCard>
            </div>

            <div className="col-span-6 flex flex-col gap-4">
              <span className="text-xs uppercase font-bold text-[#F43F5E] tracking-widest">
                Error Conceptual Crítico
              </span>
              <ErrorCard
                errorStatement={content.errorCase.wrong}
                correction={content.errorCase.correct}
                why={content.errorCase.why}
              />
            </div>
          </div>
        </Sequence>
      </div>

      <footer className="w-full flex justify-between text-xs text-[#64748B] pt-2 border-t border-[#1E2942]/60">
        <span>Capítulo 06: Producto Punto</span>
        <span>Duración: 24.6 segundos (1480 frames @ 60 FPS)</span>
      </footer>
    </SafeZone>
  );
};
