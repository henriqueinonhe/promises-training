import { Router } from "../../lib/concreteExercise/Router";

type Context = {
  router: Router;
};

export default ({ router }: Context) => {
  return async (url: string) => {
    let resolve!: () => void;
    let reject!: () => void;
    let promise!: Promise<void>;

    const routeChangeStartCallback = () => {
      promise = new Promise<void>((resolver, rejecter) => {
        resolve = resolver;
        reject = rejecter;
      });
    };

    const cleanupCallbacks = () => {
      router.off("routeChangeStart", routeChangeStartCallback);
      router.off("routeChangeError", routeChangeErrorCallback);
      router.off("routeChangeComplete", routeChangeCompleteCallback);
    };

    const routeChangeErrorCallback = () => {
      reject();

      cleanupCallbacks();
    };

    const routeChangeCompleteCallback = () => {
      resolve();

      cleanupCallbacks();
    };

    router.on("routeChangeStart", routeChangeStartCallback);
    router.on("routeChangeError", routeChangeErrorCallback);
    router.on("routeChangeComplete", routeChangeCompleteCallback);

    router.push(url);

    return promise;
  };
};
