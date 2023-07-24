import makeExercises from "../../exercises/graph/3/exercise";
import { makeGraphExerciseTestCase } from "../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("3", [
  { created: ["A", "B"] },
  { resolved: "A", created: [] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("3", [
  { created: ["A", "B"] },
  { resolved: "B", created: [] },
  { resolved: "A", created: ["C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);
