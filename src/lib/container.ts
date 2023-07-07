import { MakeExercise } from "./Exercise";
import { createPromiseManager } from "./PromiseManager";
import { makeCreatePromise } from "./createPromise";
import { ref } from "./ref";

type Dependencies = {
  makeExercise: MakeExercise;
};

export const createContainer = ({ makeExercise }: Dependencies) => {
  const promiseManager = createPromiseManager();
  const createPromise = makeCreatePromise({ promiseManager });
  const exercise = makeExercise({ createPromise, ref });

  return { exercise, promiseManager };
};
