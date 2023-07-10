import { chunk } from "lodash";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const subLists = chunk(list, 5);

    const result = await Promise.all(
      subLists.map((subList) => Promise.all(subList.map(postData)))
    );

    return result.flat();
  };
