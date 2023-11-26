import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const promiseA = createPromise("A");
    const promiseB = createPromise("B");

    const c = async () => {
      await promiseA;
      await createPromise("C");
    };

    const d = async () => {
      await Promise.all([promiseA, promiseB]);
      await createPromise("D");
    };

    const promiseC = c();

    const e = async () => {
      await promiseA;
      await Promise.all([promiseB, promiseC]);
      await createPromise("E");
    };

    await Promise.all([promiseC, d(), e()]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const promiseA = createPromise("A");
    const promiseB = createPromise("B");

    const c = async () => {
      await promiseA;
      await createPromise("C");
    };

    const d = async () => {
      await Promise.all([promiseA, promiseB]);
      await createPromise("D");
    };

    const promiseC = c();

    const e = async () => {
      await promiseA;
      await Promise.all([promiseB, promiseC]);
      await createPromise("E");
    };

    await Promise.all([promiseC, d(), e()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const promiseA = createPromise("A");
    const promiseB = createPromise("B");

    const c = promiseA.then(() => createPromise("C"));
    const d = Promise.all([promiseA, promiseB]).then(() => createPromise("D"));
    const e = Promise.all([promiseB, c]).then(() => createPromise("E"));

    return Promise.all([d, e]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
