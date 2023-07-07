import { GraphExerciseStep } from "./GraphExerciseStep";

export const graphExerciseTestDescription = (
  label: string,
  steps: Array<GraphExerciseStep>
) => {
  const stepsSegment = graphExerciseTestDescriptionStepsSegment(steps);
  return `${label} - ${stepsSegment}`;
};

export const graphExerciseTestDescriptionStepsSegment = (
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
