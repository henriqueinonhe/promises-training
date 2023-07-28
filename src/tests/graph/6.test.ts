import makeExercises from "../../exercises/graph/6/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("6", [
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
    dependencies: [["A"]],
  },
  {
    label: "D",
    dependencies: [["A"]],
  },
  {
    label: "E",
    dependencies: [["B", "C"]],
  },
  {
    label: "F",
    dependencies: [["C", "D"]],
  },
]);
