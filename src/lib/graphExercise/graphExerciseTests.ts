import { MakeExercise } from "../Exercise";
import { Graph } from "./Graph";
import { GraphNode } from "./GraphNode";
import { generateAllPossibleExerciseStepSequences } from "./generateAllPossibleExerciseStepSequences";
import { makeGraphExerciseTestCase } from "./graphExerciseTestCase";
import { random } from "lodash";

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
  (label: string, graphRepresentation: GraphRepresentation) => {
    const graph = createGraphFromRepresentation(graphRepresentation);
    const stepSequences = generateAllPossibleExerciseStepSequences(graph);
    const graphExerciseTestCase = makeGraphExerciseTestCase({
      makeAsyncAwaitExercise,
      makeMixedExercise,
      makeThenCatchExercise,
    });

    // We cap the number of test cases
    // otherwise it takes way too much time
    // TODO
    // This number is subject to change
    // and eventually we should pull this from
    // a configuration file, or even have some
    // kind of CLI
    // We should also cache the generated test cases
    // so that tests are deterministic
    const stepSequencesFirstIndex = 0;
    const stepSequencesLastIndex = stepSequences.length - 1;
    const cap = Math.min(stepSequences.length, 500);
    const randomIndexes = Array.from({ length: cap }).map(() =>
      random(stepSequencesFirstIndex, stepSequencesLastIndex)
    );
    const cappedStepSequences = randomIndexes.map(
      (index) => stepSequences[index]
    );

    cappedStepSequences.forEach((steps) => {
      graphExerciseTestCase(label, steps);
    });
  };

type GraphRepresentation = Array<GraphRepresentationEntry>;

type GraphRepresentationEntry = {
  label: string;
  dependencies: Array<Array<string>>;
};

const createGraphFromRepresentation = (
  graphRepresentation: GraphRepresentation
): Graph => {
  const nodes = graphRepresentation.map(createGraphNode);
  return new Map(nodes.map((node) => [node.label, node]));
};

const createGraphNode = (entry: GraphRepresentationEntry): GraphNode => {
  return {
    label: entry.label,
    dependencies: entry.dependencies.map(createGraphNodeDependencyClause),
  };
};

const createGraphNodeDependencyClause = (dependencyClause: Array<string>) => {
  return dependencyClause.map(createGraphNodeDependencyClauseDependency);
};

const createGraphNodeDependencyClauseDependency = (dependency: string) => {
  if (dependency.startsWith("!")) {
    return {
      label: dependency.slice(1),
      status: "rejected" as const,
    };
  }

  return {
    label: dependency,
    status: "resolved" as const,
  };
};
