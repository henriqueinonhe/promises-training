# Promisify

Implement a function that:

- Receives a function `fn` that takes a callback as its last argument, where the callback has the signature `<T>(error: unknown, result: T) => void`
- Returns a function that returns a promise that resolves to the result of calling `fn` with the arguments passed to the returned function
