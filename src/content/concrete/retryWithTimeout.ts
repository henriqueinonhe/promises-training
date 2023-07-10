type Context = {
  postData: (data: string) => Promise<void>;
  now: () => number;
};

export default ({ postData, now }: Context) =>
  async (data: string) => {
    let retries = 0;
    let elapsedTime = 0;

    while (true) {
      try {
        await postData(data);
      } catch (error) {
        if (retries === 3 || elapsedTime > 2000) {
          throw error;
        }

        retries++;
        elapsedTime = now() - elapsedTime;
      }
    }
  };
