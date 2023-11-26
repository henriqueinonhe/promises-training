import { promiseWithResolvers } from "../../../lib/promiseWithResolvers.js";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  (list: Array<string>) => {};
