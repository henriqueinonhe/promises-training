import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

export const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");

    const first = createPromise("B").then(() => createPromise("D"));

    const second = createPromise("C").then(() => createPromise("E"));

    await Promise.all([first, second]);
    await createPromise("F");
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");

    const first = async () => {
      await createPromise("B");
      await createPromise("D");
    };

    const second = async () => {
      await createPromise("C");
      await createPromise("E");
    };

    await Promise.all([first(), second()]);
    await createPromise("F");
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    createPromise("A")
      .then(() => {
        const first = createPromise("B").then(() => createPromise("D"));
        const second = createPromise("C").then(() => createPromise("E"));

        return Promise.all([first, second]);
      })
      .then(() => createPromise("F"));
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
