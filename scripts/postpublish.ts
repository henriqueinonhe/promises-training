import { execSync } from "node:child_process";

const run = (...args: Parameters<typeof execSync>) => {
  const [command, options] = args

  execSync(command, { stdio: "inherit", ...options });
}

const main = async () => {
  run(`git restore "*"`);
  run(`git clean -f .`);
};

main();
