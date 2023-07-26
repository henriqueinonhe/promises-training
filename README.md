# Promises Training

This repository is designed to provide you with a comprehensive resource to further your understanding and practice of promises in JavaScript. If you're already familiar with promises and want to deepen your knowledge while enhancing your skills, you've come to the right place.

Promises are an integral part of asynchronous programming in JavaScript, allowing you to handle asynchronous tasks without blocking the main thread.

In this repository, you'll find a series of texts and exercises (that are accompanied by automated tests to check your answers) to help you reinforce your understanding of promises.

However, it is not intended as an introductory guide, so we assume that you have some familiarity with promises.

## Installation

```sh
npm create promises-training@latest
```

## Rationale

Currently, there are three exercise categories:

1. Graph
2. Concrete
3. Foundation

### Graph Exercises

A big part of dealing with asynchronous tasks is orchestrating them so that each task starts as soon as possible, and in order to properly orchestrate these tasks we need to understand the dependency relations between them.

In this category, you'll be presented with a dependency graph in each exercise and then you'll orchestrate the tasks in the graph in the most efficient way possible.

As the exercise is focused on the orchestration itself, tasks are created by calling `createPromise(label)`, where `label` is a string that identifies the task.

Take this graph, for example:

![](./assets/graph1.png)

There are two tasks in this graph, `A` and `B`, and `B` depends on `A`, which is represented by the arrow that comes out from `B` and points to `A`.

This means that `B` can only start after `A` has finished and `A`, as it doesn't depend on any other task, can start right away.

Thus, the most efficient implementation for this graph would be:

```js
await createPromise("A");
await createPromise("B");
```

Tasks can also depend on more than one task:

![](./assets/graph2.png)

In this graph, `C` depends on both `A` and `B`, so it can only start after both `A` and `B` have finished.

However, both `A` and `B` don't depend on any other task, so they can start right away.

The most efficient implementation for this graph would be:

```js
await Promise.all([createPromise("A"), createPromise("B")]);
await createPromise("C");
```

Tasks can also have multiple different sets of dependencies where if any of the sets is satisfied, the task can start:

![](./assets/graph3.png)

In this graph, `C` depends **either** on `A` **or** on `B`, which is represented by using different colors for each dependency set.

Therefore, `C` can start as soon as either `A` or `B` has finished.

```js
await Promise.any([createPromise("A"), createPromise("B")]);
await createPromise("C");
```

Last but not least, promises have two possible outcomes: they can either be fulfilled or rejected.

![](./assets/graph4.png)

In this graph, we have a task `B` that depends on `A`'s fulfillment and a task `C` that depends on `A`'s rejection (represented by the dashed edge).

This means that `B` can only start after `A` has been fulfilled and `C` can only start after `A` has been rejected.

As only one of these outcomes is possible, either `B` or `C` will not be carried out.

Corresponding implementation:

```js
try {
  await createPromise("A");

  try {
    await createPromise("B");
  } catch {}
} catch {
  await createPromise("C");
}
```

When doing graph exercises, you'll notice that there are three functions being expored: `mixed`, `asyncAwait`, `thenCatch`.

The idea is for you to provide 3 different implementations, the first one is completely free, you can mix both async/await and then/catch, the second one should only use async/await and the third one should only use then/catch.

This way you'll be proficient in both styles of promise handling.

Also, at the end of the file you'll notice that exports are being wrapped in a `skipExercise`, which skips tests for that specific implementation so that it doesn't litter the output.

You can remove the `skipExercise` and run the tests to check your implementation.

### Concrete Exercises

Graph exercises are great for understanding the dependency relations between tasks, however, they don't cover the full spectrum of possible scenarios, as only tasks whose dependencies are known at compile time and fixed can be represented by a graph.

Therefore we have this category of concrete exercises, where you'll be presented with concrete scenarios that you'll have to implement.

As each exercise in this category is unique, their description is colocated with their folder.

### Foundation Exercises

Foundation exercises are designed to help you reinforce your understanding of the foundations of promises, by reimplementing promise-related functions and, eventually, the promise itself.

Descriptions are colocated with exercises.
