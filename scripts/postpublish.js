const { rename } = require("node:fs/promises");

const main = async () => {
  rename("./gitignore", "./.gitignore");
};

main();
