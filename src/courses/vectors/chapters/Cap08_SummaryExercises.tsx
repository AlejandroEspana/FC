import React from "react";
import { Sequence } from "remotion";
import { SafeZone } from "../../../core/layout/SafeZone";
import { ChapterHeader } from "../../../core/layout/ChapterHeader";
import { BulletList } from "../../../components/cards/BulletList";
import { CoordinatePlane } from "../../../components/geometry2d/CoordinatePlane";
import { AnimatedVector } from "../../../components/geometry2d/AnimatedVector";
import { MathFormula } from "../../../components/math/MathFormula";
import { VECTORS_CONTENT } from "../content";

export const Cap08_SummaryExercises: React.FC = () => {
  const content = VECTORS_CONTENT.cap08_summary_exercises;

  return (
    <SafeZone>
      <ChapterHeader
        courseTitle={VECTORS_CONTENT.courseTitle}
        chapterNumber="08"
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative">
        {/* Sección 1: Resumen Maestro de los 3 Pilares Fundamentales (0 a 360 frames) */}
        <Sequence from={0} durationInFrames={360} name="ResumenMaestro">
          <div className="flex flex-col items-center max-w-4xl w-full">
            <div className="text-center mb-6">
              <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest">
                Síntesis Conceptual del Curso
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Pilares Esenciales del Álgebra Vectorial
              </h2>
            </div>
            <BulletList items={content.summaryBullets} />
          </div>
        </Sequence>

        {/* Sección 2: Ejercicio 1 (Básico: Magnitud y Ángulo) (360 a 760 frames) */}
        <Sequence from={360} durationInFrames={400} name="Ejercicio1Basico">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            {/* Gráfica de soporte */}
            <div className="col-span-5 flex flex-col items-center justify-center p-6 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-wider mb-2">
                Representación Cartesiana v = (3, 4)
              </span>
              <CoordinatePlane width={480} height={360} xRange={[-0.5, 4.5]} yRange={[-0.5, 4.5]}>
                <AnimatedVector
                  from={[0, 0]}
                  to={[3, 4]}
                  color="#38BDF8"
                  label="|v| = 5"
                  showComponents={true}
                  delay={5}
                  strokeWidth={4.5}
                />
              </CoordinatePlane>
            </div>

            {/* Resolución analítica paso a paso */}
            <div className="col-span-7 flex flex-col gap-4 p-8 bg-[#121829]/60 rounded-2xl border border-[#1E2942]">
              <div>
                <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest">
                  {content.exercise1.level}
                </span>
                <p className="text-sm text-slate-300 mt-1 font-sans">
                  {content.exercise1.prompt}
                </p>
              </div>

              <div className="space-y-3 font-mono">
                {content.exercise1.steps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8]">{step.label}:</span>
                    <MathFormula math={step.math} fontSize="text-base" block={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Sequence>

        {/* Sección 3: Ejercicio 2 (Intermedio: Suma y Ortogonalidad) (760 a 1160 frames) */}
        <Sequence from={760} durationInFrames={400} name="Ejercicio2Intermedio">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            {/* Gráfica de los vectores u, v y w */}
            <div className="col-span-5 flex flex-col items-center justify-center p-6 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <span className="text-xs uppercase font-bold text-[#34D399] tracking-wider mb-2">
                Superposición de u = (2, 5) y v = (4, -1)
              </span>
              <CoordinatePlane width={480} height={360} xRange={[-1, 7]} yRange={[-2, 6]}>
                <AnimatedVector
                  from={[0, 0]}
                  to={[2, 5]}
                  color="#38BDF8"
                  label="u = (2, 5)"
                  delay={5}
                  strokeWidth={4}
                />
                <AnimatedVector
                  from={[0, 0]}
                  to={[4, -1]}
                  color="#FACC15"
                  label="v = (4, -1)"
                  delay={20}
                  strokeWidth={4}
                />
                <AnimatedVector
                  from={[0, 0]}
                  to={[6, 4]}
                  color="#34D399"
                  label="w = (6, 4)"
                  delay={45}
                  strokeWidth={5}
                />
              </CoordinatePlane>
            </div>

            {/* Resolución analítica */}
            <div className="col-span-7 flex flex-col gap-4 p-8 bg-[#121829]/60 rounded-2xl border border-[#1E2942]">
              <div>
                <span className="text-xs uppercase font-bold text-[#34D399] tracking-widest">
                  {content.exercise2.level}
                </span>
                <p className="text-sm text-slate-300 mt-1 font-sans">
                  {content.exercise2.prompt}
                </p>
              </div>

              <div className="space-y-3 font-mono">
                {content.exercise2.steps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8]">{step.label}:</span>
                    <MathFormula math={step.math} fontSize="text-base" block={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Sequence>

        {/* Sección 4: Ejercicio 3 (Avanzado: Determinante Producto Cruz) (1160 a 1600 frames) */}
        <Sequence from={1160} durationInFrames={440} name="Ejercicio3Avanzado">
          <div className="grid grid-cols-12 gap-8 w-full items-center">
            {/* Tarjeta de planteamiento con determinante resaltado */}
            <div className="col-span-5 flex flex-col items-center justify-center p-6 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
              <span className="text-xs uppercase font-bold text-[#FACC15] tracking-wider mb-4">
                Planteamiento Matricial en R³
              </span>
              <div className="p-4 rounded-xl bg-[#0A0D18] border border-[#1E2942] w-full flex justify-center">
                <MathFormula
                  math="\vec{a} \times \vec{b} = \det \begin{bmatrix} \hat{i} & \hat{j} & \hat{k} \\ 1 & 2 & 0 \\ 0 & 3 & 1 \end{bmatrix}"
                  fontSize="text-xl"
                  block={true}
                />
              </div>
              <div className="mt-4 text-xs text-[#94A3B8] text-center font-sans">
                Vectores: <span className="text-[#38BDF8] font-mono">a = (1, 2, 0)</span>,{" "}
                <span className="text-[#FACC15] font-mono">b = (0, 3, 1)</span>
              </div>
            </div>

            {/* Resolución analítica de Laplace */}
            <div className="col-span-7 flex flex-col gap-4 p-8 bg-[#121829]/60 rounded-2xl border border-[#1E2942]">
              <div>
                <span className="text-xs uppercase font-bold text-[#FACC15] tracking-widest">
                  {content.exercise3.level}
                </span>
                <p className="text-sm text-slate-300 mt-1 font-sans">
                  {content.exercise3.prompt}
                </p>
              </div>

              <div className="space-y-3 font-mono">
                {content.exercise3.steps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0D18] border border-[#1E2942] flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8]">{step.label}:</span>
                    <MathFormula math={step.math} fontSize="text-sm" block={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Sequence>
      </div>

      <footer className="w-full flex justify-between text-xs text-[#64748B] pt-2 border-t border-[#1E2942]/60">
        <span>Capítulo 08: Resumen y Ejercicios de Dominio</span>
        <span>Duración: 26.6 segundos (1600 frames @ 60 FPS)</span>
      </footer>
    </SafeZone>
  );
};
