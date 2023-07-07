import { CreatePromise } from "./createPromise";
import { Ref } from "./ref";

export type MakeExercise = (context: ExerciseContext) => Exercise;

export type ExerciseContext = {
  createPromise: CreatePromise;
  ref: Ref;
};

export type Exercise = () => Promise<void>;
