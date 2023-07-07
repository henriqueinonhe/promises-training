// Makes sure all promises callbacks (microtasks)
// have been dealt with
// As the timeout is a macrotask and the microtask
// queue is guaranteed to be exhausted before the next
// macrotask, waiting for the setTimeout to resolve
// is enough to make sure all microtasks have been
// dealt with
export const waitForPromises = () =>
  new Promise((resolve) => setTimeout(resolve, 0));
