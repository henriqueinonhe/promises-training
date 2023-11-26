import { Exercise } from "./Exercise.js";

export const getExercisePromisesStatus = (
  exercise: Pick<Exercise, "records">
) => {
  const records = exercise.records;

  const labels = records.reduce(
    (accum, record) => [...accum, ...record.created],
    [] as Array<string>
  );

  // Note: Order is stable as we iterate
  // over records
  const entries = labels.map((label) => {
    if (records.some((record) => record.resolved === label)) {
      return {
        label,
        status: "resolved" as const,
      };
    }

    if (records.some((record) => record.rejected === label)) {
      return {
        label,
        status: "rejected" as const,
      };
    }

    return {
      label,
      status: "pending" as const,
    };
  });

  return entries;
};
