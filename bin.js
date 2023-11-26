#!/usr/bin/env node

import { execSync } from "node:child_process";
import { argv } from "node:process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(new URL(import.meta.url));
const projectDirPath = resolve(currentFilePath, "..");

const main = async () => {
  const option = argv[2];

  if (option === "--migrate") {
    execSync(`npm run --prefix ${projectDirPath} migrate ${resolve(".")}`, {
      stdio: "inherit",
    });
    process.exit(0);
  }

  execSync(`npm run --prefix ${projectDirPath} setup ${resolve(".")}`, {
    stdio: "inherit",
  });
  process.exit(0);
};

main();
