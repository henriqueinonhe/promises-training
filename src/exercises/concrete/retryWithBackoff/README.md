# Retry With Backoff

Implement a function that:

- Signature: `(data: string) => Promise<string>`
- Calls `postData` with `data`
- Returns the result of `postData`
- If `postData` fails, retry it
- There should be an exponential backoff between each retry that starts at 100ms and doubles each time
