import { execSync } from "node:child_process";

export const run = (command: string, options: Parameters<typeof execSync>[1]) =>
  execSync(command, { stdio: "inherit", ...options });
