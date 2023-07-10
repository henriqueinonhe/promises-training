type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    return Promise.allSettled(list.map(postData));
  };
