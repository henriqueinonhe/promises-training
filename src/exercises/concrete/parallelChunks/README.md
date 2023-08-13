# Parallel Chunks

**Level: Beginner**

In terms of efficiency, we always parallelize asynchronous tasks as much as possible, however, sometimes there is a limit to how many of these tasks we can run at once.

For example, if these asynchronous tasks are calls to some API, you might have to limit the amount of calls you make in a given time window, otherwise you might get rate-limited.

In this exercise, you'll be calling `postData` in parallel, but in chunks of 5.

## Requirements

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- Calls `postData` with each element in `list` in parallel, in chunks of 5
- Returns the list of results of `postData`
