import makeExercises from "../../../exercises/graph/11/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("11", [
  { created: ["A", "B"] },
  { resolved: "A", created: ["C", "E"] },
  { resolved: "B", created: ["D"] },
  { resolved: "C", created: [] },
  { resolved: "E", created: [] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("11", [
  { created: ["A", "B"] },
  { resolved: "B", created: ["C", "E"] },
  { resolved: "A", created: ["D"] },
  { resolved: "C", created: [] },
  { resolved: "E", created: [] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("11", [
  { created: ["A", "B"] },
  { resolved: "A", created: ["C", "E"] },
  { resolved: "B", created: ["D"] },
  { resolved: "D", created: [] },
  { resolved: "C", created: [] },
  { resolved: "E", created: [] },
]);

graphExerciseTestCase("11", [
  { created: ["A", "B"] },
  { resolved: "A", created: ["C", "E"] },
  { resolved: "C", created: [] },
  { resolved: "E", created: [] },
  { resolved: "B", created: ["D"] },
  { resolved: "D", created: [] },
]);
