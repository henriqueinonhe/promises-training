import { describe, expect, it, vi } from "vitest";
import makeConcurrencyAbort from "../../exercises/concrete/concurrencyAbort/exercise.js";

const setup = () => {
  const resolvers: Array<(data: string) => void> = [];
  const fetchData = vi.fn().mockReturnValue(
    new Promise<string>((resolve) => {
      resolvers.push(resolve);
    })
  );
  const setData = vi.fn();

  const concurrencyAbort = makeConcurrencyAbort({ fetchData, setData });

  return {
    setData,
    fetchData,
    resolvers,
    concurrencyAbort,
  };
};

describe("When function is not already running", () => {
  const secondSetup = async () => {
    const setupReturnValue = setup();

    const { concurrencyAbort, resolvers } = setupReturnValue;

    const input = "input";
    const data = "data";
    resolvers[0](data);
    await concurrencyAbort(input);

    return {
      ...setupReturnValue,
      input,
    };
  };

  it("Calls fetchData with input", async () => {
    const { fetchData, input } = await secondSetup();

    expect(fetchData).toHaveBeenCalledWith(input);
    expect(fetchData).toHaveBeenCalledTimes(1);
  });

  it("Calls setData with data", async () => {
    const { setData, fetchData } = await secondSetup();

    expect(setData).toHaveBeenCalledWith(fetchData.mock.results[0].value);
    expect(setData).toHaveBeenCalledTimes(1);
  });
});

describe("When function is already running and we make a second call", () => {
  const secondSetup = async () => {
    const setupReturnValue = setup();

    const { concurrencyAbort } = setupReturnValue;

    const firstInput = "input";
    const secondInput = "input2";
    const firstPromise = concurrencyAbort(firstInput);
    const secondPromise = concurrencyAbort(secondInput);

    return {
      ...setupReturnValue,
      firstPromise,
      secondPromise,
    };
  };

  it("Does not call fetchData a second time", async () => {
    const { fetchData } = await secondSetup();

    expect(fetchData).toHaveBeenCalledTimes(1);
  });

  describe("And then first call resolves", () => {
    const thirdSetup = async () => {
      const setupReturnValue = await secondSetup();

      const { resolvers, firstPromise } = setupReturnValue;

      const data = "data";
      resolvers[0](data);
      await firstPromise;

      return {
        ...setupReturnValue,
        data,
      };
    };

    it("Calls setData with data a single time", async () => {
      const { setData, data } = await thirdSetup();

      expect(setData).toHaveBeenCalledWith(data);
      expect(setData).toHaveBeenCalledTimes(1);
    });
  });
});
