# Concurrency Override

**Level: Intermediate**

When dealing with asynchronous tasks we need to be aware of the fact that we might have more than one task of the same "kind" running at the same time, that is, **concurrently**, and that might lead to some problems.

A particularly common case is when we have a user interface that deals with pagination and the user selects different pages very quickly, thus firing multiple concurrent requests.

Because the order that these requests complete is **not necessarily** the same as the order they were started, we might end up with a situation where the user sees the results of a page that is not the one they selected last.

In this kind of situation, what we usually do is, whenever a new request comes in, the new request overrides the previous one, so that we only have one request running at a time.

In Javascript promises are **not cancellable**, but while we can't cancel de promise itself, we can abort **whatever runs after the promise completes**, which is what we are going to do here.

In this exercise, we're going to implement a function that calls an async function with a given input, but, whenever it is called while it is already running, we're going to abort the previous call.

## Requirements

Implement a function that:

- Signature: `(input: string) => Promise<string>`
- Calls `fetchFirstData` (async) with the `input`
- Calls `fetchSecondData` (async) with `fetchFirstData` result
- Calls `setData` (sync) with `fetchSecondData` result
- Whenever the function is called while it is already running, the previous call should be aborted
