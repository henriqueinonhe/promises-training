import { ExerciseContext } from "../../../lib/Exercise";

export default ({ createPromise }: ExerciseContext) =>
  async () => {
    const promiseA = createPromise("A");
    const promiseB = createPromise("B");

    const c = async () => {
      await promiseA;
      await createPromise("C");
    };

    const d = async () => {
      await Promise.all([promiseA, promiseB]);
      await createPromise("D");
    };

    const promiseC = c();

    const e = async () => {
      await promiseA;
      await Promise.all([promiseB, promiseC]);
      await createPromise("E");
    };

    await Promise.all([promiseC, d(), e()]);
  };
