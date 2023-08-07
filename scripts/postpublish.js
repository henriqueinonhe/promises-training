const { execSync } = require("node:child_process");

const run = (command, options) =>
  execSync(command, { stdio: "inherit", ...options });

const main = async () => {
  run(`git restore "*"`);
  run(`git clean -f .`);
};

main();
