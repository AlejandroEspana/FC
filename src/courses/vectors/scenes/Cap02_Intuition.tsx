/**
 * src/courses/vectors/scenes/Cap02_Intuition.tsx
 * Capítulo 02: De la Observación al Vector: Punto, Desplazamiento y Flecha.
 * Implementado con máquina de estados continuos (Punto -> Desplazamiento -> Flecha -> Escalar vs Vector).
 */

import React from "react";
import { StateDrivenScene } from "../../../engine/state/StateDrivenScene";
import { SceneState } from "../../../engine/state/types";
import { CoordinatePlane } from "../../../components/graphs/CoordinatePlane";
import { MorphingVector2D, VectorMorphPhase } from "../../../components/vectors/MorphingVector2D";
import { ErrorAnalysis } from "../../../components/educational/ErrorAnalysis";
import { VECTORS_COURSE } from "../content/data";

interface IntuitionStateData {
  phase: VectorMorphPhase;
  vectorTo: [number, number];
  title: string;
  description: string;
  badge: string;
  showError?: boolean;
}

const intuitionSceneState: SceneState<IntuitionStateData> = {
  initial: {
    phase: "point",
    vectorTo: [3, 4],
    title: "1. El Punto de Partida: Origen",
    description: "Una ubicación pura en el espacio carece de orientación; es simplemente un punto de referencia.",
    badge: "Estado Inicial",
  },
  states: [
    {
      id: "point_origin",
      name: "Punto en el Espacio",
      durationFrames: 140,
      data: {
        phase: "point",
        vectorTo: [3, 4],
        title: "1. El Punto de Partida: Origen",
        description: "En reposo, un objeto se sitúa en un punto de referencia en el plano. No hay dirección ni movimiento.",
        badge: "Punto Estático",
      },
      narration: "Todo vector nace de una traslación entre dos posiciones: un punto inicial y un punto final.",
    },
    {
      id: "displacement_path",
      name: "Desplazamiento Dinámico",
      durationFrames: 160,
      data: {
        phase: "displacement",
        vectorTo: [3, 4],
        title: "2. El Desplazamiento en el Tiempo",
        description: "Al moverse hacia (3, 4), el cambio de posición describe una trayectoria orientada con longitud definida.",
        badge: "Transición Geométrica",
      },
      narration: "El desplazamiento no es solo una distancia: importa hacia dónde apunta la trayectoria.",
    },
    {
      id: "formal_vector",
      name: "Consolidación del Vector",
      durationFrames: 150,
      data: {
        phase: "arrow",
        vectorTo: [3, 4],
        title: "3. La Flecha Vectorial",
        description: "El vector reúne 3 propiedades indivisibles: Magnitud (longitud de la flecha), Dirección (inclinación) y Sentido (la punta).",
        badge: "Vector Consolidado",
      },
      narration: "La flecha vectorial representa matemáticamente el ente abstracto que modela velocidad, fuerza o desplazamiento.",
    },
    {
      id: "scalar_vs_vector",
      name: "Diferenciación Conceptual",
      durationFrames: 150,
      data: {
        phase: "arrow",
        vectorTo: [3, 4],
        title: "4. Escalar vs Vectorial",
        description: "Un escalar (rapidez 5 m/s) no indica hacia dónde se viaja; el vector velocidad (3, 4) m/s sí especifica el rumbo.",
        badge: "Rigor Físico",
        showError: true,
      },
      narration: "Nunca confundas rapidez con velocidad: la rapidez es solo el número escalar; la velocidad es un vector completo.",
    },
  ],
};

export const Cap02_Intuition: React.FC = () => {
  const meta = VECTORS_COURSE.cap02_intuition;

  return (
    <StateDrivenScene
      courseTitle={VECTORS_COURSE.title}
      chapterNumber="02"
      title={meta.title}
      subtitle={meta.subtitle}
      sceneState={intuitionSceneState}
    >
      {({ currentState, currentData, stateProgress }) => (
        <div className="grid grid-cols-12 gap-8 w-full items-center">
          {/* Mitad Izquierda: Tarjetas analíticas contextuales que se transforman */}
          <div className="col-span-5 flex flex-col gap-4">
            {!currentData.showError ? (
              <div className="p-7 rounded-2xl bg-[#0F172A]/95 border border-[#1E293B] shadow-2xl backdrop-blur-md flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#38BDF8] px-2.5 py-0.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20">
                    {currentData.badge}
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">
                    Fase: {currentData.phase}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {currentData.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {currentData.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[#070A12] border border-[#1E293B] flex items-center justify-between font-mono text-xs">
                  <span className="text-[#94A3B8]">Coordenada destino:</span>
                  <span className="text-[#34D399] font-bold">
                    ({currentData.vectorTo[0]}, {currentData.vectorTo[1]})
                  </span>
                </div>
              </div>
            ) : (
              <ErrorAnalysis
                title="Rapidez Escalar vs Velocidad Vectorial"
                misconception="Confundir el valor numérico (escalar) con el vector completo en cinemática."
                wrongDerivation={{
                  label: "Uso incorrecto como vector:",
                  math: "\\text{Rapidez } v = 50\\text{ km/h } \\implies \\text{rumbo norte}",
                }}
                correctDerivation={{
                  label: "Definición vectorial correcta:",
                  math: "\\vec{v} = 50\\hat{j}\\text{ km/h (magnitud + dirección)}",
                }}
                diagnosis="Un escalar carece de recta de acción y sentido. Dos autos con rapidez de 100 km/h pueden chocar de frente si sus vectores tienen sentidos opuestos."
              />
            )}
          </div>

          {/* Mitad Derecha: Plano Cartesiano con el Vector Morfológico Continuo */}
          <div className="col-span-7 flex flex-col items-center justify-center p-6 bg-[#0F172A]/90 rounded-2xl border border-[#1E293B] shadow-xl">
            <span className="text-xs uppercase font-extrabold text-[#38BDF8] tracking-widest mb-2 font-mono">
              Evolución Geométrica Continua
            </span>

            <CoordinatePlane
              width={640}
              height={440}
              xRange={[-0.5, 4.5]}
              yRange={[-0.5, 4.5]}
            >
              <MorphingVector2D
                from={[0, 0]}
                to={currentData.vectorTo}
                phase={currentData.phase}
                progress={stateProgress}
                label="\\vec{v} = (3, 4)"
              />
            </CoordinatePlane>
          </div>
        </div>
      )}
    </StateDrivenScene>
  );
};
