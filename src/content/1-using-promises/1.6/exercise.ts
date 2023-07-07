import { ExerciseContext } from "../../../lib/Exercise";

export default ({ createPromise }: ExerciseContext) =>
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
