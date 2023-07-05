import makeExercise from "../../../content/1-using-promises/1.1/exercise";
import { makeTestCase } from "../../../tools/testUtils";

const testCase = makeTestCase({ makeExercise });

testCase("1.1", [
  { created: ["A"] },
  { resolved: "A", created: ["B"] },
  { resolved: "B", created: ["C"] },
  { resolved: "C", created: ["D"] },
  { resolved: "D", created: [] },
]);
