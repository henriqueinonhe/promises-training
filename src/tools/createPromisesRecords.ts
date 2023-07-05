export type PromiseRecord = {
  resolve: () => void;
  reject: () => void;
};

export type PromisesRecords = Map<string, PromiseRecord>;

export const createPromisesRecords = () => new Map<string, PromiseRecord>();
