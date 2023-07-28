import { MakeExercise } from "../Exercise";
import { createPromiseManager } from "../PromiseManager";
import { makeCreatePromise } from "../createPromise";
import { ref } from "../ref";

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
