/**
 * src/layout/LayoutEngine.tsx
 * Componentes de distribución estructurada de pantalla (Layout, Grid, Stack, Flex, SplitLayout).
 * Eliminan posicionamientos manuales arbitrarios y garantizan proporciones uniformes.
 */

import React from "react";

// 1. Layout general
export interface LayoutProps {
  direction?: "vertical" | "horizontal";
  gap?: number;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  className?: string;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  direction = "vertical",
  gap = 24,
  align = "stretch",
  justify = "start",
  className = "",
  children,
}) => {
  const dirClass = direction === "vertical" ? "flex-col" : "flex-row";
  const alignClass =
    align === "center"
      ? "items-center"
      : align === "start"
      ? "items-start"
      : align === "end"
      ? "items-end"
      : "items-stretch";

  const justifyClass =
    justify === "center"
      ? "justify-center"
      : justify === "between"
      ? "justify-between"
      : justify === "around"
      ? "justify-around"
      : justify === "end"
      ? "justify-end"
      : "justify-start";

  return (
    <div
      style={{ gap: `${gap}px` }}
      className={`flex ${dirClass} ${alignClass} ${justifyClass} w-full ${className}`}
    >
      {children}
    </div>
  );
};

// 2. Grid de N columnas responsivo en video 1080p
export interface GridProps {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: number;
  className?: string;
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({
  columns = 2,
  gap = 32,
  className = "",
  children,
}) => {
  const colClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-2"
      : columns === 3
      ? "grid-cols-3"
      : columns === 4
      ? "grid-cols-4"
      : columns === 6
      ? "grid-cols-6"
      : "grid-cols-12";

  return (
    <div
      style={{ gap: `${gap}px` }}
      className={`grid ${colClass} w-full items-center ${className}`}
    >
      {children}
    </div>
  );
};

// 3. Stack vertical estricto
export interface StackProps {
  gap?: number;
  className?: string;
  children: React.ReactNode;
}

export const Stack: React.FC<StackProps> = ({
  gap = 16,
  className = "",
  children,
}) => {
  return (
    <div
      style={{ gap: `${gap}px` }}
      className={`flex flex-col w-full ${className}`}
    >
      {children}
    </div>
  );
};

// 4. SplitLayout para descomposición de fórmulas o gráficas (Izquierda / Derecha)
export interface SplitLayoutProps {
  leftRatio?: number; // 0.5 por defecto
  gap?: number;
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  leftRatio = 0.5,
  gap = 32,
  left,
  right,
  className = "",
}) => {
  const leftColSpan = Math.round(leftRatio * 12);
  const rightColSpan = 12 - leftColSpan;

  return (
    <div
      style={{ gap: `${gap}px` }}
      className={`grid grid-cols-12 w-full items-center ${className}`}
    >
      <div style={{ gridColumn: `span ${leftColSpan} / span ${leftColSpan}` }}>
        {left}
      </div>
      <div style={{ gridColumn: `span ${rightColSpan} / span ${rightColSpan}` }}>
        {right}
      </div>
    </div>
  );
};
