import React from "react";
import { useCurrentFrame } from "remotion";
import { CoordinatePlane } from "../graphs/CoordinatePlane";
import { Vector2D } from "./Vector2D";

export interface VectorSubtractionGraphProps {
  u?: [number, number];
  v?: [number, number];
}

export const VectorSubtractionGraph: React.FC<VectorSubtractionGraphProps> = ({
  u = [4, 2],
  v = [1.5, 3],
}) => {
  const frame = useCurrentFrame();

  const diff: [number, number] = [u[0] - v[0], u[1] - v[1]];
  const negV: [number, number] = [-v[0], -v[1]];

  const showOpposite = frame >= 40;
  const showDiff = frame >= 85;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <CoordinatePlane width={540} height={380} xRange={[-2.5, 5.5]} yRange={[-3.5, 4.5]}>
        {/* Vector u */}
        <Vector2D
          from={[0, 0]}
          to={u}
          color="#38BDF8"
          label="u = (4, 2)"
          delay={5}
          strokeWidth={4.5}
        />

        {/* Vector v */}
        <Vector2D
          from={[0, 0]}
          to={v}
          color="#FACC15"
          label="v = (1.5, 3)"
          delay={20}
          strokeWidth={4.5}
        />

        {/* Vector opuesto -v */}
        {showOpposite && (
          <Vector2D
            from={[0, 0]}
            to={negV}
            color="#FB923C"
            label="-v = (-1.5, -3)"
            delay={40}
            strokeWidth={3.5}
          />
        )}

        {/* Vector resta directo desde la punta de v hasta la punta de u */}
        {showDiff && (
          <Vector2D
            from={v}
            to={u}
            color="#F43F5E"
            label="u - v = (2.5, -1)"
            delay={85}
            strokeWidth={5}
          />
        )}
      </CoordinatePlane>

      <div className="flex items-center gap-6 text-xs text-[#94A3B8] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#38BDF8]" />
          <span>u = (4, 2)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FACC15]" />
          <span>v = (1.5, 3)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FB923C]" />
          <span>-v (Opuesto)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#F43F5E]" />
          <span className="font-bold text-white">u - v (Punta a Punta)</span>
        </div>
      </div>
    </div>
  );
};
