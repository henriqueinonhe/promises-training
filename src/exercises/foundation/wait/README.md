# Wait

**Level: Intermediate**

Whenever we need to wait for something to happen, we can use the `setTimeout` function that has a callback-based API.

But what if we wanted to have this same functionality but with a promise-based API?

That's what we're going to do in this exercise.

## Requirements

Implement a function that:

- Signature: `(ms: number) => Promise<void>`
- Returns a promise that resolves after `ms` milliseconds

**IMPORTANT**: Use the `setTimeout` that's provided as a function argument because this is what makes tests work.
