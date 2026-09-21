import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CoordinatePlane } from "./CoordinatePlane";
import { AnimatedVector } from "./AnimatedVector";
import { MathFormula } from "../math/MathFormula";

interface VectorSubtractionGraphProps {
  u?: [number, number];
  v?: [number, number];
}

export const VectorSubtractionGraph: React.FC<VectorSubtractionGraphProps> = ({
  u = [4, 2],
  v = [1.5, 3],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const diff: [number, number] = [u[0] - v[0], u[1] - v[1]];
  const negV: [number, number] = [-v[0], -v[1]];

  // Fases de animación:
  // 1. Frame 0 a 35: Aparecen u y v desde el origen
  // 2. Frame 40 a 80: Se muestra el vector opuesto -v (inversión de sentido 180°)
  // 3. Frame 85 a 130: Nace el vector resta (u - v) desde la punta de v hasta la punta de u
  // 4. Frame 135 en adelante: Se muestra la equivalencia de traslación al origen

  const showOpposite = frame >= 35;
  const showDiff = frame >= 80;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <CoordinatePlane width={640} height={440} xRange={[-3, 5]} yRange={[-4, 4]}>
        {/* Vector u */}
        <AnimatedVector
          from={[0, 0]}
          to={u}
          color="#38BDF8"
          label={`u = (${u[0]}, ${u[1]})`}
          delay={0}
        />

        {/* Vector v */}
        <AnimatedVector
          from={[0, 0]}
          to={v}
          color="#FACC15"
          label={`v = (${v[0]}, ${v[1]})`}
          delay={15}
        />

        {/* Vector opuesto -v (invertido hacia el cuadrante opuesto) */}
        {showOpposite && (
          <AnimatedVector
            from={[0, 0]}
            to={negV}
            color="#FB923C"
            label={`-v = (${negV[0]}, ${negV[1]})`}
            delay={35}
            strokeWidth={2.5}
            labelOffset={[-10, -15]}
          />
        )}

        {/* Vector Resta Punta a Punta: desde la punta de v hacia la punta de u */}
        {showDiff && (
          <AnimatedVector
            from={v}
            to={u}
            color="#34D399"
            label={`u - v = (${diff[0]}, ${diff[1]})`}
            delay={80}
            strokeWidth={4.5}
            labelOffset={[10, -10]}
          />
        )}
      </CoordinatePlane>

      {/* Explicación de doble interpretación */}
      <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#0A0D18] border border-[#1E2942] w-full text-xs">
        <div className="flex flex-col gap-1 border-r border-[#1E2942] pr-3">
          <span className="font-bold text-[#34D399] uppercase tracking-wider">
            Interpretación Geométrica Directa
          </span>
          <p className="text-[#CBD5E1]">
            <strong className="text-white">De punta a punta:</strong> Va desde el extremo de <span className="text-[#FACC15] font-bold">\vec{v}</span> (sustraendo) hasta el extremo de <span className="text-[#38BDF8] font-bold">\vec{u}</span> (minuendo).
          </p>
        </div>
        <div className="flex flex-col gap-1 pl-1">
          <span className="font-bold text-[#FB923C] uppercase tracking-wider">
            Interpretación Algebraica
          </span>
          <p className="text-[#CBD5E1]">
            Equivale exactamente a sumar el opuesto:{" "}
            <span className="font-mono text-white">\vec{u} - \vec{v} = \vec{u} + (-\vec{v}) = ({diff[0]},\, {diff[1]})</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
