import { Exercise } from "../domain/Exercise.js";
import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

type ExerciseContextValue = {
  exercise: Exercise | undefined;
  setExercise: Dispatch<SetStateAction<Exercise | undefined>>;
};

export const ExerciseContext = createContext<ExerciseContextValue | undefined>(
  undefined
);

type ExerciseProviderProps = {
  children: ReactNode;
};

export const ExerciseProvider = ({ children }: ExerciseProviderProps) => {
  const [exercise, setExercise] = useState<Exercise | undefined>(undefined);

  const value = useMemo(() => ({ exercise, setExercise }), [exercise]);

  return <ExerciseContext.Provider value={value} children={children} />;
};
