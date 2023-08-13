# Promise Race

**Level: Intermediate**

We'll be reimplementing the `Promise.race` function.

## Requirements

Implement a function that:

- Signature: `<T>(promises: Array<Promise<T>>) => Promise<Array<T>>`
- Returns a promise that resolves to the value of the first resolved promise or rejects to the reason of the first rejected promise, whichever happens first
