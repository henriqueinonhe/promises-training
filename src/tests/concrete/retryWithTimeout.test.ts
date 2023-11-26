import { describe, expect, it, vi } from "vitest";
import retryWithTimeoutExercise from "../../exercises/concrete/retryWithTimeout/exercise.js";

type SetupParams = {
  outcome: "Succeed" | "Fail";
  outcomeOnRetry: number;
};

const setup = async ({ outcome, outcomeOnRetry }: SetupParams) => {
  const errors = Array.from({
    length: outcome === "Succeed" ? outcomeOnRetry - 1 : outcomeOnRetry,
  }).map((_, index) => `Error${index + 1}`);
  const postDataReturnValue = "Data";
  const postData = (() => {
    const postDataFailures = errors.reduce(
      (fn, error) => fn.mockRejectedValueOnce(error),
      vi.fn()
    );

    if (outcome === "Succeed") {
      return postDataFailures.mockResolvedValueOnce(postDataReturnValue);
    }

    return postDataFailures;
  })();

  const now = vi.fn().mockImplementation(() => {
    if (postData.mock.calls.length < outcomeOnRetry) {
      return 0;
    }

    return 3000;
  });

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
    outcomeOnRetry: number;
  };
  const secondSetup = ({ outcomeOnRetry }: SecondSetupParams) =>
    setup({ outcome: "Succeed", outcomeOnRetry });

  it("postData is called only once", async () => {
    const { postDataInput, postData } = await secondSetup({
      outcomeOnRetry: 1,
    });

    expect(postData).toHaveBeenCalledOnce();
    expect(postData).toHaveBeenCalledWith(postDataInput);
  });

  it("Resolves to postData return value", async () => {
    const { postDataReturnValue, retryReturnValue } = await secondSetup({
      outcomeOnRetry: 1,
    });

    expect(postDataReturnValue).toBe(retryReturnValue);
  });

  describe("And it takes more time than the timeout threshold", () => {
    const thirdSetup = () => secondSetup({ outcomeOnRetry: 0 });

    it("Still suceeds", async () => {
      const { retryReturnValue } = await thirdSetup();

      expect(retryReturnValue).toBe("Data");
    });
  });
});

describe("When request fails a few times and then suceeds", () => {
  const secondSetup = () => setup({ outcome: "Succeed", outcomeOnRetry: 3 });

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
  const secondSetup = () => setup({ outcome: "Fail", outcomeOnRetry: 2 });

  it("Rejects to postData thrown aggregated errors", async () => {
    const { errors, retryThrownError } = await secondSetup();

    expect(retryThrownError).toEqual(errors);
  });
});
