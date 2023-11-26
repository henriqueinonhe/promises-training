import { argv } from "node:process";
import { lstat, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { checkGraphExercisesTestsDataExists } from "../src/lib/graphExercise/checkGraphExercisesTestsDataExists.js";
import { GraphExerciseTestData } from "../src/lib/graphExercise/GraphExerciseTestData.js";
import { shuffle } from "lodash";
import { red } from "kolorist";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(new URL(import.meta.url));
const basePath = resolve(currentFilePath, "../../..");

const main = async () => {
  try {
    const graphExerciseLabel = argv[2];

    await checkGraphExercisesTestsDataExists();
    await validateGraphExerciseLabel(graphExerciseLabel);
    await reshuffleTestsData(graphExerciseLabel);
  } catch (error) {
    if (error instanceof Error) {
      console.error(red(`\n${error.message}\n`));
      process.exit(1);
    }

    throw error;
  }
};

const validateGraphExerciseLabel = async (graphExerciseLabel: string) => {
  if (!graphExerciseLabel) {
    throw new Error("You must provide a graph exercise to be shuffled!");
  }

  try {
    await lstat(resolve(basePath, `./.data/graph/${graphExerciseLabel}.json`));
  } catch {
    throw new Error(
      `There is no graph exercise associated with '${graphExerciseLabel}'!`
    );
  }
};

const reshuffleTestsData = async (graphExerciseLabel: string) => {
  const testsDataBuffer = await readFile(
    resolve(basePath, `./.data/graph/${graphExerciseLabel}.json`)
  );
  const testsData = JSON.parse(
    testsDataBuffer.toString()
  ) as GraphExerciseTestData;
  const sequences = testsData.stepSequences;

  const shuffledSequences = shuffle(sequences);

  const updatedTestsData: GraphExerciseTestData = {
    stepSequences: shuffledSequences,
  };

  await writeFile(
    resolve(basePath, `./.data/graph/${graphExerciseLabel}.json`),
    JSON.stringify(updatedTestsData)
  );
};

main();
