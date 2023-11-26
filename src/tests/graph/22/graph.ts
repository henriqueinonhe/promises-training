import { GraphRepresentation } from "../../../lib/graphExercise/generateGraphExerciseTestData.js";

const graph: GraphRepresentation = [
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
];

export default graph;
