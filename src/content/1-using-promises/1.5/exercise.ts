import { ExerciseContext } from "../../../lib/Exercise";

export default ({ createPromise }: ExerciseContext) =>
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
