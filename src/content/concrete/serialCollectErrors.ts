type Context = {
  postData: (data: string) => Promise<string>;
};

type Result =
  | {
      status: "fulfilled";
      value: string;
    }
  | {
      status: "rejected";
      reason: unknown;
    };

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const results: Array<Result> = [];

    for (const data of list) {
      try {
        const value = await postData(data);
        results.push({
          status: "fulfilled",
          value,
        });
      } catch (error) {
        results.push({
          status: "rejected",
          reason: error,
        });
      }
    }

    return results;
  };
