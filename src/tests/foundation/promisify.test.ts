import { describe, expect, it, vi } from "vitest";
import promisify from "../../exercises/foundation/promisify/exercise.js";

const setup = () => {
  const original = vi.fn();

  const promisified = promisify(original);

  return { original, promisified };
};

const testSuite = (secondSetup: () => any) => {
  describe("And the promisified function is called", () => {
    const thirdSetup = () => {
      const secondSetupReturnValue = secondSetup();

      const { promisified, args, original } = secondSetupReturnValue;

      const promise = promisified(...args);

      const callback = original.mock.calls[0][args.length];

      return { ...secondSetupReturnValue, callback, promise };
    };

    it("Arguments are passed to the original function in the same order they were received, aside from the callback", () => {
      const thirdSetupReturnValue = thirdSetup();

      const { original, args } = thirdSetupReturnValue;

      expect(original).toHaveBeenCalledWith(...args, expect.any(Function));
    });

    describe("And the promisified function resolves", () => {
      const fourthSetup = async () => {
        const thirdSetupReturnValue = thirdSetup();

        const { result, callback } = thirdSetupReturnValue;

        callback(undefined, result);

        return thirdSetupReturnValue;
      };

      it("Returns the value passed to the callback", async () => {
        const fourthSetupReturnValue = await fourthSetup();

        const { promise, result } = fourthSetupReturnValue;

        await expect(promise).resolves.toBe(result);
      });
    });

    describe("And the promisified function rejects", () => {
      const fourthSetup = async () => {
        const thirdSetupReturnValue = thirdSetup();

        const { error, callback } = thirdSetupReturnValue;

        callback(error, undefined);

        return thirdSetupReturnValue;
      };

      it("Returns the error passed to the callback", async () => {
        const fourthSetupReturnValue = await fourthSetup();

        const { promise, error } = fourthSetupReturnValue;

        await expect(promise).rejects.toBe(error);
      });
    });
  });
};

describe("When the original function receives only the callback as argument", () => {
  const secondSetup = () => {
    const setupReturnValue = setup();

    const result = "Result";
    const error = "Error";
    const args: Array<never> = [];

    return { ...setupReturnValue, result, error, args };
  };

  testSuite(secondSetup);
});

describe("When the original function receives 3 arguments before the callback", () => {
  const secondSetup = () => {
    const setupReturnValue = setup();

    const result = "Result";
    const error = "Error";
    const args: Array<any> = [1, true, "bad"];

    return { ...setupReturnValue, result, error, args };
  };

  testSuite(secondSetup);
});

describe("When the original function receives 10 arguments before the callback", () => {
  const secondSetup = () => {
    const setupReturnValue = setup();

    const result = "Result";
    const error = "Error";
    const args: Array<any> = [1, 2, "3", true, false, "6", 7, 8, 9, "10"];

    return { ...setupReturnValue, result, error, args };
  };

  testSuite(secondSetup);
});
