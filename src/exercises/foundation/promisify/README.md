# Promisify

**Level: Intermediate**

Callback-based APIs usually follow a pattern where the **callback** they call when the asynchronous task they represent is done, is the **last argument** and has the signature `<T>(error: unknown, result: T) => void`.

The reason for that, is that because of this pattern, we're able to create a generic function wrapper that takes a callback-based function and returns its promise-based version.

In this exercise, we're going to implement this wrapper.

## Requirements

Implement a function that:

- Receives a function `fn` that takes a callback as its last argument, where the callback has the signature `<T>(error: unknown, result: T) => void`
- Returns a function that returns a promise that resolves to the result of calling `fn` with the arguments passed to the returned function
