export type PromiseRecord = {
  resolve: () => void;
  reject: () => void;
};

export const promisesRecords = new Map<string, PromiseRecord>();

export const createPromise = (label: string) => {
  return new Promise<void>((resolve, reject) => {
    promisesRecords.set(label, { resolve, reject });
  });
};
