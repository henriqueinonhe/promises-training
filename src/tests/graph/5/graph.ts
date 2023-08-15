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
    dependencies: [["A"]],
  },
  {
    label: "D",
    dependencies: [["B"]],
  },
  {
    label: "E",
    dependencies: [["C"]],
  },
  {
    label: "F",
    dependencies: [["D", "E"]],
  },
];
