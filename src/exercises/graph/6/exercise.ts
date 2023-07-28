import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");

    const promiseB = createPromise("B");
    const promiseC = createPromise("C");
    const promiseD = createPromise("D");

    const first = async () => {
      await Promise.all([promiseB, promiseC]);
      await createPromise("E");
    };

    const second = async () => {
      await Promise.all([promiseC, promiseD]);
      await createPromise("F");
    };

    await Promise.all([first(), second()]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");

    const promiseB = createPromise("B");
    const promiseC = createPromise("C");
    const promiseD = createPromise("D");

    const first = async () => {
      await Promise.all([promiseB, promiseC]);
      await createPromise("E");
    };

    const second = async () => {
      await Promise.all([promiseC, promiseD]);
      await createPromise("F");
    };

    await Promise.all([first(), second()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    return createPromise("A").then(() => {
      const promiseB = createPromise("B");
      const promiseC = createPromise("C");
      const promiseD = createPromise("D");

      const first = Promise.all([promiseB, promiseC]).then(() =>
        createPromise("E")
      );

      const second = Promise.all([promiseC, promiseD]).then(() =>
        createPromise("F")
      );

      return Promise.all([first, second]);
    });
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
