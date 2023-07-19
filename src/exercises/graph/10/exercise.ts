import { ExerciseContext } from "../../../lib/Exercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await Promise.race([createPromise("A"), createPromise("B")]);

    await createPromise("C");
    await createPromise("D");
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await Promise.race([createPromise("A"), createPromise("B")]);

    await createPromise("C");
    await createPromise("D");
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    Promise.race([createPromise("A"), createPromise("B")])
      .then(() => createPromise("C"))
      .then(() => createPromise("D"));
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
