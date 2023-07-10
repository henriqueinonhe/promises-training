type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (data: string) => {
    let retries = 0;
    const errors: Array<unknown> = [];

    while (true) {
      try {
        return await postData(data);
      } catch (error) {
        errors.push(error);

        if (retries === 3) {
          throw errors;
        }

        retries++;
      }
    }
  };
