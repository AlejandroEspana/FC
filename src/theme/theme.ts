import { THEME_COLORS } from "./colors";
import { TYPOGRAPHY } from "./typography";
import { SPACING } from "./spacing";

export const THEME = {
  colors: THEME_COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
} as const;

export default THEME;
