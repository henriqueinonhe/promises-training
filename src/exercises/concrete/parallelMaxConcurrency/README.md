# Parallel Max Concurrency

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- Calls `postData` with each element in `list` in parallel, with at most 5 calls running in parallel
- Returns the list of results of `postData`
