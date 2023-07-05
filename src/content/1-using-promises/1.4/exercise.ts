import { Context } from "../../../tools/Context";

export default ({ createPromise }: Context) =>
  async () => {
    await createPromise("A");
    const promiseD = createPromise("D");
    await Promise.all([createPromise("B"), createPromise("C")]);
    await createPromise("E");
    await promiseD;
  };
