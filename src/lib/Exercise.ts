import { CreatePromise } from "./createPromise.js";
import { Ref } from "./ref.js";
import { skipExerciseSymbol } from "./skipExercise.js";

export type MakeExercise = {
  (context: ExerciseContext): Exercise;
  skipExerciseSymbol?: typeof skipExerciseSymbol;
};

export type ExerciseContext = {
  createPromise: CreatePromise<string>;
  ref: Ref;
};

export type Exercise = () => Promise<unknown>;
