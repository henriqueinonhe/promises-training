# Parallel Chunks

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- Calls `postData` with each element in `list` in parallel, in chunks of 5
- Returns the list of results of `postData`
