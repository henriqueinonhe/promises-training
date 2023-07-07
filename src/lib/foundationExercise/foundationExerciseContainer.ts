import { createPromiseManager } from "../PromiseManager";
import { makeCreatePromise } from "../createPromise";

export const createFoundationExerciseContainer = <T>() => {
  const promiseManager = createPromiseManager<T>();
  const createPromise = makeCreatePromise<T>({ promiseManager });

  return {
    promiseManager,
    createPromise,
  };
};
