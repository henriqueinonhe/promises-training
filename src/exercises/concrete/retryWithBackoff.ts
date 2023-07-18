type Context = {
  postData: (data: string) => Promise<string>;
  wait: (ms: number) => Promise<void>;
};

export default ({ postData, wait }: Context) =>
  async (data: string) => {
    let retries = 0;

    while (true) {
      try {
        return await postData(data);
      } catch (error) {
        retries++;

        await wait(Math.pow(2, retries) * 100);
      }
    }
  };
