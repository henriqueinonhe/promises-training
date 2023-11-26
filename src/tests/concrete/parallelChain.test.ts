import { describe, expect, it, vi } from "vitest";
import makeParallelChainExercise from "../../exercises/concrete/parallelChain/exercise.js";
import { promiseWithResolvers } from "../../lib/promiseWithResolvers.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

const setup = () => {
  const list = Array.from({ length: 10 }).map((_, index) => `data-${index}`);
  const firstStepResults = list.map((data) => `firstStep-${data}`);
  const secondStepResults = list.map((data) => `secondStep-${data}`);
  const thirdStepResults = list.map((data) => `thirdStep-${data}`);

  const firstStepPromisesWithResolver = firstStepResults.map((result) => {
    const { promise, resolver } = promiseWithResolvers<string>();

    const resolve = () => resolver(result);

    return {
      promise,
      resolve,
    };
  });
  const secondStepPromisesWithResolver = secondStepResults.map((result) => {
    const { promise, resolver } = promiseWithResolvers<string>();

    const resolve = () => resolver(result);

    return {
      promise,
      resolve,
    };
  });
  const thirdStepPromisesWithResolver = thirdStepResults.map((result) => {
    const { promise, resolver } = promiseWithResolvers<string>();

    const resolve = () => resolver(result);

    return {
      promise,
      resolve,
    };
  });

  const firstStep = firstStepPromisesWithResolver.reduce(
    (fn, { promise }) => fn.mockResolvedValueOnce(promise),
    vi.fn()
  );
  const secondStep = secondStepPromisesWithResolver.reduce(
    (fn, { promise }) => fn.mockResolvedValueOnce(promise),
    vi.fn()
  );
  const thirdStep = thirdStepPromisesWithResolver.reduce(
    (fn, { promise }) => fn.mockResolvedValueOnce(promise),
    vi.fn()
  );

  const parallelChainExercise = makeParallelChainExercise({
    firstStep,
    secondStep,
    thirdStep,
  });

  const promise = parallelChainExercise(list);

  return {
    list,
    firstStep,
    secondStep,
    thirdStep,
    firstStepResults,
    secondStepResults,
    thirdStepResults,
    firstStepPromisesWithResolver,
    secondStepPromisesWithResolver,
    thirdStepPromisesWithResolver,
    promise,
  };
};

it("Calls are all made in parallel", async () => {
  const { list, firstStep } = setup();

  expect(firstStep).toHaveBeenCalledTimes(list.length);
  for (const data of list) {
    expect(firstStep).toHaveBeenCalledWith(data);
  }
});

describe("When firstStep calls resolve", () => {
  it("Each call to second step is made immediately after the corresponding call to firstStep", async () => {
    const { firstStepPromisesWithResolver, secondStep, firstStepResults } =
      setup();

    const firstStepResolutionOrder = [5, 4, 7, 6, 9, 1, 2, 0, 3, 8];

    let count = 0;
    for (const index of firstStepResolutionOrder) {
      const { resolve } = firstStepPromisesWithResolver[index];
      const data = firstStepResults[index];

      resolve();
      await waitForPromises();

      expect(secondStep).toHaveBeenCalledTimes(count + 1);
      expect(secondStep).toHaveBeenCalledWith(data);
      count++;
    }
  });

  describe("When secondStep calls resolve", () => {
    const secondSetup = async () => {
      const setupReturnValue = setup();

      const { firstStepPromisesWithResolver } = setupReturnValue;

      for (const { resolve } of firstStepPromisesWithResolver) {
        resolve();
      }

      await waitForPromises();

      return setupReturnValue;
    };

    it("Each call to third step is made immediately after the corresponding call to secondStep", async () => {
      const { secondStepPromisesWithResolver, thirdStep, secondStepResults } =
        await secondSetup();

      const secondStepResolutionOrder = [5, 4, 7, 6, 9, 1, 2, 0, 3, 8];

      let count = 0;
      for (const index of secondStepResolutionOrder) {
        const { resolve } = secondStepPromisesWithResolver[index];
        const data = secondStepResults[index];

        resolve();
        await waitForPromises();

        expect(thirdStep).toHaveBeenCalledTimes(count + 1);
        expect(thirdStep).toHaveBeenCalledWith(data);
        count++;
      }
    });
  });
});

describe("When all calls are resolved", () => {
  const secondSetup = async () => {
    const setupReturnValue = setup();

    const {
      firstStepPromisesWithResolver,
      secondStepPromisesWithResolver,
      thirdStepPromisesWithResolver,
      promise,
      thirdStepResults,
    } = setupReturnValue;

    for (const { resolve } of firstStepPromisesWithResolver) {
      resolve();
    }
    await waitForPromises();

    for (const { resolve } of secondStepPromisesWithResolver) {
      resolve();
    }
    await waitForPromises();

    for (const { resolve } of thirdStepPromisesWithResolver) {
      resolve();
    }
    await waitForPromises();

    return {
      promise,
      thirdStepResults,
    };
  };

  it("Returns the result of the thirdStep calls in the correct order", async () => {
    const { promise, thirdStepResults } = await secondSetup();

    const result = await promise;

    expect(result).toEqual(thirdStepResults);
  });
});
