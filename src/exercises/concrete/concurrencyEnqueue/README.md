# Concurrency Enqueue

**Level: Intermediate**

The idea here is very similar to the one in `concrete/concurrencyAbort`, but now we're going to use a different strategy, where instead of aborting previous calls, we're going to enqueue subsequent calls and run them in order.

A concrete example where we employ this strategy is when showing toasts, where we want to show a toast for each action the user takes, but we don't want to show multiple toasts at the same time, nor do we want to cut previous ones short, so we enqueue the toasts and show them one at a time.

## Requirements

Implement a function that:

- Signature: `(input: string) => Promise<string>`
- Calls `fetchData` (async) with the `input` and calls `setData` (sync) with the result
- Whenever the function is called while it is already running, subsequent calls should be enqueued and run in order
