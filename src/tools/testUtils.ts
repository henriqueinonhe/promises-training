import { MakeExercise } from "./Exercise";
import { makeCreatePromise } from "./createPromise";
import { createPromisesRecords } from "./createPromisesRecords";

type SetupParams = {
  makeExercise: MakeExercise;
};

export const setup = ({ makeExercise }: SetupParams) => {
  const promisesRecords = createPromisesRecords();
  const createPromise = makeCreatePromise({ promisesRecords });
  const exercise = makeExercise({ createPromise });

  return { exercise, promisesRecords };
};
