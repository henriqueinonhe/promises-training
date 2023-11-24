#!/usr/bin/env node

const { execSync } = require("node:child_process");
const {
  cp,
  rm,
  rename,
  stat,
  mkdir,
  readdir,
  readFile,
} = require("node:fs/promises");
const { resolve, relative } = require("node:path");
const prompts = require("prompts");
const { red, yellow } = require("kolorist");
const { argv } = require("node:process");

const run = (command, options) =>
  execSync(command, { stdio: "inherit", ...options });

const logMessage = (message) => console.log(yellow(`\n${message}`));
const logError = (message) => console.error(red(`\n${message}`));

const main = async () => {
  const option = argv[2];

  if (option === "--migrate") {
    await migrate();
    process.exit(0);
  }

  await setup();
  process.exit(0);
};

const setup = async () => {
  const dir = await promptInstallationDir();
  await createDirIfNotExists(dir);

  const sourcePath = resolve(__dirname, ".");
  const targetPath = resolve(dir);

  await copyFiles({ sourcePath, targetPath });
  await installDependencies({ targetPath });
  await initializeGitRepo({ targetPath });
  await initializeGraphTestsData({ targetPath });
};

const promptInstallationDir = async () => {
  const { dir } = await prompts([
    {
      name: "dir",
      type: "text",
      message:
        "Which directory would you like to install promises-training? (Default: .)",
      initial: ".",
      validate: async (dir) => {
        try {
          const stats = await stat(dir);
          if (!stats.isDirectory()) {
            return `${dir} is not a directory!`;
          }

          const files = await readdir(dir);
          if (files.length > 0) {
            return `${dir} is not empty!`;
          }

          return true;
        } catch (error) {
          return true;
        }
      },
    },
  ]);

  return dir;
};

const createDirIfNotExists = async (dir) => {
  try {
    await stat(dir);
  } catch (error) {
    await mkdir(dir);
  }
};

const copyFiles = async ({ sourcePath, targetPath }) => {
  const filesBlacklist = [
    /^bin/,
    /^ROADMAP.md$/,
    /^EPICS.md$/,
    /^scripts\/postpublish.ts$/,
    /^scripts\/prepublishOnly.ts$/,
    /^scripts\/e2eTest.ts$/,
  ];

  try {
    logMessage("Copying files...");

    await cp(sourcePath, targetPath, {
      recursive: true,
      filter: (_, target) => {
        const relativePath = relative(targetPath, target);
        return !filesBlacklist.some((pattern) => relativePath.match(pattern));
      },
    });
  } catch (error) {
    logError("\nError copying files");
    console.error(error);
    process.exit(1);
  }
};

const installDependencies = async ({ targetPath }) => {
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

const initializeGitRepo = async ({ targetPath }) => {
  try {
    logMessage("Initializing git repository...");

    await rename(
      resolve(targetPath, "./gitignore"),
      resolve(targetPath, ".gitignore")
    );

    run("git init", {
      cwd: targetPath,
    });
    run("git add .", {
      cwd: targetPath,
    });
    run(`git commit -m "Initial commit"`, {
      cwd: targetPath,
    });
  } catch (error) {
    logError("Error initializing git repository");
    console.error(error);

    await rm(".git");
    process.exit(1);
  }
};

const initializeGraphTestsData = async ({ targetPath }) => {
  try {
    logMessage("Initializing graph exercises tests data...");

    run("npm run graph:generateTests", {
      cwd: targetPath,
    });
  } catch (error) {
    logError("Error initializing graph exercises tests data");
    console.error(error);

    process.exit(1);
  }
};

const migrate = async () => {
  const sourcePath = resolve(__dirname, ".");
  const targetPath = resolve(".");

  await checkIsPromisesTrainingRepo({ targetPath });
  await copyMigrationFiles({ sourcePath, targetPath });
  await reinstallDependencies({ targetPath });
};

const checkIsPromisesTrainingRepo = async ({ targetPath }) => {
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

const copyMigrationFiles = async ({ sourcePath, targetPath }) => {
  const filesBlacklist = [/^bin/];

  try {
    logMessage("Copying files...");

    await cp(sourcePath, targetPath, {
      recursive: true,
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

const reinstallDependencies = async ({ targetPath }) => {
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
