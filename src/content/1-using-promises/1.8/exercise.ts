import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

export const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const first = async () => {
      await createPromise("A");
      await Promise.all([createPromise("B"), createPromise("C")]);
      await createPromise("D");
    };

    const second = async () => {
      await createPromise("E");
      await Promise.all([createPromise("F"), createPromise("G")]);
      await createPromise("H");
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
