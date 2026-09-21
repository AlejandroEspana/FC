import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoordinatePlane } from "./CoordinatePlane";
import { AnimatedVector } from "./AnimatedVector";
import { MathFormula } from "../math/MathFormula";

interface VectorSumGraphProps {
  u?: [number, number];
  v?: [number, number];
}

export const VectorSumGraph: React.FC<VectorSumGraphProps> = ({
  u = [3, 1],
  v = [1.5, 2.5],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const w: [number, number] = [u[0] + v[0], u[1] + v[1]];

  // 1. Frame 0 a 45: Crece u
  // 2. Frame 45 a 90: Crece v en el origen
  // 3. Frame 90 a 140: v se traslada afínmente a la punta de u (método punta-cola)
  // 4. Frame 140 en adelante: Nace el vector resultante w = u + v desde el origen
  const shiftProgress = spring({
    frame: Math.max(0, frame - 80),
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const vCurrentStart: [number, number] = [
    u[0] * shiftProgress,
    u[1] * shiftProgress,
  ];

  const vCurrentEnd: [number, number] = [
    vCurrentStart[0] + v[0],
    vCurrentStart[1] + v[1],
  ];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <CoordinatePlane width={640} height={440} xRange={[-1, 6]} yRange={[-1, 5]}>
        {/* Vector u */}
        <AnimatedVector
          from={[0, 0]}
          to={u}
          color="#38BDF8"
          label={`u = (${u[0]}, ${u[1]})`}
          delay={0}
        />

        {/* Vector v trasladándose punta-cola */}
        {frame >= 35 && (
          <AnimatedVector
            from={vCurrentStart}
            to={vCurrentEnd}
            color="#FACC15"
            label={`v = (${v[0]}, ${v[1]})`}
            delay={35}
          />
        )}

        {/* Vector resultante w = u + v */}
        {frame >= 130 && (
          <AnimatedVector
            from={[0, 0]}
            to={w}
            color="#34D399"
            label={`w = u + v = (${w[0]}, ${w[1]})`}
            delay={130}
            strokeWidth={4.5}
            labelOffset={[10, 15]}
          />
        )}
      </CoordinatePlane>

      {/* Tarjeta de cálculo algebraico instantáneo */}
      <div className="flex items-center gap-6 p-4 rounded-xl bg-[#0A0D18] border border-[#1E2942] w-full justify-around">
        <div className="text-center">
          <span className="text-xs text-[#38BDF8] font-bold block mb-1">Vector u</span>
          <MathFormula math={`\\vec{u} = (${u[0]},\\, ${u[1]})`} fontSize="text-lg" block={false} />
        </div>
        <span className="text-2xl text-[#94A3B8] font-bold">+</span>
        <div className="text-center">
          <span className="text-xs text-[#FACC15] font-bold block mb-1">Vector v</span>
          <MathFormula math={`\\vec{v} = (${v[0]},\\, ${v[1]})`} fontSize="text-lg" block={false} />
        </div>
        <span className="text-2xl text-[#94A3B8] font-bold">=</span>
        <div className="text-center">
          <span className="text-xs text-[#34D399] font-bold block mb-1">Suma Resultante</span>
          <MathFormula math={`\\vec{w} = (${w[0]},\\, ${w[1]})`} fontSize="text-lg" block={false} />
        </div>
      </div>
    </div>
  );
};
