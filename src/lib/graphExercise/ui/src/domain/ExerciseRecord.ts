export type ExerciseRecord = ExerciseFirstRecord | ExerciseFollowingRecord;

export type ExerciseFirstRecord = {
  created: Array<string>;
  resolved?: never;
  rejected?: never;
};

export type ExerciseFollowingRecord = {
  created: Array<string>;
} & (
  | { resolved: string; rejected?: undefined }
  | { resolved?: undefined; rejected: string }
);

export type ExerciseRecords =
  | [ExerciseFirstRecord, ...Array<ExerciseFollowingRecord>]
  | ([] & Array<ExerciseRecord>);

export const isExerciseFirstRecord = (
  step: ExerciseRecord
): step is ExerciseFirstRecord =>
  step?.rejected === undefined && step?.resolved === undefined;

export const isGraphExerciseFollowingStep = (
  step: ExerciseRecord
): step is ExerciseFollowingRecord => !isExerciseFirstRecord(step);
