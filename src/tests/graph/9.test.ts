import makeExercises from "../../exercises/graph/9/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("9", [
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
    dependencies: [],
  },
  {
    label: "D",
    dependencies: [["A"]],
  },
  {
    label: "E",
    dependencies: [["B"]],
  },
  {
    label: "F",
    dependencies: [["D"]],
  },
  {
    label: "G",
    dependencies: [["C", "E", "F"]],
  },
  {
    label: "H",
    dependencies: [["B", "C", "D"]],
  },
]);
