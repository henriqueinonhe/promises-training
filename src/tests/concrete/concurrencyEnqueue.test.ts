import { describe, expect, it, vi } from "vitest";
import makeConcurrencyEnqueue from "../../exercises/concrete/concurrencyEnqueue/exercise.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

const setup = () => {
  const resolvers: Array<() => void> = [];
  const postData = vi.fn().mockImplementation(() => {
    return new Promise<void>((resolve) => {
      resolvers.push(resolve);
    });
  });

  const concurrencyEnqueue = makeConcurrencyEnqueue({
    postData,
  });

  return {
    concurrencyEnqueue,
    postData,
    resolvers,
  };
};

describe("When it's the first time the function is called", () => {
  const secondSetup = async () => {
    const setupReturnValue = setup();
    const { concurrencyEnqueue } = setupReturnValue;

    const data = "data";
    const promise = concurrencyEnqueue(data);
    await waitForPromises();

    return {
      ...setupReturnValue,
      promise,
      data,
    };
  };

  it("Calls postData once", async () => {
    const { postData, data } = await secondSetup();

    expect(postData).toHaveBeenCalledTimes(1);
    expect(postData).toHaveBeenCalledWith(data);
  });

  describe("And first postData call resolves", () => {
    const thirdSetup = async () => {
      const setupReturnValue = await secondSetup();
      const { resolvers, promise } = setupReturnValue;

      resolvers[0]();

      return {
        ...setupReturnValue,
        promise,
      };
    };

    it("Resolves", async () => {
      const { promise } = await thirdSetup();

      await expect(promise).resolves.toBeUndefined();
    });
  });
});

describe("When the function is called three times in a row", () => {
  const secondSetup = async () => {
    const setupReturnValue = setup();
    const { concurrencyEnqueue } = setupReturnValue;

    const firstData = "firstData";
    const secondData = "secondData";
    const thirdData = "thirdData";

    const firstPromiseStatusRef = { current: "pending" };
    const secondPromiseStatusRef = { current: "pending" };
    const thirdPromiseStatusRef = { current: "pending" };

    const firstPromise = concurrencyEnqueue(firstData).then(() => {
      firstPromiseStatusRef.current = "resolved";
    });
    const secondPromise = concurrencyEnqueue(secondData).then(() => {
      secondPromiseStatusRef.current = "resolved";
    });
    const thirdPromise = concurrencyEnqueue(thirdData).then(() => {
      thirdPromiseStatusRef.current = "resolved";
    });

    await waitForPromises();

    return {
      ...setupReturnValue,
      firstPromise,
      secondPromise,
      thirdPromise,
      firstData,
      secondData,
      thirdData,
      firstPromiseStatusRef,
      secondPromiseStatusRef,
      thirdPromiseStatusRef,
    };
  };

  it("Calls postData once", async () => {
    const { postData, firstData } = await secondSetup();

    expect(postData).toHaveBeenCalledTimes(1);
    expect(postData).toHaveBeenCalledWith(firstData);
  });

  it("First promise is pending", async () => {
    const { firstPromiseStatusRef } = await secondSetup();

    expect(firstPromiseStatusRef.current).toBe("pending");
  });

  it("Second promise is pending", async () => {
    const { secondPromiseStatusRef } = await secondSetup();

    expect(secondPromiseStatusRef.current).toBe("pending");
  });

  it("Third promise is pending", async () => {
    const { thirdPromiseStatusRef } = await secondSetup();

    expect(thirdPromiseStatusRef.current).toBe("pending");
  });

  describe("And first postData call resolves", () => {
    const thirdSetup = async () => {
      const setupReturnValue = await secondSetup();
      const { resolvers, firstPromise } = setupReturnValue;

      resolvers[0]();
      await waitForPromises();

      return {
        ...setupReturnValue,
        firstPromise,
      };
    };

    it("postData is called a second time", async () => {
      const { postData, secondData } = await thirdSetup();

      expect(postData).toHaveBeenCalledTimes(2);
      expect(postData).toHaveBeenCalledWith(secondData);
    });

    it("Resolves the first promise", async () => {
      const { firstPromiseStatusRef } = await thirdSetup();

      expect(firstPromiseStatusRef.current).toBe("resolved");
    });

    it("Second promise is pending", async () => {
      const { secondPromiseStatusRef } = await thirdSetup();

      expect(secondPromiseStatusRef.current).toBe("pending");
    });

    it("Third promise is pending", async () => {
      const { thirdPromiseStatusRef } = await thirdSetup();

      expect(thirdPromiseStatusRef.current).toBe("pending");
    });

    describe("And second postData call resolves", () => {
      const fourthSetup = async () => {
        const setupReturnValue = await thirdSetup();
        const { resolvers } = setupReturnValue;

        resolvers[1]();
        await waitForPromises();

        return {
          ...setupReturnValue,
        };
      };

      it("postData is called a third time", async () => {
        const { postData, thirdData } = await fourthSetup();

        expect(postData).toHaveBeenCalledTimes(3);
        expect(postData).toHaveBeenCalledWith(thirdData);
      });

      it("Resolves the second promise", async () => {
        const { secondPromiseStatusRef } = await fourthSetup();

        expect(secondPromiseStatusRef.current).toBe("resolved");
      });

      it("Third promise is pending", async () => {
        const { thirdPromiseStatusRef } = await fourthSetup();

        expect(thirdPromiseStatusRef.current).toBe("pending");
      });

      describe("And third postData call resolves", () => {
        const fifthSetup = async () => {
          const setupReturnValue = await fourthSetup();
          const { resolvers } = setupReturnValue;

          resolvers[2]();
          await waitForPromises();

          return {
            ...setupReturnValue,
          };
        };

        it("Resolves the third promise", async () => {
          const { thirdPromiseStatusRef } = await fifthSetup();

          expect(thirdPromiseStatusRef.current).toBe("resolved");
        });
      });
    });
  });
});
