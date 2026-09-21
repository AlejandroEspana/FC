/**
 * src/layout/SafeArea.ts
 * Especificación formal de áreas seguras en resolución 1080p (1920x1080).
 * Garantiza que textos, fórmulas y gráficas no se corten en bordes de pantallas.
 */

import { BoundingBox2D } from "../math/geometry";

export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 1080;

export interface SafeAreaConfig {
  actionSafe: BoundingBox2D;
  titleSafe: BoundingBox2D;
  educationContentZone: BoundingBox2D;
}

// 1. Zonas seguras para broadcast y video web
export const SAFE_AREAS: SafeAreaConfig = {
  // Action Safe: 93% del lienzo (seguro para gráficas y figuras)
  actionSafe: {
    x: 67,
    y: 38,
    width: 1786,
    height: 1004,
  },
  // Title Safe: 90% del lienzo (estricto para títulos y texto fundamental)
  titleSafe: {
    x: 96,
    y: 54,
    width: 1728,
    height: 972,
  },
  // Zona de Contenido Pedagógico: Reserva espacio superior para ChapterHeader y pie de página
  educationContentZone: {
    x: 96,
    y: 130,       // Por debajo del ChapterHeader (y=0..120)
    width: 1728,
    height: 890,  // Por encima de la barra de pie de página (y=1030..1080)
  },
};

// 2. Comprobar si una caja delimitadora está completamente dentro del área segura
export function isInsideSafeArea(
  box: BoundingBox2D,
  zone: "actionSafe" | "titleSafe" | "educationContentZone" = "educationContentZone"
): boolean {
  const safe = SAFE_AREAS[zone];
  return (
    box.x >= safe.x &&
    box.y >= safe.y &&
    box.x + box.width <= safe.x + safe.width &&
    box.y + box.height <= safe.y + safe.height
  );
}

// 3. Validador explícito que arroja error o diagnóstico
export function validateInsideSafeArea(
  elementName: string,
  box: BoundingBox2D,
  zone: "actionSafe" | "titleSafe" | "educationContentZone" = "educationContentZone"
): { isValid: boolean; overflowX: number; overflowY: number; message?: string } {
  const safe = SAFE_AREAS[zone];
  const leftOverflow = Math.max(0, safe.x - box.x);
  const topOverflow = Math.max(0, safe.y - box.y);
  const rightOverflow = Math.max(0, box.x + box.width - (safe.x + safe.width));
  const bottomOverflow = Math.max(0, box.y + box.height - (safe.y + safe.height));

  const overflowX = leftOverflow + rightOverflow;
  const overflowY = topOverflow + bottomOverflow;
  const isValid = overflowX === 0 && overflowY === 0;

  let message: string | undefined;
  if (!isValid) {
    message = `[SAFE_AREA_VIOLATION] Elemento '${elementName}' desborda la zona '${zone}'. Desborde X: ${overflowX}px, Desborde Y: ${overflowY}px.`;
  }

  return { isValid, overflowX, overflowY, message };
}
