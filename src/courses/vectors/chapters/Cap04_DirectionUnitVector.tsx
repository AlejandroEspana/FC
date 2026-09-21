import React from "react";
import { Sequence } from "remotion";
import { SafeZone } from "../../../core/layout/SafeZone";
import { ChapterHeader } from "../../../core/layout/ChapterHeader";
import { FormulaDeconstruction } from "../../../components/math/FormulaDeconstruction";
import { CoordinatePlane } from "../../../components/geometry2d/CoordinatePlane";
import { AnimatedVector } from "../../../components/geometry2d/AnimatedVector";
import { MathFormula } from "../../../components/math/MathFormula";
import { VECTORS_CONTENT } from "../content";

export const Cap04_DirectionUnitVector: React.FC = () => {
  const content = VECTORS_CONTENT.cap04_direction_unit;

  return (
    <SafeZone>
      <ChapterHeader
        courseTitle={VECTORS_CONTENT.courseTitle}
        chapterNumber="04"
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        {/* Sección 1: Ángulo Polar y Cuadrantes (0 a 360 frames) */}
        <Sequence from={0} durationInFrames={360} name="AnguloDireccion">
          <FormulaDeconstruction
            formula={content.directionFormula.formula}
            title={content.directionFormula.title}
            subtitle={content.directionFormula.subtitle}
            components={content.directionFormula.components}
          />
        </Sequence>

        {/* Sección 2: Normalización y Vector Unitario (360 a 720 frames) */}
        <Sequence from={360} durationInFrames={360} name="VectorUnitarioFormula">
          <FormulaDeconstruction
            formula={content.unitFormula.formula}
            title={content.unitFormula.title}
            subtitle={content.unitFormula.subtitle}
            components={content.unitFormula.components}
          />
        </Sequence>

        {/* Sección 3: Gráfica Comparativa y Normalización v=(3,4) -> u=(0.6, 0.8) (720 a 1140 frames) */}
        <Sequence from={720} durationInFrames={420} name="NormalizacionVisual">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            {/* Gráfica comparativa en plano cartesiano */}
            <div className="col-span-5 flex flex-col items-center justify-center p-6 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-wider">
                  Círculo Unitario y Colinealidad
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] font-mono">
                  θ = 53.13°
                </span>
              </div>

              <CoordinatePlane
                width={480}
                height={360}
                xRange={[-1.2, 4.2]}
                yRange={[-1.2, 4.2]}
                stepX={1}
                stepY={1}
              >
                {/* Vector original v = (3, 4) */}
                <AnimatedVector
                  from={[0, 0]}
                  to={[3, 4]}
                  color="#FACC15"
                  label="v = (3, 4)"
                  delay={10}
                  strokeWidth={4}
                  showComponents={true}
                />

                {/* Versor unitario normalizado u = (0.6, 0.8) */}
                <AnimatedVector
                  from={[0, 0]}
                  to={[0.6, 0.8]}
                  color="#34D399"
                  label="u = (0.6, 0.8)"
                  delay={45}
                  strokeWidth={5}
                />
              </CoordinatePlane>
            </div>

            {/* Panel de deducción analítica */}
            <div className="col-span-7 flex flex-col gap-4 p-8 bg-[#121829]/60 rounded-2xl border border-[#1E2942]">
              <div>
                <span className="text-xs uppercase font-bold text-[#34D399] tracking-widest">
                  Procedimiento de Normalización
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                  Cálculo del Versor Asociado <MathFormula math="\hat{u}" fontSize="text-2xl" block={false} />
                </h3>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">1. Magnitud previa:</span>
                  <MathFormula math="|\vec{v}| = \sqrt{3^2 + 4^2} = 5" fontSize="text-base" block={false} />
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">2. Escalamiento por 1/|v|:</span>
                  <MathFormula math="\hat{u} = \frac{1}{5}(3, 4) = (0.6, 0.8)" fontSize="text-base" block={false} />
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">3. Verificación de norma unitaria:</span>
                  <MathFormula math="|\hat{u}| = \sqrt{0.6^2 + 0.8^2} = \sqrt{0.36 + 0.64} = 1" fontSize="text-base" block={false} />
                </div>

                <div className="p-4 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30">
                  <p className="text-xs text-[#E2E8F0] leading-relaxed font-sans flex items-center gap-1.5 flex-wrap">
                    <strong className="text-[#38BDF8]">Conclusión física:</strong> El versor unitario{" "}
                    <MathFormula math="\hat{u}" fontSize="text-xs" block={false} /> conserva el 100% de la
                    orientación angular del vector original, despojándose de toda dimensión cuantitativa. Es el patrón
                    universal para indicar direcciones en mecánica e iluminación computacional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Sequence>
      </div>

      <footer className="w-full flex justify-between text-xs text-[#64748B] pt-2 border-t border-[#1E2942]/60">
        <span>Capítulo 04: Dirección y Vector Unitario</span>
        <span>Duración: 19.0 segundos (1140 frames @ 60 FPS)</span>
      </footer>
    </SafeZone>
  );
};
