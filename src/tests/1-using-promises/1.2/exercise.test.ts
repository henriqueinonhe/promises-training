import makeExercise from "../../../content/1-using-promises/1.2/exercise";
import { makeTestCase } from "../../../tools/testUtils";

const testCase = makeTestCase({ makeExercise });

testCase("1.2", [
  { created: ["A", "D"] },
  { resolved: "A", created: ["B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: [] },
  { resolved: "D", created: ["E"] },
  { resolved: "E", created: ["F"] },
  { resolved: "F", created: [] },
]);

testCase("1.2", [
  { created: ["A", "D"] },
  { resolved: "D", created: ["E"] },
  { resolved: "E", created: ["F"] },
  { resolved: "F", created: [] },
  { resolved: "A", created: ["B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: [] },
]);

testCase("1.2", [
  { created: ["A", "D"] },
  { resolved: "A", created: ["B"] },
  { resolved: "D", created: ["E"] },
  { resolved: "B", created: ["C"] },
  { resolved: "E", created: ["F"] },
  { resolved: "C", created: [] },
  { resolved: "F", created: [] },
]);

testCase("1.2", [
  { created: ["A", "D"] },
  { resolved: "A", created: ["B"] },
  { resolved: "D", created: ["E"] },
  { resolved: "E", created: ["F"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: [] },
  { resolved: "F", created: [] },
]);
