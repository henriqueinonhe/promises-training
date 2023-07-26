# Promise All Settled

Implement a function that:

- Signature: `<T>(promises: Array<Promise<T>>) => Promise<Array<T>>`
- Returns a promise that resolves to an array of results `{ status: 'fulfilled', value: T }` or `{ status: 'rejected', reason: unknown }` of promises.
- Returns only when **all** promises have settled.
