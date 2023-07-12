import { MakeExercise } from "./Exercise";

export const skipExercise = (makeExercise: MakeExercise) => {
  makeExercise.skipExerciseSymbol = skipExerciseSymbol;

  return makeExercise;
};

export const skipExerciseSymbol = Symbol("skipExercise");
