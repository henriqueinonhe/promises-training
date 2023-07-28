import makeExercises from "../../exercises/graph/15/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("15", [
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
    dependencies: [["A", "B"]],
  },
  {
    label: "E",
    dependencies: [["D"], ["B", "C"]],
  },
  {
    label: "F",
    dependencies: [["B", "C"]],
  },
  {
    label: "G",
    dependencies: [["A", "C"], ["B"]],
  },
]);
