#!/usr/bin/env node

const { execSync } = require("node:child_process");
const { argv } = require("node:process");
const { resolve } = require("node:path");

const main = async () => {
  const option = argv[2];

  if (option === "--migrate") {
    execSync(`npm run --prefix ${__dirname} migrate ${resolve(".")}`, {
      stdio: "inherit",
    });
    process.exit(0);
  }

  execSync(`npm run --prefix ${__dirname} setup ${resolve(".")}`, {
    stdio: "inherit",
  });
  process.exit(0);
};

main();
