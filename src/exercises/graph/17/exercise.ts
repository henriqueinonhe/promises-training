import { ExerciseContext } from "../../../lib/Exercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    try {
      await createPromise("A");
      await createPromise("B");

      try {
        await createPromise("D");
      } catch {
        // No Op
      }
    } catch {
      await createPromise("C");
    }
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = (async () => {
      await createPromise("A");
    })();
    const b = (async () => {
      await a;
      await createPromise("B");
    })();
    const c = (async () => {
      try {
        await b;
      } catch {
        await createPromise("C");
      }
    })();
    const d = (async () => {
      await b;
      await createPromise("D");
    })();

    await Promise.all([a, b, c, d]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));
    const c = b.catch(() => createPromise("C"));
    const d = b.then(() => createPromise("D"));

    return Promise.all([a, b, c, d]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
