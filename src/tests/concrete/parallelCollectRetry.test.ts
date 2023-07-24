import { it, vi } from "vitest";
import parallelCollectRetryExercise from "../../exercises/concrete/parallelCollectRetry/exercise";

//TODO
const setup = () => {
  const postData = vi.fn();

  const parallelCollectRetry = parallelCollectRetryExercise({
    postData,
  });
};

it.todo("A");
