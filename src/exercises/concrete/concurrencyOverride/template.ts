type Context = {
  fetchFirstData: (input: string) => Promise<string>;
  fetchSecondData: (input: string) => Promise<string>;
  setData: (data: string) => void;
};

export default ({ fetchFirstData, fetchSecondData, setData }: Context) => {
  return async (input: string) => {};
};
