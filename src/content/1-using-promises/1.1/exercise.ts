import { ExerciseContext } from "../../../tools/Exercise";

export default ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");
    await createPromise("B");
    await createPromise("C");
    // await createPromise("D");
  };
