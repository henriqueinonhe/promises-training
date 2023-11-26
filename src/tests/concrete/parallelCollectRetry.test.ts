import { it, vi, describe, expect } from "vitest";
import parallelCollectRetryExercise from "../../exercises/concrete/parallelCollectRetry/exercise.js";
import { promiseWithResolvers } from "../../lib/promiseWithResolvers.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

describe("When the list has 8 elements", () => {
  const setup = async () => {
    const maxTryouts = 4;

    const results = Array.from({ length: 8 }).map((_, i) =>
      Array.from({ length: maxTryouts }).map(
        (_, j) => `Result${i + 1}-Tryout${j}`
      )
    );

    const errors = results.map((list, i) =>
      list.map((_, j) => `Error${i}-Tryout${j}`)
    );

    const handlers = results.map((list, i) =>
      list.map((_, j) => {
        const { promise, rejecter, resolver } = promiseWithResolvers<string>();

        return {
          promise,
          rejecter: () => rejecter(errors[i][j]),
          resolver: () => resolver(results[i][j]),
        };
      })
    );

    const parameters = handlers.map((_, index) => `Data${index + 1}`);

    const records = parameters.map(() => ({
      tryouts: 0,
    }));
    const postData = vi.fn().mockImplementation(async (data: string) => {
      const index = parameters.findIndex((parameter) => parameter === data);
      const record = records[index];
      const tryouts = record.tryouts;
      // Fallback to prevent syncrhonous resolution
      // in case tryouts are exceeded
      const { promise } =
        handlers[index][tryouts] ?? promiseWithResolvers<string>();
      record.tryouts++;

      return promise;
    });

    const parallelChunks = parallelCollectRetryExercise({
      postData,
    });

    const promise = parallelChunks(parameters);

    await waitForPromises();

    return {
      postData,
      handlers,
      promise,
      parameters,
      results,
      errors,
    };
  };

  it("All requests are made in parallel", async () => {
    const { postData, parameters } = await setup();

    expect(postData).toHaveBeenCalledTimes(8);
    parameters.forEach((parameter) => {
      expect(postData).toHaveBeenCalledWith(parameter);
    });
  });

  describe("And requests 1, 3 and 5 reject, requests 6 and 8 resolve, others are pending", () => {
    const secondSetup = async () => {
      const setupReturnValue = await setup();
      const { handlers } = setupReturnValue;

      handlers[0][0].rejecter();
      handlers[2][0].rejecter();
      handlers[4][0].rejecter();

      handlers[5][0].resolver();
      handlers[7][0].resolver();

      return {
        ...setupReturnValue,
      };
    };

    it("Keeps waiting for pending requests (no new calls to postData are made)", async () => {
      const { postData } = await secondSetup();

      expect(postData).toHaveBeenCalledTimes(8);
    });

    describe("And pending requests resolve", () => {
      const thirdSetup = async () => {
        const setupReturnValue = await secondSetup();
        const { handlers } = setupReturnValue;

        handlers[1][0].resolver();
        handlers[3][0].resolver();
        handlers[6][0].resolver();

        await waitForPromises();

        return {
          ...setupReturnValue,
        };
      };

      it("Requests 1, 3 and 5 are retried in parallel", async () => {
        const { postData, parameters } = await thirdSetup();

        expect(postData).toHaveBeenCalledTimes(11);
        expect(postData.mock.calls.slice(8)).toEqual(
          expect.arrayContaining([
            [parameters[2]],
            [parameters[0]],
            [parameters[4]],
          ])
        );
      });

      describe("And request 1 resolves and 3 and 5 reject", () => {
        const fourthSetup = async () => {
          const setupReturnValue = await thirdSetup();
          const { handlers } = setupReturnValue;

          handlers[0][1].resolver();
          handlers[2][1].rejecter();
          handlers[4][1].rejecter();

          await waitForPromises();

          return {
            ...setupReturnValue,
          };
        };

        it("Requests 3 and 5 are retried in parallel", async () => {
          const { postData, parameters } = await fourthSetup();

          expect(postData).toHaveBeenCalledTimes(13);
          expect(postData.mock.calls.slice(8)).toEqual(
            expect.arrayContaining([[parameters[4]], [parameters[2]]])
          );
        });

        describe("And requests 3 and 5 reject", () => {
          const fifthSetup = async () => {
            const setupReturnValue = await fourthSetup();
            const { handlers } = setupReturnValue;

            handlers[2][2].rejecter();
            handlers[4][2].rejecter();

            await waitForPromises();

            return {
              ...setupReturnValue,
            };
          };

          it("Requests 3 and 5 are retried", async () => {
            const { postData, parameters } = await fifthSetup();

            expect(postData).toHaveBeenCalledTimes(15);
            expect(postData.mock.calls.slice(11)).toEqual(
              expect.arrayContaining([[parameters[4]], [parameters[2]]])
            );
          });

          describe("And requests 3 and 5 resolve", () => {
            const sixthSetup = async () => {
              const setupReturnValue = await fifthSetup();
              const { handlers } = setupReturnValue;

              handlers[2][3].resolver();
              handlers[4][3].resolver();

              await waitForPromises();

              return {
                ...setupReturnValue,
              };
            };

            it("Returns the results in the correct order", async () => {
              const { promise, results } = await sixthSetup();

              const actualResults = [
                results[0][1],
                results[1][0],
                results[2][3],
                results[3][0],
                results[4][3],
                results[5][0],
                results[6][0],
                results[7][0],
              ];

              expect(await promise).toEqual(actualResults);
            });
          });

          describe("And request 3 and 5 rejects", () => {
            const sixthSetup = async () => {
              const setupReturnValue = await fifthSetup();
              const { handlers, promise } = setupReturnValue;

              handlers[2][3].rejecter();
              handlers[4][3].rejecter();

              promise.catch(() => {
                // No Op
              });

              await waitForPromises();

              return {
                ...setupReturnValue,
              };
            };

            it("Throws list of errors", async () => {
              const { promise, errors } = await sixthSetup();

              const actualErrors = [
                [errors[0][0]],
                [errors[2][0], errors[2][1], errors[2][2], errors[2][3]],
                [errors[4][0], errors[4][1], errors[4][2], errors[4][3]],
              ];

              await expect(promise).rejects.toEqual(
                expect.arrayContaining(actualErrors)
              );
              await expect(promise).rejects.toHaveLength(3);
            });
          });
        });
      });
    });
  });
});
