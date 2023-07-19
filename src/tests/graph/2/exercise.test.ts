import makeExercises from "../../../exercises/graph/2/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("1.2", [
  { created: ["A", "D"] },
  { resolved: "A", created: ["B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: [] },
  { resolved: "D", created: ["E"] },
  { resolved: "E", created: ["F"] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("1.2", [
  { created: ["A", "D"] },
  { resolved: "D", created: ["E"] },
  { resolved: "E", created: ["F"] },
  { resolved: "F", created: [] },
  { resolved: "A", created: ["B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: [] },
]);

graphExerciseTestCase("1.2", [
  { created: ["A", "D"] },
  { resolved: "A", created: ["B"] },
  { resolved: "D", created: ["E"] },
  { resolved: "B", created: ["C"] },
  { resolved: "E", created: ["F"] },
  { resolved: "C", created: [] },
  { resolved: "F", created: [] },
]);

graphExerciseTestCase("1.2", [
  { created: ["A", "D"] },
  { resolved: "A", created: ["B"] },
  { resolved: "D", created: ["E"] },
  { resolved: "E", created: ["F"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: [] },
  { resolved: "F", created: [] },
]);
