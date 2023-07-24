type Context = {
  postData: (data: string) => Promise<string>;
  now: () => number;
};

export default ({ postData, now }: Context) =>
  async (data: string) => {};
