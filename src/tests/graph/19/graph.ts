import { GraphRepresentation } from "../../../lib/graphExercise/generateGraphExerciseTestData";

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
    dependencies: [["C"], ["!C"]],
  },
];

export default graph;
