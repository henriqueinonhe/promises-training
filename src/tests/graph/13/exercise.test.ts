import makeExercises from "../../../exercises/graph/13/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("13", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: ["D"] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "D", created: ["F"] },
  { resolved: "E", created: [] },
  { resolved: "F", created: ["G"] },
  { resolved: "G", created: ["H"] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("13", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: ["D"] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: ["F"] },
  { resolved: "D", created: [] },
  { resolved: "F", created: ["G"] },
  { resolved: "G", created: ["H"] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("13", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: ["D"] },
  { resolved: "D", created: ["F"] },
  { resolved: "F", created: ["G"] },
  { resolved: "G", created: ["H"] },
  { resolved: "H", created: [] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: [] },
]);

graphExerciseTestCase("13", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: ["D"] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: [] },
  { resolved: "D", created: ["F"] },
  { resolved: "F", created: ["G"] },
  { resolved: "G", created: ["H"] },
  { resolved: "H", created: [] },
  { resolved: "B", created: [] },
]);

graphExerciseTestCase("13", [
  { created: ["A", "B", "C"] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: ["F"] },
  { resolved: "F", created: ["G"] },
  { resolved: "G", created: [] },
  { resolved: "A", created: ["D"] },
  { resolved: "D", created: ["H"] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("13", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: ["D"] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: [] },
  { resolved: "B", created: ["F"] },
  { resolved: "F", created: ["G"] },
  { resolved: "G", created: [] },
  { resolved: "D", created: ["H"] },
  { resolved: "H", created: [] },
]);
