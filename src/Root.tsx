import React from "react";
import { Composition } from "remotion";
import "./style.css";
import { CourseComposition } from "./compositions/CourseComposition";
import { VECTORS_CHAPTERS, TOTAL_VECTORS_DURATION } from "./courses/vectors";
import { MATRICES_CHAPTERS, TOTAL_MATRICES_DURATION } from "./courses/matrices";
import { DISCRETE_CHAPTERS, TOTAL_DISCRETE_DURATION } from "./courses/discrete-models";

const VectorsMasterCourse: React.FC = () => (
  <CourseComposition chapters={VECTORS_CHAPTERS} />
);

const MatricesMasterCourse: React.FC = () => (
  <CourseComposition chapters={MATRICES_CHAPTERS} />
);

const DiscreteMasterCourse: React.FC = () => (
  <CourseComposition chapters={DISCRETE_CHAPTERS} />
);

export const RemotionRoot: React.FC = () => {
  const commonProps = {
    fps: 60,
    width: 1920,
    height: 1080,
  };

  return (
    <>
      {/* =========================================================================
          1. CURSOS COMPLETOS UNIFICADOS (Master Continuous Course Compositions)
          ========================================================================= */}
      <Composition
        id="Vectores-Curso-Completo"
        component={VectorsMasterCourse}
        durationInFrames={TOTAL_VECTORS_DURATION}
        {...commonProps}
      />

      <Composition
        id="Matrices-Curso-Completo"
        component={MatricesMasterCourse}
        durationInFrames={TOTAL_MATRICES_DURATION}
        {...commonProps}
      />

      <Composition
        id="Modelos-Discretos-Curso-Completo"
        component={DiscreteMasterCourse}
        durationInFrames={TOTAL_DISCRETE_DURATION}
        {...commonProps}
      />

      {/* =========================================================================
          2. CAPÍTULOS INDIVIDUALES: VECTORES (14 Capítulos)
          ========================================================================= */}
      {VECTORS_CHAPTERS.map((ch) => {
        const id = `Vec-Cap${ch.meta.number}`;
        const Component = ch.component;
        return (
          <Composition
            key={id}
            id={id}
            component={Component}
            durationInFrames={ch.meta.durationFrames}
            {...commonProps}
          />
        );
      })}

      {/* =========================================================================
          3. CAPÍTULOS INDIVIDUALES: PRODUCTO DE MATRICES (11 Capítulos)
          ========================================================================= */}
      {MATRICES_CHAPTERS.map((ch) => {
        const id = `Mat-Cap${ch.meta.number}`;
        const Component = ch.component;
        return (
          <Composition
            key={id}
            id={id}
            component={Component}
            durationInFrames={ch.meta.durationFrames}
            {...commonProps}
          />
        );
      })}

      {/* =========================================================================
          4. CAPÍTULOS INDIVIDUALES: MODELOS DISCRETOS (10 Capítulos)
          ========================================================================= */}
      {DISCRETE_CHAPTERS.map((ch) => {
        const id = `Disc-Cap${ch.meta.number}`;
        const Component = ch.component;
        return (
          <Composition
            key={id}
            id={id}
            component={Component}
            durationInFrames={ch.meta.durationFrames}
            {...commonProps}
          />
        );
      })}
    </>
  );
};
