#!/usr/bin/env node

const { execSync } = require("node:child_process");

const run = (command) => execSync(command, { stdio: "inherit" });

run(`npm install`);
run(`npm install`, {
  cwd: `./src/lib/graphExercise/ui`,
});
