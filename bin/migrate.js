#!/usr/bin/env node

const { cp, execSync } = require("node:child_process");
const { readFile, stat } = require("node:fs/promises");
const { red, yellow } = require("kolorist");

const logMessage = (message) => console.log(yellow(`\n${message}`));
const logError = (message) => console.error(red(`\n${message}`));

const run = (command, options) =>
  execSync(command, { stdio: "inherit", ...options });

const sourcePath = __dirname;
const targetPath = resolve(".");

const main = async () => {
  await checkIsPromisesTrainingRepo();
  await copyFiles();
  await reinstallDependencies();
};

const checkIsPromisesTrainingRepo = async () => {
  try {
    const buffer = await readFile(resolve(targetPath, "package.json"));
    const packageJson = JSON.parse(buffer.toString());

    if (packageJson.name !== "create-promises-training") {
      logError("Selected directory is not a promises-training repo");
      process.exit(1);
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      logError("Selected directory is not a promises-training repo");
      process.exit(1);
    }

    throw error;
  }
};

const copyFiles = async () => {
  const filesBlacklist = [/^bin/];

  try {
    logMessage("Copying files...");

    await cp(sourcePath, targetPath, {
      recursive: true,
      filter: async (_, target) => {
        if (filesBlacklist.some((pattern) => target.match(pattern))) {
          return false;
        }

        const isAlreadyExistingExerciseFile =
          target.match(/^src\/exercises.*\.ts$/) &&
          (await stat(target)
            .then(() => true)
            .catch(() => false));

        return !isAlreadyExistingExerciseFile;
      },
    });
  } catch (error) {
    logError("\nError copying files");
    console.error(error);
    process.exit(1);
  }
};

const reinstallDependencies = async () => {
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

main();
