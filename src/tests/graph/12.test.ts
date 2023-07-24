import makeExercises from "../../exercises/graph/12/exercise";
import { makeGraphExerciseTestCase } from "../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("12", [
  { created: ["A", "E"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "B", created: ["D"] },
  { resolved: "C", created: [] },
  { resolved: "D", created: ["F", "G"] },
  { resolved: "E", created: ["H"] },
  { resolved: "F", created: [] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("12", [
  { created: ["A", "E"] },
  { resolved: "E", created: ["H"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "B", created: ["D"] },
  { resolved: "C", created: [] },
  { resolved: "D", created: ["F", "G"] },
  { resolved: "F", created: [] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("12", [
  { created: ["A", "E"] },
  { resolved: "E", created: ["H"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "B", created: [] },
  { resolved: "D", created: ["F", "G"] },
  { resolved: "F", created: [] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("12", [
  { created: ["A", "E"] },
  { resolved: "E", created: ["H"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "B", created: ["D"] },
  { resolved: "D", created: ["F", "G"] },
  { resolved: "F", created: [] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
  { resolved: "C", created: [] },
]);

graphExerciseTestCase("12", [
  { created: ["A", "E"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "B", created: ["D"] },
  { resolved: "D", created: ["F", "G"] },
  { resolved: "F", created: ["H"] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
  { resolved: "E", created: [] },
  { resolved: "C", created: [] },
]);

graphExerciseTestCase("12", [
  { created: ["A", "E"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "B", created: ["D"] },
  { resolved: "D", created: ["F", "G"] },
  { resolved: "G", created: ["H"] },
  { resolved: "F", created: [] },
  { resolved: "H", created: [] },
  { resolved: "E", created: [] },
  { resolved: "C", created: [] },
]);
