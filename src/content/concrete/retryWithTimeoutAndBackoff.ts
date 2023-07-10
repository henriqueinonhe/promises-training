type Context = {
  postData: (data: string) => Promise<string>;
  now: () => number;
  wait: (ms: number) => Promise<void>;
};

export default ({ postData, now, wait }: Context) =>
  async (data: string) => {
    let retries = 0;
    let elapsedTime = 0;

    while (true) {
      try {
        return await postData(data);
      } catch (error) {
        if (retries === 3 || elapsedTime > 2000) {
          throw error;
        }

        retries++;

        await wait(Math.pow(2, retries) * 100);

        elapsedTime = now() - elapsedTime;
      }
    }
  };
