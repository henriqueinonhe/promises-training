import { useExercise } from "../../application/useExercise.js";
import { displayableExerciseVariant } from "../displayableExerciseVariant.js";
import styles from "./Header.module.scss";

export const Header = () => {
  const { exercise } = useExercise();

  const text = exercise
    ? `Exercise ${exercise.id} - ${displayableExerciseVariant(
        exercise.variant
      )}`
    : "Select an exercise";

  return (
    <>
      <header className={styles.container}>
        <h1>{text}</h1>
      </header>

      <div className={styles.spacing} />
    </>
  );
};
