import { useExercise } from "../../application/useExercise";
import { ExerciseFollowingRecord } from "../../domain/ExerciseRecord";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const { exercise } = useExercise();

  if (!exercise) {
    return null;
  }

  const records = exercise.records;
  const followingRecords = records.slice(1) as Array<ExerciseFollowingRecord>;
  const stepSequence = followingRecords
    .map((record) => {
      if (record.resolved) {
        return record.resolved;
      }

      return `!${record.rejected!}`;
    })
    .join(" -> ");

  return <footer className={styles.container}>{stepSequence}</footer>;
};
