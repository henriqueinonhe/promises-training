import { GraphExerciseStepSequence } from "./GraphExerciseStep.js";

export type Fiber = RunningFiber | HaltedFiber;

export type BaseFiber = {
  steps: GraphExerciseStepSequence;
};

export type RunningFiber = BaseFiber & {
  nextLabel: string;
};

export type HaltedFiber = BaseFiber & {
  nextLabel: undefined;
};

export const isRunningFiber = (fiber: Fiber): fiber is RunningFiber => {
  return fiber.nextLabel !== undefined;
};

export const isHaltedFiber = (fiber: Fiber): fiber is HaltedFiber => {
  return fiber.nextLabel === undefined;
};
