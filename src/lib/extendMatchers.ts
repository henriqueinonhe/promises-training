import { expect } from "vitest";
import { difference } from "lodash";
import {
  GraphExerciseFirstStep,
  GraphExerciseFollowingStep,
  GraphExerciseStep,
  isGraphExerciseFirstStep,
} from "./graphExercise/graphExerciseStep";

type ToHaveBeenCreatedAtStepParams = {
  steps: [GraphExerciseFirstStep, ...Array<GraphExerciseFollowingStep>];
  currentStep: GraphExerciseStep;
  stepIndex: number;
};

interface CustomMatchers<R = unknown> {
  toHaveBeenCreatedAtStep(
    promisesCreatedLabels: Array<string>,
    params: ToHaveBeenCreatedAtStepParams
  ): R;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

export const extendMatchers = () => {
  expect.extend({
    toHaveBeenCreatedAtStep: function (
      actual,
      expected,
      { currentStep, stepIndex, steps }: ToHaveBeenCreatedAtStepParams
    ) {
      const {
        BOLD_WEIGHT: bold,
        DIM_COLOR: dimColor,
        EXPECTED_COLOR: expectedColor,
        INVERTED_COLOR: invertedColor,
        RECEIVED_COLOR: receivedColor,
      } = this.utils;

      const pass = difference(expected, actual).length === 0;

      const formattedExpectedPromises = formatPromiseList(expected, bold);
      const formattedReceivedPromises = formatPromiseList(actual, bold);
      const baseMessage = [
        expectedColor(`${formattedExpectedPromises} to have been created, but`),
        receivedColor(
          `${formattedReceivedPromises} ${wasWere(
            actual.length
          )} created instead.`
        ),
      ].join("\n");

      if (isGraphExerciseFirstStep(currentStep)) {
        const message = () =>
          [`When the exercise started, we expected`, baseMessage].join("\n");

        return {
          pass,
          message,
        };
      }

      const [, ...followingSteps] = steps;
      const stepsSegment = formatStepsSegment({
        bold,
        invertedColor,
        stepIndex,
        steps: followingSteps,
      });
      // To account for the first step
      const followingStepNumber = stepIndex;

      const message = () =>
        [
          `At step ${followingStepNumber} (${stepsSegment}) we expected`,
          baseMessage,
        ].join("\n");

      return {
        pass,
        message,
      };
    },
  });
};

const formatPromiseList = (
  list: Array<string>,
  bold: (string: string) => string
) => {
  if (list.length === 0) {
    return bold("no promises");
  }

  return `${promisePromises(list.length)} ${bold(list.join(", "))}`;
};

const wasWere = (length: number) => {
  if (length === 1) {
    return "was";
  }

  return "were";
};

const promisePromises = (length: number) => {
  if (length === 1) {
    return "promise";
  }

  return "promises";
};

type StepsSegmentParams = {
  steps: Array<GraphExerciseFollowingStep>;
  stepIndex: number;
  invertedColor: (string: string) => string;
  bold: (string: string) => string;
};

const formatStepsSegment = ({
  bold,
  invertedColor,
  stepIndex,
  steps,
}: StepsSegmentParams) => {
  const stepsSegment = steps
    .map((step, index) => {
      const baseString = step.resolved ? step.resolved : `!${step.rejected}`;

      if (index === stepIndex - 1) {
        return invertedColor(bold(baseString));
      }

      return baseString;
    })
    .join(" -> ");

  return stepsSegment;
};
