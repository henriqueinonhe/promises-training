import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

type Ref<T> = { current: Promise<T> | undefined };

const createRef = <T>(): Ref<T> => ({ current: undefined });

const mixed =
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

    await Promise.all([g, h]);
  };

const thenCatch =
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

    await Promise.all([g, h]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
