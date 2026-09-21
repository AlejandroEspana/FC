import React from "react";
import { Sequence } from "remotion";
import { SafeZone } from "../../../core/layout/SafeZone";
import { ChapterHeader } from "../../../core/layout/ChapterHeader";
import { FormulaDeconstruction } from "../../../components/math/FormulaDeconstruction";
import { CoordinatePlane } from "../../../components/geometry2d/CoordinatePlane";
import { AnimatedVector } from "../../../components/geometry2d/AnimatedVector";
import { MathFormula } from "../../../components/math/MathFormula";
import { VECTORS_CONTENT } from "../content";

export const Cap03_ComponentsMagnitude: React.FC = () => {
  const content = VECTORS_CONTENT.cap03_components_magnitude;

  return (
    <SafeZone>
      <ChapterHeader
        courseTitle={VECTORS_CONTENT.courseTitle}
        chapterNumber="03"
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        {/* Sección 1: Descomposición Canónica con Pantalla Dividida (0 a 350 frames) */}
        <Sequence from={0} durationInFrames={350} name="DescomposicionCanonica">
          <FormulaDeconstruction
            formula={content.decompositionFormula.formula}
            title={content.decompositionFormula.title}
            subtitle={content.decompositionFormula.subtitle}
            components={content.decompositionFormula.components}
          />
        </Sequence>

        {/* Sección 2: Teorema de Pitágoras y Magnitud con Pantalla Dividida (350 a 700 frames) */}
        <Sequence from={350} durationInFrames={350} name="MagnitudPitágoras">
          <FormulaDeconstruction
            formula={content.magnitudeFormula.formula}
            title={content.magnitudeFormula.title}
            subtitle={content.magnitudeFormula.subtitle}
            components={content.magnitudeFormula.components}
          />
        </Sequence>

        {/* Sección 3: Ejemplo Numérico Completo v = (3, 4) (700 a 1100 frames) */}
        <Sequence from={700} durationInFrames={400} name="EjemploNumerico345">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            {/* Gráfica del triángulo 3-4-5 */}
            <div className="col-span-5 flex flex-col items-center justify-center p-6 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <span className="text-xs uppercase font-bold text-[#34D399] tracking-wider mb-2">
                Triángulo Pitagórico Notable
              </span>
              <CoordinatePlane width={480} height={360} xRange={[-0.5, 4.5]} yRange={[-0.5, 4.5]}>
                <AnimatedVector
                  from={[0, 0]}
                  to={[3, 4]}
                  color="#34D399"
                  label="|v| = 5"
                  showComponents={true}
                  delay={10}
                  strokeWidth={4.5}
                />
              </CoordinatePlane>
            </div>

            {/* Resolución analítica paso a paso */}
            <div className="col-span-7 flex flex-col gap-4 p-8 bg-[#121829]/60 rounded-2xl border border-[#1E2942]">
              <div>
                <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest">
                  Ejercicio Guiado Paso a Paso
                </span>
                <h3 className="text-2xl font-bold text-white mt-0.5 flex items-center gap-2">
                  Calcular la norma del vector <MathFormula math="\vec{v} = (3, 4)" fontSize="text-2xl" block={false} />
                </h3>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">Paso 1: Identificar componentes</span>
                  <MathFormula math="v_x = 3, \quad v_y = 4" fontSize="text-lg" block={false} />
                </div>
                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">Paso 2: Elevar al cuadrado</span>
                  <MathFormula math="v_x^2 = 9, \quad v_y^2 = 16" fontSize="text-lg" block={false} />
                </div>
                <div className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8]">Paso 3: Sumar los catetos</span>
                  <MathFormula math="9 + 16 = 25" fontSize="text-lg" block={false} />
                </div>
                <div className="p-4 rounded-xl bg-[#34D399]/10 border border-[#34D399]/40 flex items-center justify-between">
                  <span className="text-xs text-[#34D399] font-bold uppercase">Resultado Final:</span>
                  <MathFormula math="|\vec{v}| = \sqrt{25} = 5" fontSize="text-2xl" block={false} />
                </div>
              </div>
            </div>
          </div>
        </Sequence>
      </div>

      <footer className="w-full flex justify-between text-xs text-[#64748B] pt-2 border-t border-[#1E2942]/60">
        <span>Capítulo 03: Componentes y Magnitud</span>
        <span>Duración: 18.3 segundos (1100 frames @ 60 FPS)</span>
      </footer>
    </SafeZone>
  );
};
