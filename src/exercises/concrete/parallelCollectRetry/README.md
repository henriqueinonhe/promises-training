# Parallel Collect Retry

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- Calls `postData` with each element in `list` in parallel
- Collects all errors thrown by `postData` and retries their corresponding calls in parallel
- Retries up to 3 times
- If retrying fails, throws an array of the list of errors of each call
- Returns the list of results of `postData`
