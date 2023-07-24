#!/usr/bin/env node

const { execSync } = require("node:child_process");
const { cp, rm, rename, readdir } = require("node:fs/promises");
const { resolve } = require("node:path");

const run = (command) => execSync(command, { stdio: "inherit" });

const main = async () => {
  console.log(resolve("."));

  // run(`npm install`);
  // run(`npm install`, {
  //   cwd: `./src/lib/graphExercise/ui`,
  // });
  // await Promise.all(
  //   ["graph", "concrete", "foundation"].map(replaceWithTemplates)
  // );
};

const replaceWithTemplates = async (category) => {
  const exercises = await readdir(`./src/exercises/${category}`);

  await Promise.all(
    exercises.map(async (exercise) => {
      const exercisePath = `./src/exercises/${category}/${exercise}/exercise.ts`;
      const exerciseTemplatePath = `./src/exercises/${category}/${exercise}/template.ts`;
      await rm(exerciseTemplatePath);
      await rename(exercisePath, exerciseTemplatePath);
    })
  );
};

main();
