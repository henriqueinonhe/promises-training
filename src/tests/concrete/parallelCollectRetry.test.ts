import { it, vi } from "vitest";
import parallelCollectRetryExercise from "../../exercises/concrete/parallelCollectRetry";

//TODO
const setup = () => {
  const postData = vi.fn();

  const parallelCollectRetry = parallelCollectRetryExercise({
    postData,
  });
};

it.todo("A");
