import makeExercises from "../../../exercises/1-using-promises/1.5/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("1.5", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "B", created: ["D"] },
  { resolved: "C", created: ["E"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: ["F"] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("1.5", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "B", created: ["D"] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: [] },
  { resolved: "D", created: ["F"] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("1.5", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "C", created: ["E"] },
  { resolved: "B", created: ["D"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: ["F"] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("1.5", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "C", created: ["E"] },
  { resolved: "B", created: ["D"] },
  { resolved: "E", created: [] },
  { resolved: "D", created: ["F"] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("1.5", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "B", created: ["D"] },
  { resolved: "D", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: ["F"] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("1.5", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C"] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: [] },
  { resolved: "B", created: ["D"] },
  { resolved: "D", created: ["F"] },
  { resolved: "F", created: [] },
]);
