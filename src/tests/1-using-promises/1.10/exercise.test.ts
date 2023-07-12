import makeExercises from "../../../content/1-using-promises/1.10/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("1.10", [
  { created: ["A", "B"] },
  { resolved: "A", created: ["C"] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("1.10", [
  { created: ["A", "B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "A", created: [] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("1.10", [
  { created: ["A", "B"] },
  { resolved: "A", created: ["C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "B", created: [] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("1.10", [
  { created: ["A", "B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "A", created: [] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("1.10", [
  { created: ["A", "B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
  { resolved: "A", created: [] },
]);
