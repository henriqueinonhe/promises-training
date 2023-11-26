import { GraphExerciseStep } from "./GraphExerciseStep.js";

export const geneateGraphExerciseTestDescription = (
  label: string,
  steps: Array<GraphExerciseStep>
) => {
  const stepsSegment = generateGraphExerciseTestDescriptionStepsSegment(steps);
  return `${label} - ${stepsSegment}`;
};

export const generateGraphExerciseTestDescriptionStepsSegment = (
  steps: Array<GraphExerciseStep>
) =>
  steps
    .map(({ rejected, resolved }) => {
      if (resolved !== undefined) {
        return resolved;
      }

      if (rejected !== undefined) {
        return `!${rejected}`;
      }

      return undefined;
    })
    .filter(Boolean)
    .join(" -> ");
