import makeExercise from "../../../content/1-using-promises/1.8/exercise";
import { makeGraphExerciseTestCase } from "../../../lib/graphExercise/graphExerciseTestCase";

const graphExerciseTestCase = makeGraphExerciseTestCase({ makeExercise });

graphExerciseTestCase("1.7", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: ["D"] },
  { resolved: "D", created: ["F"] },
  { resolved: "F", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "E", created: [] },
  { resolved: "C", created: ["G", "H"] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("1.7", [
  { created: ["A", "B", "C"] },
  { resolved: "B", created: ["E"] },
  { resolved: "C", created: [] },
  { resolved: "E", created: [] },
  { resolved: "A", created: ["D"] },
  { resolved: "D", created: ["F", "H"] },
  { resolved: "F", created: ["G"] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);

graphExerciseTestCase("1.7", [
  { created: ["A", "B", "C"] },
  { resolved: "A", created: ["D"] },
  { resolved: "D", created: ["F"] },
  { resolved: "B", created: ["E"] },
  { resolved: "C", created: ["H"] },
  { resolved: "E", created: [] },
  { resolved: "F", created: ["G"] },
  { resolved: "G", created: [] },
  { resolved: "H", created: [] },
]);
