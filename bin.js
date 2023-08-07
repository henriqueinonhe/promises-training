#!/usr/bin/env node

const { execSync } = require("node:child_process");
const { cp, rm, rename } = require("node:fs/promises");
const { resolve } = require("node:path");

const run = (command, options) =>
  execSync(command, { stdio: "inherit", ...options });

const main = async () => {
  const sourcePath = __dirname;
  const targetPath = resolve(".");

  await cp(sourcePath, targetPath, {
    recursive: true,
  });

  await rm("./bin.js");

  run(`npm install`);
  run(`npm install`, {
    cwd: `./src/lib/graphExercise/ui`,
  });

  await rename("./gitignore", ".gitignore");

  run("git init");
  run("git add .");
  run(`git commit -m "Initial commit"`);
};

main();
