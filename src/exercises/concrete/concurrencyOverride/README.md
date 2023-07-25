# Concurrency Override

Implement a function that:

- Signature: `(input: string) => Promise<string>`
- Calls `fetchData` (async) with the `input` and calls `setData` (sync) with the result
- Whenever the function is called while it is already running, the previous call should be aborted
