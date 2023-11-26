import { describe, expect, it, vi } from "vitest";
import { promiseWithResolvers } from "../../lib/promiseWithResolvers.js";
import parallelMaxConcurrencyExercise from "../../exercises/concrete/parallelMaxConcurrency/exercise.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

describe("When the list has 8 elements", () => {
  const setup = async () => {
    const results = Array.from({ length: 8 }).map(
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

    const parallelChunks = parallelMaxConcurrencyExercise({
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

  describe("And third request resolves", () => {
    const secondSetup = async () => {
      const previousSetupReturnValue = await setup();

      const { handlers } = previousSetupReturnValue;

      handlers[2].resolver();

      await waitForPromises();

      return previousSetupReturnValue;
    };

    it("Sixth request is made", async () => {
      const { postData, parameters } = await secondSetup();

      expect(postData).toHaveBeenCalledTimes(6);
      expect(postData).toHaveBeenCalledWith(parameters[5]);
    });

    describe("And first request resolves", () => {
      const thirdSetup = async () => {
        const previousSetupReturnValue = await secondSetup();

        const { handlers } = previousSetupReturnValue;

        handlers[0].resolver();

        await waitForPromises();

        return previousSetupReturnValue;
      };

      it("Seventh request is made", async () => {
        const { postData, parameters } = await thirdSetup();

        expect(postData).toHaveBeenCalledTimes(7);
        expect(postData).toHaveBeenCalledWith(parameters[6]);
      });

      describe("And fourth request resolves", () => {
        const fourthSetup = async () => {
          const previousSetupReturnValue = await thirdSetup();

          const { handlers } = previousSetupReturnValue;

          handlers[3].resolver();

          await waitForPromises();

          return previousSetupReturnValue;
        };

        it("Eighth request is made", async () => {
          const { postData, parameters } = await fourthSetup();

          expect(postData).toHaveBeenCalledTimes(8);
          expect(postData).toHaveBeenCalledWith(parameters[7]);
        });

        describe("And other requests resolve", () => {
          const fifthSetup = async () => {
            const previousSetupReturnValue = await fourthSetup();

            const { handlers } = previousSetupReturnValue;

            handlers[1].resolver();
            handlers[4].resolver();
            handlers[5].resolver();
            handlers[6].resolver();
            handlers[7].resolver();

            await waitForPromises();

            return previousSetupReturnValue;
          };

          it("Returns results in order", async () => {
            const { promise, results } = await fifthSetup();

            expect(await promise).toEqual(results);
          });
        });
      });
    });
  });
});
