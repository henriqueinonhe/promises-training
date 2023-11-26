import { createPromiseManager } from "../PromiseManager.js";
import { makeCreatePromise } from "../createPromise.js";

export const createFoundationExerciseContainer = <T>() => {
  const promiseManager = createPromiseManager<T>();
  const createPromise = makeCreatePromise<T>({ promiseManager });

  return {
    promiseManager,
    createPromise,
  };
};
