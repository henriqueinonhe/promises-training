import { promiseWithResolvers } from "../../lib/promiseWithResolvers.js";
import parallelChunksExercise from "../../exercises/concrete/parallelChunks/exercise.js";
import { it, vi, expect, describe } from "vitest";
import { waitForPromises } from "../../lib/waitForPromises.js";

describe("When the list has 17 elements", () => {
  const setup = async () => {
    const results = Array.from({ length: 17 }).map(
      (_, index) => `Result${index + 1}`
    );

    const handlers = results.map((result) => {
      const { promise, resolver } = promiseWithResolvers<string>();

      return {
        promise,
        resolver: () => resolver(result),
      };
    });

    const postData = handlers.reduce(
      (fn, { promise }) => fn.mockReturnValueOnce(promise),
      vi.fn()
    );

    const parallelChunks = parallelChunksExercise({
      postData,
    });

    const parameters = handlers.map((_, index) => `Data${index + 1}`);

    const promise = parallelChunks(parameters);

    await waitForPromises();

    return {
      postData,
      handlers,
      promise,
      parameters,
      results,
    };
  };

  it("First 5 requests are made in parallel", async () => {
    const { postData, parameters } = await setup();

    expect(postData).toHaveBeenCalledTimes(5);
    parameters.slice(0, 5).forEach((parameter) => {
      expect(postData).toHaveBeenCalledWith(parameter);
    });
  });

  describe("And first 4 requests resolve", async () => {
    const secondSetup = async () => {
      const previousSetupReturnValue = await setup();

      const { handlers } = previousSetupReturnValue;

      handlers.slice(0, 4).forEach(({ resolver }) => resolver());

      await waitForPromises();

      return previousSetupReturnValue;
    };

    it("No new requests are made", async () => {
      const { postData } = await secondSetup();

      expect(postData).toHaveBeenCalledTimes(5);
    });

    describe("And the 5th request resolves", async () => {
      const thirdSetup = async () => {
        const previousSetupReturnValue = await secondSetup();

        const { handlers } = previousSetupReturnValue;

        handlers[4].resolver();

        await waitForPromises();

        return previousSetupReturnValue;
      };

      it("5 new requests are made in parallel", async () => {
        const { postData, parameters } = await thirdSetup();

        expect(postData).toHaveBeenCalledTimes(10);
        parameters.slice(5, 10).forEach((parameter) => {
          expect(postData).toHaveBeenCalledWith(parameter);
        });
      });

      describe("And the 10th request resolves (but not the 6th to 9th)", async () => {
        const fourthSetup = async () => {
          const previousSetupReturnValue = await thirdSetup();

          const { handlers } = previousSetupReturnValue;

          handlers[9].resolver();

          await waitForPromises();

          return previousSetupReturnValue;
        };

        it("No new requests are made in parallel", async () => {
          const { postData } = await fourthSetup();

          expect(postData).toHaveBeenCalledTimes(10);
        });

        describe("And the 6th to 9th requests resolve", async () => {
          const fifthSetup = async () => {
            const previousSetupReturnValue = await fourthSetup();

            const { handlers } = previousSetupReturnValue;

            handlers.slice(5, 9).forEach(({ resolver }) => resolver());

            await waitForPromises();

            return previousSetupReturnValue;
          };

          it("5 new requests are made in parallel", async () => {
            const { postData, parameters } = await fifthSetup();

            expect(postData).toHaveBeenCalledTimes(15);
            parameters.slice(10, 15).forEach((parameter) => {
              expect(postData).toHaveBeenCalledWith(parameter);
            });
          });

          describe("And the 11th to 15th requests resolve", async () => {
            const sixthSetup = async () => {
              const previousSetupReturnValue = await fifthSetup();

              const { handlers } = previousSetupReturnValue;

              handlers.slice(10, 15).forEach(({ resolver }) => resolver());

              await waitForPromises();

              return previousSetupReturnValue;
            };

            it("2 last requests are made in parallel", async () => {
              const { postData, parameters } = await sixthSetup();

              expect(postData).toHaveBeenCalledTimes(17);
              parameters.slice(15, 17).forEach((parameter) => {
                expect(postData).toHaveBeenCalledWith(parameter);
              });
            });

            describe("And the 2 last requests are resolved", () => {
              const seventhSetup = async () => {
                const previousSetupReturnValue = await sixthSetup();

                const { handlers } = previousSetupReturnValue;

                handlers.slice(15, 17).forEach(({ resolver }) => resolver());

                await waitForPromises();

                return previousSetupReturnValue;
              };

              it("Promise resolves to the results in order", async () => {
                const { promise, results } = await seventhSetup();

                expect(await promise).toEqual(results);
              });
            });
          });
        });
      });
    });
  });
});
