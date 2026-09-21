/**
 * src/theme/typography.ts
 * Jerarquía tipográfica estandarizada para pantallas 1080p.
 */

export const TYPOGRAPHY = {
  fonts: {
    sans: "Inter, system-ui, -apple-system, sans-serif",
    mono: "JetBrains Mono, Menlo, monospace",
    math: "KaTeX_Main, Times New Roman, serif",
  },
  sizes: {
    heroTitle: "text-4xl lg:text-5xl font-extrabold tracking-tight",
    chapterTitle: "text-3xl font-extrabold tracking-tight",
    sectionTitle: "text-2xl font-bold tracking-tight",
    cardTitle: "text-xl font-bold",
    body: "text-base leading-relaxed",
    caption: "text-sm text-[#94A3B8]",
    tag: "text-xs font-bold uppercase tracking-wider",
  },
} as const;
