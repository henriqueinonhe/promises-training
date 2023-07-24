type PromiseStatus = "fulfilled" | "rejected" | "pending";

type Executor<T> = (
  resolve: (value: T) => void,
  reject: (reason: unknown) => void
) => void;

type NextPromiseHandlers<T> = {
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
};

type OnFulfilled<T, U> = (value: T) => U | MyPromise<U>;

type OnRejected<T> = (reason: unknown) => T | MyPromise<T>;

export default class MyPromise<T = undefined> {
  constructor(executor: Executor<T>) {
    this.status = "pending";
    this.nextPromiseHandlers = [];

    const resolve = (value: T) => {
      // If the promise has already settled, do nothing
      // so additional calls to resolve/reject are no-op
      if (this.status !== "pending") {
        return;
      }

      this.status = "fulfilled";
      this.resolvedValue = value;
      this.nextPromiseHandlers.forEach(({ resolve: nextPromiseResolve }) =>
        nextPromiseResolve(value)
      );
    };

    const reject = (reason: unknown) => {
      // If the promise has already settled, do nothing
      // so additional calls to resolve/reject are no-op
      if (this.status !== "pending") {
        return;
      }

      this.status = "rejected";
      this.rejectedReason = reason;
      this.nextPromiseHandlers.forEach(({ reject: nextPromiseReject }) =>
        nextPromiseReject(reason)
      );
    };

    executor(resolve, reject);
  }

  public then<U, Q>(
    onFulfilled: OnFulfilled<T, U>,
    onRejected?: OnRejected<Q>
  ) {
    let nextPromiseResolve: (value: T) => void;
    let nextPromiseReject: (reason: unknown) => void;

    const nextPromise = new MyPromise<U | Q>((resolve, reject) => {
      nextPromiseResolve = (value: T) => {
        queueMicrotask(() => {
          const newValue = onFulfilled(value);

          if (MyPromise.isPromise<U>(newValue)) {
            newValue.then(resolve, reject);
            return;
          }

          resolve(newValue);
        });
      };

      nextPromiseReject = (reason: unknown) => {
        queueMicrotask(() => {
          if (!onRejected) {
            reject(reason);

            return;
          }

          const newValue = onRejected(reason);

          if (MyPromise.isPromise<Q>(newValue)) {
            newValue.then(resolve, reject);
            return;
          }

          resolve(newValue);
        });
      };

      // It's okay to push handlers to this array
      // even when the promise has already settled,
      // because in this case handlers from
      // this array won't be called
      this.nextPromiseHandlers.push({
        resolve: nextPromiseResolve,
        reject: nextPromiseReject,
      });
    });

    if (this.status === "fulfilled") {
      const resolvedValue = this.resolvedValue!;
      nextPromiseResolve!(resolvedValue);
    }

    if (this.status === "rejected") {
      const rejectedReason = this.rejectedReason;
      nextPromiseReject!(rejectedReason);
    }

    return nextPromise;
  }

  public catch<Q>(onRejected: OnRejected<Q>) {
    return this.then((x) => x, onRejected);
  }

  // public finally(onFinally: () => void) {

  // }

  public static resolve<U>(value: U) {
    return new MyPromise<U>((resolve) => resolve(value));
  }

  public static reject<U>(reason: unknown) {
    return new MyPromise<U>((_, reject) => reject(reason));
  }

  // In reality this should check for thenables
  private static isPromise<U>(value: unknown): value is MyPromise<U> {
    return value instanceof MyPromise;
  }

  private status: PromiseStatus;
  private nextPromiseHandlers: Array<NextPromiseHandlers<T>>;
  private resolvedValue: T | undefined;
  private rejectedReason: unknown | undefined;
}
