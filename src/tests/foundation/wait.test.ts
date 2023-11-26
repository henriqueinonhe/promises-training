import { it, vi, expect } from "vitest";
import waitExercise from "../../exercises/foundation/wait/exercise.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

const setup = async () => {
  let timeoutCallback!: () => void;
  const setTimeout = vi.fn().mockImplementation((callback) => {
    timeoutCallback = callback;
  }) as any;

  const wait = waitExercise({
    setTimeout,
  });

  const ms = 1000;
  const promise = wait(ms);

  const promiseResolvedRef = { current: false };
  promise.then(() => {
    promiseResolvedRef.current = true;
  });

  await waitForPromises();

  return {
    ms,
    promise,
    setTimeout,
    timeoutCallback,
    promiseResolvedRef,
  };
};

it("Calls setTimeout correctly", async () => {
  const { ms, setTimeout, timeoutCallback, promiseResolvedRef, promise } =
    await setup();

  expect(setTimeout).toHaveBeenCalledWith(timeoutCallback, ms);

  expect(promiseResolvedRef.current).toBe(false);

  timeoutCallback();

  await promise;

  expect(promiseResolvedRef.current).toBe(true);
});
