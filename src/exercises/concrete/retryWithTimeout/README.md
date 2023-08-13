# Retry With Timeout

**Level: Intermediate**

When retrying failed operations we usually don't want to retry them indefinitelly, so we might want to use some criteria to decide when we stop retrying.

In the `concrete/retry` exercise we used the amount of retries as the criteria for when to stop, but now we'll use the **elapsed time**, that is, we'll have a timeout.

## Requirements

Implement a function that:

- Signature: `(data: string) => Promise<string>`
- Calls `postData` with `data`
- Returns the result of `postData`
- If `postData` fails, retry it
- If when retrying, the total elapsed time exceeds 2 seconds, throws an array of the errors `postData` has thrown, in the order they were thrown
