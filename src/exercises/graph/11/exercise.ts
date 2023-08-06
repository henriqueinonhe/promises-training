import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const aOrB = Promise.any([a, b]);

    const c = aOrB.then(() => createPromise("C"));
    const e = aOrB.then(() => createPromise("E"));

    const d = Promise.all([a, b]).then(() => createPromise("D"));

    await Promise.all([c, d, e]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");

    const aOrB = Promise.any([a, b]);

    const c = (async () => {
      await aOrB;
      await createPromise("C");
    })();

    const d = (async () => {
      await Promise.all([a, b]);
      await createPromise("D");
    })();

    const e = (async () => {
      await aOrB;
      await createPromise("E");
    })();

    await Promise.all([a, b, c, d, e]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
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
