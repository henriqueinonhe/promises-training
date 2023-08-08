type Context = {
  postData: (data: string) => Promise<string>;
};

type Record = {
  data: string;
  errors: Array<unknown>;
  result: string | undefined;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    let records: Array<Record> = list.map((data) => ({
      data,
      errors: [],
      result: undefined,
    }));

    let tryouts = 0;
    let hasErrors = false;
    do {
      hasErrors = false;

      records = await Promise.all(
        records.map(async (record) => {
          if (record.result !== undefined) {
            return record;
          }

          try {
            const result = await postData(record.data);
            return {
              ...record,
              result,
            };
          } catch (error) {
            hasErrors = true;

            return {
              ...record,
              errors: [...record.errors, error],
            };
          }
        })
      );

      tryouts++;
    } while (hasErrors && tryouts < 4);

    if (hasErrors) {
      throw records
        .filter((record) => record.errors.length > 0)
        .map((record) => record.errors);
    }

    return records.map((record) => record.result);
  };
