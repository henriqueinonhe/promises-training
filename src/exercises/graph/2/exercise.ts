import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const first = createPromise("A")
      .then(() => createPromise("B"))
      .then(() => createPromise("C"));

    const second = createPromise("D")
      .then(() => createPromise("E"))
      .then(() => createPromise("F"));

    await Promise.all([first, second]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const first = async () => {
      await createPromise("A");
      await createPromise("B");
      await createPromise("C");
    };

    const second = async () => {
      await createPromise("D");
      await createPromise("E");
      await createPromise("F");
    };

    await Promise.all([first(), second()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const first = createPromise("A")
      .then(() => createPromise("B"))
      .then(() => createPromise("C"));

    const second = createPromise("D")
      .then(() => createPromise("E"))
      .then(() => createPromise("F"));

    return Promise.all([first, second]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
