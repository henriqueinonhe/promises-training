import { ExerciseContext } from "../../../lib/Exercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");
    const d = createPromise("D");
    const e = Promise.all([a, b]).then(() => createPromise("E"));
    const f = c.then(() => createPromise("F"));
    const g = Promise.any([c, d]).then(() => createPromise("G"));
    const h = Promise.any([Promise.all([f, g]), e]).then(() =>
      createPromise("H")
    );

    await Promise.all([a, b, c, d, e, f, g, h]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");
    const d = createPromise("D");
    const e = (async () => {
      await Promise.all([a, b]);
      await createPromise("E");
    })();
    const f = (async () => {
      await c;
      await createPromise("F");
    })();
    const g = (async () => {
      await Promise.any([c, d]);
      await createPromise("G");
    })();
    const h = (async () => {
      await Promise.any([Promise.all([f, g]), e]);
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
    const d = createPromise("D");
    const e = Promise.all([a, b]).then(() => createPromise("E"));
    const f = c.then(() => createPromise("F"));
    const g = Promise.any([c, d]).then(() => createPromise("G"));
    const h = Promise.any([Promise.all([f, g]), e]).then(() =>
      createPromise("H")
    );

    return Promise.all([a, b, c, d, e, f, g, h]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
