import { describe, it, expect, vi } from "vitest";
import MyPromise from "../../exercises/foundation/promise/exercise.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

type SetupParams = {};

const setup = ({}: SetupParams) => {
  let resolver: (value: number) => void;
  let rejecter: (reason: unknown) => void;

  const executor = vi.fn().mockImplementation((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });
  const promise = new MyPromise<number>(executor);

  return {
    promise,
    executor,
    resolver: resolver!,
    rejecter: rejecter!,
  };
};

describe("When promise is created", () => {
  const secondSetup = () => setup({});

  it("Calls executor synchronously (immediately) once", () => {
    const { executor } = secondSetup();

    expect(executor).toHaveBeenCalledOnce();
  });
});

describe("When calling `.then`", () => {
  type SecondSetupParams = {
    outcome: "fulfilled" | "rejected" | "pending";
    resolvedValue?: number;
    rejectedReason?: unknown;
  };

  const secondSetup = async ({
    outcome,
    rejectedReason = "Error",
    resolvedValue = 10,
  }: SecondSetupParams) => {
    const { promise, rejecter, resolver } = setup({});

    const onFulfilled = vi.fn().mockReturnValue(20);
    const onRejected = vi.fn().mockReturnValue("Error");

    if (outcome === "fulfilled") {
      resolver(resolvedValue);
    }

    if (outcome === "rejected") {
      rejecter(rejectedReason);
    }

    await waitForPromises();
    const nextPromise = promise.then(onFulfilled, onRejected);

    return {
      promise,
      nextPromise,
      onFulfilled,
      onRejected,
      resolvedValue,
      rejectedReason,
    };
  };

  it("Returns a new promise that is different from the original", async () => {
    const { nextPromise, promise } = await secondSetup({
      outcome: "pending",
    });

    expect(nextPromise).not.toBe(promise);
  });

  describe("And the promise didn't finish yet", () => {
    const thirdSetup = () => secondSetup({ outcome: "pending" });

    it("`.then` handlers do not get called", async () => {
      const { onFulfilled, onRejected } = await thirdSetup();

      expect(onFulfilled).not.toHaveBeenCalled();
      expect(onRejected).not.toHaveBeenCalled();
    });
  });

  describe("And the promise is already fulfilled", () => {
    const thirdSetup = () => secondSetup({ outcome: "fulfilled" });

    it("`.then` onFulfilled gets called with resolved value", async () => {
      const { onFulfilled, resolvedValue } = await thirdSetup();

      expect(onFulfilled).toHaveBeenCalledTimes(1);
      expect(onFulfilled).toHaveBeenCalledWith(resolvedValue);
    });

    it("`.then` onRejected does not get called", async () => {
      const { onRejected } = await thirdSetup();

      expect(onRejected).not.toHaveBeenCalled();
    });

    it("New promise resolves to the result of onFulfilled", () =>
      new Promise(async (done) => {
        const { nextPromise, onFulfilled, resolvedValue } = await thirdSetup();

        nextPromise.then((value) => {
          expect(value).toBe(onFulfilled(resolvedValue));
          done(undefined);
        });
      }));
  });

  describe("And the promise is already rejected", () => {
    const thirdSetup = () => secondSetup({ outcome: "rejected" });

    it("`.then` onRejected gets called", async () => {
      const { onRejected, rejectedReason } = await thirdSetup();

      expect(onRejected).toHaveBeenCalledTimes(1);
      expect(onRejected).toHaveBeenCalledWith(rejectedReason);
    });

    it("`.then` onFulfilled does not get called", async () => {
      const { onFulfilled } = await thirdSetup();

      expect(onFulfilled).not.toHaveBeenCalled();
    });

    it("New promise resolves to the result of onRejected", () =>
      new Promise(async (done) => {
        const { nextPromise, onRejected, rejectedReason } = await thirdSetup();

        nextPromise.then((value) => {
          expect(value).toBe(onRejected(rejectedReason));
          done(undefined);
        });
      }));
  });
});

