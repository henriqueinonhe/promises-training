import { ExerciseContext } from "../../../lib/Exercise";
import { match } from "../../../lib/match";
import { fulfilled, promiseResult, rejected } from "../../../lib/promiseResult";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = promiseResult(createPromise("A"));
    const b = a.then((result) =>
      match(result, fulfilled("A"), () => createPromise("B"))
    );
    const c = a.then((result) =>
      match(result, rejected("A"), () => createPromise("C"))
    );
    const d = b.then((result) =>
      match(result, fulfilled("B"), () => createPromise("D"))
    );
    const e = c.then((result) =>
      match(result, rejected("C"), () => createPromise("E"))
    );
    const f = Promise.all([d, e]).then((results) =>
      match(results, [rejected("D"), fulfilled("E")], () => createPromise("F"))
    );

    await Promise.all([a, b, c, d, e, f]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = promiseResult(createPromise("A"));
    const b = (async () => {
      const result = await a;
      return await match(result, fulfilled("A"), () => createPromise("B"));
    })();
    const c = (async () => {
      const result = await a;
      return await match(result, rejected("A"), () => createPromise("C"));
    })();
    const d = (async () => {
      const result = await b;
      return await match(result, fulfilled("B"), () => createPromise("D"));
    })();
    const e = (async () => {
      const result = await c;
      return await match(result, rejected("C"), () => createPromise("E"));
    })();
    const f = (async () => {
      const results = await Promise.all([d, e]);
      return await match(results, [rejected("D"), fulfilled("E")], () =>
        createPromise("F")
      );
    })();

    await Promise.all([a, b, c, d, e, f]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = promiseResult(createPromise("A"));
    const b = a.then((result) =>
      match(result, fulfilled("A"), () => createPromise("B"))
    );
    const c = a.then((result) =>
      match(result, rejected("A"), () => createPromise("C"))
    );
    const d = b.then((result) =>
      match(result, fulfilled("B"), () => createPromise("D"))
    );
    const e = c.then((result) =>
      match(result, rejected("C"), () => createPromise("E"))
    );
    const f = Promise.all([d, e]).then((results) =>
      match(results, [rejected("D"), fulfilled("E")], () => createPromise("F"))
    );

    return Promise.all([a, b, c, d, e, f]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
