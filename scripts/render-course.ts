/**
 * Script interactivo y CLI para renderizado de cursos completos o capítulos específicos
 * Uso:
 *   npx tsx scripts/render-course.ts --course=vectors
 *   npx tsx scripts/render-course.ts --course=matrices
 *   npx tsx scripts/render-course.ts --course=discrete
 *   npx tsx scripts/render-course.ts --chapter=Vec-Cap03
 */

import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const args = process.argv.slice(2);
const params: Record<string, string> = {};

for (const arg of args) {
  if (arg.startsWith("--")) {
    const [key, val] = arg.slice(2).split("=");
    params[key] = val || "true";
  }
}

const COURSES_MAP: Record<string, { id: string; file: string }> = {
  vectors: {
    id: "Vectores-Curso-Completo",
    file: "Vectores_Curso_Completo.mp4",
  },
  matrices: {
    id: "Matrices-Curso-Completo",
    file: "Matrices_Curso_Completo.mp4",
  },
  discrete: {
    id: "Modelos-Discretos-Curso-Completo",
    file: "Modelos_Discretos_Curso_Completo.mp4",
  },
};

const outDir = path.resolve(process.cwd(), "out");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let compositionId = "";
let outputFileName = "";

if (params.chapter) {
  compositionId = params.chapter;
  outputFileName = `${params.chapter}.mp4`;
} else if (params.course && COURSES_MAP[params.course.toLowerCase()]) {
  const course = COURSES_MAP[params.course.toLowerCase()];
  compositionId = course.id;
  outputFileName = course.file;
} else {
  console.log(`
Uso del Renderizador:
  npx tsx scripts/render-course.ts --course=vectors     (Renderiza curso completo de Vectores)
  npx tsx scripts/render-course.ts --course=matrices    (Renderiza curso completo de Matrices)
  npx tsx scripts/render-course.ts --course=discrete    (Renderiza curso completo de Modelos Discretos)
  npx tsx scripts/render-course.ts --chapter=<ID>       (Renderiza un capítulo específico, ej: Vec-Cap05)

Opciones disponibles para --course:
  - vectors
  - matrices
  - discrete
`);
  process.exit(0);
}

const outputPath = path.join("out", outputFileName);
const cmd = `npx remotion render src/index.ts "${compositionId}" "${outputPath}" --concurrency=4`;

console.log(`\nIniciando renderizado de [${compositionId}] -> ${outputPath}...`);
console.log(`Comando: ${cmd}\n`);

try {
  execSync(cmd, { stdio: "inherit" });
  console.log(`\n Renderizado completado con éxito: ${outputPath}`);
} catch (err) {
  console.error(`\n Error durante el renderizado.`);
  process.exit(1);
}
