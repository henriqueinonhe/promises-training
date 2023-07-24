type Context = {
  fetchData: (input: string) => Promise<string>;
  setData: (data: string) => void;
};

export default ({ fetchData, setData }: Context) => {
  return async (input: string) => {};
};
