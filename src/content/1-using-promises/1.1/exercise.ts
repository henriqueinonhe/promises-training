import { createPromise } from "../../../tools/utils";

export default async () => {
  await createPromise("A");
  await createPromise("B");
  await createPromise("C");
  await createPromise("D");
};
