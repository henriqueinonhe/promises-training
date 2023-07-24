#!/usr/bin/env node

const { mv } = require("node:fs/promises");

const main = async () => {
  mv("./.gitignore", "gitignore");
};

main();
