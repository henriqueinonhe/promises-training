# Promise Any

**Level: Intermediate**

We'll be reimplementing the `Promise.any` function.

## Requirements

Implement a function that:

- Signature: `<T>(promises: Array<Promise<T>>) => Promise<Array<T>>`
- Returns a promise that resolves to the value of the first resolved promise
- If all promises reject, the returned promise rejects with an array of the reasons of all rejected promises
