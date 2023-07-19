import makeExercises from "../../../exercises/graph/7/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("1.7", [
  { created: ["A", "B"] },
  { resolved: "A", created: ["C"] },
  { resolved: "B", created: ["D"] },
  { resolved: "C", created: ["E"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: [] },
]);

graphExerciseTestCase("1.7", [
  { created: ["A", "B"] },
  { resolved: "B", created: [] },
  { resolved: "A", created: ["C", "D"] },
  { resolved: "D", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: [] },
]);

graphExerciseTestCase("1.7", [
  { created: ["A", "B"] },
  { resolved: "B", created: [] },
  { resolved: "A", created: ["C", "D"] },
  { resolved: "D", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: [] },
]);

graphExerciseTestCase("1.7", [
  { created: ["A", "B"] },
  { resolved: "B", created: [] },
  { resolved: "A", created: ["C", "D"] },
  { resolved: "C", created: ["E"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: [] },
]);
