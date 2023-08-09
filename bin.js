#!/usr/bin/env node

const { execSync } = require("node:child_process");
const { cp, rm, rename, stat, lstat, mkdir } = require("node:fs/promises");
const { resolve } = require("node:path");
const prompts = require("prompts");
const { red, yellow } = require("kolorist");

const run = (command, options) =>
  execSync(command, { stdio: "inherit", ...options });

const logMessage = (message) => console.log(yellow(`\n${message}`));
const logError = (message) => console.error(red(`\n${message}`));

const main = async () => {
  const { dir } = await prompts([
    {
      name: "dir",
      type: "text",
      message: "Where would you like to install promises-training?",
      initial: ".",
      validate: async (dir) => {
        try {
          const stats = await stat(dir);
          if (!stats.isDirectory()) {
            return `${dir} is not a directory!`;
          }

          const files = await lstat(dir);
          if (files.length > 0) {
            return `${dir} is not empty!`;
          }

          return true;
        } catch (error) {
          await mkdir(dir);

          return true;
        }
      },
    },
  ]);

  const sourcePath = __dirname;
  const targetPath = resolve(dir);

  try {
    logMessage("Copying files...");

    await cp(sourcePath, targetPath, {
      recursive: true,
    });
  } catch (error) {
    logError("\nError copying files");
    console.error(error);
    return;
  }

  try {
    logMessage("Removing unnecessary files...");

    await rm(resolve(targetPath, "./bin.js"));
  } catch (error) {
    logError("Error removing files");
    console.error(error);
    return;
  }

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
    return;
  }

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
    return;
  }
};

main();
