import makeExercises from "../../exercises/graph/7/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("7", [
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
    dependencies: [["A"]],
  },
  {
    label: "D",
    dependencies: [["A", "B"]],
  },
  {
    label: "E",
    dependencies: [["B", "C"]],
  },
]);
