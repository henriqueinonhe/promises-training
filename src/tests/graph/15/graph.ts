import { GraphRepresentation } from "../../../lib/graphExercise/generateGraphExerciseTestData.js";

const graph: GraphRepresentation = [
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
];

export default graph;
