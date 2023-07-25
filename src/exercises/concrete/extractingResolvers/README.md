# Extracting Resolvers

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
