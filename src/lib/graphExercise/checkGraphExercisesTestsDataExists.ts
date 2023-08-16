import { lstat } from "node:fs/promises";

export const checkGraphExercisesTestsDataExists = async () => {
  try {
    await lstat("./.data/graph");
  } catch {
    throw new Error(
      "Graph exercises tests data not found. Please run `npm run graph:generateTests`"
    );
  }
};
