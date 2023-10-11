type Context = {
  postData: (data: string) => Promise<string>;
  now: () => number;
};

export default ({ postData, now }: Context) =>
  async (data: string) => {
    const errors: Array<unknown> = [];

    const start = now();

    while (now() - start <= 2000) {
      try {
        return await postData(data);
      } catch (error) {
        errors.push(error);
      }
    }

    throw errors;
  };
