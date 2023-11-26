import makeExercises from "../../../exercises/graph/20/exercise.js";
import { makeGraphExerciseTests } from "../../../lib/graphExercise/graphExerciseTests.js";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

await graphExerciseTests("20");
