import makeExercise from "../../../content/1-using-promises/1.3/exercise";
import { makeTestCase } from "../../../lib/testUtils";

const testCase = makeTestCase({ makeExercise });

testCase("1.3", [
  { created: ["A", "B"] },
  { resolved: "A", created: [] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);

testCase("1.3", [
  { created: ["A", "B"] },
  { resolved: "B", created: [] },
  { resolved: "A", created: ["C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);
