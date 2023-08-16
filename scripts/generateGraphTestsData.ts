import { readdir, writeFile, lstat, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { GraphExercisesTestConfig } from "../src/lib/graphExercise/GraphExerciseTestsConfig";
import { GraphExerciseTestData } from "../src/lib/graphExercise/GraphExerciseTestData";
import { generateGraphExerciseTestData } from "../src/lib/graphExercise/generateGraphExerciseTestData";

const currentFilePath = new URL(import.meta.url).pathname;
const basePath = resolve(currentFilePath, "../..");

const main = async () => {
  await createDataDirIfNotExists();
  await generateConfigFile();
  await generateTestsDataFiles();
};

const createDataDirIfNotExists = async () => {
  try {
    await lstat(resolve(basePath, "./.data/graph"));
  } catch {
    await mkdir(resolve(basePath, "./.data/graph"), {
      recursive: true,
    });
  }
};

const generateConfigFile = async () => {
  const defaultTestCasesCap = 1000;
  const config: GraphExercisesTestConfig = {
    testCasesCap: defaultTestCasesCap,
  };

  await writeFile(
    resolve(basePath, "./.data/graph/testsConfig.json"),
    JSON.stringify(config),
    {}
  );
};

const generateTestsDataFiles = async () => {
  const dirNames = await readdir(resolve(basePath, "./src/tests/graph"));

  await Promise.all(dirNames.map(generateSingleTestDataFile));
};

const generateSingleTestDataFile = async (dirName: string) => {
  const graphFilePath = resolve(
    basePath,
    `./src/tests/graph/${dirName}/graph.ts`
  );
  const graphRepresentation = (await import(graphFilePath)).default;
  const stepSequences = generateGraphExerciseTestData(graphRepresentation);

  const data: GraphExerciseTestData = {
    stepSequences,
  };

  const dataFilePath = resolve(basePath, `./.data/graph/${dirName}.json`);

  await writeFile(dataFilePath, JSON.stringify(data));
};

main();
