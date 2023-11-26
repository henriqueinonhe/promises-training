import { useExercise } from "../../application/useExercise.js";
import { getExercisePromisesStatus } from "../../domain/getExercisePromisesStatus.js";
import styles from "./ControlPanel.module.scss";

export const ControlPanel = () => {
  return (
    <div className={styles.container}>
      <BareControlPanel />
    </div>
  );
};

const BareControlPanel = () => {
  const {
    exercise,
    startExercise,
    resolvePromise,
    rejectPromise,
    resetExercise,
  } = useExercise();

  if (!exercise) {
    return null;
  }

  const entries = getExercisePromisesStatus(exercise);
  const exerciseHasStarted = exercise.records.length !== 0;

  return (
    <>
      <div>
        <button
          className={styles.startButton}
          disabled={exerciseHasStarted}
          onClick={() => startExercise()}
        >
          Start
        </button>

        <button className={styles.resetButton} onClick={() => resetExercise()}>
          Reset
        </button>
      </div>

      <ul>
        {entries.map((entry) => (
          <li key={entry.label} className={styles.entry}>
            <span>{entry.label}</span>

            <button
              disabled={entry.status !== "pending"}
              onClick={() => resolvePromise(entry.label)}
              className={[
                styles.resolveButton,
                entry.status === "resolved" && styles.resolved,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              Resolve
            </button>

            <button
              disabled={entry.status !== "pending"}
              onClick={() => rejectPromise(entry.label)}
              className={[
                styles.rejectButton,
                entry.status === "rejected" && styles.rejected,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
