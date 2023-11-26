import { useExercise } from "../../application/useExercise.js";
import styles from "./VariantSelector.module.scss";

export const VariantSelector = () => {
  const { exercise, selectVariant } = useExercise();

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <button
            className={styles.button}
            onClick={() => selectVariant("Mixed")}
          >
            Mixed
          </button>
        </li>

        <li className={styles.listItem}>
          <button
            className={styles.button}
            onClick={() => selectVariant("AsyncAwait")}
          >
            Async/Await
          </button>
        </li>

        <li className={styles.listItem}>
          <button
            className={styles.button}
            onClick={() => selectVariant("ThenCatch")}
          >
            Then/Catch
          </button>
        </li>
      </ul>
    </nav>
  );
};
