import { PromiseManager } from "./PromiseManager";

type Dependencies = {
  promiseManager: PromiseManager;
};

export const makeCreatePromise =
  ({ promiseManager }: Dependencies) =>
  (label: string) => {
    return new Promise<void>((resolve, reject) => {
      promiseManager.register(label, resolve, reject);
    });
  };

export type CreatePromise = ReturnType<typeof makeCreatePromise>;
