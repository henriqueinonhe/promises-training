import makeExercises from "../../exercises/graph/16/exercise";
import { makeGraphExerciseTestCase } from "../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("16", [
  { created: ["A"] },
  { rejected: "A", created: ["B"] },
  { resolved: "B", created: ["C"] },
  { rejected: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);

graphExerciseTestCase("16", [
  { created: ["A"] },
  { resolved: "A", created: [] },
]);

graphExerciseTestCase("16", [
  { created: ["A"] },
  { rejected: "A", created: ["B"] },
  { rejected: "B", created: [] },
]);

graphExerciseTestCase("16", [
  { created: ["A"] },
  { rejected: "A", created: ["B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: [] },
]);

graphExerciseTestCase("16", [
  { created: ["A"] },
  { rejected: "A", created: ["B"] },
  { resolved: "B", created: ["C"] },
  { rejected: "C", created: ["D"] },
  { rejected: "D", created: [] },
]);
