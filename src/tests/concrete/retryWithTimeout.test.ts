import { describe, expect, it, vi } from "vitest";
import retryWithTimeoutExercise from "../../exercises/concrete/retryWithTimeout";

type SetupParams = {
  failures: number;
  timeoutOnRetry?: number;
};

const setup = async ({ failures, timeoutOnRetry }: SetupParams) => {
  const errors = Array.from({ length: failures }).map(
    (_, index) => `Error${index + 1}`
  );
  const postDataReturnValue = "Data";
  const postData = errors
    .reduce((fn, error) => fn.mockRejectedValueOnce(error), vi.fn())
    .mockResolvedValue(postDataReturnValue);

  const now = (() => {
    if (timeoutOnRetry !== undefined) {
      const times = Array.from({ length: timeoutOnRetry - 1 }).map(
        (_, index) => index
      );
      return times
        .reduce(
          (fn, time) =>
            fn.mockReturnValueOnce(time).mockReturnValueOnce(time + 1),
          vi.fn()
        )
        .mockReturnValueOnce(timeoutOnRetry)
        .mockReturnValueOnce(3000);
    }

    return vi.fn().mockReturnValue(0);
  })();

  const retryExercise = retryWithTimeoutExercise({
    postData,
    now,
  });

  const postDataInput = "Arg";

  let retryReturnValue!: string;
  let retryThrownError!: unknown;

  await retryExercise(postDataInput).then(
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
  type SecondSetupParams = {
    timeoutOnRetry?: number;
  };
  const secondSetup = ({ timeoutOnRetry }: SecondSetupParams = {}) =>
    setup({ failures: 0, timeoutOnRetry });

  it("postData is called only once", async () => {
    const { postDataInput, postData } = await secondSetup();

    expect(postData).toHaveBeenCalledOnce();
    expect(postData).toHaveBeenCalledWith(postDataInput);
  });

  it("Resolves to postData return value", async () => {
    const { postDataReturnValue, retryReturnValue } = await secondSetup();

    expect(postDataReturnValue).toBe(retryReturnValue);
  });

  describe("And it takes more time than the timeout threshold", () => {
    const thirdSetup = () => secondSetup({ timeoutOnRetry: 0 });

    it("Still suceeds", async () => {
      const { retryReturnValue } = await thirdSetup();

      expect(retryReturnValue).toBe("Data");
    });
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

describe("When request times out while retrying", () => {
  const secondSetup = () => setup({ failures: 2, timeoutOnRetry: 1 });

  it("Rejects to postData thrown aggregated errors", async () => {
    const { errors, retryThrownError } = await secondSetup();

    expect(retryThrownError).toEqual(errors);
  });
});
