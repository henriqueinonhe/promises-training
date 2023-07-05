import { it, expect } from "vitest";
import makeExercise from "../../../content/1-using-promises/1.1/exercise";
import { setup } from "../../../tools/testUtils";

it("1.1", async () => {
  const { exercise, promisesRecords } = setup({ makeExercise });

  const exercisePromise = exercise();

  expect(promisesRecords.has("A")).toBe(true);
  expect(promisesRecords.size).toBe(1);

  promisesRecords.get("A")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.has("B")).toBe(true);
  expect(promisesRecords.size).toBe(2);

  promisesRecords.get("B")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.has("C")).toBe(true);
  expect(promisesRecords.size).toBe(3);

  promisesRecords.get("C")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.has("D")).toBe(true);
  expect(promisesRecords.size).toBe(4);

  promisesRecords.get("D")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.size).toBe(4);

  await exercisePromise;
});

it("1.1", async () => {
  const { exercise, promisesRecords } = setup({ makeExercise });

  const exercisePromise = exercise();

  expect(promisesRecords.has("A")).toBe(true);
  expect(promisesRecords.size).toBe(1);

  promisesRecords.get("A")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.has("B")).toBe(true);
  expect(promisesRecords.size).toBe(2);

  promisesRecords.get("B")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.has("C")).toBe(true);
  expect(promisesRecords.size).toBe(3);

  promisesRecords.get("C")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.has("D")).toBe(true);
  expect(promisesRecords.size).toBe(4);

  promisesRecords.get("D")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.size).toBe(4);

  await exercisePromise;
});
