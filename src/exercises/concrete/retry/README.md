# Retry

Implement a function that:

- Signature: `(data: string) => Promise<string>`
- Calls `postData` with `data`
- Returns the result of `postData`
- If `postData` fails, retry it up to 3 times
- If `postData` fails more than 3 times, throws an array of the errors `postData` has thrown, in the order they were thrown
