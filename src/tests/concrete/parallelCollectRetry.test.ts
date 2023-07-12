import { it, vi } from "vitest";
import parallelCollectRetryExercise from "../../content/concrete/parallelCollectRetry";

//TODO
const setup = () => {
  const postData = vi.fn();

  const parallelCollectRetry = parallelCollectRetryExercise({
    postData,
  });
};

it.todo("A");
