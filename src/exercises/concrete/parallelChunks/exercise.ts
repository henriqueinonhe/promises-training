import { chunk } from "lodash";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const subLists = chunk(list, 5);

    const result = await subLists.reduce((promise, subList) => {
      return promise.then(async (previousResults) => {
        const newResults = await Promise.all(
          subList.map((data) => postData(data))
        );

        return [...previousResults, ...newResults];
      });
    }, Promise.resolve<Array<string>>([]));

    return result;
  };
