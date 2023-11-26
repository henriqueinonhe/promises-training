import { ExerciseContext } from "../../../lib/Exercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");
    const d = b.then(() => createPromise("D"));
    const e = (async () => {
      try {
        await Promise.all([b, c]);
      } catch {
        await createPromise("E");
      }
    })();
    const f = c.then(() => createPromise("F"));
    const g = Promise.all([d, f]).then(() => createPromise("G"));

    await Promise.all([b, c, d, e, f, g]);
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
      await a;
      return await createPromise("C");
    })();
    const d = (async () => {
      await b;
      await createPromise("D");
    })();
    const e = (async () => {
      try {
        await Promise.all([b, c]);
      } catch (error) {
        if (error === "A") {
          return;
        }
        await createPromise("E");
      }
    })();
    const f = (async () => {
      await c;
      await createPromise("F");
    })();
    const g = (async () => {
      await Promise.all([d, f]);
      await createPromise("G");
    })();

    await Promise.all([a, b, c, d, e, f, g]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));
    const c = a.then(() => createPromise("C"));
    const d = b.then(() => createPromise("D"));
    const e = Promise.all([b, c]).catch((error) => {
      if (error === "A") {
        return;
      }

      return createPromise("E");
    });
    const f = c.then(() => createPromise("F"));
    const g = Promise.all([d, f]).then(() => createPromise("G"));

    return Promise.all([a, b, c, d, e, f, g]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
