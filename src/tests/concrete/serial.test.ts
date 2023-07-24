import { it, vi, expect } from "vitest";
import makeSerialExercise from "../../exercises/concrete/serial/exercise";
import { promiseWithResolvers } from "../../lib/promiseWithResolvers";
import { waitForPromises } from "../../lib/waitForPromises";

const setup = () => {
  const list = Array.from({ length: 10 }).map((_, index) => `data-${index}`);
  const promisesWithResolvers = list.map((data) => {
    const { promise, resolver } = promiseWithResolvers<string>();

    const resolve = () => resolver(data);

    return {
      promise,
      resolve,
    };
  });
  const postData = promisesWithResolvers.reduce(
    (fn, { promise }) => fn.mockReturnValueOnce(promise),
    vi.fn()
  );

  const serialExercise = makeSerialExercise({
    postData,
  });

  return { list, postData, serialExercise, promisesWithResolvers };
};

it("postData is called serially", async () => {
  const { list, postData, serialExercise, promisesWithResolvers } = setup();

  const promise = serialExercise(list);
  await waitForPromises();

  for (let i = 0; i < list.length; i++) {
    const { resolve } = promisesWithResolvers[i];
    expect(postData).toHaveBeenCalledWith(list[i]);
    expect(postData).toHaveBeenCalledTimes(i + 1);
    resolve();
    await waitForPromises();
  }

  const result = await promise;
  expect(result).toEqual(list);
});

it("Returns the result of the postData calls in the correct order", async () => {
  const { list, serialExercise, promisesWithResolvers } = setup();

  const promise = serialExercise(list);
  await waitForPromises();

  for (let i = 0; i < list.length; i++) {
    const { resolve } = promisesWithResolvers[i];
    resolve();
    await waitForPromises();
  }

  const result = await promise;
  expect(result).toEqual(list);
});
