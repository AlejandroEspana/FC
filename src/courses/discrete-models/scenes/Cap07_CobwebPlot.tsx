import React, { useMemo } from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { FunctionGraph } from "../../../components/graphs/FunctionGraph";
import { CobwebPlot } from "../../../components/graphs/CobwebPlot";
import { generateCobwebPath } from "../../../math/discrete";
import { DISCRETE_COURSE } from "../content/data";

export const Cap07_CobwebPlot: React.FC = () => {
  const meta = DISCRETE_COURSE.cap07_cobweb_plot;
  const r = meta.rValue;
  const x0 = meta.x0;

  const logisticFn = (x: number) => r * x * (1 - x);

  const segments = useMemo(() => {
    return generateCobwebPath(logisticFn, x0, 10);
  }, [r, x0]);

  return (
    <ChapterComposition
      courseTitle={DISCRETE_COURSE.title}
      chapterNumber="07"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="grid grid-cols-12 gap-8 w-full items-center">
        {/* Gráfica de Telaraña (Cobweb) */}
        <div className="col-span-7 flex flex-col items-center justify-center p-4 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
          <div className="flex items-center justify-between w-full px-2 mb-2 font-mono text-xs">
            <span className="text-[#38BDF8] font-bold">Mapa Logístico r = {r}</span>
            <span className="text-[#FACC15]">Semilla x₀ = {x0}</span>
          </div>

          <CoordinatePlane width={540} height={400} xRange={[-0.05, 1.05]} yRange={[-0.05, 1.05]} stepX={0.2} stepY={0.2}>
            {/* Recta identidad y = x */}
            <FunctionGraph f={(x) => x} xRange={[0, 1]} color="#64748B" strokeDasharray="3 3" strokeWidth={1.8} />

            {/* Curva logística y = r x (1 - x) */}
            <FunctionGraph f={logisticFn} xRange={[0, 1]} color="#38BDF8" strokeWidth={3} />

            {/* Trayectoria de telaraña dinámica */}
            <CobwebPlot segments={segments} color="#FACC15" delayPerSegmentFrames={15} />
          </CoordinatePlane>
        </div>

        {/* Panel explicativo */}
        <div className="col-span-5 flex flex-col gap-5 p-7 bg-[#121829]/70 rounded-2xl border border-[#1E2942]">
          <span className="text-xs uppercase font-extrabold text-[#38BDF8] tracking-widest font-mono">
            Mecánica de la Telaraña
          </span>
          <h3 className="text-xl font-bold text-white">
            Evolución visual de la órbita sobre la identidad
          </h3>

          <div className="space-y-3 font-sans text-xs text-[#CBD5E1] leading-relaxed">
            <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942]">
              <strong className="text-[#38BDF8] block mb-0.5">1. Paso Vertical:</strong>
              Evalúa la función: sube desde <span className="font-mono text-white">x_n</span> hasta la curva azul <span className="font-mono text-white">f(x_n) = x_{`{n+1}`}</span>.
            </div>

            <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#1E2942]">
              <strong className="text-[#FACC15] block mb-0.5">2. Paso Horizontal:</strong>
              Reubica el valor: viaja a la recta gris <span className="font-mono text-white">y = x</span> para convertir la salida en la nueva entrada del siguiente paso.
            </div>

            <div className="p-3.5 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30">
              <span className="text-[#34D399] font-bold block mb-0.5">Convergencia al Atractor:</span>
              La trayectoria espiralada se enrolla alrededor de la intersección <span className="font-mono font-bold text-white">x* = 1 - 1/2.8 ≈ 0.643</span>.
            </div>
          </div>
        </div>
      </div>
    </ChapterComposition>
  );
};
