type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const results = await Promise.allSettled(
      list.map((data) => postData(data))
    );

    const successes = (
      results.filter((result) => result.status === "fulfilled") as Array<
        PromiseFulfilledResult<string>
      >
    ).map((result) => result.value);

    const errors = (
      results.filter(
        (result) => result.status === "rejected"
      ) as Array<PromiseRejectedResult>
    ).map((result) => result.reason);

    return {
      successes,
      errors,
    };
  };
