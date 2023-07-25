# Parallel Chain

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- For each element in `list`, calls `firstStep` with it, then calls `secondStep` with the result of the `firstStep` and `thirdStep` with the result of `secondStep`
- Returns the list of results of `thirdStep`
- Calls should be made in parallel as much as possible
