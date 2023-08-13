# Serial

**Level: Beginner**

Suppose you have a list of strings, where for each element of this list you need to call an external API (which is abstracted by a `postData` function) with this data, and these calls must be done **sequentially**, that is, one after the other.

Usually, we want to parallelize these calls as much as possible, but in this case each call has to wait for the previous one to complete.

An example of where such scenario appears is when you're writing UI tests, like when you have to interact multiple times with the same button (e.g. clicking an increment button).

In this case, even though there are **no data dependencies** between these tasks, they still have to be done sequentially.

## Requirements

Implement a function that:

- Signature: `(list: Array<string>) => Promise<string>`
- Calls `postData` with each item in `list` in order
- Each subsequent `postData` call should wait for the previous one to complete
- Returns a list of the results of each `postData` call in the order they were called
