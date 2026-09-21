import { VECTORS_COURSE } from "./content/data";
import { Cap00_Intro } from "./scenes/Cap00_Intro";
import { Cap01_Preconcepts } from "./scenes/Cap01_Preconcepts";
import { Cap02_Intuition } from "./scenes/Cap02_Intuition";
import { Cap03_FormalDefinition } from "./scenes/Cap03_FormalDefinition";
import { Cap04_Representation } from "./scenes/Cap04_Representation";
import { Cap05_Components } from "./scenes/Cap05_Components";
import { Cap06_Magnitude } from "./scenes/Cap06_Magnitude";
import { Cap07_Direction } from "./scenes/Cap07_Direction";
import { Cap08_Operations } from "./scenes/Cap08_Operations";
import { Cap09_DotProduct } from "./scenes/Cap09_DotProduct";
import { Cap10_CrossProduct } from "./scenes/Cap10_CrossProduct";
import { Cap11_Projections } from "./scenes/Cap11_Projections";
import { Cap12_CommonErrors } from "./scenes/Cap12_CommonErrors";
import { Cap13_ExercisesSummary } from "./scenes/Cap13_ExercisesSummary";
import { CourseChapterItem } from "../../compositions/CourseComposition";

export const VECTORS_CHAPTERS: CourseChapterItem[] = [
  { meta: { id: "cap00", number: "00", title: VECTORS_COURSE.cap00_intro.title, subtitle: VECTORS_COURSE.cap00_intro.subtitle, durationFrames: VECTORS_COURSE.cap00_intro.durationFrames }, component: Cap00_Intro },
  { meta: { id: "cap01", number: "01", title: VECTORS_COURSE.cap01_preconcepts.title, subtitle: VECTORS_COURSE.cap01_preconcepts.subtitle, durationFrames: VECTORS_COURSE.cap01_preconcepts.durationFrames }, component: Cap01_Preconcepts },
  { meta: { id: "cap02", number: "02", title: VECTORS_COURSE.cap02_intuition.title, subtitle: VECTORS_COURSE.cap02_intuition.subtitle, durationFrames: VECTORS_COURSE.cap02_intuition.durationFrames }, component: Cap02_Intuition },
  { meta: { id: "cap03", number: "03", title: VECTORS_COURSE.cap03_formal_definition.title, subtitle: VECTORS_COURSE.cap03_formal_definition.subtitle, durationFrames: VECTORS_COURSE.cap03_formal_definition.durationFrames }, component: Cap03_FormalDefinition },
  { meta: { id: "cap04", number: "04", title: VECTORS_COURSE.cap04_representation.title, subtitle: VECTORS_COURSE.cap04_representation.subtitle, durationFrames: VECTORS_COURSE.cap04_representation.durationFrames }, component: Cap04_Representation },
  { meta: { id: "cap05", number: "05", title: VECTORS_COURSE.cap05_components.title, subtitle: VECTORS_COURSE.cap05_components.subtitle, durationFrames: VECTORS_COURSE.cap05_components.durationFrames }, component: Cap05_Components },
  { meta: { id: "cap06", number: "06", title: VECTORS_COURSE.cap06_magnitude.title, subtitle: VECTORS_COURSE.cap06_magnitude.subtitle, durationFrames: VECTORS_COURSE.cap06_magnitude.durationFrames }, component: Cap06_Magnitude },
  { meta: { id: "cap07", number: "07", title: VECTORS_COURSE.cap07_direction.title, subtitle: VECTORS_COURSE.cap07_direction.subtitle, durationFrames: VECTORS_COURSE.cap07_direction.durationFrames }, component: Cap07_Direction },
  { meta: { id: "cap08", number: "08", title: VECTORS_COURSE.cap08_operations.title, subtitle: VECTORS_COURSE.cap08_operations.subtitle, durationFrames: VECTORS_COURSE.cap08_operations.durationFrames }, component: Cap08_Operations },
  { meta: { id: "cap09", number: "09", title: VECTORS_COURSE.cap09_dot_product.title, subtitle: VECTORS_COURSE.cap09_dot_product.subtitle, durationFrames: VECTORS_COURSE.cap09_dot_product.durationFrames }, component: Cap09_DotProduct },
  { meta: { id: "cap10", number: "10", title: VECTORS_COURSE.cap10_cross_product.title, subtitle: VECTORS_COURSE.cap10_cross_product.subtitle, durationFrames: VECTORS_COURSE.cap10_cross_product.durationFrames }, component: Cap10_CrossProduct },
  { meta: { id: "cap11", number: "11", title: VECTORS_COURSE.cap11_projections.title, subtitle: VECTORS_COURSE.cap11_projections.subtitle, durationFrames: VECTORS_COURSE.cap11_projections.durationFrames }, component: Cap11_Projections },
  { meta: { id: "cap12", number: "12", title: VECTORS_COURSE.cap12_common_errors.title, subtitle: VECTORS_COURSE.cap12_common_errors.subtitle, durationFrames: VECTORS_COURSE.cap12_common_errors.durationFrames }, component: Cap12_CommonErrors },
  { meta: { id: "cap13", number: "13", title: VECTORS_COURSE.cap13_exercises_summary.title, subtitle: VECTORS_COURSE.cap13_exercises_summary.subtitle, durationFrames: VECTORS_COURSE.cap13_exercises_summary.durationFrames }, component: Cap13_ExercisesSummary },
];

export const TOTAL_VECTORS_DURATION = VECTORS_CHAPTERS.reduce(
  (acc, ch) => acc + ch.meta.durationFrames,
  0
);

export { VECTORS_COURSE };
