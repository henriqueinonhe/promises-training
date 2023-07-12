import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

export const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const first = async () => {
      await createPromise("A");
      await Promise.all([createPromise("B"), createPromise("C")]);
      await createPromise("D");
    };

    const second = async () => {
      await createPromise("E");
      await Promise.all([createPromise("F"), createPromise("G")]);
      await createPromise("H");
    };

    await Promise.all([first(), second()]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const first = async () => {
      await createPromise("A");
      await Promise.all([createPromise("B"), createPromise("C")]);
      await createPromise("D");
    };

    const second = async () => {
      await createPromise("E");
      await Promise.all([createPromise("F"), createPromise("G")]);
      await createPromise("H");
    };

    await Promise.all([first(), second()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const first = createPromise("A")
      .then(() => Promise.all([createPromise("B"), createPromise("C")]))
      .then(() => createPromise("D"));

    const second = createPromise("E")
      .then(() => Promise.all([createPromise("F"), createPromise("G")]))
      .then(() => createPromise("H"));

    return Promise.all([first, second]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
