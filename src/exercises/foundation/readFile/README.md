# Read File

**Level: Intermediate**

Nowadays most asynchronous APIs we use are already expressed in terms of promises, however, it's important to understand what is happening under the hood, that is, how we turn callback-based APIs into promise-based APIs.

In this exercise we're going to do that with the `readFile` function from the `fs` module.

## Requirements

Implement a function that is the promisified version of `readFile`.

It would be too cumbersome to detail each and every specification here, and this wouldn't be productive nor it is necessary, as promisification is a very generic process that usually doesn't depend on the specificities of the API being promisified.

That said, what we want is a `readFile` function that instead of accepting a callback as its last argument, returns a promise that resolves when `readFile` is successful, and rejects when `readFile` fails.

Also, aside from the callback, all the arguments that are passed to `readFile` should be passed to the promise-based version of `readFile`, in the same order.

**IMPORTANT**: Use the `readFile` that's provided as a function argument because this is what makes tests work.
