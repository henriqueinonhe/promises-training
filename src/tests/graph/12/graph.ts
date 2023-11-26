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
    dependencies: [["B"], ["C"]],
  },
  {
    label: "E",
    dependencies: [],
  },
  {
    label: "F",
    dependencies: [["B", "D"]],
  },
  {
    label: "G",
    dependencies: [["D"]],
  },
  {
    label: "H",
    dependencies: [["E"], ["F"], ["G"]],
  },
];

export default graph;
