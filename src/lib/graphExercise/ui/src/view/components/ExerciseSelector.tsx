import { useExercise } from "../../application/useExercise.js";
import { exerciseIds } from "../../domain/Exercise.js";
import styles from "./ExerciseSelector.module.scss";

export const ExerciseSelector = () => {
  const { selectExercise, exercise } = useExercise();

  return (
    <nav className={styles.container}>
      <ol className={styles.list}>
        {exerciseIds.map((exerciseId) => (
          <ExerciseItem
            key={exerciseId}
            exerciseId={exerciseId}
            selectExercise={selectExercise}
            isActive={exerciseId === exercise?.id}
          />
        ))}
      </ol>
    </nav>
  );
};

type ExerciseItemProps = {
  exerciseId: string;
  selectExercise: (id: string) => void;
  isActive: boolean;
};

export const ExerciseItem = ({
  exerciseId,
  selectExercise,
  isActive,
}: ExerciseItemProps) => {
  return (
    <li key={exerciseId}>
      <button
        className={`${styles.button} ${isActive ? styles.active : ""}`}
        onClick={() => selectExercise(exerciseId)}
      >
        <span className={styles.circle}></span>
        <p>Exercise - {exerciseId}</p>
      </button>
    </li>
  );
};
