import makeExercises from "../../exercises/graph/12/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("12", [
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
    dependencies: [["B"], ["C"]],
  },
  {
    label: "E",
    dependencies: [],
  },
  {
    label: "F",
    dependencies: [["B", "D"]],
  },
  {
    label: "G",
    dependencies: [["D"]],
  },
  {
    label: "H",
    dependencies: [["E"], ["F"], ["G"]],
  },
]);
