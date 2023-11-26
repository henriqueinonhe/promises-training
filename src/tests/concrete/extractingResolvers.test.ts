import { describe, expect, it, vi } from "vitest";
import { Router } from "../../lib/concreteExercise/Router.js";
import { match } from "ts-pattern";
import makeExtractingResolvers from "../../exercises/concrete/extractingResolvers/exercise.js";
import { waitForPromises } from "../../lib/waitForPromises.js";

const setup = () => {
  const onRouteChangeStartHandlers: Set<() => void> = new Set();
  const onRouteChangeErrorHandlers: Set<() => void> = new Set();
  const onRouteChangeCompleteHandlers: Set<() => void> = new Set();

  const routeChangeStart = () =>
    onRouteChangeStartHandlers.forEach((handler) => handler());
  const routeChangeError = () =>
    onRouteChangeErrorHandlers.forEach((handler) => handler());
  const routeChangeComplete = () =>
    onRouteChangeCompleteHandlers.forEach((handler) => handler());

  const router: Router = {
    push: vi.fn().mockImplementation(() => {
      routeChangeStart();
    }),
    on: (event, callback) => {
      match(event)
        .with("routeChangeStart", () => {
          onRouteChangeStartHandlers.add(callback);
        })
        .with("routeChangeError", () => {
          onRouteChangeErrorHandlers.add(callback);
        })
        .with("routeChangeComplete", () => {
          onRouteChangeCompleteHandlers.add(callback);
        })
        .exhaustive();
    },
    off: (event, callback) => {
      match(event)
        .with("routeChangeStart", () => {
          onRouteChangeStartHandlers.delete(callback);
        })
        .with("routeChangeError", () => {
          onRouteChangeErrorHandlers.delete(callback);
        })
        .with("routeChangeComplete", () => {
          onRouteChangeCompleteHandlers.delete(callback);
        })
        .exhaustive();
    },
  };

  const extractingResolvers = makeExtractingResolvers({
    router,
  });

  const url = "/some-url";

  const promiseStatusRef = { status: "pending" };
  const promise = extractingResolvers(url)
    .then(() => {
      promiseStatusRef.status = "resolved";
    })
    .catch(() => {
      promiseStatusRef.status = "rejected";
    });

  return {
    router,
    routeChangeComplete,
    routeChangeError,
    url,
    promise,
    promiseStatusRef,
    onRouteChangeStartHandlers,
    onRouteChangeCompleteHandlers,
    onRouteChangeErrorHandlers,
  };
};

describe("When route change starts", () => {
  const secondSetup = async () => {
    const setupReturnValue = setup();
    await waitForPromises();

    return setupReturnValue;
  };

  it("Push is called with the url", async () => {
    const { router, url } = await secondSetup();

    expect(router.push).toHaveBeenCalledWith(url);
  });

  it("Doesn't resolve promise yet", async () => {
    const { promiseStatusRef } = await secondSetup();

    expect(promiseStatusRef.status).toBe("pending");
  });

  describe("And route change completes", () => {
    const thirdSetup = async () => {
      const setupReturnValue = await secondSetup();
      const { routeChangeComplete } = setupReturnValue;

      routeChangeComplete();
      await waitForPromises();

      return setupReturnValue;
    };

    it("Resolves promise", async () => {
      const { promiseStatusRef } = await thirdSetup();

      expect(promiseStatusRef.status).toBe("resolved");
    });

    it("Callbacks are removed", async () => {
      const { onRouteChangeStartHandlers, onRouteChangeCompleteHandlers } =
        await thirdSetup();

      expect(onRouteChangeStartHandlers.size).toBe(0);
      expect(onRouteChangeCompleteHandlers.size).toBe(0);
    });
  });

  describe("And route change errors", () => {
    const thirdSetup = async () => {
      const setupReturnValue = await secondSetup();
      const { routeChangeError } = setupReturnValue;

      routeChangeError();
      await waitForPromises();

      return setupReturnValue;
    };

    it("Rejects promise", async () => {
      const { promiseStatusRef } = await thirdSetup();

      expect(promiseStatusRef.status).toBe("rejected");
    });

    it("Callbacks are removed", async () => {
      const { onRouteChangeStartHandlers, onRouteChangeErrorHandlers } =
        await thirdSetup();

      expect(onRouteChangeStartHandlers.size).toBe(0);
      expect(onRouteChangeErrorHandlers.size).toBe(0);
    });
  });
});
