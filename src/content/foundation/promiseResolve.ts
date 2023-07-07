export default async <T>(value: T): Promise<T> =>
  new Promise((resolve) => resolve(value));
