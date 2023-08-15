import makeExercises from "../../exercises/graph/16/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("16", [
  {
    label: "A",
    dependencies: [],
  },
  {
    label: "B",
    dependencies: [["!A"]],
  },
  {
    label: "C",
    dependencies: [["B"]],
  },
  {
    label: "D",
    dependencies: [["!C"]],
  },
]);
