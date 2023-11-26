import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await Promise.all([createPromise("A"), createPromise("B")]);
    await createPromise("C");
    await createPromise("D");
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await Promise.all([createPromise("A"), createPromise("B")]);
    await createPromise("C");
    await createPromise("D");
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    return Promise.all([createPromise("A"), createPromise("B")])
      .then(() => createPromise("C"))
      .then(() => createPromise("D"));
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
