import { useExercise } from "../../application/useExercise.js";
import styles from "./RecordsDisplay.module.scss";

export const RecordsDisplay = () => {
  const { exercise } = useExercise();

  const records = exercise!.records;

  return (
    <ol className={styles.container}>
      {records.map((record, index) => (
        <li className={styles.record} key={index}>
          {record.resolved && (
            <div className={styles.resolvedSegment}>
              Resolved: {record.resolved}
            </div>
          )}

          {record.rejected && (
            <div className={styles.rejectedSegment}>
              Rejected: {record.rejected}
            </div>
          )}

          {record.created.length !== 0 && (
            <div>Created: {record.created.join(", ")}</div>
          )}
        </li>
      ))}
    </ol>
  );
};
