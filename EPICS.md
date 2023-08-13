# Alpha

## Minimal Description For Exercises

Describe exercises minimally so that they can be understood and solved.

### Tasks

- [x] Concrete - Concurrency Abort
- [x] Concrete - Concurrency Enqueue
- [x] Concrete - Concurrency Override
- [x] Concrete - Extracting Resolvers
- [x] Concrete - Parallel Chain
- [x] Concrete - Parallel Chunks
- [x] Concrete - Parallel Collect Errors
- [x] Concrete - Parallel Collect Retry
- [x] Concrete - Parallel Max Concurrency
- [x] Concrete - Retry
- [x] Concrete - Retry With Backoff
- [x] Concrete - Retry With Timeout
- [x] Concrete - Serial
- [x] Concrete - Serial Collect Errors
- [x] Foundation - Promise
- [x] Foundation - Promise All
- [x] Foundation - Promise All Settled
- [x] Foundation - Promise Any
- [x] Foundation - Promise Race
- [x] Foundation - Promise Reject
- [x] Foundation - Promise Resolve
- [x] Foundation - Promisify
- [x] Foundation - Promisify Read File
- [x] Foundation - Promisify Wait

## At Least ~30 Graph Exercises In Total

Exercise order is:

- Exercises with OR
- Exercises with Errors

UPDATE: It doesn't make sense to add more graph exercises as they become so complex that from that point on it's better to implement a more sofisticated abstraction, like a graph-based solver.

### Tasks

- [x] 14
- [x] 15
- [x] 16
- [x] 17
- [x] 18
- [x] 19
- [x] 20
- [x] 21
- [x] 22
- [x] 23

## Documentation For Graph Execises UI

Document:

- What it is
- How to run it
- How to use it

## Basic Styling For Graph Exercises UI

Make it look decent.

## Improve Concrete Exercises Tests

Some concrete exercise tests are not up to the standard (e.g. concurrencyEnqueue), in the sense that there is way too much stuff being done in a single it, which would usually be ok for these cases, but, as we want to make it **absolutely** clear to the user where the problems with their implementations are, we need to describe things thoroughly.

### Tasks

- [x] Parallel Chunks
- [x] Parallel Collect Retry
- [x] Parallel Max Concurrency
- [x] Serial

## Improve Setup Documentation On README

We need to document how to run tests and etc.

# Beta

## Complete Description For Exercises In A Standardized Way And Including Motivation And Possibly Some Concrete Example

We need to give a motivation for each exercise, as well as a concrete example of what we want to achieve.

(Eventually I'll improve this description)

### Tasks

- [ ] Concrete - Concurrency Abort
- [ ] Concrete - Concurrency Enqueue
- [ ] Concrete - Concurrency Override
- [ ] Concrete - Extracting Resolvers
- [x] Concrete - Parallel Chain
- [x] Concrete - Parallel Chunks
- [x] Concrete - Parallel Collect Errors
- [x] Concrete - Parallel Collect Retry
- [x] Concrete - Parallel Max Concurrency
- [x] Concrete - Retry
- [x] Concrete - Retry With Backoff
- [x] Concrete - Retry With Timeout
- [x] Concrete - Serial
- [x] Concrete - Serial Collect Errors
- [ ] Foundation - Promise
- [ ] Foundation - Promise All
- [ ] Foundation - Promise All Settled
- [ ] Foundation - Promise Any
- [ ] Foundation - Promise Race
- [ ] Foundation - Promise Reject
- [ ] Foundation - Promise Resolve
- [ ] Foundation - Promisify
- [ ] Foundation - Promisify Read File
- [ ] Foundation - Promisify Wait

## Finish Graph Exercises

TBD

We'll know better after we have more graph exercises.

## Exercise Sequence By Level Proposal And Come Up With Corresponding Explanations

We need to divide exercises into levels and also come up with explanations for each level as well as the rationale behind this division.

## Implement Migration Script For Upgrading To Newer Versions

We need to implement a script that will allow users to upgrade to newer versions of the exercises without having to copy and paste anything.

The main idea is just to do a very basic file diff and then add new files to the user's folder.

## Polish Setup Process

Currently, the setup process is very crude.

### Tasks

- [x] Discriminate each of the steps
- [x] Error handling
- [x] Retryability
- [x] Allow user to choose the folder to install and warn if it's not empty

## SPIKE Event Loop Exercises

I'd like to include event loop simulation exercises, but I need to think this through first.

## Callback Exercises

### Tasks

- [ ] Promise All Equivalent
- [ ] Promise Any Equivalent
- [ ] Serial Equivalent
- [ ] Promise Race Equivalent
- [ ] Parallel Max Concurrency Equivalent

## Finish Concrete Exercises, Including Scheduler

### Tasks

- [ ] Concurrency Rollback
- [ ] Parallel Max Concurrency Priority
- [ ] Scheduler

# Stable

## SPIKE Consider Including Generators

Maybe it's worth to include generators, maybe it's not.

## Script To Remove Tests

We need to provide a script that will remove tests from the user's folder so that the users can implement it themselves.

## Special UI

TBD
