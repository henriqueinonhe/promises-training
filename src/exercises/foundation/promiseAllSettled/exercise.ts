type Result<T> = Resolved<T> | Rejected;

type Resolved<T> = {
  status: "fulfilled";
  value: T;
};

type Rejected = {
  status: "rejected";
  reason: unknown;
};

export default async <T>(
  promises: Array<Promise<T>>
): Promise<Array<Result<T>>> => {
  const promiseCount = promises.length;
  const promisesResults: Array<Result<T>> = [];
  let promisesFinished = 0;

  return new Promise((resolve) => {
    promises.forEach((promise, index) => {
      promise.then(
        (value) => {
          promisesResults[index] = {
            status: "fulfilled",
            value,
          };

          promisesFinished++;

          if (promisesFinished === promiseCount) {
            resolve(promisesResults);
          }
        },
        (reason) => {
          promisesResults[index] = {
            status: "rejected",
            reason,
          };

          promisesFinished++;

          if (promisesFinished === promiseCount) {
            resolve(promisesResults);
          }
        }
      );
    });
  });
};
