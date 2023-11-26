import { useContext } from "react";
import { ExerciseContext } from "./ExerciseProvider.js";
import { Exercise, createExercise } from "../domain/Exercise.js";
import { omit } from "lodash";

export const useExercise = () => {
  const value = useContext(ExerciseContext);

  if (!value) {
    throw new Error("useAppState must be used within a StateProvider");
  }

  const { exercise, setExercise } = value;

  const defaultVariant: Exercise["variant"] = "Mixed";

  const selectExercise = (id: string) => {
    const exercise = createExercise({ id, variant: defaultVariant });

    setExercise(exercise);
  };

  const selectVariant = (variant: Exercise["variant"]) => {
    setExercise((prev) => {
      assertExerciseIsSelected(prev);

      return createExercise({ ...prev, variant });
    });
  };

  const startExercise = () => {
    assertExerciseIsSelected(exercise);
    setExercise(exercise.run());
  };

  const resolvePromise = async (label: string) => {
    assertExerciseIsSelected(exercise);

    setExercise(await exercise.resolve(label));
  };

  const rejectPromise = async (label: string) => {
    assertExerciseIsSelected(exercise);

    setExercise(await exercise.reject(label));
  };

  const resetExercise = () => {
    setExercise((prev) => {
      assertExerciseIsSelected(prev);

      return createExercise({ id: prev.id, variant: prev.variant });
    });
  };

  const exerciseView = exercise && omit(exercise, ["run", "resolve", "reject"]);

  return {
    exercise: exerciseView,
    selectExercise,
    selectVariant,
    startExercise,
    resolvePromise,
    rejectPromise,
    resetExercise,
  };
};

function assertExerciseIsSelected(
  exercise: Exercise | undefined
): asserts exercise is Exercise {
  if (!exercise) {
    throw new Error("No exercise selected");
  }
}
