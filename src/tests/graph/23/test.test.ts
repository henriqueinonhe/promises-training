import makeExercises from "../../exercises/graph/23/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("23", [
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
    dependencies: [["A", "B"]],
  },
  {
    label: "D",
    dependencies: [["A"], ["!C"]],
  },
  {
    label: "E",
    dependencies: [["B"]],
  },
  {
    label: "F",
    dependencies: [["C"], ["E"]],
  },
  {
    label: "G",
    dependencies: [["!D", "!E"], ["!F"]],
  },
]);
