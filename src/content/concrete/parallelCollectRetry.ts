type Context = {
  postData: (data: string) => Promise<string>;
};

type Record = {
  index: number;
  data: string;
  errors: Array<unknown>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const results: Array<string> = [];
    let records: Array<Record> = list.map((data, index) => ({
      index,
      data,
      errors: [],
    }));

    const run = async ({ data, errors, index }: Record) => {
      try {
        const result = await postData(data);
        results[index] = result;
      } catch (error) {
        throw {
          index,
          data,
          errors: [...errors, error],
        };
      }
    };

    let retries = 0;
    while (records.length !== 0 || retries < 3) {
      const outcomes = await Promise.allSettled(
        records.map((record) => run(record))
      );

      records = (
        outcomes.filter(
          ({ status }) => status === "rejected"
        ) as Array<PromiseRejectedResult>
      ).map(({ reason }) => reason);

      retries++;
    }

    if (records.length !== 0) {
      throw records;
    }

    return results;
  };
