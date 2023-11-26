import { ExerciseContext } from "../../../lib/Exercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = Promise.all([a, b])
      .then(null)
      .catch(() => createPromise("C"));
    const d = Promise.all([a, b])
      .then(null)
      .catch(() => createPromise("D"));
    const e = Promise.all([a, c]).then(([a, c]) => {
      if (a === "A" && c === "C") {
        return createPromise("E");
      }
    });

    await Promise.all([a, b, c, d, e]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = (async () => {
      try {
        await Promise.all([a, b]);
      } catch {
        return await createPromise("C");
      }
    })();
    const d = (async () => {
      try {
        await Promise.all([a, b]);
      } catch {
        return await createPromise("D");
      }
    })();
    const e = (async () => {
      const [aResult, cResult] = await Promise.all([a, c]);

      if (aResult === "A" && cResult === "C") {
        await createPromise("E");
      }
    })();

    await Promise.all([a, b, c, d, e]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = Promise.all([a, b])
      .then(null)
      .catch(() => createPromise("C"));
    const d = Promise.all([a, b])
      .then(null)
      .catch(() => createPromise("D"));
    const e = Promise.all([a, c]).then(([a, c]) => {
      if (a === "A" && c === "C") {
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
