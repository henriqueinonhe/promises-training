import { Context } from "../../../tools/Context";

export default ({ createPromise }: Context) =>
  async () => {
    await Promise.all([createPromise("A"), createPromise("B")]);
    await createPromise("C");
    await createPromise("D");
  };
