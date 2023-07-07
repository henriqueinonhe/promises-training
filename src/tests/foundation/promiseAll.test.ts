import { describe, it, vi, expect } from "vitest";
import { createFoundationExerciseContainer } from "../../lib/foundationExercise/foundationExerciseContainer";
import promiseAll from "../../content/foundation/promiseAll";
import { waitForPromises } from "../../lib/waitForPromises";

describe("When some promise rejects", () => {
  it.concurrent(
    "Returns a promise that rejects WITHOUT WAITING for other promises to finish",
    async () => {
      const { createPromise, promiseManager } =
        createFoundationExerciseContainer<string>();

      const resolve = vi.fn();
      const reject = vi.fn();

      const promise = promiseAll([
        createPromise("A"),
        createPromise("B"),
        createPromise("C"),
        createPromise("D"),
      ]).then(resolve, reject);

      promiseManager.resolve("B", "B");
      await waitForPromises();
      expect(resolve).not.toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();

      promiseManager.reject("C", "C");
      await waitForPromises();
      expect(resolve).not.toHaveBeenCalled();
      expect(reject).toHaveBeenCalledWith("C");
      expect(reject).toHaveBeenCalledTimes(1);

      promiseManager.reject("A", "A");
      await waitForPromises();
      expect(resolve).not.toHaveBeenCalled();
      expect(reject).toHaveBeenCalledTimes(1);

      promiseManager.reject("D", "D");
      await waitForPromises();
      expect(resolve).not.toHaveBeenCalled();
      expect(reject).toHaveBeenCalledTimes(1);

      await promise;
    }
  );
});

describe("When all promises resolve", () => {
  it.concurrent(
    "Returns a promise that resolves to an array of resolved values in the same order as the input array",
    async () => {
      const { createPromise, promiseManager } =
        createFoundationExerciseContainer<string>();

      const resolve = vi.fn();
      const reject = vi.fn();

      const promise = promiseAll([
        createPromise("A"),
        createPromise("B"),
        createPromise("C"),
        createPromise("D"),
      ]).then(resolve, reject);

      promiseManager.resolve("B", "B");
      await waitForPromises();
      expect(resolve).not.toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();

      promiseManager.resolve("C", "C");
      await waitForPromises();
      expect(resolve).not.toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();

      promiseManager.resolve("A", "A");
      await waitForPromises();
      expect(resolve).not.toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();

      promiseManager.resolve("D", "D");
      await waitForPromises();
      expect(resolve).toHaveBeenCalledWith(["A", "B", "C", "D"]);
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(reject).not.toHaveBeenCalled();

      await promise;
    }
  );
});
