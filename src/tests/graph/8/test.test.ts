import makeExercises from "../../exercises/graph/8/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("8", [
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
    dependencies: [["B", "C"]],
  },
  {
    label: "E",
    dependencies: [],
  },
  {
    label: "F",
    dependencies: [["E"]],
  },
  {
    label: "G",
    dependencies: [["E"]],
  },
  {
    label: "H",
    dependencies: [["F", "G"]],
  },
]);
