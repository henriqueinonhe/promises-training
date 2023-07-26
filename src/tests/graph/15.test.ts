import makeExercises from "../../exercises/graph/15/exercise";
import { makeGraphExerciseTestCase } from "../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("15", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: [] },
  { resolved: "B", created: ["D", "G"] },
  { resolved: "C", created: ["E", "F"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: [] },
  { resolved: "F", created: [] },
  { resolved: "G", created: [] },
]);

graphExerciseTestCase("15", [
  { created: ["A", "B", "C"] },
  { resolved: "B", created: ["G"] },
  { resolved: "C", created: ["E", "F"] },
  { resolved: "A", created: ["D"] },
  { resolved: "E", created: [] },
  { resolved: "G", created: [] },
  { resolved: "F", created: [] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("15", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: [] },
  { resolved: "B", created: ["D", "G"] },
  { resolved: "D", created: ["E"] },
  { resolved: "E", created: [] },
  { resolved: "G", created: [] },
  { resolved: "C", created: ["F"] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("15", [
  { created: ["A", "B", "C"] },
  { resolved: "C", created: [] },
  { resolved: "B", created: ["E", "F", "G"] },
  { resolved: "A", created: ["D"] },
  { resolved: "E", created: [] },
  { resolved: "G", created: [] },
  { resolved: "F", created: [] },
  { resolved: "D", created: [] },
]);
