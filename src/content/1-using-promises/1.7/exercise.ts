import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

export const mixed =
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
  async () => {};

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: skipExercise(asyncAwait),
  makeThenCatchExercise: skipExercise(thenCatch),
};
