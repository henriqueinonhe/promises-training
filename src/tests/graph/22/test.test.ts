import makeExercises from "../../../exercises/graph/22/exercise.js";
import { makeGraphExerciseTests } from "../../../lib/graphExercise/graphExerciseTests.js";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

await graphExerciseTests("22");
