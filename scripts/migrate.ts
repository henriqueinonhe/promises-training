import { resolve, relative } from "node:path";
import { readFile, stat, rename } from "node:fs/promises";
import { logError, logMessage } from "../src/lib/cli/logger.js";
import { run } from "../src/lib/cli/run.js";
import { copy } from "fs-extra";
import { fileURLToPath } from "node:url";
import { argv } from "node:process";

const currentFilePath = fileURLToPath(new URL(import.meta.url));
const basePath = resolve(currentFilePath, "../../..");

const main = async () => {
  const processDir = argv[2];

  const sourcePath = basePath;
  const targetPath = resolve(processDir);

  await checkIsPromisesTrainingRepo({ targetPath });
  await copyMigrationFiles({ sourcePath, targetPath });
  await reinstallDependencies({ targetPath });
};

type CheckisPromisesTrainingRepoParameters = {
  targetPath: string;
};

const checkIsPromisesTrainingRepo = async ({
  targetPath,
}: CheckisPromisesTrainingRepoParameters) => {
  try {
    const buffer = await readFile(resolve(targetPath, "package.json"));
    const packageJson = JSON.parse(buffer.toString());

    if (packageJson.name !== "create-promises-training") {
      logError("Selected directory is not a promises-training repo");
      process.exit(1);
    }
  } catch (error) {
    if (isEnoentError(error)) {
      logError("Selected directory is not a promises-training repo");
      process.exit(1);
    }

    throw error;
  }
};

type CopyMigrationFilesParameters = {
  sourcePath: string;
  targetPath: string;
};

const copyMigrationFiles = async ({
  sourcePath,
  targetPath,
}: CopyMigrationFilesParameters) => {
  const filesBlacklist = [/^bin/];

  try {
    logMessage("Copying files...");

    await copy(sourcePath, targetPath, {
      filter: async (_, target) => {
        const relativePath = relative(targetPath, target);
        if (filesBlacklist.some((pattern) => relativePath.match(pattern))) {
          return false;
        }

        const isAlreadyExistingExerciseFile =
          relativePath.match(/^src\/exercises.*\.ts$/) &&
          (await stat(target)
            .then(() => true)
            .catch(() => false));

        return !isAlreadyExistingExerciseFile;
      },
    });

    await rename(
      resolve(targetPath, "./gitignore"),
      resolve(targetPath, ".gitignore")
    );
  } catch (error) {
    logError("\nError copying files");
    console.error(error);
    process.exit(1);
  }
};

type ReinstallDependenciesParameters = {
  targetPath: string;
};

const reinstallDependencies = async ({
  targetPath,
}: ReinstallDependenciesParameters) => {
  try {
    logMessage("Installing dependencies...");

    run(`npm install`, {
      cwd: targetPath,
    });
    run(`npm install`, {
      cwd: resolve(targetPath, `./src/lib/graphExercise/ui`),
    });
  } catch (error) {
    logError("Error installing dependencies");
    console.error(error);
    process.exit(1);
  }
};

const isEnoentError = (error: unknown): error is { code: "ENOENT" } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  );
};

main();
