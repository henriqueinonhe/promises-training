type Context = {
  postData: (data: string) => Promise<void>;
};

export default ({ postData }: Context) => {
  let lastTaskPromise = Promise.resolve();

  return async (data: string) => {
    const run = async () => {
      await postData(data);
    };

    const currentTaskPromise = lastTaskPromise.then(() => run());
    lastTaskPromise = currentTaskPromise;

    await currentTaskPromise;
  };
};
