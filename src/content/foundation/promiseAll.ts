export default async <T>(promises: Array<Promise<T>>): Promise<Array<T>> => {
  const promiseCount = promises.length;
  const resolvedValues: Array<T> = [];
  let resolvedCount = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then((result) => {
        resolvedValues[index] = result;
        resolvedCount++;

        if (resolvedCount === promiseCount) {
          resolve(resolvedValues);
        }
      }, reject);
    });
  });
};
