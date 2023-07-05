import { PromisesRecords } from "./createPromisesRecords";

type Dependencies = {
  promisesRecords: PromisesRecords;
};

export const makeCreatePromise =
  ({ promisesRecords }: Dependencies) =>
  (label: string) => {
    return new Promise<void>((resolve, reject) => {
      promisesRecords.set(label, { resolve, reject });
    });
  };

export type CreatePromise = ReturnType<typeof makeCreatePromise>;
