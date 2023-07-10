type Context = {
  postData: (data: string) => Promise<string>;
  now: () => number;
};

export default ({ postData, now }: Context) =>
  async (data: string) => {
    let retries = 0;
    let elapsedTime = 0;
    const errors: Array<unknown> = [];

    const start = now();

    while (true) {
      try {
        return await postData(data);
      } catch (error) {
        errors.push(error);

        if (elapsedTime > 2000) {
          throw errors;
        }

        retries++;
        const delta = now() - start;
        elapsedTime += delta;
      }
    }
  };