describe("When there are promises created with `.then`", () => {
  type SecondSetupParams = {
    outcome: "fulfilled" | "rejected" | "pending";
    resolvedValue?: number;
    rejectedReason?: unknown;
  };

  const secondSetup = async ({
    outcome,
    rejectedReason = "Error",
    resolvedValue = 10,
  }: SecondSetupParams) => {
    const { promise, rejecter, resolver } = setup({});

    const onFulfilled1 = vi.fn().mockReturnValue(20);
    const onRejected1 = vi.fn().mockReturnValue("Error1");
    const nextPromise1 = promise.then(onFulfilled1, onRejected1);

    const onFulfilled2 = vi.fn().mockReturnValue(30);
    const onRejected2 = vi.fn().mockReturnValue("Error2");
    const nextPromise2 = promise.then(onFulfilled2, onRejected2);

    const onFulfilled3 = vi.fn().mockReturnValue(40);
    const onRejected3 = vi.fn().mockReturnValue("Error3");
    const nextPromise3 = promise.then(onFulfilled3, onRejected3);

    if (outcome === "fulfilled") {
      resolver(resolvedValue);
    }

    if (outcome === "rejected") {
      rejecter(rejectedReason);
    }

    await waitForPromises();

    return {
      resolver,
      rejecter,
      promise,
      resolvedValue,
      rejectedReason,
      onFulfilled1,
      onRejected1,
      nextPromise1,
      onFulfilled2,
      onRejected2,
      nextPromise2,
      onFulfilled3,
      onRejected3,
      nextPromise3,
    };
  };

  describe("And promise has fulfilled", () => {
    const thirdSetup = () =>
      secondSetup({
        outcome: "fulfilled",
      });

    it("Calls all onFulfilled handlers that were passed to `.then` calls with resolved value", async () => {
      const { onFulfilled1, onFulfilled2, onFulfilled3, resolvedValue } =
        await thirdSetup();

      expect(onFulfilled1).toHaveBeenCalledOnce();
      expect(onFulfilled1).toHaveBeenCalledWith(resolvedValue);
      expect(onFulfilled2).toHaveBeenCalledOnce();
      expect(onFulfilled2).toHaveBeenCalledWith(resolvedValue);
      expect(onFulfilled3).toHaveBeenCalledOnce();
      expect(onFulfilled3).toHaveBeenCalledWith(resolvedValue);
    });

    it("Created promises resolve to the value returned by onFulfilled", () =>
      new Promise(async (done) => {
        const {
          nextPromise1,
          nextPromise2,
          nextPromise3,
          resolvedValue,
          onFulfilled1,
          onFulfilled2,
          onFulfilled3,
        } = await thirdSetup();

        let resolvedCount = 0;

        const tryToFinish = () => {
          resolvedCount++;

          if (resolvedCount === 3) {
            done(undefined);
          }
        };

        nextPromise1.then((value) => {
          expect(value).toBe(onFulfilled1(resolvedValue));
          tryToFinish();
        });

        nextPromise2.then((value) => {
          expect(value).toBe(onFulfilled2(resolvedValue));
          tryToFinish();
        });

        nextPromise3.then((value) => {
          expect(value).toBe(onFulfilled3(resolvedValue));
          tryToFinish();
        });
      }));

    describe("And then it tries to be fulfilled once again (calling resolve more than once)", () => {
      const fourthSetup = async () => {
        const thirdSetupReturnValue = await thirdSetup();

        const { resolver } = thirdSetupReturnValue;

        resolver(300);
        await waitForPromises();

        return thirdSetupReturnValue;
      };

      it("Handlers are not called again", async () => {
        const {
          onFulfilled1,
          onFulfilled2,
          onFulfilled3,
          onRejected1,
          onRejected2,
          onRejected3,
        } = await fourthSetup();

        expect(onFulfilled1).toHaveBeenCalledOnce();
        expect(onFulfilled2).toHaveBeenCalledOnce();
        expect(onFulfilled3).toHaveBeenCalledOnce();
        expect(onRejected1).not.toHaveBeenCalled();
        expect(onRejected2).not.toHaveBeenCalled();
        expect(onRejected3).not.toHaveBeenCalled();
      });
    });

    describe("And then it tries to be rejected", () => {
      const fourthSetup = async () => {
        const thirdSetupReturnValue = await thirdSetup();

        const { rejecter } = thirdSetupReturnValue;

        rejecter(300);
        await waitForPromises();

        return thirdSetupReturnValue;
      };

      it("Handlers are not called again", async () => {
        const {
          onFulfilled1,
          onFulfilled2,
          onFulfilled3,
          onRejected1,
          onRejected2,
          onRejected3,
        } = await fourthSetup();

        expect(onFulfilled1).toHaveBeenCalledOnce();
        expect(onFulfilled2).toHaveBeenCalledOnce();
        expect(onFulfilled3).toHaveBeenCalledOnce();
        expect(onRejected1).not.toHaveBeenCalled();
        expect(onRejected2).not.toHaveBeenCalled();
        expect(onRejected3).not.toHaveBeenCalled();
      });
    });
  });

  describe("And promise has rejected", () => {
    const thirdSetup = async () => {
      const secondSetupReturnValue = await secondSetup({
        outcome: "rejected",
      });

      const { promise } = secondSetupReturnValue;

      const nextPromiseWithoutRejectHandlerOnFulfilled = vi.fn();
      const nextPromiseWithoutRejectHandler = promise.then(
        nextPromiseWithoutRejectHandlerOnFulfilled
      );

      return {
        ...secondSetupReturnValue,
        nextPromiseWithoutRejectHandlerOnFulfilled,
        nextPromiseWithoutRejectHandler,
      };
    };

    it("Created promises resolve to the value returned by onRejected when it is defined and reject to the original promise rejected reason when undefined", () =>
      new Promise(async (done) => {
        const {
          nextPromise1,
          nextPromise2,
          nextPromise3,
          nextPromiseWithoutRejectHandler,
          rejectedReason,
          onRejected1,
          onRejected2,
          onRejected3,
          nextPromiseWithoutRejectHandlerOnFulfilled,
        } = await thirdSetup();

        let finishedCount = 0;
        const tryToFinish = () => {
          finishedCount++;

          if (finishedCount === 4) {
            done(undefined);
          }
        };

        nextPromise1.then((value) => {
          expect(value).toBe(onRejected1(value));
          tryToFinish();
        });

        nextPromise2.then((value) => {
          expect(value).toBe(onRejected2(value));
          tryToFinish();
        });

        nextPromise3.then((value) => {
          expect(value).toBe(onRejected3(value));
          tryToFinish();
        });

        nextPromiseWithoutRejectHandler.catch((reason) => {
          expect(reason).toBe(rejectedReason);
          tryToFinish();
        });

        expect(
          nextPromiseWithoutRejectHandlerOnFulfilled
        ).not.toHaveBeenCalled();
      }));

    describe("And then it tries to be fulfilled once again (calling resolve more than once)", () => {
      it("Handlers are not called again", async () => {
        const {
          onFulfilled1,
          onFulfilled2,
          onFulfilled3,
          onRejected1,
          onRejected2,
          onRejected3,
          resolver,
        } = await thirdSetup();

        resolver(300);
        await waitForPromises();

        expect(onFulfilled1).not.toHaveBeenCalled();
        expect(onFulfilled2).not.toHaveBeenCalled();
        expect(onFulfilled3).not.toHaveBeenCalled();
        expect(onRejected1).toHaveBeenCalledOnce();
        expect(onRejected2).toHaveBeenCalledOnce();
        expect(onRejected3).toHaveBeenCalledOnce();
      });
    });

    describe("And then it tries to be rejected", () => {
      it("Handlers are not called again", async () => {
        const {
          onFulfilled1,
          onFulfilled2,
          onFulfilled3,
          onRejected1,
          onRejected2,
          onRejected3,
          rejecter,
        } = await thirdSetup();

        rejecter(300);
        await waitForPromises();

        expect(onFulfilled1).not.toHaveBeenCalled();
        expect(onFulfilled2).not.toHaveBeenCalled();
        expect(onFulfilled3).not.toHaveBeenCalled();
        expect(onRejected1).toHaveBeenCalledOnce();
        expect(onRejected2).toHaveBeenCalledOnce();
        expect(onRejected3).toHaveBeenCalledOnce();
      });
    });
  });
});

