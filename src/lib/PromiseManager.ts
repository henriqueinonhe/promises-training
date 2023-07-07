export type PromiseRecord<T> = {
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
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

    record.resolve(value as T);
  };

  const reject = (label: string, reason?: unknown) => {
    const record = records.get(label);

    if (!record) {
      throw new Error(`Promise with label "${label}" not found`);
    }

    record.reject(reason);
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
  };
};

export type PromiseManager<T = undefined> = ReturnType<
  typeof createPromiseManager<T>
>;
