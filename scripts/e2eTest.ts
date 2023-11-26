import { execSync, spawn } from "node:child_process";
import tar from "tar";
import { mkdir, readFile, readdir, copyFile, rm } from "fs/promises";

const run = (...args: Parameters<typeof execSync>) => {
  const [command, options] = args;

  execSync(command, { stdio: "inherit", ...options });
};

const main = async () => {
  run("npm run prepublishOnly");

  // Simulates publishing to npm
  // and includes only the files that would be published
  run("npm pack");

  await mkdir("e2e");

  await extractPackage();

  if (process.env.CI === "true") {
    run(`git config --global user.email "you@example.com"`, {
      cwd: "e2e",
    });
    run(`git config --global user.name "Your Name"`, {
      cwd: "e2e",
    });
  }

  await install();

  run("npm run postpublish");

  await Promise.all(
    ["graph", "concrete", "foundation"].map(copyExerciseAnswers)
  );

  run("npm run check -- --run", {
    cwd: "e2e/installation",
  });

  rm("e2e", { recursive: true, force: true });
};

const getTarballName = async () => {
  const packageJson = await readFile("package.json", "utf-8");
  const { name, version } = JSON.parse(packageJson);
  return `${name}-${version}.tgz`;
};

const extractPackage = async () => {
  const tarballName = await getTarballName();
  await tar.extract({
    file: tarballName,
    cwd: `e2e`,
  });
};

const install = async () => {
  // For some reason piping stuff with echo
  // doesn't work properly with Windows

  const process = spawn("node ./package/bin.js", {
    stdio: ["pipe", "inherit", "inherit"],
    cwd: "e2e",
    shell: true,
  });

  await new Promise((resolve) => {
    process.on("spawn", resolve);
  });

  process.stdin.write("installation\n");

  await new Promise((resolve) => {
    process.on("exit", resolve);
  });
};

const copyExerciseAnswers = async (category: string) => {
  const exercises = await readdir(`./src/exercises/${category}`);

  await Promise.all(
    exercises.map(async (exercise: string) => {
      const sourcePath = `./src/exercises/${category}/${exercise}/exercise.ts`;
      const destinationPath = `./e2e/installation/src/exercises/${category}/${exercise}/exercise.ts`;
      await rm(destinationPath);
      await copyFile(sourcePath, destinationPath);
    })
  );
};

main();
