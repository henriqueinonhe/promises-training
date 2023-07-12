import makeExercises from "../../../content/1-using-promises/1.6/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("1.6", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "D", created: ["F"] },
  { resolved: "E", created: [] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("1.6", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "C", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "D", created: ["F"] },
  { resolved: "E", created: [] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("1.6", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "D", created: [] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["E", "F"] },
  { resolved: "E", created: [] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("1.6", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "D", created: [] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["E", "F"] },
  { resolved: "F", created: [] },
  { resolved: "E", created: [] },
]);
