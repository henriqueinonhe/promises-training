import { ExerciseContext } from "../../../lib/Exercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A").catch(() =>
      createPromise("B").then(() =>
        createPromise("C").catch(() => createPromise("D"))
      )
    );
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    try {
      await createPromise("A");
    } catch {
      await createPromise("B");
      try {
        await createPromise("C");
      } catch {
        await createPromise("D");
      }
    }
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    return createPromise("A").catch(() =>
      createPromise("B").then(() =>
        createPromise("C").catch(() => createPromise("D"))
      )
    );
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
