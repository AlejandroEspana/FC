/**
 * src/animation/timing.ts
 * Utilidades para cálculo determinista de fotogramas, duraciones y secuencias encadenadas.
 */

export interface ChapterSegment {
  id: string;
  durationFrames: number;
  name: string;
}

export function secondsToFrames(seconds: number, fps: number = 60): number {
  return Math.round(seconds * fps);
}

export function framesToSeconds(frames: number, fps: number = 60): number {
  return frames / fps;
}

// Calcula los puntos de inicio acumulativos (startFrame) para cada segmento de un capítulo
export function calculateSegmentOffsets<T extends { durationFrames: number }>(
  segments: T[]
): (T & { startFrame: number; endFrame: number })[] {
  let currentStart = 0;

  return segments.map((seg) => {
    const startFrame = currentStart;
    const endFrame = currentStart + seg.durationFrames;
    currentStart = endFrame;

    return {
      ...seg,
      startFrame,
      endFrame,
    };
  });
}
