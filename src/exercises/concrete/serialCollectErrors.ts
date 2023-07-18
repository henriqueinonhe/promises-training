type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const successes: Array<string> = [];
    const errors: Array<unknown> = [];

    for (const data of list) {
      try {
        const value = await postData(data);
        successes.push(value);
      } catch (error) {
        errors.push(error);
      }
    }

    return {
      successes,
      errors,
    };
  };
