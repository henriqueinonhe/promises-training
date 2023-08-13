# Extracting Resolvers

**Level: Intermediate**

Most times when we're dealing with promises, we just need to **use** them, as APIs are already promisified.

However, sometimes we need to not only **create promises** ourselves, but we also need to have **programatic control** over their fulfillment/rejection.

This is specially useful when we're testing async code, and actually, all the testing infrastructure behind this project lies on this very concept.

In this exercise, we're presented with a `router` object that has a `push` method that navigates to a new URL.

The problem is that `push` is a **sync** function, but it **triggers an async** navigation, and we would like to be able to **await** for the navigation to finish.

Currently, the only way to do that is to attach an event handler to the router, and wait for the event to fire.

The objective of this exercise is to implement a function works pretty much like the `router`'s `push` method, but instead of "firing and forgetting" like the original method does, it returns a promise **that resolves when the navigation is complete, and rejects when the navigation fails**.

## Requirements

Implement a function that:

- Signature: `(url: string) => Promise<void>`
- Calls `router.push(url)`
- Resolves when the router has finished navigating
- Rejects if the router fails to navigate
- After the function finishes, there should be no event handlers attached to the router

Note:

It's possible to attach/detach events to/from the router by using `router.on(event, callback)` and `router.off(event, callback)`.

- `routeChangeStart` -> When navigation starts
- `routeChangeComplete` -> When navigation ends successfully
- `routeChangeError` -> When navigation fails
