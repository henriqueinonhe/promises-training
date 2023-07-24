type Context = {
  postData: (data: string) => Promise<string>;
  wait: (ms: number) => Promise<void>;
};

export default ({ postData, wait }: Context) =>
  async (data: string) => {};
