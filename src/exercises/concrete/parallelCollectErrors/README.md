# Parallel Collect Errors

**Level: Beginner**

Usually, when we have promises that are running in parallel, we use `Promise.all` to wait for the completion of all of them, however, when we do that, a single promise rejection causes the "entire process" to fail, which prevents us from reading the results of any promises that might have fulfilled.

In some scenarios, this is what we want, but in others, it's useful to collect the errors/rejections so that we can either inform wha has gone wrong or even do something with these errors ourselves, like retrying the tasks that were responsible for these errors.

In this exercise, we'll make calls to `postData` in parallel and collect the errors.

## Requirements

Implement a function that:

- Signature: `(list: Array<string>) => Promise<Array<string>>`
- Calls `postData` with each element in `list` in parallel
- Returns an object with keys `successes` and `errors`, where `successes` is the list of results of `postData` and `errors` is the list of errors thrown by `postData`
