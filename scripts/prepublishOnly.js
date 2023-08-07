const { rm, rename, readdir } = require("node:fs/promises");

const main = async () => {
  await rename("./.gitignore", "./gitignore");

  await Promise.all(
    ["graph", "concrete", "foundation"].map(replaceWithTemplates)
  );
};

const replaceWithTemplates = async (category) => {
  const exercises = await readdir(`./src/exercises/${category}`);

  await Promise.all(
    exercises.map(async (exercise) => {
      const exercisePath = `./src/exercises/${category}/${exercise}/exercise.ts`;
      const exerciseTemplatePath = `./src/exercises/${category}/${exercise}/template.ts`;
      await rm(exercisePath);
      await rename(exerciseTemplatePath, exercisePath);
    })
  );
};

main();
