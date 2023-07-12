import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

export const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");

    const promiseB = createPromise("B");
    const promiseC = createPromise("C");
    const promiseD = createPromise("D");

    const first = async () => {
      await Promise.all([promiseB, promiseC]);
      await createPromise("E");
    };

    const second = async () => {
      await Promise.all([promiseC, promiseD]);
      await createPromise("F");
    };

    await Promise.all([first(), second()]);
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
