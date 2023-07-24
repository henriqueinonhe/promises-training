type Context = {
  firstStep: (data: string) => Promise<string>;
  secondStep: (data: string) => Promise<string>;
  thirdStep: (data: string) => Promise<string>;
};

export default ({ firstStep, secondStep, thirdStep }: Context) =>
  async (list: Array<string>) => {};
