import { describe, expect, vi, it } from "vitest";
import retryWithBackoffExercise from "../../exercises/concrete/retryWithBackoff/exercise.js";

type SetupParams = {
  failures: number;
};

const setup = async ({ failures }: SetupParams) => {
  const errors = Array.from({ length: failures }).map(
    (_, index) => `Error${index + 1}`
  );
  const postDataReturnValue = "Data";
  const postData = errors
    .reduce((fn, error) => fn.mockRejectedValueOnce(error), vi.fn())
    .mockResolvedValue(postDataReturnValue);

  const wait = vi.fn().mockResolvedValue(undefined);

  const retryWithBackoff = retryWithBackoffExercise({
    postData,
    wait,
  });

  const postDataInput = "Arg";

  let retryReturnValue!: string;
  let retryThrownError!: unknown;

  await retryWithBackoff(postDataInput).then(
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
    postData,
    wait,
  };
};

describe("When request suceeds on first try", () => {
  const secondSetup = () => setup({ failures: 0 });

  it("postData is called only once", async () => {
    const { postDataInput, postData } = await secondSetup();

    expect(postData).toHaveBeenCalledOnce();
    expect(postData).toHaveBeenCalledWith(postDataInput);
  });

  it("Resolves to postData return value", async () => {
    const { postDataReturnValue, retryReturnValue } = await secondSetup();

    expect(postDataReturnValue).toBe(retryReturnValue);
  });
});

describe("When request fails a few times and then suceeds", () => {
  const secondSetup = () => setup({ failures: 3 });

  it("postData is that number of times", async () => {
    const { postData } = await secondSetup();

    expect(postData).toHaveBeenCalledTimes(4);
  });

  it("Resolves to postData return value", async () => {
    const { postDataReturnValue, retryReturnValue } = await secondSetup();

    expect(postDataReturnValue).toBe(retryReturnValue);
  });

  it("Wait appropriately between retries", async () => {
    const { wait } = await secondSetup();

    expect(wait).toHaveBeenCalledTimes(3);
    expect(wait).toHaveBeenNthCalledWith(1, 200);
    expect(wait).toHaveBeenNthCalledWith(2, 400);
    expect(wait).toHaveBeenNthCalledWith(3, 800);
  });
});
