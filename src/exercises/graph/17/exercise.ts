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
      await Promise.all([createPromise("C"), createPromise("D")]);
      await createPromise("E");
    }
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = (async () => {
      await a;
      return await createPromise("B");
    })();
    const c = (async () => {
      try {
        await a;
      } catch {
        return await createPromise("C");
      }
    })();
    const d = (async () => {
      try {
        await a;
      } catch {
        return await createPromise("D");
      }
    })();
    const e = (async () => {
      const [cResult, dResult] = await Promise.all([c, d]);

      if (cResult && dResult) {
        await createPromise("E");
      }
    })();

    await Promise.all([a, b, c, d, e]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));
    const c = a.then(() => {}).catch(() => createPromise("C"));
    const d = a.then(() => {}).catch(() => createPromise("D"));
    const e = Promise.all([c, d]).then(([cResult, dResult]) => {
      if (cResult && dResult) {
        return createPromise("E");
      }
    });

    return Promise.all([a, b, c, d, e]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
