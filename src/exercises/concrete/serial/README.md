# Serial

Implement a function that:

- Signature: `(list: Array<string>) => Promise<string>`
- Calls `postData` with each item in `list` in order
- Each subsequent `postData` call should wait for the previous one to complete
- Returns a list of the results of each `postData` call in the order they were called
