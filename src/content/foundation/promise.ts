type PromiseStatus = "fulfilled" | "rejected" | "pending";

type Executor<T> = (
  resolve: (value: T) => void,
  reject: (reason: unknown) => void
) => void;

type ResultHandler<T, U, Q> = {
  onFulfilled: OnFulfilled<T, U>;
  onRejected: OnRejected<Q>;
};

type OnFulfilled<T, U> = (value: T) => U;

type OnRejected<T> = (reason: unknown) => T;

export default class MyPromise<T = undefined> {
  constructor(executor: Executor<T>) {
    this.status = "pending";
    this.resultHandlers = [];

    const resolve = (value: T) => {
      if (this.status !== "pending") {
        return;
      }

      this.status = "fulfilled";
      this.resolvedValue = value;
      this.resultHandlers.forEach(({ onFulfilled }) => onFulfilled(value));
    };

    const reject = (reason: unknown) => {
      if (this.status !== "pending") {
        return;
      }

      this.status = "rejected";
      this.rejectedReason = reason;
      this.resultHandlers.forEach(({ onRejected }) => onRejected(reason));
    };

    executor(resolve, reject);
  }

  public then<U, Q>(
    onFulfilled: OnFulfilled<T, U>,
    onRejected?: OnRejected<Q>
  ) {
    let nextPromiseResolve: (value: T) => void;
    let nextPromiseReject: (reason: unknown) => void;
    const promise = new MyPromise<U | Q>((resolve, reject) => {
      nextPromiseResolve = (value: T) => {
        const newValue = onFulfilled(value);
        resolve(newValue);
      };

      nextPromiseReject = (reason: unknown) => {
        if (!onRejected) {
          reject(reason);
          return;
        }

        const newValue = onRejected(reason);
        resolve(newValue);
      };

      this.resultHandlers.push({
        onFulfilled: nextPromiseResolve,
        onRejected: nextPromiseReject,
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

    return promise;
  }

  public catch<Q>(onRejected: OnRejected<Q>) {
    return this.then((x) => x, onRejected);
  }

  // public finally(onFinally: () => void) {

  // }

  private status: PromiseStatus;
  private resultHandlers: Array<ResultHandler<T, unknown, unknown>>;
  private resolvedValue: T | undefined;
  private rejectedReason: unknown | undefined;
}
