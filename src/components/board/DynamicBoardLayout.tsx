/**
 * src/components/board/DynamicBoardLayout.tsx
 * Contenedor maestro del "Tablero Científico Dinámico".
 * Gestiona el lienzo 1080p, la cuadrícula milimétrica de fondo,
 * el encabezado institucional con indicador de fases, la zona segura de contenido
 * y el ticker inferior de síntesis activa.
 */

import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CourseTopic, getTopicTheme } from "../../theme/boardTheme";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../layout/SafeArea";

export interface PhaseStep {
  id: string;
  label: string;
}

export interface DynamicBoardLayoutProps {
  topic?: CourseTopic;
  courseTitle?: string;
  chapterNumber: string;
  title: string;
  subtitle?: string;
  currentPhaseIndex?: number;
  totalPhases?: number;
  phases?: PhaseStep[];
  activeTakeaway?: string;
  children: React.ReactNode;
  className?: string;
}

export const DynamicBoardLayout: React.FC<DynamicBoardLayoutProps> = ({
  topic = "vectors",
  courseTitle,
  chapterNumber,
  title,
  subtitle,
  currentPhaseIndex = 0,
  totalPhases = 1,
  phases,
  activeTakeaway,
  children,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = getTopicTheme(topic);

  // Animación suave de entrada del encabezado y pie
  const headerOpacity = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const numPhases = phases ? phases.length : Math.max(1, totalPhases);

  return (
    <div
      style={{
        width: `${CANVAS_WIDTH}px`,
        height: `${CANVAS_HEIGHT}px`,
        backgroundColor: theme.boardBg,
      }}
      className={`relative overflow-hidden select-none font-sans text-slate-900 flex flex-col justify-between p-10 ${className}`}
    >
      {/* 1. TEXTURA DE FONDO: Cuadrícula milimétrica técnica de pizarra */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${theme.boardGrid} 1.5px, transparent 1.5px),
            linear-gradient(to bottom, ${theme.boardGrid} 1.5px, transparent 1.5px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Sutil resplandor de iluminación cenital */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[250px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: theme.glowColor }}
      />

      {/* 2. ENCABEZADO SUPERIOR DEL TABLERO (Header 78px) */}
      <header
        style={{ opacity: headerOpacity }}
        className="relative z-20 w-full flex items-center justify-between pb-3 border-b border-slate-200"
      >
        <div className="flex items-center gap-4">
          {/* Badge de Temática */}
          <div
            style={{
              backgroundColor: theme.badgeBg,
              borderColor: theme.badgeBorder,
              color: theme.badgeText,
            }}
            className="px-3.5 py-1 rounded-full border text-[11px] font-mono font-extrabold uppercase tracking-widest shadow-sm flex items-center gap-1.5"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: theme.badgeText }}
            />
            <span>{theme.topicBadge}</span>
          </div>

          {/* Título del Capítulo y Subtítulo */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500">
                CAPÍTULO {chapterNumber}
              </span>
              <span className="text-slate-300 font-mono">•</span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h1>
            </div>
            {subtitle && (
              <p className="text-xs text-slate-600 font-normal tracking-wide mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Indicador de Fases / Pasos en Tablero */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              FASE {currentPhaseIndex + 1} DE {numPhases}
            </span>
            {phases && phases[currentPhaseIndex] && (
              <span className="text-xs font-bold" style={{ color: theme.primary }}>
                {phases[currentPhaseIndex].label}
              </span>
            )}
          </div>

          {/* Píldoras de progreso animadas */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-inner">
            {Array.from({ length: numPhases }).map((_, idx) => {
              const isActive = idx === currentPhaseIndex;
              const isPast = idx < currentPhaseIndex;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: isActive
                      ? theme.primary
                      : isPast
                      ? theme.result
                      : "#CBD5E1",
                    boxShadow: isActive ? `0 0 8px ${theme.primary}60` : "none",
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive ? "w-7" : "w-2.5"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. LIENZO CENTRAL DE TRABAJO (Content Canvas 870px) */}
      <main className="relative z-10 flex-1 w-full my-3 flex items-center justify-center overflow-hidden">
        {children}
      </main>

      {/* 4. PIE DE TABLERO: Síntesis Activa & Métricas (Footer 42px) */}
      <footer
        style={{ opacity: headerOpacity }}
        className="relative z-20 w-full flex items-center justify-between pt-2.5 border-t border-slate-200 text-xs font-mono text-slate-500"
      >
        {/* Ticker de Insight activo */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-6">
          <div
            style={{
              backgroundColor: `${theme.result}18`,
              borderColor: `${theme.result}45`,
              color: theme.result,
            }}
            className="px-2.5 py-0.5 rounded text-[10px] uppercase font-extrabold tracking-wider border shrink-0"
          >
            IDEA CLAVE
          </div>
          <span className="text-xs text-slate-800 truncate font-sans font-medium">
            {activeTakeaway || (courseTitle ? `${courseTitle} — Dominio Conceptual` : "Rigor analítico y geométrico")}
          </span>
        </div>

        {/* Metadatos técnicos */}
        <div className="flex items-center gap-4 text-[11px] text-slate-500 shrink-0">
          <span className="hidden sm:inline">60 FPS • Ultra HD 1080p</span>
          <span className="text-slate-300">|</span>
          <span>Frame: {frame}</span>
        </div>
      </footer>
    </div>
  );
};
