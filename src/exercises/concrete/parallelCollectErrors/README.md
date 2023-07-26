# Parallel Collect Errors

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- Calls `postData` with each element in `list` in parallel
- Returns an object with keys `successes` and `errors`, where `successes` is the list of results of `postData` and `errors` is the list of errors thrown by `postData`
