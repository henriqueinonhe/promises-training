#!/usr/bin/env node

const { execSync } = require("node:child_process");
const { argv } = require("node:process");
const { resolve } = require("node:path");

const main = async () => {
  const option = argv[2];

  if (option === "--migrate") {
    execSync(
      `node --no-warnings --loader ts-node/esm ${resolve(
        __dirname,
        "scripts/migrate.ts"
      )}`,
      {
        stdio: "inherit",
      }
    );
    process.exit(0);
  }

  execSync(
    `node --no-warnings --loader ts-node/esm ${resolve(
      __dirname,
      "scripts/setup.ts"
    )} `,
    {
      stdio: "inherit",
    }
  );
  process.exit(0);
};

main();
