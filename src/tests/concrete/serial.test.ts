import { it, vi, expect, describe } from "vitest";
import makeSerialExercise from "../../exercises/concrete/serial/exercise.js";
import { promiseWithResolvers } from "../../lib/promiseWithResolvers.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

describe("When the list has 4 elements", () => {
  const setup = async () => {
    const results = Array.from({ length: 4 }).map(
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

    const parallelChunks = makeSerialExercise({
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

  it("First request is made", async () => {
    const { postData, parameters } = await setup();

    expect(postData).toHaveBeenCalledTimes(1);
    expect(postData).toHaveBeenCalledWith(parameters[0]);
  });

  describe("And first request resolves", () => {
    const secondSetup = async () => {
      const previousSetupReturnValue = await setup();

      const { handlers } = previousSetupReturnValue;

      handlers[0].resolver();

      await waitForPromises();

      return previousSetupReturnValue;
    };

    it("Second request is made", async () => {
      const { postData, parameters } = await secondSetup();

      expect(postData).toHaveBeenCalledTimes(2);
      expect(postData).toHaveBeenCalledWith(parameters[1]);
    });

    describe("And second request resolves", () => {
      const thirdSetup = async () => {
        const previousSetupReturnValue = await secondSetup();

        const { handlers } = previousSetupReturnValue;

        handlers[1].resolver();

        await waitForPromises();

        return previousSetupReturnValue;
      };

      it("Third request is made", async () => {
        const { postData, parameters } = await thirdSetup();

        expect(postData).toHaveBeenCalledTimes(3);
        expect(postData).toHaveBeenCalledWith(parameters[2]);
      });

      describe("And third request resolves", () => {
        const fourthSetup = async () => {
          const previousSetupReturnValue = await thirdSetup();

          const { handlers } = previousSetupReturnValue;

          handlers[2].resolver();

          await waitForPromises();

          return previousSetupReturnValue;
        };

        it("Fourth request is made", async () => {
          const { postData, parameters } = await fourthSetup();

          expect(postData).toHaveBeenCalledTimes(4);
          expect(postData).toHaveBeenCalledWith(parameters[3]);
        });

        describe("And fourth request resolves", () => {
          const fifthSetup = async () => {
            const previousSetupReturnValue = await fourthSetup();

            const { handlers } = previousSetupReturnValue;

            handlers[3].resolver();

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
