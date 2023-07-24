type Context = {
  postData: (data: string) => Promise<void>;
};

export default ({ postData }: Context) => {
  return async (data: string) => {};
};
