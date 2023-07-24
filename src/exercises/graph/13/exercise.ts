import { ExerciseContext } from "../../../lib/Exercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");
    const d = a.then(() => createPromise("D"));
    const e = c.then(() => createPromise("E"));
    const f = Promise.any([d, Promise.all([b, e])]).then(() =>
      createPromise("F")
    );
    const g = f.then(() => createPromise("G"));
    const h = Promise.all([d, g]).then(() => createPromise("H"));

    await Promise.all([a, b, c, d, e, f, g, h]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");
    const d = (async () => {
      await a;
      await createPromise("D");
    })();
    const e = (async () => {
      await c;
      await createPromise("E");
    })();
    const f = (async () => {
      await Promise.any([d, Promise.all([b, e])]);
      await createPromise("F");
    })();
    const g = (async () => {
      await f;
      await createPromise("G");
    })();
    const h = (async () => {
      await Promise.all([d, g]);
      await createPromise("H");
    })();

    await Promise.all([a, b, c, d, e, f, g, h]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");
    const d = a.then(() => createPromise("D"));
    const e = c.then(() => createPromise("E"));
    const f = Promise.any([d, Promise.all([b, e])]).then(() =>
      createPromise("F")
    );
    const g = f.then(() => createPromise("G"));
    const h = Promise.all([d, g]).then(() => createPromise("H"));

    return Promise.all([a, b, c, d, e, f, g, h]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