describe("`.then` is called with an onFulfilled/onRejected that returns a promise", () => {
  type SecondSetupParams = {
    outcome: "fulfilled" | "rejected" | "pending";
    nextPromiseOutcome: "fulfilled" | "rejected";
  };

  const secondSetup = ({ outcome, nextPromiseOutcome }: SecondSetupParams) => {
    const setupReturnValue = setup({});

    const { promise, rejecter, resolver } = setupReturnValue;

    const resolvedValue = 10;
    const rejectedReason = "Error";

    if (outcome === "fulfilled") {
      resolver(resolvedValue);
    }

    if (outcome === "rejected") {
      rejecter(rejectedReason);
    }

    const onFulfilledResolvedValue = 20;
    const onFulfilledRejectedReason = "Error2";
    const onFulfilled = () =>
      nextPromiseOutcome === "fulfilled"
        ? MyPromise.resolve(20)
        : MyPromise.reject<number>("Error2");

    const onRejectedResolvedValue = 30;
    const onRejectedRejectedReason = "Error3";
    const onRejected = () =>
      nextPromiseOutcome === "fulfilled"
        ? MyPromise.resolve(30)
        : MyPromise.reject("Error3");

    const nextPromise = promise.then(onFulfilled, onRejected);

    return {
      ...setupReturnValue,
      resolvedValue,
      rejectedReason,
      nextPromise,
      onFulfilled,
      onRejected,
      onFulfilledResolvedValue,
      onFulfilledRejectedReason,
      onRejectedResolvedValue,
      onRejectedRejectedReason,
    };
  };

  describe("And the initial promise fulfills", () => {
    type ThirdSetupParams = {
      nextPromiseOutcome: "fulfilled" | "rejected";
    };

    const thirdSetup = ({ nextPromiseOutcome }: ThirdSetupParams) =>
      secondSetup({ outcome: "fulfilled", nextPromiseOutcome });

    describe("And the promise returned by onFulfilled fulfills", () => {
      const fourthSetup = () => thirdSetup({ nextPromiseOutcome: "fulfilled" });

      it("The new promise created by `.then` resolves with the onFulfilled's promise resolved value", () =>
        new Promise((done) => {
          const { nextPromise, onFulfilledResolvedValue } = fourthSetup();

          nextPromise.then((value) => {
            expect(value).toBe(onFulfilledResolvedValue);
            done(undefined);
          });
        }));
    });

    describe("And the promise returned by onFulfilled rejects", () => {
      const fourthSetup = () => thirdSetup({ nextPromiseOutcome: "rejected" });

      it("The new promise created by `.then` reject with the onFulfilled's promise reject reason", () =>
        new Promise((done) => {
          const { nextPromise, onFulfilledRejectedReason } = fourthSetup();

          nextPromise.then(
            () => {
              // No op, not gonna be called anyways
            },
            (reason) => {
              expect(reason).toBe(onFulfilledRejectedReason);
              done(undefined);
            }
          );
        }));
    });
  });

  describe("And the initial promise rejects", () => {
    type ThirdSetupParams = {
      nextPromiseOutcome: "fulfilled" | "rejected";
    };

    const thirdSetup = ({ nextPromiseOutcome }: ThirdSetupParams) =>
      secondSetup({ outcome: "rejected", nextPromiseOutcome });

    describe("And the promise returned by onRejected fulfills", () => {
      const fourthSetup = () => thirdSetup({ nextPromiseOutcome: "fulfilled" });

      it("The new promise created by `.then` resolves with the onRejected's promise resolved value", () =>
        new Promise((done) => {
          const { nextPromise, onRejectedResolvedValue } = fourthSetup();

          nextPromise.then((value) => {
            expect(value).toBe(onRejectedResolvedValue);
          });
          done(undefined);
        }));
    });

    describe("And the promise returned by onRejected rejects", () => {
      const fourthSetup = () => thirdSetup({ nextPromiseOutcome: "rejected" });

      it("The new promise created by `.then` reject with the onRejected's promise reject reason", () =>
        new Promise((done) => {
          const { nextPromise, onRejectedRejectedReason } = fourthSetup();

          nextPromise.then(
            () => {
              // No op, not gonna be called anyways
            },
            (reason) => {
              expect(reason).toBe(onRejectedRejectedReason);
            }
          );
          done(undefined);
        }));
    });
  });
});

