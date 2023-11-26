import { Fragment } from "react";
import { useExercise } from "../../application/useExercise.js";
import { ExerciseFollowingRecord } from "../../domain/ExerciseRecord.js";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const { exercise } = useExercise();

  if (!exercise) {
    return null;
  }

  const records = exercise.records;
  const followingRecords = records.slice(1) as Array<ExerciseFollowingRecord>;
  const formatRecord = (record: ExerciseFollowingRecord) => {
    if (record.resolved) {
      return <span className={styles.resolved}>{record.resolved}</span>;
    }

    return <span className={styles.rejected}>!{record.rejected!}</span>;
  };

  const initRecords = followingRecords.slice(0, followingRecords.length - 1);
  const lastRecord = followingRecords[followingRecords.length - 1];

  return (
    <>
      <footer className={styles.container}>
        {initRecords.map((record) => (
          <Fragment key={record.rejected ?? record.resolved}>
            {formatRecord(record)}
            &nbsp;{`→`}&nbsp;
          </Fragment>
        ))}

        {lastRecord && formatRecord(lastRecord)}
      </footer>

      <div className={styles.spacing} />
    </>
  );
};
