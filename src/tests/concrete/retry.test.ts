import { describe, expect, it, vi } from "vitest";
import retryExercise from "../../exercises/concrete/retry";

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

  const retry = retryExercise({
    postData,
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
    postData,
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
  const secondSetup = () => setup({ failures: 2 });

  it("postData is called that number of times", async () => {
    const { postDataInput, postData } = await secondSetup();

    expect(postData).toHaveBeenCalledTimes(3);
    expect(postData).toHaveBeenCalledWith(postDataInput);
  });

  it("Resolves to postData return value", async () => {
    const { postDataReturnValue, retryReturnValue } = await secondSetup();

    expect(postDataReturnValue).toBe(retryReturnValue);
  });
});

describe("When request fails more times than allowed", () => {
  const secondSetup = () => setup({ failures: 4 });

  it("postData is called that number of times", async () => {
    const { postDataInput, postData } = await secondSetup();

    expect(postData).toHaveBeenCalledTimes(4);
    expect(postData).toHaveBeenCalledWith(postDataInput);
  });

  it("Rejects to postData thrown aggregated errors", async () => {
    const { errors, retryThrownError } = await secondSetup();

    expect(retryThrownError).toEqual(errors);
  });
});
