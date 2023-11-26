import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");

    const d = a.then(() => createPromise("D"));
    const e = b.then(() => createPromise("E"));

    const f = d.then(() => createPromise("F"));
    const g = Promise.all([c, e, f]).then(() => createPromise("G"));
    const h = Promise.all([b, c, d]).then(() => createPromise("H"));

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
      await b;
      await createPromise("E");
    })();

    const f = (async () => {
      await d;
      await createPromise("F");
    })();
    const g = (async () => {
      await Promise.all([c, e, f]);
      await createPromise("G");
    })();
    const h = (async () => {
      await Promise.all([b, c, d]);
      await createPromise("H");
    })();

    await Promise.all([a, b, c, d, e, f, g, h]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");

    const d = a.then(() => createPromise("D"));
    const e = b.then(() => createPromise("E"));

    const f = d.then(() => createPromise("F"));
    const g = Promise.all([c, e, f]).then(() => createPromise("G"));
    const h = Promise.all([b, c, d]).then(() => createPromise("H"));

    return Promise.all([a, b, c, d, e, f, g, h]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
