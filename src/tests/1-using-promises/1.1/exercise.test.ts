import { it, expect } from "vitest";
import run from "../../../content/1-using-promises/1.1/exercise";
import { promisesRecords } from "../../../tools/utils";

it("1.1", async () => {
  const runPromise = run();

  expect(promisesRecords.has("A")).toBe(true);
  expect(promisesRecords.size).toBe(1);

  promisesRecords.get("A")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.has("A")).toBe(true);
  expect(promisesRecords.has("B")).toBe(true);
  expect(promisesRecords.size).toBe(2);

  promisesRecords.get("B")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.has("A")).toBe(true);
  expect(promisesRecords.has("B")).toBe(true);
  expect(promisesRecords.has("C")).toBe(true);
  expect(promisesRecords.size).toBe(3);

  promisesRecords.get("C")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.has("A")).toBe(true);
  expect(promisesRecords.has("B")).toBe(true);
  expect(promisesRecords.has("C")).toBe(true);
  expect(promisesRecords.has("D")).toBe(true);
  expect(promisesRecords.size).toBe(4);

  promisesRecords.get("D")!.resolve();
  await Promise.resolve();
  expect(promisesRecords.has("A")).toBe(true);
  expect(promisesRecords.has("B")).toBe(true);
  expect(promisesRecords.has("C")).toBe(true);
  expect(promisesRecords.has("D")).toBe(true);
  expect(promisesRecords.size).toBe(4);

  await runPromise;
});