describe("When promise resolves synchronously", () => {
  const secondSetup = () => {
    const { promise, resolver } = setup({});

    const onFulfilled = vi.fn();
    promise.then(onFulfilled);

    resolver(10);

    return {
      onFulfilled,
    };
  };

  it("onFulfilled DOES NOT get called synchronously", () => {
    const { onFulfilled } = secondSetup();

    expect(onFulfilled).not.toHaveBeenCalled();
  });
});

describe("When we attach handlers to a promise that has already settled", () => {
  type SecondSetupParams = {
    outcome: "fulfilled" | "rejected";
  };

  const secondSetup = async ({ outcome }: SecondSetupParams) => {
    const { promise, resolver, rejecter } = setup({});

    if (outcome === "fulfilled") {
      resolver(10);
    }

    if (outcome === "rejected") {
      rejecter("Error");
    }

    await waitForPromises();

    return {
      promise,
    };
  };

  describe("And the promise has fulfilled", () => {
    const thirdSetup = () => secondSetup({ outcome: "fulfilled" });

    it("onFulfilled handler is NOT called synchronously", async () => {
      // We have to do the setup within the it
      // block because as there is an await
      // it messes with the microtask queue
      const { promise } = await thirdSetup();

      const onFulfilled = vi.fn();
      const onRejected = vi.fn();

      promise.then(onFulfilled, onRejected);

      expect(onFulfilled).not.toHaveBeenCalled();

      await waitForPromises();

      expect(onFulfilled).toHaveBeenCalled();
    });
  });

  describe("And the promise has rejected", () => {
    const thirdSetup = () => secondSetup({ outcome: "rejected" });

    it("onRejected handler is NOT called synchronously", async () => {
      // We have to do the setup within the it
      // block because as there is an await
      // it messes with the microtask queue
      const { promise } = await thirdSetup();

      const onFulfilled = vi.fn();
      const onRejected = vi.fn();

      promise.then(onFulfilled, onRejected);

      expect(onRejected).not.toHaveBeenCalled();

      await waitForPromises();

      expect(onRejected).toHaveBeenCalled();
    });
  });
});
