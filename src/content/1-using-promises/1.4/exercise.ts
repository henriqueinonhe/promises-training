import { ExerciseContext } from "../../../tools/Exercise";

export default ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");
    const promiseD = createPromise("D");
    await Promise.all([createPromise("B"), createPromise("C")]);
    await createPromise("E");
    await promiseD;
  };
