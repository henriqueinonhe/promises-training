#!/usr/bin/env node

import { rm, rename, stat, mkdir, readdir } from "node:fs/promises";
import { copy } from "fs-extra";
import { resolve, relative } from "node:path";
import prompts from "prompts";
import { logError, logMessage } from "../src/lib/cli/logger";
import { run } from "../src/lib/cli/run";
import { fileURLToPath } from "node:url";
import { argv } from "node:process";

const currentFilePath = fileURLToPath(new URL(import.meta.url));
const basePath = resolve(currentFilePath, "../..");

const main = async () => {
  const processDir = argv[2];

  const dir = await promptInstallationDir();
  const sourcePath = basePath;
  const targetPath = resolve(processDir, dir);

  await createDirIfNotExists(targetPath);

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
      validate: validateInstallationDir,
    },
  ]);

  return dir;
};

const validateInstallationDir = async (dir: string) => {
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
    // If we get here it means that dir doesn't exist
    return true;
  }
};

const createDirIfNotExists = async (dir: string) => {
  try {
    await stat(dir);
  } catch (error) {
    await mkdir(dir);
  }
};

type CopyFilesParameters = {
  sourcePath: string;
  targetPath: string;
};

const copyFiles = async ({ sourcePath, targetPath }: CopyFilesParameters) => {
  const filesBlacklist = [
    /^bin/,
    /^ROADMAP.md$/,
    /^EPICS.md$/,
    /^scripts\/postpublish.ts$/,
    /^scripts\/prepublishOnly.ts$/,
    /^scripts\/e2eTest.ts$/,
    /^scripts\/setup.ts$/,
  ];

  try {
    logMessage("Copying files...");

    await copy(sourcePath, targetPath, {
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

type InstallDependenciesParameters = {
  targetPath: string;
};

const installDependencies = async ({
  targetPath,
}: InstallDependenciesParameters) => {
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

type InitializeGitRepoParameters = {
  targetPath: string;
};

const initializeGitRepo = async ({
  targetPath,
}: InitializeGitRepoParameters) => {
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

type InitializeGraphTestsDataParameters = {
  targetPath: string;
};

const initializeGraphTestsData = async ({
  targetPath,
}: InitializeGraphTestsDataParameters) => {
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

main();
