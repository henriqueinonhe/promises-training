import { it, vi, expect } from "vitest";
import { createFoundationExerciseContainer } from "../../lib/foundationExercise/foundationExerciseContainer.js";
import promiseAllSettled from "../../exercises/foundation/promiseAllSettled/exercise.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

it("Waits for all promises to settle and resolves to array of results", async () => {
  const { createPromise, promiseManager } =
    createFoundationExerciseContainer<string>();

  const resolve = vi.fn();
  const reject = vi.fn();

  const promise = promiseAllSettled([
    createPromise("A"),
    createPromise("B"),
    createPromise("C"),
    createPromise("D"),
  ]).then(resolve, reject);

  promiseManager.resolve("B", "B");
  await waitForPromises();
  expect(resolve).not.toHaveBeenCalled();
  expect(reject).not.toHaveBeenCalled();

  promiseManager.reject("A", "A");
  await waitForPromises();
  expect(resolve).not.toHaveBeenCalled();
  expect(reject).not.toHaveBeenCalled();

  promiseManager.reject("C", "C");
  await waitForPromises();
  expect(resolve).not.toHaveBeenCalled();
  expect(reject).not.toHaveBeenCalled();

  promiseManager.resolve("D", "D");
  await waitForPromises();
  expect(resolve).toHaveBeenCalledTimes(1);
  expect(resolve).toHaveBeenCalledWith([
    { status: "rejected", reason: "A" },
    { status: "fulfilled", value: "B" },
    { status: "rejected", reason: "C" },
    { status: "fulfilled", value: "D" },
  ]);
  expect(reject).not.toHaveBeenCalled();

  await promise;
});

it("Waits for all promises to settle and resolves to array of results", async () => {
  const { createPromise, promiseManager } =
    createFoundationExerciseContainer<string>();

  const resolve = vi.fn();
  const reject = vi.fn();

  const promise = promiseAllSettled([
    createPromise("A"),
    createPromise("B"),
    createPromise("C"),
    createPromise("D"),
  ]).then(resolve, reject);

  promiseManager.resolve("D", "D");
  await waitForPromises();
  expect(resolve).not.toHaveBeenCalled();
  expect(reject).not.toHaveBeenCalled();

  promiseManager.reject("A", "A");
  await waitForPromises();
  expect(resolve).not.toHaveBeenCalled();
  expect(reject).not.toHaveBeenCalled();

  promiseManager.reject("B", "B");
  await waitForPromises();
  expect(resolve).not.toHaveBeenCalled();
  expect(reject).not.toHaveBeenCalled();

  promiseManager.resolve("C", "C");
  await waitForPromises();
  expect(resolve).toHaveBeenCalledTimes(1);
  expect(resolve).toHaveBeenCalledWith([
    { status: "rejected", reason: "A" },
    { status: "rejected", reason: "B" },
    { status: "fulfilled", value: "C" },
    { status: "fulfilled", value: "D" },
  ]);
  expect(reject).not.toHaveBeenCalled();

  await promise;
});
