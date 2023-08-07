import { ExerciseContext } from "../../../lib/Exercise";
import { promiseResult } from "../../../lib/promiseResult";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = Promise.all([a, b]).then(() => createPromise("C"));
    const d = Promise.any([
      promiseResult(a).then((result) => {
        if (result.status === "fulfilled") {
          return;
        }

        throw new Error("");
      }),
      promiseResult(c).then((result) => {
        if (result.status === "rejected" && result.reason === "C") {
          return;
        }

        throw new Error();
      }),
    ]).then(() => createPromise("D"));
    const e = b.then(() => createPromise("E"));
    const f = Promise.any([c, e]).then(() => createPromise("F"));
    const g = Promise.any([
      Promise.allSettled([d, e]).then(([resultD, resultE]) => {
        if (
          resultD.status === "rejected" &&
          resultD.reason === "D" &&
          resultE.status === "rejected" &&
          resultE.reason === "E"
        ) {
          return;
        }

        throw new Error();
      }),
      Promise.allSettled([f]).then(([resultF]) => {
        if (resultF.status === "rejected" && resultF.reason === "F") {
          return;
        }

        throw new Error();
      }),
    ]).then(() => createPromise("G"));

    await Promise.all([a, b, c, d, e, f, g]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = (async () => {
      await Promise.all([a, b]);
      return await createPromise("C");
    })();
    const d = (async () => {
      await Promise.any([
        a,
        (async () => {
          try {
            await c;
            throw new Error();
          } catch (error) {
            if (error === "C") {
              return;
            }

            throw new Error();
          }
        })(),
      ]);

      return await createPromise("D");
    })();
    const e = (async () => {
      await b;
      return await createPromise("E");
    })();
    const f = (async () => {
      await Promise.any([c, e]);
      return await createPromise("F");
    })();
    const g = (async () => {
      await Promise.any([
        (async () => {
          const [resultD, resultE] = await Promise.allSettled([d, e]);
          if (
            resultD.status === "rejected" &&
            resultD.reason === "D" &&
            resultE.status === "rejected" &&
            resultE.reason === "E"
          ) {
            return;
          }

          throw new Error();
        })(),
        (async () => {
          const [resultF] = await Promise.allSettled([f]);
          if (resultF.status === "rejected" && resultF.reason === "F") {
            return;
          }

          throw new Error();
        })(),
      ]);

      return await createPromise("G");
    })();

    await Promise.all([a, b, c, d, e, f, g]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = Promise.all([a, b]).then(() => createPromise("C"));
    const d = Promise.any([
      promiseResult(a).then((result) => {
        if (result.status === "fulfilled") {
          return;
        }

        throw new Error("");
      }),
      promiseResult(c).then((result) => {
        if (result.status === "rejected" && result.reason === "C") {
          return;
        }

        throw new Error();
      }),
    ]).then(() => createPromise("D"));
    const e = b.then(() => createPromise("E"));
    const f = Promise.any([c, e]).then(() => createPromise("F"));
    const g = Promise.any([
      Promise.allSettled([d, e]).then(([resultD, resultE]) => {
        if (
          resultD.status === "rejected" &&
          resultD.reason === "D" &&
          resultE.status === "rejected" &&
          resultE.reason === "E"
        ) {
          return;
        }

        throw new Error();
      }),
      Promise.allSettled([f]).then(([resultF]) => {
        if (resultF.status === "rejected" && resultF.reason === "F") {
          return;
        }

        throw new Error();
      }),
    ]).then(() => createPromise("G"));

    return Promise.all([a, b, c, d, e, f, g]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
