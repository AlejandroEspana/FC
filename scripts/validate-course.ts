/**
 * Script de validación automatizada de cursos educativos
 * Ejecuta chequeos de:
 * 1. Integridad de contenido curricular
 * 2. Restricciones geométricas de Safe Area
 * 3. Reglas de colisión y superposición
 * 4. Precisión matemática
 * 5. Continuidad de estados y consistencia semántica
 */

import { VECTORS_CHAPTERS } from "../src/courses/vectors";
import { MATRICES_CHAPTERS } from "../src/courses/matrices";
import { DISCRETE_CHAPTERS } from "../src/courses/discrete-models";
import { validateNoOverlap } from "../src/layout/CollisionDetector";
import { validateInsideSafeArea } from "../src/layout/SafeArea";
import { dotProduct, vectorMagnitude, vec2, multiplyMatrices } from "../src/math";
import { validateSemanticColorConsistency } from "../src/validation/validateTransitions";
import { EDUCATIONAL_THEME } from "../src/theme/colors";

interface ValidationResult {
  suite: string;
  checks: { name: string; passed: boolean; details?: string }[];
}

function runValidation(): boolean {
  console.log("=================================================");
  console.log("   REMOTION VIDEO ENGINE - VALIDACIÓN INTEGRAL   ");
  console.log("=================================================\n");

  const results: ValidationResult[] = [];
  let allPassed = true;

  // 1. Integridad Curricular
  const courseChecks = [
    {
      name: "Curso de Vectores: 14 capítulos registrados",
      passed: VECTORS_CHAPTERS.length === 14,
    },
    {
      name: "Curso de Matrices: 11 capítulos registrados",
      passed: MATRICES_CHAPTERS.length === 11,
    },
    {
      name: "Curso de Modelos Discretos: 10 capítulos registrados",
      passed: DISCRETE_CHAPTERS.length === 10,
    },
    {
      name: "Todos los capítulos tienen componentes y duración positiva (> 0 frames)",
      passed: [
        ...VECTORS_CHAPTERS,
        ...MATRICES_CHAPTERS,
        ...DISCRETE_CHAPTERS,
      ].every((ch) => ch.meta.durationFrames > 0 && typeof ch.component === "function"),
    },
  ];
  results.push({ suite: "Integridad Curricular", checks: courseChecks });

  // 2. Geometría y Safe Area
  const safeAreaChecks = [
    {
      name: "SplitLayout Left Zone respeta Safe Area (Education Content Zone)",
      passed: validateInsideSafeArea(
        "SplitLayout Left Zone",
        { x: 140, y: 180, width: 780, height: 750 },
        "educationContentZone"
      ).isValid,
    },
    {
      name: "SplitLayout Right Zone respeta Safe Area (Education Content Zone)",
      passed: validateInsideSafeArea(
        "SplitLayout Right Zone",
        { x: 980, y: 180, width: 800, height: 750 },
        "educationContentZone"
      ).isValid,
    },
    {
      name: "Detección de No Colisión entre paneles izquierda y derecha",
      passed: !validateNoOverlap(
        { name: "Left Panel", box: { x: 140, y: 180, width: 780, height: 750 } },
        { name: "Right Panel", box: { x: 980, y: 180, width: 800, height: 750 } }
      ).hasCollision,
    },
  ];
  results.push({ suite: "Layout y Safe Area", checks: safeAreaChecks });

  // 3. Verificación Matemática
  const dotProd = dotProduct(vec2(3, 4), vec2(4, -3));
  const normVal = vectorMagnitude(vec2(3, 4));
  const matProd = multiplyMatrices(
    [[1, 2], [3, 4]],
    [[2, 0], [1, 2]]
  );

  const mathChecks = [
    {
      name: "Ortogonalidad vectorial: (3,4) . (4,-3) == 0",
      passed: dotProd === 0,
    },
    {
      name: "Norma euclidiana: ||(3,4)|| == 5",
      passed: normVal === 5,
    },
    {
      name: "Multiplicación de matrices 2x2 correcta",
      passed:
        matProd[0][0] === 4 &&
        matProd[0][1] === 4 &&
        matProd[1][0] === 10 &&
        matProd[1][1] === 8,
    },
  ];
  results.push({ suite: "Consistencia Matemática", checks: mathChecks });

  // 4. Continuidad y Consistencia Semántica
  const semanticChecks = [
    {
      name: "Rol 'originalData' mapeado a Cian (#38BDF8)",
      passed: validateSemanticColorConsistency("originalData", EDUCATIONAL_THEME.originalData).isValid,
    },
    {
      name: "Rol 'studyVariable' mapeado a Ámbar (#FACC15)",
      passed: validateSemanticColorConsistency("studyVariable", EDUCATIONAL_THEME.studyVariable).isValid,
    },
    {
      name: "Rol 'operation' mapeado a Violeta (#A855F7)",
      passed: validateSemanticColorConsistency("operation", EDUCATIONAL_THEME.operation).isValid,
    },
    {
      name: "Rol 'result' mapeado a Esmeralda (#34D399)",
      passed: validateSemanticColorConsistency("result", EDUCATIONAL_THEME.result).isValid,
    },
    {
      name: "Rol 'warning' mapeado a Coral (#FB7185)",
      passed: validateSemanticColorConsistency("warning", EDUCATIONAL_THEME.warning).isValid,
    },
  ];
  results.push({ suite: "Paleta Semántica Pedagógica", checks: semanticChecks });

  // Reporte
  for (const r of results) {
    console.log(`\n[Suite] ${r.suite}`);
    for (const c of r.checks) {
      const icon = c.passed ? "✓ PASS" : "✗ FAIL";
      console.log(`  ${icon} - ${c.name}`);
      if (!c.passed) allPassed = false;
    }
  }

  console.log("\n-------------------------------------------------");
  if (allPassed) {
    console.log("  RESULTADO: Todos los chequeos pasaron exitosamente.");
  } else {
    console.log("  RESULTADO: Se encontraron errores en la validación.");
  }
  console.log("-------------------------------------------------\n");

  return allPassed;
}

const ok = runValidation();
if (!ok) {
  process.exit(1);
}
