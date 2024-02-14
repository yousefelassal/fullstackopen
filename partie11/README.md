### a Introduction to CI/CD

- [Git Branch](https://www.atlassian.com/git/tutorials/using-branches) | Atlassian Tut

  ```bash
  git branch
  ```
  List all of the branches in your repository. This is synonymous with `git branch --list`.

  ```bash
  git branch <branch>
  ```
  Create a new branch called `＜branch＞`. This does not check out the new branch.

  ```bash
  git checkout -b <branch>
  ```
  Simultaneously creates and checks out `＜branch＞`. The `-b` option is a convenience flag that tells Git to run `git branch` before running `git checkout ＜branch＞`.

  ```bash
  git branch -d <branch>
  ```
  Delete the specified branch. This is a “safe” operation in that Git prevents you from deleting the branch if it has unmerged changes.

  ```bash
  git branch -D <branch>
  ```
  Force delete the specified branch, even if it has unmerged changes. This is the command to use if you want to permanently throw away all of the commits associated with a particular line of development.

  ```bash
  git branch -m <branch>
  ```
  Rename the current branch to `＜branch＞`.

- [Continuous Integration](https://www.martinfowler.com/articles/continuousIntegration.html) | Martin Fowler Articles
