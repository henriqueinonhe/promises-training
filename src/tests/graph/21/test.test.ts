import makeExercises from "../../exercises/graph/21/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("21", [
  {
    label: "A",
    dependencies: [],
  },
  {
    label: "B",
    dependencies: [],
  },
  {
    label: "C",
    dependencies: [["!A"], ["!B"]],
  },
  {
    label: "D",
    dependencies: [["!A"], ["!B"]],
  },
  {
    label: "E",
    dependencies: [["A", "C"]],
  },
]);
