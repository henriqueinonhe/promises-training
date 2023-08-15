import makeExercises from "../../../exercises/graph/4/exercise";
import { makeGraphExerciseTests } from "../../../lib/graphExercise/graphExerciseTests";

const graphExerciseTests = makeGraphExerciseTests(makeExercises);

await graphExerciseTests("4");
