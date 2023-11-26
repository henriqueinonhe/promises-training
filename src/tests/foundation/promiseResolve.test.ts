import { it, vi, expect } from "vitest";
import promiseResolve from "../../exercises/foundation/promiseResolve/exercise.js";

it("Wraps a value in a resolved promise", async () => {
  const resolve = vi.fn();
  const reject = vi.fn();

  const promise = promiseResolve("A");
  promise.then(resolve, reject);

  await promise;

  expect(resolve).toHaveBeenCalledWith("A");
  expect(resolve).toHaveBeenCalledTimes(1);
  expect(reject).not.toHaveBeenCalled();
});
