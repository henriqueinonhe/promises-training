import { useExercise } from "../../application/useExercise.js";
import { Exercise } from "../../domain/Exercise.js";
import { displayableExerciseVariant } from "../displayableExerciseVariant.js";
import styles from "./VariantSelector.module.scss";

const VALID_VARIANTS: Exercise["variant"][] = [
  "AsyncAwait",
  "Mixed",
  "ThenCatch",
];

export const VariantSelector = () => {
  const { exercise, selectVariant } = useExercise();

  if (!exercise) return null;

  return (
    <nav className={styles.container}>
      <fieldset>
        {VALID_VARIANTS.map((variant) => (
          <span key={variant} className={styles["input-group"]}>
            <input
              type="radio"
              name="variant-selector"
              id={variant}
              value={variant}
              checked={exercise.variant === variant}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                selectVariant(event.target.value as Exercise["variant"]);
              }}
            />
            <label htmlFor={variant}>
              {displayableExerciseVariant(variant)}
            </label>
          </span>
        ))}
      </fieldset>
    </nav>
  );
};
