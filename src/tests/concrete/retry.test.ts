import { describe, expect, it, vi } from "vitest";
import retryExercise from "../../exercises/concrete/retry/exercise.js";

type SetupParams = {
  failures: number;
};

const setup = async ({ failures }: SetupParams) => {
  const errors = Array.from({ length: failures }).map(
    (_, index) => `Error${index + 1}`
  );
  const postDataReturnValue = "Data";
  const getData = errors
    .reduce((fn, error) => fn.mockRejectedValueOnce(error), vi.fn())
    .mockResolvedValue(postDataReturnValue);

  const retry = retryExercise({
    getData,
  });

  const postDataInput = "Arg";

  let retryReturnValue!: string;
  let retryThrownError!: unknown;

  await retry(postDataInput).then(
    (data) => {
      retryReturnValue = data;
    },
    (error) => {
      retryThrownError = error;
    }
  );

  return {
    errors,
    postDataReturnValue,
    postDataInput,
    retryReturnValue,
    retryThrownError,
    getData,
  };
};

describe("When request suceeds on first try", () => {
  const secondSetup = () => setup({ failures: 0 });

  it("getData is called only once", async () => {
    const { postDataInput, getData } = await secondSetup();

    expect(getData).toHaveBeenCalledOnce();
    expect(getData).toHaveBeenCalledWith(postDataInput);
  });

  it("Resolves to getData return value", async () => {
    const { postDataReturnValue, retryReturnValue } = await secondSetup();

    expect(postDataReturnValue).toBe(retryReturnValue);
  });
});

describe("When request fails a few times and then suceeds", () => {
  const secondSetup = () => setup({ failures: 2 });

  it("getData is called that number of times", async () => {
    const { postDataInput, getData } = await secondSetup();

    expect(getData).toHaveBeenCalledTimes(3);
    expect(getData).toHaveBeenCalledWith(postDataInput);
  });

  it("Resolves to getData return value", async () => {
    const { postDataReturnValue, retryReturnValue } = await secondSetup();

    expect(postDataReturnValue).toBe(retryReturnValue);
  });
});

describe("When request fails more times than allowed", () => {
  const secondSetup = () => setup({ failures: 4 });

  it("getData is called that number of times", async () => {
    const { postDataInput, getData } = await secondSetup();

    expect(getData).toHaveBeenCalledTimes(4);
    expect(getData).toHaveBeenCalledWith(postDataInput);
  });

  it("Rejects to getData thrown aggregated errors", async () => {
    const { errors, retryThrownError } = await secondSetup();

    expect(retryThrownError).toEqual(errors);
  });
});
