# Promise All

**Level: Intermediate**

We'll be reimplementing the `Promise.all` function.

## Requirements

Implement a function that:

- Signature: `<T>(promises: Array<Promise<T>>) => Promise<Array<T>>`
- Returns a Ppromise that resolves to an array of the resolved values of `promises`
- If any of the `promises` rejects, the returned promise rejects with the reason of the first rejected promise
- Returns only when **all** promises have resolved.
