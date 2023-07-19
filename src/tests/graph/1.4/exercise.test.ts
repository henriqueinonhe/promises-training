import makeExercises from "../../../exercises/graph/1.4/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("1.4", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: [] },
]);

graphExerciseTestCase("1.4", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "B", created: [] },
  { resolved: "D", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: [] },
]);

graphExerciseTestCase("1.4", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "C", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: [] },
]);

graphExerciseTestCase("1.4", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "C", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "E", created: [] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("1.4", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "C", created: [] },
  { resolved: "D", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "E", created: [] },
]);

graphExerciseTestCase("1.4", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "D", created: [] },
  { resolved: "C", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "E", created: [] },
]);
