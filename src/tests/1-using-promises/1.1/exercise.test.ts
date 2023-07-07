import makeExercise from "../../../content/1-using-promises/1.1/exercise";
import { createContainer } from "../../../lib/container";

const { graphExerciseTestCase } = createContainer({ makeExercise });

graphExerciseTestCase("1.1", [
  { created: ["A"] },
  { resolved: "A", created: ["B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);
