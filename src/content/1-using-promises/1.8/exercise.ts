import { ExerciseContext } from "../../../lib/Exercise";

export default ({ createPromise }: ExerciseContext) =>
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
