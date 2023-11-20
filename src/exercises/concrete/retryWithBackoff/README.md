# Retry With Backoff

**Level: Intermediate**

In some situations, when an asynchronous task that involves communicating with an external system fails, we might not want to retry it right away, as it's likely that if we do, it's going to fail due to the same reason (e.g. server is unavailable).

What we do instead, is to **wait** between retries, and this concept is known as **backoff**.

In this exercise, we're going to call `postData`, but each time it fails, we'll double the amount of time we wait before retrying it, where the initial waiting time is 200ms.

## Requirements

Implement a function that:

- Signature: `(data: string) => Promise<string>`
- Calls `postData` with `data`
- Returns the result of `postData`
- If `postData` fails, retry it
- There should be an exponential backoff between each retry that starts at 200ms and doubles each time
