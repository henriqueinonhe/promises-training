import makeExercises from "../../exercises/graph/22/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("22", [
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
    dependencies: [["B"]],
  },
  {
    label: "E",
    dependencies: [["!B"], ["!C"]],
  },
  {
    label: "F",
    dependencies: [["C"]],
  },
  {
    label: "G",
    dependencies: [["D", "F"]],
  },
]);
