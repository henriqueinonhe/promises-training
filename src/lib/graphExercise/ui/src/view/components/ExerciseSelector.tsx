import { useExercise } from "../../application/useExercise.js";
import { exerciseIds } from "../../domain/Exercise.js";
import styles from "./ExerciseSelector.module.scss";

export const ExerciseSelector = () => {
  const { selectExercise, exercise } = useExercise();

  return (
    <nav className={styles.container}>
      <h2>Exercises</h2>

      <ul>
        {exerciseIds.map((exerciseId) => (
          <li key={exerciseId}>
            <button
              className={styles.button}
              onClick={() => selectExercise(exerciseId)}
            >
              {exerciseId}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
