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
    dependencies: [["A"]],
  },
  {
    label: "E",
    dependencies: [["B"]],
  },
  {
    label: "F",
    dependencies: [["D"]],
  },
  {
    label: "G",
    dependencies: [["C", "E", "F"]],
  },
  {
    label: "H",
    dependencies: [["B", "C", "D"]],
  },
];

export default graph;
