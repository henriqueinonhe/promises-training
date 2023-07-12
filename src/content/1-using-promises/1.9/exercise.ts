import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

type Ref<T> = { current: Promise<T> | undefined };

const createRef = <T>(): Ref<T> => ({ current: undefined });

export const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const promiseDRef = createRef();
    const promiseB = createPromise("B");

    const promiseFRef = createRef();
    const promiseERef = createRef();
    const promiseC = createPromise("C");

    const first = async () => {
      await promiseB;
      promiseERef.current = createPromise("E");
      await promiseERef.current;
    };

    const second = async () => {
      await createPromise("A");
      promiseDRef.current = createPromise("D");
      await promiseDRef.current;
    };

    const firstPromise = first();
    const secondPromise = second();

    const third = async () => {
      await secondPromise;
      await createPromise("F");
    };

    const fourth = async () => {
      await Promise.all([firstPromise, secondPromise, third()]);
      await Promise.all([promiseFRef.current, promiseERef.current, promiseC]);
      await createPromise("G");
    };

    const fifth = async () => {
      await secondPromise;
      await Promise.all([promiseDRef.current, promiseB, promiseC]);
      await createPromise("H");
    };

    await Promise.all([fourth(), fifth()]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: skipExercise(asyncAwait),
  makeThenCatchExercise: skipExercise(thenCatch),
};
