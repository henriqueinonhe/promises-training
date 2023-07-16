export type PromiseRecord<T> = {
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
  status: "pending" | "resolved" | "rejected";
};

export const createPromiseManager = <T = undefined>() => {
  const records = new Map<string, PromiseRecord<T>>();

  const register = (
    label: string,
    resolve: (value: T) => void,
    reject: (reason: unknown) => void
  ) => {
    if (has(label)) {
      throw new Error(`Promise with label "${label}" already exists`);
    }

    records.set(label, {
      resolve,
      reject,
      status: "pending",
    });
  };

  type ResolveParams = T extends undefined
    ? [label: string]
    : [label: string, value: T];
  const resolve = (...params: ResolveParams) => {
    const [label, value] = params;
    const record = records.get(label);

    if (!record) {
      throw new Error(`Promise with label "${label}" not found`);
    }

    if (record.status !== "pending") {
      throw new Error(`Promise with label "${label}" is not pending`);
    }

    record.resolve(value as T);
    record.status = "resolved";
  };

  const reject = (label: string, reason?: unknown) => {
    const record = records.get(label);

    if (!record) {
      throw new Error(`Promise with label "${label}" not found`);
    }

    if (record.status !== "pending") {
      throw new Error(`Promise with label "${label}" is not pending`);
    }

    record.reject(reason);
    record.status = "rejected";
  };

  const status = (label: string) => {
    const record = records.get(label);

    if (!record) {
      throw new Error(`Promise with label "${label}" not found`);
    }

    return record.status;
  };

  const has = (label: string) => records.has(label);

  const count = () => records.size;

  const keys = () => Array.from(records.keys());

  return {
    register,
    resolve,
    reject,
    has,
    count,
    keys,
    status,
  };
};

export type PromiseManager<T = undefined> = ReturnType<
  typeof createPromiseManager<T>
>;
