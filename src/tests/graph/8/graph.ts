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
    dependencies: [["A"]],
  },
  {
    label: "D",
    dependencies: [["B", "C"]],
  },
  {
    label: "E",
    dependencies: [],
  },
  {
    label: "F",
    dependencies: [["E"]],
  },
  {
    label: "G",
    dependencies: [["E"]],
  },
  {
    label: "H",
    dependencies: [["F", "G"]],
  },
];

export default graph;
