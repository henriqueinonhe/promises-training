import { CreatePromise } from "./createPromise";

export type MakeExercise = (context: ExerciseContext) => Exercise;

export type ExerciseContext = {
  createPromise: CreatePromise;
};

export type Exercise = () => Promise<void>;
