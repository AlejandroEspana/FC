/**
 * src/content/narration.ts
 * Utilidades para sincronización temporal de subtítulos y narración de audio.
 */

import { NarrationSegment } from "./types";

export function getActiveNarration(
  segments: NarrationSegment[],
  currentFrame: number
): NarrationSegment | null {
  const active = segments.find(
    (seg) => currentFrame >= seg.startFrame && currentFrame < seg.endFrame
  );
  return active || null;
}
