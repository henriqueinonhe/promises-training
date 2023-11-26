import { shuffle } from "lodash";
import { generateAllPossibleExerciseStepSequences } from "./generateAllPossibleExerciseStepSequences.js";
import { Graph } from "./Graph.js";
import { GraphNode } from "./GraphNode.js";

export const generateGraphExerciseTestData = (
  graphRepresentation: GraphRepresentation
) => {
  const graph = createGraphFromRepresentation(graphRepresentation);
  const stepSequences = generateAllPossibleExerciseStepSequences(graph);
  const shuffledStepSequences = shuffle(stepSequences);

  return shuffledStepSequences;
};

export type GraphRepresentation = Array<GraphRepresentationEntry>;

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
