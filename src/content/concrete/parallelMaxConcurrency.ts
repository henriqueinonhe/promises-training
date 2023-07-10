import { chunk } from "lodash";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const initial = list.slice(0, 5);
    let nextDataIndex = 5;

    const wrapped = async (data: string) => {
      const result = await postData(data);

      nextDataIndex++;
      wrapped(list[nextDataIndex]);

      return result;
    };
  };
