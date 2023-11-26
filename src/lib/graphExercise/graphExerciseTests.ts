import { MakeExercise } from "../Exercise.js";
import { makeGraphExerciseTestCase } from "./graphExerciseTestCase.js";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { returnException } from "return-exception";
import { GraphExerciseTestData } from "./GraphExerciseTestData.js";
import { GraphExercisesTestConfig } from "./GraphExerciseTestsConfig.js";

type Dependencies = {
  makeThenCatchExercise: MakeExercise;
  makeAsyncAwaitExercise: MakeExercise;
  makeMixedExercise: MakeExercise;
};

export const makeGraphExerciseTests =
  ({
    makeAsyncAwaitExercise,
    makeMixedExercise,
    makeThenCatchExercise,
  }: Dependencies) =>
  async (label: string) => {
    const doReadTestConfig = returnException(() => readTestConfig());
    const [testConfig, readTestConfigError] = await doReadTestConfig();

    if (readTestConfigError !== undefined) {
      return;
    }

    const doReadTestData = returnException(() => readTestData(label));
    const [testData, readTestDataError] = await doReadTestData();

    if (readTestDataError !== undefined) {
      return;
    }

    const graphExerciseTestCase = makeGraphExerciseTestCase({
      makeAsyncAwaitExercise,
      makeMixedExercise,
      makeThenCatchExercise,
    });

    const stepSequences = testData.stepSequences;
    const testCasesCap = testConfig.testCasesCap;
    const cappedStepSequencesLength = Math.min(
      stepSequences.length,
      testCasesCap
    );
    const cappedStepSequences = stepSequences.slice(
      0,
      cappedStepSequencesLength
    );

    cappedStepSequences.forEach((sequence) => {
      graphExerciseTestCase(label, sequence);
    });
  };

const readTestConfig = async () => {
  const configFilePath = resolve("./.data/graph/testsConfig.json");

  const readConfigFile = returnException(() =>
    readFile(configFilePath, {
      encoding: "utf-8",
    })
  );
  const [serializedData, readDataFileError] = await readConfigFile();

  if (readDataFileError !== undefined) {
    console.error(
      `Something went wrong when trying to read the graph tests config file.\nTry running 'npm run graph:generateTests'.`
    );

    throw readDataFileError;
  }

  const parseData = returnException(
    () => JSON.parse(serializedData) as GraphExercisesTestConfig
  );
  const [data, parseDataError] = parseData();

  if (parseDataError !== undefined) {
    console.error(
      `Something went wrong when trying to read the graph tests config file.\nTry running 'npm run graph:generateTests'.`
    );

    throw parseDataError;
  }

  return data;
};

const readTestData = async (label: string) => {
  const dataFilePath = resolve(`./.data/graph/${label}.json`);

  const readDataFile = returnException(() =>
    readFile(dataFilePath, {
      encoding: "utf-8",
    })
  );
  const [serializedData, readDataFileError] = await readDataFile();

  if (readDataFileError !== undefined) {
    console.error(
      `Something went wrong when trying to read the data file for the graph/${label} exercise.\nTry running 'npm run graph:generateTests'.`
    );

    throw readDataFileError;
  }

  const parseData = returnException(
    () => JSON.parse(serializedData) as GraphExerciseTestData
  );
  const [data, parseDataError] = parseData();

  if (parseDataError !== undefined) {
    console.error(
      `Something went wrong when trying to parse the data file for the graph/${label} exercise.\nTry running 'npm run graph:generateTests'.`
    );

    throw parseDataError;
  }

  return data;
};
