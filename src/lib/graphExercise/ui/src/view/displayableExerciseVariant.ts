import { Exercise } from "../domain/Exercise.js";
import { match } from "ts-pattern";

export const displayableExerciseVariant = (variant: Exercise["variant"]) => {
  return match(variant)
    .with("Mixed", () => "Mixed")
    .with("AsyncAwait", () => "Async/Await")
    .with("ThenCatch", () => "Then/Catch")
    .exhaustive();
};
