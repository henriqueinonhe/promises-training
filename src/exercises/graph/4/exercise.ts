import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));
    const c = a.then(() => createPromise("C"));
    const d = a.then(() => createPromise("D"));
    const e = Promise.all([b, c]).then(() => createPromise("E"));

    await Promise.all([a, b, c, d, e]);
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
      await a;
      await createPromise("D");
    })();
    const e = (async () => {
      await Promise.all([b, c]);
      await createPromise("E");
    })();

    await Promise.all([a, b, c, d, e]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));
    const c = a.then(() => createPromise("C"));
    const d = a.then(() => createPromise("D"));
    const e = Promise.all([b, c]).then(() => createPromise("E"));

    return Promise.all([a, b, c, d, e]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
