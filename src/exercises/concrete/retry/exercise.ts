type Context = {
  getData: (data: string) => Promise<string>;
};

export default ({ getData }: Context) =>
  async (data: string) => {
    let retries = 0;
    const errors: Array<unknown> = [];

    while (true) {
      try {
        return await getData(data);
      } catch (error) {
        errors.push(error);

        if (retries === 3) {
          throw errors;
        }

        retries++;
      }
    }
  };
