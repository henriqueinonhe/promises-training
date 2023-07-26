import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");
    const promiseD = createPromise("D");
    await Promise.all([createPromise("B"), createPromise("C")]);
    await createPromise("E");
    await promiseD;
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");
    const promiseD = createPromise("D");
    await Promise.all([createPromise("B"), createPromise("C")]);
    await createPromise("E");
    await promiseD;
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    return createPromise("A")
      .then(() => {
        createPromise("D");
        return Promise.all([createPromise("B"), createPromise("C")]);
      })
      .then(() => createPromise("E"));
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
