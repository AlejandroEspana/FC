import React from "react";
import { ChapterComposition } from "../../../compositions/ChapterComposition";
import { BulletList } from "../../../components/common/BulletList";
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { Vector2D } from "../../../components/vectors/Vector2D";
import { VECTORS_COURSE } from "../content/data";

export const Cap04_Representation: React.FC = () => {
  const meta = VECTORS_COURSE.cap04_representation;

  return (
    <ChapterComposition
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="04"
      title={meta.title}
      subtitle={meta.subtitle}
      durationFrames={meta.durationFrames}
    >
      <div className="grid grid-cols-12 gap-8 w-full items-center">
        {/* Gráfica de equipolencia (dos flechas paralelas iguales en distintos puntos) */}
        <div className="col-span-6 flex flex-col items-center justify-center p-4 bg-[#121829] rounded-2xl border border-[#1E2942] shadow-xl">
          <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-wider mb-2 self-start font-mono">
            Vectores Equipolentes (Misma magnitud, dirección y sentido)
          </span>
          <CoordinatePlane width={520} height={360} xRange={[-1, 6]} yRange={[-1, 5]}>
            {/* Vector aplicado en el origen */}
            <Vector2D
              from={[0, 0]}
              to={[2.5, 2]}
              color="#38BDF8"
              label="v (origen)"
              delay={5}
              strokeWidth={4.5}
            />
            {/* Vector libre trasladado rígidamente */}
            <Vector2D
              from={[2, 1.5]}
              to={[4.5, 3.5]}
              color="#FACC15"
              label="v (trasladado)"
              delay={30}
              strokeWidth={4.5}
            />
          </CoordinatePlane>
        </div>

        {/* Lista descriptiva */}
        <div className="col-span-6 flex flex-col gap-4">
          <BulletList items={meta.bullets} />
        </div>
      </div>
    </ChapterComposition>
  );
};
