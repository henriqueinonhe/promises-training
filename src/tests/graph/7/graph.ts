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

export default graph;
