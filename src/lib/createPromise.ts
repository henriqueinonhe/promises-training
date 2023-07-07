import { PromiseManager } from "./PromiseManager";

type Dependencies<T> = {
  promiseManager: PromiseManager<T>;
};

export const makeCreatePromise =
  <T>({ promiseManager }: Dependencies<T>) =>
  (label: string) => {
    return new Promise<T>((resolve, reject) => {
      promiseManager.register(label, resolve, reject);
    });
  };

export type CreatePromise = ReturnType<typeof makeCreatePromise>;
