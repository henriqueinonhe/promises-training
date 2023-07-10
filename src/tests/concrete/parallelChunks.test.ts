import { promiseWithResolvers } from "../../lib/promiseWithResolvers";
import parallelChunksExercise from "../../content/concrete/parallelChunks";
import { it, vi, expect } from "vitest";
import { waitForPromises } from "../../lib/waitForPromises";
import { chunk, zip } from "lodash";

const setup = () => {
  const handlers = Array.from({ length: 17 }).map(() =>
    promiseWithResolvers<string>()
  );

  const postData = handlers.reduce(
    (fn, { promise }) => fn.mockReturnValueOnce(promise),
    vi.fn()
  );

  const parallelChunks = parallelChunksExercise({
    postData,
  });

  const parameters = handlers.map((_, index) => `Data${index}`);

  const promise = parallelChunks(parameters);

  return {
    postData,
    handlers,
    parallelChunks,
    promise,
    parameters,
  };
};

it("Requests are made in chunks", async () => {
  const { handlers, postData, parameters } = setup();

  type InferArray<T> = T extends Array<infer U> ? U : never;

  const parametersHandlers = zip(parameters, handlers) as Array<
    [InferArray<typeof parameters>, InferArray<typeof handlers>]
  >;

  const slices = chunk(parametersHandlers, 5);

  await slices.reduce((promise, slice, index) => {
    return promise.then(async () => {
      await waitForPromises();

      expect(postData).toHaveBeenCalledTimes(index * 5 + slice.length);
      slice.forEach(([parameter, { resolver }]) => resolver(parameter));
    });
  }, Promise.resolve());
});

it("Returns the results in order", async () => {
  const { handlers, promise } = setup();

  handlers.forEach(({ resolver }, index) => resolver(`Data${index}`));

  const result = await promise;

  expect(result).toEqual(
    await Promise.all(handlers.map(({ promise }) => promise))
  );
});
