import { ExerciseContext } from "../../../tools/Exercise";

export default ({ createPromise }: ExerciseContext) =>
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

    first();
    second();
  };
