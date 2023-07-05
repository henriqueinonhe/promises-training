export type PromiseRecord = {
  resolve: () => void;
  reject: () => void;
};

export const createPromiseManager = () => {
  const records = new Map<string, PromiseRecord>();

  const register = (label: string, resolve: () => void, reject: () => void) => {
    records.set(label, {
      resolve,
      reject,
    });
  };

  const resolve = (label: string) => {
    const record = records.get(label);

    if (!record) {
      throw new Error(`Promise with label "${label}" not found`);
    }

    record.resolve();
  };

  const reject = (label: string) => {
    const record = records.get(label);

    if (!record) {
      throw new Error(`Promise with label "${label}" not found`);
    }

    record.reject();
  };

  const has = (label: string) => records.has(label);

  const count = () => records.size;

  return {
    register,
    resolve,
    reject,
    has,
    count,
  };
};

export type PromiseManager = ReturnType<typeof createPromiseManager>;
