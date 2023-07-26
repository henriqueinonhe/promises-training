import makeExercises from "../../exercises/graph/14/exercise";
import { makeGraphExerciseTestCase } from "../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("14", [
  { created: ["A", "B", "C", "D"] },
  { resolved: "A", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "C", created: ["F", "G"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: ["H"] },
  { resolved: "F", created: [] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("14", [
  { created: ["A", "B", "C", "D"] },
  { resolved: "B", created: [] },
  { resolved: "A", created: ["E"] },
  { resolved: "C", created: ["F", "G"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: ["H"] },
  { resolved: "F", created: [] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("14", [
  { created: ["A", "B", "C", "D"] },
  { resolved: "D", created: ["G"] },
  { resolved: "C", created: ["F"] },
  { resolved: "F", created: [] },
  { resolved: "G", created: ["H"] },
  { resolved: "H", created: [] },
  { resolved: "B", created: [] },
  { resolved: "A", created: ["E"] },
  { resolved: "E", created: [] },
]);

graphExerciseTestCase("14", [
  { created: ["A", "B", "C", "D"] },
  { resolved: "A", created: [] },
  { resolved: "C", created: ["F", "G"] },
  { resolved: "B", created: ["E"] },
  { resolved: "F", created: [] },
  { resolved: "D", created: [] },
  { resolved: "E", created: ["H"] },
  { resolved: "H", created: [] },
  { resolved: "G", created: [] },
]);

graphExerciseTestCase("14", [
  { created: ["A", "B", "C", "D"] },
  { resolved: "A", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "E", created: ["H"] },
  { resolved: "H", created: [] },
  { resolved: "D", created: ["G"] },
  { resolved: "G", created: [] },
  { resolved: "C", created: ["F"] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("14", [
  { created: ["A", "B", "C", "D"] },
  { resolved: "C", created: ["F", "G"] },
  { resolved: "B", created: [] },
  { resolved: "A", created: ["E"] },
  { resolved: "F", created: [] },
  { resolved: "G", created: ["H"] },
  { resolved: "H", created: [] },
  { resolved: "D", created: [] },
  { resolved: "E", created: [] },
]);
