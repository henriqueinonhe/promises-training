import { expect, it, vi } from "vitest";
import { promiseWithResolvers } from "../../lib/promiseWithResolvers";
import parallelMaxConcurrencyExercise from "../../exercises/concrete/parallelMaxConcurrency";
import { waitForPromises } from "../../lib/waitForPromises";

const setup = () => {
  const handlers = Array.from({ length: 8 }).map(() =>
    promiseWithResolvers<string>()
  );

  const postData = handlers.reduce(
    (fn, { promise }) => fn.mockReturnValueOnce(promise),
    vi.fn()
  );

  const parallelMaxConcurrency = parallelMaxConcurrencyExercise({
    postData,
  });

  const parameters = handlers.map((_, index) => `Data${index}`);

  const promise = parallelMaxConcurrency(parameters);

  return {
    postData,
    handlers,
    parallelMaxConcurrency,
    promise,
    parameters,
  };
};

it("First 5 requests are made in parallel", async () => {
  const { postData } = setup();

  await waitForPromises();

  expect(postData).toHaveBeenCalledTimes(5);
  expect(postData).toHaveBeenCalledWith("Data0");
  expect(postData).toHaveBeenCalledWith("Data1");
  expect(postData).toHaveBeenCalledWith("Data2");
  expect(postData).toHaveBeenCalledWith("Data3");
  expect(postData).toHaveBeenCalledWith("Data4");
});

it("As requests finish, others are made, in sequence", async () => {
  const { handlers, postData } = setup();

  handlers[0].resolver("Data5");
  await waitForPromises();
  expect(postData).toHaveBeenCalledTimes(6);
  expect(postData).toHaveBeenCalledWith("Data5");

  handlers[3].resolver("Data6");
  await waitForPromises();
  expect(postData).toHaveBeenCalledTimes(7);
  expect(postData).toHaveBeenCalledWith("Data6");

  handlers[4].resolver("Data7");
  await waitForPromises();
  expect(postData).toHaveBeenCalledTimes(8);
  expect(postData).toHaveBeenCalledWith("Data7");
});

it("Returns the results of all requests in sequence", async () => {
  const { handlers, promise } = setup();

  handlers.forEach((handler, index) => handler.resolver(`Result${index}`));

  const results = await promise;

  expect(results).toEqual(
    await Promise.all(handlers.map(({ promise }) => promise))
  );
});
