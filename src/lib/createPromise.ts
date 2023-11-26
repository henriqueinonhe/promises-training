import { PromiseManager } from "./PromiseManager.js";

type Dependencies<T> = {
  promiseManager: PromiseManager<T>;
};

export const makeCreatePromise =
  <T = void>({ promiseManager }: Dependencies<T>) =>
  (label: string) => {
    return new Promise<T>((resolve, reject) => {
      promiseManager.register(label, resolve, reject);
    });
  };

export type CreatePromise<T = void> = ReturnType<typeof makeCreatePromise<T>>;
