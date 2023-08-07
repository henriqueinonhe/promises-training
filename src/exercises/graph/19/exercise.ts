import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    try {
      await createPromise("A");

      try {
        await createPromise("B");
      } catch {
        // No op
      }
    } catch {
      try {
        await createPromise("C");
      } finally {
        await createPromise("D");
      }
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
        return await a;
      } catch {
        return await createPromise("C");
      }
    })();
    const d = (async () => {
      try {
        const result = await c;
        if (result === "C") {
          await createPromise("D");
        }
      } catch {
        await createPromise("D");
      }
    })();

    await Promise.all([a, b, c, d]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));
    const c = a.then(() => {}).catch(() => createPromise("C"));
    const d = c
      .then((result) => {
        if (result === "C") {
          return createPromise("D");
        }
      })
      .catch(() => createPromise("D"));

    return Promise.all([a, b, c, d]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
