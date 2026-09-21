import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoordinatePlane } from "./CoordinatePlane";
import { AnimatedVector } from "./AnimatedVector";
import { MathFormula } from "../math/MathFormula";

export const ScalarMultGraph: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const baseV: [number, number] = [2, 1];

  // Fases de escalamiento por tiempo:
  // Frame 0-60: c = 1 (vector original)
  // Frame 60-140: c sube a 2.0 (dilatación)
  // Frame 140-220: c baja a 0.5 (contracción)
  // Frame 220-300: c se invierte a -1.5 (inversión de sentido y dilatación)

  let c = 1.0;
  let phaseName = "Vector Base Original (c = 1)";
  let phaseColor = "#38BDF8";
  let explanation = "La magnitud es |v| y la dirección se mantiene inalterada.";

  if (frame >= 60 && frame < 140) {
    const p = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 80 } });
    c = interpolate(p, [0, 1], [1.0, 2.0]);
    phaseName = "Dilatación o Estiramiento (c = 2 > 1)";
    phaseColor = "#34D399";
    explanation = "La magnitud se duplica (2|v|), el sentido y dirección se conservan.";
  } else if (frame >= 140 && frame < 220) {
    const p = spring({ frame: frame - 140, fps, config: { damping: 14, stiffness: 80 } });
    c = interpolate(p, [0, 1], [2.0, 0.5]);
    phaseName = "Contracción o Acortamiento (0 < c = 0.5 < 1)";
    phaseColor = "#FACC15";
    explanation = "La magnitud se reduce a la mitad (0.5|v|), sin cambiar de dirección.";
  } else if (frame >= 220) {
    const p = spring({ frame: frame - 220, fps, config: { damping: 14, stiffness: 80 } });
    c = interpolate(p, [0, 1], [0.5, -1.5]);
    phaseName = "Inversión y Dilatación (c = -1.5 < 0)";
    phaseColor = "#F87171";
    explanation = "El signo negativo invierte el sentido 180°; el valor absoluto 1.5 alarga el vector.";
  }

  const scaledV: [number, number] = [baseV[0] * c, baseV[1] * c];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <CoordinatePlane width={640} height={440} xRange={[-4, 5]} yRange={[-3, 3]}>
        {/* Línea directriz colineal (recta infinita que muestra colinealidad) */}
        <line
          x1="0"
          y1="540"
          x2="640"
          y2="0"
          stroke="#1E2942"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* Vector base de referencia en gris/azul tenue */}
        <AnimatedVector
          from={[0, 0]}
          to={baseV}
          color="#38BDF860"
          label="v base = (2, 1)"
          delay={0}
          strokeWidth={2}
        />

        {/* Vector escalado dinámico */}
        <AnimatedVector
          from={[0, 0]}
          to={scaledV}
          color={phaseColor}
          label={`c·v = (${scaledV[0].toFixed(1)}, ${scaledV[1].toFixed(1)})`}
          delay={0}
          strokeWidth={4.5}
        />
      </CoordinatePlane>

      {/* Panel explicativo del estado del escalar */}
      <div className="p-4 rounded-xl bg-[#0A0D18] border border-[#1E2942] w-full flex items-center justify-between">
        <div className="flex flex-col">
          <span style={{ color: phaseColor }} className="text-xs font-bold uppercase tracking-wider">
            {phaseName}
          </span>
          <p className="text-sm text-[#CBD5E1] mt-0.5">{explanation}</p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-[#121829] border border-[#1E2942] text-center">
          <span className="text-[10px] text-[#94A3B8] uppercase block">Factor c</span>
          <span style={{ color: phaseColor }} className="text-xl font-mono font-bold">
            c = {c.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
