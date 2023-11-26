/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Exercises from "../imports.js";
import { match } from "ts-pattern";
import { ValuesType } from "utility-types";
import { createGraphExerciseContainer } from "../../../graphExerciseContainer.js";
import { waitForPromises } from "../../../../waitForPromises.js";
import { PromiseManager } from "../../../../PromiseManager.js";
import { ExerciseFollowingRecord, ExerciseRecords } from "./ExerciseRecord.js";
import { xor } from "lodash";

const exerciseKeys = Object.keys(Exercises);
export const exerciseIds = exerciseKeys
  .map((e) => e.replace("exercise", ""))
  .sort((a, b) => Number(a) - Number(b));

export type Exercise = {
  readonly id: string;
  readonly variant: ExerciseVariant;
  readonly promise: Promise<unknown> | undefined;
  readonly records: ExerciseRecords;
  readonly run: () => Exercise;
  readonly resolve: (label: string) => Promise<Exercise>;
  readonly reject: (label: string) => Promise<Exercise>;
};

export type ExerciseVariant = "Mixed" | "AsyncAwait" | "ThenCatch";

export type CreateExerciseParameters = {
  id: string;
  variant: ExerciseVariant;
};

export const createExercise = ({ id, variant }: CreateExerciseParameters) => {
  const exerciseOffset = Number(id);
  // Unorthodox but it works
  const exerciseKey = `exercise${exerciseOffset}`;
  // @ts-ignore
  const exerciseFactories = Exercises[exerciseKey] as ValuesType<
    typeof Exercises
  >;

  const makeExercise = match(variant)
    .with("Mixed", () => exerciseFactories.makeMixedExercise)
    .with("AsyncAwait", () => exerciseFactories.makeAsyncAwaitExercise)
    .with("ThenCatch", () => exerciseFactories.makeThenCatchExercise)
    .exhaustive();

  const { exercise: runExercise, promiseManager } =
    createGraphExerciseContainer({
      makeExercise,
    });

  const records: ExerciseRecords = [];

  return internalCreateExercise({
    id,
    variant,
    runExercise,
    promise: undefined,
    promiseManager,
    records,
  });
};

type InternalCreateExerciseParameters = {
  id: string;
  variant: ExerciseVariant;
  runExercise: () => Promise<unknown>;
  promise: Promise<unknown> | undefined;
  promiseManager: PromiseManager<string>;
  records: ExerciseRecords;
};

const internalCreateExercise = (params: InternalCreateExerciseParameters) => {
  const { id, promiseManager, promise, runExercise, variant, records } = params;

  // Read
  const getId = () => id;

  const getVariant = () => variant;

  const getPromise = () => promise;

  const getRecords = () => records;

  // Write
  const run = (): Exercise => {
    const promise = runExercise();

    const created = promiseManager.keys();
    const records: ExerciseRecords = [{ created }];

    return internalCreateExercise({
      ...params,
      promise,
      records,
    });
  };

  const resolve = async (label: string): Promise<Exercise> => {
    promiseManager.resolve(label, label);
    await waitForPromises();

    const existingPromises = records.reduce(
      (accum, record) => [...accum, ...record.created],
      [] as Array<string>
    );
    const created = xor(promiseManager.keys(), existingPromises);

    const newRecord: ExerciseFollowingRecord = {
      created,
      resolved: label,
    };

    return internalCreateExercise({
      ...params,
      records: [...records, newRecord] as ExerciseRecords,
    });
  };

  const reject = async (label: string): Promise<Exercise> => {
    promiseManager.reject(label);
    await waitForPromises();

    const existingPromises = records.reduce(
      (accum, record) => [...accum, ...record.created],
      [] as Array<string>
    );
    const created = xor(promiseManager.keys(), existingPromises);

    const newRecord: ExerciseFollowingRecord = {
      created,
      rejected: label,
    };

    return internalCreateExercise({
      ...params,
      records: [...records, newRecord] as ExerciseRecords,
    });
  };

  return {
    get id() {
      return getId();
    },
    get variant() {
      return getVariant();
    },
    get promise() {
      return getPromise();
    },
    get records() {
      return getRecords();
    },
    run,
    resolve,
    reject,
  };
};
