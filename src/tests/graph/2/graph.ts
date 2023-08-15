import { GraphRepresentation } from "../../../lib/graphExercise/graphExerciseTests";

export const graph: GraphRepresentation = [
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
];
