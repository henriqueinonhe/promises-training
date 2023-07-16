import { useExercise } from "../../application/useExercise";
import { getExercisePromisesStatus } from "../../domain/getExercisePromisesStatus";
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
        <button disabled={exerciseHasStarted} onClick={() => startExercise()}>
          Start
        </button>
        <button onClick={() => resetExercise()}>Reset</button>
      </div>

      <ul>
        {entries.map((entry) => (
          <li key={entry.label}>
            <span>{entry.label}</span>
            <button
              disabled={entry.status !== "pending"}
              onClick={() => resolvePromise(entry.label)}
            >
              Resolve
            </button>
            <button
              disabled={entry.status !== "pending"}
              onClick={() => rejectPromise(entry.label)}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
