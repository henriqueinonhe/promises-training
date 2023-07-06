import { MakeExercise } from "./Exercise";
import { makeCreatePromise } from "./createPromise";
import { it, expect } from "vitest";
import { PromiseManager, createPromiseManager } from "./PromiseManager";
import { difference } from "lodash";

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

  return `${label} - ${stepsSegment.join(" -> ")}`;
};

type MakeCaseDependencies = {
  makeExercise: MakeExercise;
};

export type Step = FirstStep | FollowingStep;

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

export const isFirstStep = (step: Step): step is FirstStep =>
  step?.rejected === undefined && step?.resolved === undefined;

type TestFirstStepParams = {
  firstStep: FirstStep;
  steps: Array<Step>;
  promiseManager: PromiseManager;
};

const testFirstStep = ({
  firstStep,
  promiseManager,
  steps,
}: TestFirstStepParams) => {
  const promisesExpectedToBeCreatedLabels = [...firstStep.created];
  const promisesThatWereActuallyCreatedLabels = promiseManager.keys();

  expect(promisesThatWereActuallyCreatedLabels).toHaveBeenCreatedAtStep(
    promisesExpectedToBeCreatedLabels,
    { currentStep: firstStep, stepIndex: 0, steps }
  );

  return {
    promisesCreatedAtFirstStepLabels: promisesThatWereActuallyCreatedLabels,
  };
};

type TestFollowingStepParams = {
  followingStep: FollowingStep;
  promiseManager: PromiseManager;
  promisesCreatedSoFarLabels: Array<string>;
  stepIndex: number;
  steps: Array<Step>;
};

const testFollowingStep = async ({
  followingStep,
  promiseManager,
  promisesCreatedSoFarLabels,
  stepIndex,
  steps,
}: TestFollowingStepParams) => {
  const { created, resolved, rejected } = followingStep;

  if (resolved !== undefined) {
    promiseManager.resolve(resolved);
  } else if (rejected !== undefined) {
    promiseManager.reject(rejected);
  }

  // Make sure all promises callbacks (microtasks)
  // have been dealt with
  await new Promise((resolve) => setTimeout(resolve, 0));

  const promisesExpectedToBeCreatedLabels = [...created];
  const promisesThatWereActuallyCreatedLabels = difference(
    promiseManager.keys(),
    promisesCreatedSoFarLabels
  );

  expect(promisesThatWereActuallyCreatedLabels).toHaveBeenCreatedAtStep(
    promisesExpectedToBeCreatedLabels,
    {
      currentStep: followingStep,
      stepIndex,
      steps,
    }
  );

  return {
    promisesCreatedAtFollowingStepLabels: promisesThatWereActuallyCreatedLabels,
  };
};

export const makeTestCase =
  ({ makeExercise }: MakeCaseDependencies) =>
  (label: string, steps: [FirstStep, ...Array<FollowingStep>]) =>
    it.concurrent(testDescription(label, steps), async () => {
      const { exercise, promiseManager } = setup({ makeExercise });

      const exercisePromise = exercise();

      const [firstStep, ...followingSteps] = steps;

      const promisesThatWereActuallyCreatedLabels = [];

      const { promisesCreatedAtFirstStepLabels } = testFirstStep({
        firstStep,
        promiseManager,
        steps,
      });

      promisesThatWereActuallyCreatedLabels.push(
        ...promisesCreatedAtFirstStepLabels
      );

      let stepIndex = 1;
      for (const step of followingSteps) {
        const { promisesCreatedAtFollowingStepLabels } =
          await testFollowingStep({
            followingStep: step,
            promiseManager,
            promisesCreatedSoFarLabels: promisesThatWereActuallyCreatedLabels,
            stepIndex,
            steps,
          });

        promisesThatWereActuallyCreatedLabels.push(
          ...promisesCreatedAtFollowingStepLabels
        );

        stepIndex++;
      }

      // Making sure there are no pending promises
      await exercisePromise;

      // Making sure we didn't create any more promises
      const promisesCreatedAfterExerciseFinished = difference(
        promiseManager.keys(),
        promisesThatWereActuallyCreatedLabels
      );
      // expect(promisesCreatedAfterExerciseFinished).toHaveBeenCreatedAtStep([]);
    });
