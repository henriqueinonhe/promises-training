import { readFile } from "fs";

type Context = {
  readFile: typeof readFile;
};

export default ({ readFile }: Context) =>
  (path: string) => {};
