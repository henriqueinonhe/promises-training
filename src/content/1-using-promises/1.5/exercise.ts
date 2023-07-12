import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

export const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");

    const first = async () => {
      await createPromise("B");
      await createPromise("D");
    };

    const second = async () => {
      await createPromise("C");
      await createPromise("E");
    };

    await Promise.all([first(), second()]);
    await createPromise("F");
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
