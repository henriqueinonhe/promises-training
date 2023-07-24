import { promiseWithResolvers } from "../../../lib/promiseWithResolvers";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  (list: Array<string>) => {};
