# Parallel Chain

**Level: Beginner**

Sometimes we have asynchronous tasks that must be chained off one another, that is, each task depends on the completion of the previous one.

In this exercise we'll explore the idea of dealing with these asynchronous tasks chains, but in a scenario where we have multiple chains and they all must be carried out in parallel.

Each chain has three steps: `firstStep`, `secondStep` and `thirdStep`, where each step uses the data that is returned by the previous step.

You'll be implementing a function that receives a list of strings and from each element of this list, a chain is created.

## Requirements

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- For each element in `list`, calls `firstStep` with it, then calls `secondStep` with the result of the `firstStep` and `thirdStep` with the result of `secondStep`
- Returns the list of results of `thirdStep` in the order they were called
- Calls should be made in parallel as much as possible
