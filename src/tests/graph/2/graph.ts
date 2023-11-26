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
    dependencies: [["B"]],
  },
  {
    label: "D",
    dependencies: [],
  },
  {
    label: "E",
    dependencies: [["D"]],
  },
  {
    label: "F",
    dependencies: [["E"]],
  },
];

export default graph;
