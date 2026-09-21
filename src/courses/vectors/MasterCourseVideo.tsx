import React from "react";
import { Sequence } from "remotion";
import { Cap00_Intro } from "./chapters/Cap00_Intro";
import { Cap01_ScalarsVsVectors } from "./chapters/Cap01_ScalarsVsVectors";
import { Cap02_VectorConcept } from "./chapters/Cap02_VectorConcept";
import { Cap03_ComponentsMagnitude } from "./chapters/Cap03_ComponentsMagnitude";
import { Cap04_DirectionUnitVector } from "./chapters/Cap04_DirectionUnitVector";
import { Cap05_VectorOperations } from "./chapters/Cap05_VectorOperations";
import { Cap06_DotProduct } from "./chapters/Cap06_DotProduct";
import { Cap07_CrossProduct3D } from "./chapters/Cap07_CrossProduct3D";
import { Cap08_SummaryExercises } from "./chapters/Cap08_SummaryExercises";

export const CHAPTER_DURATIONS = {
  cap00: 900,
  cap01: 1200,
  cap02: 900,
  cap03: 1100,
  cap04: 1140,
  cap05: 1800,
  cap06: 1480,
  cap07: 1540,
  cap08: 1600,
};

export const TOTAL_COURSE_DURATION =
  CHAPTER_DURATIONS.cap00 +
  CHAPTER_DURATIONS.cap01 +
  CHAPTER_DURATIONS.cap02 +
  CHAPTER_DURATIONS.cap03 +
  CHAPTER_DURATIONS.cap04 +
  CHAPTER_DURATIONS.cap05 +
  CHAPTER_DURATIONS.cap06 +
  CHAPTER_DURATIONS.cap07 +
  CHAPTER_DURATIONS.cap08;

export const MasterCourseVideo: React.FC = () => {
  let currentOffset = 0;

  const c0Start = currentOffset;
  currentOffset += CHAPTER_DURATIONS.cap00;

  const c1Start = currentOffset;
  currentOffset += CHAPTER_DURATIONS.cap01;

  const c2Start = currentOffset;
  currentOffset += CHAPTER_DURATIONS.cap02;

  const c3Start = currentOffset;
  currentOffset += CHAPTER_DURATIONS.cap03;

  const c4Start = currentOffset;
  currentOffset += CHAPTER_DURATIONS.cap04;

  const c5Start = currentOffset;
  currentOffset += CHAPTER_DURATIONS.cap05;

  const c6Start = currentOffset;
  currentOffset += CHAPTER_DURATIONS.cap06;

  const c7Start = currentOffset;
  currentOffset += CHAPTER_DURATIONS.cap07;

  const c8Start = currentOffset;

  return (
    <div className="w-full h-full bg-[#070A12]">
      <Sequence from={c0Start} durationInFrames={CHAPTER_DURATIONS.cap00} name="Capitulo00_Intro">
        <Cap00_Intro />
      </Sequence>

      <Sequence from={c1Start} durationInFrames={CHAPTER_DURATIONS.cap01} name="Capitulo01_EscalaresVsVectores">
        <Cap01_ScalarsVsVectors />
      </Sequence>

      <Sequence from={c2Start} durationInFrames={CHAPTER_DURATIONS.cap02} name="Capitulo02_ConceptoVector">
        <Cap02_VectorConcept />
      </Sequence>

      <Sequence from={c3Start} durationInFrames={CHAPTER_DURATIONS.cap03} name="Capitulo03_ComponentesYMagnitud">
        <Cap03_ComponentsMagnitude />
      </Sequence>

      <Sequence from={c4Start} durationInFrames={CHAPTER_DURATIONS.cap04} name="Capitulo04_DireccionYUnitario">
        <Cap04_DirectionUnitVector />
      </Sequence>

      <Sequence from={c5Start} durationInFrames={CHAPTER_DURATIONS.cap05} name="Capitulo05_OperacionesVectoriales">
        <Cap05_VectorOperations />
      </Sequence>

      <Sequence from={c6Start} durationInFrames={CHAPTER_DURATIONS.cap06} name="Capitulo06_ProductoPunto">
        <Cap06_DotProduct />
      </Sequence>

      <Sequence from={c7Start} durationInFrames={CHAPTER_DURATIONS.cap07} name="Capitulo07_ProductoCruz3D">
        <Cap07_CrossProduct3D />
      </Sequence>

      <Sequence from={c8Start} durationInFrames={CHAPTER_DURATIONS.cap08} name="Capitulo08_ResumenYEjercicios">
        <Cap08_SummaryExercises />
      </Sequence>
    </div>
  );
};
