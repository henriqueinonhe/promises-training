import makeExercises from "../../../exercises/graph/1.9/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("1.9", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: ["D"] },
  { resolved: "D", created: ["F"] },
  { resolved: "F", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "E", created: [] },
  { resolved: "C", created: ["G", "H"] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("1.9", [
  { created: ["A", "B", "C"] },
  { resolved: "B", created: ["E"] },
  { resolved: "C", created: [] },
  { resolved: "E", created: [] },
  { resolved: "A", created: ["D"] },
  { resolved: "D", created: ["F", "H"] },
  { resolved: "F", created: ["G"] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("1.9", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: ["D"] },
  { resolved: "D", created: ["F"] },
  { resolved: "B", created: ["E"] },
  { resolved: "C", created: ["H"] },
  { resolved: "E", created: [] },
  { resolved: "F", created: ["G"] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);
