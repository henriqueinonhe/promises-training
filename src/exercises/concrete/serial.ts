type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    return list.reduce(async (result, data) => {
      const acc = await result;

      return [...acc, await postData(data)];
    }, Promise.resolve([] as Array<string>));
  };
