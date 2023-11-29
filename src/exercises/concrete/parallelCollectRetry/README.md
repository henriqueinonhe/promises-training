# Parallel Collect Retry

**Level: Intermediate**

This exercise is similar to the `concrete/parallelCollectErrors` exercise, but now, instead of returning errors, we're going to retry the calls that failed.

However, we won't retry them individually, but rather, we'll do that in batches, where each batch will be the list of calls that failed in the previous batch.

## Requirements

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- Calls `postData` with each element in `list` in parallel
- Collects all errors thrown by `postData` and retries their corresponding calls in parallel
- Retries up to 3 times
- If retrying fails, throws an array of the list of errors of each call
- Returns the list of results of `postData`
