import makeExercises from "../../exercises/graph/14/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("14", [
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
    dependencies: [],
  },
  {
    label: "E",
    dependencies: [["A", "B"]],
  },
  {
    label: "F",
    dependencies: [["C"]],
  },
  {
    label: "G",
    dependencies: [["C"], ["D"]],
  },
  {
    label: "H",
    dependencies: [["E"], ["F", "G"]],
  },
]);
