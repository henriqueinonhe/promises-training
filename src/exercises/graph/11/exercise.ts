import { ExerciseContext } from "../../../lib/Exercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");

    await Promise.any([a, b]);

    const c = createPromise("C");
    const e = createPromise("E");

    await Promise.all([a, b]);
    await createPromise("D");
    await Promise.all([c, e]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");

    const any = Promise.any([a, b]);

    const c = (async () => {
      await any;
      await createPromise("C");
    })();

    const e = (async () => {
      await any;
      await createPromise("E");
    })();

    await Promise.all([a, b]);
    await createPromise("D");
    await Promise.all([c, e]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const aOrB = Promise.any([a, b]);

    const c = aOrB.then(() => createPromise("C"));
    const e = aOrB.then(() => createPromise("E"));

    const d = Promise.all([a, b]).then(() => createPromise("D"));

    return Promise.all([c, d, e]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
