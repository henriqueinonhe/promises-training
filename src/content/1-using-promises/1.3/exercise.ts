import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

export const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await Promise.all([createPromise("A"), createPromise("B")]);
    await createPromise("C");
    await createPromise("D");
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
