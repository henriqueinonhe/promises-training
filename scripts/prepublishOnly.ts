import { rm, rename, readdir } from "node:fs/promises";

const main = async () => {
  await rename("./.gitignore", "./gitignore");

  await Promise.all(
    ["graph", "concrete", "foundation"].map(replaceWithTemplates)
  );
};

const replaceWithTemplates = async (category: string) => {
  const exercises = await readdir(`./src/exercises/${category}`);

  await Promise.all(
    exercises.map(async (exercise: string) => {
      const exercisePath = `./src/exercises/${category}/${exercise}/exercise.ts`;
      const exerciseTemplatePath = `./src/exercises/${category}/${exercise}/template.ts`;
      await rm(exercisePath);
      await rename(exerciseTemplatePath, exercisePath);
    })
  );
};

main();
