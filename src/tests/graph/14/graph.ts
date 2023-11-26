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
    dependencies: [],
  },
  {
    label: "E",
    dependencies: [["A", "B"]],
  },
  {
    label: "F",
    dependencies: [["C"]],
  },
  {
    label: "G",
    dependencies: [["C"], ["D"]],
  },
  {
    label: "H",
    dependencies: [["E"], ["F", "G"]],
  },
];

export default graph;
