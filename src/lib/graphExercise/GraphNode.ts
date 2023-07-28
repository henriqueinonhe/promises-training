export type GraphNode = {
  label: string;

  /**
   * Dependencies are represented using Disjunctive Normal Form (DNF),
   * that is, a list of clauses, where each clause is a "list"
   * of dependencies.
   *
   * If any of the clauses is satisfied, the dependency is satisfied.
   * A clause is satisfied when all of its dependencies are satisfied.
   */
  dependencies: Array<GraphNodeDependencyClause>;
};

export type GraphNodeDependencyClause = Array<GraphNodeDependency>;

export type GraphNodeDependency = {
  label: string;
  status: "resolved" | "rejected";
};
