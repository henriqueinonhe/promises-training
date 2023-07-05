import { Context } from "../../../tools/Context";

export default ({ createPromise }: Context) =>
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
