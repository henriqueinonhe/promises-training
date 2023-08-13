# Serial Collect Errors

**Level: Beginner**

This exercise is very similar to the `concrete/serial` one, however, in this case we'll consider the possibility that calls to `postData` might fail, and when they do, we'll collect their and return them.

## Requirements

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- Calls `postData` with each element in `list` in series
- Returns an object with keys `successes` and `errors`, where `successes` is the list of results of `postData` and `errors` is the list of errors thrown by `postData`
