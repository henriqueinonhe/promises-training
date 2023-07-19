import { readdir, writeFile } from "fs/promises";
import { resolve } from "path";

const main = async () => {
  const graphExercisesPath = resolve("../../../exercises/graph");
  const unsortedExercises = await readdir(graphExercisesPath);
  const exercises = unsortedExercises.sort((a, b) => {
    const aOffset = Number(a);
    const bOffset = Number(b);

    return aOffset - bOffset;
  });

  const fileContent = [
    `// This file is auto-generated. Do not edit it manually.`,
    ...generateImports(exercises),
  ].join("\n");

  const importsFilePath = resolve("./src/imports.ts");
  await writeFile(importsFilePath, fileContent);
};

const generateImports = (exercises) => {
  const content = exercises.map((exercise) => {
    const offset = exercise;

    return [
      `export { default as exercise${offset} } from "../../../../exercises/graph/${exercise}/exercise";`,
    ].join("\n");
  });

  return content;
};

main();
