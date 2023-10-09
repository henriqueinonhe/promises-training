# Concurrency Abort

**Level: Intermediate**

The idea here is very similar to the one in `concrete/concurrencyOverride`, but now we're going to use a different strategy, where instead of aborting previous calls, we're going to **prevent subsequent calls** from starting, so that there is only once call running at a time.

A concrete example where we employ this strategy is to **deduplicate** calls that fetch the same data, so the burden of dealing with the deduplication is placed on the callee, instead of the caller.

## Requirements

Implement a function that:

- Signature: `(input: string) => Promise<string>`
- Calls `fetchData` (async) with the `input` and calls `setData` (sync) with the result
- Whenever the function is called while it is already running, the latest call should be aborted
