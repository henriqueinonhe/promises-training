export default async <T>(promises: Array<Promise<T>>): Promise<T> => {
  const promiseCount = promises.length;
  const rejectedReasons: Array<unknown> = [];
  let rejectedCount = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(resolve, (reason) => {
        rejectedReasons[index] = reason;
        rejectedCount++;

        if (rejectedCount === promiseCount) {
          reject(rejectedReasons);
        }
      });
    });
  });
};
