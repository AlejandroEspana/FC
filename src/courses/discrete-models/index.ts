import { DISCRETE_COURSE } from "./content/data";
import { Cap00_Intro } from "./scenes/Cap00_Intro";
import { Cap01_Sequences } from "./scenes/Cap01_Sequences";
import { Cap02_Recurrences } from "./scenes/Cap02_Recurrences";
import { Cap03_MalthusianGrowth } from "./scenes/Cap03_MalthusianGrowth";
import { Cap04_LogisticModel } from "./scenes/Cap04_LogisticModel";
import { Cap05_DynamicalSystems } from "./scenes/Cap05_DynamicalSystems";
import { Cap06_FixedPointsStability } from "./scenes/Cap06_FixedPointsStability";
import { Cap07_CobwebPlot } from "./scenes/Cap07_CobwebPlot";
import { Cap08_ChaosBifurcations } from "./scenes/Cap08_ChaosBifurcations";
import { Cap09_ExercisesSummary } from "./scenes/Cap09_ExercisesSummary";
import { CourseChapterItem } from "../../compositions/CourseComposition";

export const DISCRETE_CHAPTERS: CourseChapterItem[] = [
  { meta: { id: "disc-cap00", number: "00", title: DISCRETE_COURSE.cap00_intro.title, subtitle: DISCRETE_COURSE.cap00_intro.subtitle, durationFrames: DISCRETE_COURSE.cap00_intro.durationFrames }, component: Cap00_Intro },
  { meta: { id: "disc-cap01", number: "01", title: DISCRETE_COURSE.cap01_sequences.title, subtitle: DISCRETE_COURSE.cap01_sequences.subtitle, durationFrames: DISCRETE_COURSE.cap01_sequences.durationFrames }, component: Cap01_Sequences },
  { meta: { id: "disc-cap02", number: "02", title: DISCRETE_COURSE.cap02_recurrences.title, subtitle: DISCRETE_COURSE.cap02_recurrences.subtitle, durationFrames: DISCRETE_COURSE.cap02_recurrences.durationFrames }, component: Cap02_Recurrences },
  { meta: { id: "disc-cap03", number: "03", title: DISCRETE_COURSE.cap03_malthusian_growth.title, subtitle: DISCRETE_COURSE.cap03_malthusian_growth.subtitle, durationFrames: DISCRETE_COURSE.cap03_malthusian_growth.durationFrames }, component: Cap03_MalthusianGrowth },
  { meta: { id: "disc-cap04", number: "04", title: DISCRETE_COURSE.cap04_logistic_model.title, subtitle: DISCRETE_COURSE.cap04_logistic_model.subtitle, durationFrames: DISCRETE_COURSE.cap04_logistic_model.durationFrames }, component: Cap04_LogisticModel },
  { meta: { id: "disc-cap05", number: "05", title: DISCRETE_COURSE.cap05_dynamical_systems.title, subtitle: DISCRETE_COURSE.cap05_dynamical_systems.subtitle, durationFrames: DISCRETE_COURSE.cap05_dynamical_systems.durationFrames }, component: Cap05_DynamicalSystems },
  { meta: { id: "disc-cap06", number: "06", title: DISCRETE_COURSE.cap06_fixed_points_stability.title, subtitle: DISCRETE_COURSE.cap06_fixed_points_stability.subtitle, durationFrames: DISCRETE_COURSE.cap06_fixed_points_stability.durationFrames }, component: Cap06_FixedPointsStability },
  { meta: { id: "disc-cap07", number: "07", title: DISCRETE_COURSE.cap07_cobweb_plot.title, subtitle: DISCRETE_COURSE.cap07_cobweb_plot.subtitle, durationFrames: DISCRETE_COURSE.cap07_cobweb_plot.durationFrames }, component: Cap07_CobwebPlot },
  { meta: { id: "disc-cap08", number: "08", title: DISCRETE_COURSE.cap08_chaos_bifurcations.title, subtitle: DISCRETE_COURSE.cap08_chaos_bifurcations.subtitle, durationFrames: DISCRETE_COURSE.cap08_chaos_bifurcations.durationFrames }, component: Cap08_ChaosBifurcations },
  { meta: { id: "disc-cap09", number: "09", title: DISCRETE_COURSE.cap09_exercises_summary.title, subtitle: DISCRETE_COURSE.cap09_exercises_summary.subtitle, durationFrames: DISCRETE_COURSE.cap09_exercises_summary.durationFrames }, component: Cap09_ExercisesSummary },
];

export const TOTAL_DISCRETE_DURATION = DISCRETE_CHAPTERS.reduce(
  (acc, ch) => acc + ch.meta.durationFrames,
  0
);

export { DISCRETE_COURSE };
