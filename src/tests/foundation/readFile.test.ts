import { vi, describe, expect, it } from "vitest";

import readFileExercise from "../../exercises/foundation/readFile/exercise.js";

type SetupParams = {
  outcome: "success" | "failure";
};

const setup = async ({ outcome }: SetupParams) => {
  const readFileMock = vi
    .fn()
    .mockImplementation(
      (_: string, callback: (err: any, data: any) => void) => {
        if (outcome === "success") {
          callback(null, "data");
        } else {
          callback("error", null);
        }
      }
    ) as any;

  const readFile = readFileExercise({
    readFile: readFileMock,
  });

  const promise = readFile("path");

  return {
    promise,
    readFileMock,
  };
};

describe("When readFile succeeds", () => {
  const secondSetup = async () => {
    const { promise, readFileMock } = await setup({ outcome: "success" });

    const result = await promise;

    return {
      result,
      readFileMock,
    };
  };

  it("Returns the data", async () => {
    const { result, readFileMock } = await secondSetup();

    expect(result).toBe("data");
    expect(readFileMock).toHaveBeenCalledOnce();
    expect(readFileMock).toHaveBeenCalledWith("path", expect.any(Function));
  });
});

describe("When readFile fails", () => {
  const secondSetup = async () => {
    const { promise, readFileMock } = await setup({ outcome: "failure" });

    let error: any;
    try {
      await promise;
    } catch (e) {
      error = e;
    }

    return {
      error,
      readFileMock,
    };
  };

  it("Returns the error", async () => {
    const { error, readFileMock } = await secondSetup();

    expect(error).toBe("error");
    expect(readFileMock).toHaveBeenCalledOnce();
    expect(readFileMock).toHaveBeenCalledWith("path", expect.any(Function));
  });
});
