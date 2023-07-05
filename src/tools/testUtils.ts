import { MakeExercise } from "./Exercise";
import { makeCreatePromise } from "./createPromise";
import { it, expect } from "vitest";
import { createPromiseManager } from "./PromiseManager";

type SetupParams = {
  makeExercise: MakeExercise;
};

const setup = ({ makeExercise }: SetupParams) => {
  const promiseManager = createPromiseManager();
  const createPromise = makeCreatePromise({ promiseManager });
  const exercise = makeExercise({ createPromise });

  return { exercise, promiseManager };
};

const testDescription = (label: string, steps: Array<Step>) => {
  const stepsSegment = steps
    .map(({ rejected, resolved }) => {
      if (resolved !== undefined) {
        return resolved;
      }

      if (rejected !== undefined) {
        return `!${rejected}`;
      }

      return undefined;
    })
    .filter(Boolean);

  return `${label} - [${stepsSegment.join(", ")}]`;
};

type MakeCaseDependencies = {
  makeExercise: MakeExercise;
};

type Step = FirstStep | FollowingStep;

type FirstStep = {
  created: Array<string>;
  resolved?: never;
  rejected?: never;
};

type FollowingStep = {
  created: Array<string>;
} & (
  | { resolved: string; rejected?: undefined }
  | { resolved?: undefined; rejected: string }
);

export const makeTestCase =
  ({ makeExercise }: MakeCaseDependencies) =>
  (label: string, steps: [FirstStep, ...Array<FollowingStep>]) =>
    it.concurrent(testDescription(label, steps), async () => {
      const { exercise, promiseManager } = setup({ makeExercise });

      const exercisePromise = exercise();

      const [firstStep, ...followingSteps] = steps;

      const { created } = firstStep;
      created.forEach((label) => {
        expect(promiseManager.has(label)).toBe(true);
      });

      // This way we know that we only created
      // precisely the promises we expected to create
      // and no more
      const promiseCount = promiseManager.count();
      expect(promiseCount).toBe(created.length);

      for (const step of followingSteps) {
        const promiseCount = promiseManager.count();
        const { created, resolved, rejected } = step;

        if (resolved !== undefined) {
          promiseManager.resolve(resolved);
        } else if (rejected !== undefined) {
          promiseManager.reject(rejected);
        }

        // Make sure all promises callbacks (microtasks)
        // have been dealt with
        await new Promise((resolve) => setTimeout(resolve, 0));

        created.forEach((label) => {
          expect(promiseManager.has(label)).toBe(true);
        });

        // This way we know that we only created
        // precisely the promises we expected to create
        // and no more
        const newPromiseCount = promiseManager.count();
        expect(newPromiseCount).toBe(promiseCount + created.length);
      }

      const finalPromiseCount = promiseManager.count();

      // Making sure there are no pending promises
      await exercisePromise;

      const promiseCountAfterExerciseEnded = promiseManager.count();

      // Making sure we didn't create any more promises
      expect(finalPromiseCount).toBe(promiseCountAfterExerciseEnded);
    });
