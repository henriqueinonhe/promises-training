import { Context } from "../../../tools/Context";

export default ({ createPromise }: Context) =>
  async () => {
    await createPromise("A");
    await createPromise("B");
    await createPromise("C");
    await createPromise("D");
  };
