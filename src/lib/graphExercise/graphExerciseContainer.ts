import { MakeExercise } from "../Exercise.js";
import { createPromiseManager } from "../PromiseManager.js";
import { makeCreatePromise } from "../createPromise.js";
import { ref } from "../ref.js";

type Dependencies = {
  makeExercise: MakeExercise;
};

export const createGraphExerciseContainer = ({
  makeExercise,
}: Dependencies) => {
  const promiseManager = createPromiseManager<string>();
  const createPromise = makeCreatePromise({ promiseManager });
  const exercise = makeExercise({ createPromise, ref });

  return {
    exercise,
    promiseManager,
  };
};
