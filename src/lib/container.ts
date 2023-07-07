import { MakeExercise } from "./Exercise";
import { createPromiseManager } from "./PromiseManager";
import { makeCreatePromise } from "./createPromise";

type Dependencies = {
  makeExercise: MakeExercise;
};

export const createContainer = ({ makeExercise }: Dependencies) => {
  const promiseManager = createPromiseManager();
  const createPromise = makeCreatePromise({ promiseManager });
  const exercise = makeExercise({ createPromise });

  return { exercise, promiseManager };
};
