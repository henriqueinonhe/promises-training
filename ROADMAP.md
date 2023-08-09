# Roadmap

## Alpha

Means being ready to be used, however, as documentation/explanations are lacking, ther emight be some rough edges during installation and there be the need to have someone to explain things to whoever is using it.

### Epics

- [x] Minimal description for exercises
- [x] More graph exercises
- [ ] Documentation for graph execises UI
- [ ] Basic styling for graph exercises UI
- [x] Improve concrete exercises tests
- [x] Improve setup documentation on README

## Beta

Means being ready to be used in a semi-standalone way. All exercises will be sufficiently described so that they can be understood by themselves, however, the rationale/motivation behind the exercises will still depend on a mentor.

### Epics

- [ ] Complete description for exercises in a standardized way and including motivation and possibly some concrete example
- [ ] Finish graph exercises
- [ ] Exercise sequence by level proposal and come up with corresponding explanations
- [ ] Implement migration script for upgrading to newer versions
- [x] Polish setup process
  - Discriminate each of the steps
  - Error handling
  - Retryability
  - Allow user to choose the folder to install and warn if it's not empty
- [ ] SPIKE Event Loop Exercises
- [ ] Callback Exercises
- [ ] Finish concrete exercises, including scheduler

## Stable

Means being ready to be used in a standalone way, containing explanations, motivations, divisions by level and polishing.

### Epics

- [ ] SPIKE Consider including generators
- [ ] Script to remove tests
- [ ] SPIKE Consider including UI on top of VS Code (Web) that allows the user to solve exercises on the Browser, serilizes exercises to its corresponding file on the repo, tests run on the server and their result is serialized back to the browser
