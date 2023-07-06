import { ExerciseContext } from "../../../lib/Exercise";

export default ({ createPromise }: ExerciseContext) =>
  async () => {
    await Promise.all([createPromise("A"), createPromise("B")]);
    await createPromise("C");
    await createPromise("D");
  };
