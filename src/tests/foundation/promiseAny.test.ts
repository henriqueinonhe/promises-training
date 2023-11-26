import { describe, it, vi, expect } from "vitest";
import promiseAny from "../../exercises/foundation/promiseAny/exercise.js";
import { createFoundationExerciseContainer } from "../../lib/foundationExercise/foundationExerciseContainer.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

describe("When some promise resolves", () => {
  it("Returns a promise that resolves to the first resolved value", async () => {
    const { createPromise, promiseManager } =
      createFoundationExerciseContainer<string>();

    const resolve = vi.fn();
    const reject = vi.fn();

    const promise = promiseAny([
      createPromise("A"),
      createPromise("B"),
      createPromise("C"),
      createPromise("D"),
    ]).then(resolve, reject);

    promiseManager.reject("B", "B");
    await waitForPromises();
    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();

    promiseManager.reject("C", "C");
    await waitForPromises();
    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();

    promiseManager.resolve("A", "A");
    await waitForPromises();
    expect(resolve).toHaveBeenCalledWith("A");
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(reject).not.toHaveBeenCalled();

    promiseManager.resolve("D", "D");
    await waitForPromises();
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(reject).not.toHaveBeenCalled();

    await promise;
  });
});

describe("When all promises reject", () => {
  it("Returns a promise that rejects with an array of rejected reasons in the same order as the input array", async () => {
    const { createPromise, promiseManager } =
      createFoundationExerciseContainer<string>();

    const resolve = vi.fn();
    const reject = vi.fn();

    const promise = promiseAny([
      createPromise("A"),
      createPromise("B"),
      createPromise("C"),
      createPromise("D"),
    ]).then(resolve, reject);

    promiseManager.reject("B", "B");
    await waitForPromises();
    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();

    promiseManager.reject("C", "C");
    await waitForPromises();
    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();

    promiseManager.reject("A", "A");
    await waitForPromises();
    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();

    promiseManager.reject("D", "D");
    await waitForPromises();
    expect(resolve).not.toHaveBeenCalled();
    expect(reject).toHaveBeenCalledWith(["A", "B", "C", "D"]);

    await promise;
  });
});
