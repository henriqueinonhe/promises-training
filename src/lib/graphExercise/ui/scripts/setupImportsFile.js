import { readdir, writeFile } from "fs/promises";
import { resolve } from "path";

const main = async () => {
  const graphExercisesPath = resolve("../../../content/1-using-promises");
  const unsortedExercises = await readdir(graphExercisesPath);
  const exercises = unsortedExercises.sort((a, b) => {
    const aOffset = Number(a.split(".")[1]);
    const bOffset = Number(b.split(".")[1]);

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
    const offset = exercise.split(".")[1];

    return [
      `export { default as exercise${offset} } from "../../../../content/1-using-promises/${exercise}/exercise";`,
    ].join("\n");
  });

  return content;
};

main();
