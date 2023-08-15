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
];
