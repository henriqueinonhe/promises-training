import { random } from "lodash";

export const createPromise = (label: string) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Resolved: ${label}`);
      resolve(undefined);
    }, 300 + random(200))
  );
