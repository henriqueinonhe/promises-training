import makeExercises from "../../exercises/graph/2/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("1", [
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
    dependencies: [["B"]],
  },
  {
    label: "D",
    dependencies: [],
  },
  {
    label: "E",
    dependencies: [["D"]],
  },
  {
    label: "F",
    dependencies: [["E"]],
  },
]);
