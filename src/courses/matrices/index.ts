import { MATRICES_COURSE } from "./content/data";
import { Cap00_Intro } from "./scenes/Cap00_Intro";
import { Cap01_Anatomy } from "./scenes/Cap01_Anatomy";
import { Cap02_SpecialTypes } from "./scenes/Cap02_SpecialTypes";
import { Cap03_Operations } from "./scenes/Cap03_Operations";
import { Cap04_DimensionCompatibility } from "./scenes/Cap04_DimensionCompatibility";
import { Cap05_MultiplicationAlgorithm } from "./scenes/Cap05_MultiplicationAlgorithm";
import { Cap06_Properties } from "./scenes/Cap06_Properties";
import { Cap07_NonCommutativity } from "./scenes/Cap07_NonCommutativity";
import { Cap08_Geometric2D } from "./scenes/Cap08_Geometric2D";
import { Cap09_Applications } from "./scenes/Cap09_Applications";
import { Cap10_ExercisesSummary } from "./scenes/Cap10_ExercisesSummary";
import { CourseChapterItem } from "../../compositions/CourseComposition";

export const MATRICES_CHAPTERS: CourseChapterItem[] = [
  { meta: { id: "mat-cap00", number: "00", title: MATRICES_COURSE.cap00_intro.title, subtitle: MATRICES_COURSE.cap00_intro.subtitle, durationFrames: MATRICES_COURSE.cap00_intro.durationFrames }, component: Cap00_Intro },
  { meta: { id: "mat-cap01", number: "01", title: MATRICES_COURSE.cap01_anatomy.title, subtitle: MATRICES_COURSE.cap01_anatomy.subtitle, durationFrames: MATRICES_COURSE.cap01_anatomy.durationFrames }, component: Cap01_Anatomy },
  { meta: { id: "mat-cap02", number: "02", title: MATRICES_COURSE.cap02_special_types.title, subtitle: MATRICES_COURSE.cap02_special_types.subtitle, durationFrames: MATRICES_COURSE.cap02_special_types.durationFrames }, component: Cap02_SpecialTypes },
  { meta: { id: "mat-cap03", number: "03", title: MATRICES_COURSE.cap03_operations.title, subtitle: MATRICES_COURSE.cap03_operations.subtitle, durationFrames: MATRICES_COURSE.cap03_operations.durationFrames }, component: Cap03_Operations },
  { meta: { id: "mat-cap04", number: "04", title: MATRICES_COURSE.cap04_dimension_compatibility.title, subtitle: MATRICES_COURSE.cap04_dimension_compatibility.subtitle, durationFrames: MATRICES_COURSE.cap04_dimension_compatibility.durationFrames }, component: Cap04_DimensionCompatibility },
  { meta: { id: "mat-cap05", number: "05", title: MATRICES_COURSE.cap05_multiplication_algorithm.title, subtitle: MATRICES_COURSE.cap05_multiplication_algorithm.subtitle, durationFrames: MATRICES_COURSE.cap05_multiplication_algorithm.durationFrames }, component: Cap05_MultiplicationAlgorithm },
  { meta: { id: "mat-cap06", number: "06", title: MATRICES_COURSE.cap06_properties.title, subtitle: MATRICES_COURSE.cap06_properties.subtitle, durationFrames: MATRICES_COURSE.cap06_properties.durationFrames }, component: Cap06_Properties },
  { meta: { id: "mat-cap07", number: "07", title: MATRICES_COURSE.cap07_non_commutativity.title, subtitle: MATRICES_COURSE.cap07_non_commutativity.subtitle, durationFrames: MATRICES_COURSE.cap07_non_commutativity.durationFrames }, component: Cap07_NonCommutativity },
  { meta: { id: "mat-cap08", number: "08", title: MATRICES_COURSE.cap08_geometric_2d.title, subtitle: MATRICES_COURSE.cap08_geometric_2d.subtitle, durationFrames: MATRICES_COURSE.cap08_geometric_2d.durationFrames }, component: Cap08_Geometric2D },
  { meta: { id: "mat-cap09", number: "09", title: MATRICES_COURSE.cap09_applications.title, subtitle: MATRICES_COURSE.cap09_applications.subtitle, durationFrames: MATRICES_COURSE.cap09_applications.durationFrames }, component: Cap09_Applications },
  { meta: { id: "mat-cap10", number: "10", title: MATRICES_COURSE.cap10_exercises_summary.title, subtitle: MATRICES_COURSE.cap10_exercises_summary.subtitle, durationFrames: MATRICES_COURSE.cap10_exercises_summary.durationFrames }, component: Cap10_ExercisesSummary },
];

export const TOTAL_MATRICES_DURATION = MATRICES_CHAPTERS.reduce(
  (acc, ch) => acc + ch.meta.durationFrames,
  0
);

export { MATRICES_COURSE };
