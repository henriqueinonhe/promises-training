import { GraphRepresentation } from "../../../lib/graphExercise/generateGraphExerciseTestData";

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
    dependencies: [["!A"], ["!B"]],
  },
  {
    label: "D",
    dependencies: [["!A"], ["!B"]],
  },
  {
    label: "E",
    dependencies: [["A", "C"]],
  },
];

export default graph;
