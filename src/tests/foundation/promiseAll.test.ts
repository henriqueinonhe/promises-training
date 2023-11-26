import { describe, it, vi, expect } from "vitest";
import { createFoundationExerciseContainer } from "../../lib/foundationExercise/foundationExerciseContainer.js";
import promiseAll from "../../exercises/foundation/promiseAll/exercise.js";
import { waitForPromises } from "../../lib/waitForPromises.js";
import { permutations } from "../../lib/permutations.js";

describe("When some promise rejects", () => {
  it("Returns a promise that rejects WITHOUT WAITING for other promises to finish", async () => {
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
  });
});

describe("When all promises resolve", () => {
  const test = async (inputLength: number) => {
    describe(`And the input array has length ${inputLength}`, () => {
      const labelList = Array.from({ length: inputLength }, (_, i) =>
        (i + 1).toString()
      );
      const resolutionOrderList: Array<Array<number>> = permutations(
        labelList.map((_, i) => i)
      );

      for (const resolutionOrder of resolutionOrderList) {
        const labelResolutionOrder = resolutionOrder.map(
          (index) => labelList[index]
        );

        describe(`And promises resolve with order ${labelResolutionOrder.join(
          ", "
        )}`, () => {
          const setup = () => {
            const { createPromise, promiseManager } =
              createFoundationExerciseContainer<string>();

            const resolve = vi.fn();
            const reject = vi.fn();

            const resultingPromise = promiseAll(
              labelList.map((label) => createPromise(label))
            ).then(resolve, reject);

            return {
              createPromise,
              promiseManager,
              resolve,
              reject,
              resultingPromise,
            };
          };

          it("Returns a promise that resolves to an array of resolved values in the same order as the input array", async () => {
            const { promiseManager, reject, resolve, resultingPromise } =
              setup();

            for (const index of resolutionOrder.slice(
              0,
              resolutionOrder.length - 1
            )) {
              const label = labelList[index];
              promiseManager.resolve(label, label);
              await waitForPromises();

              expect(resolve).not.toHaveBeenCalled();
              expect(reject).not.toHaveBeenCalled();
            }

            const lastLabel =
              labelList[resolutionOrder[resolutionOrder.length - 1]];
            promiseManager.resolve(lastLabel, lastLabel);
            await waitForPromises();

            expect(resolve).toHaveBeenCalledWith(labelList);
            expect(resolve).toHaveBeenCalledTimes(1);

            await resultingPromise;
          });
        });
      }
    });
  };

  Array.from({ length: 5 })
    .map((_, i) => i + 1)
    .forEach(test);
});
