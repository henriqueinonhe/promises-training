# Retry With Timeout

Implement a function that:

- Signature: `(data: string) => Promise<string>`
- Calls `postData` with `data`
- Returns the result of `postData`
- If `postData` fails, retry it
- If when retrying, the total elapsed time exceeds 2 seconds, throws an array of the errors `postData` has thrown, in the order they were thrown
