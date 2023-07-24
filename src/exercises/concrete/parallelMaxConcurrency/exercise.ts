import { promiseWithResolvers } from "../../../lib/promiseWithResolvers";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  (list: Array<string>) => {
    const resolvers: Array<() => void> = [];

    let nextPromiseIndex = 5;

    const run = async (data: string, index: number) => {
      const { promise, resolver } = promiseWithResolvers();
      resolvers[index] = resolver;

      await promise;

      const value = await postData(data);

      const nextPromiseResolver = resolvers[nextPromiseIndex];
      nextPromiseResolver?.();
      nextPromiseIndex++;

      return value;
    };

    const promise = Promise.all(list.map((data, index) => run(data, index)));
    resolvers.slice(0, 5).forEach((resolver) => resolver());

    return promise;
  };
