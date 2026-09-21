/**
 * src/components/vectors/MorphingVector2D.tsx
 * Componente de transformación morfológica continua para vectores en R².
 * El vector NUNCA se desmonta ni parpadea: evoluciona fluidamente a través de:
 * Punto -> Desplazamiento -> Flecha -> Componentes -> Triángulo de Magnitud -> Arco de Dirección -> Versor Unitario.
 */

import React from "react";
import { usePlane } from "../graphs/CoordinatePlane";
import { EDUCATIONAL_THEME } from "../../theme/colors";

export type VectorMorphPhase =
  | "point"
  | "displacement"
  | "arrow"
  | "components"
  | "magnitude_triangle"
  | "direction_arc"
  | "unit_vector";

export interface MorphingVector2DProps {
  /** Coordenada de origen (por defecto [0, 0]) */
  from?: [number, number];
  /** Coordenada de destino [x, y] */
  to: [number, number];
  /** Fase morfológica actual */
  phase?: VectorMorphPhase;
  /** Factor de progreso de la fase (0 a 1) */
  progress?: number;
  /** Etiqueta del vector */
  label?: string;
  /** Elemento enfocado actualmente ("component_x" | "component_y" | "hypotenuse" | "angle") */
  activeFocus?: string;
}

export const MorphingVector2D: React.FC<MorphingVector2DProps> = ({
  from = [0, 0],
  to,
  phase = "arrow",
  progress = 1,
  label = "\\vec{v}",
  activeFocus,
}) => {
  const { toScreen } = usePlane();

  const [startX, startY] = toScreen(from[0], from[1]);
  const [finalTargetX, finalTargetY] = toScreen(to[0], to[1]);

  // Interpolación de longitud durante fase de desplazamiento o punto
  let effectiveEndX = finalTargetX;
  let effectiveEndY = finalTargetY;

  if (phase === "point") {
    effectiveEndX = startX;
    effectiveEndY = startY;
  } else if (phase === "displacement") {
    effectiveEndX = startX + (finalTargetX - startX) * progress;
    effectiveEndY = startY + (finalTargetY - startY) * progress;
  }

  const dx = effectiveEndX - startX;
  const dy = effectiveEndY - startY;
  const len = Math.sqrt(dx * dx + dy * dy);

  // Coordenadas en pantalla de las proyecciones ortogonales
  const [projX_X, projX_Y] = toScreen(to[0], from[1]);
  const [projY_X, projY_Y] = toScreen(from[0], to[1]);

  // Determinación de visibilidad según fase
  const isPointPhase = phase === "point";
  const showArrowBody = phase !== "point" && len > 2;
  const showComponents = ["components", "magnitude_triangle", "direction_arc", "unit_vector"].includes(phase);
  const showMagnitudeTriangle = ["magnitude_triangle", "direction_arc", "unit_vector"].includes(phase);
  const showDirectionArc = ["direction_arc", "unit_vector"].includes(phase);
  const showUnitVector = phase === "unit_vector";

  // Geometría de punta de flecha
  const headSize = 14;
  const ux = len > 0 ? dx / len : 0;
  const uy = len > 0 ? dy / len : 0;
  const arrowBaseX = effectiveEndX - ux * headSize;
  const arrowBaseY = effectiveEndY - uy * headSize;
  const perpX = -uy * (headSize * 0.45);
  const perpY = ux * (headSize * 0.45);

  // Ángulo en grados
  const angleRad = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const angleDeg = ((angleRad * 180) / Math.PI + 360) % 360;
  const arcRadius = 45;

  // Arco polar SVG
  const arcStartX = startX + arcRadius;
  const arcStartY = startY;
  const arcEndX = startX + Math.cos(angleRad) * arcRadius;
  const arcEndY = startY - Math.sin(angleRad) * arcRadius; // - porque Y de SVG es invertida
  const largeArcFlag = angleDeg > 180 ? 1 : 0;

  // Punto del versor unitario en coordenadas de pantalla
  const norm = Math.sqrt(to[0] * to[0] + to[1] * to[1]);
  const uCoord: [number, number] = norm > 0 ? [to[0] / norm, to[1] / norm] : [0, 0];
  const [unitEndX, unitEndY] = toScreen(uCoord[0], uCoord[1]);

  return (
    <g className="transition-all duration-300">
      {/* 1. Área sombreada del triángulo rectángulo pitagórico */}
      {showMagnitudeTriangle && (
        <polygon
          points={`${startX},${startY} ${projX_X},${projX_Y} ${finalTargetX},${finalTargetY}`}
          fill={EDUCATIONAL_THEME.result}
          fillOpacity={activeFocus === "hypotenuse" ? 0.22 : 0.12}
          stroke={EDUCATIONAL_THEME.result}
          strokeOpacity={0.3}
          strokeWidth={1}
          className="transition-opacity duration-300"
        />
      )}

      {/* 2. Símbolo de ángulo recto (cuadrado de 90°) */}
      {showMagnitudeTriangle && (
        <path
          d={`M ${projX_X - 12} ${projX_Y} L ${projX_X - 12} ${projX_Y - 12} L ${projX_X} ${projX_Y - 12}`}
          stroke={EDUCATIONAL_THEME.textSecondary}
          strokeWidth={1.5}
          fill="none"
          opacity={0.6}
        />
      )}

      {/* 3. Proyecciones ortogonales punteadas */}
      {showComponents && (
        <g opacity={0.85}>
          {/* Línea vertical punteada: (x, 0) -> (x, y) */}
          <line
            x1={projX_X}
            y1={projX_Y}
            x2={finalTargetX}
            y2={finalTargetY}
            stroke={EDUCATIONAL_THEME.studyVariable}
            strokeWidth={activeFocus === "component_y" ? 3 : 1.8}
            strokeDasharray="4 4"
          />
          {/* Línea horizontal punteada: (0, y) -> (x, y) */}
          <line
            x1={projY_X}
            y1={projY_Y}
            x2={finalTargetX}
            y2={finalTargetY}
            stroke={EDUCATIONAL_THEME.originalData}
            strokeWidth={activeFocus === "component_x" ? 3 : 1.8}
            strokeDasharray="4 4"
          />
        </g>
      )}

      {/* 4. Componente Vectorial Horizontal Vx (sobre el eje X) */}
      {showComponents && (
        <g>
          <line
            x1={startX}
            y1={startY}
            x2={projX_X}
            y2={projX_Y}
            stroke={EDUCATIONAL_THEME.originalData}
            strokeWidth={activeFocus === "component_x" ? 5 : 3.5}
            strokeLinecap="round"
          />
          {/* Etiqueta Vx */}
          <text
            x={(startX + projX_X) / 2}
            y={startY + 22}
            fill={EDUCATIONAL_THEME.originalData}
            fontSize={activeFocus === "component_x" ? "14" : "12"}
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
          >
            v_x = {to[0]}
          </text>
        </g>
      )}

      {/* 5. Componente Vectorial Vertical Vy (sobre el cateto vertical) */}
      {showComponents && (
        <g>
          <line
            x1={projX_X}
            y1={projX_Y}
            x2={finalTargetX}
            y2={finalTargetY}
            stroke={EDUCATIONAL_THEME.studyVariable}
            strokeWidth={activeFocus === "component_y" ? 5 : 3.5}
            strokeLinecap="round"
          />
          {/* Etiqueta Vy */}
          <text
            x={projX_X + 16}
            y={(projX_Y + finalTargetY) / 2}
            fill={EDUCATIONAL_THEME.studyVariable}
            fontSize={activeFocus === "component_y" ? "14" : "12"}
            fontWeight="bold"
            textAnchor="start"
            fontFamily="JetBrains Mono, monospace"
          >
            v_y = {to[1]}
          </text>
        </g>
      )}

      {/* 6. Arco de Dirección Polar theta */}
      {showDirectionArc && (
        <g>
          <path
            d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${arcEndX} ${arcEndY}`}
            fill="none"
            stroke={EDUCATIONAL_THEME.studyVariable}
            strokeWidth={2.5}
            strokeDasharray="3 3"
          />
          <text
            x={startX + Math.cos(angleRad / 2) * (arcRadius + 18)}
            y={startY - Math.sin(angleRad / 2) * (arcRadius + 18)}
            fill={EDUCATIONAL_THEME.studyVariable}
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
          >
            θ = {angleDeg.toFixed(1)}°
          </text>
        </g>
      )}

      {/* 7. Versor unitario u sobre la misma dirección */}
      {showUnitVector && (
        <g>
          <line
            x1={startX}
            y1={startY}
            x2={unitEndX}
            y2={unitEndY}
            stroke="#A855F7"
            strokeWidth={4.5}
            strokeLinecap="round"
          />
          <circle cx={unitEndX} cy={unitEndY} r={4} fill="#A855F7" />
          <text
            x={unitEndX + 10}
            y={unitEndY - 8}
            fill="#A855F7"
            fontSize="12"
            fontWeight="bold"
            fontFamily="JetBrains Mono, monospace"
          >
            û = v/|v|
          </text>
        </g>
      )}

      {/* 8. Cuerpo del Vector Principal */}
      {showArrowBody && (
        <g>
          <line
            x1={startX}
            y1={startY}
            x2={arrowBaseX}
            y2={arrowBaseY}
            stroke={
              activeFocus === "hypotenuse"
                ? EDUCATIONAL_THEME.result
                : EDUCATIONAL_THEME.primary
            }
            strokeWidth={activeFocus === "hypotenuse" ? 5.5 : 4}
            strokeLinecap="round"
          />
          {/* Punta de la flecha */}
          <polygon
            points={`${effectiveEndX},${effectiveEndY} ${arrowBaseX + perpX},${arrowBaseY + perpY} ${arrowBaseX - perpX},${arrowBaseY - perpY}`}
            fill={
              activeFocus === "hypotenuse"
                ? EDUCATIONAL_THEME.result
                : EDUCATIONAL_THEME.primary
            }
          />
        </g>
      )}

      {/* 9. Punto inicial o de origen con anillo de enfoque */}
      {(isPointPhase || phase === "displacement") && (
        <g>
          <circle
            cx={startX}
            cy={startY}
            r={8}
            fill={EDUCATIONAL_THEME.originalData}
            className="animate-pulse"
          />
          <circle
            cx={startX}
            cy={startY}
            r={15}
            fill="none"
            stroke={EDUCATIONAL_THEME.originalData}
            strokeWidth={2}
            strokeOpacity={0.5}
          />
          {isPointPhase && (
            <text
              x={startX + 14}
              y={startY - 12}
              fill={EDUCATIONAL_THEME.textPrimary}
              fontSize="12"
              fontWeight="bold"
              fontFamily="JetBrains Mono, monospace"
            >
              Punto Inicial (0, 0)
            </text>
          )}
        </g>
      )}

      {/* 10. Etiqueta del Vector */}
      {showArrowBody && (() => {
        const cleanLabel = label
          .replace(/\\\\vec\{([a-zA-Z])\}/g, "$1⃗")
          .replace(/\\vec\{([a-zA-Z])\}/g, "$1⃗")
          .replace(/\\\\/g, "")
          .replace(/\\/g, "");
        const boxWidth = Math.max(70, cleanLabel.length * 8.5 + 16);

        return (
          <g>
            <rect
              x={effectiveEndX + 10}
              y={effectiveEndY - 16}
              width={boxWidth}
              height={22}
              rx={6}
              fill={EDUCATIONAL_THEME.background}
              stroke={
                activeFocus === "hypotenuse"
                  ? EDUCATIONAL_THEME.result
                  : EDUCATIONAL_THEME.primary
              }
              strokeWidth={1}
              opacity={0.95}
            />
            <text
              x={effectiveEndX + 10 + boxWidth / 2}
              y={effectiveEndY}
              fill={EDUCATIONAL_THEME.textPrimary}
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
            >
              {cleanLabel}
            </text>
          </g>
        );
      })()}
    </g>
  );
};
