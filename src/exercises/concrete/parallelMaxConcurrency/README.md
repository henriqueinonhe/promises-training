# Parallel Max Concurrency

**Level: Intermediate**

The idea here is very similar to the `concrete/parallelChunks` exercise, but now we're taking things one step further, because when doing these calls in chunks, we won't necessarily be using all the "bandwith" we have, as we might have some calls that are very fast, and others that are very slow.

So, instead of doing things in chunks, we're going to do things in parallel, but with a limit on the number of calls that can be running at the same time.

## Requirements

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- Calls `postData` with each element in `list` in parallel, with at most 5 calls running in parallel
- Returns the list of results of `postData`
