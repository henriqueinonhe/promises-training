import { red } from "kolorist";
import { checkGraphExercisesTestsDataExists } from "../src/lib/graphExercise/checkGraphExercisesTestsDataExists.js";
import { resolve } from "node:path";
import { argv } from "node:process";
import { GraphExercisesTestConfig } from "../src/lib/graphExercise/GraphExerciseTestsConfig.js";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(new URL(import.meta.url));
const basePath = resolve(currentFilePath, "../../..");

const main = async () => {
  try {
    const serializedCap = argv[2];

    const cap = parseCap(serializedCap);
    await checkGraphExercisesTestsDataExists();
    await updateGraphTestsCap(cap);
  } catch (error) {
    if (error instanceof Error) {
      console.error(red(`\n${error.message}\n`));
      process.exit(1);
    }

    throw error;
  }
};

const parseCap = (serializedCap: string) => {
  const cap = Number(serializedCap);

  if (isNaN(cap) || cap <= 0 || !Number.isInteger(cap)) {
    throw new Error("Cap must be a positive integer!");
  }

  return cap;
};

const updateGraphTestsCap = async (cap: number) => {
  const updatedTestsConfig: GraphExercisesTestConfig = {
    testCasesCap: cap,
  };

  const testsConfigPath = resolve(basePath, ".data/graph/testsConfig.json");
  await writeFile(testsConfigPath, JSON.stringify(updatedTestsConfig));
};

main();
