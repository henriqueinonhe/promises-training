import { describe, expect, it, vi } from "vitest";
import { createFoundationExerciseContainer } from "../../lib/foundationExercise/foundationExerciseContainer.js";
import { waitForPromises } from "../../lib/waitForPromises.js";
import promiseRace from "../../exercises/foundation/promiseRace/exercise.js";

describe("When some promise resolves", () => {
  it("Returns a promise that resolves to the first resolved value", async () => {
    const { createPromise, promiseManager } =
      createFoundationExerciseContainer<string>();

    const resolve = vi.fn();
    const reject = vi.fn();

    const promise = promiseRace([
      createPromise("A"),
      createPromise("B"),
      createPromise("C"),
      createPromise("D"),
    ]).then(resolve, reject);

    promiseManager.resolve("B", "B");
    await waitForPromises();
    expect(resolve).toHaveBeenCalledWith("B");
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(reject).not.toHaveBeenCalled();

    promiseManager.reject("C", "C");
    await waitForPromises();
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(reject).not.toHaveBeenCalled();

    promiseManager.reject("A", "A");
    await waitForPromises();
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(reject).not.toHaveBeenCalled();

    promiseManager.reject("D", "D");
    await waitForPromises();
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(reject).not.toHaveBeenCalled();

    await promise;
  });
});

describe("When some promise rejects", () => {
  it("Returns a promise that rejects to the first rejected value", async () => {
    const { createPromise, promiseManager } =
      createFoundationExerciseContainer<string>();

    const resolve = vi.fn();
    const reject = vi.fn();

    const promise = promiseRace([
      createPromise("A"),
      createPromise("B"),
      createPromise("C"),
      createPromise("D"),
    ]).then(resolve, reject);

    promiseManager.reject("B", "B");
    await waitForPromises();
    expect(reject).toHaveBeenCalledWith("B");
    expect(reject).toHaveBeenCalledTimes(1);
    expect(resolve).not.toHaveBeenCalled();

    promiseManager.reject("C", "C");
    await waitForPromises();
    expect(reject).toHaveBeenCalledTimes(1);
    expect(resolve).not.toHaveBeenCalled();

    promiseManager.resolve("A", "A");
    await waitForPromises();
    expect(reject).toHaveBeenCalledTimes(1);
    expect(resolve).not.toHaveBeenCalled();

    promiseManager.reject("D", "D");
    await waitForPromises();
    expect(reject).toHaveBeenCalledTimes(1);
    expect(resolve).not.toHaveBeenCalled();

    await promise;
  });
});
