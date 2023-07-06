import makeExercise from "../../../content/1-using-promises/1.4/exercise";
import { makeTestCase } from "../../../lib/testUtils";

const testCase = makeTestCase({ makeExercise });

testCase("1.3", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "B", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: [] },
]);

testCase("1.3", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "B", created: [] },
  { resolved: "D", created: [] },
  { resolved: "C", created: ["E"] },
  { resolved: "E", created: [] },
]);

testCase("1.3", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "C", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "D", created: [] },
  { resolved: "E", created: [] },
]);

testCase("1.3", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "C", created: [] },
  { resolved: "D", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "E", created: [] },
]);

testCase("1.3", [
  { created: ["A"] },
  { resolved: "A", created: ["B", "C", "D"] },
  { resolved: "D", created: [] },
  { resolved: "C", created: [] },
  { resolved: "B", created: ["E"] },
  { resolved: "E", created: [] },
]);
