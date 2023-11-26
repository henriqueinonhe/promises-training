import { describe, it, vi, expect } from "vitest";
import serialCollectErrorsExercise from "../../exercises/concrete/serialCollectErrors/exercise.js";
import { promiseWithResolvers } from "../../lib/promiseWithResolvers.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

const setup = async () => {
  const {
    resolver: resolver1,
    rejecter: rejecter1,
    promise: promise1,
  } = promiseWithResolvers<string>();
  const {
    resolver: resolver2,
    rejecter: rejecter2,
    promise: promise2,
  } = promiseWithResolvers<string>();
  const {
    resolver: resolver3,
    rejecter: rejecter3,
    promise: promise3,
  } = promiseWithResolvers<string>();
  const {
    resolver: resolver4,
    rejecter: rejecter4,
    promise: promise4,
  } = promiseWithResolvers<string>();

  const postData = vi
    .fn()
    .mockReturnValueOnce(promise1)
    .mockReturnValueOnce(promise2)
    .mockReturnValueOnce(promise3)
    .mockReturnValueOnce(promise4);

  const serialCollectErrors = serialCollectErrorsExercise({
    postData,
  });

  const parameters = ["Data1", "Data2", "Data3", "Data4"];

  const promise = serialCollectErrors(parameters);

  await waitForPromises();

  return {
    postData,
    resolver1,
    rejecter1,
    resolver2,
    rejecter2,
    resolver3,
    rejecter3,
    resolver4,
    rejecter4,
    serialCollectErrors,
    promise,
    parameters,
  };
};

it("Requests are made serially", async () => {
  const { postData, resolver1, rejecter2, rejecter3, resolver4 } =
    await setup();

  expect(postData).toHaveBeenCalledTimes(1);
  expect(postData).toHaveBeenCalledWith("Data1");

  resolver1("Success1");
  await waitForPromises();
  expect(postData).toHaveBeenCalledTimes(2);
  expect(postData).toHaveBeenCalledWith("Data2");

  rejecter2("Error2");
  await waitForPromises();
  expect(postData).toHaveBeenCalledTimes(3);
  expect(postData).toHaveBeenCalledWith("Data3");

  rejecter3("Error3");
  await waitForPromises();
  expect(postData).toHaveBeenCalledTimes(4);
  expect(postData).toHaveBeenCalledWith("Data4");
});

describe("When there are some errors and some successes", () => {
  const secondSetup = async () => {
    const setupReturnValue = await setup();

    const { promise, resolver1, rejecter2, rejecter3, resolver4 } =
      setupReturnValue;

    resolver1("Success1");
    rejecter2("Error2");
    rejecter3("Error3");
    resolver4("Success4");

    const { successes, errors } = await promise;

    return {
      successes,
      errors,
    };
  };

  it("Returns successes and errors", async () => {
    const { successes, errors } = await secondSetup();

    expect(successes).toEqual(["Success1", "Success4"]);
    expect(errors).toEqual(["Error2", "Error3"]);
  });
});
