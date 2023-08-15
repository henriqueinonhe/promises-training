import makeExercises from "../../exercises/graph/18/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("18", [
  {
    label: "A",
    dependencies: [],
  },
  {
    label: "B",
    dependencies: [["A"]],
  },
  {
    label: "C",
    dependencies: [["!A"]],
  },
  {
    label: "D",
    dependencies: [["!A"]],
  },
  {
    label: "E",
    dependencies: [["C", "D"]],
  },
]);
