import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: skipExercise(asyncAwait),
  makeThenCatchExercise: skipExercise(thenCatch),
};
