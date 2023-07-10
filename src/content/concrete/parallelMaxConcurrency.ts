type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  (list: Array<string>) => {
    const resolvers: Array<() => void> = [];

    let nextPromiseIndex = 0;

    const run = async (data: string, index: number) => {
      const { promise, resolver } = promiseWithResolvers();
      resolvers[index] = resolver;

      await promise;

      const value = await postData(data);
      resolvers[nextPromiseIndex]();
      nextPromiseIndex++;

      return value;
    };

    const promise = Promise.all(list.map(run));
    resolvers.slice(0, 5).forEach((resolver) => resolver());

    return promise;
  };

const promiseWithResolvers = () => {
  let resolver!: () => void;
  let rejecter!: () => void;

  const promise = new Promise<void>((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });

  return { promise, resolver, rejecter };
};
