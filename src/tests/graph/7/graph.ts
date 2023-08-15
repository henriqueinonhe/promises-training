import { GraphRepresentation } from "../../../lib/graphExercise/graphExerciseTests";

export const graph: GraphRepresentation = [
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
];
