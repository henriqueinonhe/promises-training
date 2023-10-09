# Retry

**Level: Beginner**

Almost all asynchronous tasks involve some form of interaction with an external system (otherwise it wouldn't make much sense for this task to be asynchronous to begin with) and therefore the task might fail due to some malfunction of this external system (e.g. network issue, timeout, high load).

Because of that, we often want to have some mechanism that retries these asynchronous tasks when they fail.

In this exercise, you'll create a decorated version of a `getData` function, that has retryability built in.

## Requirements

Implement a function that:

- Signature: `(data: string) => Promise<string>`
- Calls `getData` with `data`
- Returns the result of `getData`
- If `getData` fails, retry it up to 3 times
- If `getData` fails more than 3 times, throws an array of the errors `getData` has thrown, in the order they were thrown
