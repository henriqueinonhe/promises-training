import { red, yellow } from "kolorist";

export const logMessage = (message: string) =>
  console.log(yellow(`\n${message}`));
export const logError = (message: string) => console.error(red(`\n${message}`));
