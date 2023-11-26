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

export default graph;
