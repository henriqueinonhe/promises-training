import { Fiber, isHaltedFiber } from "./Fiber.js";
import { Graph } from "./Graph.js";
import { GraphExerciseStepSequence } from "./GraphExerciseStep.js";

export const generateAllPossibleExerciseStepSequences = (graph: Graph) => {
  const queue = spawnStartingFibers(graph);
  const haltedFibers: Array<Fiber> = [];

  while (queue.length > 0) {
    const fiber = queue.shift() as Fiber;
    const derivedFibers = runFiber(graph, fiber);

    haltedFibers.push(...derivedFibers.filter(isHaltedFiber));
    queue.push(...derivedFibers);
  }

  const stepSequences = haltedFibers.map((fiber) => fiber.steps);

  return stepSequences;
};

const findStartingNodes = (graph: Graph) => {
  return Array.from(graph.values()).filter(
    (node) => node.dependencies.length === 0
  );
};

const spawnStartingFibers = (graph: Graph): Array<Fiber> => {
  const startingNodes = findStartingNodes(graph);
  const startingFibers = startingNodes.map((node) => {
    const startingSteps: GraphExerciseStepSequence = [
      {
        created: startingNodes.map((node) => node.label),
      },
    ];

    return {
      steps: startingSteps,
      nextLabel: node.label,
    };
  });

  return startingFibers;
};

const runFiber = (graph: Graph, fiber: Fiber): Array<Fiber> => {
  // This is where the magic happens,
  // ugly as fuck for now

  if (fiber.nextLabel === undefined) {
    return [];
  }

  const possibleOutcomes = ["resolved", "rejected"] as const;

  return possibleOutcomes.flatMap((outcome): Array<Fiber> => {
    const labelStatusMap = computeLabelStatusMap(fiber.steps);
    labelStatusMap.set(fiber.nextLabel, outcome);

    const nodesWithDependenciesMet = findNodesWithDependenciesMet(
      graph,
      labelStatusMap
    );
    const newlyCreatedLabels = nodesWithDependenciesMet
      .map((node) => node.label)
      .filter((label) => !labelStatusMap.has(label));

    newlyCreatedLabels.forEach((label) => labelStatusMap.set(label, "pending"));

    const newStep =
      outcome === "resolved"
        ? {
            created: newlyCreatedLabels,
            resolved: fiber.nextLabel,
          }
        : {
            created: newlyCreatedLabels,
            rejected: fiber.nextLabel,
          };

    const pendingLabels = Array.from(labelStatusMap.entries())
      .filter(([, status]) => status === "pending")
      .map(([label]) => label);

    if (pendingLabels.length === 0) {
      return [
        {
          steps: [...fiber.steps, newStep],
          nextLabel: undefined,
        },
      ];
    }

    return pendingLabels.map((pendingLabel) => ({
      steps: [...fiber.steps, newStep],
      nextLabel: pendingLabel,
    }));
  });
};

const computeLabelStatusMap = (steps: GraphExerciseStepSequence) => {
  const map: LabelStatusMap = new Map();

  steps.forEach((step) => {
    step.created.forEach((label) => map.set(label, "pending"));

    if (step.resolved) {
      map.set(step.resolved, "resolved");
    } else if (step.rejected) {
      map.set(step.rejected, "rejected");
    }
  });

  return map;
};

const findNodesWithDependenciesMet = (
  graph: Graph,
  labelStatusMap: LabelStatusMap
) => {
  return Array.from(graph.values()).filter((node) =>
    node.dependencies.some((clause) =>
      clause.every(
        (dependency) =>
          labelStatusMap.get(dependency.label) === dependency.status
      )
    )
  );
};

type LabelStatusMap = Map<string, "pending" | "resolved" | "rejected">;
