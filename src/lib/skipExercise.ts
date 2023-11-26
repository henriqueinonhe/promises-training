import { MakeExercise } from "./Exercise.js";

export const skipExercise = (makeExercise: MakeExercise) => {
  makeExercise.skipExerciseSymbol = skipExerciseSymbol;

  return makeExercise;
};

export const skipExerciseSymbol = Symbol("skipExercise");
