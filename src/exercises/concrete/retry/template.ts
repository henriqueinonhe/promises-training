type Context = {
  getData: (data: string) => Promise<string>;
};

export default ({ getData }: Context) =>
  async (data: string) => {};
