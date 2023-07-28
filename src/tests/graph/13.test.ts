import makeExercises from "../../exercises/graph/13/exercise";
import { makeGraphExerciseTests } from "../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

graphExerciseTests("13", [
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
    dependencies: [["C"]],
  },
  {
    label: "F",
    dependencies: [["D"], ["B", "E"]],
  },
  {
    label: "G",
    dependencies: [["F"]],
  },
  {
    label: "H",
    dependencies: [["D", "G"]],
  },
]);
