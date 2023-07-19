import makeExercises from "../../../exercises/graph/1.1/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase(makeExercises);

graphExerciseTestCase("1.1", [
  { created: ["A"] },
  { resolved: "A", created: ["B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);
