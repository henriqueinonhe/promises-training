export default async <T>(reason: T): Promise<T> =>
  new Promise((_, reject) => reject(reason));
