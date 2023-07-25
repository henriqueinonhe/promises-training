# Concurrency Enqueue

Implement a function that:

- Signature: `(input: string) => Promise<string>`
- Calls `fetchData` (async) with the `input` and calls `setData` (sync) with the result
- Whenever the function is called while it is already running, subsequent calls should be enqueued and run in order
