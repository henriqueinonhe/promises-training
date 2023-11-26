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
    dependencies: [["!A"]],
  },
  {
    label: "D",
    dependencies: [["B"]],
  },
  {
    label: "E",
    dependencies: [["!C"]],
  },
  {
    label: "F",
    dependencies: [["!D", "E"]],
  },
];

export default graph;
