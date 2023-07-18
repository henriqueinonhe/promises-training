import makeExercises from "../../../exercises/1-using-promises/1.8/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("1.8", [
  { created: ["A", "E"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: ["F", "G"] },
  { resolved: "F", created: [] },
  { resolved: "G", created: ["H"] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("1.8", [
  { created: ["A", "E"] },
  { resolved: "E", created: ["F", "G"] },
  { resolved: "F", created: [] },
  { resolved: "G", created: ["H"] },
  { resolved: "H", created: [] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("1.8", [
  { created: ["A", "E"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "E", created: ["F", "G"] },
  { resolved: "C", created: [] },
  { resolved: "G", created: [] },
  { resolved: "B", created: ["D"] },
  { resolved: "F", created: ["H"] },
  { resolved: "H", created: [] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("1.8", [
  { created: ["A", "E"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "E", created: ["F", "G"] },
  { resolved: "G", created: [] },
  { resolved: "C", created: [] },
  { resolved: "F", created: ["H"] },
  { resolved: "B", created: ["D"] },
  { resolved: "D", created: [] },
  { resolved: "H", created: [] },
]);
