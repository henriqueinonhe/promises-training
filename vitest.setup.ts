import { expect } from "vitest";
import { difference } from "lodash";
import { Step, isFirstStep } from "./src/tools/testUtils";

expect.extend({
  toHaveBeenCreated: function (actual, expected, step) {
    const pass = difference(expected, actual).length === 0;

    if (isFirstStep(step)) {
      return {
        pass,
        message: () => `In the first step `,
        actual,
        expected,
      };
    }

    return {
      pass: difference(expected, actual).length === 0,
      message: () => `TODO`,
      actual,
      expected,
    };
  },
});

interface CustomMatchers<R = unknown> {
  toHaveBeenCreated(promisesCreatedLabels: Array<string>, step: Step): R;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
