import { ExerciseContext } from "../../../lib/Exercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const e = createPromise("E");

    const b = a.then(() => createPromise("B"));
    const c = a.then(() => createPromise("C"));

    const d = Promise.any([b, c]).then(() => createPromise("D"));

    const f = Promise.all([b, d]).then(() => createPromise("F"));
    const g = d.then(() => createPromise("G"));

    await Promise.any([e, f, g]).then(() => createPromise("H"));
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = (async () => {
      await a;
      await createPromise("B");
    })();
    const c = (async () => {
      await a;
      await createPromise("C");
    })();
    const d = (async () => {
      await Promise.any([b, c]);
      await createPromise("D");
    })();
    const e = createPromise("E");
    const f = (async () => {
      await Promise.all([b, d]);
      await createPromise("F");
    })();
    const g = (async () => {
      await d;
      await createPromise("G");
    })();
    const h = (async () => {
      await Promise.any([e, f, g]);
      await createPromise("H");
    })();

    await Promise.all([a, b, c, d, e, f, g, h]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));
    const c = a.then(() => createPromise("C"));
    const d = Promise.any([b, c]).then(() => createPromise("D"));
    const e = createPromise("E");
    const f = Promise.all([b, d]).then(() => createPromise("F"));
    const g = d.then(() => createPromise("G"));
    const h = Promise.any([e, f, g]).then(() => createPromise("H"));

    return Promise.all([a, b, c, d, e, f, g, h]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
