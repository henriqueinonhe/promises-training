export type GraphExerciseStep =
  | GraphExerciseFirstStep
  | GraphExerciseFollowingStep;

export type GraphExerciseFirstStep = {
  created: Array<string>;
  resolved?: never;
  rejected?: never;
};

export type GraphExerciseFollowingStep = {
  created: Array<string>;
} & (
  | { resolved: string; rejected?: undefined }
  | { resolved?: undefined; rejected: string }
);

export type GraphExerciseStepSequence = [
  GraphExerciseFirstStep,
  ...Array<GraphExerciseFollowingStep>
];

export const isGraphExerciseFirstStep = (
  step: GraphExerciseStep
): step is GraphExerciseFirstStep =>
  step?.rejected === undefined && step?.resolved === undefined;

export const isGraphExerciseFollowingStep = (
  step: GraphExerciseStep
): step is GraphExerciseFollowingStep => !isGraphExerciseFirstStep(step);
